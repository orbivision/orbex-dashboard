// A ten-line router: three routes don't justify a dependency. History API paths, so URLs are
// shareable (/projects/ORBI-12); both servers fall back to index.html for unknown paths.
import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react';

const EVENT = 'orbex:navigate';

export function navigate(to: string) {
  if (to === location.pathname + location.search) return;
  history.pushState(null, '', to);
  window.dispatchEvent(new Event(EVENT));
  window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const on = () => setPath(location.pathname);
    window.addEventListener('popstate', on);
    window.addEventListener(EVENT, on);
    return () => { window.removeEventListener('popstate', on); window.removeEventListener(EVENT, on); };
  }, []);
  return path;
}

/** An in-app link: a real <a href> (open-in-new-tab works), navigated client-side on a plain click. */
export function Link({ to, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const click = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={click} {...rest} />;
}

export const projectPath = (id: string) => `/projects/${encodeURIComponent(id)}`;
