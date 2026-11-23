// The shape of /api/snapshot. `next` and `index` are the orbex producers' --json output,
// passed through untouched; server/snapshot.mjs validates the fields the page relies on.

export type Status = 'blocked' | 'active' | 'open' | 'done' | 'dropped';

export interface Project {
  id: string;
  num: number;
  file: string;
  title: string;
  status: Status | string;
  opened?: string;
  closed?: string;
  priority?: string;
  repos?: string[];
}

export interface BacklogItem { section: string; title: string; text?: string }
/** A GitHub Issue. Older orbex versions omit `source`. */
export interface IssueItem { source?: 'issue'; number: number; title: string; url: string; createdAt?: string }
/** One file in the workspace's inbox/ (ORBI-92). */
export interface FileItem { source: 'file'; file: string; title: string; titled?: boolean; createdAt: string | null; body: string | null }
export type InboxItem = IssueItem | FileItem;
export const isFile = (i: InboxItem): i is FileItem => i.source === 'file';
export interface MemoryItem { file: string; reviewed?: string | null; days: number | null }

export interface Snapshot {
  name: string;
  /** Where the data came from: a checkout on this machine, or the repo on GitHub (hosted). */
  source?: 'local' | 'github';
  generatedAt: string;
  noGh: boolean;
  git: {
    sha: string | null;
    dirty: boolean;
    githubBase: string | null;
    upstream: string | null;
    behind: number | null;
    ahead: number | null;
    error: string | null;
  };
  next: {
    projects: Project[];
    backlog: BacklogItem[];
    inbox: InboxItem[];
    inboxError: string | null;
    /** null = inbox/ read fine (or absent). Set by the server when the installed orbex predates inbox/ files. */
    inboxFilesError?: string | null;
    memoryReview: MemoryItem[];
    memoryReviewError: string | null;
  };
  index: { key?: string; projects: Project[]; problems: string[] };
}

export interface User { provider: string; id: string; login: string; name?: string | null; avatar?: string | null }

export interface Session {
  user: User | null;
  auth: 'none' | 'github';
  source: 'local' | 'github';
  name: string;
  canCapture: boolean;
}

export type SnapshotResponse = { ok: true; snapshot: Snapshot } | { ok: false; error: string };
