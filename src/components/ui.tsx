import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, projectPath } from '../router';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`bg-surface border border-ring rounded-xl p-5 ${className}`}>{children}</section>;
}

export function Count({ n }: { n: number | string }) {
  return <span className="text-muted font-medium ml-1">{n}</span>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold mb-3">{children}</h2>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

export function ErrorBox({ children }: { children: ReactNode }) {
  return <div role="alert" className="text-err bg-err-bg rounded-lg px-3 py-2">{children}</div>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-ink-2 text-sm mt-1">{children}</p>;
}

/** Backlog/inbox titles carry markdown backticks; render them as code, everything else as text. */
export function Md({ text }: { text: string }) {
  return <>{text.split(/`([^`]+)`/).map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</>;
}

export function TableView({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="mt-2 text-sm group">
      <summary className="text-muted cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">▸ </span><span className="hidden group-open:inline">▾ </span>Table view
      </summary>
      <table className="w-full mt-2 border-collapse">
        <thead><tr>{head.map((h) => <th key={h} className="text-left text-muted font-medium px-2 py-1 border-b border-grid">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className="px-2 py-1 border-b border-grid">{c}</td>)}</tr>)}</tbody>
      </table>
    </details>
  );
}

export function Legend({ items }: { items: [string, string][] }) {
  return (
    <ul className="flex gap-4 text-sm text-ink-2 mt-1.5">
      {items.map(([cls, label]) => (
        <li key={label} className="flex items-center gap-1.5"><i className={`inline-block size-2.5 rounded-[3px] ${cls}`} />{label}</li>
      ))}
    </ul>
  );
}

/** A project, opened in the Projects view (ORBI-92) — not on GitHub, which the detail page links to. */
export function PlanLink({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return <Link to={projectPath(id)} className={className}>{children}</Link>;
}

export function Button({ children, className = '', primary = false, ...rest }: { primary?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const look = primary
    ? 'bg-brand text-white border-brand hover:brightness-110'
    : 'text-ink-2 bg-surface border-ring hover:text-ink hover:border-accent';
  return (
    <button
      type="button"
      className={`text-sm border rounded-full px-3.5 py-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${look} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
