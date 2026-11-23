// The Capture dialog (ORBI-92): one title, optional notes, → one new file in the workspace's
// inbox/. Native <dialog> for focus trapping, Escape and the backdrop for free.
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import type { FileItem } from '../types';
import { Button, ErrorBox } from './ui';

const TITLE_MAX = 200;

export function CaptureDialog({ open, onClose, onCaptured, hosted }: {
  open: boolean;
  onClose: () => void;
  onCaptured: (item: FileItem) => void;
  hosted: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setError(null); setDone(null); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!title.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/inbox', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-orbex-request': '1' },
        body: JSON.stringify({ title, body }),
      });
      const out = await res.json().catch(() => ({ ok: false, error: `HTTP ${res.status}` }));
      if (!out.ok) throw new Error(out.error);
      onCaptured(out.item);
      setDone(out.item.title);
      setTitle('');
      setBody('');
      titleRef.current?.focus(); // ready for the next one
    } catch (err) {
      // Keep what was typed: a failed capture must never eat the idea.
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void submit();
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      aria-labelledby="capture-title"
      className="m-auto w-[min(560px,calc(100vw-32px))] bg-surface text-ink border border-ring rounded-xl p-0 backdrop:bg-black/50"
    >
      <form onSubmit={submit} onKeyDown={onKey} className="p-5 grid gap-3">
        <h2 id="capture-title" className="text-lg font-semibold">Capture an idea</h2>
        <label className="grid gap-1 text-sm">
          <span className="text-ink-2">Title</span>
          <input
            ref={titleRef}
            autoFocus
            value={title}
            maxLength={TITLE_MAX}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The one-line idea"
            className="bg-page border border-ring rounded-lg px-3 py-2 text-base text-ink focus:outline-2 focus:outline-accent"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-ink-2">Notes <span className="text-muted">(optional)</span></span>
          <textarea
            value={body}
            rows={4}
            onChange={(e) => setBody(e.target.value)}
            className="bg-page border border-ring rounded-lg px-3 py-2 text-base text-ink focus:outline-2 focus:outline-accent resize-y"
          />
        </label>
        {error && <ErrorBox><b>Not captured:</b> {error}</ErrorBox>}
        {done && !error && (
          <p role="status" className="text-sm text-ink-2">
            Captured “{done}” — {hosted ? 'committed to the workspace repo; pull before triaging.' : 'written to inbox/, not committed.'}
          </p>
        )}
        <p className="text-sm text-muted">
          Lands in the workspace's <code>inbox/</code> as one file — triage it with <code>/o-next</code>.
        </p>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>{done ? 'Done' : 'Cancel'}</Button>
          <Button type="submit" primary disabled={busy || !title.trim()}>{busy ? 'Capturing…' : 'Capture'}</Button>
        </div>
      </form>
    </dialog>
  );
}
