// Shared wiring for the Netlify Functions: build the source and auth once per warm instance,
// from environment variables only — nothing personal lives in this public repo.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authConfig, githubAuth } from '../server/auth.mjs';
import { createApi } from '../server/handlers.mjs';
import { GitHubSource, githubConfig } from '../server/sources/github.mjs';

const env = () => (globalThis.Netlify?.env?.toObject?.() ?? process.env);

/** vendor/orbex/scripts, wherever the bundler put it (included_files keeps it relative to the base). */
function orbexScripts() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [process.env.LAMBDA_TASK_ROOT, process.cwd(), path.resolve(here, '..'), path.resolve(here, '../..'), path.resolve(here, '../../..')]
    .filter(Boolean).map((d) => path.join(d, 'vendor', 'orbex', 'scripts'));
  const hit = candidates.find((d) => existsSync(path.join(d, 'next.mjs')));
  if (!hit) throw new Error(`vendored orbex not found (looked in ${candidates.join(', ')}) — did the build run scripts/fetch-orbex.mjs?`);
  return hit;
}

let auth;
export function getAuth() {
  auth ??= githubAuth(authConfig(env()));
  return auth;
}

let api;
export function getApi() {
  api ??= createApi({
    source: new GitHubSource(githubConfig(env()), { orbexScripts: orbexScripts() }),
    auth: getAuth(),
  });
  return api;
}

/** Misconfiguration must refuse, loudly and without detail leaking to an anonymous caller. */
export function configError(e) {
  console.error(`orbex-dashboard: ${e.message}`);
  return new Response(JSON.stringify({ ok: false, error: 'the dashboard is not configured — see the function log' }), {
    status: 500, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
