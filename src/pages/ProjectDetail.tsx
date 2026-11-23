// One project's plan.md, rendered. Displaying the source derives nothing from it, so this
// doesn't make the page a second source; status and dates still come from the index.
import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { planHref, plural } from '../derive';
import { Link } from '../router';
import { ErrorBox } from '../components/ui';
import { RefreshBar, type RefreshProps } from '../components/Header';

/** Drop the YAML frontmatter and the `# ID: title` line — both are shown from the index instead. */
export function planBody(text: string) {
  let t = text;
  if (t.startsWith('---\n')) {
    const end = t.indexOf('\n---', 4);
    if (end !== -1) t = t.slice(t.indexOf('\n', end + 4) + 1);
  }
  return t.replace(/^\s*#\s+[^\n]*\n/, '');
}

export function renderPlan(text: string) {
  const html = marked.parse(planBody(text), { async: false, gfm: true }) as string;
  return DOMPurify.sanitize(html);
}

export function ProjectDetail({ id, ...refreshProps }: RefreshProps & { id: string }) {
  const { snapshot, refresh } = refreshProps;
  const p = snapshot.index.projects.find((q) => q.id === id);
  const [state, setState] = useState<{ html?: string; error?: string }>({});
  // A link to a project newer than the cached snapshot: refresh once before saying it doesn't exist.
  const retried = useRef<string | null>(null);
  useEffect(() => {
    if (!p && retried.current !== id) { retried.current = id; refresh(); }
  }, [p, id, refresh]);

  useEffect(() => {
    if (!p) return;
    let live = true;
    setState({});
    fetch(`/api/plan?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
      .then(async (r) => {
        const body = await r.json();
        if (!body.ok) throw new Error(body.error);
        if (live) setState({ html: renderPlan(body.text) });
      })
      .catch((e) => live && setState({ error: e instanceof Error ? e.message : String(e) }));
    return () => { live = false; };
    // Re-fetch when the snapshot changes: the plan may have been edited since.
  }, [id, p?.file, snapshot.generatedAt]);

  if (!p) {
    return (
      <>
        <p className="mb-4"><Link to="/projects">← Projects</Link></p>
        <ErrorBox>No project <code>{id}</code> in this workspace.</ErrorBox>
      </>
    );
  }

  const gh = planHref(snapshot, p.file);
  const meta = [
    p.priority && `${p.priority} priority`,
    p.opened && `opened ${p.opened}`,
    p.closed && `closed ${p.closed}`,
  ].filter(Boolean);

  return (
    <article>
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Link to="/projects">← Projects</Link>
        <RefreshBar {...refreshProps} className="flex-1" />
      </div>
      <p className="text-muted font-medium">{p.id}</p>
      <h1 className="text-[1.75rem] font-bold tracking-tight leading-tight mb-2">{p.title}</h1>
      <p className="text-sm text-ink-2 flex flex-wrap gap-x-2 gap-y-1 items-center mb-6">
        <span className="bg-code rounded-full px-2.5 py-0.5 text-accent font-semibold">{p.status}</span>
        {meta.map((m) => <span key={m as string}>· {m}</span>)}
        {!!p.repos?.length && <span className="flex flex-wrap gap-1">· {p.repos.map((r) => <code key={r}>{r}</code>)}</span>}
        {gh && <a href={gh} target="_blank" rel="noreferrer" className="ml-auto">Open on GitHub ↗</a>}
      </p>
      {state.error ? (
        <ErrorBox><b>Couldn't load the plan:</b> {state.error}</ErrorBox>
      ) : state.html == null ? (
        <p className="text-muted">Loading {p.file}…</p>
      ) : (
        <div className="plan bg-surface border border-ring rounded-xl p-5 md:p-7" dangerouslySetInnerHTML={{ __html: state.html }} />
      )}
      <p className="text-sm text-muted mt-4"><code>{p.file}</code>{p.closed && p.opened ? ` · ${plural(Math.round((Date.parse(p.closed) - Date.parse(p.opened)) / 864e5), 'day')} open` : ''}</p>
    </article>
  );
}
