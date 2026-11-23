// The API, as Web-standard Request → Response handlers, so the same code runs under the local
// node:http server (server/index.mjs) and as Netlify Functions (netlify/). Nothing in here
// knows which runtime, which source (local checkout or GitHub), or which auth is in use.
//
//   GET  /api/session            who is signed in, which source, whether capture is possible
//   GET  /api/snapshot[?fresh=1] the producers' output + metadata, cached ≤ cacheMs
//   GET  /api/plan?id=ORBI-12    one project's plan.md, raw — id looked up in the index, never a path
//   POST /api/inbox              { title, body? } → creates one inbox/ file
//
// Writes need the `X-Orbex-Request: 1` header. A browser can't send a custom header cross-origin
// without a CORS preflight, and nothing here answers one — so another site can't make a signed-in
// browser capture on its behalf.

import { validate } from './snapshot.mjs';
import { CaptureError, parseCapture } from './capture.mjs';

const PLAN_FILE = /^projects\/[A-Za-z][A-Za-z0-9]*-\d+\/(plan|recommendation)\.md$/;
export const WRITE_HEADER = 'x-orbex-request';

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers } });

/**
 * The producers' inbox/ support is new in orbex (ORBI-92). An older orbex still works — the
 * page just can't LIST captures, so say that instead of showing an inbox that looks complete.
 */
function normalise(snapshot) {
  if (snapshot?.next && snapshot.next.inboxFilesError === undefined) {
    snapshot.next.inboxFilesError = "this orbex doesn't read inbox/ yet — update orbex to see captures here";
  }
  return snapshot;
}

/**
 * @param {{ source: { kind: string, name: string, snapshot(): Promise<any>, readText(rel: string): Promise<string>, capture?(e: any): Promise<any> },
 *           auth: { kind: string, user(req: Request): Promise<any> },
 *           cacheMs?: number }} deps
 */
export function createApi({ source, auth, cacheMs = 60_000 }) {
  let cache = null; // { at, snapshot }
  let inflight = null;

  function snapshot(fresh) {
    if (!fresh && cache && Date.now() - cache.at < cacheMs) return Promise.resolve(cache.snapshot);
    // One build at a time, whoever asked; a Refresh during a build shares that build.
    inflight ??= source.snapshot()
      .then((s) => {
        validate(s.next, s.index);
        normalise(s);
        cache = { at: Date.now(), snapshot: s };
        return s;
      })
      .finally(() => { inflight = null; });
    return inflight;
  }

  const routes = {
    'GET /api/session': async (_req, user) => json(200, {
      ok: true,
      user,
      auth: auth.kind,
      source: source.kind,
      name: source.name,
      canCapture: typeof source.capture === 'function',
    }),

    'GET /api/snapshot': async (req) => {
      try {
        const s = await snapshot(new URL(req.url).searchParams.has('fresh'));
        return json(200, { ok: true, snapshot: s });
      } catch (e) {
        return json(502, { ok: false, error: e.message });
      }
    },

    'GET /api/plan': async (req) => {
      const id = new URL(req.url).searchParams.get('id') ?? '';
      let s;
      try { s = await snapshot(false); } catch (e) { return json(502, { ok: false, error: e.message }); }
      const p = s.index.projects.find((q) => q.id === id);
      if (!p) return json(404, { ok: false, error: `no project ${id}` });
      // Belt and braces: the index produced this path, but it is still never trusted as a path.
      if (!PLAN_FILE.test(p.file)) return json(400, { ok: false, error: `unexpected plan path ${p.file}` });
      try {
        return json(200, { ok: true, id: p.id, file: p.file, text: await source.readText(p.file) });
      } catch (e) {
        return json(502, { ok: false, error: `could not read ${p.file}: ${e.message}` });
      }
    },

    'POST /api/inbox': async (req) => {
      if (typeof source.capture !== 'function') return json(405, { ok: false, error: 'this source is read-only' });
      if (req.headers.get(WRITE_HEADER) !== '1') return json(403, { ok: false, error: `missing ${WRITE_HEADER} header` });
      let entry;
      try {
        entry = parseCapture(await req.json().catch(() => { throw new CaptureError('the body is not JSON'); }));
      } catch (e) {
        return json(e.status ?? 400, { ok: false, error: e.message });
      }
      try {
        const result = await source.capture(entry);
        cache = null; // the next snapshot must include it
        return json(201, { ok: true, ...result });
      } catch (e) {
        // An upstream status (GitHub's 401, say) must not reach the page as OUR 401 — that reads
        // as "you're signed out". Anything that isn't a validation error is a bad gateway.
        return json(e instanceof CaptureError ? e.status : 502, { ok: false, error: `capture failed: ${e.message}` });
      }
    },
  };

  /** Returns a Response for /api/* paths, or null for anything else. */
  return async function handle(req) {
    const { pathname } = new URL(req.url);
    if (!pathname.startsWith('/api/')) return null;
    const route = routes[`${req.method} ${pathname}`];
    if (!route) return json(404, { ok: false, error: `no route ${req.method} ${pathname}` });
    const user = await auth.user(req);
    if (auth.kind !== 'none' && !user) return json(401, { ok: false, error: 'not signed in' });
    return route(req, user);
  };
}

/** Local mode: no sign-in. The server is bound to loopback instead (see index.mjs). */
export const noAuth = { kind: 'none', user: async () => null };
