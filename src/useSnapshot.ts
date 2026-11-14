import { useCallback, useEffect, useRef, useState } from 'react';
import type { Snapshot, SnapshotResponse } from './types';

/** 10 minutes. `?refresh=<seconds>` overrides it (min 10 s) for testing the refresh itself. */
export const REFRESH_MS = (() => {
  const s = Number(new URLSearchParams(location.search).get('refresh'));
  return Number.isFinite(s) && s >= 10 ? s * 1000 : 10 * 60 * 1000;
})();

export interface SnapshotState {
  snapshot: Snapshot | null;
  /** The last refresh failed. `snapshot` still holds the last good data — shown as stale, never as fresh. */
  error: string | null;
  loading: boolean;
  /** When the last attempt (successful or not) started — the next timed refresh is REFRESH_MS after it. */
  attemptedAt: number | null;
  refresh: () => void;
}

export function useSnapshot(): SnapshotState {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attemptedAt, setAttemptedAt] = useState<number | null>(null);
  const lastAttempt = useRef(0);
  const busy = useRef(false);

  const load = useCallback(async (fresh: boolean) => {
    if (busy.current) return;
    busy.current = true;
    lastAttempt.current = Date.now();
    setAttemptedAt(lastAttempt.current);
    setLoading(true);
    try {
      const res = await fetch(`/api/snapshot${fresh ? '?fresh=1' : ''}`, { cache: 'no-store' });
      const body = (await res.json()) as SnapshotResponse;
      if (!body.ok) throw new Error(body.error);
      setSnapshot(body.snapshot);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
    // Due = REFRESH_MS since the last attempt, timed or manual — so a Refresh click restarts the
    // countdown. Checked on a short tick rather than one long interval, and again whenever the tab
    // comes back: background tabs throttle or suspend timers, sometimes for hours.
    const due = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastAttempt.current >= REFRESH_MS) void load(false);
    };
    const timer = setInterval(due, Math.min(30_000, REFRESH_MS / 3));
    const onVisible = due;
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, [load]);

  return { snapshot, error, loading, attemptedAt, refresh: () => void load(true) };
}

/** Re-render every `ms` so "updated N min ago" stays true. */
export function useNow(ms = 30_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}
