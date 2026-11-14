import { describe, expect, it } from 'vitest';
import snapshot from './fixtures/sample-snapshot.json';
import type { Snapshot } from '../src/types';
import { counts, cycleTime, niceAxis, planHref, throughput, timeline, toDay } from '../src/derive';

const s = snapshot as unknown as Snapshot;
const projects = s.index.projects;
const TODAY = Date.UTC(2026, 10, 14); // the fixture's generatedAt day

describe('toDay', () => {
  it('treats frontmatter dates as whole UTC days', () => {
    expect(toDay('2026-11-14')).toBe(TODAY);
    expect(toDay('2026-11-14T00:00')).toBeNull();
    expect(toDay(undefined)).toBeNull();
  });
});

describe('derivations on the sample workspace', () => {
  it('counts every project exactly once', () => {
    const c = counts(projects);
    expect(Object.values(c).reduce((a, b) => a + b, 0)).toBe(projects.length);
  });

  it('cycle time only uses done projects with both dates, sorted', () => {
    const c = cycleTime(projects);
    const done = projects.filter((p) => p.status === 'done' && p.opened && p.closed);
    expect(c.days).toHaveLength(done.length);
    expect([...c.days].sort((a, b) => a - b)).toEqual(c.days);
    expect(c.buckets.reduce((a, b) => a + b.n, 0)).toBe(c.days.length);
  });

  it('throughput has 16 Monday-start weeks ending with this week', () => {
    const { weeks } = throughput(projects, TODAY);
    expect(weeks).toHaveLength(16);
    for (const w of weeks) expect(new Date(w.t).getUTCDay()).toBe(1);
    expect(weeks.at(-1)!.t).toBeLessThanOrEqual(TODAY);
    expect(TODAY - weeks.at(-1)!.t).toBeLessThan(7 * 86_400_000);
  });

  it('timeline: open work runs to today, dropped is a stub', () => {
    const { spans } = timeline(projects, TODAY);
    for (const sp of spans) {
      if (sp.kind === 'open') expect(sp.end).toBe(TODAY);
      if (sp.kind === 'dropped') expect(sp.end).toBe(sp.start);
      expect(sp.end).toBeGreaterThanOrEqual(sp.start);
    }
  });

  it('plan links go to GitHub when there is a GitHub origin', () => {
    expect(planHref(s, 'projects/DEMO-1/plan.md')).toBe(`${s.git.githubBase}projects/DEMO-1/plan.md`);
    expect(planHref({ ...s, git: { ...s.git, githubBase: null } }, 'x')).toBeNull();
  });
});

describe('niceAxis', () => {
  it('rounds up to whole even steps', () => {
    expect(niceAxis(0)).toMatchObject({ step: 1, max: 1 });
    expect(niceAxis(7)).toMatchObject({ step: 2, max: 8 });
    expect(niceAxis(13)).toMatchObject({ step: 5, max: 15 });
  });
});
