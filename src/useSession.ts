import { useEffect, useState } from 'react';
import type { Session } from './types';

/** Who's signed in and what this deployment can do. `null` while loading. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/session', { cache: 'no-store' })
      .then(async (r) => {
        // A server started before this page was built answers unknown /api paths with the page
        // itself — the page is new, the process is old. Say that, rather than quietly hiding
        // everything the session would have enabled (Capture, ORBI-92).
        if (!(r.headers.get('content-type') ?? '').includes('application/json')) {
          throw new Error('the server is older than this page — restart it (npm start) to enable Capture');
        }
        const body = await r.json();
        if (!body.ok) throw new Error(body.error);
        setSession(body as Session);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, []);
  return { session, error };
}
