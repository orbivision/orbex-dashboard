import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { blobSha, captureContent, captureFilename, editedContent, parseCapture, parseWrite, slugify, splitInbox } from '../server/capture.mjs';
import { createApi, noAuth } from '../server/handlers.mjs';
import { LocalSource } from '../server/sources/local.mjs';
import { resolveWorkspace } from '../server/snapshot.mjs';

const ORBEX = path.resolve(__dirname, '../../orbex');
const SAMPLE = path.join(ORBEX, 'examples/sample-workspace');
const NOW = new Date('2026-11-22T18:30:42.123Z');

describe('capture format', () => {
  it('normalises and validates', () => {
    expect(parseCapture({ title: '  two\n lines ', body: 'a\r\nb' })).toEqual({ title: 'two lines', body: 'a\nb' });
    expect(() => parseCapture({ title: '   ' })).toThrow(/title is required/);
    expect(() => parseCapture({ title: 'x'.repeat(201) })).toThrow(/over 200/);
    expect(() => parseCapture(null)).toThrow();
  });
  it('slugs safely', () => {
    expect(slugify('Café: ../../etc/passwd!')).toBe('cafe-etc-passwd');
    expect(slugify('日本語')).toBe('capture');
  });
  it('names by UTC minute, with a collision suffix', () => {
    expect(captureFilename('An idea', NOW)).toBe('2026-11-22T1830-an-idea.md');
    expect(captureFilename('An idea', NOW, 2)).toBe('2026-11-22T1830-an-idea-2.md');
  });
  it('writes the frontmatter next.mjs reads', () => {
    expect(captureContent({ title: 'An idea', body: '' }, NOW)).toBe('---\ncaptured: 2026-11-22T18:30:42Z\nsource: dashboard\n---\n\n# An idea\n');
    expect(captureContent({ title: 'An idea', body: 'why' }, NOW)).toMatch(/# An idea\n\nwhy\n$/);
  });
});

describe('editing format', () => {
  const FILE = '---\ncaptured: 2026-11-22T18:30:42Z\nsource: dashboard\nmine: kept\n---\n\n# Old title\n\nold notes\n';
  it('computes the same blob sha as git', () => {
    expect(blobSha('hello\n')).toBe('ce013625030ba8dba906f756967f9e9ca394464a'); // git hash-object
  });
  it('rewrites the title and notes, keeping frontmatter verbatim', () => {
    expect(splitInbox(FILE)).toMatchObject({ title: 'Old title', body: 'old notes' });
    expect(editedContent(FILE, { title: 'New', body: 'a\nb' })).toBe('---\ncaptured: 2026-11-22T18:30:42Z\nsource: dashboard\nmine: kept\n---\n\n# New\n\na\nb\n');
    expect(editedContent(FILE, { title: 'New', body: '' })).toMatch(/---\n\n# New\n$/);
  });
  it('refuses names that are not inbox files', () => {
    const v = 'a'.repeat(40);
    for (const name of ['../BACKLOG.md', 'sub/x.md', '.hidden.md', 'README.md', 'x.txt', '']) {
      expect(() => parseWrite({ name, version: v }, { edit: false })).toThrow(/not an inbox file/);
    }
    expect(() => parseWrite({ name: 'x.md', version: 'nope' }, { edit: false })).toThrow(/version/);
    expect(parseWrite({ name: 'x.md', version: v, title: ' t ' }, { edit: true })).toEqual({ name: 'x.md', version: v, title: 't', body: '' });
  });
});

// A fake source: the handlers must not care what's behind the interface.
function fakeSource(overrides = {}) {
  const projects = [{ id: 'DEMO-1', num: 1, file: 'projects/DEMO-1/plan.md', title: 't', status: 'active' }];
  return {
    kind: 'local',
    name: 'fake',
    snapshots: 0,
    async snapshot() {
      this.snapshots++;
      return {
        next: { projects: [], backlog: [], inbox: [], inboxError: null, inboxFilesError: null, memoryReview: [], memoryReviewError: null },
        index: { projects, problems: [] },
      };
    },
    async readText(rel: string) { return `read ${rel}`; },
    async capture(e: { title: string }) { return { item: { source: 'file', file: 'inbox/x.md', title: e.title }, committed: false }; },
    ...overrides,
  };
}
const req = (p: string, init?: RequestInit) => new Request(`http://127.0.0.1:4870${p}`, init);
const post = (body: unknown, headers: Record<string, string> = { 'x-orbex-request': '1' }) =>
  req('/api/inbox', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });

describe('API handlers', () => {
  it('ignores non-API paths', async () => {
    expect(await createApi({ source: fakeSource(), auth: noAuth })(req('/projects'))).toBeNull();
  });
  it('reports the session', async () => {
    const r = await createApi({ source: fakeSource(), auth: noAuth })(req('/api/session'));
    expect(await r!.json()).toMatchObject({ ok: true, user: null, auth: 'none', source: 'local', canCapture: true });
  });
  it('serves a plan only by project id, never by path', async () => {
    const api = createApi({ source: fakeSource(), auth: noAuth });
    expect(await (await api(req('/api/plan?id=DEMO-1')))!.json()).toMatchObject({ ok: true, text: 'read projects/DEMO-1/plan.md' });
    expect((await api(req('/api/plan?id=../../.env')))!.status).toBe(404);
    expect((await api(req('/api/plan?id=projects/DEMO-1/plan.md')))!.status).toBe(404);
  });
  it('refuses a plan path the index should never have produced', async () => {
    const src = fakeSource({
      async snapshot() {
        return { next: { projects: [], backlog: [], inbox: [], inboxError: null, memoryReview: [], memoryReviewError: null },
          index: { projects: [{ id: 'DEMO-2', file: '../secrets.md', status: 'open' }], problems: [] } };
      },
    });
    expect((await createApi({ source: src, auth: noAuth })(req('/api/plan?id=DEMO-2')))!.status).toBe(400);
  });
  it('requires the write header for capture', async () => {
    const api = createApi({ source: fakeSource(), auth: noAuth });
    expect((await api(post({ title: 'x' }, {})))!.status).toBe(403);
    expect((await api(post({ title: '' })))!.status).toBe(400);
    expect((await api(post({ title: 'ok' })))!.status).toBe(201);
  });
  it('drops the snapshot cache after a capture', async () => {
    const src = fakeSource();
    const api = createApi({ source: src, auth: noAuth });
    await api(req('/api/snapshot'));
    await api(req('/api/snapshot'));
    expect(src.snapshots).toBe(1);
    await api(post({ title: 'ok' }));
    await api(req('/api/snapshot'));
    expect(src.snapshots).toBe(2);
  });
  it('says so when the installed orbex predates inbox/ files', async () => {
    const src = fakeSource({
      async snapshot() {
        return { next: { projects: [], backlog: [], inbox: [], inboxError: null, memoryReview: [], memoryReviewError: null }, index: { projects: [], problems: [] } };
      },
    });
    const body = await (await createApi({ source: src, auth: noAuth })(req('/api/snapshot')))!.json();
    expect(body.snapshot.next.inboxFilesError).toMatch(/update orbex/);
  });
  it('rejects a signed-out request when auth is on', async () => {
    const auth = { kind: 'github', user: async () => null };
    expect((await createApi({ source: fakeSource(), auth })(req('/api/snapshot')))!.status).toBe(401);
  });
});

describe.skipIf(!existsSync(SAMPLE))('LocalSource capture, end to end through next.mjs', () => {
  it('writes a file the producers then list', async () => {
    const ws = mkdtempSync(path.join(tmpdir(), 'cap-'));
    cpSync(SAMPLE, ws, { recursive: true });
    const src = new LocalSource(resolveWorkspace(ws, ORBEX), { noGh: true, fetch: false });
    const api = createApi({ source: src, auth: noAuth });
    const a = await (await api(post({ title: 'Same idea', body: 'notes' })))!.json();
    const b = await (await api(post({ title: 'Same idea' })))!.json();
    expect(a.item.file).not.toBe(b.item.file); // never overwrites
    expect(readdirSync(path.join(ws, 'inbox')).filter((f) => f.includes('same-idea'))).toHaveLength(2);
    expect(readFileSync(path.join(ws, a.item.file), 'utf8')).toMatch(/# Same idea\n\nnotes/);
    const snap = await (await api(req('/api/snapshot')))!.json();
    const files = snap.snapshot.next.inbox.filter((i: { source?: string }) => i.source === 'file');
    expect(files.map((i: { title: string }) => i.title)).toEqual(expect.arrayContaining(['Same idea']));
    expect(files.find((i: { file: string }) => i.file === a.item.file)).toMatchObject({ body: 'notes' });
  });
});

describe.skipIf(!existsSync(SAMPLE))('LocalSource edit and discard, end to end', () => {
  const H = { 'content-type': 'application/json', 'x-orbex-request': '1' };
  const put = (b: unknown, h: Record<string, string> = H) => req('/api/inbox/item', { method: 'PUT', headers: h, body: JSON.stringify(b) });
  const del = (b: unknown) => req('/api/inbox/item', { method: 'DELETE', headers: H, body: JSON.stringify(b) });

  it('edits with a version guard and discards', async () => {
    const ws = mkdtempSync(path.join(tmpdir(), 'edit-'));
    cpSync(SAMPLE, ws, { recursive: true });
    const api = createApi({ source: new LocalSource(resolveWorkspace(ws, ORBEX), { noGh: true, fetch: false }), auth: noAuth });
    const name = (await (await api(post({ title: 'Draft', body: 'v1' })))!.json()).item.file.slice('inbox/'.length);

    const got = await (await api(req(`/api/inbox/item?name=${name}`)))!.json();
    expect(got).toMatchObject({ ok: true, title: 'Draft', body: 'v1' });
    expect(got.version).toBe(blobSha(readFileSync(path.join(ws, 'inbox', name), 'utf8')));

    expect((await api(put({ name, version: got.version, title: 'x' }, { 'content-type': 'application/json' })))!.status).toBe(403);
    const saved = await (await api(put({ name, version: got.version, title: 'Final', body: 'v2' })))!.json();
    expect(saved).toMatchObject({ ok: true, title: 'Final' });
    const text = readFileSync(path.join(ws, 'inbox', name), 'utf8');
    expect(text).toMatch(/^---\ncaptured: .*\nsource: dashboard\n---\n\n# Final\n\nv2\n$/);
    expect(saved.version).toBe(blobSha(text));

    // A second tab still holding the first version is refused, and nothing is written.
    expect((await api(put({ name, version: got.version, title: 'Stale' })))!.status).toBe(409);
    expect((await api(del({ name, version: got.version })))!.status).toBe(409);
    expect(readFileSync(path.join(ws, 'inbox', name), 'utf8')).toBe(text);

    // The producers see the edit.
    const snap = await (await api(req('/api/snapshot')))!.json();
    expect(snap.snapshot.next.inbox.find((i: { file?: string }) => i.file === `inbox/${name}`)).toMatchObject({ title: 'Final', body: 'v2' });

    // Only listed captures, never another workspace file.
    expect((await api(req('/api/inbox/item?name=../BACKLOG.md')))!.status).toBe(400);
    expect((await api(req('/api/inbox/item?name=nope.md')))!.status).toBe(404);

    expect((await api(del({ name, version: saved.version })))!.status).toBe(200);
    expect(existsSync(path.join(ws, 'inbox', name))).toBe(false);
    expect((await api(req(`/api/inbox/item?name=${name}`)))!.status).toBe(404);
    expect(readdirSync(path.join(ws, 'inbox')).filter((f) => f.endsWith('.tmp'))).toEqual([]);
  });
});
