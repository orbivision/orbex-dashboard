export function findWorkspace(start: string): string | null;
export function resolveWorkspace(given: string, orbexDir?: string): { root: string; scripts: string };
export function validate(next: unknown, index: unknown): void;
export function buildSnapshot(ws: { root: string; scripts: string }, opts?: { noGh?: boolean; fetch?: boolean }): Promise<any>;
export function buildSnapshotFromProducers(ws: { root: string; scripts: string }, opts?: { noGh?: boolean }): Promise<{ next: any; index: any }>;
