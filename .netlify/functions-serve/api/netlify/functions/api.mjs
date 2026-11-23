
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/lib.mjs
import { existsSync } from "node:fs";
import path3 from "node:path";
import { fileURLToPath } from "node:url";

// server/logo.mjs
var LOGO_SVG = '<svg class="logo" role="img" aria-label="Orbex" width="171" height="58" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1522 512" fill="none">\n  <circle cx="256" cy="256" r="238" fill="#CF27E0"/>\n  <path d="M 408 196 A 160 160 0 0 0 104 196 L 408 316 A 160 160 0 0 1 104 316 L 408 196 Z" fill="none" stroke="#ffffff" stroke-width="46" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"/>\n  <path transform="translate(556.63 379.96) scale(0.59028)" d="M198.60 6L198.60 6Q148.80 6 114-11.70Q79.20-29.40 60.60-66.30Q42-103.20 40.20-159.60L40.20-159.60Q39.60-186.60 39.60-210Q39.60-233.40 40.20-260.40L40.20-260.40Q42-316.20 61.80-353.10Q81.60-390 116.70-408Q151.80-426 198.60-426L198.60-426Q245.40-426 280.50-408Q315.60-390 335.70-353.10Q355.80-316.20 357-260.40L357-260.40Q358.20-233.40 358.20-210Q358.20-186.60 357-159.60L357-159.60Q355.80-103.20 336.90-66.30Q318-29.40 283.20-11.70Q248.40 6 198.60 6ZM198.60-30L198.60-30Q250.20-30 283.50-61.20Q316.80-92.40 319.20-162.60L319.20-162.60Q320.40-189.60 320.40-210Q320.40-230.40 319.20-257.40L319.20-257.40Q318-304.20 302.10-333.60Q286.20-363 259.50-376.50Q232.80-390 198.60-390L198.60-390Q165-390 138.30-376.50Q111.60-363 95.70-333.60Q79.80-304.20 78-257.40L78-257.40Q77.40-230.40 77.40-210Q77.40-189.60 78-162.60L78-162.60Q80.40-92.40 114-61.20Q147.60-30 198.60-30ZM477.30 0L467.70 0Q461.70 0 458.10-3.60Q454.50-7.20 454.50-13.20L454.50-13.20L454.50-298.20Q454.50-304.20 458.10-308.10Q461.70-312 467.70-312L467.70-312L477.30-312Q483.30-312 487.20-308.10Q491.10-304.20 491.10-298.20L491.10-298.20L491.10-270.60Q501.90-291.60 522.30-301.80Q542.70-312 572.70-312L572.70-312L594.90-312Q600.90-312 604.50-308.40Q608.10-304.80 608.10-298.80L608.10-298.80L608.10-290.40Q608.10-284.40 604.50-280.80Q600.90-277.20 594.90-277.20L594.90-277.20L569.10-277.20Q533.10-277.20 512.10-256.20Q491.10-235.20 491.10-199.20L491.10-199.20L491.10-13.20Q491.10-7.20 487.20-3.60Q483.30 0 477.30 0L477.30 0ZM809.99 6L809.99 6Q772.79 6 748.49-7.50Q724.19-21 709.19-41.40L709.19-41.40L709.19-13.20Q709.19-7.20 705.59-3.60Q701.99 0 695.99 0L695.99 0L685.79 0Q679.79 0 676.19-3.60Q672.59-7.20 672.59-13.20L672.59-13.20L672.59-412.80Q672.59-418.80 676.19-422.40Q679.79-426 685.79-426L685.79-426L695.99-426Q701.99-426 705.59-422.40Q709.19-418.80 709.19-412.80L709.19-412.80L709.19-270.60Q724.19-290.40 748.49-304.20Q772.79-318 809.99-318L809.99-318Q845.39-318 869.39-305.40Q893.39-292.80 908.39-271.80Q923.39-250.80 930.59-225Q937.79-199.20 938.39-172.80L938.39-172.80Q938.99-163.80 938.99-156Q938.99-148.20 938.39-139.20L938.39-139.20Q937.79-112.80 930.59-87Q923.39-61.20 908.39-40.20Q893.39-19.20 869.39-6.60Q845.39 6 809.99 6ZM806.39-28.80L806.39-28.80Q841.79-28.80 862.19-44.40Q882.59-60 891.59-85.20Q900.59-110.40 901.79-139.20L901.79-139.20Q902.39-156 901.79-172.80L901.79-172.80Q900.59-201.60 891.59-226.80Q882.59-252 862.19-267.60Q841.79-283.20 806.39-283.20L806.39-283.20Q773.39-283.20 752.09-267.60Q730.79-252 720.29-228.60Q709.79-205.20 709.19-181.20L709.19-181.20Q708.59-172.20 708.59-157.80Q708.59-143.40 709.19-134.40L709.19-134.40Q710.39-109.80 720.29-85.50Q730.19-61.20 751.19-45Q772.19-28.80 806.39-28.80ZM1144.49 6L1144.49 6Q1086.29 6 1052.09-32.10Q1017.89-70.20 1013.09-132L1013.09-132Q1012.49-141 1012.49-156Q1012.49-171 1013.09-180L1013.09-180Q1016.09-220.80 1032.29-252Q1048.49-283.20 1076.99-300.60Q1105.49-318 1144.49-318L1144.49-318Q1186.49-318 1215.89-299.40Q1245.29-280.80 1261.19-246Q1277.09-211.20 1277.09-163.20L1277.09-163.20L1277.09-154.20Q1277.09-148.20 1273.19-144.60Q1269.29-141 1263.29-141L1263.29-141L1049.69-141Q1049.69-141 1049.69-138.60Q1049.69-136.20 1049.69-135L1049.69-135Q1050.89-108 1062.29-83.70Q1073.69-59.40 1094.69-44.10Q1115.69-28.80 1144.49-28.80L1144.49-28.80Q1170.29-28.80 1187.39-36.60Q1204.49-44.40 1214.69-53.70Q1224.89-63 1227.89-67.80L1227.89-67.80Q1233.29-75.60 1236.29-77.10Q1239.29-78.60 1245.89-78.60L1245.89-78.60L1255.49-78.60Q1260.89-78.60 1264.79-75.30Q1268.69-72 1268.09-66.60L1268.09-66.60Q1267.49-58.20 1258.79-45.90Q1250.09-33.60 1234.19-21.60Q1218.29-9.60 1195.49-1.80Q1172.69 6 1144.49 6ZM1049.69-177L1049.69-174.60L1240.49-174.60L1240.49-177Q1240.49-207 1229.09-231Q1217.69-255 1196.09-269.10Q1174.49-283.20 1144.49-283.20L1144.49-283.20Q1114.49-283.20 1093.19-269.10Q1071.89-255 1060.79-231Q1049.69-207 1049.69-177L1049.69-177ZM1361.38 0L1349.38 0Q1344.58 0 1340.98-3.60Q1337.38-7.20 1337.38-12L1337.38-12Q1337.38-14.40 1338.28-17.10Q1339.18-19.80 1342.18-24L1342.18-24L1447.78-159.60L1347.58-288Q1344.58-292.20 1343.68-294.90Q1342.78-297.60 1342.78-300L1342.78-300Q1342.78-304.80 1346.38-308.40Q1349.98-312 1354.78-312L1354.78-312L1367.38-312Q1373.38-312 1376.68-309Q1379.98-306 1382.38-303L1382.38-303L1472.38-187.20L1562.38-302.40Q1565.38-305.40 1568.38-308.70Q1571.38-312 1577.38-312L1577.38-312L1589.38-312Q1594.18-312 1597.78-308.40Q1601.38-304.80 1601.38-300L1601.38-300Q1601.38-297.60 1600.48-294.90Q1599.58-292.20 1596.58-288L1596.58-288L1495.18-157.80L1600.78-24Q1603.78-19.80 1604.68-17.10Q1605.58-14.40 1605.58-12L1605.58-12Q1605.58-7.20 1601.98-3.60Q1598.38 0 1593.58 0L1593.58 0L1580.98 0Q1574.98 0 1571.68-3Q1568.38-6 1565.98-9L1565.98-9L1471.18-130.20L1376.38-9Q1373.98-6 1370.68-3Q1367.38 0 1361.38 0L1361.38 0Z" class="wordmark"/>\n</svg>';

// server/auth.mjs
var SESSION_COOKIE = "orbex_session";
var STATE_COOKIE = "orbex_oauth";
var SESSION_DAYS = 30;
var STATE_MINUTES = 10;
var enc = new TextEncoder();
var b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
var unb64url = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
async function hmacKey(secret) {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
async function sign(value, secret) {
  const body = b64url(enc.encode(JSON.stringify(value)));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}
async function unsign(token, secret, now = Date.now()) {
  if (typeof token !== "string") return null;
  const [body, sig, extra] = token.split(".");
  if (!body || !sig || extra !== void 0) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(secret), unb64url(sig), enc.encode(body));
    if (!ok) return null;
    const value = JSON.parse(new TextDecoder().decode(unb64url(body)));
    if (typeof value?.exp !== "number" || value.exp < now) return null;
    return value;
  } catch {
    return null;
  }
}
function readCookie(req, name) {
  for (const part of (req.headers.get("cookie") ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i !== -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}
var cookie = (name, value, maxAge, path4 = "/") => `${name}=${encodeURIComponent(value)}; Path=${path4}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
function safeNext(next) {
  return typeof next === "string" && /^\/(?![/\\])[^\s]*$/.test(next) && !next.startsWith("/auth/") ? next : "/";
}
function authConfig(env2) {
  const need = ["ORBEX_OAUTH_CLIENT_ID", "ORBEX_OAUTH_CLIENT_SECRET", "ORBEX_SESSION_SECRET", "ORBEX_ALLOWED_USERS"];
  const missing = need.filter((k) => !env2[k]);
  if (missing.length) throw new Error(`hosted sign-in is not configured \u2014 missing ${missing.join(", ")}`);
  if (env2.ORBEX_SESSION_SECRET.length < 32) throw new Error("ORBEX_SESSION_SECRET must be at least 32 characters");
  const allowed = env2.ORBEX_ALLOWED_USERS.split(/[\s,]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!allowed.length) throw new Error("ORBEX_ALLOWED_USERS lists nobody");
  return {
    clientId: env2.ORBEX_OAUTH_CLIENT_ID,
    clientSecret: env2.ORBEX_OAUTH_CLIENT_SECRET,
    secret: env2.ORBEX_SESSION_SECRET,
    allowed
  };
}
function githubAuth(config2, fetchImpl = fetch) {
  const isAllowed = (user2) => !!user2 && user2.provider === "github" && config2.allowed.includes(String(user2.login).toLowerCase());
  async function user(req) {
    const s = await unsign(readCookie(req, SESSION_COOKIE), config2.secret);
    if (!s?.user || !isAllowed(s.user)) return null;
    return s.user;
  }
  const redirect = (to, cookies = []) => {
    const h = new Headers({ location: to, "cache-control": "no-store" });
    for (const c of cookies) h.append("set-cookie", c);
    return new Response(null, { status: 302, headers: h });
  };
  async function login(req) {
    const url = new URL(req.url);
    const state = b64url(crypto.getRandomValues(new Uint8Array(24)));
    const next = safeNext(url.searchParams.get("next"));
    const token = await sign({ state, next, exp: Date.now() + STATE_MINUTES * 6e4 }, config2.secret);
    const gh = new URL("https://github.com/login/oauth/authorize");
    gh.searchParams.set("client_id", config2.clientId);
    gh.searchParams.set("redirect_uri", `${url.origin}/auth/callback`);
    gh.searchParams.set("state", state);
    gh.searchParams.set("allow_signup", "false");
    return redirect(gh.toString(), [cookie(STATE_COOKIE, token, STATE_MINUTES * 60, "/auth/")]);
  }
  async function callback(req) {
    const url = new URL(req.url);
    const pending = await unsign(readCookie(req, STATE_COOKIE), config2.secret);
    const clearState = cookie(STATE_COOKIE, "", 0, "/auth/");
    if (!pending || !url.searchParams.get("state") || pending.state !== url.searchParams.get("state")) {
      return page(400, "Sign-in expired or was tampered with", '<p><a href="/auth/login">Try again</a></p>', [clearState]);
    }
    const tokenRes = await fetchImpl("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ client_id: config2.clientId, client_secret: config2.clientSecret, code: url.searchParams.get("code"), redirect_uri: `${url.origin}/auth/callback` })
    });
    const tok = await tokenRes.json().catch(() => ({}));
    if (!tok.access_token) return page(502, "GitHub refused the sign-in", `<p>${esc(tok.error_description ?? tok.error ?? "no token")}</p><p><a href="/auth/login">Try again</a></p>`, [clearState]);
    const meRes = await fetchImpl("https://api.github.com/user", {
      headers: { authorization: `Bearer ${tok.access_token}`, accept: "application/vnd.github+json", "user-agent": "orbex-dashboard" }
    });
    const me = await meRes.json().catch(() => ({}));
    if (!me.login) return page(502, "Could not read your GitHub profile", '<p><a href="/auth/login">Try again</a></p>', [clearState]);
    const u = { provider: "github", id: String(me.id), login: me.login, name: me.name ?? null, avatar: me.avatar_url ?? null };
    if (!isAllowed(u)) {
      return page(403, "Not on the list", `<p>Signed in to GitHub as <b>${esc(u.login)}</b>, but this dashboard isn't shared with that account.</p>`, [clearState]);
    }
    const session = await sign({ user: u, exp: Date.now() + SESSION_DAYS * 864e5 }, config2.secret);
    return redirect(pending.next, [clearState, cookie(SESSION_COOKIE, session, SESSION_DAYS * 86400)]);
  }
  function logout() {
    return redirect("/auth/login?signed_out=1", [cookie(SESSION_COOKIE, "", 0)]);
  }
  async function handle(req) {
    const { pathname } = new URL(req.url);
    if (pathname === "/auth/login") {
      const url = new URL(req.url);
      if (url.searchParams.has("go")) return login(req);
      return loginPage(url);
    }
    if (pathname === "/auth/callback") return callback(req);
    if (pathname === "/auth/logout") return logout();
    return null;
  }
  return { kind: "github", user, handle };
}
var esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
function loginPage(url) {
  const next = safeNext(url.searchParams.get("next"));
  const out = url.searchParams.has("signed_out") ? '<p class="m">Signed out.</p>' : "";
  return page(200, "Sign in", `${out}<p><a class="b" href="/auth/login?go=1&amp;next=${encodeURIComponent(next)}">Sign in with GitHub</a></p>`);
}
function page(status, title, body, cookies = []) {
  const h = new Headers({ "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" });
  for (const c of cookies) h.append("set-cookie", c);
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.png" type="image/png"><title>${esc(title)}</title>
<style>:root{color-scheme:dark;--p:#120f15;--s:#1b1720;--i:#f4eff6;--m:#a39aa8;--b:#CF27E0;--w:#f2f2f2}@media (prefers-color-scheme:light){:root{color-scheme:light;--p:#f7f2f8;--s:#fdfbfd;--i:#120f15;--m:#6e6573;--w:#000}}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--p);color:var(--i);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{background:var(--s);border:1px solid rgb(128 128 128/.2);border-top:3px solid var(--b);border-radius:12px;padding:28px 32px;margin:16px;max-width:380px}
.logo{display:block;margin:0 0 20px}.logo .wordmark{fill:var(--w)}h1{font-size:1.3rem;margin:0 0 12px}.m{color:var(--m)}a{color:var(--i)}.b{display:inline-block;background:var(--b);color:#fff;text-decoration:none;font-weight:600;border-radius:999px;padding:9px 18px}</style></head>
<body><main>${LOGO_SVG}<h1>${esc(title)}</h1>${body}</main></body></html>`, { status, headers: h });
}

// server/snapshot.mjs
import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
var run = promisify(execFile);
async function produce({ root, scripts }, script, extra = []) {
  try {
    const { stdout } = await run(process.execPath, [path.join(scripts, script), "--json", ...extra], {
      cwd: root,
      env: { ...process.env, ORBEX_WORKSPACE: root },
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 6e4
    });
    return JSON.parse(stdout);
  } catch (e) {
    throw new Error(`${script}: ${(e.stderr || e.message || String(e)).trim()}`);
  }
}
function validate(next, index) {
  const missing = [];
  const need = (obj, name, key, type) => {
    const v = obj?.[key];
    if (type === "array" ? !Array.isArray(v) : v === void 0) missing.push(`${name}.${key}`);
  };
  need(next, "next", "projects", "array");
  need(next, "next", "backlog", "array");
  need(next, "next", "inbox", "array");
  need(next, "next", "memoryReview", "array");
  need(next, "next", "inboxError", "any");
  need(next, "next", "memoryReviewError", "any");
  need(index, "index", "projects", "array");
  need(index, "index", "problems", "array");
  if (missing.length) {
    throw new Error(`producer output changed \u2014 missing ${missing.join(", ")}. The installed orbex and orbex-dashboard disagree on the --json format; update one of them.`);
  }
}
async function buildSnapshotFromProducers(ws, { noGh = false } = {}) {
  const [next, index] = await Promise.all([
    produce(ws, "next.mjs", noGh ? ["--no-gh"] : []),
    produce(ws, "build-project-index.mjs")
  ]);
  validate(next, index);
  return { next, index };
}

// server/capture.mjs
var TITLE_MAX = 200;
var BODY_MAX = 1e4;
var CaptureError = class extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
};
function parseCapture(input) {
  if (!input || typeof input !== "object") throw new CaptureError("expected a JSON object with a title");
  const title = typeof input.title === "string" ? input.title.replace(/\s+/g, " ").trim() : "";
  const body = typeof input.body === "string" ? input.body.replace(/\r\n?/g, "\n").trim() : "";
  if (!title) throw new CaptureError("a title is required");
  if (title.length > TITLE_MAX) throw new CaptureError(`the title is over ${TITLE_MAX} characters \u2014 put the rest in the notes`);
  if (body.length > BODY_MAX) throw new CaptureError(`the notes are over ${BODY_MAX} characters`);
  return { title, body };
}
function slugify(title) {
  const s = title.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50).replace(/-+$/, "");
  return s || "capture";
}
function captureFilename(title, now = /* @__PURE__ */ new Date(), attempt = 1) {
  const iso = now.toISOString();
  const stamp = `${iso.slice(0, 10)}T${iso.slice(11, 13)}${iso.slice(14, 16)}`;
  return `${stamp}-${slugify(title)}${attempt > 1 ? `-${attempt}` : ""}.md`;
}
function captureContent({ title, body }, now = /* @__PURE__ */ new Date()) {
  const captured = now.toISOString().replace(/\.\d{3}Z$/, "Z");
  return `---
captured: ${captured}
source: dashboard
---

# ${title}
${body ? `
${body}
` : ""}`;
}
function captureItem(name, { title, body }, now = /* @__PURE__ */ new Date()) {
  return {
    source: "file",
    file: `inbox/${name}`,
    title,
    titled: true,
    createdAt: now.toISOString().replace(/\.\d{3}Z$/, "Z"),
    body: body || null
  };
}

// server/handlers.mjs
var PLAN_FILE = /^projects\/[A-Za-z][A-Za-z0-9]*-\d+\/(plan|recommendation)\.md$/;
var WRITE_HEADER = "x-orbex-request";
var json = (status, body, headers = {}) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...headers } });
function normalise(snapshot) {
  if (snapshot?.next && snapshot.next.inboxFilesError === void 0) {
    snapshot.next.inboxFilesError = "this orbex doesn't read inbox/ yet \u2014 update orbex to see captures here";
  }
  return snapshot;
}
function createApi({ source, auth: auth2, cacheMs = 6e4 }) {
  let cache = null;
  let inflight = null;
  function snapshot(fresh) {
    if (!fresh && cache && Date.now() - cache.at < cacheMs) return Promise.resolve(cache.snapshot);
    inflight ??= source.snapshot().then((s) => {
      validate(s.next, s.index);
      normalise(s);
      cache = { at: Date.now(), snapshot: s };
      return s;
    }).finally(() => {
      inflight = null;
    });
    return inflight;
  }
  const routes = {
    "GET /api/session": async (_req, user) => json(200, {
      ok: true,
      user,
      auth: auth2.kind,
      source: source.kind,
      name: source.name,
      canCapture: typeof source.capture === "function"
    }),
    "GET /api/snapshot": async (req) => {
      try {
        const s = await snapshot(new URL(req.url).searchParams.has("fresh"));
        return json(200, { ok: true, snapshot: s });
      } catch (e) {
        return json(502, { ok: false, error: e.message });
      }
    },
    "GET /api/plan": async (req) => {
      const id = new URL(req.url).searchParams.get("id") ?? "";
      let s;
      try {
        s = await snapshot(false);
      } catch (e) {
        return json(502, { ok: false, error: e.message });
      }
      const p = s.index.projects.find((q) => q.id === id);
      if (!p) return json(404, { ok: false, error: `no project ${id}` });
      if (!PLAN_FILE.test(p.file)) return json(400, { ok: false, error: `unexpected plan path ${p.file}` });
      try {
        return json(200, { ok: true, id: p.id, file: p.file, text: await source.readText(p.file) });
      } catch (e) {
        return json(502, { ok: false, error: `could not read ${p.file}: ${e.message}` });
      }
    },
    "POST /api/inbox": async (req) => {
      if (typeof source.capture !== "function") return json(405, { ok: false, error: "this source is read-only" });
      if (req.headers.get(WRITE_HEADER) !== "1") return json(403, { ok: false, error: `missing ${WRITE_HEADER} header` });
      let entry;
      try {
        entry = parseCapture(await req.json().catch(() => {
          throw new CaptureError("the body is not JSON");
        }));
      } catch (e) {
        return json(e.status ?? 400, { ok: false, error: e.message });
      }
      try {
        const result = await source.capture(entry);
        cache = null;
        return json(201, { ok: true, ...result });
      } catch (e) {
        return json(e instanceof CaptureError ? e.status : 502, { ok: false, error: `capture failed: ${e.message}` });
      }
    }
  };
  return async function handle(req) {
    const { pathname } = new URL(req.url);
    if (!pathname.startsWith("/api/")) return null;
    const route = routes[`${req.method} ${pathname}`];
    if (!route) return json(404, { ok: false, error: `no route ${req.method} ${pathname}` });
    const user = await auth2.user(req);
    if (auth2.kind !== "none" && !user) return json(401, { ok: false, error: "not signed in" });
    return route(req, user);
  };
}

// server/sources/github.mjs
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path2 from "node:path";
var API = "https://api.github.com";
var PLAN_NAMES = ["plan.md", "recommendation.md"];
var BLOB = "... on Blob { text isBinary }";
var QUERY = `query($owner: String!, $name: String!, $ref: String!, $marker: String!, $backlog: String!, $projects: String!, $memory: String!, $inbox: String!) {
  repository(owner: $owner, name: $name) {
    ref(qualifiedName: $ref) { name target { oid } }
    marker: object(expression: $marker) { ${BLOB} }
    backlog: object(expression: $backlog) { ${BLOB} }
    projects: object(expression: $projects) { ... on Tree { entries { name type object { ... on Tree { entries { name type object { ${BLOB} } } } } } } }
    memory: object(expression: $memory) { ... on Tree { entries { name type object { ${BLOB} } } } }
    inbox: object(expression: $inbox) { ... on Tree { entries { name type object { ${BLOB} } } } }
  }
}`;
var GitHubError = class extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};
function githubConfig(env2) {
  const repo = env2.ORBEX_GITHUB_REPO ?? "";
  const m = repo.match(/^([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+)$/);
  if (!m) throw new Error("ORBEX_GITHUB_REPO must be owner/name");
  if (!env2.ORBEX_GITHUB_TOKEN) throw new Error("ORBEX_GITHUB_TOKEN is not set");
  const prefix = (env2.ORBEX_WORKSPACE_PATH ?? "").replace(/^\/+|\/+$/g, "");
  if (prefix.split("/").includes("..")) throw new Error("ORBEX_WORKSPACE_PATH may not contain ..");
  return { owner: m[1], name: m[2], token: env2.ORBEX_GITHUB_TOKEN, branch: env2.ORBEX_GITHUB_BRANCH || null, prefix: prefix ? `${prefix}/` : "" };
}
var GitHubSource = class {
  /**
   * @param {ReturnType<typeof githubConfig>} config
   * @param {{ orbexScripts: string, fetch?: typeof fetch, noGh?: boolean }} opts
   */
  constructor(config2, { orbexScripts: orbexScripts2, fetch: fetchImpl = fetch, noGh = false }) {
    this.config = config2;
    this.orbexScripts = orbexScripts2;
    this.fetch = fetchImpl;
    this.noGh = noGh;
    this.kind = "github";
    this.branch = config2.branch;
  }
  get name() {
    return this.config.prefix ? path2.basename(this.config.prefix) : this.config.name;
  }
  async api(pathname, init = {}) {
    const res = await this.fetch(`${API}${pathname}`, {
      ...init,
      headers: {
        authorization: `Bearer ${this.config.token}`,
        accept: "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
        "user-agent": "orbex-dashboard",
        ...init.headers
      }
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new GitHubError(`GitHub ${res.status} on ${init.method ?? "GET"} ${pathname.split("?")[0]}: ${body.message ?? res.statusText}`, res.status);
    }
    return res;
  }
  async resolveBranch() {
    if (!this.branch) {
      const repo = await (await this.api(`/repos/${this.config.owner}/${this.config.name}`)).json();
      this.branch = repo.default_branch;
    }
    return this.branch;
  }
  /** The producers' inputs as { relPath: text } plus the head commit. */
  async fetchInputs() {
    const branch = await this.resolveBranch();
    const p = this.config.prefix;
    const expr = (rel) => `refs/heads/${branch}:${p}${rel}`;
    const res = await this.api("/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          owner: this.config.owner,
          name: this.config.name,
          ref: `refs/heads/${branch}`,
          marker: expr(".orbex-workspace"),
          backlog: expr("BACKLOG.md"),
          projects: expr("projects"),
          memory: expr("context/memory"),
          inbox: expr("inbox")
        }
      })
    });
    const out = await res.json();
    if (out.errors?.length) throw new GitHubError(`GitHub GraphQL: ${out.errors.map((e) => e.message).join("; ")}`, 502);
    const r = out.data?.repository;
    if (!r) throw new GitHubError(`repository ${this.config.owner}/${this.config.name} not found, or the token can't read it`, 404);
    if (!r.ref) throw new GitHubError(`branch ${branch} not found`, 404);
    if (!r.marker?.text) throw new GitHubError(`${p}.orbex-workspace not found on ${branch} \u2014 is ORBEX_WORKSPACE_PATH right?`, 404);
    const files = { ".orbex-workspace": r.marker.text };
    if (r.backlog?.text != null) files["BACKLOG.md"] = r.backlog.text;
    for (const dir of r.projects?.entries ?? []) {
      if (dir.type !== "tree") continue;
      for (const f of dir.object?.entries ?? []) {
        if (PLAN_NAMES.includes(f.name) && f.object?.text != null) files[`projects/${dir.name}/${f.name}`] = f.object.text;
      }
    }
    const dirs = [];
    if (r.memory) dirs.push("context/memory");
    for (const f of r.memory?.entries ?? []) {
      if (f.type === "blob" && f.name.endsWith(".md") && f.object?.text != null) files[`context/memory/${f.name}`] = f.object.text;
    }
    if (r.inbox) dirs.push("inbox");
    for (const f of r.inbox?.entries ?? []) {
      if (f.type === "blob" && f.name.endsWith(".md") && f.object?.text != null) files[`inbox/${f.name}`] = f.object.text;
    }
    return { files, dirs, branch, oid: r.ref.target.oid };
  }
  /** Open issues as next.mjs lists them (every open issue; the label is a hint). */
  async issues() {
    if (this.noGh) return { items: [], error: "skipped (--no-gh)" };
    try {
      const res = await this.api(`/repos/${this.config.owner}/${this.config.name}/issues?state=open&per_page=100`);
      const raw = await res.json();
      return {
        items: raw.filter((i) => !i.pull_request).map((i) => {
          const labels = (i.labels ?? []).map((l) => typeof l === "string" ? l : l.name);
          return { source: "issue", number: i.number, title: i.title, createdAt: i.created_at, url: i.html_url, labels, labelled: labels.includes("inbox") };
        }),
        error: null
      };
    } catch (e) {
      return { items: [], error: `could not read GitHub Issues: ${e.message}` };
    }
  }
  async snapshot() {
    const [inputs, issues] = await Promise.all([this.fetchInputs(), this.issues()]);
    const dir = await mkdtemp(path2.join(tmpdir(), "orbex-mirror-"));
    try {
      for (const d of inputs.dirs) await mkdir(path2.join(dir, d), { recursive: true });
      for (const [rel, text] of Object.entries(inputs.files)) {
        await mkdir(path2.dirname(path2.join(dir, rel)), { recursive: true });
        await writeFile(path2.join(dir, rel), text);
      }
      const { next, index } = await buildSnapshotFromProducers({ root: dir, scripts: this.orbexScripts }, { noGh: true });
      const files = next.inbox.filter((i) => i.source === "file");
      next.inbox = [...files, ...issues.items];
      next.inboxError = issues.error;
      const { owner, name, prefix } = this.config;
      return {
        name: this.name,
        source: "github",
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        noGh: this.noGh,
        git: {
          sha: inputs.oid.slice(0, 7),
          dirty: false,
          githubBase: `https://github.com/${owner}/${name}/blob/${encodeURIComponent(inputs.branch)}/${prefix}`,
          upstream: inputs.branch,
          behind: null,
          ahead: null,
          error: null
        },
        next,
        index
      };
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }
  async readText(rel) {
    const branch = await this.resolveBranch();
    const p = `${this.config.prefix}${rel}`.split("/").map(encodeURIComponent).join("/");
    const res = await this.api(`/repos/${this.config.owner}/${this.config.name}/contents/${p}?ref=${encodeURIComponent(branch)}`, {
      headers: { accept: "application/vnd.github.raw+json" }
    });
    return res.text();
  }
  async capture(entry, now = /* @__PURE__ */ new Date()) {
    const branch = await this.resolveBranch();
    const content = captureContent(entry, now);
    const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(content)));
    for (let attempt = 1; attempt <= 5; attempt++) {
      const name = captureFilename(entry.title, now, attempt);
      const p = `${this.config.prefix}inbox/${name}`.split("/").map(encodeURIComponent).join("/");
      try {
        const res = await this.api(`/repos/${this.config.owner}/${this.config.name}/contents/${p}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          // No `sha`: GitHub then refuses (422) rather than overwrite an existing file.
          body: JSON.stringify({ message: `inbox: ${entry.title}`, content: b64, branch })
        });
        const out = await res.json();
        return { item: captureItem(name, entry, now), committed: true, commit: out.commit?.sha ?? null };
      } catch (e) {
        if (e.status === 422) continue;
        throw e;
      }
    }
    throw new Error("could not find a free filename in inbox/");
  }
};

// netlify/lib.mjs
var env = () => globalThis.Netlify?.env?.toObject?.() ?? process.env;
function orbexScripts() {
  const here = path3.dirname(fileURLToPath(import.meta.url));
  const candidates = [process.env.LAMBDA_TASK_ROOT, process.cwd(), path3.resolve(here, ".."), path3.resolve(here, "../.."), path3.resolve(here, "../../..")].filter(Boolean).map((d) => path3.join(d, "vendor", "orbex", "scripts"));
  const hit = candidates.find((d) => existsSync(path3.join(d, "next.mjs")));
  if (!hit) throw new Error(`vendored orbex not found (looked in ${candidates.join(", ")}) \u2014 did the build run scripts/fetch-orbex.mjs?`);
  return hit;
}
var auth;
function getAuth() {
  auth ??= githubAuth(authConfig(env()));
  return auth;
}
var api;
function getApi() {
  api ??= createApi({
    source: new GitHubSource(githubConfig(env()), { orbexScripts: orbexScripts() }),
    auth: getAuth()
  });
  return api;
}
function configError(e) {
  console.error(`orbex-dashboard: ${e.message}`);
  return new Response(JSON.stringify({ ok: false, error: "the dashboard is not configured \u2014 see the function log" }), {
    status: 500,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
}

// netlify/functions/api.mjs
var api_default = async (req) => {
  let api2;
  try {
    api2 = getApi();
  } catch (e) {
    return configError(e);
  }
  return await api2(normalise2(req)) ?? new Response("not found", { status: 404 });
};
function normalise2(req) {
  const url = new URL(req.url);
  if (!/\/index\.html?$/.test(url.pathname)) return req;
  url.pathname = url.pathname.replace(/\/index\.html?$/, "");
  return new Request(url, req);
}
var config = { path: "/api/*" };
export {
  config,
  api_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9saWIubWpzIiwgInNlcnZlci9sb2dvLm1qcyIsICJzZXJ2ZXIvYXV0aC5tanMiLCAic2VydmVyL3NuYXBzaG90Lm1qcyIsICJzZXJ2ZXIvY2FwdHVyZS5tanMiLCAic2VydmVyL2hhbmRsZXJzLm1qcyIsICJzZXJ2ZXIvc291cmNlcy9naXRodWIubWpzIiwgIm5ldGxpZnkvZnVuY3Rpb25zL2FwaS5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFNoYXJlZCB3aXJpbmcgZm9yIHRoZSBOZXRsaWZ5IEZ1bmN0aW9uczogYnVpbGQgdGhlIHNvdXJjZSBhbmQgYXV0aCBvbmNlIHBlciB3YXJtIGluc3RhbmNlLFxuLy8gZnJvbSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgb25seSBcdTIwMTQgbm90aGluZyBwZXJzb25hbCBsaXZlcyBpbiB0aGlzIHB1YmxpYyByZXBvLlxuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBhdXRoQ29uZmlnLCBnaXRodWJBdXRoIH0gZnJvbSAnLi4vc2VydmVyL2F1dGgubWpzJztcbmltcG9ydCB7IGNyZWF0ZUFwaSB9IGZyb20gJy4uL3NlcnZlci9oYW5kbGVycy5tanMnO1xuaW1wb3J0IHsgR2l0SHViU291cmNlLCBnaXRodWJDb25maWcgfSBmcm9tICcuLi9zZXJ2ZXIvc291cmNlcy9naXRodWIubWpzJztcblxuY29uc3QgZW52ID0gKCkgPT4gKGdsb2JhbFRoaXMuTmV0bGlmeT8uZW52Py50b09iamVjdD8uKCkgPz8gcHJvY2Vzcy5lbnYpO1xuXG4vKiogdmVuZG9yL29yYmV4L3NjcmlwdHMsIHdoZXJldmVyIHRoZSBidW5kbGVyIHB1dCBpdCAoaW5jbHVkZWRfZmlsZXMga2VlcHMgaXQgcmVsYXRpdmUgdG8gdGhlIGJhc2UpLiAqL1xuZnVuY3Rpb24gb3JiZXhTY3JpcHRzKCkge1xuICBjb25zdCBoZXJlID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG4gIGNvbnN0IGNhbmRpZGF0ZXMgPSBbcHJvY2Vzcy5lbnYuTEFNQkRBX1RBU0tfUk9PVCwgcHJvY2Vzcy5jd2QoKSwgcGF0aC5yZXNvbHZlKGhlcmUsICcuLicpLCBwYXRoLnJlc29sdmUoaGVyZSwgJy4uLy4uJyksIHBhdGgucmVzb2x2ZShoZXJlLCAnLi4vLi4vLi4nKV1cbiAgICAuZmlsdGVyKEJvb2xlYW4pLm1hcCgoZCkgPT4gcGF0aC5qb2luKGQsICd2ZW5kb3InLCAnb3JiZXgnLCAnc2NyaXB0cycpKTtcbiAgY29uc3QgaGl0ID0gY2FuZGlkYXRlcy5maW5kKChkKSA9PiBleGlzdHNTeW5jKHBhdGguam9pbihkLCAnbmV4dC5tanMnKSkpO1xuICBpZiAoIWhpdCkgdGhyb3cgbmV3IEVycm9yKGB2ZW5kb3JlZCBvcmJleCBub3QgZm91bmQgKGxvb2tlZCBpbiAke2NhbmRpZGF0ZXMuam9pbignLCAnKX0pIFx1MjAxNCBkaWQgdGhlIGJ1aWxkIHJ1biBzY3JpcHRzL2ZldGNoLW9yYmV4Lm1qcz9gKTtcbiAgcmV0dXJuIGhpdDtcbn1cblxubGV0IGF1dGg7XG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aCgpIHtcbiAgYXV0aCA/Pz0gZ2l0aHViQXV0aChhdXRoQ29uZmlnKGVudigpKSk7XG4gIHJldHVybiBhdXRoO1xufVxuXG5sZXQgYXBpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFwaSgpIHtcbiAgYXBpID8/PSBjcmVhdGVBcGkoe1xuICAgIHNvdXJjZTogbmV3IEdpdEh1YlNvdXJjZShnaXRodWJDb25maWcoZW52KCkpLCB7IG9yYmV4U2NyaXB0czogb3JiZXhTY3JpcHRzKCkgfSksXG4gICAgYXV0aDogZ2V0QXV0aCgpLFxuICB9KTtcbiAgcmV0dXJuIGFwaTtcbn1cblxuLyoqIE1pc2NvbmZpZ3VyYXRpb24gbXVzdCByZWZ1c2UsIGxvdWRseSBhbmQgd2l0aG91dCBkZXRhaWwgbGVha2luZyB0byBhbiBhbm9ueW1vdXMgY2FsbGVyLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0Vycm9yKGUpIHtcbiAgY29uc29sZS5lcnJvcihgb3JiZXgtZGFzaGJvYXJkOiAke2UubWVzc2FnZX1gKTtcbiAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IG9rOiBmYWxzZSwgZXJyb3I6ICd0aGUgZGFzaGJvYXJkIGlzIG5vdCBjb25maWd1cmVkIFx1MjAxNCBzZWUgdGhlIGZ1bmN0aW9uIGxvZycgfSksIHtcbiAgICBzdGF0dXM6IDUwMCwgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCAnY2FjaGUtY29udHJvbCc6ICduby1zdG9yZScgfSxcbiAgfSk7XG59XG4iLCAiLy8gVGhlIE9yYmV4IGxvZ28gZm9yIHRoZSBzaWduLWluIHBhZ2UgKHNlcnZlci9hdXRoLm1qcykuIFRoYXQgcGFnZSBpcyBzZXJ2ZWQgYnkgdGhlIGVkZ2UgZ2F0ZSxcbi8vIGJlZm9yZSBzaWduLWluLCBzbyBpdCBjYW5ub3QgbG9hZCB0aGUgZ2F0ZWQgYnVuZGxlIFx1MjAxNCB0aGUgU1ZHIGlzIGlubGluZWQgaGVyZSBhcyBhIHN0cmluZy5cbi8vIEdlbmVyYXRlZCBmcm9tIHNyYy9vcmJleC1sb2dvLnN2ZyAodGhlIHdvcmRtYXJrIGZpbGwgaGFuZGVkIHRvIENTUyBzbyBlYWNoIHRoZW1lIHNldHMgdGhlIGluayk7XG4vLyB0ZXN0L2hvc3RlZC50ZXN0LnRzIGZhaWxzIGlmIHRoZSB0d28gZHJpZnQgYXBhcnQuXG5leHBvcnQgY29uc3QgTE9HT19TVkcgPSBcIjxzdmcgY2xhc3M9XFxcImxvZ29cXFwiIHJvbGU9XFxcImltZ1xcXCIgYXJpYS1sYWJlbD1cXFwiT3JiZXhcXFwiIHdpZHRoPVxcXCIxNzFcXFwiIGhlaWdodD1cXFwiNThcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgdmlld0JveD1cXFwiMCAwIDE1MjIgNTEyXFxcIiBmaWxsPVxcXCJub25lXFxcIj5cXG4gIDxjaXJjbGUgY3g9XFxcIjI1NlxcXCIgY3k9XFxcIjI1NlxcXCIgcj1cXFwiMjM4XFxcIiBmaWxsPVxcXCIjQ0YyN0UwXFxcIi8+XFxuICA8cGF0aCBkPVxcXCJNIDQwOCAxOTYgQSAxNjAgMTYwIDAgMCAwIDEwNCAxOTYgTCA0MDggMzE2IEEgMTYwIDE2MCAwIDAgMSAxMDQgMzE2IEwgNDA4IDE5NiBaXFxcIiBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiNmZmZmZmZcXFwiIHN0cm9rZS13aWR0aD1cXFwiNDZcXFwiIHN0cm9rZS1saW5lY2FwPVxcXCJidXR0XFxcIiBzdHJva2UtbGluZWpvaW49XFxcIm1pdGVyXFxcIiBzdHJva2UtbWl0ZXJsaW1pdD1cXFwiMTBcXFwiLz5cXG4gIDxwYXRoIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDU1Ni42MyAzNzkuOTYpIHNjYWxlKDAuNTkwMjgpXFxcIiBkPVxcXCJNMTk4LjYwIDZMMTk4LjYwIDZRMTQ4LjgwIDYgMTE0LTExLjcwUTc5LjIwLTI5LjQwIDYwLjYwLTY2LjMwUTQyLTEwMy4yMCA0MC4yMC0xNTkuNjBMNDAuMjAtMTU5LjYwUTM5LjYwLTE4Ni42MCAzOS42MC0yMTBRMzkuNjAtMjMzLjQwIDQwLjIwLTI2MC40MEw0MC4yMC0yNjAuNDBRNDItMzE2LjIwIDYxLjgwLTM1My4xMFE4MS42MC0zOTAgMTE2LjcwLTQwOFExNTEuODAtNDI2IDE5OC42MC00MjZMMTk4LjYwLTQyNlEyNDUuNDAtNDI2IDI4MC41MC00MDhRMzE1LjYwLTM5MCAzMzUuNzAtMzUzLjEwUTM1NS44MC0zMTYuMjAgMzU3LTI2MC40MEwzNTctMjYwLjQwUTM1OC4yMC0yMzMuNDAgMzU4LjIwLTIxMFEzNTguMjAtMTg2LjYwIDM1Ny0xNTkuNjBMMzU3LTE1OS42MFEzNTUuODAtMTAzLjIwIDMzNi45MC02Ni4zMFEzMTgtMjkuNDAgMjgzLjIwLTExLjcwUTI0OC40MCA2IDE5OC42MCA2Wk0xOTguNjAtMzBMMTk4LjYwLTMwUTI1MC4yMC0zMCAyODMuNTAtNjEuMjBRMzE2LjgwLTkyLjQwIDMxOS4yMC0xNjIuNjBMMzE5LjIwLTE2Mi42MFEzMjAuNDAtMTg5LjYwIDMyMC40MC0yMTBRMzIwLjQwLTIzMC40MCAzMTkuMjAtMjU3LjQwTDMxOS4yMC0yNTcuNDBRMzE4LTMwNC4yMCAzMDIuMTAtMzMzLjYwUTI4Ni4yMC0zNjMgMjU5LjUwLTM3Ni41MFEyMzIuODAtMzkwIDE5OC42MC0zOTBMMTk4LjYwLTM5MFExNjUtMzkwIDEzOC4zMC0zNzYuNTBRMTExLjYwLTM2MyA5NS43MC0zMzMuNjBRNzkuODAtMzA0LjIwIDc4LTI1Ny40MEw3OC0yNTcuNDBRNzcuNDAtMjMwLjQwIDc3LjQwLTIxMFE3Ny40MC0xODkuNjAgNzgtMTYyLjYwTDc4LTE2Mi42MFE4MC40MC05Mi40MCAxMTQtNjEuMjBRMTQ3LjYwLTMwIDE5OC42MC0zMFpNNDc3LjMwIDBMNDY3LjcwIDBRNDYxLjcwIDAgNDU4LjEwLTMuNjBRNDU0LjUwLTcuMjAgNDU0LjUwLTEzLjIwTDQ1NC41MC0xMy4yMEw0NTQuNTAtMjk4LjIwUTQ1NC41MC0zMDQuMjAgNDU4LjEwLTMwOC4xMFE0NjEuNzAtMzEyIDQ2Ny43MC0zMTJMNDY3LjcwLTMxMkw0NzcuMzAtMzEyUTQ4My4zMC0zMTIgNDg3LjIwLTMwOC4xMFE0OTEuMTAtMzA0LjIwIDQ5MS4xMC0yOTguMjBMNDkxLjEwLTI5OC4yMEw0OTEuMTAtMjcwLjYwUTUwMS45MC0yOTEuNjAgNTIyLjMwLTMwMS44MFE1NDIuNzAtMzEyIDU3Mi43MC0zMTJMNTcyLjcwLTMxMkw1OTQuOTAtMzEyUTYwMC45MC0zMTIgNjA0LjUwLTMwOC40MFE2MDguMTAtMzA0LjgwIDYwOC4xMC0yOTguODBMNjA4LjEwLTI5OC44MEw2MDguMTAtMjkwLjQwUTYwOC4xMC0yODQuNDAgNjA0LjUwLTI4MC44MFE2MDAuOTAtMjc3LjIwIDU5NC45MC0yNzcuMjBMNTk0LjkwLTI3Ny4yMEw1NjkuMTAtMjc3LjIwUTUzMy4xMC0yNzcuMjAgNTEyLjEwLTI1Ni4yMFE0OTEuMTAtMjM1LjIwIDQ5MS4xMC0xOTkuMjBMNDkxLjEwLTE5OS4yMEw0OTEuMTAtMTMuMjBRNDkxLjEwLTcuMjAgNDg3LjIwLTMuNjBRNDgzLjMwIDAgNDc3LjMwIDBMNDc3LjMwIDBaTTgwOS45OSA2TDgwOS45OSA2UTc3Mi43OSA2IDc0OC40OS03LjUwUTcyNC4xOS0yMSA3MDkuMTktNDEuNDBMNzA5LjE5LTQxLjQwTDcwOS4xOS0xMy4yMFE3MDkuMTktNy4yMCA3MDUuNTktMy42MFE3MDEuOTkgMCA2OTUuOTkgMEw2OTUuOTkgMEw2ODUuNzkgMFE2NzkuNzkgMCA2NzYuMTktMy42MFE2NzIuNTktNy4yMCA2NzIuNTktMTMuMjBMNjcyLjU5LTEzLjIwTDY3Mi41OS00MTIuODBRNjcyLjU5LTQxOC44MCA2NzYuMTktNDIyLjQwUTY3OS43OS00MjYgNjg1Ljc5LTQyNkw2ODUuNzktNDI2TDY5NS45OS00MjZRNzAxLjk5LTQyNiA3MDUuNTktNDIyLjQwUTcwOS4xOS00MTguODAgNzA5LjE5LTQxMi44MEw3MDkuMTktNDEyLjgwTDcwOS4xOS0yNzAuNjBRNzI0LjE5LTI5MC40MCA3NDguNDktMzA0LjIwUTc3Mi43OS0zMTggODA5Ljk5LTMxOEw4MDkuOTktMzE4UTg0NS4zOS0zMTggODY5LjM5LTMwNS40MFE4OTMuMzktMjkyLjgwIDkwOC4zOS0yNzEuODBROTIzLjM5LTI1MC44MCA5MzAuNTktMjI1UTkzNy43OS0xOTkuMjAgOTM4LjM5LTE3Mi44MEw5MzguMzktMTcyLjgwUTkzOC45OS0xNjMuODAgOTM4Ljk5LTE1NlE5MzguOTktMTQ4LjIwIDkzOC4zOS0xMzkuMjBMOTM4LjM5LTEzOS4yMFE5MzcuNzktMTEyLjgwIDkzMC41OS04N1E5MjMuMzktNjEuMjAgOTA4LjM5LTQwLjIwUTg5My4zOS0xOS4yMCA4NjkuMzktNi42MFE4NDUuMzkgNiA4MDkuOTkgNlpNODA2LjM5LTI4LjgwTDgwNi4zOS0yOC44MFE4NDEuNzktMjguODAgODYyLjE5LTQ0LjQwUTg4Mi41OS02MCA4OTEuNTktODUuMjBROTAwLjU5LTExMC40MCA5MDEuNzktMTM5LjIwTDkwMS43OS0xMzkuMjBROTAyLjM5LTE1NiA5MDEuNzktMTcyLjgwTDkwMS43OS0xNzIuODBROTAwLjU5LTIwMS42MCA4OTEuNTktMjI2LjgwUTg4Mi41OS0yNTIgODYyLjE5LTI2Ny42MFE4NDEuNzktMjgzLjIwIDgwNi4zOS0yODMuMjBMODA2LjM5LTI4My4yMFE3NzMuMzktMjgzLjIwIDc1Mi4wOS0yNjcuNjBRNzMwLjc5LTI1MiA3MjAuMjktMjI4LjYwUTcwOS43OS0yMDUuMjAgNzA5LjE5LTE4MS4yMEw3MDkuMTktMTgxLjIwUTcwOC41OS0xNzIuMjAgNzA4LjU5LTE1Ny44MFE3MDguNTktMTQzLjQwIDcwOS4xOS0xMzQuNDBMNzA5LjE5LTEzNC40MFE3MTAuMzktMTA5LjgwIDcyMC4yOS04NS41MFE3MzAuMTktNjEuMjAgNzUxLjE5LTQ1UTc3Mi4xOS0yOC44MCA4MDYuMzktMjguODBaTTExNDQuNDkgNkwxMTQ0LjQ5IDZRMTA4Ni4yOSA2IDEwNTIuMDktMzIuMTBRMTAxNy44OS03MC4yMCAxMDEzLjA5LTEzMkwxMDEzLjA5LTEzMlExMDEyLjQ5LTE0MSAxMDEyLjQ5LTE1NlExMDEyLjQ5LTE3MSAxMDEzLjA5LTE4MEwxMDEzLjA5LTE4MFExMDE2LjA5LTIyMC44MCAxMDMyLjI5LTI1MlExMDQ4LjQ5LTI4My4yMCAxMDc2Ljk5LTMwMC42MFExMTA1LjQ5LTMxOCAxMTQ0LjQ5LTMxOEwxMTQ0LjQ5LTMxOFExMTg2LjQ5LTMxOCAxMjE1Ljg5LTI5OS40MFExMjQ1LjI5LTI4MC44MCAxMjYxLjE5LTI0NlExMjc3LjA5LTIxMS4yMCAxMjc3LjA5LTE2My4yMEwxMjc3LjA5LTE2My4yMEwxMjc3LjA5LTE1NC4yMFExMjc3LjA5LTE0OC4yMCAxMjczLjE5LTE0NC42MFExMjY5LjI5LTE0MSAxMjYzLjI5LTE0MUwxMjYzLjI5LTE0MUwxMDQ5LjY5LTE0MVExMDQ5LjY5LTE0MSAxMDQ5LjY5LTEzOC42MFExMDQ5LjY5LTEzNi4yMCAxMDQ5LjY5LTEzNUwxMDQ5LjY5LTEzNVExMDUwLjg5LTEwOCAxMDYyLjI5LTgzLjcwUTEwNzMuNjktNTkuNDAgMTA5NC42OS00NC4xMFExMTE1LjY5LTI4LjgwIDExNDQuNDktMjguODBMMTE0NC40OS0yOC44MFExMTcwLjI5LTI4LjgwIDExODcuMzktMzYuNjBRMTIwNC40OS00NC40MCAxMjE0LjY5LTUzLjcwUTEyMjQuODktNjMgMTIyNy44OS02Ny44MEwxMjI3Ljg5LTY3LjgwUTEyMzMuMjktNzUuNjAgMTIzNi4yOS03Ny4xMFExMjM5LjI5LTc4LjYwIDEyNDUuODktNzguNjBMMTI0NS44OS03OC42MEwxMjU1LjQ5LTc4LjYwUTEyNjAuODktNzguNjAgMTI2NC43OS03NS4zMFExMjY4LjY5LTcyIDEyNjguMDktNjYuNjBMMTI2OC4wOS02Ni42MFExMjY3LjQ5LTU4LjIwIDEyNTguNzktNDUuOTBRMTI1MC4wOS0zMy42MCAxMjM0LjE5LTIxLjYwUTEyMTguMjktOS42MCAxMTk1LjQ5LTEuODBRMTE3Mi42OSA2IDExNDQuNDkgNlpNMTA0OS42OS0xNzdMMTA0OS42OS0xNzQuNjBMMTI0MC40OS0xNzQuNjBMMTI0MC40OS0xNzdRMTI0MC40OS0yMDcgMTIyOS4wOS0yMzFRMTIxNy42OS0yNTUgMTE5Ni4wOS0yNjkuMTBRMTE3NC40OS0yODMuMjAgMTE0NC40OS0yODMuMjBMMTE0NC40OS0yODMuMjBRMTExNC40OS0yODMuMjAgMTA5My4xOS0yNjkuMTBRMTA3MS44OS0yNTUgMTA2MC43OS0yMzFRMTA0OS42OS0yMDcgMTA0OS42OS0xNzdMMTA0OS42OS0xNzdaTTEzNjEuMzggMEwxMzQ5LjM4IDBRMTM0NC41OCAwIDEzNDAuOTgtMy42MFExMzM3LjM4LTcuMjAgMTMzNy4zOC0xMkwxMzM3LjM4LTEyUTEzMzcuMzgtMTQuNDAgMTMzOC4yOC0xNy4xMFExMzM5LjE4LTE5LjgwIDEzNDIuMTgtMjRMMTM0Mi4xOC0yNEwxNDQ3Ljc4LTE1OS42MEwxMzQ3LjU4LTI4OFExMzQ0LjU4LTI5Mi4yMCAxMzQzLjY4LTI5NC45MFExMzQyLjc4LTI5Ny42MCAxMzQyLjc4LTMwMEwxMzQyLjc4LTMwMFExMzQyLjc4LTMwNC44MCAxMzQ2LjM4LTMwOC40MFExMzQ5Ljk4LTMxMiAxMzU0Ljc4LTMxMkwxMzU0Ljc4LTMxMkwxMzY3LjM4LTMxMlExMzczLjM4LTMxMiAxMzc2LjY4LTMwOVExMzc5Ljk4LTMwNiAxMzgyLjM4LTMwM0wxMzgyLjM4LTMwM0wxNDcyLjM4LTE4Ny4yMEwxNTYyLjM4LTMwMi40MFExNTY1LjM4LTMwNS40MCAxNTY4LjM4LTMwOC43MFExNTcxLjM4LTMxMiAxNTc3LjM4LTMxMkwxNTc3LjM4LTMxMkwxNTg5LjM4LTMxMlExNTk0LjE4LTMxMiAxNTk3Ljc4LTMwOC40MFExNjAxLjM4LTMwNC44MCAxNjAxLjM4LTMwMEwxNjAxLjM4LTMwMFExNjAxLjM4LTI5Ny42MCAxNjAwLjQ4LTI5NC45MFExNTk5LjU4LTI5Mi4yMCAxNTk2LjU4LTI4OEwxNTk2LjU4LTI4OEwxNDk1LjE4LTE1Ny44MEwxNjAwLjc4LTI0UTE2MDMuNzgtMTkuODAgMTYwNC42OC0xNy4xMFExNjA1LjU4LTE0LjQwIDE2MDUuNTgtMTJMMTYwNS41OC0xMlExNjA1LjU4LTcuMjAgMTYwMS45OC0zLjYwUTE1OTguMzggMCAxNTkzLjU4IDBMMTU5My41OCAwTDE1ODAuOTggMFExNTc0Ljk4IDAgMTU3MS42OC0zUTE1NjguMzgtNiAxNTY1Ljk4LTlMMTU2NS45OC05TDE0NzEuMTgtMTMwLjIwTDEzNzYuMzgtOVExMzczLjk4LTYgMTM3MC42OC0zUTEzNjcuMzggMCAxMzYxLjM4IDBMMTM2MS4zOCAwWlxcXCIgY2xhc3M9XFxcIndvcmRtYXJrXFxcIi8+XFxuPC9zdmc+XCI7XG4iLCAiLy8gU2lnbi1pbiBmb3IgdGhlIGhvc3RlZCBkYXNoYm9hcmQgKE9SQkktOTIpOiBHaXRIdWIgT0F1dGgsIGNoZWNrZWQgYWdhaW5zdCBhbiBhbGxvd2xpc3QuXG4vL1xuLy8gV2ViIEFQSXMgb25seSAoZmV0Y2gsIGNyeXB0by5zdWJ0bGUsIFJlcXVlc3QvUmVzcG9uc2UpLCBzbyB0aGUgU0FNRSBtb2R1bGUgcnVucyBpbiB0aGUgTmV0bGlmeVxuLy8gRWRnZSBGdW5jdGlvbiB0aGF0IGdhdGVzIGV2ZXJ5IHBhdGggKERlbm8pIGFuZCBpbiB0aGUgQVBJIEZ1bmN0aW9uIGJlaGluZCBpdCAoTm9kZSkuXG4vL1xuLy8gT25lIHVzZXIgdG9kYXksIG1vcmUgbGF0ZXIgd2l0aG91dCBhIHJld3JpdGU6XG4vLyAgIC0gYSBzZXNzaW9uIGNhcnJpZXMgYW4gaWRlbnRpdHkgeyBwcm92aWRlciwgaWQsIGxvZ2luLCBcdTIwMjYgfSwgbmV2ZXIganVzdCBcInNpZ25lZCBpbiA9IHRydWVcIixcbi8vICAgICBzbyBwZXItdXNlciBhdXRob3JpemF0aW9uIGxhdGVyIGhhcyBhIHN1YmplY3QgdG8gaGFuZyBvZmY7XG4vLyAgIC0gdGhlIGFsbG93bGlzdCBpcyByZS1jaGVja2VkIG9uIEVWRVJZIHJlcXVlc3QsIG5vdCBvbmx5IGF0IHNpZ24taW4sIHNvIHJlbW92aW5nIHNvbWVvbmUgZnJvbVxuLy8gICAgIE9SQkVYX0FMTE9XRURfVVNFUlMgcmV2b2tlcyB0aGVtIGF0IG9uY2UgaW5zdGVhZCBvZiB3aGVuIHRoZWlyIGNvb2tpZSBleHBpcmVzO1xuLy8gICAtIGFkZGluZyBhIHNlY29uZCB1c2VyIGlzIGFkZGluZyBhIGxvZ2luIHRvIHRoYXQgdmFyaWFibGUuXG4vL1xuLy8gVGhlIHVzZXIncyBHaXRIdWIgdG9rZW4gaXMgdXNlZCBvbmNlLCB0byBsZWFybiB3aG8gdGhleSBhcmUsIGFuZCB0aGVuIGRyb3BwZWQuIFJlYWRpbmcgdGhlXG4vLyB3b3Jrc3BhY2UgdXNlcyBhIHNlcGFyYXRlIHNlcnZlci1zaWRlIHRva2VuIChPUkJFWF9HSVRIVUJfVE9LRU4pIHRoZSBicm93c2VyIG5ldmVyIHNlZXMuXG5cbmltcG9ydCB7IExPR09fU1ZHIH0gZnJvbSAnLi9sb2dvLm1qcyc7XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OX0NPT0tJRSA9ICdvcmJleF9zZXNzaW9uJztcbmNvbnN0IFNUQVRFX0NPT0tJRSA9ICdvcmJleF9vYXV0aCc7XG5jb25zdCBTRVNTSU9OX0RBWVMgPSAzMDtcbmNvbnN0IFNUQVRFX01JTlVURVMgPSAxMDtcblxuY29uc3QgZW5jID0gbmV3IFRleHRFbmNvZGVyKCk7XG5jb25zdCBiNjR1cmwgPSAoYnl0ZXMpID0+IGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZSguLi5uZXcgVWludDhBcnJheShieXRlcykpKS5yZXBsYWNlKC9cXCsvZywgJy0nKS5yZXBsYWNlKC9cXC8vZywgJ18nKS5yZXBsYWNlKC89KyQvLCAnJyk7XG5jb25zdCB1bmI2NHVybCA9IChzKSA9PiBVaW50OEFycmF5LmZyb20oYXRvYihzLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJykgKyAnPT09Jy5zbGljZSgocy5sZW5ndGggKyAzKSAlIDQpKSwgKGMpID0+IGMuY2hhckNvZGVBdCgwKSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGhtYWNLZXkoc2VjcmV0KSB7XG4gIHJldHVybiBjcnlwdG8uc3VidGxlLmltcG9ydEtleSgncmF3JywgZW5jLmVuY29kZShzZWNyZXQpLCB7IG5hbWU6ICdITUFDJywgaGFzaDogJ1NIQS0yNTYnIH0sIGZhbHNlLCBbJ3NpZ24nLCAndmVyaWZ5J10pO1xufVxuXG4vKiogYHBheWxvYWQuc2lnbmF0dXJlYCwgYm90aCBiYXNlNjR1cmwuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2lnbih2YWx1ZSwgc2VjcmV0KSB7XG4gIGNvbnN0IGJvZHkgPSBiNjR1cmwoZW5jLmVuY29kZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpKTtcbiAgY29uc3Qgc2lnID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5zaWduKCdITUFDJywgYXdhaXQgaG1hY0tleShzZWNyZXQpLCBlbmMuZW5jb2RlKGJvZHkpKTtcbiAgcmV0dXJuIGAke2JvZHl9LiR7YjY0dXJsKHNpZyl9YDtcbn1cblxuLyoqIFRoZSB2YWx1ZSwgb3IgbnVsbCBpZiB0YW1wZXJlZCwgbWFsZm9ybWVkIG9yIGV4cGlyZWQgKGBleHBgLCBtcyBzaW5jZSBlcG9jaCkuIENvbnN0YW50LXRpbWUgdmlhIHN1YnRsZS52ZXJpZnkuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5zaWduKHRva2VuLCBzZWNyZXQsIG5vdyA9IERhdGUubm93KCkpIHtcbiAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycpIHJldHVybiBudWxsO1xuICBjb25zdCBbYm9keSwgc2lnLCBleHRyYV0gPSB0b2tlbi5zcGxpdCgnLicpO1xuICBpZiAoIWJvZHkgfHwgIXNpZyB8fCBleHRyYSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCBvayA9IGF3YWl0IGNyeXB0by5zdWJ0bGUudmVyaWZ5KCdITUFDJywgYXdhaXQgaG1hY0tleShzZWNyZXQpLCB1bmI2NHVybChzaWcpLCBlbmMuZW5jb2RlKGJvZHkpKTtcbiAgICBpZiAoIW9rKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB2YWx1ZSA9IEpTT04ucGFyc2UobmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKHVuYjY0dXJsKGJvZHkpKSk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZT8uZXhwICE9PSAnbnVtYmVyJyB8fCB2YWx1ZS5leHAgPCBub3cpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRDb29raWUocmVxLCBuYW1lKSB7XG4gIGZvciAoY29uc3QgcGFydCBvZiAocmVxLmhlYWRlcnMuZ2V0KCdjb29raWUnKSA/PyAnJykuc3BsaXQoJzsnKSkge1xuICAgIGNvbnN0IGkgPSBwYXJ0LmluZGV4T2YoJz0nKTtcbiAgICBpZiAoaSAhPT0gLTEgJiYgcGFydC5zbGljZSgwLCBpKS50cmltKCkgPT09IG5hbWUpIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFydC5zbGljZShpICsgMSkudHJpbSgpKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgY29va2llID0gKG5hbWUsIHZhbHVlLCBtYXhBZ2UsIHBhdGggPSAnLycpID0+XG4gIGAke25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07IFBhdGg9JHtwYXRofTsgTWF4LUFnZT0ke21heEFnZX07IEh0dHBPbmx5OyBTZWN1cmU7IFNhbWVTaXRlPUxheGA7XG5cbi8qKiBPbmx5IHNhbWUtc2l0ZSByZWxhdGl2ZSBwYXRocyBzdXJ2aXZlIGEgcm91bmQgdHJpcCB0aHJvdWdoIHNpZ24taW4gXHUyMDE0IG5ldmVyIGAvL2V2aWwuY29tYC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYWZlTmV4dChuZXh0KSB7XG4gIHJldHVybiB0eXBlb2YgbmV4dCA9PT0gJ3N0cmluZycgJiYgL15cXC8oPyFbL1xcXFxdKVteXFxzXSokLy50ZXN0KG5leHQpICYmICFuZXh0LnN0YXJ0c1dpdGgoJy9hdXRoLycpID8gbmV4dCA6ICcvJztcbn1cblxuLyoqXG4gKiBSZWFkIGNvbmZpZ3VyYXRpb24gYW5kIGZhaWwgbG91ZGx5IGF0IHN0YXJ0LXVwLCBub3Qgb24gdGhlIGZpcnN0IHNpZ24taW46IGEgZ2F0ZSB0aGF0J3NcbiAqIG1pc2NvbmZpZ3VyZWQgbXVzdCByZWZ1c2UgZXZlcnlvbmUsIG5ldmVyIGxldCBldmVyeW9uZSB0aHJvdWdoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXV0aENvbmZpZyhlbnYpIHtcbiAgY29uc3QgbmVlZCA9IFsnT1JCRVhfT0FVVEhfQ0xJRU5UX0lEJywgJ09SQkVYX09BVVRIX0NMSUVOVF9TRUNSRVQnLCAnT1JCRVhfU0VTU0lPTl9TRUNSRVQnLCAnT1JCRVhfQUxMT1dFRF9VU0VSUyddO1xuICBjb25zdCBtaXNzaW5nID0gbmVlZC5maWx0ZXIoKGspID0+ICFlbnZba10pO1xuICBpZiAobWlzc2luZy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihgaG9zdGVkIHNpZ24taW4gaXMgbm90IGNvbmZpZ3VyZWQgXHUyMDE0IG1pc3NpbmcgJHttaXNzaW5nLmpvaW4oJywgJyl9YCk7XG4gIGlmIChlbnYuT1JCRVhfU0VTU0lPTl9TRUNSRVQubGVuZ3RoIDwgMzIpIHRocm93IG5ldyBFcnJvcignT1JCRVhfU0VTU0lPTl9TRUNSRVQgbXVzdCBiZSBhdCBsZWFzdCAzMiBjaGFyYWN0ZXJzJyk7XG4gIGNvbnN0IGFsbG93ZWQgPSBlbnYuT1JCRVhfQUxMT1dFRF9VU0VSUy5zcGxpdCgvW1xccyxdKy8pLm1hcCgocykgPT4gcy50cmltKCkudG9Mb3dlckNhc2UoKSkuZmlsdGVyKEJvb2xlYW4pO1xuICBpZiAoIWFsbG93ZWQubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ09SQkVYX0FMTE9XRURfVVNFUlMgbGlzdHMgbm9ib2R5Jyk7XG4gIHJldHVybiB7XG4gICAgY2xpZW50SWQ6IGVudi5PUkJFWF9PQVVUSF9DTElFTlRfSUQsXG4gICAgY2xpZW50U2VjcmV0OiBlbnYuT1JCRVhfT0FVVEhfQ0xJRU5UX1NFQ1JFVCxcbiAgICBzZWNyZXQ6IGVudi5PUkJFWF9TRVNTSU9OX1NFQ1JFVCxcbiAgICBhbGxvd2VkLFxuICB9O1xufVxuXG4vKiogQHBhcmFtIHtSZXR1cm5UeXBlPHR5cGVvZiBhdXRoQ29uZmlnPn0gY29uZmlnICBAcGFyYW0ge3R5cGVvZiBmZXRjaH0gW2ZldGNoSW1wbF0gKi9cbmV4cG9ydCBmdW5jdGlvbiBnaXRodWJBdXRoKGNvbmZpZywgZmV0Y2hJbXBsID0gZmV0Y2gpIHtcbiAgY29uc3QgaXNBbGxvd2VkID0gKHVzZXIpID0+ICEhdXNlciAmJiB1c2VyLnByb3ZpZGVyID09PSAnZ2l0aHViJyAmJiBjb25maWcuYWxsb3dlZC5pbmNsdWRlcyhTdHJpbmcodXNlci5sb2dpbikudG9Mb3dlckNhc2UoKSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gdXNlcihyZXEpIHtcbiAgICBjb25zdCBzID0gYXdhaXQgdW5zaWduKHJlYWRDb29raWUocmVxLCBTRVNTSU9OX0NPT0tJRSksIGNvbmZpZy5zZWNyZXQpO1xuICAgIGlmICghcz8udXNlciB8fCAhaXNBbGxvd2VkKHMudXNlcikpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBzLnVzZXI7XG4gIH1cblxuICBjb25zdCByZWRpcmVjdCA9ICh0bywgY29va2llcyA9IFtdKSA9PiB7XG4gICAgY29uc3QgaCA9IG5ldyBIZWFkZXJzKHsgbG9jYXRpb246IHRvLCAnY2FjaGUtY29udHJvbCc6ICduby1zdG9yZScgfSk7XG4gICAgZm9yIChjb25zdCBjIG9mIGNvb2tpZXMpIGguYXBwZW5kKCdzZXQtY29va2llJywgYyk7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMzAyLCBoZWFkZXJzOiBoIH0pO1xuICB9O1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGxvZ2luKHJlcSkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7XG4gICAgY29uc3Qgc3RhdGUgPSBiNjR1cmwoY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgyNCkpKTtcbiAgICBjb25zdCBuZXh0ID0gc2FmZU5leHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoJ25leHQnKSk7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBzaWduKHsgc3RhdGUsIG5leHQsIGV4cDogRGF0ZS5ub3coKSArIFNUQVRFX01JTlVURVMgKiA2MF8wMDAgfSwgY29uZmlnLnNlY3JldCk7XG4gICAgY29uc3QgZ2ggPSBuZXcgVVJMKCdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyk7XG4gICAgZ2guc2VhcmNoUGFyYW1zLnNldCgnY2xpZW50X2lkJywgY29uZmlnLmNsaWVudElkKTtcbiAgICBnaC5zZWFyY2hQYXJhbXMuc2V0KCdyZWRpcmVjdF91cmknLCBgJHt1cmwub3JpZ2lufS9hdXRoL2NhbGxiYWNrYCk7XG4gICAgZ2guc2VhcmNoUGFyYW1zLnNldCgnc3RhdGUnLCBzdGF0ZSk7XG4gICAgZ2guc2VhcmNoUGFyYW1zLnNldCgnYWxsb3dfc2lnbnVwJywgJ2ZhbHNlJyk7XG4gICAgLy8gTm8gc2NvcGU6IHRoZSBwdWJsaWMgcHJvZmlsZSBpcyBhbGwgc2lnbi1pbiBuZWVkcy4gVGhlIHRva2VuIGNhbid0IHJlYWQgYW55IHJlcG8uXG4gICAgcmV0dXJuIHJlZGlyZWN0KGdoLnRvU3RyaW5nKCksIFtjb29raWUoU1RBVEVfQ09PS0lFLCB0b2tlbiwgU1RBVEVfTUlOVVRFUyAqIDYwLCAnL2F1dGgvJyldKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGNhbGxiYWNrKHJlcSkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7XG4gICAgY29uc3QgcGVuZGluZyA9IGF3YWl0IHVuc2lnbihyZWFkQ29va2llKHJlcSwgU1RBVEVfQ09PS0lFKSwgY29uZmlnLnNlY3JldCk7XG4gICAgY29uc3QgY2xlYXJTdGF0ZSA9IGNvb2tpZShTVEFURV9DT09LSUUsICcnLCAwLCAnL2F1dGgvJyk7XG4gICAgaWYgKCFwZW5kaW5nIHx8ICF1cmwuc2VhcmNoUGFyYW1zLmdldCgnc3RhdGUnKSB8fCBwZW5kaW5nLnN0YXRlICE9PSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnc3RhdGUnKSkge1xuICAgICAgcmV0dXJuIHBhZ2UoNDAwLCAnU2lnbi1pbiBleHBpcmVkIG9yIHdhcyB0YW1wZXJlZCB3aXRoJywgJzxwPjxhIGhyZWY9XCIvYXV0aC9sb2dpblwiPlRyeSBhZ2FpbjwvYT48L3A+JywgW2NsZWFyU3RhdGVdKTtcbiAgICB9XG4gICAgY29uc3QgdG9rZW5SZXMgPSBhd2FpdCBmZXRjaEltcGwoJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hY2Nlc3NfdG9rZW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2xpZW50X2lkOiBjb25maWcuY2xpZW50SWQsIGNsaWVudF9zZWNyZXQ6IGNvbmZpZy5jbGllbnRTZWNyZXQsIGNvZGU6IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjb2RlJyksIHJlZGlyZWN0X3VyaTogYCR7dXJsLm9yaWdpbn0vYXV0aC9jYWxsYmFja2AgfSksXG4gICAgfSk7XG4gICAgY29uc3QgdG9rID0gYXdhaXQgdG9rZW5SZXMuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgIGlmICghdG9rLmFjY2Vzc190b2tlbikgcmV0dXJuIHBhZ2UoNTAyLCAnR2l0SHViIHJlZnVzZWQgdGhlIHNpZ24taW4nLCBgPHA+JHtlc2ModG9rLmVycm9yX2Rlc2NyaXB0aW9uID8/IHRvay5lcnJvciA/PyAnbm8gdG9rZW4nKX08L3A+PHA+PGEgaHJlZj1cIi9hdXRoL2xvZ2luXCI+VHJ5IGFnYWluPC9hPjwvcD5gLCBbY2xlYXJTdGF0ZV0pO1xuICAgIGNvbnN0IG1lUmVzID0gYXdhaXQgZmV0Y2hJbXBsKCdodHRwczovL2FwaS5naXRodWIuY29tL3VzZXInLCB7XG4gICAgICBoZWFkZXJzOiB7IGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2suYWNjZXNzX3Rva2VufWAsIGFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIranNvbicsICd1c2VyLWFnZW50JzogJ29yYmV4LWRhc2hib2FyZCcgfSxcbiAgICB9KTtcbiAgICBjb25zdCBtZSA9IGF3YWl0IG1lUmVzLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgICBpZiAoIW1lLmxvZ2luKSByZXR1cm4gcGFnZSg1MDIsICdDb3VsZCBub3QgcmVhZCB5b3VyIEdpdEh1YiBwcm9maWxlJywgJzxwPjxhIGhyZWY9XCIvYXV0aC9sb2dpblwiPlRyeSBhZ2FpbjwvYT48L3A+JywgW2NsZWFyU3RhdGVdKTtcbiAgICBjb25zdCB1ID0geyBwcm92aWRlcjogJ2dpdGh1YicsIGlkOiBTdHJpbmcobWUuaWQpLCBsb2dpbjogbWUubG9naW4sIG5hbWU6IG1lLm5hbWUgPz8gbnVsbCwgYXZhdGFyOiBtZS5hdmF0YXJfdXJsID8/IG51bGwgfTtcbiAgICBpZiAoIWlzQWxsb3dlZCh1KSkge1xuICAgICAgcmV0dXJuIHBhZ2UoNDAzLCAnTm90IG9uIHRoZSBsaXN0JywgYDxwPlNpZ25lZCBpbiB0byBHaXRIdWIgYXMgPGI+JHtlc2ModS5sb2dpbil9PC9iPiwgYnV0IHRoaXMgZGFzaGJvYXJkIGlzbid0IHNoYXJlZCB3aXRoIHRoYXQgYWNjb3VudC48L3A+YCwgW2NsZWFyU3RhdGVdKTtcbiAgICB9XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHNpZ24oeyB1c2VyOiB1LCBleHA6IERhdGUubm93KCkgKyBTRVNTSU9OX0RBWVMgKiA4Nl80MDBfMDAwIH0sIGNvbmZpZy5zZWNyZXQpO1xuICAgIHJldHVybiByZWRpcmVjdChwZW5kaW5nLm5leHQsIFtjbGVhclN0YXRlLCBjb29raWUoU0VTU0lPTl9DT09LSUUsIHNlc3Npb24sIFNFU1NJT05fREFZUyAqIDg2XzQwMCldKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgICByZXR1cm4gcmVkaXJlY3QoJy9hdXRoL2xvZ2luP3NpZ25lZF9vdXQ9MScsIFtjb29raWUoU0VTU0lPTl9DT09LSUUsICcnLCAwKV0pO1xuICB9XG5cbiAgLyoqIC9hdXRoLyogcm91dGVzLCBvciBudWxsLiAqL1xuICBhc3luYyBmdW5jdGlvbiBoYW5kbGUocmVxKSB7XG4gICAgY29uc3QgeyBwYXRobmFtZSB9ID0gbmV3IFVSTChyZXEudXJsKTtcbiAgICBpZiAocGF0aG5hbWUgPT09ICcvYXV0aC9sb2dpbicpIHtcbiAgICAgIC8vIEEgcGxhaW4gR0VUIHNob3dzIHRoZSBidXR0b247IHRoZSBidXR0b24gUE9TVHMgbm90aGluZyBcdTIwMTQgaXQncyBhIGxpbmsgd2l0aCA/Z289MSwgc28gYVxuICAgICAgLy8gcHJlZmV0Y2ggb2YgL2F1dGgvbG9naW4gY2FuJ3Qgc3RhcnQgYW4gT0F1dGggcm91bmQgdHJpcCBvbiBpdHMgb3duLlxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXEudXJsKTtcbiAgICAgIGlmICh1cmwuc2VhcmNoUGFyYW1zLmhhcygnZ28nKSkgcmV0dXJuIGxvZ2luKHJlcSk7XG4gICAgICByZXR1cm4gbG9naW5QYWdlKHVybCk7XG4gICAgfVxuICAgIGlmIChwYXRobmFtZSA9PT0gJy9hdXRoL2NhbGxiYWNrJykgcmV0dXJuIGNhbGxiYWNrKHJlcSk7XG4gICAgaWYgKHBhdGhuYW1lID09PSAnL2F1dGgvbG9nb3V0JykgcmV0dXJuIGxvZ291dCgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHsga2luZDogJ2dpdGh1YicsIHVzZXIsIGhhbmRsZSB9O1xufVxuXG5jb25zdCBlc2MgPSAocykgPT4gU3RyaW5nKHMgPz8gJycpLnJlcGxhY2UoL1smPD5cIiddL2csIChjKSA9PiAoeyAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnIH1bY10pKTtcblxuZnVuY3Rpb24gbG9naW5QYWdlKHVybCkge1xuICBjb25zdCBuZXh0ID0gc2FmZU5leHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoJ25leHQnKSk7XG4gIGNvbnN0IG91dCA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKCdzaWduZWRfb3V0JykgPyAnPHAgY2xhc3M9XCJtXCI+U2lnbmVkIG91dC48L3A+JyA6ICcnO1xuICByZXR1cm4gcGFnZSgyMDAsICdTaWduIGluJywgYCR7b3V0fTxwPjxhIGNsYXNzPVwiYlwiIGhyZWY9XCIvYXV0aC9sb2dpbj9nbz0xJmFtcDtuZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG5leHQpfVwiPlNpZ24gaW4gd2l0aCBHaXRIdWI8L2E+PC9wPmApO1xufVxuXG4vKiogQSB0aW55IHNlbGYtY29udGFpbmVkIHBhZ2UgXHUyMDE0IHNlcnZlZCBieSB0aGUgZ2F0ZSwgc28gaXQgY2FuJ3QgZGVwZW5kIG9uIHRoZSAoZ2F0ZWQpIGJ1bmRsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYWdlKHN0YXR1cywgdGl0bGUsIGJvZHksIGNvb2tpZXMgPSBbXSkge1xuICBjb25zdCBoID0gbmV3IEhlYWRlcnMoeyAnY29udGVudC10eXBlJzogJ3RleHQvaHRtbDsgY2hhcnNldD11dGYtOCcsICdjYWNoZS1jb250cm9sJzogJ25vLXN0b3JlJywgJ3gtcm9ib3RzLXRhZyc6ICdub2luZGV4JyB9KTtcbiAgZm9yIChjb25zdCBjIG9mIGNvb2tpZXMpIGguYXBwZW5kKCdzZXQtY29va2llJywgYyk7XG4gIHJldHVybiBuZXcgUmVzcG9uc2UoYDwhZG9jdHlwZSBodG1sPjxodG1sIGxhbmc9XCJlblwiPjxoZWFkPjxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPjxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xXCI+PG1ldGEgbmFtZT1cInJvYm90c1wiIGNvbnRlbnQ9XCJub2luZGV4XCI+PGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5zdmdcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiPjxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24ucG5nXCIgdHlwZT1cImltYWdlL3BuZ1wiPjx0aXRsZT4ke2VzYyh0aXRsZSl9PC90aXRsZT5cbjxzdHlsZT46cm9vdHtjb2xvci1zY2hlbWU6ZGFyazstLXA6IzEyMGYxNTstLXM6IzFiMTcyMDstLWk6I2Y0ZWZmNjstLW06I2EzOWFhODstLWI6I0NGMjdFMDstLXc6I2YyZjJmMn1AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOmxpZ2h0KXs6cm9vdHtjb2xvci1zY2hlbWU6bGlnaHQ7LS1wOiNmN2YyZjg7LS1zOiNmZGZiZmQ7LS1pOiMxMjBmMTU7LS1tOiM2ZTY1NzM7LS13OiMwMDB9fVxuYm9keXttYXJnaW46MDttaW4taGVpZ2h0OjEwMHZoO2Rpc3BsYXk6Z3JpZDtwbGFjZS1pdGVtczpjZW50ZXI7YmFja2dyb3VuZDp2YXIoLS1wKTtjb2xvcjp2YXIoLS1pKTtmb250OjE1cHgvMS41IHN5c3RlbS11aSwtYXBwbGUtc3lzdGVtLFwiU2Vnb2UgVUlcIixzYW5zLXNlcmlmfVxubWFpbntiYWNrZ3JvdW5kOnZhcigtLXMpO2JvcmRlcjoxcHggc29saWQgcmdiKDEyOCAxMjggMTI4Ly4yKTtib3JkZXItdG9wOjNweCBzb2xpZCB2YXIoLS1iKTtib3JkZXItcmFkaXVzOjEycHg7cGFkZGluZzoyOHB4IDMycHg7bWFyZ2luOjE2cHg7bWF4LXdpZHRoOjM4MHB4fVxuLmxvZ297ZGlzcGxheTpibG9jazttYXJnaW46MCAwIDIwcHh9LmxvZ28gLndvcmRtYXJre2ZpbGw6dmFyKC0tdyl9aDF7Zm9udC1zaXplOjEuM3JlbTttYXJnaW46MCAwIDEycHh9Lm17Y29sb3I6dmFyKC0tbSl9YXtjb2xvcjp2YXIoLS1pKX0uYntkaXNwbGF5OmlubGluZS1ibG9jaztiYWNrZ3JvdW5kOnZhcigtLWIpO2NvbG9yOiNmZmY7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Zm9udC13ZWlnaHQ6NjAwO2JvcmRlci1yYWRpdXM6OTk5cHg7cGFkZGluZzo5cHggMThweH08L3N0eWxlPjwvaGVhZD5cbjxib2R5PjxtYWluPiR7TE9HT19TVkd9PGgxPiR7ZXNjKHRpdGxlKX08L2gxPiR7Ym9keX08L21haW4+PC9ib2R5PjwvaHRtbD5gLCB7IHN0YXR1cywgaGVhZGVyczogaCB9KTtcbn1cbiIsICIvLyBCdWlsZHMgb25lIHNuYXBzaG90IG9mIGEgd29ya3NwYWNlIGZvciB0aGUgcGFnZS4gVEhJUyBJUyBOT1QgQSBTT1VSQ0UuXG4vL1xuLy8gSXQgcmVhZHMgbm8gcGxhbiwgYmFja2xvZyBvciBtZW1vcnkgZmlsZS4gSXQgcnVucyB0aGUgd29ya3NwYWNlJ3Mgb3duIHByb2R1Y2VycyBcdTIwMTRcbi8vIGBzY3JpcHRzL25leHQubWpzIC0tanNvbmAgYW5kIGBzY3JpcHRzL2J1aWxkLXByb2plY3QtaW5kZXgubWpzIC0tanNvbmAsIHRoZSBzYW1lIHR3byB0aGF0XG4vLyBvcmJleCdzIGJ1aWx0LWluIGRhc2hib2FyZC5tanMgcmVuZGVycyBcdTIwMTQgYW5kIGFkZHMgZ2l0IG1ldGFkYXRhLiBBIHRoaXJkIGZyb250bWF0dGVyIHJlYWRlclxuLy8gd291bGQgYmUgYSB0aGlyZCB0aGluZyB0aGF0IGNhbiBkaXNhZ3JlZSwgYW5kIGEgc3RvcmVkIHNuYXBzaG90IHdvdWxkIGJlIGEgc2Vjb25kIHN0YXR1cyBsaXN0LlxuLy8gVGhlIG9ubHkgc3RhdGUgaXMgYW4gaW4tbWVtb3J5IGNhY2hlIGluIGluZGV4Lm1qcywgd2hpY2ggZGllcyB3aXRoIHRoZSBwcm9jZXNzLlxuLy9cbi8vIEluIGEgd29ya3NwYWNlLCBzY3JpcHRzLyBpcyBhIHN5bWxpbmsgaW50byB0aGUgc2libGluZyBvcmJleCBjbG9uZSBhbmQgdGhlIHByb2R1Y2VycyBmaW5kIHRoZVxuLy8gd29ya3NwYWNlIGZyb20gdGhlIGAub3JiZXgtd29ya3NwYWNlYCBtYXJrZXIgYWJvdmUgdGhlaXIgY3dkIChPUkJJLTgxKSwgc28gcnVubmluZyB0aGVtIGZyb21cbi8vIHRoZSB3b3Jrc3BhY2UgcmVhY2hlcyB3aGF0ZXZlciBvcmJleCB0aGF0IHdvcmtzcGFjZSBjb25zdW1lcyBcdTIwMTQgbm90aGluZyBlbHNlIHRvIGNvbmZpZ3VyZS5cblxuaW1wb3J0IHsgZXhlY0ZpbGUgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gJ25vZGU6dXRpbCc7XG5cbmNvbnN0IHJ1biA9IHByb21pc2lmeShleGVjRmlsZSk7XG5cbi8qKiBXYWxrIHVwIGZyb20gYHN0YXJ0YCB0byB0aGUgZGlyZWN0b3J5IGhvbGRpbmcgYC5vcmJleC13b3Jrc3BhY2VgLCBvciBudWxsLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRXb3Jrc3BhY2Uoc3RhcnQpIHtcbiAgbGV0IGRpciA9IHBhdGgucmVzb2x2ZShzdGFydCk7XG4gIGZvciAoOzspIHtcbiAgICBpZiAoZXhpc3RzU3luYyhwYXRoLmpvaW4oZGlyLCAnLm9yYmV4LXdvcmtzcGFjZScpKSkgcmV0dXJuIGRpcjtcbiAgICBjb25zdCB1cCA9IHBhdGguZGlybmFtZShkaXIpO1xuICAgIGlmICh1cCA9PT0gZGlyKSByZXR1cm4gbnVsbDtcbiAgICBkaXIgPSB1cDtcbiAgfVxufVxuXG4vKipcbiAqIFJlc29sdmUgdGhlIHdvcmtzcGFjZSAobXVzdCBob2xkIHRoZSBtYXJrZXIgaXRzZWxmKSBhbmQgdGhlIGRpcmVjdG9yeSBpdHMgcHJvZHVjZXJzIGxpdmUgaW46XG4gKiB0aGUgd29ya3NwYWNlJ3Mgb3duIHNjcmlwdHMvIGJ5IGRlZmF1bHQsIG9yIGA8b3JiZXhEaXI+L3NjcmlwdHNgIHdoZW4gZ2l2ZW4gXHUyMDE0IGZvciBhIHdvcmtzcGFjZVxuICogd2l0aCBubyBzY3JpcHRzLyBsaW5rLCBzdWNoIGFzIG9yYmV4J3MgZXhhbXBsZXMvc2FtcGxlLXdvcmtzcGFjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVXb3Jrc3BhY2UoZ2l2ZW4sIG9yYmV4RGlyKSB7XG4gIGNvbnN0IHJvb3QgPSBwYXRoLnJlc29sdmUoZ2l2ZW4pO1xuICBpZiAoIWV4aXN0c1N5bmMocGF0aC5qb2luKHJvb3QsICcub3JiZXgtd29ya3NwYWNlJykpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke3Jvb3R9IGlzIG5vdCBhbiBvcmJleCB3b3Jrc3BhY2UgKG5vIC5vcmJleC13b3Jrc3BhY2UgbWFya2VyIHRoZXJlKWApO1xuICB9XG4gIGNvbnN0IHNjcmlwdHMgPSBvcmJleERpciA/IHBhdGguam9pbihwYXRoLnJlc29sdmUob3JiZXhEaXIpLCAnc2NyaXB0cycpIDogcGF0aC5qb2luKHJvb3QsICdzY3JpcHRzJyk7XG4gIGZvciAoY29uc3QgcyBvZiBbJ25leHQubWpzJywgJ2J1aWxkLXByb2plY3QtaW5kZXgubWpzJ10pIHtcbiAgICBpZiAoIWV4aXN0c1N5bmMocGF0aC5qb2luKHNjcmlwdHMsIHMpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG9yYmV4RGlyXG4gICAgICAgID8gYCR7c2NyaXB0c30vJHtzfSBub3QgZm91bmQgXHUyMDE0IC0tb3JiZXggbXVzdCBwb2ludCBhdCBhbiBvcmJleCBjbG9uZWBcbiAgICAgICAgOiBgJHtzY3JpcHRzfS8ke3N9IG5vdCBmb3VuZCBcdTIwMTQgaXMgdGhlIHdvcmtzcGFjZSdzIHNjcmlwdHMvIGxpbmtlZCB0byBhbiBvcmJleCBjbG9uZT8gKHNlZSBvcmJleCdzIFJFQURNRSBxdWlja3N0YXJ0LCBvciBwYXNzIC0tb3JiZXggPGRpcj4pYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IHJvb3QsIHNjcmlwdHMgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvZHVjZSh7IHJvb3QsIHNjcmlwdHMgfSwgc2NyaXB0LCBleHRyYSA9IFtdKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBzdGRvdXQgfSA9IGF3YWl0IHJ1bihwcm9jZXNzLmV4ZWNQYXRoLCBbcGF0aC5qb2luKHNjcmlwdHMsIHNjcmlwdCksICctLWpzb24nLCAuLi5leHRyYV0sIHtcbiAgICAgIGN3ZDogcm9vdCxcbiAgICAgIGVudjogeyAuLi5wcm9jZXNzLmVudiwgT1JCRVhfV09SS1NQQUNFOiByb290IH0sXG4gICAgICBlbmNvZGluZzogJ3V0ZjgnLFxuICAgICAgbWF4QnVmZmVyOiAzMiAqIDEwMjQgKiAxMDI0LFxuICAgICAgdGltZW91dDogNjBfMDAwLFxuICAgIH0pO1xuICAgIHJldHVybiBKU09OLnBhcnNlKHN0ZG91dCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBBIHByb2R1Y2VyJ3Mgb3duIG1lc3NhZ2UgKGUuZy4gYW4gYW1iaWd1b3VzIHByb2plY3Qga2V5KSBpcyB0aGUgdGhpbmcgdG8gc2hvdy5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7c2NyaXB0fTogJHsoZS5zdGRlcnIgfHwgZS5tZXNzYWdlIHx8IFN0cmluZyhlKSkudHJpbSgpfWApO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdpdChyb290LCAuLi5hKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBzdGRvdXQgfSA9IGF3YWl0IHJ1bignZ2l0JywgWyctQycsIHJvb3QsIC4uLmFdLCB7IGVuY29kaW5nOiAndXRmOCcsIHRpbWVvdXQ6IDMwXzAwMCB9KTtcbiAgICByZXR1cm4gc3Rkb3V0LnRyaW0oKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWFkLW9ubHkgXCJiZWhpbmQgb3JpZ2luXCIgY291bnQuIGBnaXQgZmV0Y2hgIHVwZGF0ZXMgcmVtb3RlLXRyYWNraW5nIHJlZnMgb25seTsgbm90aGluZyBoZXJlXG4gKiBldmVyIHB1bGxzLCBtZXJnZXMgb3IgdG91Y2hlcyB0aGUgd29ya2luZyB0cmVlIFx1MjAxNCBhIGRhc2hib2FyZCBoYXMgbm8gYnVzaW5lc3MgY2hhbmdpbmcgZmlsZXMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGJlaGluZE9yaWdpbihyb290LCB7IGZldGNoIH0pIHtcbiAgY29uc3QgdXBzdHJlYW0gPSBhd2FpdCBnaXQocm9vdCwgJ3Jldi1wYXJzZScsICctLWFiYnJldi1yZWYnLCAnLS1zeW1ib2xpYy1mdWxsLW5hbWUnLCAnQHt1fScpO1xuICBpZiAoIXVwc3RyZWFtKSByZXR1cm4geyBiZWhpbmQ6IG51bGwsIGFoZWFkOiBudWxsLCB1cHN0cmVhbTogbnVsbCwgZXJyb3I6ICdubyB1cHN0cmVhbSBicmFuY2gnIH07XG4gIGxldCBlcnJvciA9IG51bGw7XG4gIGlmIChmZXRjaCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBydW4oJ2dpdCcsIFsnLUMnLCByb290LCAnZmV0Y2gnLCAnLS1xdWlldCddLCB7IHRpbWVvdXQ6IDMwXzAwMCwgZW52OiB7IC4uLnByb2Nlc3MuZW52LCBHSVRfVEVSTUlOQUxfUFJPTVBUOiAnMCcgfSB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnJvciA9IGBnaXQgZmV0Y2ggZmFpbGVkOiAkeyhlLnN0ZGVyciB8fCBlLm1lc3NhZ2UpLnRyaW0oKS5zcGxpdCgnXFxuJylbMF19YDtcbiAgICB9XG4gIH1cbiAgY29uc3QgY291bnRzID0gYXdhaXQgZ2l0KHJvb3QsICdyZXYtbGlzdCcsICctLWxlZnQtcmlnaHQnLCAnLS1jb3VudCcsIGBIRUFELi4uJHt1cHN0cmVhbX1gKTtcbiAgY29uc3QgW2FoZWFkLCBiZWhpbmRdID0gY291bnRzID8gY291bnRzLnNwbGl0KC9cXHMrLykubWFwKE51bWJlcikgOiBbbnVsbCwgbnVsbF07XG4gIHJldHVybiB7IGJlaGluZCwgYWhlYWQsIHVwc3RyZWFtLCBlcnJvciB9O1xufVxuXG4vLyBQbGFuIGxpbmtzIGdvIHRvIEdpdEh1Yiwgd2hpY2ggcmVuZGVycyBtYXJrZG93bjsgc2FtZSBkZXJpdmF0aW9uIGFzIGRhc2hib2FyZC5tanMuXG5hc3luYyBmdW5jdGlvbiBnaXRodWJCYXNlKHJvb3QpIHtcbiAgY29uc3QgW3VybCwgYnJhbmNoLCBwcmVmaXhdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGdpdChyb290LCAncmVtb3RlJywgJ2dldC11cmwnLCAnb3JpZ2luJyksXG4gICAgZ2l0KHJvb3QsICdyZXYtcGFyc2UnLCAnLS1hYmJyZXYtcmVmJywgJ0hFQUQnKSxcbiAgICBnaXQocm9vdCwgJ3Jldi1wYXJzZScsICctLXNob3ctcHJlZml4JyksXG4gIF0pO1xuICBjb25zdCBtID0gdXJsPy5tYXRjaCgvZ2l0aHViXFwuY29tWzovXShbXi86XSspXFwvKFteL10rPykoPzpcXC5naXQpPyQvKTtcbiAgcmV0dXJuIG0gJiYgYnJhbmNoICYmIGJyYW5jaCAhPT0gJ0hFQUQnXG4gICAgPyBgaHR0cHM6Ly9naXRodWIuY29tLyR7bVsxXX0vJHttWzJdfS9ibG9iLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGJyYW5jaCl9LyR7cHJlZml4ID8/ICcnfWBcbiAgICA6IG51bGw7XG59XG5cbi8qKlxuICogVGhlIHByb2R1Y2VycycgLS1qc29uIG91dHB1dCBpcyBhIGNyb3NzLXJlcG8gaW50ZXJmYWNlIG5vdyAoT1JCSS05MCkuIElmIG9yYmV4IGNoYW5nZXMgaXQsXG4gKiBzYXkgZXhhY3RseSB3aGF0J3MgbWlzc2luZyByYXRoZXIgdGhhbiBkcmF3aW5nIGFuIGVtcHR5IGNoYXJ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUobmV4dCwgaW5kZXgpIHtcbiAgY29uc3QgbWlzc2luZyA9IFtdO1xuICBjb25zdCBuZWVkID0gKG9iaiwgbmFtZSwga2V5LCB0eXBlKSA9PiB7XG4gICAgY29uc3QgdiA9IG9iaj8uW2tleV07XG4gICAgaWYgKHR5cGUgPT09ICdhcnJheScgPyAhQXJyYXkuaXNBcnJheSh2KSA6IHYgPT09IHVuZGVmaW5lZCkgbWlzc2luZy5wdXNoKGAke25hbWV9LiR7a2V5fWApO1xuICB9O1xuICBuZWVkKG5leHQsICduZXh0JywgJ3Byb2plY3RzJywgJ2FycmF5Jyk7XG4gIG5lZWQobmV4dCwgJ25leHQnLCAnYmFja2xvZycsICdhcnJheScpO1xuICBuZWVkKG5leHQsICduZXh0JywgJ2luYm94JywgJ2FycmF5Jyk7XG4gIG5lZWQobmV4dCwgJ25leHQnLCAnbWVtb3J5UmV2aWV3JywgJ2FycmF5Jyk7XG4gIG5lZWQobmV4dCwgJ25leHQnLCAnaW5ib3hFcnJvcicsICdhbnknKTtcbiAgbmVlZChuZXh0LCAnbmV4dCcsICdtZW1vcnlSZXZpZXdFcnJvcicsICdhbnknKTtcbiAgbmVlZChpbmRleCwgJ2luZGV4JywgJ3Byb2plY3RzJywgJ2FycmF5Jyk7XG4gIG5lZWQoaW5kZXgsICdpbmRleCcsICdwcm9ibGVtcycsICdhcnJheScpO1xuICBpZiAobWlzc2luZy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2R1Y2VyIG91dHB1dCBjaGFuZ2VkIFx1MjAxNCBtaXNzaW5nICR7bWlzc2luZy5qb2luKCcsICcpfS4gVGhlIGluc3RhbGxlZCBvcmJleCBhbmQgb3JiZXgtZGFzaGJvYXJkIGRpc2FncmVlIG9uIHRoZSAtLWpzb24gZm9ybWF0OyB1cGRhdGUgb25lIG9mIHRoZW0uYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBKdXN0IHRoZSB0d28gcHJvZHVjZXJzLCB2YWxpZGF0ZWQgXHUyMDE0IG5vIGdpdC4gR2l0SHViU291cmNlIHVzZXMgdGhpcyBvbiBpdHMgdGhyb3dhd2F5IG1pcnJvcjtcbiAqIGB3c2AgaXMgYHsgcm9vdCwgc2NyaXB0cyB9YC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkU25hcHNob3RGcm9tUHJvZHVjZXJzKHdzLCB7IG5vR2ggPSBmYWxzZSB9ID0ge30pIHtcbiAgY29uc3QgW25leHQsIGluZGV4XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBwcm9kdWNlKHdzLCAnbmV4dC5tanMnLCBub0doID8gWyctLW5vLWdoJ10gOiBbXSksXG4gICAgcHJvZHVjZSh3cywgJ2J1aWxkLXByb2plY3QtaW5kZXgubWpzJyksXG4gIF0pO1xuICB2YWxpZGF0ZShuZXh0LCBpbmRleCk7XG4gIHJldHVybiB7IG5leHQsIGluZGV4IH07XG59XG5cbi8qKiBgd3NgIGlzIHJlc29sdmVXb3Jrc3BhY2UoKSdzIHJlc3VsdC4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZFNuYXBzaG90KHdzLCB7IG5vR2ggPSBmYWxzZSwgZmV0Y2ggPSB0cnVlIH0gPSB7fSkge1xuICBjb25zdCB7IHJvb3QgfSA9IHdzO1xuICBjb25zdCBbeyBuZXh0LCBpbmRleCB9LCBzaGEsIHN0YXR1cywgZ2gsIG9yaWdpbl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgYnVpbGRTbmFwc2hvdEZyb21Qcm9kdWNlcnMod3MsIHsgbm9HaCB9KSxcbiAgICBnaXQocm9vdCwgJ3Jldi1wYXJzZScsICctLXNob3J0JywgJ0hFQUQnKSxcbiAgICBnaXQocm9vdCwgJ3N0YXR1cycsICctLXBvcmNlbGFpbicpLFxuICAgIGdpdGh1YkJhc2Uocm9vdCksXG4gICAgYmVoaW5kT3JpZ2luKHJvb3QsIHsgZmV0Y2ggfSksXG4gIF0pO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IHBhdGguYmFzZW5hbWUocm9vdCksXG4gICAgZ2VuZXJhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICBub0doLFxuICAgIGdpdDogeyBzaGEsIGRpcnR5OiAhIXN0YXR1cywgZ2l0aHViQmFzZTogZ2gsIC4uLm9yaWdpbiB9LFxuICAgIG5leHQsXG4gICAgaW5kZXgsXG4gIH07XG59XG4iLCAiLy8gQ2FwdHVyZSAoT1JCSS05MikgXHUyMDE0IHRoZSBkYXNoYm9hcmQncyBvbmUgd3JpdGU6IENSRUFURSBhIG5ldyBmaWxlIHVuZGVyIGluYm94Ly5cbi8vXG4vLyBPbmUgZmlsZSBwZXIgaXRlbSBpcyBvcmJleCdzIGluYm94IGNvbnZlbnRpb24gKG5leHQubWpzIHJlYWRzIGluYm94LyoubWQgYmVzaWRlIEdpdEh1YlxuLy8gSXNzdWVzKS4gSXQgaXMgdGhlIG5hcnJvd2VzdCB3cml0ZSB0aGVyZSBpczogbmV2ZXIgYW4gZWRpdCwgbmV2ZXIgYSBkZWxldGUsIG5ldmVyIEJBQ0tMT0cubWRcbi8vIG9yIGEgcGxhbi4gQSBuZXcgdW5pcXVlbHktbmFtZWQgZmlsZSBjYW4ndCBtZXJnZS1jb25mbGljdCB3aXRoIGEgbGFwdG9wIG1pZC1lZGl0LCB3aGljaCBpc1xuLy8gd2hhdCBtYWtlcyBpdCBzYWZlIGZvciBhIGhvc3RlZCBkYXNoYm9hcmQgdG8gY29tbWl0IHN0cmFpZ2h0IHRvIG9yaWdpbi5cbi8vXG4vLyBCb3RoIHNvdXJjZXMgc2hhcmUgdGhpcyBtb2R1bGUsIHNvIGEgY2FwdHVyZSBpcyBieXRlLWlkZW50aWNhbCB3aGV0aGVyIGl0IHdhcyB3cml0dGVuIHRvIGFcbi8vIHdvcmtpbmcgdHJlZSBvciBjb21taXR0ZWQgdGhyb3VnaCB0aGUgR2l0SHViIEFQSS5cblxuZXhwb3J0IGNvbnN0IFRJVExFX01BWCA9IDIwMDtcbmV4cG9ydCBjb25zdCBCT0RZX01BWCA9IDEwXzAwMDtcblxuZXhwb3J0IGNsYXNzIENhcHR1cmVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSwgc3RhdHVzID0gNDAwKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIH1cbn1cblxuLyoqIFZhbGlkYXRlIHRoZSByZXF1ZXN0IGJvZHk7IHJldHVybnMgYHsgdGl0bGUsIGJvZHkgfWAgbm9ybWFsaXNlZCwgb3IgdGhyb3dzIENhcHR1cmVFcnJvci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNhcHR1cmUoaW5wdXQpIHtcbiAgaWYgKCFpbnB1dCB8fCB0eXBlb2YgaW5wdXQgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgQ2FwdHVyZUVycm9yKCdleHBlY3RlZCBhIEpTT04gb2JqZWN0IHdpdGggYSB0aXRsZScpO1xuICBjb25zdCB0aXRsZSA9IHR5cGVvZiBpbnB1dC50aXRsZSA9PT0gJ3N0cmluZycgPyBpbnB1dC50aXRsZS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpIDogJyc7XG4gIGNvbnN0IGJvZHkgPSB0eXBlb2YgaW5wdXQuYm9keSA9PT0gJ3N0cmluZycgPyBpbnB1dC5ib2R5LnJlcGxhY2UoL1xcclxcbj8vZywgJ1xcbicpLnRyaW0oKSA6ICcnO1xuICBpZiAoIXRpdGxlKSB0aHJvdyBuZXcgQ2FwdHVyZUVycm9yKCdhIHRpdGxlIGlzIHJlcXVpcmVkJyk7XG4gIGlmICh0aXRsZS5sZW5ndGggPiBUSVRMRV9NQVgpIHRocm93IG5ldyBDYXB0dXJlRXJyb3IoYHRoZSB0aXRsZSBpcyBvdmVyICR7VElUTEVfTUFYfSBjaGFyYWN0ZXJzIFx1MjAxNCBwdXQgdGhlIHJlc3QgaW4gdGhlIG5vdGVzYCk7XG4gIGlmIChib2R5Lmxlbmd0aCA+IEJPRFlfTUFYKSB0aHJvdyBuZXcgQ2FwdHVyZUVycm9yKGB0aGUgbm90ZXMgYXJlIG92ZXIgJHtCT0RZX01BWH0gY2hhcmFjdGVyc2ApO1xuICByZXR1cm4geyB0aXRsZSwgYm9keSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2x1Z2lmeSh0aXRsZSkge1xuICBjb25zdCBzID0gdGl0bGVcbiAgICAubm9ybWFsaXplKCdORktEJylcbiAgICAucmVwbGFjZSgvW1x1MDMwMC1cdTAzNkZdL2csICcnKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1teYS16MC05XSsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9eLSt8LSskL2csICcnKVxuICAgIC5zbGljZSgwLCA1MClcbiAgICAucmVwbGFjZSgvLSskLywgJycpO1xuICByZXR1cm4gcyB8fCAnY2FwdHVyZSc7XG59XG5cbi8qKlxuICogYGluYm94LzIwMjYtMTEtMjJUMTgzMC10aGUtaWRlYS5tZGAgXHUyMDE0IHNvcnRhYmxlIGJ5IG5hbWUsIHJlYWRhYmxlIGluIGBsc2AsIGFuZCB0aGUgZGF0ZSBwYXJ0IGlzXG4gKiB3aGF0IG5leHQubWpzIGZhbGxzIGJhY2sgdG8gaWYgdGhlIGZyb250bWF0dGVyIGlzIGV2ZXIgbG9zdC4gYGF0dGVtcHRgID4gMSBhZGRzIGEgc3VmZml4IGZvclxuICogdGhlIHJhcmUgc2FtZS1taW51dGUsIHNhbWUtdGl0bGUgY29sbGlzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FwdHVyZUZpbGVuYW1lKHRpdGxlLCBub3cgPSBuZXcgRGF0ZSgpLCBhdHRlbXB0ID0gMSkge1xuICBjb25zdCBpc28gPSBub3cudG9JU09TdHJpbmcoKTsgLy8gVVRDLCBtYXRjaGluZyB0aGUgYGNhcHR1cmVkOmAgdGltZXN0YW1wXG4gIGNvbnN0IHN0YW1wID0gYCR7aXNvLnNsaWNlKDAsIDEwKX1UJHtpc28uc2xpY2UoMTEsIDEzKX0ke2lzby5zbGljZSgxNCwgMTYpfWA7XG4gIHJldHVybiBgJHtzdGFtcH0tJHtzbHVnaWZ5KHRpdGxlKX0ke2F0dGVtcHQgPiAxID8gYC0ke2F0dGVtcHR9YCA6ICcnfS5tZGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlQ29udGVudCh7IHRpdGxlLCBib2R5IH0sIG5vdyA9IG5ldyBEYXRlKCkpIHtcbiAgY29uc3QgY2FwdHVyZWQgPSBub3cudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9cXC5cXGR7M31aJC8sICdaJyk7XG4gIHJldHVybiBgLS0tXFxuY2FwdHVyZWQ6ICR7Y2FwdHVyZWR9XFxuc291cmNlOiBkYXNoYm9hcmRcXG4tLS1cXG5cXG4jICR7dGl0bGV9XFxuJHtib2R5ID8gYFxcbiR7Ym9keX1cXG5gIDogJyd9YDtcbn1cblxuLyoqIFRoZSBpdGVtIGFzIG5leHQubWpzIHdpbGwgbGlzdCBpdCwgc28gdGhlIHBhZ2UgY2FuIHNob3cgaXQgYmVmb3JlIHRoZSBuZXh0IHNuYXBzaG90LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVJdGVtKG5hbWUsIHsgdGl0bGUsIGJvZHkgfSwgbm93ID0gbmV3IERhdGUoKSkge1xuICByZXR1cm4ge1xuICAgIHNvdXJjZTogJ2ZpbGUnLFxuICAgIGZpbGU6IGBpbmJveC8ke25hbWV9YCxcbiAgICB0aXRsZSxcbiAgICB0aXRsZWQ6IHRydWUsXG4gICAgY3JlYXRlZEF0OiBub3cudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9cXC5cXGR7M31aJC8sICdaJyksXG4gICAgYm9keTogYm9keSB8fCBudWxsLFxuICB9O1xufVxuIiwgIi8vIFRoZSBBUEksIGFzIFdlYi1zdGFuZGFyZCBSZXF1ZXN0IFx1MjE5MiBSZXNwb25zZSBoYW5kbGVycywgc28gdGhlIHNhbWUgY29kZSBydW5zIHVuZGVyIHRoZSBsb2NhbFxuLy8gbm9kZTpodHRwIHNlcnZlciAoc2VydmVyL2luZGV4Lm1qcykgYW5kIGFzIE5ldGxpZnkgRnVuY3Rpb25zIChuZXRsaWZ5LykuIE5vdGhpbmcgaW4gaGVyZVxuLy8ga25vd3Mgd2hpY2ggcnVudGltZSwgd2hpY2ggc291cmNlIChsb2NhbCBjaGVja291dCBvciBHaXRIdWIpLCBvciB3aGljaCBhdXRoIGlzIGluIHVzZS5cbi8vXG4vLyAgIEdFVCAgL2FwaS9zZXNzaW9uICAgICAgICAgICAgd2hvIGlzIHNpZ25lZCBpbiwgd2hpY2ggc291cmNlLCB3aGV0aGVyIGNhcHR1cmUgaXMgcG9zc2libGVcbi8vICAgR0VUICAvYXBpL3NuYXBzaG90Wz9mcmVzaD0xXSB0aGUgcHJvZHVjZXJzJyBvdXRwdXQgKyBtZXRhZGF0YSwgY2FjaGVkIFx1MjI2NCBjYWNoZU1zXG4vLyAgIEdFVCAgL2FwaS9wbGFuP2lkPU9SQkktMTIgICAgb25lIHByb2plY3QncyBwbGFuLm1kLCByYXcgXHUyMDE0IGlkIGxvb2tlZCB1cCBpbiB0aGUgaW5kZXgsIG5ldmVyIGEgcGF0aFxuLy8gICBQT1NUIC9hcGkvaW5ib3ggICAgICAgICAgICAgIHsgdGl0bGUsIGJvZHk/IH0gXHUyMTkyIGNyZWF0ZXMgb25lIGluYm94LyBmaWxlXG4vL1xuLy8gV3JpdGVzIG5lZWQgdGhlIGBYLU9yYmV4LVJlcXVlc3Q6IDFgIGhlYWRlci4gQSBicm93c2VyIGNhbid0IHNlbmQgYSBjdXN0b20gaGVhZGVyIGNyb3NzLW9yaWdpblxuLy8gd2l0aG91dCBhIENPUlMgcHJlZmxpZ2h0LCBhbmQgbm90aGluZyBoZXJlIGFuc3dlcnMgb25lIFx1MjAxNCBzbyBhbm90aGVyIHNpdGUgY2FuJ3QgbWFrZSBhIHNpZ25lZC1pblxuLy8gYnJvd3NlciBjYXB0dXJlIG9uIGl0cyBiZWhhbGYuXG5cbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSAnLi9zbmFwc2hvdC5tanMnO1xuaW1wb3J0IHsgQ2FwdHVyZUVycm9yLCBwYXJzZUNhcHR1cmUgfSBmcm9tICcuL2NhcHR1cmUubWpzJztcblxuY29uc3QgUExBTl9GSUxFID0gL15wcm9qZWN0c1xcL1tBLVphLXpdW0EtWmEtejAtOV0qLVxcZCtcXC8ocGxhbnxyZWNvbW1lbmRhdGlvbilcXC5tZCQvO1xuZXhwb3J0IGNvbnN0IFdSSVRFX0hFQURFUiA9ICd4LW9yYmV4LXJlcXVlc3QnO1xuXG5jb25zdCBqc29uID0gKHN0YXR1cywgYm9keSwgaGVhZGVycyA9IHt9KSA9PlxuICBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoYm9keSksIHsgc3RhdHVzLCBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsICdjYWNoZS1jb250cm9sJzogJ25vLXN0b3JlJywgLi4uaGVhZGVycyB9IH0pO1xuXG4vKipcbiAqIFRoZSBwcm9kdWNlcnMnIGluYm94LyBzdXBwb3J0IGlzIG5ldyBpbiBvcmJleCAoT1JCSS05MikuIEFuIG9sZGVyIG9yYmV4IHN0aWxsIHdvcmtzIFx1MjAxNCB0aGVcbiAqIHBhZ2UganVzdCBjYW4ndCBMSVNUIGNhcHR1cmVzLCBzbyBzYXkgdGhhdCBpbnN0ZWFkIG9mIHNob3dpbmcgYW4gaW5ib3ggdGhhdCBsb29rcyBjb21wbGV0ZS5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXNlKHNuYXBzaG90KSB7XG4gIGlmIChzbmFwc2hvdD8ubmV4dCAmJiBzbmFwc2hvdC5uZXh0LmluYm94RmlsZXNFcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc25hcHNob3QubmV4dC5pbmJveEZpbGVzRXJyb3IgPSBcInRoaXMgb3JiZXggZG9lc24ndCByZWFkIGluYm94LyB5ZXQgXHUyMDE0IHVwZGF0ZSBvcmJleCB0byBzZWUgY2FwdHVyZXMgaGVyZVwiO1xuICB9XG4gIHJldHVybiBzbmFwc2hvdDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3sgc291cmNlOiB7IGtpbmQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzbmFwc2hvdCgpOiBQcm9taXNlPGFueT4sIHJlYWRUZXh0KHJlbDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+LCBjYXB0dXJlPyhlOiBhbnkpOiBQcm9taXNlPGFueT4gfSxcbiAqICAgICAgICAgICBhdXRoOiB7IGtpbmQ6IHN0cmluZywgdXNlcihyZXE6IFJlcXVlc3QpOiBQcm9taXNlPGFueT4gfSxcbiAqICAgICAgICAgICBjYWNoZU1zPzogbnVtYmVyIH19IGRlcHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwaSh7IHNvdXJjZSwgYXV0aCwgY2FjaGVNcyA9IDYwXzAwMCB9KSB7XG4gIGxldCBjYWNoZSA9IG51bGw7IC8vIHsgYXQsIHNuYXBzaG90IH1cbiAgbGV0IGluZmxpZ2h0ID0gbnVsbDtcblxuICBmdW5jdGlvbiBzbmFwc2hvdChmcmVzaCkge1xuICAgIGlmICghZnJlc2ggJiYgY2FjaGUgJiYgRGF0ZS5ub3coKSAtIGNhY2hlLmF0IDwgY2FjaGVNcykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjYWNoZS5zbmFwc2hvdCk7XG4gICAgLy8gT25lIGJ1aWxkIGF0IGEgdGltZSwgd2hvZXZlciBhc2tlZDsgYSBSZWZyZXNoIGR1cmluZyBhIGJ1aWxkIHNoYXJlcyB0aGF0IGJ1aWxkLlxuICAgIGluZmxpZ2h0ID8/PSBzb3VyY2Uuc25hcHNob3QoKVxuICAgICAgLnRoZW4oKHMpID0+IHtcbiAgICAgICAgdmFsaWRhdGUocy5uZXh0LCBzLmluZGV4KTtcbiAgICAgICAgbm9ybWFsaXNlKHMpO1xuICAgICAgICBjYWNoZSA9IHsgYXQ6IERhdGUubm93KCksIHNuYXBzaG90OiBzIH07XG4gICAgICAgIHJldHVybiBzO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHsgaW5mbGlnaHQgPSBudWxsOyB9KTtcbiAgICByZXR1cm4gaW5mbGlnaHQ7XG4gIH1cblxuICBjb25zdCByb3V0ZXMgPSB7XG4gICAgJ0dFVCAvYXBpL3Nlc3Npb24nOiBhc3luYyAoX3JlcSwgdXNlcikgPT4ganNvbigyMDAsIHtcbiAgICAgIG9rOiB0cnVlLFxuICAgICAgdXNlcixcbiAgICAgIGF1dGg6IGF1dGgua2luZCxcbiAgICAgIHNvdXJjZTogc291cmNlLmtpbmQsXG4gICAgICBuYW1lOiBzb3VyY2UubmFtZSxcbiAgICAgIGNhbkNhcHR1cmU6IHR5cGVvZiBzb3VyY2UuY2FwdHVyZSA9PT0gJ2Z1bmN0aW9uJyxcbiAgICB9KSxcblxuICAgICdHRVQgL2FwaS9zbmFwc2hvdCc6IGFzeW5jIChyZXEpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHMgPSBhd2FpdCBzbmFwc2hvdChuZXcgVVJMKHJlcS51cmwpLnNlYXJjaFBhcmFtcy5oYXMoJ2ZyZXNoJykpO1xuICAgICAgICByZXR1cm4ganNvbigyMDAsIHsgb2s6IHRydWUsIHNuYXBzaG90OiBzIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4ganNvbig1MDIsIHsgb2s6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAnR0VUIC9hcGkvcGxhbic6IGFzeW5jIChyZXEpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gbmV3IFVSTChyZXEudXJsKS5zZWFyY2hQYXJhbXMuZ2V0KCdpZCcpID8/ICcnO1xuICAgICAgbGV0IHM7XG4gICAgICB0cnkgeyBzID0gYXdhaXQgc25hcHNob3QoZmFsc2UpOyB9IGNhdGNoIChlKSB7IHJldHVybiBqc29uKDUwMiwgeyBvazogZmFsc2UsIGVycm9yOiBlLm1lc3NhZ2UgfSk7IH1cbiAgICAgIGNvbnN0IHAgPSBzLmluZGV4LnByb2plY3RzLmZpbmQoKHEpID0+IHEuaWQgPT09IGlkKTtcbiAgICAgIGlmICghcCkgcmV0dXJuIGpzb24oNDA0LCB7IG9rOiBmYWxzZSwgZXJyb3I6IGBubyBwcm9qZWN0ICR7aWR9YCB9KTtcbiAgICAgIC8vIEJlbHQgYW5kIGJyYWNlczogdGhlIGluZGV4IHByb2R1Y2VkIHRoaXMgcGF0aCwgYnV0IGl0IGlzIHN0aWxsIG5ldmVyIHRydXN0ZWQgYXMgYSBwYXRoLlxuICAgICAgaWYgKCFQTEFOX0ZJTEUudGVzdChwLmZpbGUpKSByZXR1cm4ganNvbig0MDAsIHsgb2s6IGZhbHNlLCBlcnJvcjogYHVuZXhwZWN0ZWQgcGxhbiBwYXRoICR7cC5maWxlfWAgfSk7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4ganNvbigyMDAsIHsgb2s6IHRydWUsIGlkOiBwLmlkLCBmaWxlOiBwLmZpbGUsIHRleHQ6IGF3YWl0IHNvdXJjZS5yZWFkVGV4dChwLmZpbGUpIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4ganNvbig1MDIsIHsgb2s6IGZhbHNlLCBlcnJvcjogYGNvdWxkIG5vdCByZWFkICR7cC5maWxlfTogJHtlLm1lc3NhZ2V9YCB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgJ1BPU1QgL2FwaS9pbmJveCc6IGFzeW5jIChyZXEpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlLmNhcHR1cmUgIT09ICdmdW5jdGlvbicpIHJldHVybiBqc29uKDQwNSwgeyBvazogZmFsc2UsIGVycm9yOiAndGhpcyBzb3VyY2UgaXMgcmVhZC1vbmx5JyB9KTtcbiAgICAgIGlmIChyZXEuaGVhZGVycy5nZXQoV1JJVEVfSEVBREVSKSAhPT0gJzEnKSByZXR1cm4ganNvbig0MDMsIHsgb2s6IGZhbHNlLCBlcnJvcjogYG1pc3NpbmcgJHtXUklURV9IRUFERVJ9IGhlYWRlcmAgfSk7XG4gICAgICBsZXQgZW50cnk7XG4gICAgICB0cnkge1xuICAgICAgICBlbnRyeSA9IHBhcnNlQ2FwdHVyZShhd2FpdCByZXEuanNvbigpLmNhdGNoKCgpID0+IHsgdGhyb3cgbmV3IENhcHR1cmVFcnJvcigndGhlIGJvZHkgaXMgbm90IEpTT04nKTsgfSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4ganNvbihlLnN0YXR1cyA/PyA0MDAsIHsgb2s6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH0pO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc291cmNlLmNhcHR1cmUoZW50cnkpO1xuICAgICAgICBjYWNoZSA9IG51bGw7IC8vIHRoZSBuZXh0IHNuYXBzaG90IG11c3QgaW5jbHVkZSBpdFxuICAgICAgICByZXR1cm4ganNvbigyMDEsIHsgb2s6IHRydWUsIC4uLnJlc3VsdCB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gQW4gdXBzdHJlYW0gc3RhdHVzIChHaXRIdWIncyA0MDEsIHNheSkgbXVzdCBub3QgcmVhY2ggdGhlIHBhZ2UgYXMgT1VSIDQwMSBcdTIwMTQgdGhhdCByZWFkc1xuICAgICAgICAvLyBhcyBcInlvdSdyZSBzaWduZWQgb3V0XCIuIEFueXRoaW5nIHRoYXQgaXNuJ3QgYSB2YWxpZGF0aW9uIGVycm9yIGlzIGEgYmFkIGdhdGV3YXkuXG4gICAgICAgIHJldHVybiBqc29uKGUgaW5zdGFuY2VvZiBDYXB0dXJlRXJyb3IgPyBlLnN0YXR1cyA6IDUwMiwgeyBvazogZmFsc2UsIGVycm9yOiBgY2FwdHVyZSBmYWlsZWQ6ICR7ZS5tZXNzYWdlfWAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICAvKiogUmV0dXJucyBhIFJlc3BvbnNlIGZvciAvYXBpLyogcGF0aHMsIG9yIG51bGwgZm9yIGFueXRoaW5nIGVsc2UuICovXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiBoYW5kbGUocmVxKSB7XG4gICAgY29uc3QgeyBwYXRobmFtZSB9ID0gbmV3IFVSTChyZXEudXJsKTtcbiAgICBpZiAoIXBhdGhuYW1lLnN0YXJ0c1dpdGgoJy9hcGkvJykpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJvdXRlID0gcm91dGVzW2Ake3JlcS5tZXRob2R9ICR7cGF0aG5hbWV9YF07XG4gICAgaWYgKCFyb3V0ZSkgcmV0dXJuIGpzb24oNDA0LCB7IG9rOiBmYWxzZSwgZXJyb3I6IGBubyByb3V0ZSAke3JlcS5tZXRob2R9ICR7cGF0aG5hbWV9YCB9KTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aC51c2VyKHJlcSk7XG4gICAgaWYgKGF1dGgua2luZCAhPT0gJ25vbmUnICYmICF1c2VyKSByZXR1cm4ganNvbig0MDEsIHsgb2s6IGZhbHNlLCBlcnJvcjogJ25vdCBzaWduZWQgaW4nIH0pO1xuICAgIHJldHVybiByb3V0ZShyZXEsIHVzZXIpO1xuICB9O1xufVxuXG4vKiogTG9jYWwgbW9kZTogbm8gc2lnbi1pbi4gVGhlIHNlcnZlciBpcyBib3VuZCB0byBsb29wYmFjayBpbnN0ZWFkIChzZWUgaW5kZXgubWpzKS4gKi9cbmV4cG9ydCBjb25zdCBub0F1dGggPSB7IGtpbmQ6ICdub25lJywgdXNlcjogYXN5bmMgKCkgPT4gbnVsbCB9O1xuIiwgIi8vIEdpdEh1YlNvdXJjZSBcdTIwMTQgdGhlIHdvcmtzcGFjZSBpcyBhIHJlcG8gb24gR2l0SHViLCByZWFkIHRocm91Z2ggdGhlIEFQSSAoaG9zdGVkIG1vZGUsIE9SQkktOTIpLlxuLy9cbi8vIFRoZXJlIGlzIG5vIGNoZWNrb3V0IG9uIGEgTmV0bGlmeSBGdW5jdGlvbiwgYW5kIGRvd25sb2FkaW5nIHRoZSByZXBvIHBlciByZXF1ZXN0IGlzIG91dCAodGhlXG4vLyB3b3Jrc3BhY2UgdGhpcyB3YXMgYnVpbHQgZm9yIGNhcnJpZXMgfjQ4IE1CIG9mIHNjcmVlbnNob3RzKS4gQnV0IG9yYmV4J3MgcHJvZHVjZXJzIHJlYWQgZXhhY3RseVxuLy8gZm91ciB0aGluZ3M6IHRoZSBgLm9yYmV4LXdvcmtzcGFjZWAgbWFya2VyLCBwcm9qZWN0cy8qLyhwbGFufHJlY29tbWVuZGF0aW9uKS5tZCwgQkFDS0xPRy5tZCBhbmRcbi8vIGNvbnRleHQvbWVtb3J5LyoubWQgXHUyMDE0IHBsdXMgaW5ib3gvKi5tZCBzaW5jZSBPUkJJLTkyLiBPbmUgR3JhcGhRTCBxdWVyeSBmZXRjaGVzIG9ubHkgdGhvc2UgYXNcbi8vIHRleHQsIHRoZXkncmUgd3JpdHRlbiB0byBhIHRocm93YXdheSBkaXJlY3RvcnksIGFuZCB0aGUgUkVBTCBwcm9kdWNlcnMgcnVuIHRoZXJlIHdpdGggLS1uby1naC5cbi8vIFJlLWltcGxlbWVudGluZyB0aGVtIGhlcmUgd291bGQgYmUgYSBzZWNvbmQgZnJvbnRtYXR0ZXIgcmVhZGVyIHRoYXQgY2FuIGRpc2FncmVlIHdpdGggdGhlIGZpcnN0LlxuLy9cbi8vIEdpdEh1YiBJc3N1ZXMgY29tZSBmcm9tIFJFU1QgaW5zdGVhZCBvZiBgZ2hgLCBhbmQgYXJlIG1lcmdlZCBpbiBleGFjdGx5IGFzIG5leHQubWpzIHdvdWxkLlxuLy8gQ2FwdHVyZSBpcyBvbmUgQ29udGVudHMtQVBJIGNvbW1pdCBjcmVhdGluZyBpbmJveC88ZmlsZT4ubWQgb24gdGhlIGJyYW5jaC5cbi8vXG4vLyBIb3N0ZWQgc2hvd3Mgd2hhdCdzIFBVU0hFRC4gVW5jb21taXR0ZWQgd29yayBvbiBhIGxhcHRvcCBuZXZlciBhcHBlYXJzIGhlcmUsIHNvIGBkaXJ0eWAgYW5kXG4vLyBgYmVoaW5kYCBhcmUgbWVhbmluZ2xlc3MgYW5kIHJlcG9ydGVkIGFzIGZhbHNlL251bGw7IHRoZSBoZWFkZXIgc2F5cyBcImhvc3RlZFwiLlxuXG5pbXBvcnQgeyBta2R0ZW1wLCBta2Rpciwgcm0sIHdyaXRlRmlsZSB9IGZyb20gJ25vZGU6ZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHsgdG1wZGlyIH0gZnJvbSAnbm9kZTpvcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgYnVpbGRTbmFwc2hvdEZyb21Qcm9kdWNlcnMgfSBmcm9tICcuLi9zbmFwc2hvdC5tanMnO1xuaW1wb3J0IHsgY2FwdHVyZUNvbnRlbnQsIGNhcHR1cmVGaWxlbmFtZSwgY2FwdHVyZUl0ZW0gfSBmcm9tICcuLi9jYXB0dXJlLm1qcyc7XG5cbmNvbnN0IEFQSSA9ICdodHRwczovL2FwaS5naXRodWIuY29tJztcbmNvbnN0IFBMQU5fTkFNRVMgPSBbJ3BsYW4ubWQnLCAncmVjb21tZW5kYXRpb24ubWQnXTtcblxuY29uc3QgQkxPQiA9ICcuLi4gb24gQmxvYiB7IHRleHQgaXNCaW5hcnkgfSc7XG5jb25zdCBRVUVSWSA9IGBxdWVyeSgkb3duZXI6IFN0cmluZyEsICRuYW1lOiBTdHJpbmchLCAkcmVmOiBTdHJpbmchLCAkbWFya2VyOiBTdHJpbmchLCAkYmFja2xvZzogU3RyaW5nISwgJHByb2plY3RzOiBTdHJpbmchLCAkbWVtb3J5OiBTdHJpbmchLCAkaW5ib3g6IFN0cmluZyEpIHtcbiAgcmVwb3NpdG9yeShvd25lcjogJG93bmVyLCBuYW1lOiAkbmFtZSkge1xuICAgIHJlZihxdWFsaWZpZWROYW1lOiAkcmVmKSB7IG5hbWUgdGFyZ2V0IHsgb2lkIH0gfVxuICAgIG1hcmtlcjogb2JqZWN0KGV4cHJlc3Npb246ICRtYXJrZXIpIHsgJHtCTE9CfSB9XG4gICAgYmFja2xvZzogb2JqZWN0KGV4cHJlc3Npb246ICRiYWNrbG9nKSB7ICR7QkxPQn0gfVxuICAgIHByb2plY3RzOiBvYmplY3QoZXhwcmVzc2lvbjogJHByb2plY3RzKSB7IC4uLiBvbiBUcmVlIHsgZW50cmllcyB7IG5hbWUgdHlwZSBvYmplY3QgeyAuLi4gb24gVHJlZSB7IGVudHJpZXMgeyBuYW1lIHR5cGUgb2JqZWN0IHsgJHtCTE9CfSB9IH0gfSB9IH0gfSB9XG4gICAgbWVtb3J5OiBvYmplY3QoZXhwcmVzc2lvbjogJG1lbW9yeSkgeyAuLi4gb24gVHJlZSB7IGVudHJpZXMgeyBuYW1lIHR5cGUgb2JqZWN0IHsgJHtCTE9CfSB9IH0gfSB9XG4gICAgaW5ib3g6IG9iamVjdChleHByZXNzaW9uOiAkaW5ib3gpIHsgLi4uIG9uIFRyZWUgeyBlbnRyaWVzIHsgbmFtZSB0eXBlIG9iamVjdCB7ICR7QkxPQn0gfSB9IH0gfVxuICB9XG59YDtcblxuZXhwb3J0IGNsYXNzIEdpdEh1YkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2l0aHViQ29uZmlnKGVudikge1xuICBjb25zdCByZXBvID0gZW52Lk9SQkVYX0dJVEhVQl9SRVBPID8/ICcnO1xuICBjb25zdCBtID0gcmVwby5tYXRjaCgvXihbQS1aYS16MC05LV0rKVxcLyhbQS1aYS16MC05Ll8tXSspJC8pO1xuICBpZiAoIW0pIHRocm93IG5ldyBFcnJvcignT1JCRVhfR0lUSFVCX1JFUE8gbXVzdCBiZSBvd25lci9uYW1lJyk7XG4gIGlmICghZW52Lk9SQkVYX0dJVEhVQl9UT0tFTikgdGhyb3cgbmV3IEVycm9yKCdPUkJFWF9HSVRIVUJfVE9LRU4gaXMgbm90IHNldCcpO1xuICBjb25zdCBwcmVmaXggPSAoZW52Lk9SQkVYX1dPUktTUEFDRV9QQVRIID8/ICcnKS5yZXBsYWNlKC9eXFwvK3xcXC8rJC9nLCAnJyk7XG4gIGlmIChwcmVmaXguc3BsaXQoJy8nKS5pbmNsdWRlcygnLi4nKSkgdGhyb3cgbmV3IEVycm9yKCdPUkJFWF9XT1JLU1BBQ0VfUEFUSCBtYXkgbm90IGNvbnRhaW4gLi4nKTtcbiAgcmV0dXJuIHsgb3duZXI6IG1bMV0sIG5hbWU6IG1bMl0sIHRva2VuOiBlbnYuT1JCRVhfR0lUSFVCX1RPS0VOLCBicmFuY2g6IGVudi5PUkJFWF9HSVRIVUJfQlJBTkNIIHx8IG51bGwsIHByZWZpeDogcHJlZml4ID8gYCR7cHJlZml4fS9gIDogJycgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEdpdEh1YlNvdXJjZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1JldHVyblR5cGU8dHlwZW9mIGdpdGh1YkNvbmZpZz59IGNvbmZpZ1xuICAgKiBAcGFyYW0ge3sgb3JiZXhTY3JpcHRzOiBzdHJpbmcsIGZldGNoPzogdHlwZW9mIGZldGNoLCBub0doPzogYm9vbGVhbiB9fSBvcHRzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcsIHsgb3JiZXhTY3JpcHRzLCBmZXRjaDogZmV0Y2hJbXBsID0gZmV0Y2gsIG5vR2ggPSBmYWxzZSB9KSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5vcmJleFNjcmlwdHMgPSBvcmJleFNjcmlwdHM7XG4gICAgdGhpcy5mZXRjaCA9IGZldGNoSW1wbDtcbiAgICB0aGlzLm5vR2ggPSBub0doO1xuICAgIHRoaXMua2luZCA9ICdnaXRodWInO1xuICAgIHRoaXMuYnJhbmNoID0gY29uZmlnLmJyYW5jaDtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wcmVmaXggPyBwYXRoLmJhc2VuYW1lKHRoaXMuY29uZmlnLnByZWZpeCkgOiB0aGlzLmNvbmZpZy5uYW1lO1xuICB9XG5cbiAgYXN5bmMgYXBpKHBhdGhuYW1lLCBpbml0ID0ge30pIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmZldGNoKGAke0FQSX0ke3BhdGhuYW1lfWAsIHtcbiAgICAgIC4uLmluaXQsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy50b2tlbn1gLFxuICAgICAgICBhY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViK2pzb24nLFxuICAgICAgICAneC1naXRodWItYXBpLXZlcnNpb24nOiAnMjAyMi0xMS0yOCcsXG4gICAgICAgICd1c2VyLWFnZW50JzogJ29yYmV4LWRhc2hib2FyZCcsXG4gICAgICAgIC4uLmluaXQuaGVhZGVycyxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXMuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgICAgdGhyb3cgbmV3IEdpdEh1YkVycm9yKGBHaXRIdWIgJHtyZXMuc3RhdHVzfSBvbiAke2luaXQubWV0aG9kID8/ICdHRVQnfSAke3BhdGhuYW1lLnNwbGl0KCc/JylbMF19OiAke2JvZHkubWVzc2FnZSA/PyByZXMuc3RhdHVzVGV4dH1gLCByZXMuc3RhdHVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIHJlc29sdmVCcmFuY2goKSB7XG4gICAgaWYgKCF0aGlzLmJyYW5jaCkge1xuICAgICAgY29uc3QgcmVwbyA9IGF3YWl0IChhd2FpdCB0aGlzLmFwaShgL3JlcG9zLyR7dGhpcy5jb25maWcub3duZXJ9LyR7dGhpcy5jb25maWcubmFtZX1gKSkuanNvbigpO1xuICAgICAgdGhpcy5icmFuY2ggPSByZXBvLmRlZmF1bHRfYnJhbmNoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5icmFuY2g7XG4gIH1cblxuICAvKiogVGhlIHByb2R1Y2VycycgaW5wdXRzIGFzIHsgcmVsUGF0aDogdGV4dCB9IHBsdXMgdGhlIGhlYWQgY29tbWl0LiAqL1xuICBhc3luYyBmZXRjaElucHV0cygpIHtcbiAgICBjb25zdCBicmFuY2ggPSBhd2FpdCB0aGlzLnJlc29sdmVCcmFuY2goKTtcbiAgICBjb25zdCBwID0gdGhpcy5jb25maWcucHJlZml4O1xuICAgIGNvbnN0IGV4cHIgPSAocmVsKSA9PiBgcmVmcy9oZWFkcy8ke2JyYW5jaH06JHtwfSR7cmVsfWA7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5hcGkoJy9ncmFwaHFsJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcXVlcnk6IFFVRVJZLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICBvd25lcjogdGhpcy5jb25maWcub3duZXIsIG5hbWU6IHRoaXMuY29uZmlnLm5hbWUsIHJlZjogYHJlZnMvaGVhZHMvJHticmFuY2h9YCxcbiAgICAgICAgICBtYXJrZXI6IGV4cHIoJy5vcmJleC13b3Jrc3BhY2UnKSwgYmFja2xvZzogZXhwcignQkFDS0xPRy5tZCcpLFxuICAgICAgICAgIHByb2plY3RzOiBleHByKCdwcm9qZWN0cycpLCBtZW1vcnk6IGV4cHIoJ2NvbnRleHQvbWVtb3J5JyksIGluYm94OiBleHByKCdpbmJveCcpLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgY29uc3Qgb3V0ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBpZiAob3V0LmVycm9ycz8ubGVuZ3RoKSB0aHJvdyBuZXcgR2l0SHViRXJyb3IoYEdpdEh1YiBHcmFwaFFMOiAke291dC5lcnJvcnMubWFwKChlKSA9PiBlLm1lc3NhZ2UpLmpvaW4oJzsgJyl9YCwgNTAyKTtcbiAgICBjb25zdCByID0gb3V0LmRhdGE/LnJlcG9zaXRvcnk7XG4gICAgaWYgKCFyKSB0aHJvdyBuZXcgR2l0SHViRXJyb3IoYHJlcG9zaXRvcnkgJHt0aGlzLmNvbmZpZy5vd25lcn0vJHt0aGlzLmNvbmZpZy5uYW1lfSBub3QgZm91bmQsIG9yIHRoZSB0b2tlbiBjYW4ndCByZWFkIGl0YCwgNDA0KTtcbiAgICBpZiAoIXIucmVmKSB0aHJvdyBuZXcgR2l0SHViRXJyb3IoYGJyYW5jaCAke2JyYW5jaH0gbm90IGZvdW5kYCwgNDA0KTtcbiAgICBpZiAoIXIubWFya2VyPy50ZXh0KSB0aHJvdyBuZXcgR2l0SHViRXJyb3IoYCR7cH0ub3JiZXgtd29ya3NwYWNlIG5vdCBmb3VuZCBvbiAke2JyYW5jaH0gXHUyMDE0IGlzIE9SQkVYX1dPUktTUEFDRV9QQVRIIHJpZ2h0P2AsIDQwNCk7XG5cbiAgICBjb25zdCBmaWxlcyA9IHsgJy5vcmJleC13b3Jrc3BhY2UnOiByLm1hcmtlci50ZXh0IH07XG4gICAgaWYgKHIuYmFja2xvZz8udGV4dCAhPSBudWxsKSBmaWxlc1snQkFDS0xPRy5tZCddID0gci5iYWNrbG9nLnRleHQ7XG4gICAgZm9yIChjb25zdCBkaXIgb2Ygci5wcm9qZWN0cz8uZW50cmllcyA/PyBbXSkge1xuICAgICAgaWYgKGRpci50eXBlICE9PSAndHJlZScpIGNvbnRpbnVlO1xuICAgICAgZm9yIChjb25zdCBmIG9mIGRpci5vYmplY3Q/LmVudHJpZXMgPz8gW10pIHtcbiAgICAgICAgaWYgKFBMQU5fTkFNRVMuaW5jbHVkZXMoZi5uYW1lKSAmJiBmLm9iamVjdD8udGV4dCAhPSBudWxsKSBmaWxlc1tgcHJvamVjdHMvJHtkaXIubmFtZX0vJHtmLm5hbWV9YF0gPSBmLm9iamVjdC50ZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBBIHdvcmtzcGFjZSB3aXRoIG1lbW9yeSBhbHdheXMgaGFzIGEgZGlyZWN0b3J5IGZvciBpdDsgbWFyayBpdHMgZXhpc3RlbmNlIGV2ZW4gaWYgZW1wdHksXG4gICAgLy8gYmVjYXVzZSBuZXh0Lm1qcyByZXBvcnRzIGEgTUlTU0lORyBtZW1vcnkgZGlyZWN0b3J5IGFzIGFuIGVycm9yLCBub3QgYXMgXCJub3RoaW5nIGR1ZVwiLlxuICAgIGNvbnN0IGRpcnMgPSBbXTtcbiAgICBpZiAoci5tZW1vcnkpIGRpcnMucHVzaCgnY29udGV4dC9tZW1vcnknKTtcbiAgICBmb3IgKGNvbnN0IGYgb2Ygci5tZW1vcnk/LmVudHJpZXMgPz8gW10pIHtcbiAgICAgIGlmIChmLnR5cGUgPT09ICdibG9iJyAmJiBmLm5hbWUuZW5kc1dpdGgoJy5tZCcpICYmIGYub2JqZWN0Py50ZXh0ICE9IG51bGwpIGZpbGVzW2Bjb250ZXh0L21lbW9yeS8ke2YubmFtZX1gXSA9IGYub2JqZWN0LnRleHQ7XG4gICAgfVxuICAgIGlmIChyLmluYm94KSBkaXJzLnB1c2goJ2luYm94Jyk7XG4gICAgZm9yIChjb25zdCBmIG9mIHIuaW5ib3g/LmVudHJpZXMgPz8gW10pIHtcbiAgICAgIGlmIChmLnR5cGUgPT09ICdibG9iJyAmJiBmLm5hbWUuZW5kc1dpdGgoJy5tZCcpICYmIGYub2JqZWN0Py50ZXh0ICE9IG51bGwpIGZpbGVzW2BpbmJveC8ke2YubmFtZX1gXSA9IGYub2JqZWN0LnRleHQ7XG4gICAgfVxuICAgIHJldHVybiB7IGZpbGVzLCBkaXJzLCBicmFuY2gsIG9pZDogci5yZWYudGFyZ2V0Lm9pZCB9O1xuICB9XG5cbiAgLyoqIE9wZW4gaXNzdWVzIGFzIG5leHQubWpzIGxpc3RzIHRoZW0gKGV2ZXJ5IG9wZW4gaXNzdWU7IHRoZSBsYWJlbCBpcyBhIGhpbnQpLiAqL1xuICBhc3luYyBpc3N1ZXMoKSB7XG4gICAgaWYgKHRoaXMubm9HaCkgcmV0dXJuIHsgaXRlbXM6IFtdLCBlcnJvcjogJ3NraXBwZWQgKC0tbm8tZ2gpJyB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmFwaShgL3JlcG9zLyR7dGhpcy5jb25maWcub3duZXJ9LyR7dGhpcy5jb25maWcubmFtZX0vaXNzdWVzP3N0YXRlPW9wZW4mcGVyX3BhZ2U9MTAwYCk7XG4gICAgICBjb25zdCByYXcgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbXM6IHJhdy5maWx0ZXIoKGkpID0+ICFpLnB1bGxfcmVxdWVzdCkubWFwKChpKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGFiZWxzID0gKGkubGFiZWxzID8/IFtdKS5tYXAoKGwpID0+ICh0eXBlb2YgbCA9PT0gJ3N0cmluZycgPyBsIDogbC5uYW1lKSk7XG4gICAgICAgICAgcmV0dXJuIHsgc291cmNlOiAnaXNzdWUnLCBudW1iZXI6IGkubnVtYmVyLCB0aXRsZTogaS50aXRsZSwgY3JlYXRlZEF0OiBpLmNyZWF0ZWRfYXQsIHVybDogaS5odG1sX3VybCwgbGFiZWxzLCBsYWJlbGxlZDogbGFiZWxzLmluY2x1ZGVzKCdpbmJveCcpIH07XG4gICAgICAgIH0pLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCBlcnJvcjogYGNvdWxkIG5vdCByZWFkIEdpdEh1YiBJc3N1ZXM6ICR7ZS5tZXNzYWdlfWAgfTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzbmFwc2hvdCgpIHtcbiAgICBjb25zdCBbaW5wdXRzLCBpc3N1ZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMuZmV0Y2hJbnB1dHMoKSwgdGhpcy5pc3N1ZXMoKV0pO1xuICAgIGNvbnN0IGRpciA9IGF3YWl0IG1rZHRlbXAocGF0aC5qb2luKHRtcGRpcigpLCAnb3JiZXgtbWlycm9yLScpKTtcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBkIG9mIGlucHV0cy5kaXJzKSBhd2FpdCBta2RpcihwYXRoLmpvaW4oZGlyLCBkKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICBmb3IgKGNvbnN0IFtyZWwsIHRleHRdIG9mIE9iamVjdC5lbnRyaWVzKGlucHV0cy5maWxlcykpIHtcbiAgICAgICAgYXdhaXQgbWtkaXIocGF0aC5kaXJuYW1lKHBhdGguam9pbihkaXIsIHJlbCkpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgYXdhaXQgd3JpdGVGaWxlKHBhdGguam9pbihkaXIsIHJlbCksIHRleHQpO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBuZXh0LCBpbmRleCB9ID0gYXdhaXQgYnVpbGRTbmFwc2hvdEZyb21Qcm9kdWNlcnMoeyByb290OiBkaXIsIHNjcmlwdHM6IHRoaXMub3JiZXhTY3JpcHRzIH0sIHsgbm9HaDogdHJ1ZSB9KTtcbiAgICAgIC8vIG5leHQubWpzIHJhbiBvZmZsaW5lOiByZXBsYWNlIGl0cyBcInNraXBwZWRcIiB3aXRoIHRoZSByZWFsIGlzc3VlcywgZmlsZXMgZmlyc3QgYXMgaXQgb3JkZXJzIHRoZW0uXG4gICAgICBjb25zdCBmaWxlcyA9IG5leHQuaW5ib3guZmlsdGVyKChpKSA9PiBpLnNvdXJjZSA9PT0gJ2ZpbGUnKTtcbiAgICAgIG5leHQuaW5ib3ggPSBbLi4uZmlsZXMsIC4uLmlzc3Vlcy5pdGVtc107XG4gICAgICBuZXh0LmluYm94RXJyb3IgPSBpc3N1ZXMuZXJyb3I7XG4gICAgICBjb25zdCB7IG93bmVyLCBuYW1lLCBwcmVmaXggfSA9IHRoaXMuY29uZmlnO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICBzb3VyY2U6ICdnaXRodWInLFxuICAgICAgICBnZW5lcmF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBub0doOiB0aGlzLm5vR2gsXG4gICAgICAgIGdpdDoge1xuICAgICAgICAgIHNoYTogaW5wdXRzLm9pZC5zbGljZSgwLCA3KSxcbiAgICAgICAgICBkaXJ0eTogZmFsc2UsXG4gICAgICAgICAgZ2l0aHViQmFzZTogYGh0dHBzOi8vZ2l0aHViLmNvbS8ke293bmVyfS8ke25hbWV9L2Jsb2IvJHtlbmNvZGVVUklDb21wb25lbnQoaW5wdXRzLmJyYW5jaCl9LyR7cHJlZml4fWAsXG4gICAgICAgICAgdXBzdHJlYW06IGlucHV0cy5icmFuY2gsXG4gICAgICAgICAgYmVoaW5kOiBudWxsLFxuICAgICAgICAgIGFoZWFkOiBudWxsLFxuICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICBuZXh0LFxuICAgICAgICBpbmRleCxcbiAgICAgIH07XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGF3YWl0IHJtKGRpciwgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlYWRUZXh0KHJlbCkge1xuICAgIGNvbnN0IGJyYW5jaCA9IGF3YWl0IHRoaXMucmVzb2x2ZUJyYW5jaCgpO1xuICAgIGNvbnN0IHAgPSBgJHt0aGlzLmNvbmZpZy5wcmVmaXh9JHtyZWx9YC5zcGxpdCgnLycpLm1hcChlbmNvZGVVUklDb21wb25lbnQpLmpvaW4oJy8nKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmFwaShgL3JlcG9zLyR7dGhpcy5jb25maWcub3duZXJ9LyR7dGhpcy5jb25maWcubmFtZX0vY29udGVudHMvJHtwfT9yZWY9JHtlbmNvZGVVUklDb21wb25lbnQoYnJhbmNoKX1gLCB7XG4gICAgICBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIucmF3K2pzb24nIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy50ZXh0KCk7XG4gIH1cblxuICBhc3luYyBjYXB0dXJlKGVudHJ5LCBub3cgPSBuZXcgRGF0ZSgpKSB7XG4gICAgY29uc3QgYnJhbmNoID0gYXdhaXQgdGhpcy5yZXNvbHZlQnJhbmNoKCk7XG4gICAgY29uc3QgY29udGVudCA9IGNhcHR1cmVDb250ZW50KGVudHJ5LCBub3cpO1xuICAgIGNvbnN0IGI2NCA9IGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZSguLi5uZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoY29udGVudCkpKTtcbiAgICBmb3IgKGxldCBhdHRlbXB0ID0gMTsgYXR0ZW1wdCA8PSA1OyBhdHRlbXB0KyspIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBjYXB0dXJlRmlsZW5hbWUoZW50cnkudGl0bGUsIG5vdywgYXR0ZW1wdCk7XG4gICAgICBjb25zdCBwID0gYCR7dGhpcy5jb25maWcucHJlZml4fWluYm94LyR7bmFtZX1gLnNwbGl0KCcvJykubWFwKGVuY29kZVVSSUNvbXBvbmVudCkuam9pbignLycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5hcGkoYC9yZXBvcy8ke3RoaXMuY29uZmlnLm93bmVyfS8ke3RoaXMuY29uZmlnLm5hbWV9L2NvbnRlbnRzLyR7cH1gLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAvLyBObyBgc2hhYDogR2l0SHViIHRoZW4gcmVmdXNlcyAoNDIyKSByYXRoZXIgdGhhbiBvdmVyd3JpdGUgYW4gZXhpc3RpbmcgZmlsZS5cbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IGBpbmJveDogJHtlbnRyeS50aXRsZX1gLCBjb250ZW50OiBiNjQsIGJyYW5jaCB9KSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG91dCA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICAgIHJldHVybiB7IGl0ZW06IGNhcHR1cmVJdGVtKG5hbWUsIGVudHJ5LCBub3cpLCBjb21taXR0ZWQ6IHRydWUsIGNvbW1pdDogb3V0LmNvbW1pdD8uc2hhID8/IG51bGwgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUuc3RhdHVzID09PSA0MjIpIGNvbnRpbnVlO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCBmaW5kIGEgZnJlZSBmaWxlbmFtZSBpbiBpbmJveC8nKTtcbiAgfVxufVxuIiwgIi8vIC9hcGkvKiBvbiBOZXRsaWZ5LiBUaGUgZWRnZSBnYXRlIGFscmVhZHkgcmVmdXNlZCBhbnlvbmUgbm90IHNpZ25lZCBpbjsgY3JlYXRlQXBpIGNoZWNrcyB0aGVcbi8vIHNlc3Npb24gYWdhaW4gKGRlZmVuY2UgaW4gZGVwdGggXHUyMDE0IGEgZ2F0ZSBieXBhc3NlZCBieSBhIHJvdXRpbmcgbWlzdGFrZSBtdXN0IG5vdCBvcGVuIHRoZSBBUEkpLlxuaW1wb3J0IHsgY29uZmlnRXJyb3IsIGdldEFwaSB9IGZyb20gJy4uL2xpYi5tanMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxKSA9PiB7XG4gIGxldCBhcGk7XG4gIHRyeSB7IGFwaSA9IGdldEFwaSgpOyB9IGNhdGNoIChlKSB7IHJldHVybiBjb25maWdFcnJvcihlKTsgfVxuICByZXR1cm4gKGF3YWl0IGFwaShub3JtYWxpc2UocmVxKSkpID8/IG5ldyBSZXNwb25zZSgnbm90IGZvdW5kJywgeyBzdGF0dXM6IDQwNCB9KTtcbn07XG5cbi8vIGBuZXRsaWZ5IGRldmAgKENMSSAyNy4yMCkgaGFuZHMgbm9uLUdFVCByZXF1ZXN0cyB0byB0aGUgZnVuY3Rpb24gYXMgYC9hcGkvaW5ib3gvaW5kZXguaHRtYCxcbi8vIGFmdGVyIHRyeWluZyB0aGVtIGFzIGEgc3RhdGljIGRpcmVjdG9yeS4gVW5kbyB0aGF0OyBpdCBjYW4gbmV2ZXIgYmUgYSByZWFsIEFQSSBwYXRoLlxuZnVuY3Rpb24gbm9ybWFsaXNlKHJlcSkge1xuICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcS51cmwpO1xuICBpZiAoIS9cXC9pbmRleFxcLmh0bWw/JC8udGVzdCh1cmwucGF0aG5hbWUpKSByZXR1cm4gcmVxO1xuICB1cmwucGF0aG5hbWUgPSB1cmwucGF0aG5hbWUucmVwbGFjZSgvXFwvaW5kZXhcXC5odG1sPyQvLCAnJyk7XG4gIHJldHVybiBuZXcgUmVxdWVzdCh1cmwsIHJlcSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7IHBhdGg6ICcvYXBpLyonIH07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBRUEsU0FBUyxrQkFBa0I7QUFDM0IsT0FBT0EsV0FBVTtBQUNqQixTQUFTLHFCQUFxQjs7O0FDQXZCLElBQU0sV0FBVzs7O0FDYWpCLElBQU0saUJBQWlCO0FBQzlCLElBQU0sZUFBZTtBQUNyQixJQUFNLGVBQWU7QUFDckIsSUFBTSxnQkFBZ0I7QUFFdEIsSUFBTSxNQUFNLElBQUksWUFBWTtBQUM1QixJQUFNLFNBQVMsQ0FBQyxVQUFVLEtBQUssT0FBTyxhQUFhLEdBQUcsSUFBSSxXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxPQUFPLEdBQUcsRUFBRSxRQUFRLE9BQU8sR0FBRyxFQUFFLFFBQVEsT0FBTyxFQUFFO0FBQ3ZJLElBQU0sV0FBVyxDQUFDLE1BQU0sV0FBVyxLQUFLLEtBQUssRUFBRSxRQUFRLE1BQU0sR0FBRyxFQUFFLFFBQVEsTUFBTSxHQUFHLElBQUksTUFBTSxPQUFPLEVBQUUsU0FBUyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRS9JLGVBQWUsUUFBUSxRQUFRO0FBQzdCLFNBQU8sT0FBTyxPQUFPLFVBQVUsT0FBTyxJQUFJLE9BQU8sTUFBTSxHQUFHLEVBQUUsTUFBTSxRQUFRLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLFFBQVEsQ0FBQztBQUN4SDtBQUdBLGVBQXNCLEtBQUssT0FBTyxRQUFRO0FBQ3hDLFFBQU0sT0FBTyxPQUFPLElBQUksT0FBTyxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUM7QUFDckQsUUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLEtBQUssUUFBUSxNQUFNLFFBQVEsTUFBTSxHQUFHLElBQUksT0FBTyxJQUFJLENBQUM7QUFDcEYsU0FBTyxHQUFHLElBQUksSUFBSSxPQUFPLEdBQUcs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QUlDO0FBQ0osTUFBSTtBQUFFLElBQUFBLE9BQU0sT0FBTztBQUFBLEVBQUcsU0FBUyxHQUFHO0FBQUUsV0FBTyxZQUFZLENBQUM7QUFBQSxFQUFHO0FBQzNELFNBQVEsTUFBTUEsS0FBSUMsV0FBVSxHQUFHLENBQUMsS0FBTSxJQUFJLFNBQVMsYUFBYSxFQUFFLFFBQVEsSUFBSSxDQUFDO0FBQ2pGO0FBSUEsU0FBU0EsV0FBVSxLQUFLO0FBQ3RCLFFBQU0sTUFBTSxJQUFJLElBQUksSUFBSSxHQUFHO0FBQzNCLE1BQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLFFBQVEsRUFBRyxRQUFPO0FBQ2xELE1BQUksV0FBVyxJQUFJLFNBQVMsUUFBUSxtQkFBbUIsRUFBRTtBQUN6RCxTQUFPLElBQUksUUFBUSxLQUFLLEdBQUc7QUFDN0I7QUFFTyxJQUFNLFNBQVMsRUFBRSxNQUFNLFNBQVM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicGF0aCIsICJlbnYiLCAiY29uZmlnIiwgInVzZXIiLCAiYXV0aCIsICJwYXRoIiwgImVudiIsICJjb25maWciLCAib3JiZXhTY3JpcHRzIiwgInBhdGgiLCAicGF0aCIsICJhcGkiLCAibm9ybWFsaXNlIl0KfQo=
