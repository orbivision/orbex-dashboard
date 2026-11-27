// The Inbox view (ORBI-92 addendum): every untriaged item, and an editor for captures. Wide
// screens show the list and the editor side by side; narrow ones show one at a time.
//
// Every write carries the version (git blob sha) the editor loaded, so a capture changed
// elsewhere — another tab, a laptop, a hosted edit — is refused (409) rather than overwritten.
// Issues stay read-only: they live on GitHub, and editing them is GitHub's job.
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { RefreshBar, type RefreshProps } from '../components/Header';
import { Button, Card, Count, Empty, ErrorBox, H2, Md, Note } from '../components/ui';
import { inboxPath, Link, navigate, setNavigationBlocker } from '../router';
import { isFile, type FileItem, type Session, type Snapshot } from '../types';

const TITLE_MAX = 200;
const short = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : null);

export function InboxPage({ name, session, onCapture, patchCapture, ...refreshProps }: RefreshProps & {
  name: string | null;
  session: Session | null;
  onCapture?: () => void;
  patchCapture: (file: string, patch: Partial<FileItem> | null) => void;
}) {
  const { snapshot } = refreshProps;
  const { inbox, inboxError, inboxFilesError } = snapshot.next;
  const files = inbox.filter(isFile);
  const issues = inbox.filter((i) => !isFile(i));
  const selected = name ? `inbox/${name}` : null;
  const listed = !!selected && files.some((f) => f.file === selected);

  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
        <h1 className="text-2xl font-bold">Inbox <Count n={inbox.length} /></h1>
        {onCapture && <Button onClick={onCapture} className="ml-auto hidden md:block">＋ Capture</Button>}
      </div>
      <p className="text-ink-2 mb-1">Untriaged — a decision owed, not work to pick up. Triage with <code>/o-next</code>.</p>
      <RefreshBar {...refreshProps} className="mb-4" />

      <div className="grid gap-4 lg:grid-cols-[minmax(300px,420px)_minmax(0,1fr)] items-start">
        <div className={`grid gap-4 ${name ? 'hidden lg:grid' : ''}`}>
          <Card>
            <H2>Captures <Count n={inboxFilesError && !files.length ? '–' : files.length} /></H2>
            {inboxFilesError && <div className="mb-2"><ErrorBox><b>Captures not listed:</b> {inboxFilesError}.</ErrorBox></div>}
            {files.length ? (
              <ul className="grid gap-1 -mx-2">
                {files.map((f) => {
                  const active = f.file === selected;
                  return (
                    <li key={f.file}>
                      <Link
                        to={inboxPath(f.file)}
                        aria-current={active ? 'page' : undefined}
                        className={`block rounded-lg px-2 py-1.5 no-underline ${active ? 'bg-code' : 'hover:bg-code'}`}
                      >
                        <span className={`block ${active ? 'text-ink font-semibold' : 'text-ink'}`}>
                          <Md text={f.title} />
                          {short(f.createdAt) && <span className="text-muted text-sm font-normal"> · {short(f.createdAt)}</span>}
                        </span>
                        {f.body && <span className="block text-sm text-ink-2 line-clamp-2 whitespace-pre-line">{f.body}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : !inboxFilesError && <Empty>No captures waiting.</Empty>}
          </Card>

          <Card>
            <H2>GitHub Issues <Count n={!snapshot.noGh && inboxError ? '–' : issues.length} /></H2>
            {snapshot.noGh ? (
              <p className="text-muted text-sm">Not checked (<code>--no-gh</code>).</p>
            ) : inboxError ? (
              <ErrorBox><b>Couldn't read GitHub Issues:</b> {inboxError}. This is not the same as empty.</ErrorBox>
            ) : issues.length ? (
              <>
                <ul className="grid gap-1.5">
                  {issues.map((i) => !isFile(i) && (
                    <li key={i.number} className="flex gap-2">
                      <a href={i.url} target="_blank" rel="noreferrer" className="text-muted shrink-0">#{i.number}</a>
                      <span><Md text={i.title} /></span>
                    </li>
                  ))}
                </ul>
                <Note>Edited on GitHub — the number opens the issue.</Note>
              </>
            ) : <Empty>No open issues.</Empty>}
          </Card>
        </div>

        <div className={name ? '' : 'hidden lg:block'}>
          {name ? (
            <Editor
              key={name}
              name={name}
              listed={listed}
              canEdit={!!session?.canEdit}
              hosted={session?.source === 'github'}
              generatedAt={snapshot.generatedAt}
              patchCapture={patchCapture}
            />
          ) : (
            <Card><Empty>{files.length ? 'Choose a capture to read or edit it.' : 'Nothing to edit.'}</Empty></Card>
          )}
        </div>
      </div>
    </>
  );
}

interface Loaded { title: string; body: string; version: string }

function Editor({ name, listed, canEdit, hosted, generatedAt, patchCapture }: {
  name: string; listed: boolean; canEdit: boolean; hosted: boolean; generatedAt: string;
  patchCapture: (file: string, patch: Partial<FileItem> | null) => void;
}) {
  const file = `inbox/${name}`;
  const [base, setBase] = useState<Loaded | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState(false);
  const [busy, setBusy] = useState<null | 'save' | 'discard'>(null);
  const [saved, setSaved] = useState(false);
  const dirty = !!base && (title !== base.title || body !== base.body);
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const res = await fetch(`/api/inbox/item?name=${encodeURIComponent(name)}`, { cache: 'no-store' });
      const out = await res.json().catch(() => ({ ok: false, error: `HTTP ${res.status}` }));
      if (!out.ok) throw new Error(out.error);
      const next = { title: out.title, body: out.body, version: out.version };
      setBase(next);
      setTitle(next.title);
      setBody(next.body);
      setConflict(false);
      setError(null);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e));
    }
  }, [name]);

  useEffect(() => { void load(); }, [load]);

  // A refresh that brings a newer copy (edited on a laptop, say) shows it — unless you're mid-edit,
  // where the version check on Save is what protects both sides.
  const firstGen = useRef(generatedAt);
  useEffect(() => {
    if (generatedAt === firstGen.current) return;
    firstGen.current = generatedAt;
    if (!dirtyRef.current && listed) void load();
  }, [generatedAt, listed, load]);

  // Unsaved work is never lost silently: in-app navigation asks, and so does closing the tab.
  useEffect(() => {
    if (!dirty) return;
    setNavigationBlocker(() => confirm('Leave this capture? Your unsaved changes will be lost.'));
    const onUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener('beforeunload', onUnload);
    return () => { setNavigationBlocker(null); window.removeEventListener('beforeunload', onUnload); };
  }, [dirty]);

  async function send(method: 'PUT' | 'DELETE', payload: object) {
    const res = await fetch('/api/inbox/item', {
      method,
      headers: { 'content-type': 'application/json', 'x-orbex-request': '1' },
      body: JSON.stringify({ name, version: base!.version, ...payload }),
    });
    const out = await res.json().catch(() => ({ ok: false, error: `HTTP ${res.status}` }));
    if (res.status === 409) setConflict(true);
    if (!out.ok) throw new Error(out.error);
    return out;
  }

  async function save(e?: FormEvent) {
    e?.preventDefault();
    if (!base || !dirty || !title.trim() || busy) return;
    setBusy('save');
    setError(null);
    setSaved(false);
    try {
      const out = await send('PUT', { title, body });
      const next = { title: out.title, body: out.body, version: out.version };
      setBase(next);
      setTitle(next.title); // the server normalises whitespace; show what was written
      setBody(next.body);
      setSaved(true);
      patchCapture(file, { title: next.title, body: next.body || null });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err)); // your text stays in the fields
    } finally {
      setBusy(null);
    }
  }

  async function discard() {
    if (!base || busy) return;
    const what = `“${base.title}”`;
    const ok = confirm(hosted
      ? `Discard ${what}? This commits its deletion to the workspace repo (git history keeps it).`
      : `Discard ${what}? It's deleted from inbox/ — and if it was never committed, it can't be recovered.`);
    if (!ok) return;
    setBusy('discard');
    setError(null);
    try {
      await send('DELETE', {});
      dirtyRef.current = false;
      setNavigationBlocker(null);
      patchCapture(file, null);
      navigate('/inbox');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(null);
    }
  }

  const onKey = (e: KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === 's') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); void save(); }
  };

  const back = <Link to="/inbox" className="lg:hidden inline-block mb-3 text-sm">← Inbox</Link>;

  if (loadError) {
    return <>{back}<Card><ErrorBox><b>Couldn't open {file}:</b> {loadError}</ErrorBox></Card></>;
  }
  if (!base) return <>{back}<Card><p className="text-muted">Loading…</p></Card></>;

  const field = 'bg-page border border-ring rounded-lg px-3 py-2 text-base text-ink focus:outline-2 focus:outline-accent disabled:opacity-70';
  return (
    <>
      {back}
      <Card>
        <form onSubmit={save} onKeyDown={onKey} className="grid gap-3">
          <p className="text-sm text-muted break-all"><code>{file}</code></p>
          {!listed && (
            <ErrorBox><b>No longer in the inbox</b> as of the last refresh — it may have been triaged elsewhere.</ErrorBox>
          )}
          <label className="grid gap-1 text-sm">
            <span className="text-ink-2">Title</span>
            <input value={title} maxLength={TITLE_MAX} disabled={!canEdit} onChange={(e) => { setTitle(e.target.value); setSaved(false); }} className={field} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-ink-2">Notes</span>
            <textarea value={body} rows={12} disabled={!canEdit} onChange={(e) => { setBody(e.target.value); setSaved(false); }} className={`${field} resize-y min-h-40`} />
          </label>

          {conflict ? (
            <ErrorBox>
              <b>Changed elsewhere</b> since you opened it, so it wasn't saved. Your text is still here — copy what you need, then{' '}
              <button type="button" onClick={() => void load()} className="underline cursor-pointer">load the newer version</button>{' '}
              (replaces what's in the fields).
            </ErrorBox>
          ) : error && <ErrorBox>{error}</ErrorBox>}
          {saved && !dirty && (
            <p role="status" className="text-sm text-ink-2">
              Saved — {hosted ? 'committed to the workspace repo; pull before triaging.' : 'written to inbox/, not committed.'}
            </p>
          )}
          {!canEdit && <p className="text-sm text-muted">This server can't edit captures — restart it (npm start) after updating.</p>}

          {canEdit && (
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={() => void discard()} disabled={!!busy} className="text-err! hover:border-err!">{busy === 'discard' ? 'Discarding…' : 'Discard'}</Button>
              <span className="ml-auto text-sm text-muted hidden sm:inline">{dirty ? 'Unsaved changes · ⌘S to save' : ''}</span>
              <Button onClick={() => { setTitle(base.title); setBody(base.body); }} disabled={!dirty || !!busy}>Revert</Button>
              <Button type="submit" primary disabled={!dirty || !title.trim() || !!busy}>{busy === 'save' ? 'Saving…' : 'Save'}</Button>
            </div>
          )}
        </form>
      </Card>
    </>
  );
}
