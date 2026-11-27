// Every number the page shows that isn't in the snapshot is computed here, and only here.
// These are ports of orbex's scripts/dashboard.mjs and must agree with it (ORBI-90 step 6):
// same UTC whole-day rule, same Monday-start weeks, same buckets, same percentile rule.

import type { Project, Snapshot } from './types';

export const DAY = 86_400_000;
export const STATUSES = ['blocked', 'active', 'open', 'done', 'dropped'] as const;

/** Frontmatter dates are local calendar days; treat them as whole UTC days. */
export const toDay = (s?: string | null): number | null =>
  /^\d{4}-\d{2}-\d{2}$/.test(s ?? '') ? Date.UTC(+s!.slice(0, 4), +s!.slice(5, 7) - 1, +s!.slice(8, 10)) : null;

export const todayOf = (now: Date) => Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
export const fmt = (t: number) => new Date(t).toISOString().slice(0, 10);
export const short = (t: number) => new Date(t).toLocaleDateString('en', { month: 'short', day: 'numeric', timeZone: 'UTC' });
export const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function counts(projects: Project[]) {
  return Object.fromEntries(STATUSES.map((s) => [s, projects.filter((p) => p.status === s).length])) as Record<(typeof STATUSES)[number], number>;
}

export interface Week { t: number; opened: number; closed: number }

export function throughput(projects: Project[], today: number, WEEKS = 16) {
  const dow = (new Date(today).getUTCDay() + 6) % 7;
  const start = today - dow * DAY - (WEEKS - 1) * 7 * DAY;
  const weeks: Week[] = Array.from({ length: WEEKS }, (_, i) => ({ t: start + i * 7 * DAY, opened: 0, closed: 0 }));
  const bucket = (t: number | null) => (t == null || t < start ? null : weeks[Math.floor((t - start) / (7 * DAY))] ?? null);
  for (const p of projects) {
    const o = bucket(toDay(p.opened)); if (o) o.opened++;
    if (p.status === 'done') { const c = bucket(toDay(p.closed)); if (c) c.closed++; }
  }
  const totals = weeks.reduce((a, w) => ({ opened: a.opened + w.opened, closed: a.closed + w.closed }), { opened: 0, closed: 0 });
  return { weeks, totals };
}

/** Whole-number ticks at an even step, axis rounded up to the last one. */
export function niceAxis(peak: number) {
  peak = Math.max(1, peak);
  const step = [1, 2, 5, 10, 20, 50].find((s) => peak / s <= 4) ?? Math.ceil(peak / 4);
  const max = Math.ceil(peak / step) * step;
  return { step, max, ticks: Array.from({ length: max / step + 1 }, (_, i) => i * step) };
}

export const CYCLE_BUCKETS: [string, number, number][] = [
  ['Same day', 0, 0], ['1–2 days', 1, 2], ['3–7 days', 3, 7], ['1–2 weeks', 8, 14], ['2–4 weeks', 15, 30], ['Over a month', 31, Infinity],
];

export function cycleTime(projects: Project[]) {
  const days = projects
    .filter((p) => p.status === 'done' && toDay(p.closed) != null && toDay(p.opened) != null)
    .map((p) => (toDay(p.closed)! - toDay(p.opened)!) / DAY)
    .sort((a, b) => a - b);
  const pct = (q: number) => (days.length ? days[Math.min(days.length - 1, Math.floor(q * days.length))] : null);
  return {
    days,
    median: pct(0.5),
    p90: pct(0.9),
    longest: days.at(-1) ?? null,
    buckets: CYCLE_BUCKETS.map(([label, lo, hi]) => ({ label, n: days.filter((d) => d >= lo && d <= hi).length })),
  };
}

export interface Span { p: Project; start: number; end: number; kind: 'closed' | 'open' | 'dropped' }

export function timeline(projects: Project[], today: number, N = 20) {
  const recent = projects
    .filter((p) => toDay(p.opened) != null)
    .sort((a, b) => toDay(b.opened)! - toDay(a.opened)! || b.num - a.num)
    .slice(0, N);
  const spans: Span[] = recent.map((p) => {
    const isOpen = p.status !== 'done' && p.status !== 'dropped';
    const a = toDay(p.opened)!;
    // A dropped plan has no `closed:` — a stub at its opened date, never mistaken for finished.
    return { p, start: a, end: isOpen ? today : (toDay(p.closed) ?? a), kind: isOpen ? 'open' : p.status === 'dropped' ? 'dropped' : 'closed' };
  });
  const lo = spans.length ? Math.min(...spans.map((s) => s.start)) : today;
  const months: number[] = [];
  for (let d = new Date(lo); d.getTime() <= today; d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) {
    const t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
    if (t >= lo) months.push(t);
  }
  return { spans, lo, hi: today, months };
}

export function ageDays(p: Project, today: number) {
  const o = toDay(p.opened);
  return o == null ? null : Math.round((today - o) / DAY);
}

/** The file on GitHub (rendered markdown), or null with no GitHub origin. */
export function planHref(s: Snapshot, file: string) {
  return s.git.githubBase ? s.git.githubBase + file.split('/').map(encodeURIComponent).join('/') : null;
}

export const daysText = (d: number | null) => (d == null ? '—' : d === 0 ? 'same day' : plural(Math.round(d), 'day'));
