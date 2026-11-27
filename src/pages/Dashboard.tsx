import { CycleTime, Throughput, Timeline } from '../components/Charts';
import { Header } from '../components/Header';
import { Backlog, InFlight, Inbox, Memory, Problems } from '../components/Sections';
import type { Snapshot } from '../types';

export function Dashboard({ snapshot, now, today, attemptedAt, loading, refresh, onCapture }: {
  snapshot: Snapshot; now: Date; today: number; attemptedAt: number | null; loading: boolean;
  refresh: () => void; onCapture?: () => void;
}) {
  return (
    <>
      <Header snapshot={snapshot} now={now} attemptedAt={attemptedAt} loading={loading} refresh={refresh} />
      <InFlight snapshot={snapshot} today={today} />
      <Throughput projects={snapshot.index.projects} today={today} />
      <CycleTime projects={snapshot.index.projects} />
      <Timeline snapshot={snapshot} today={today} />
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Inbox snapshot={snapshot} onCapture={onCapture} />
        <Memory snapshot={snapshot} />
      </div>
      <Backlog snapshot={snapshot} />
      <Problems snapshot={snapshot} />
    </>
  );
}
