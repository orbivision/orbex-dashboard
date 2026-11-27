// LocalSource — the workspace is a checkout on this machine (ORBI-90's original mode).
//
// Reads run the workspace's own producers (server/snapshot.mjs). The one write, capture, puts a
// file in the working tree and deliberately does NOT commit: committing is the user's act, and
// orbex's Stop hook warns about uncommitted inbox/ captures the same way it does for memory.

import { open, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { buildSnapshot } from '../snapshot.mjs';
import { blobSha, captureContent, captureFilename, captureItem, conflict, editedContent, gone, isInboxName } from '../capture.mjs';

export class LocalSource {
  /** `ws` is resolveWorkspace()'s result; `options` are buildSnapshot's. */
  constructor(ws, options = {}) {
    this.ws = ws;
    this.options = options;
    this.kind = 'local';
  }

  get name() {
    return path.basename(this.ws.root);
  }

  async snapshot() {
    return { ...(await buildSnapshot(this.ws, this.options)), source: 'local' };
  }

  /** Read a workspace file by a path the caller has ALREADY validated (see handlers.mjs). */
  async readText(rel) {
    const file = path.resolve(this.ws.root, rel);
    if (!file.startsWith(this.ws.root + path.sep)) throw new Error(`refusing to read outside the workspace: ${rel}`);
    return readFile(file, 'utf8');
  }

  async capture(entry, now = new Date()) {
    const dir = path.join(this.ws.root, 'inbox');
    mkdirSync(dir, { recursive: true });
    for (let attempt = 1; attempt <= 20; attempt++) {
      const name = captureFilename(entry.title, now, attempt);
      let fh;
      try {
        fh = await open(path.join(dir, name), 'wx'); // never overwrite
      } catch (e) {
        if (e.code === 'EEXIST') continue;
        throw e;
      }
      try {
        await fh.writeFile(captureContent(entry, now));
      } finally {
        await fh.close();
      }
      return { item: captureItem(name, entry, now), committed: false };
    }
    throw new Error('could not find a free filename in inbox/');
  }

  // ── Edit / discard (ORBI-92 addendum). Captures are usually UNTRACKED here, so git can't undo
  // a bad write — the version check is the only thing between two editors and a lost edit.

  inboxFile(name) {
    if (!isInboxName(name)) throw new Error(`not an inbox file name: ${name}`);
    return path.join(this.ws.root, 'inbox', name);
  }

  async readInbox(name) {
    try {
      const text = await readFile(this.inboxFile(name), 'utf8');
      return { text, version: blobSha(text) };
    } catch (e) {
      if (e.code === 'ENOENT') throw gone(name);
      throw e;
    }
  }

  async editInbox({ name, version, title, body }) {
    const { text, version: current } = await this.readInbox(name);
    if (current !== version) throw conflict();
    const next = editedContent(text, { title, body });
    const file = this.inboxFile(name);
    const tmp = path.join(path.dirname(file), `.${name}.${process.pid}.tmp`); // dotfile: next.mjs skips it
    await writeFile(tmp, next);
    await rename(tmp, file); // atomic: a reader sees the old file or the new one, never half
    return { version: blobSha(next), committed: false };
  }

  async discardInbox({ name, version }) {
    const { version: current } = await this.readInbox(name);
    if (current !== version) throw conflict();
    await unlink(this.inboxFile(name));
    return { committed: false };
  }
}
