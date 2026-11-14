// The derivations are a port of orbex's dashboard.mjs and must agree with it (ORBI-90).
// Renders the built-in dashboard for the sample workspace and compares the numbers it prints
// with derive.ts on the same producers' output, same day. Skipped without a sibling orbex.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildSnapshot, resolveWorkspace } from '../server/snapshot.mjs';
import { counts, cycleTime, daysText, throughput, timeline, todayOf } from '../src/derive';
import type { Snapshot } from '../src/types';

const ORBEX = path.resolve(__dirname, '../../orbex');
const SAMPLE = path.join(ORBEX, 'examples/sample-workspace');

describe.skipIf(!existsSync(path.join(ORBEX, 'scripts/dashboard.mjs')))('parity with orbex dashboard.mjs', () => {
  it('prints the same numbers', async () => {
    const out = path.join(mkdtempSync(path.join(tmpdir(), 'orbex-dash-')), 'd.html');
    execFileSync(process.execPath, [path.join(ORBEX, 'scripts/dashboard.mjs'), '--no-gh', '--out', out], {
      env: { ...process.env, ORBEX_WORKSPACE: SAMPLE }, stdio: 'ignore',
    });
    const html = readFileSync(out, 'utf8');
    const s = (await buildSnapshot(resolveWorkspace(SAMPLE, ORBEX), { noGh: true, fetch: false })) as Snapshot;
    const today = todayOf(new Date());
    const projects = s.index.projects;

    const t = throughput(projects, today).totals;
    expect(html).toContain(`${t.opened} opened, ${t.closed} closed.`);

    const c = cycleTime(projects);
    expect(html).toContain(`Median <b>${daysText(c.median)}</b>, 90th percentile <b>${daysText(c.p90)}</b>, longest <b>${daysText(c.longest)}</b>`);
    for (const b of c.buckets) expect(html).toContain(`<td>${b.label}</td><td>${b.n}</td>`);

    for (const [st, n] of Object.entries(counts(projects))) if (n) expect(html).toContain(`<li class="chip ${st}"><b>${n}</b> ${st}</li>`);

    const { spans } = timeline(projects, today);
    expect(html).toContain(`The ${spans.length} most recently opened projects`);
    expect(html).toContain(`In flight <span class="n">${s.next.projects.length}</span>`);
  });
});
