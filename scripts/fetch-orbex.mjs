#!/usr/bin/env node
// Vendors orbex's producers into vendor/orbex/scripts for the hosted build (ORBI-92).
//
// Hosted mode has no workspace checkout and so no scripts/ link to follow; it runs a PINNED orbex
// instead — package.json "orbex.ref", a commit on orbivision/orbex. Pinned, not "main", because
// the producers' --json is the interface this dashboard validates, and a deploy must not change
// it silently. ORBEX_REF overrides the pin; ORBEX_HOME copies a local clone (for testing).

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'vendor', 'orbex');
const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const repo = pkg.orbex?.repo ?? 'orbivision/orbex';
const ref = process.env.ORBEX_REF || pkg.orbex?.ref;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

if (process.env.ORBEX_HOME) {
  cpSync(path.join(path.resolve(process.env.ORBEX_HOME), 'scripts'), path.join(OUT, 'scripts'), { recursive: true, dereference: true });
  writeFileSync(path.join(OUT, 'REF'), `local:${process.env.ORBEX_HOME}\n`);
} else {
  if (!ref) throw new Error('no orbex ref — set "orbex": { "ref": "<commit>" } in package.json or ORBEX_REF');
  const url = `https://codeload.github.com/${repo}/tar.gz/${ref}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetching ${url}: HTTP ${res.status}`);
  const tgz = path.join(tmpdir(), `orbex-${process.pid}.tgz`);
  writeFileSync(tgz, Buffer.from(await res.arrayBuffer()));
  // The archive's top directory is <name>-<ref>; strip it and keep only scripts/. Extract it all
  // and copy, because a member pattern needs --wildcards on GNU tar and that flag breaks bsdtar.
  const tmp = path.join(tmpdir(), `orbex-${process.pid}`);
  mkdirSync(tmp, { recursive: true });
  execFileSync('tar', ['-xzf', tgz, '-C', tmp, '--strip-components=1']);
  cpSync(path.join(tmp, 'scripts'), path.join(OUT, 'scripts'), { recursive: true });
  rmSync(tmp, { recursive: true, force: true });
  rmSync(tgz, { force: true });
  writeFileSync(path.join(OUT, 'REF'), `${repo}@${ref}\n`);
}

for (const s of ['next.mjs', 'build-project-index.mjs', 'lib/workspace.mjs']) {
  if (!existsSync(path.join(OUT, 'scripts', s))) throw new Error(`vendored orbex is missing scripts/${s}`);
}
console.log(`fetch-orbex: ${readFileSync(path.join(OUT, 'REF'), 'utf8').trim()} → vendor/orbex/scripts`);
