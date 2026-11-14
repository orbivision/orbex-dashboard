import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildSnapshot, resolveWorkspace, validate } from '../server/snapshot.mjs';

const ORBEX = path.resolve(__dirname, '../../orbex');
const SAMPLE = path.join(ORBEX, 'examples/sample-workspace');

describe('resolveWorkspace', () => {
  it('rejects a directory with no marker', () => {
    expect(() => resolveWorkspace(mkdtempSync(path.join(tmpdir(), 'nows-')))).toThrow(/not an orbex workspace/);
  });
  it('rejects a workspace whose scripts/ is not linked', () => {
    const d = mkdtempSync(path.join(tmpdir(), 'ws-'));
    writeFileSync(path.join(d, '.orbex-workspace'), 'key: X\n');
    expect(() => resolveWorkspace(d)).toThrow(/scripts\/next\.mjs not found/);
  });
});

describe('validate', () => {
  const next = { projects: [], backlog: [], inbox: [], inboxError: null, memoryReview: [], memoryReviewError: null };
  const index = { projects: [], problems: [] };
  it('accepts the current shape', () => expect(() => validate(next, index)).not.toThrow());
  it('names what went missing', () => {
    const { backlog: _, ...rest } = next;
    expect(() => validate(rest, index)).toThrow(/missing next\.backlog/);
  });
});

describe.skipIf(!existsSync(SAMPLE))('buildSnapshot on the sample workspace', () => {
  it('returns producer output plus git metadata, never writing anything', async () => {
    const s = await buildSnapshot(resolveWorkspace(SAMPLE, ORBEX), { noGh: true, fetch: false });
    expect(s.name).toBe('sample-workspace');
    expect(s.index.key).toBe('DEMO');
    expect(s.index.projects.length).toBeGreaterThan(0);
    expect(s.next.inboxError).toMatch(/no-gh/);
    expect(s.git.sha).toMatch(/^[0-9a-f]+$/);
  });
});
