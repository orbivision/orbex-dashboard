// Every path except /auth/* passes through here first — the page, its JS and CSS, and /api.
// The bundle holds no workspace data, but a private workspace's dashboard shouldn't even admit
// to existing for an anonymous visitor. Misconfigured = everyone refused, never everyone allowed.
import { authConfig, githubAuth, page } from '../../server/auth.mjs';

let auth;
let broken = null;

export default async (req, context) => {
  try {
    auth ??= githubAuth(authConfig(Netlify.env.toObject()));
  } catch (e) {
    broken = e.message;
  }
  if (!auth) {
    console.error(`orbex-dashboard gate: ${broken}`);
    return page(500, 'Not configured', '<p>Sign-in is not configured for this deployment. The edge function log says what is missing.</p>');
  }
  if (await auth.user(req)) return context.next();
  const url = new URL(req.url);
  if (url.pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({ ok: false, error: 'not signed in' }), { status: 401, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  }
  const accept = req.headers.get('accept') ?? '';
  if (req.method === 'GET' && accept.includes('text/html')) {
    return Response.redirect(`${url.origin}/auth/login?next=${encodeURIComponent(url.pathname + url.search)}`, 302);
  }
  return new Response('not signed in', { status: 401, headers: { 'cache-control': 'no-store' } });
};

export const config = { path: '/*', excludedPath: ['/auth/*'] };
