import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { authConfig, githubAuth, safeNext, sign, unsign, SESSION_COOKIE } from '../server/auth.mjs';
import { createApi } from '../server/handlers.mjs';
import { LocalSource } from '../server/sources/local.mjs';
import { GitHubSource, githubConfig } from '../server/sources/github.mjs';
import { resolveWorkspace } from '../server/snapshot.mjs';

const ORBEX = path.resolve(__dirname, '../../orbex');
const SAMPLE = path.join(ORBEX, 'examples/sample-workspace');
const SECRET = 'x'.repeat(40);
const ENV = { ORBEX_OAUTH_CLIENT_ID: 'cid', ORBEX_OAUTH_CLIENT_SECRET: 'cs', ORBEX_SESSION_SECRET: SECRET, ORBEX_ALLOWED_USERS: 'Alice, bob' };
const ORIGIN = 'https://dash.example';

const sessionCookie = async (user: object, exp = Date.now() + 60_000, secret = SECRET) =>
  `${SESSION_COOKIE}=${encodeURIComponent(await sign({ user, exp }, secret))}`;
const alice = { provider: 'github', id: '1', login: 'alice' };

describe('signed tokens', () => {
  it('round-trips, and rejects tampering, a wrong secret and expiry', async () => {
    const t = await sign({ a: 1, exp: Date.now() + 1000 }, SECRET);
    expect(await unsign(t, SECRET)).toMatchObject({ a: 1 });
    expect(await unsign(t, 'y'.repeat(40))).toBeNull();
    const [body, sig] = t.split('.');
    const forged = Buffer.from(JSON.stringify({ a: 2, exp: Date.now() + 1000 })).toString('base64url');
    expect(await unsign(`${forged}.${sig}`, SECRET)).toBeNull();
    expect(await unsign(`${body}.${sig}.x`, SECRET)).toBeNull();
    expect(await unsign(await sign({ exp: Date.now() - 1 }, SECRET), SECRET)).toBeNull();
    expect(await unsign('garbage', SECRET)).toBeNull();
  });
});

describe('auth config', () => {
  it('refuses to start half-configured', () => {
    expect(() => authConfig({ ...ENV, ORBEX_ALLOWED_USERS: '' })).toThrow(/ORBEX_ALLOWED_USERS/);
    expect(() => authConfig({ ...ENV, ORBEX_SESSION_SECRET: 'short' })).toThrow(/32/);
    expect(authConfig(ENV).allowed).toEqual(['alice', 'bob']);
  });
  it('only follows same-site relative next paths', () => {
    expect(safeNext('/projects/X-1?a=b')).toBe('/projects/X-1?a=b');
    for (const bad of ['//evil.com', '/\\evil.com', 'https://evil.com', '/auth/logout', 'javascript:x', null]) expect(safeNext(bad)).toBe('/');
  });
});

describe('github auth', () => {
  const auth = githubAuth(authConfig(ENV));
  const req = (cookie?: string) => new Request(`${ORIGIN}/api/snapshot`, { headers: cookie ? { cookie } : {} });

  it('accepts a valid session for an allowed login (case-insensitive)', async () => {
    expect(await auth.user(req(await sessionCookie({ ...alice, login: 'ALICE' })))).toMatchObject({ login: 'ALICE' });
  });
  it('rejects no cookie, an expired one, a forged one, and a login no longer allowed', async () => {
    expect(await auth.user(req())).toBeNull();
    expect(await auth.user(req(await sessionCookie(alice, Date.now() - 1)))).toBeNull();
    expect(await auth.user(req(await sessionCookie(alice, undefined, 'z'.repeat(40))))).toBeNull();
    expect(await auth.user(req(await sessionCookie({ ...alice, login: 'mallory' })))).toBeNull();
  });
  it('a removed user is refused at once, cookie or not', async () => {
    const c = await sessionCookie({ ...alice, login: 'bob' });
    const after = githubAuth(authConfig({ ...ENV, ORBEX_ALLOWED_USERS: 'alice' }));
    expect(await after.user(req(c))).toBeNull();
  });
  it('the API refuses a signed-out caller', async () => {
    const api = createApi({ source: { kind: 'github', name: 'x', snapshot: async () => ({}), readText: async () => '' }, auth });
    expect((await api(req()))!.status).toBe(401);
  });

  it('runs the OAuth round trip: state checked, allowlist enforced, session set', async () => {
    const fake = (login: string) => (async (url: string) => {
      if (url.includes('access_token')) return Response.json({ access_token: 'gho_t' });
      if (url.endsWith('/user')) return Response.json({ id: 7, login, name: 'N', avatar_url: 'https://a/x.png' });
      throw new Error(`unexpected ${url}`);
    }) as unknown as typeof fetch;
    const flow = async (login: string, tamper = false) => {
      const a = githubAuth(authConfig(ENV), fake(login));
      const start = await a.handle(new Request(`${ORIGIN}/auth/login?go=1&next=/projects`));
      const to = new URL(start!.headers.get('location')!);
      expect(to.origin).toBe('https://github.com');
      expect(to.searchParams.get('redirect_uri')).toBe(`${ORIGIN}/auth/callback`);
      expect(to.searchParams.get('scope')).toBeNull();
      const stateCookie = start!.headers.get('set-cookie')!.split(';')[0];
      const state = tamper ? 'other' : to.searchParams.get('state');
      return a.handle(new Request(`${ORIGIN}/auth/callback?code=c&state=${state}`, { headers: { cookie: stateCookie } }));
    };
    const ok = await flow('alice');
    expect(ok!.status).toBe(302);
    expect(ok!.headers.get('location')).toBe('/projects');
    const set = ok!.headers.getSetCookie().find((c) => c.startsWith(SESSION_COOKIE))!;
    expect(set).toMatch(/HttpOnly; Secure; SameSite=Lax/);
    expect(await auth.user(new Request(ORIGIN, { headers: { cookie: set.split(';')[0] } }))).toMatchObject({ login: 'alice', id: '7' });

    expect((await flow('mallory'))!.status).toBe(403);
    expect((await flow('alice', true))!.status).toBe(400);
  });
});

// ---- GitHubSource against a fake GitHub that serves the sample workspace ---------------------

function fakeGitHub(root: string, { prefix = '' } = {}) {
  const commits: { path: string; body: any }[] = [];
  const read = (rel: string) => { const f = path.join(root, rel); return existsSync(f) && statSync(f).isFile() ? { text: readFileSync(f, 'utf8'), isBinary: false } : null; };
  const tree = (rel: string, depth: number): any => {
    const d = path.join(root, rel);
    if (!existsSync(d) || !statSync(d).isDirectory()) return null;
    return { entries: readdirSync(d).map((name) => {
      const isDir = statSync(path.join(d, name)).isDirectory();
      return { name, type: isDir ? 'tree' : 'blob', object: isDir ? (depth > 1 ? tree(path.join(rel, name), depth - 1) : {}) : read(path.join(rel, name)) };
    }) };
  };
  const strip = (expr: string) => expr.replace(/^refs\/heads\/main:/, '').slice(prefix.length);
  const f = (async (url: string, init: RequestInit = {}) => {
    const u = new URL(url);
    expect((init.headers as Record<string, string>).authorization).toBe('Bearer tok');
    if (u.pathname === '/repos/o/ws') return Response.json({ default_branch: 'main' });
    if (u.pathname === '/graphql') {
      const v = JSON.parse(String(init.body)).variables;
      return Response.json({ data: { repository: {
        ref: { name: 'main', target: { oid: 'abcdef1234567890' } },
        marker: read(strip(v.marker)), backlog: read(strip(v.backlog)),
        projects: tree(strip(v.projects), 2), memory: tree(strip(v.memory), 1), inbox: tree(strip(v.inbox), 1),
      } } });
    }
    if (u.pathname === '/repos/o/ws/issues') return Response.json([
      { number: 4, title: 'From the phone', created_at: '2026-11-01T00:00:00Z', html_url: 'https://github.com/o/ws/issues/4', labels: [] },
      { number: 5, title: 'A PR', pull_request: {}, labels: [] },
    ]);
    if (u.pathname.startsWith('/repos/o/ws/contents/')) {
      const p = decodeURIComponent(u.pathname.slice('/repos/o/ws/contents/'.length));
      if (init.method === 'PUT') {
        if (commits.some((c) => c.path === p)) return Response.json({ message: 'sha wasn\'t supplied' }, { status: 422 });
        commits.push({ path: p, body: JSON.parse(String(init.body)) });
        return Response.json({ commit: { sha: 'c0ffee' } }, { status: 201 });
      }
      const r = read(p.slice(prefix.length));
      return r ? new Response(r.text) : Response.json({ message: 'Not Found' }, { status: 404 });
    }
    throw new Error(`unexpected ${init.method ?? 'GET'} ${url}`);
  }) as unknown as typeof fetch;
  return { fetch: f, commits };
}

describe.skipIf(!existsSync(SAMPLE))('GitHubSource on the sample workspace', () => {
  const cfg = githubConfig({ ORBEX_GITHUB_REPO: 'o/ws', ORBEX_GITHUB_TOKEN: 'tok' });
  const scripts = path.join(ORBEX, 'scripts');

  it('produces the same projects, backlog, memory and captures as LocalSource', async () => {
    const gh = new GitHubSource(cfg, { orbexScripts: scripts, fetch: fakeGitHub(SAMPLE).fetch });
    const local = new LocalSource(resolveWorkspace(SAMPLE, ORBEX), { noGh: true, fetch: false });
    const [h, l] = await Promise.all([gh.snapshot(), local.snapshot()]);
    expect(h.source).toBe('github');
    expect(h.index).toEqual(l.index);
    expect(h.next.projects).toEqual(l.next.projects);
    expect(h.next.backlog).toEqual(l.next.backlog);
    expect(h.next.memoryReview).toEqual(l.next.memoryReview);
    const files = (x: any) => x.next.inbox.filter((i: any) => i.source === 'file');
    expect(files(h)).toEqual(files(l));
    expect(h.next.inbox.filter((i: any) => i.source === 'issue').map((i: any) => i.number)).toEqual([4]); // PRs dropped
    expect(h.next.inboxError).toBeNull();
    expect(h.git).toMatchObject({ sha: 'abcdef1', dirty: false, behind: null, githubBase: 'https://github.com/o/ws/blob/main/' });
  });

  it('honours a workspace in a subdirectory', async () => {
    const parent = mkdtempSync(path.join(tmpdir(), 'ghsub-'));
    cpSync(SAMPLE, path.join(parent, 'ws'), { recursive: true });
    const sub = githubConfig({ ORBEX_GITHUB_REPO: 'o/ws', ORBEX_GITHUB_TOKEN: 'tok', ORBEX_WORKSPACE_PATH: 'ws/' });
    const gh = new GitHubSource(sub, { orbexScripts: scripts, fetch: fakeGitHub(path.join(parent, 'ws'), { prefix: 'ws/' }).fetch });
    expect((await gh.snapshot()).index.key).toBe('DEMO');
    expect(() => githubConfig({ ORBEX_GITHUB_REPO: 'o/ws', ORBEX_GITHUB_TOKEN: 't', ORBEX_WORKSPACE_PATH: '../x' })).toThrow();
  });

  it('commits a capture without overwriting, and reads plans by path', async () => {
    const fake = fakeGitHub(SAMPLE);
    const gh = new GitHubSource(cfg, { orbexScripts: scripts, fetch: fake.fetch });
    const now = new Date('2026-11-22T18:30:00Z');
    const a = await gh.capture({ title: 'Twice', body: 'n' }, now);
    const b = await gh.capture({ title: 'Twice', body: '' }, now);
    expect(a).toMatchObject({ committed: true, commit: 'c0ffee', item: { file: 'inbox/2026-11-22T1830-twice.md' } });
    expect(b.item.file).toBe('inbox/2026-11-22T1830-twice-2.md');
    expect(fake.commits[0].body).toMatchObject({ message: 'inbox: Twice', branch: 'main' });
    expect(Buffer.from(fake.commits[0].body.content, 'base64').toString()).toMatch(/# Twice\n\nn\n$/);
    const plan = (await gh.snapshot()).index.projects[0];
    expect(await gh.readText(plan.file)).toMatch(/^---/);
  });

  it('names a wrong repo, branch or workspace path instead of drawing nothing', async () => {
    const empty = mkdtempSync(path.join(tmpdir(), 'ghempty-'));
    const gh = new GitHubSource(cfg, { orbexScripts: scripts, fetch: fakeGitHub(empty).fetch });
    await expect(gh.snapshot()).rejects.toThrow(/\.orbex-workspace not found/);
  });
});
