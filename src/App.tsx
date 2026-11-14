import { CycleTime, Throughput, Timeline } from './components/Charts';
import { Header } from './components/Header';
import { Backlog, InFlight, Inbox, Memory, Problems } from './components/Sections';
import { ErrorBox } from './components/ui';
import { todayOf } from './derive';
import { useNow, useSnapshot } from './useSnapshot';

export default function App() {
  const { snapshot, error, loading, attemptedAt, refresh } = useSnapshot();
  const now = useNow();
  const today = todayOf(now);

  if (!snapshot) {
    return (
      <main className="max-w-[1040px] mx-auto px-4 pt-8 pb-16">
        {error ? <ErrorBox><b>Couldn't build the dashboard:</b> {error}</ErrorBox> : <p className="text-muted">Loading…</p>}
      </main>
    );
  }

  return (
    <main className="max-w-[1040px] mx-auto px-4 pt-8 pb-16">
      {error && (
        // Keep the last good data, but never let stale look fresh.
        <div className="mb-4"><ErrorBox><b>Refresh failed</b> — showing data from {new Date(snapshot.generatedAt).toLocaleTimeString()}. {error}</ErrorBox></div>
      )}
      <Header snapshot={snapshot} now={now} attemptedAt={attemptedAt} loading={loading} refresh={refresh} />
      <InFlight snapshot={snapshot} today={today} />
      <Throughput projects={snapshot.index.projects} today={today} />
      <CycleTime projects={snapshot.index.projects} />
      <Timeline snapshot={snapshot} today={today} />
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Inbox snapshot={snapshot} />
        <Memory snapshot={snapshot} />
      </div>
      <Backlog snapshot={snapshot} />
      <Problems snapshot={snapshot} />
      <footer className="text-sm text-muted mt-8">Generated from the workspace's own producers on every refresh — this page is never the source.</footer>
    </main>
  );
}
