#!/usr/bin/env node
// orbex-dashboard server — serves the page and one JSON endpoint, on 127.0.0.1 only.
//
//   node server/index.mjs --workspace ../my-workspace   # production (serves dist/)
//   node server/index.mjs --dev                         # Vite middleware, hot reload
//   flags: --port 4870  --no-gh  --no-fetch  --workspace <dir> (or ORBEX_WORKSPACE)
//          --orbex <dir> (or ORBEX_HOME) — run producers from that orbex clone instead of <workspace>/scripts
//
// The API itself is server/handlers.mjs (shared with the Netlify deployment); this file adapts it
// to node:http and serves the client.
//
// Bound to loopback on purpose: plan titles are private, and nothing here authenticates. Since
// ORBI-92 the API can also WRITE (capture → inbox/), so the Host header is checked too: a
// DNS-rebinding page that resolves its own name to 127.0.0.1 arrives with the wrong Host.

import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import { findWorkspace, resolveWorkspace } from './snapshot.mjs';
import { createApi, noAuth } from './handlers.mjs';
import { LocalSource } from './sources/local.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined);

const HOST = '127.0.0.1';
const PORT = Number(opt('--port') ?? process.env.PORT ?? 4870);

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
const api = createApi({ source: new LocalSource(WORKSPACE, options), auth: noAuth });
const ALLOWED_HOSTS = new Set([`127.0.0.1:${PORT}`, `localhost:${PORT}`]);

/** node:http → Web Request → handlers.mjs → node:http. */
async function handleApi(req, res) {
  if (!ALLOWED_HOSTS.has(req.headers.host ?? '')) {
    res.writeHead(421, { 'content-type': 'text/plain' }).end('unexpected Host header');
    return;
  }
  const url = `http://${req.headers.host}${req.url}`;
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const request = new Request(url, {
    method: req.method,
    headers: Object.entries(req.headers).flatMap(([k, v]) => (Array.isArray(v) ? v.map((x) => [k, x]) : v == null ? [] : [[k, v]])),
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? 'half' : undefined,
  });
  const response = await api(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
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

let vite = null;
if (flag('--dev')) {
  const { createServer: createVite } = await import('vite');
  vite = await createVite({ root: ROOT, server: { middlewareMode: true }, appType: 'spa' });
}

const server = createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    handleApi(req, res).catch((e) => {
      if (!res.headersSent) res.writeHead(500, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    });
    return;
  }
  if (vite) return vite.middlewares(req, res);
  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`orbex-dashboard: ${path.basename(WORKSPACE.root)} at http://${HOST}:${PORT}/${options.noGh ? ' (inbox not checked)' : ''}`);
});
