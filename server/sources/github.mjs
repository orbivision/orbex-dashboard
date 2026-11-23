// GitHubSource — the workspace is a repo on GitHub, read through the API (hosted mode, ORBI-92).
//
// There is no checkout on a Netlify Function, and downloading the repo per request is out (the
// workspace this was built for carries ~48 MB of screenshots). But orbex's producers read exactly
// four things: the `.orbex-workspace` marker, projects/*/(plan|recommendation).md, BACKLOG.md and
// context/memory/*.md — plus inbox/*.md since ORBI-92. One GraphQL query fetches only those as
// text, they're written to a throwaway directory, and the REAL producers run there with --no-gh.
// Re-implementing them here would be a second frontmatter reader that can disagree with the first.
//
// GitHub Issues come from REST instead of `gh`, and are merged in exactly as next.mjs would.
// Capture is one Contents-API commit creating inbox/<file>.md on the branch.
//
// Hosted shows what's PUSHED. Uncommitted work on a laptop never appears here, so `dirty` and
// `behind` are meaningless and reported as false/null; the header says "hosted".

import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { buildSnapshotFromProducers } from '../snapshot.mjs';
import { captureContent, captureFilename, captureItem } from '../capture.mjs';

const API = 'https://api.github.com';
const PLAN_NAMES = ['plan.md', 'recommendation.md'];

const BLOB = '... on Blob { text isBinary }';
const QUERY = `query($owner: String!, $name: String!, $ref: String!, $marker: String!, $backlog: String!, $projects: String!, $memory: String!, $inbox: String!) {
  repository(owner: $owner, name: $name) {
    ref(qualifiedName: $ref) { name target { oid } }
    marker: object(expression: $marker) { ${BLOB} }
    backlog: object(expression: $backlog) { ${BLOB} }
    projects: object(expression: $projects) { ... on Tree { entries { name type object { ... on Tree { entries { name type object { ${BLOB} } } } } } } }
    memory: object(expression: $memory) { ... on Tree { entries { name type object { ${BLOB} } } } }
    inbox: object(expression: $inbox) { ... on Tree { entries { name type object { ${BLOB} } } } }
  }
}`;

export class GitHubError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export function githubConfig(env) {
  const repo = env.ORBEX_GITHUB_REPO ?? '';
  const m = repo.match(/^([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+)$/);
  if (!m) throw new Error('ORBEX_GITHUB_REPO must be owner/name');
  if (!env.ORBEX_GITHUB_TOKEN) throw new Error('ORBEX_GITHUB_TOKEN is not set');
  const prefix = (env.ORBEX_WORKSPACE_PATH ?? '').replace(/^\/+|\/+$/g, '');
  if (prefix.split('/').includes('..')) throw new Error('ORBEX_WORKSPACE_PATH may not contain ..');
  return { owner: m[1], name: m[2], token: env.ORBEX_GITHUB_TOKEN, branch: env.ORBEX_GITHUB_BRANCH || null, prefix: prefix ? `${prefix}/` : '' };
}

export class GitHubSource {
  /**
   * @param {ReturnType<typeof githubConfig>} config
   * @param {{ orbexScripts: string, fetch?: typeof fetch, noGh?: boolean }} opts
   */
  constructor(config, { orbexScripts, fetch: fetchImpl = fetch, noGh = false }) {
    this.config = config;
    this.orbexScripts = orbexScripts;
    this.fetch = fetchImpl;
    this.noGh = noGh;
    this.kind = 'github';
    this.branch = config.branch;
  }

  get name() {
    return this.config.prefix ? path.basename(this.config.prefix) : this.config.name;
  }

  async api(pathname, init = {}) {
    const res = await this.fetch(`${API}${pathname}`, {
      ...init,
      headers: {
        authorization: `Bearer ${this.config.token}`,
        accept: 'application/vnd.github+json',
        'x-github-api-version': '2022-11-28',
        'user-agent': 'orbex-dashboard',
        ...init.headers,
      },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new GitHubError(`GitHub ${res.status} on ${init.method ?? 'GET'} ${pathname.split('?')[0]}: ${body.message ?? res.statusText}`, res.status);
    }
    return res;
  }

  async resolveBranch() {
    if (!this.branch) {
      const repo = await (await this.api(`/repos/${this.config.owner}/${this.config.name}`)).json();
      this.branch = repo.default_branch;
    }
    return this.branch;
  }

  /** The producers' inputs as { relPath: text } plus the head commit. */
  async fetchInputs() {
    const branch = await this.resolveBranch();
    const p = this.config.prefix;
    const expr = (rel) => `refs/heads/${branch}:${p}${rel}`;
    const res = await this.api('/graphql', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          owner: this.config.owner, name: this.config.name, ref: `refs/heads/${branch}`,
          marker: expr('.orbex-workspace'), backlog: expr('BACKLOG.md'),
          projects: expr('projects'), memory: expr('context/memory'), inbox: expr('inbox'),
        },
      }),
    });
    const out = await res.json();
    if (out.errors?.length) throw new GitHubError(`GitHub GraphQL: ${out.errors.map((e) => e.message).join('; ')}`, 502);
    const r = out.data?.repository;
    if (!r) throw new GitHubError(`repository ${this.config.owner}/${this.config.name} not found, or the token can't read it`, 404);
    if (!r.ref) throw new GitHubError(`branch ${branch} not found`, 404);
    if (!r.marker?.text) throw new GitHubError(`${p}.orbex-workspace not found on ${branch} — is ORBEX_WORKSPACE_PATH right?`, 404);

    const files = { '.orbex-workspace': r.marker.text };
    if (r.backlog?.text != null) files['BACKLOG.md'] = r.backlog.text;
    for (const dir of r.projects?.entries ?? []) {
      if (dir.type !== 'tree') continue;
      for (const f of dir.object?.entries ?? []) {
        if (PLAN_NAMES.includes(f.name) && f.object?.text != null) files[`projects/${dir.name}/${f.name}`] = f.object.text;
      }
    }
    // A workspace with memory always has a directory for it; mark its existence even if empty,
    // because next.mjs reports a MISSING memory directory as an error, not as "nothing due".
    const dirs = [];
    if (r.memory) dirs.push('context/memory');
    for (const f of r.memory?.entries ?? []) {
      if (f.type === 'blob' && f.name.endsWith('.md') && f.object?.text != null) files[`context/memory/${f.name}`] = f.object.text;
    }
    if (r.inbox) dirs.push('inbox');
    for (const f of r.inbox?.entries ?? []) {
      if (f.type === 'blob' && f.name.endsWith('.md') && f.object?.text != null) files[`inbox/${f.name}`] = f.object.text;
    }
    return { files, dirs, branch, oid: r.ref.target.oid };
  }

  /** Open issues as next.mjs lists them (every open issue; the label is a hint). */
  async issues() {
    if (this.noGh) return { items: [], error: 'skipped (--no-gh)' };
    try {
      const res = await this.api(`/repos/${this.config.owner}/${this.config.name}/issues?state=open&per_page=100`);
      const raw = await res.json();
      return {
        items: raw.filter((i) => !i.pull_request).map((i) => {
          const labels = (i.labels ?? []).map((l) => (typeof l === 'string' ? l : l.name));
          return { source: 'issue', number: i.number, title: i.title, createdAt: i.created_at, url: i.html_url, labels, labelled: labels.includes('inbox') };
        }),
        error: null,
      };
    } catch (e) {
      return { items: [], error: `could not read GitHub Issues: ${e.message}` };
    }
  }

  async snapshot() {
    const [inputs, issues] = await Promise.all([this.fetchInputs(), this.issues()]);
    const dir = await mkdtemp(path.join(tmpdir(), 'orbex-mirror-'));
    try {
      for (const d of inputs.dirs) await mkdir(path.join(dir, d), { recursive: true });
      for (const [rel, text] of Object.entries(inputs.files)) {
        await mkdir(path.dirname(path.join(dir, rel)), { recursive: true });
        await writeFile(path.join(dir, rel), text);
      }
      const { next, index } = await buildSnapshotFromProducers({ root: dir, scripts: this.orbexScripts }, { noGh: true });
      // next.mjs ran offline: replace its "skipped" with the real issues, files first as it orders them.
      const files = next.inbox.filter((i) => i.source === 'file');
      next.inbox = [...files, ...issues.items];
      next.inboxError = issues.error;
      const { owner, name, prefix } = this.config;
      return {
        name: this.name,
        source: 'github',
        generatedAt: new Date().toISOString(),
        noGh: this.noGh,
        git: {
          sha: inputs.oid.slice(0, 7),
          dirty: false,
          githubBase: `https://github.com/${owner}/${name}/blob/${encodeURIComponent(inputs.branch)}/${prefix}`,
          upstream: inputs.branch,
          behind: null,
          ahead: null,
          error: null,
        },
        next,
        index,
      };
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }

  async readText(rel) {
    const branch = await this.resolveBranch();
    const p = `${this.config.prefix}${rel}`.split('/').map(encodeURIComponent).join('/');
    const res = await this.api(`/repos/${this.config.owner}/${this.config.name}/contents/${p}?ref=${encodeURIComponent(branch)}`, {
      headers: { accept: 'application/vnd.github.raw+json' },
    });
    return res.text();
  }

  async capture(entry, now = new Date()) {
    const branch = await this.resolveBranch();
    const content = captureContent(entry, now);
    const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(content)));
    for (let attempt = 1; attempt <= 5; attempt++) {
      const name = captureFilename(entry.title, now, attempt);
      const p = `${this.config.prefix}inbox/${name}`.split('/').map(encodeURIComponent).join('/');
      try {
        const res = await this.api(`/repos/${this.config.owner}/${this.config.name}/contents/${p}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          // No `sha`: GitHub then refuses (422) rather than overwrite an existing file.
          body: JSON.stringify({ message: `inbox: ${entry.title}`, content: b64, branch }),
        });
        const out = await res.json();
        return { item: captureItem(name, entry, now), committed: true, commit: out.commit?.sha ?? null };
      } catch (e) {
        if (e.status === 422) continue;
        throw e;
      }
    }
    throw new Error('could not find a free filename in inbox/');
  }
}
