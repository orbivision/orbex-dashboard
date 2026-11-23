import { useState } from 'react';
import { CaptureDialog } from './components/Capture';
import { Shell } from './components/Shell';
import { ErrorBox } from './components/ui';
import { todayOf } from './derive';
import { Dashboard } from './pages/Dashboard';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';
import { usePath } from './router';
import type { FileItem } from './types';
import { useSession } from './useSession';
import { useNow, useSnapshot } from './useSnapshot';

export default function App() {
  const path = usePath();
  const { session } = useSession();
  const { snapshot, error, loading, attemptedAt, refresh, addCapture } = useSnapshot();
  const [capturing, setCapturing] = useState(false);
  const now = useNow();
  const today = todayOf(now);
  const openCapture = () => setCapturing(true);
  const canCapture = !!session?.canCapture;

  let page;
  if (!snapshot) {
    page = error ? <ErrorBox><b>Couldn't build the dashboard:</b> {error}</ErrorBox> : <p className="text-muted">Loading…</p>;
  } else if (path === '/projects') {
    page = <Projects snapshot={snapshot} today={today} />;
  } else if (path.startsWith('/projects/')) {
    page = <ProjectDetail id={decodeURIComponent(path.slice('/projects/'.length))} snapshot={snapshot} refresh={refresh} />;
  } else if (path === '/') {
    page = <Dashboard snapshot={snapshot} now={now} today={today} attemptedAt={attemptedAt} loading={loading} refresh={refresh} onCapture={canCapture ? openCapture : undefined} />;
  } else {
    page = <ErrorBox>Nothing at <code>{path}</code>.</ErrorBox>;
  }

  return (
    <Shell path={path} session={session} onCapture={openCapture}>
      <main className="max-w-[1040px] mx-auto px-4 pt-8 pb-16">
        {snapshot && error && (
          // Keep the last good data, but never let stale look fresh.
          <div className="mb-4"><ErrorBox><b>Refresh failed</b> — showing data from {new Date(snapshot.generatedAt).toLocaleTimeString()}. {error}</ErrorBox></div>
        )}
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
