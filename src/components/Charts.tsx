// SVG charts, ported from orbex's dashboard.mjs. Two series at most, fixed slot order
// (s1 magenta, s2 orange). Every chart has a legend or a title naming its series, native
// <title> tooltips, and a table view.

import type { Project, Snapshot } from '../types';
import { cycleTime, daysText, fmt, niceAxis, plural, planHref, short, throughput, timeline } from '../derive';
import { Card, Legend, PlanLink, TableView } from './ui';

/** Vertical bar: 4px rounded data-end, square on the baseline. */
function bar(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}
/** Horizontal bar: square on the baseline (left), rounded data-end (right). */
function hbar(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, h / 2, w);
  return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
}

function Figure({ title, caption, legend, children }: { title: string; caption: React.ReactNode; legend?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="mb-4">
      <div className="mb-2"><h3 className="font-semibold">{title}</h3><p className="text-ink-2">{caption}</p>{legend}</div>
      {children}
    </Card>
  );
}

const plot = 'overflow-x-auto [&>svg]:w-full [&>svg]:min-w-[560px] [&>svg]:h-auto [&>svg]:block';

export function Throughput({ projects, today }: { projects: Project[]; today: number }) {
  const WEEKS = 16;
  const { weeks, totals } = throughput(projects, today, WEEKS);
  const { max, ticks } = niceAxis(Math.max(...weeks.flatMap((w) => [w.opened, w.closed])));
  const W = 720, H = 220, L = 32, B = 28, T = 12, plotW = W - L - 8, plotH = H - B - T;
  const slot = plotW / WEEKS, bw = Math.max(3, (slot - 8) / 2);
  const y = (v: number) => T + plotH - (v / max) * plotH;
  return (
    <Figure
      title="Throughput"
      caption={`Projects opened and closed per week, last ${WEEKS} weeks — ${totals.opened} opened, ${totals.closed} closed.`}
      legend={<Legend items={[['bg-s1', 'Opened'], ['bg-s2', 'Closed']]} />}
    >
      <div className={plot}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Projects opened and closed per week">
          {ticks.map((v) => (
            <g key={v}>
              <line className="stroke-grid" x1={L} x2={W - 8} y1={y(v)} y2={y(v)} />
              <text className="fill-axis" x={L - 6} y={y(v) + 4} textAnchor="end">{v}</text>
            </g>
          ))}
          {weeks.map((w, i) => {
            const x0 = L + i * slot + (slot - (bw * 2 + 2)) / 2;
            return (
              <g key={w.t}>
                {(['opened', 'closed'] as const).map((k, j) => {
                  const v = w[k]; if (!v) return null;
                  const h = (v / max) * plotH;
                  return <path key={k} className={j ? 'fill-s2' : 'fill-s1'} d={bar(x0 + j * (bw + 2), T + plotH - h, bw, h)}><title>{`Week of ${short(w.t)}: ${v} ${k}`}</title></path>;
                })}
                {i % 2 === 0 && <text className="fill-axis" x={L + i * slot + slot / 2} y={H - 8} textAnchor="middle">{short(w.t)}</text>}
              </g>
            );
          })}
          <line className="stroke-base" x1={L} x2={W - 8} y1={T + plotH} y2={T + plotH} />
        </svg>
      </div>
      <TableView head={['Week of', 'Opened', 'Closed']} rows={weeks.map((w) => [fmt(w.t), w.opened, w.closed])} />
    </Figure>
  );
}

export function CycleTime({ projects }: { projects: Project[] }) {
  const c = cycleTime(projects);
  if (!c.days.length) return <Figure title="Cycle time" caption="No closed projects yet.">{null}</Figure>;
  const max = Math.max(1, ...c.buckets.map((r) => r.n));
  const W = 720, rowH = 28, L = 112, R = 48, H = c.buckets.length * rowH + 8;
  return (
    <Figure
      title="Cycle time"
      caption={<>Opened → closed for {plural(c.days.length, 'done project')}. Median <b>{daysText(c.median)}</b>, 90th percentile <b>{daysText(c.p90)}</b>, longest <b>{daysText(c.longest)}</b>.</>}
    >
      <div className={plot}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Cycle time distribution">
          {c.buckets.map((r, i) => {
            const yy = 4 + i * rowH, w = (r.n / max) * (W - L - R);
            return (
              <g key={r.label}>
                <text className="fill-ink-2" x={L - 8} y={yy + 18} textAnchor="end">{r.label}</text>
                {r.n > 0 && <path className="fill-s1" d={hbar(L, yy + 6, w, rowH - 12)}><title>{`${r.label}: ${plural(r.n, 'project')}`}</title></path>}
                <text className="fill-ink" x={L + w + 6} y={yy + 18}>{r.n}</text>
              </g>
            );
          })}
          <line className="stroke-base" x1={L} x2={L} y1={0} y2={H} />
        </svg>
      </div>
      <TableView head={['Cycle time', 'Projects']} rows={c.buckets.map((r) => [r.label, r.n])} />
    </Figure>
  );
}

export function Timeline({ snapshot, today }: { snapshot: Snapshot; today: number }) {
  const { spans, lo, hi, months } = timeline(snapshot.index.projects, today);
  if (!spans.length) return null;
  const span = Math.max(86_400_000, hi - lo);
  const W = 720, L = 80, R = 12, rowH = 22, T = 4, H = spans.length * rowH + T + 24;
  const x = (t: number) => L + ((t - lo) / span) * (W - L - R);
  const cls = { closed: 'fill-s1', open: 'fill-s2', dropped: 'fill-axis' } as const;
  const legend: [string, string][] = [['bg-s1', 'Closed'], ['bg-s2', 'Still open']];
  if (spans.some((s) => s.kind === 'dropped')) legend.push(['bg-axis', 'Dropped']);
  return (
    <Figure
      title="Timeline"
      caption={`The ${spans.length} most recently opened projects, opened → closed. Open work runs to today.`}
      legend={<Legend items={legend} />}
    >
      <div className={plot}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Timeline of recent projects">
          {months.map((t) => (
            <g key={t}>
              <line className="stroke-grid" x1={x(t)} x2={x(t)} y1={0} y2={H - 22} />
              <text className="fill-axis" x={x(t)} y={H - 6} textAnchor="middle">{new Date(t).toLocaleDateString('en', { month: 'short', timeZone: 'UTC' })}</text>
            </g>
          ))}
          {spans.map(({ p, start, end, kind }, i) => {
            const yy = T + i * rowH, x0 = x(start), w = Math.max(6, x(end) - x0);
            const tip = `${p.id} — ${p.title} (${p.status}; opened ${p.opened}${p.closed ? `, closed ${p.closed}` : ''})`;
            const href = planHref(snapshot, p.file);
            const label = <text className="fill-ink-2 hover:underline" x={L - 8} y={yy + 15} textAnchor="end">{p.id}</text>;
            return (
              <g key={p.id}>
                {href ? <a href={href} target="_blank" rel="noreferrer">{label}</a> : label}
                <rect className={cls[kind]} x={x0} y={yy + 5} width={w} height={rowH - 10} rx={3}><title>{tip}</title></rect>
              </g>
            );
          })}
        </svg>
      </div>
      <TableView head={['Project', 'Status', 'Opened', 'Closed']} rows={spans.map(({ p }) => [`${p.id} ${p.title}`, p.status, p.opened ?? '—', p.closed ?? '—'])} />
    </Figure>
  );
}

export { PlanLink };
