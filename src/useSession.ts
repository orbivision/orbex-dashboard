import { useEffect, useState } from 'react';
import type { Session } from './types';

/** Who's signed in and what this deployment can do. `null` while loading. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/session', { cache: 'no-store' })
      .then(async (r) => {
        const body = await r.json();
        if (!body.ok) throw new Error(body.error);
        setSession(body as Session);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, []);
  return { session, error };
}
