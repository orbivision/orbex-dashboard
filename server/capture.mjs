// Capture (ORBI-92) — the dashboard's one write: CREATE a new file under inbox/.
//
// One file per item is orbex's inbox convention (next.mjs reads inbox/*.md beside GitHub
// Issues). It is the narrowest write there is: never an edit, never a delete, never BACKLOG.md
// or a plan. A new uniquely-named file can't merge-conflict with a laptop mid-edit, which is
// what makes it safe for a hosted dashboard to commit straight to origin.
//
// Both sources share this module, so a capture is byte-identical whether it was written to a
// working tree or committed through the GitHub API.

import { createHash } from 'node:crypto';

export const TITLE_MAX = 200;
export const BODY_MAX = 10_000;

export class CaptureError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

/** Validate the request body; returns `{ title, body }` normalised, or throws CaptureError. */
export function parseCapture(input) {
  if (!input || typeof input !== 'object') throw new CaptureError('expected a JSON object with a title');
  const title = typeof input.title === 'string' ? input.title.replace(/\s+/g, ' ').trim() : '';
  const body = typeof input.body === 'string' ? input.body.replace(/\r\n?/g, '\n').trim() : '';
  if (!title) throw new CaptureError('a title is required');
  if (title.length > TITLE_MAX) throw new CaptureError(`the title is over ${TITLE_MAX} characters — put the rest in the notes`);
  if (body.length > BODY_MAX) throw new CaptureError(`the notes are over ${BODY_MAX} characters`);
  return { title, body };
}

export function slugify(title) {
  const s = title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)
    .replace(/-+$/, '');
  return s || 'capture';
}

/**
 * `inbox/2026-11-22T1830-the-idea.md` — sortable by name, readable in `ls`, and the date part is
 * what next.mjs falls back to if the frontmatter is ever lost. `attempt` > 1 adds a suffix for
 * the rare same-minute, same-title collision.
 */
export function captureFilename(title, now = new Date(), attempt = 1) {
  const iso = now.toISOString(); // UTC, matching the `captured:` timestamp
  const stamp = `${iso.slice(0, 10)}T${iso.slice(11, 13)}${iso.slice(14, 16)}`;
  return `${stamp}-${slugify(title)}${attempt > 1 ? `-${attempt}` : ''}.md`;
}

export function captureContent({ title, body }, now = new Date()) {
  const captured = now.toISOString().replace(/\.\d{3}Z$/, 'Z');
  return `---\ncaptured: ${captured}\nsource: dashboard\n---\n\n# ${title}\n${body ? `\n${body}\n` : ''}`;
}

/** The item as next.mjs will list it, so the page can show it before the next snapshot. */
export function captureItem(name, { title, body }, now = new Date()) {
  return {
    source: 'file',
    file: `inbox/${name}`,
    title,
    titled: true,
    createdAt: now.toISOString().replace(/\.\d{3}Z$/, 'Z'),
    body: body || null,
  };
}

// ── Editing and discarding (ORBI-92 addendum) ───────────────────────────────────────────────
//
// The first writes that can lose work, so every one carries the `version` it was based on: the
// file's GIT BLOB SHA. GitHub reports exactly that for a file, and a local checkout can compute
// it, so both sources agree byte-for-byte and a stale save is refused (409) in either mode.

/** An inbox file name as next.mjs lists it: `<name>.md`, no directory, no dotfile, not the README. */
const INBOX_NAME = /^[^./\\][^/\\]*\.md$/;
export const isInboxName = (name) => typeof name === 'string' && INBOX_NAME.test(name) && name.toLowerCase() !== 'readme.md';

/** `git hash-object` for a blob — the same 40-hex sha GitHub's Contents API returns. */
export function blobSha(text) {
  const bytes = Buffer.from(text, 'utf8');
  return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
}

/**
 * Split an inbox file at its `# title` line: `head` is everything before it (frontmatter, and
 * anything hand-added), kept verbatim by an edit.
 */
export function splitInbox(text) {
  const m = /^# +(.+?)[ \t]*$/m.exec(text);
  if (!m) return { head: text.endsWith('\n') || !text ? text : `${text}\n`, title: '', body: '' };
  return { head: text.slice(0, m.index), title: m[1], body: text.slice(m.index + m[0].length).trim() };
}

export function editedContent(text, { title, body }) {
  return `${splitInbox(text).head}# ${title}\n${body ? `\n${body}\n` : ''}`;
}

/** Validate an edit or discard request: `{ name, version }` plus, for an edit, title and body. */
export function parseWrite(input, { edit }) {
  if (!input || typeof input !== 'object') throw new CaptureError('expected a JSON object');
  if (!isInboxName(input.name)) throw new CaptureError('not an inbox file name');
  if (typeof input.version !== 'string' || !/^[0-9a-f]{40}$/.test(input.version)) throw new CaptureError('a version is required');
  return { name: input.name, version: input.version, ...(edit ? parseCapture(input) : {}) };
}

export const conflict = () => new CaptureError('this capture changed since you opened it', 409);
export const gone = (name) => new CaptureError(`inbox/${name} no longer exists — it may have been triaged`, 404);
