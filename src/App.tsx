import { useState } from 'react';
import { CaptureDialog } from './components/Capture';
import { Shell } from './components/Shell';
import { ErrorBox } from './components/ui';
import { todayOf } from './derive';
import { Dashboard } from './pages/Dashboard';
import { InboxPage } from './pages/Inbox';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';
import { usePath } from './router';
import type { FileItem } from './types';
import { useSession } from './useSession';
import { useNow, useSnapshot } from './useSnapshot';

export default function App() {
  const path = usePath();
  const { session, error: sessionError } = useSession();
  const { snapshot, error, loading, attemptedAt, refresh, addCapture, patchCapture } = useSnapshot();
  const [capturing, setCapturing] = useState(false);
  const now = useNow();
  const today = todayOf(now);
  const openCapture = () => setCapturing(true);
  const canCapture = !!session?.canCapture;

  const refreshProps = { now, attemptedAt, loading, refresh };
  let page;
  if (!snapshot) {
    page = error ? <ErrorBox><b>Couldn't build the dashboard:</b> {error}</ErrorBox> : <p className="text-muted">Loading…</p>;
  } else if (path === '/projects') {
    page = <Projects {...refreshProps} snapshot={snapshot} today={today} />;
  } else if (path.startsWith('/projects/')) {
    page = <ProjectDetail {...refreshProps} snapshot={snapshot} id={decodeURIComponent(path.slice('/projects/'.length))} />;
  } else if (path === '/inbox' || path.startsWith('/inbox/')) {
    const name = path.startsWith('/inbox/') ? decodeURIComponent(path.slice('/inbox/'.length)) || null : null;
    page = <InboxPage {...refreshProps} snapshot={snapshot} name={name} session={session} onCapture={canCapture ? openCapture : undefined} patchCapture={patchCapture} />;
  } else if (path === '/') {
    page = <Dashboard snapshot={snapshot} now={now} today={today} attemptedAt={attemptedAt} loading={loading} refresh={refresh} onCapture={canCapture ? openCapture : undefined} />;
  } else {
    page = <ErrorBox>Nothing at <code>{path}</code>.</ErrorBox>;
  }

  return (
    <Shell path={path} session={session} inboxCount={snapshot ? snapshot.next.inbox.length : null} onCapture={openCapture}>
      <main className="px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {snapshot && error && (
          // Keep the last good data, but never let stale look fresh.
          <div className="mb-4"><ErrorBox><b>Refresh failed</b> — showing data from {new Date(snapshot.generatedAt).toLocaleTimeString()}. {error}</ErrorBox></div>
        )}
        {sessionError && <div className="mb-4"><ErrorBox><b>Session unavailable:</b> {sessionError}.</ErrorBox></div>}
        {page}
        <footer className="text-sm text-muted mt-8">Generated from the workspace's own producers on every refresh — this page is never the source.</footer>
      </main>
      {canCapture && (
        <CaptureDialog
          open={capturing}
          onClose={() => setCapturing(false)}
          onCaptured={(item: FileItem) => addCapture(item)}
          hosted={session?.source === 'github'}
        />
      )}
    </Shell>
  );
}
