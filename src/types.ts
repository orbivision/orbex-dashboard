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
export interface InboxItem { number: number; title: string; url: string }
export interface MemoryItem { file: string; reviewed?: string | null; days: number | null }

export interface Snapshot {
  name: string;
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
    memoryReview: MemoryItem[];
    memoryReviewError: string | null;
  };
  index: { key?: string; projects: Project[]; problems: string[] };
}

export type SnapshotResponse = { ok: true; snapshot: Snapshot } | { ok: false; error: string };
