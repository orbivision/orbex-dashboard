# orbex-dashboard

A live progress dashboard for an [Orbex](https://github.com/orbivision/orbex) workspace — an
**optional add-on**. Orbex already ships a static dashboard (`node scripts/dashboard.mjs --open`);
this is the same picture as a page you can leave open in a tab. It **refreshes itself every
10 minutes**.

<img src="assets/dashboard-sample.png" alt="The dashboard rendered from orbex's sample workspace: status counts, in-flight project cards, weekly throughput and cycle-time charts" width="720">

It shows what the built-in dashboard shows: projects in flight, weekly throughput, cycle time, a
timeline, the GitHub Issues inbox, memory due for review, the backlog and any problems in the
plans. It also tells you when your checkout is **behind `origin`**.

## Setup

Clone it next to `orbex` and your workspace:

```
~/somewhere/
├── orbex/              # the machinery
├── my-workspace/       # your plans, memory, backlog
└── orbex-dashboard/    # this repo
```

```bash
git clone https://github.com/orbivision/orbex-dashboard.git
cd orbex-dashboard
npm install
npm run build
npm start -- --workspace ../my-workspace
```

Then open <http://127.0.0.1:4870/>. You need Node 22 or later, and the workspace needs to work
with Orbex already: `node scripts/next.mjs` runs inside it.

| Flag | |
|---|---|
| `--workspace <dir>` | The workspace to show. Or set `ORBEX_WORKSPACE`. |
| `--port <n>` | Default `4870`. |
| `--no-gh` | Skip the GitHub Issues inbox (offline, or `gh` not signed in). The page says "Not checked", not "empty". |
| `--no-fetch` | Don't `git fetch` for the behind-origin notice. |
| `--orbex <dir>` | Run the producers from this orbex clone instead of the workspace's `scripts/` link. Or set `ORBEX_HOME`. |

To try it without a workspace of your own, point it at orbex's sample:

```bash
npm start -- --workspace ../orbex/examples/sample-workspace --orbex ../orbex --no-gh
```

`npm run dev` runs the same server with Vite's hot reload, for working on the page itself.

## How it works

The server runs the workspace's own `scripts/next.mjs --json` and
`scripts/build-project-index.mjs --json`, the same two producers Orbex's built-in dashboard
renders. It adds a little git metadata and serves the result at `/api/snapshot`. The page draws
that data.

- **The page is never a source.** Nothing here reads a plan, backlog or memory file, and nothing
  is stored: there's no database, no cache file and no saved snapshot. A dashboard that kept its
  own status would be a second list to keep in sync, and a second list drifts. To change what
  the page shows, change the plans, then wait for the next refresh or click **Refresh**.
- **Refreshing re-reads your local checkout.** It doesn't pull. Work committed on another
  machine shows up after you `git pull`, so the page tells you how far behind `origin` you are
  (from a read-only `git fetch`). It never changes your working tree.
- **Errors stay visible.** A failed producer, an unreadable inbox or a failed refresh is shown
  as an error. If a refresh fails, the page keeps the last good data and labels it stale.
- **It listens on `127.0.0.1` only.** Plan titles are often private and nothing here asks for a
  login, so it isn't exposed to the network.
- Results are cached in memory for 60 seconds, so several open tabs don't each run `gh`. Background
  tabs catch up as soon as you return to them, because browsers slow down timers in hidden tabs.
- `?refresh=<seconds>` in the URL shortens the interval (minimum 10 seconds), for testing.

**Versions.** The add-on depends on the producers' `--json` output, so the server checks the
fields it needs. If a change in orbex removes one, the page names the missing field instead of
drawing an empty chart. Update whichever repo is older.

## Development

```bash
npm test          # vitest: derivations, server, and parity with orbex's dashboard.mjs
npm run typecheck
```

The parity test renders orbex's built-in dashboard for the sample workspace and checks that this
page computes the same numbers: throughput totals, cycle-time median, 90th percentile and
buckets, status counts. It's skipped if there's no `orbex` clone next to this one.

Stack: React, Vite, TypeScript and Tailwind CSS v4. The charts are drawn as SVG, without a
chart library. The server is plain `node:http`.

## License

MIT
