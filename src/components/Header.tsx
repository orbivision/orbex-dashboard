import { useEffect, useState } from 'react';
import logoSvg from '../orbex-logo.svg?raw';
import type { Snapshot } from '../types';
import { counts, plural, STATUSES } from '../derive';
import { REFRESH_MS } from '../useSnapshot';

const THEME_KEY = 'orbex-dashboard-theme';

// The wordmark is black in the file; hand its fill to CSS so each theme sets the ink.
const H = 44;
const [, , vw, vh] = (logoSvg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 3 1').split(/\s+/).map(Number);
const LOGO = logoSvg
  .replace(/\s(width|height)="[^"]*"/g, '')
  .replace('<svg ', `<svg class="logo block" role="img" aria-label="Orbex" width="${Math.round((H * vw) / vh)}" height="${H}" `)
  .replace('fill="#000000"', 'class="wordmark"');

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* storage unavailable: works for this visit */ }
  }, [theme]);
  const dark = theme !== 'light';
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-sm text-ink-2 bg-surface border border-ring rounded-full px-3.5 py-1.5 cursor-pointer hover:text-ink hover:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      {dark ? '☀ Light mode' : '☾ Dark mode'}
    </button>
  );
}

function ago(ms: number) {
  const m = Math.floor(ms / 60_000);
  return m < 1 ? 'just now' : m === 1 ? '1 min ago' : m < 60 ? `${m} min ago` : `${Math.floor(m / 60)} h ${m % 60} min ago`;
}

export function Header({ snapshot, now, attemptedAt, loading, refresh }: {
  snapshot: Snapshot; now: Date; attemptedAt: number | null; loading: boolean; refresh: () => void;
}) {
  const c = counts(snapshot.index.projects);
  const { git } = snapshot;
  const generated = new Date(snapshot.generatedAt);
  const age = now.getTime() - generated.getTime();
  const nextIn = attemptedAt ? Math.min(REFRESH_MS, Math.max(0, attemptedAt + REFRESH_MS - now.getTime())) : null;
  return (
    <header className="mb-6 pb-5 border-b-2 border-brand">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div dangerouslySetInnerHTML={{ __html: LOGO }} />
        <ThemeToggle />
      </div>
      <h1 className="text-[2rem] font-bold tracking-tight leading-tight">{snapshot.name}</h1>
      <p className="text-ink-2 mt-1">{plural(snapshot.index.projects.length, 'project')} · key <code>{snapshot.index.key ?? '—'}</code></p>
      <ul className="flex flex-wrap gap-2 my-3">
        {STATUSES.filter((s) => c[s]).map((s) => (
          <li key={s} className="bg-surface border border-ring rounded-full px-3 py-1 text-ink-2"><b className="text-accent">{c[s]}</b> {s}</li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <span title={generated.toLocaleString()}>
          Updated {ago(age)}
          {git.sha && <> from <code>{git.sha}</code>{git.dirty && ' + uncommitted changes'}</>}
        </span>
        {nextIn != null && <span>· next refresh in {Math.ceil(nextIn / 60_000)} min</span>}
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="ml-auto text-ink-2 border border-ring rounded-full px-3 py-1 cursor-pointer hover:text-ink hover:border-accent disabled:opacity-60 disabled:cursor-wait"
        >
          {loading ? 'Refreshing…' : '↻ Refresh'}
        </button>
      </div>
      <OriginStatus git={git} />
    </header>
  );
}

// Read-only: the server fetches and counts, it never pulls. Work from another machine appears
// here only after you pull, so say how far behind this checkout is.
function OriginStatus({ git }: { git: Snapshot['git'] }) {
  if (git.error && git.behind == null) return <p className="mt-2 text-sm text-muted">Origin not checked: {git.error}.</p>;
  if (git.behind) {
    return (
      <p role="status" className="mt-3 text-sm text-warn bg-warn-bg rounded-lg px-3 py-2">
        This checkout is <b>{plural(git.behind, 'commit')} behind</b> <code>{git.upstream}</code> — work committed elsewhere isn't shown until you <code>git pull</code>.
        {git.error && <> ({git.error}; count is from the last successful fetch.)</>}
      </p>
    );
  }
  if (git.error) return <p className="mt-2 text-sm text-muted">{git.error} — origin status may be out of date.</p>;
  return null;
}
