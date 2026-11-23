// /api/* on Netlify. The edge gate already refused anyone not signed in; createApi checks the
// session again (defence in depth — a gate bypassed by a routing mistake must not open the API).
import { configError, getApi } from '../lib.mjs';

export default async (req) => {
  let api;
  try { api = getApi(); } catch (e) { return configError(e); }
  return (await api(normalise(req))) ?? new Response('not found', { status: 404 });
};

// `netlify dev` (CLI 27.20) hands non-GET requests to the function as `/api/inbox/index.htm`,
// after trying them as a static directory. Undo that; it can never be a real API path.
function normalise(req) {
  const url = new URL(req.url);
  if (!/\/index\.html?$/.test(url.pathname)) return req;
  url.pathname = url.pathname.replace(/\/index\.html?$/, '');
  return new Request(url, req);
}

export const config = { path: '/api/*' };
