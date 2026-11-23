// Builds one snapshot of a workspace for the page. THIS IS NOT A SOURCE.
//
// It reads no plan, backlog or memory file. It runs the workspace's own producers —
// `scripts/next.mjs --json` and `scripts/build-project-index.mjs --json`, the same two that
// orbex's built-in dashboard.mjs renders — and adds git metadata. A third frontmatter reader
// would be a third thing that can disagree, and a stored snapshot would be a second status list.
// The only state is an in-memory cache in index.mjs, which dies with the process.
//
// In a workspace, scripts/ is a symlink into the sibling orbex clone and the producers find the
// workspace from the `.orbex-workspace` marker above their cwd (ORBI-81), so running them from
// the workspace reaches whatever orbex that workspace consumes — nothing else to configure.

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

/** Walk up from `start` to the directory holding `.orbex-workspace`, or null. */
export function findWorkspace(start) {
  let dir = path.resolve(start);
  for (;;) {
    if (existsSync(path.join(dir, '.orbex-workspace'))) return dir;
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}

/**
 * Resolve the workspace (must hold the marker itself) and the directory its producers live in:
 * the workspace's own scripts/ by default, or `<orbexDir>/scripts` when given — for a workspace
 * with no scripts/ link, such as orbex's examples/sample-workspace.
 */
export function resolveWorkspace(given, orbexDir) {
  const root = path.resolve(given);
  if (!existsSync(path.join(root, '.orbex-workspace'))) {
    throw new Error(`${root} is not an orbex workspace (no .orbex-workspace marker there)`);
  }
  const scripts = orbexDir ? path.join(path.resolve(orbexDir), 'scripts') : path.join(root, 'scripts');
  for (const s of ['next.mjs', 'build-project-index.mjs']) {
    if (!existsSync(path.join(scripts, s))) {
      throw new Error(orbexDir
        ? `${scripts}/${s} not found — --orbex must point at an orbex clone`
        : `${scripts}/${s} not found — is the workspace's scripts/ linked to an orbex clone? (see orbex's README quickstart, or pass --orbex <dir>)`);
    }
  }
  return { root, scripts };
}

async function produce({ root, scripts }, script, extra = []) {
  try {
    const { stdout } = await run(process.execPath, [path.join(scripts, script), '--json', ...extra], {
      cwd: root,
      env: { ...process.env, ORBEX_WORKSPACE: root },
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      timeout: 60_000,
    });
    return JSON.parse(stdout);
  } catch (e) {
    // A producer's own message (e.g. an ambiguous project key) is the thing to show.
    throw new Error(`${script}: ${(e.stderr || e.message || String(e)).trim()}`);
  }
}

async function git(root, ...a) {
  try {
    const { stdout } = await run('git', ['-C', root, ...a], { encoding: 'utf8', timeout: 30_000 });
    return stdout.trim();
  } catch {
    return null;
  }
}

/**
 * Read-only "behind origin" count. `git fetch` updates remote-tracking refs only; nothing here
 * ever pulls, merges or touches the working tree — a dashboard has no business changing files.
 */
async function behindOrigin(root, { fetch }) {
  const upstream = await git(root, 'rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}');
  if (!upstream) return { behind: null, ahead: null, upstream: null, error: 'no upstream branch' };
  let error = null;
  if (fetch) {
    try {
      await run('git', ['-C', root, 'fetch', '--quiet'], { timeout: 30_000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
    } catch (e) {
      error = `git fetch failed: ${(e.stderr || e.message).trim().split('\n')[0]}`;
    }
  }
  const counts = await git(root, 'rev-list', '--left-right', '--count', `HEAD...${upstream}`);
  const [ahead, behind] = counts ? counts.split(/\s+/).map(Number) : [null, null];
  return { behind, ahead, upstream, error };
}

// Plan links go to GitHub, which renders markdown; same derivation as dashboard.mjs.
async function githubBase(root) {
  const [url, branch, prefix] = await Promise.all([
    git(root, 'remote', 'get-url', 'origin'),
    git(root, 'rev-parse', '--abbrev-ref', 'HEAD'),
    git(root, 'rev-parse', '--show-prefix'),
  ]);
  const m = url?.match(/github\.com[:/]([^/:]+)\/([^/]+?)(?:\.git)?$/);
  return m && branch && branch !== 'HEAD'
    ? `https://github.com/${m[1]}/${m[2]}/blob/${encodeURIComponent(branch)}/${prefix ?? ''}`
    : null;
}

/**
 * The producers' --json output is a cross-repo interface now (ORBI-90). If orbex changes it,
 * say exactly what's missing rather than drawing an empty chart.
 */
export function validate(next, index) {
  const missing = [];
  const need = (obj, name, key, type) => {
    const v = obj?.[key];
    if (type === 'array' ? !Array.isArray(v) : v === undefined) missing.push(`${name}.${key}`);
  };
  need(next, 'next', 'projects', 'array');
  need(next, 'next', 'backlog', 'array');
  need(next, 'next', 'inbox', 'array');
  need(next, 'next', 'memoryReview', 'array');
  need(next, 'next', 'inboxError', 'any');
  need(next, 'next', 'memoryReviewError', 'any');
  need(index, 'index', 'projects', 'array');
  need(index, 'index', 'problems', 'array');
  if (missing.length) {
    throw new Error(`producer output changed — missing ${missing.join(', ')}. The installed orbex and orbex-dashboard disagree on the --json format; update one of them.`);
  }
}

/**
 * Just the two producers, validated — no git. GitHubSource uses this on its throwaway mirror;
 * `ws` is `{ root, scripts }`.
 */
export async function buildSnapshotFromProducers(ws, { noGh = false } = {}) {
  const [next, index] = await Promise.all([
    produce(ws, 'next.mjs', noGh ? ['--no-gh'] : []),
    produce(ws, 'build-project-index.mjs'),
  ]);
  validate(next, index);
  return { next, index };
}

/** `ws` is resolveWorkspace()'s result. */
export async function buildSnapshot(ws, { noGh = false, fetch = true } = {}) {
  const { root } = ws;
  const [{ next, index }, sha, status, gh, origin] = await Promise.all([
    buildSnapshotFromProducers(ws, { noGh }),
    git(root, 'rev-parse', '--short', 'HEAD'),
    git(root, 'status', '--porcelain'),
    githubBase(root),
    behindOrigin(root, { fetch }),
  ]);
  return {
    name: path.basename(root),
    generatedAt: new Date().toISOString(),
    noGh,
    git: { sha, dirty: !!status, githubBase: gh, ...origin },
    next,
    index,
  };
}
