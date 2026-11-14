#!/usr/bin/env node
// orbex-dashboard server — serves the page and one JSON endpoint, on 127.0.0.1 only.
//
//   node server/index.mjs --workspace ../my-workspace   # production (serves dist/)
//   node server/index.mjs --dev                         # Vite middleware, hot reload
//   flags: --port 4870  --no-gh  --no-fetch  --workspace <dir> (or ORBEX_WORKSPACE)
//          --orbex <dir> (or ORBEX_HOME) — run producers from that orbex clone instead of <workspace>/scripts
//
// GET /api/snapshot           cached ≤60 s, so several tabs don't each run `gh` and `git fetch`
// GET /api/snapshot?fresh=1   bypasses the cache (the page's Refresh button)
//
// Bound to loopback on purpose: plan titles are private, and nothing here authenticates.

import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSnapshot, findWorkspace, resolveWorkspace } from './snapshot.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined);

const HOST = '127.0.0.1';
const PORT = Number(opt('--port') ?? process.env.PORT ?? 4870);
const CACHE_MS = 60_000;

let WORKSPACE;
try {
  const given = opt('--workspace') ?? process.env.ORBEX_WORKSPACE ?? findWorkspace(process.cwd());
  if (!given) throw new Error('no workspace given — pass --workspace <dir> or set ORBEX_WORKSPACE');
  WORKSPACE = resolveWorkspace(given, opt('--orbex') ?? process.env.ORBEX_HOME);
} catch (e) {
  console.error(`orbex-dashboard: ${e.message}`);
  process.exit(1);
}

const options = { noGh: flag('--no-gh'), fetch: !flag('--no-fetch') };
let cache = null; // { at, body }
let inflight = null;

function snapshot(fresh) {
  if (!fresh && cache && Date.now() - cache.at < CACHE_MS) return Promise.resolve(cache.body);
  // One build at a time, whoever asked; a Refresh during a build shares that build.
  inflight ??= buildSnapshot(WORKSPACE, options)
    .then((s) => {
      const body = JSON.stringify({ ok: true, snapshot: s });
      cache = { at: Date.now(), body };
      return body;
    })
    .catch((e) => JSON.stringify({ ok: false, error: e.message }))
    .finally(() => { inflight = null; });
  return inflight;
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2' };

function serveStatic(req, res) {
  const dist = path.join(ROOT, 'dist');
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(dist, urlPath);
  if (!file.startsWith(dist + path.sep) && file !== dist) { res.writeHead(403).end(); return; }
  if (!existsSync(file) || statSync(file).isDirectory()) file = path.join(dist, 'index.html');
  if (!existsSync(file)) {
    res.writeHead(500, { 'content-type': 'text/plain' }).end('dist/ is missing — run `npm run build` first, or use `npm run dev`.');
    return;
  }
  const hashed = file.includes(`${path.sep}assets${path.sep}`);
  res.writeHead(200, {
    'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'cache-control': hashed ? 'public, max-age=31536000, immutable' : 'no-cache',
  });
  createReadStream(file).pipe(res);
}

async function api(req, res) {
  const fresh = new URL(req.url, 'http://x').searchParams.has('fresh');
  const body = await snapshot(fresh);
  res.writeHead(body.startsWith('{"ok":true') ? 200 : 502, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(body);
}

let vite = null;
if (flag('--dev')) {
  const { createServer: createVite } = await import('vite');
  vite = await createVite({ root: ROOT, server: { middlewareMode: true }, appType: 'spa' });
}

const server = createServer((req, res) => {
  if (req.url.startsWith('/api/snapshot')) return void api(req, res);
  if (vite) return vite.middlewares(req, res);
  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`orbex-dashboard: ${path.basename(WORKSPACE.root)} at http://${HOST}:${PORT}/${options.noGh ? ' (inbox not checked)' : ''}`);
});
