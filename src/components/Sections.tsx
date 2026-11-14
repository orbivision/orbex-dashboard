import type { Snapshot } from '../types';
import { ageDays, plural, planHref } from '../derive';
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
              <PlanLink href={planHref(snapshot, p.file)} className="font-semibold no-underline hover:underline">
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

export function Inbox({ snapshot }: { snapshot: Snapshot }) {
  const { inbox, inboxError } = snapshot.next;
  return (
    <Card>
      <H2>Inbox <Count n={inboxError ? '–' : inbox.length} /></H2>
      {snapshot.noGh ? (
        // --no-gh is a choice, not a failure — say so plainly rather than in the error colour.
        <Empty>Not checked (<code>--no-gh</code>).</Empty>
      ) : inboxError ? (
        <ErrorBox><b>Couldn't read the inbox:</b> {inboxError}. This is not the same as empty.</ErrorBox>
      ) : inbox.length ? (
        <>
          <ul className="list-disc pl-5 my-2 space-y-0.5">{inbox.map((i) => <li key={i.number}><a href={i.url} target="_blank" rel="noreferrer">#{i.number}</a> <Md text={i.title} /></li>)}</ul>
          <Note>Untriaged — a decision owed, not work to pick up.</Note>
        </>
      ) : (
        <Empty>Empty — nothing untriaged.</Empty>
      )}
    </Card>
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
