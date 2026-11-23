// Every project from build-project-index --json, filterable. Order is the index's own
// (in flight first) — this view re-sorts nothing it could disagree about.
import { useMemo, useState } from 'react';
import { STATUSES, ageDays, counts, plural } from '../derive';
import type { Project } from '../types';
import { Card, Count, Empty, H2, PlanLink } from '../components/ui';
import { RefreshBar, type RefreshProps } from '../components/Header';

const ORDER: Record<string, number> = { blocked: 0, active: 1, open: 2, done: 3, dropped: 4 };
const FILTER_KEY = 'orbex-dashboard-projects-filter';

function loadFilter(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(FILTER_KEY) ?? 'null');
    if (Array.isArray(v)) return v.filter((s) => typeof s === 'string');
  } catch { /* storage unavailable or junk: defaults */ }
  return ['blocked', 'active', 'open'];
}

export function Projects({ today, ...refreshProps }: RefreshProps & { today: number }) {
  const { snapshot } = refreshProps;
  const all = snapshot.index.projects;
  const c = counts(all);
  const [statuses, setStatuses] = useState<string[]>(loadFilter);
  const [repo, setRepo] = useState('');
  const [q, setQ] = useState('');

  const repos = useMemo(() => [...new Set(all.flatMap((p) => p.repos ?? []))].sort(), [all]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return all
      .filter((p) => !statuses.length || statuses.includes(p.status))
      .filter((p) => !repo || p.repos?.includes(repo))
      .filter((p) => !needle || `${p.id} ${p.title}`.toLowerCase().includes(needle))
      .sort((a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9) || b.num - a.num);
  }, [all, statuses, repo, q]);

  const toggle = (s: string) => {
    const next = statuses.includes(s) ? statuses.filter((x) => x !== s) : [...statuses, s];
    setStatuses(next);
    try { localStorage.setItem(FILTER_KEY, JSON.stringify(next)); } catch { /* fine for this visit */ }
  };

  return (
    <>
      <h1 className="text-[2rem] font-bold tracking-tight leading-tight mb-1">Projects</h1>
      <p className="text-ink-2 mb-3">{plural(all.length, 'project')} in {snapshot.name}</p>
      <RefreshBar {...refreshProps} className="mb-5" />
      <Card className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter by status">
          {STATUSES.map((s) => {
            const on = statuses.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s)}
                className={`rounded-full px-3 py-1 text-sm border cursor-pointer ${on ? 'border-accent text-ink bg-code' : 'border-ring text-muted hover:text-ink'}`}
              >
                {s} <span className={on ? 'text-accent font-semibold' : ''}>{c[s] ?? 0}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search id or title"
            aria-label="Search projects"
            className="flex-1 min-w-[180px] bg-page border border-ring rounded-lg px-3 py-1.5 text-ink focus:outline-2 focus:outline-accent"
          />
          {!!repos.length && (
            <select
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              aria-label="Filter by repo"
              className="bg-page border border-ring rounded-lg px-3 py-1.5 text-ink"
            >
              <option value="">All repos</option>
              {repos.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          )}
        </div>
      </Card>
      <Card>
        <H2>Showing <Count n={shown.length} /></H2>
        {shown.length ? (
          <ul className="divide-y divide-grid">
            {shown.map((p) => <Row key={p.id} p={p} today={today} />)}
          </ul>
        ) : (
          <Empty>No project matches these filters.</Empty>
        )}
      </Card>
    </>
  );
}

function Row({ p, today }: { p: Project; today: number }) {
  const open = !['done', 'dropped'].includes(p.status);
  const age = open ? ageDays(p, today) : null;
  return (
    <li className="py-2.5">
      <PlanLink id={p.id} className="no-underline hover:underline font-medium">
        <span className="text-muted">{p.id}</span> {p.title}
      </PlanLink>
      <p className="text-sm text-ink-2 mt-0.5 flex flex-wrap gap-x-2">
        <span className={open ? 'text-accent font-semibold' : ''}>{p.status}</span>
        {p.priority && open && <span>· {p.priority} priority</span>}
        {p.opened && <span>· opened {p.opened}</span>}
        {p.closed && <span>· closed {p.closed}</span>}
        {age != null && <span>· open {plural(age, 'day')}</span>}
        {!!p.repos?.length && <span className="flex flex-wrap gap-1">· {p.repos.map((r) => <code key={r}>{r}</code>)}</span>}
      </p>
    </li>
  );
}
