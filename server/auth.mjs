// Sign-in for the hosted dashboard (ORBI-92): GitHub OAuth, checked against an allowlist.
//
// Web APIs only (fetch, crypto.subtle, Request/Response), so the SAME module runs in the Netlify
// Edge Function that gates every path (Deno) and in the API Function behind it (Node).
//
// One user today, more later without a rewrite:
//   - a session carries an identity { provider, id, login, … }, never just "signed in = true",
//     so per-user authorization later has a subject to hang off;
//   - the allowlist is re-checked on EVERY request, not only at sign-in, so removing someone from
//     ORBEX_ALLOWED_USERS revokes them at once instead of when their cookie expires;
//   - adding a second user is adding a login to that variable.
//
// The user's GitHub token is used once, to learn who they are, and then dropped. Reading the
// workspace uses a separate server-side token (ORBEX_GITHUB_TOKEN) the browser never sees.

export const SESSION_COOKIE = 'orbex_session';
const STATE_COOKIE = 'orbex_oauth';
const SESSION_DAYS = 30;
const STATE_MINUTES = 10;

const enc = new TextEncoder();
const b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

/** `payload.signature`, both base64url. */
export async function sign(value, secret) {
  const body = b64url(enc.encode(JSON.stringify(value)));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}

/** The value, or null if tampered, malformed or expired (`exp`, ms since epoch). Constant-time via subtle.verify. */
export async function unsign(token, secret, now = Date.now()) {
  if (typeof token !== 'string') return null;
  const [body, sig, extra] = token.split('.');
  if (!body || !sig || extra !== undefined) return null;
  try {
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(secret), unb64url(sig), enc.encode(body));
    if (!ok) return null;
    const value = JSON.parse(new TextDecoder().decode(unb64url(body)));
    if (typeof value?.exp !== 'number' || value.exp < now) return null;
    return value;
  } catch {
    return null;
  }
}

export function readCookie(req, name) {
  for (const part of (req.headers.get('cookie') ?? '').split(';')) {
    const i = part.indexOf('=');
    if (i !== -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

const cookie = (name, value, maxAge, path = '/') =>
  `${name}=${encodeURIComponent(value)}; Path=${path}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;

/** Only same-site relative paths survive a round trip through sign-in — never `//evil.com`. */
export function safeNext(next) {
  return typeof next === 'string' && /^\/(?![/\\])[^\s]*$/.test(next) && !next.startsWith('/auth/') ? next : '/';
}

/**
 * Read configuration and fail loudly at start-up, not on the first sign-in: a gate that's
 * misconfigured must refuse everyone, never let everyone through.
 */
export function authConfig(env) {
  const need = ['ORBEX_OAUTH_CLIENT_ID', 'ORBEX_OAUTH_CLIENT_SECRET', 'ORBEX_SESSION_SECRET', 'ORBEX_ALLOWED_USERS'];
  const missing = need.filter((k) => !env[k]);
  if (missing.length) throw new Error(`hosted sign-in is not configured — missing ${missing.join(', ')}`);
  if (env.ORBEX_SESSION_SECRET.length < 32) throw new Error('ORBEX_SESSION_SECRET must be at least 32 characters');
  const allowed = env.ORBEX_ALLOWED_USERS.split(/[\s,]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!allowed.length) throw new Error('ORBEX_ALLOWED_USERS lists nobody');
  return {
    clientId: env.ORBEX_OAUTH_CLIENT_ID,
    clientSecret: env.ORBEX_OAUTH_CLIENT_SECRET,
    secret: env.ORBEX_SESSION_SECRET,
    allowed,
  };
}

/** @param {ReturnType<typeof authConfig>} config  @param {typeof fetch} [fetchImpl] */
export function githubAuth(config, fetchImpl = fetch) {
  const isAllowed = (user) => !!user && user.provider === 'github' && config.allowed.includes(String(user.login).toLowerCase());

  async function user(req) {
    const s = await unsign(readCookie(req, SESSION_COOKIE), config.secret);
    if (!s?.user || !isAllowed(s.user)) return null;
    return s.user;
  }

  const redirect = (to, cookies = []) => {
    const h = new Headers({ location: to, 'cache-control': 'no-store' });
    for (const c of cookies) h.append('set-cookie', c);
    return new Response(null, { status: 302, headers: h });
  };

  async function login(req) {
    const url = new URL(req.url);
    const state = b64url(crypto.getRandomValues(new Uint8Array(24)));
    const next = safeNext(url.searchParams.get('next'));
    const token = await sign({ state, next, exp: Date.now() + STATE_MINUTES * 60_000 }, config.secret);
    const gh = new URL('https://github.com/login/oauth/authorize');
    gh.searchParams.set('client_id', config.clientId);
    gh.searchParams.set('redirect_uri', `${url.origin}/auth/callback`);
    gh.searchParams.set('state', state);
    gh.searchParams.set('allow_signup', 'false');
    // No scope: the public profile is all sign-in needs. The token can't read any repo.
    return redirect(gh.toString(), [cookie(STATE_COOKIE, token, STATE_MINUTES * 60, '/auth/')]);
  }

  async function callback(req) {
    const url = new URL(req.url);
    const pending = await unsign(readCookie(req, STATE_COOKIE), config.secret);
    const clearState = cookie(STATE_COOKIE, '', 0, '/auth/');
    if (!pending || !url.searchParams.get('state') || pending.state !== url.searchParams.get('state')) {
      return page(400, 'Sign-in expired or was tampered with', '<p><a href="/auth/login">Try again</a></p>', [clearState]);
    }
    const tokenRes = await fetchImpl('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ client_id: config.clientId, client_secret: config.clientSecret, code: url.searchParams.get('code'), redirect_uri: `${url.origin}/auth/callback` }),
    });
    const tok = await tokenRes.json().catch(() => ({}));
    if (!tok.access_token) return page(502, 'GitHub refused the sign-in', `<p>${esc(tok.error_description ?? tok.error ?? 'no token')}</p><p><a href="/auth/login">Try again</a></p>`, [clearState]);
    const meRes = await fetchImpl('https://api.github.com/user', {
      headers: { authorization: `Bearer ${tok.access_token}`, accept: 'application/vnd.github+json', 'user-agent': 'orbex-dashboard' },
    });
    const me = await meRes.json().catch(() => ({}));
    if (!me.login) return page(502, 'Could not read your GitHub profile', '<p><a href="/auth/login">Try again</a></p>', [clearState]);
    const u = { provider: 'github', id: String(me.id), login: me.login, name: me.name ?? null, avatar: me.avatar_url ?? null };
    if (!isAllowed(u)) {
      return page(403, 'Not on the list', `<p>Signed in to GitHub as <b>${esc(u.login)}</b>, but this dashboard isn't shared with that account.</p>`, [clearState]);
    }
    const session = await sign({ user: u, exp: Date.now() + SESSION_DAYS * 86_400_000 }, config.secret);
    return redirect(pending.next, [clearState, cookie(SESSION_COOKIE, session, SESSION_DAYS * 86_400)]);
  }

  function logout() {
    return redirect('/auth/login?signed_out=1', [cookie(SESSION_COOKIE, '', 0)]);
  }

  /** /auth/* routes, or null. */
  async function handle(req) {
    const { pathname } = new URL(req.url);
    if (pathname === '/auth/login') {
      // A plain GET shows the button; the button POSTs nothing — it's a link with ?go=1, so a
      // prefetch of /auth/login can't start an OAuth round trip on its own.
      const url = new URL(req.url);
      if (url.searchParams.has('go')) return login(req);
      return loginPage(url);
    }
    if (pathname === '/auth/callback') return callback(req);
    if (pathname === '/auth/logout') return logout();
    return null;
  }

  return { kind: 'github', user, handle };
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function loginPage(url) {
  const next = safeNext(url.searchParams.get('next'));
  const out = url.searchParams.has('signed_out') ? '<p class="m">Signed out.</p>' : '';
  return page(200, 'Orbex', `${out}<p><a class="b" href="/auth/login?go=1&amp;next=${encodeURIComponent(next)}">Sign in with GitHub</a></p>`);
}

/** A tiny self-contained page — served by the gate, so it can't depend on the (gated) bundle. */
export function page(status, title, body, cookies = []) {
  const h = new Headers({ 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' });
  for (const c of cookies) h.append('set-cookie', c);
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.png" type="image/png"><title>${esc(title)}</title>
<style>:root{color-scheme:dark;--p:#120f15;--s:#1b1720;--i:#f4eff6;--m:#a39aa8;--b:#CF27E0}@media (prefers-color-scheme:light){:root{color-scheme:light;--p:#f7f2f8;--s:#fdfbfd;--i:#120f15;--m:#6e6573}}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--p);color:var(--i);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{background:var(--s);border:1px solid rgb(128 128 128/.2);border-top:3px solid var(--b);border-radius:12px;padding:28px 32px;margin:16px;max-width:380px}
h1{font-size:1.3rem;margin:0 0 12px}.m{color:var(--m)}a{color:var(--i)}.b{display:inline-block;background:var(--b);color:#fff;text-decoration:none;font-weight:600;border-radius:999px;padding:9px 18px}</style></head>
<body><main><h1>${esc(title)}</h1>${body}</main></body></html>`, { status, headers: h });
}
