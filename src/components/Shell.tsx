// App shell (ORBI-92): a left rail on desktop; under 768px a top bar whose menu opens the same
// nav as a drawer. Capture lives here so it's one click from every view.
import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '../types';
import { Link } from '../router';
import { LOGO, ThemeToggle } from './Header';

// Icons are one 16px stroke set in a fixed slot, so every label starts at the same x — text
// glyphs (◧ ☰ ✉) have different advance widths and never lined up.
const icon = (d: string) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);
const NAV = [
  { to: '/', label: 'Dashboard', icon: icon('M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z'), match: (p: string) => p === '/' },
  { to: '/projects', label: 'Projects', icon: icon('M5.5 4h8M5.5 8h8M5.5 12h8M2.5 4h.01M2.5 8h.01M2.5 12h.01'), match: (p: string) => p.startsWith('/projects') },
  { to: '/inbox', label: 'Inbox', icon: icon('M2 9.5l1.8-6h8.4l1.8 6v3.5H2zM2 9.5h3.5l1 1.5h3l1-1.5H14'), match: (p: string) => p === '/inbox' || p.startsWith('/inbox/') },
];

function Nav({ path, session, inboxCount, onCapture, onNavigate }: {
  path: string; session: Session | null; inboxCount: number | null; onCapture: () => void; onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col h-full gap-6">
      <Link to="/" onClick={onNavigate} className="block px-2" aria-label="Orbex — dashboard">
        <span dangerouslySetInnerHTML={{ __html: LOGO }} />
      </Link>
      {session?.canCapture && (
        <button
          type="button"
          onClick={() => { onNavigate?.(); onCapture(); }}
          className="mx-2 text-sm font-medium bg-brand text-white rounded-full px-3.5 py-2 cursor-pointer hover:brightness-110 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          ＋ Capture
        </button>
      )}
      <nav aria-label="Main">
        <ul className="grid gap-1">
          {NAV.map((n) => {
            const active = n.match(path);
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 no-underline ${active ? 'bg-code text-ink font-semibold' : 'text-ink-2 hover:bg-code hover:text-ink'}`}
                >
                  <span className={`flex w-4 shrink-0 justify-center ${active ? 'text-accent' : 'text-muted'}`}>{n.icon}</span>{n.label}
                  {n.to === '/inbox' && !!inboxCount && (
                    <span className="ml-auto text-xs font-semibold text-white bg-brand rounded-full px-2 py-0.5" aria-label={`${inboxCount} untriaged`}>{inboxCount}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto grid gap-3 px-2 text-sm">
        {session && (
          <p className="text-muted">
            <span className="text-ink-2 font-medium">{session.name}</span><br />
            {session.source === 'github' ? 'hosted · from GitHub' : 'local checkout'}
          </p>
        )}
        {session?.user && (
          <div className="flex items-center gap-2">
            {session.user.avatar && <img src={session.user.avatar} alt="" width={24} height={24} className="rounded-full" />}
            <span className="text-ink-2 truncate">{session.user.login}</span>
            <a href="/auth/logout" className="ml-auto text-muted hover:text-accent">Sign out</a>
          </div>
        )}
        <div><ThemeToggle /></div>
      </div>
    </div>
  );
}

export function Shell({ path, session, inboxCount, onCapture, children }: {
  path: string; session: Session | null; inboxCount: number | null; onCapture: () => void; children: ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);
  useEffect(() => setDrawer(false), [path]);
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      <aside className="hidden md:block sticky top-0 h-screen border-r border-ring bg-surface px-3 py-5">
        <Nav path={path} session={session} inboxCount={inboxCount} onCapture={onCapture} />
      </aside>

      <header className="md:hidden sticky top-0 z-20 flex items-center gap-3 border-b border-ring bg-surface px-4 py-2.5">
        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={drawer}
          onClick={() => setDrawer(true)}
          className="text-xl leading-none text-ink-2 px-1 cursor-pointer"
        >
          ☰
        </button>
        <Link to="/" aria-label="Orbex — dashboard"><span dangerouslySetInnerHTML={{ __html: LOGO }} /></Link>
        {session?.canCapture && (
          <button type="button" onClick={onCapture} className="ml-auto text-sm font-medium bg-brand text-white rounded-full px-3 py-1.5 cursor-pointer">
            ＋ Capture
          </button>
        )}
      </header>

      {drawer && (
        <div className="md:hidden fixed inset-0 z-30" role="dialog" aria-modal="true" aria-label="Navigation">
          <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-black/50 cursor-default" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[260px] max-w-[80vw] bg-surface border-r border-ring px-3 py-5">
            <Nav path={path} session={session} inboxCount={inboxCount} onCapture={onCapture} onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0">{children}</div>
    </div>
  );
}
