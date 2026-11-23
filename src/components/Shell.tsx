// App shell (ORBI-92): a left rail on desktop; under 768px a top bar whose menu opens the same
// nav as a drawer. Capture lives here so it's one click from every view.
import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '../types';
import { Link } from '../router';
import { LOGO, ThemeToggle } from './Header';

const NAV = [
  { to: '/', label: 'Dashboard', icon: '◧', match: (p: string) => p === '/' },
  { to: '/projects', label: 'Projects', icon: '☰', match: (p: string) => p.startsWith('/projects') },
];

function Nav({ path, session, onCapture, onNavigate }: {
  path: string; session: Session | null; onCapture: () => void; onNavigate?: () => void;
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
                  <span aria-hidden className={active ? 'text-accent' : 'text-muted'}>{n.icon}</span>{n.label}
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

export function Shell({ path, session, onCapture, children }: {
  path: string; session: Session | null; onCapture: () => void; children: ReactNode;
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
        <Nav path={path} session={session} onCapture={onCapture} />
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
            <Nav path={path} session={session} onCapture={onCapture} onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0">{children}</div>
    </div>
  );
}
