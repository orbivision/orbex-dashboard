import { isFile, type Snapshot } from '../types';
import { ageDays, plural } from '../derive';
import { Card, Count, Empty, ErrorBox, H2, Md, Note, PlanLink } from './ui';

export function InFlight({ snapshot, today }: { snapshot: Snapshot; today: number }) {
  const open = snapshot.next.projects;
  if (!open.length) return <Card className="mb-4"><H2>In flight</H2><Empty>Nothing open. Every numbered project is closed out.</Empty></Card>;
  return (
    <Card className="mb-4">
      <H2>In flight <Count n={open.length} /></H2>
      <ul className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {open.map((p) => {
          const full = snapshot.index.projects.find((q) => q.id === p.id) ?? p;
          const age = ageDays(p, today);
          return (
            <li key={p.id} className="border border-ring border-t-[3px] border-t-brand rounded-[10px] px-3.5 py-3">
              <PlanLink id={p.id} className="font-semibold no-underline hover:underline">
                <span className="text-muted font-medium">{p.id}</span> {p.title}
              </PlanLink>
              <p className="mt-1.5 text-sm text-ink-2">
                <span className="font-semibold text-accent">{p.status}</span>
                {p.priority && ` · ${p.priority} priority`}
                {age != null && ` · open ${plural(age, 'day')}`}
              </p>
              {!!full.repos?.length && <p className="mt-1.5 text-sm flex flex-wrap gap-1">{full.repos.map((r) => <code key={r}>{r}</code>)}</p>}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export function Inbox({ snapshot, onCapture }: { snapshot: Snapshot; onCapture?: () => void }) {
  const { inbox, inboxError, inboxFilesError } = snapshot.next;
  // Two sources, each with its own error (ORBI-92): an offline `gh` must never hide the files,
  // and an unreadable inbox/ must never hide the issues. Only "nothing readable at all" is '–'.
  const issuesUnknown = !snapshot.noGh && !!inboxError;
  const unknown = !inbox.length && (issuesUnknown || !!inboxFilesError);
  return (
    <Card>
      <div className="flex items-baseline justify-between gap-3">
        <H2>Inbox <Count n={unknown ? '–' : inbox.length} /></H2>
        {onCapture && <button type="button" onClick={onCapture} className="text-sm text-accent hover:underline cursor-pointer">＋ Capture</button>}
      </div>
      {inboxFilesError && <div className="mb-2"><ErrorBox><b>Captures not listed:</b> {inboxFilesError}.</ErrorBox></div>}
      {snapshot.noGh ? (
        // --no-gh is a choice, not a failure — say so plainly rather than in the error colour.
        <p className="text-muted text-sm mb-1">GitHub Issues not checked (<code>--no-gh</code>).</p>
      ) : inboxError ? (
        <div className="mb-2"><ErrorBox><b>Couldn't read GitHub Issues:</b> {inboxError}. This is not the same as empty.</ErrorBox></div>
      ) : null}
      {inbox.length ? (
        <>
          <ul className="my-2 space-y-1.5">
            {inbox.map((i) => isFile(i) ? (
              <li key={i.file}>
                <InboxFile item={i} />
              </li>
            ) : (
              <li key={`#${i.number}`} className="flex gap-2">
                <a href={i.url} target="_blank" rel="noreferrer" className="text-muted shrink-0">#{i.number}</a>
                <span><Md text={i.title} /></span>
              </li>
            ))}
          </ul>
          <Note>Untriaged — a decision owed, not work to pick up.</Note>
        </>
      ) : !unknown && (
        <Empty>Empty — nothing untriaged.</Empty>
      )}
    </Card>
  );
}

function InboxFile({ item }: { item: import('../types').FileItem }) {
  const when = item.createdAt ? new Date(item.createdAt) : null;
  const head = (
    <>
      <span className="text-muted shrink-0" title={item.file}>✎</span>
      <span><Md text={item.title} />{when && <span className="text-muted text-sm"> · {when.toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span>}</span>
    </>
  );
  if (!item.body) return <div className="flex gap-2">{head}</div>;
  return (
    <details className="group">
      <summary className="flex gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">{head}</summary>
      <p className="ml-6 mt-1 text-sm text-ink-2 whitespace-pre-wrap">{item.body}</p>
    </details>
  );
}

export function Memory({ snapshot }: { snapshot: Snapshot }) {
  const { memoryReview, memoryReviewError } = snapshot.next;
  return (
    <Card>
      <H2>Memory review <Count n={memoryReviewError ? '–' : memoryReview.length} /></H2>
      {memoryReviewError ? (
        <ErrorBox><b>Couldn't read memory:</b> {memoryReviewError}.</ErrorBox>
      ) : memoryReview.length ? (
        <>
          <ul className="list-disc pl-5 my-2 space-y-0.5">
            {memoryReview.map((m) => (
              <li key={m.file}><code>{m.file}</code> — {m.days == null ? `unreadable reviewed date (${m.reviewed ?? 'missing'})` : `reviewed ${m.reviewed}, ${m.days} days ago`}</li>
            ))}
          </ul>
          <Note>Re-verify against reality before bumping a date.</Note>
        </>
      ) : (
        <Empty>No volatile fact is overdue.</Empty>
      )}
    </Card>
  );
}

export function Backlog({ snapshot }: { snapshot: Snapshot }) {
  const all = snapshot.next.backlog;
  const sec = (s: string, open: boolean) => {
    const items = all.filter((b) => b.section === s);
    const list = <ul className="list-disc pl-5 my-2 space-y-0.5">{items.map((b, i) => <li key={i}><Md text={b.title} /></li>)}</ul>;
    if (!items.length) return <h3 key={s} className="font-semibold mt-3">{s} <Count n={0} /></h3>;
    return open ? (
      <div key={s}><h3 className="font-semibold mt-3">{s} <Count n={items.length} /></h3>{list}</div>
    ) : (
      <details key={s} className="group mt-3">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold">
          <span className="text-muted group-open:hidden">▸ </span><span className="text-muted hidden group-open:inline">▾ </span>{s} <Count n={items.length} />
        </summary>
        {list}
      </details>
    );
  };
  return <Card className="mb-4"><H2>Backlog <Count n={all.length} /></H2>{sec('Now', true)}{sec('Soon', true)}{sec('Someday', false)}</Card>;
}

export function Problems({ snapshot }: { snapshot: Snapshot }) {
  if (!snapshot.index.problems.length) return null;
  return (
    <Card className="mb-4">
      <H2>Problems in the plans</H2>
      <ErrorBox><ul className="list-disc pl-5">{snapshot.index.problems.map((p, i) => <li key={i}>{p}</li>)}</ul></ErrorBox>
    </Card>
  );
}
