import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { canonicalPathIssue } from "./lib/canonical-path.mjs";

const origin = new URL(process.env.SITE_AUDIT_ORIGIN ?? "http://localhost:3000").origin;
const timeout = Number(process.env.SITE_AUDIT_TIMEOUT_MS ?? 30000);
const results = [];
const failures = [];
const requests = new Map();
const links = new Set();
// Targeted mode checks only the requested paths and their redirect destinations.
const requestedPaths = process.env.SITE_AUDIT_PATHS?.split(",").map((path) => path.trim()).filter(Boolean);
const excluded = (path) => path === "/" || /^\/(?:preview|component-lab|api|_next)(?:\/|$)/.test(path);

async function discover(directory, segments = []) {
  const routes = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (/^[\[_@]/.test(entry.name)) continue;
      const path = entry.name.startsWith("(") ? segments : [...segments, entry.name];
      routes.push(...await discover(join(directory, entry.name), path));
    } else if (/^page\.(tsx?|jsx?)$/.test(entry.name)) {
      const path = `/${segments.join("/")}`;
      if (!excluded(path)) routes.push(path);
    }
  }
  return routes;
}

async function request(path) {
  if (!requests.has(path)) requests.set(path, (async () => {
    const start = Date.now();
    try {
      const response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(timeout) });
      return { status: response.status, type: response.headers.get("content-type") ?? "", location: response.headers.get("location"), body: await response.text(), elapsedMs: Date.now() - start };
    } catch (error) {
      return { status: 0, type: "", body: "", error: error.message, elapsedMs: Date.now() - start };
    }
  })());
  return requests.get(path);
}

function localPath(href) {
  try {
    const url = new URL(href.replaceAll("&amp;", "&"), origin);
    return url.origin === origin && !excluded(url.pathname) ? url.pathname : null;
  } catch { return null; }
}

async function audit(route) {
  const { status, type, body, location, elapsedMs, error } = await request(route);
  const result = { route, status, elapsedMs };
  if (error) result.error = error;
  if (status >= 300 && status < 400 && location) {
    result.redirect = location;
    const path = localPath(location);
    if (path) links.add(path);
  } else if (status !== 200) failures.push(`${route}: ${error ?? `HTTP ${status}`}`);
  else if (type.includes("text/html")) {
    result.title = body.match(/<title>(.*?)<\/title>/s)?.[1];
    result.description = body.match(/<meta name="description" content="([^"]+)"/)?.[1];
    result.canonical = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    result.h1Count = (body.match(/<h1[ >]/g) ?? []).length;
    result.noIndex = /<meta name="robots" content="[^"]*noindex/.test(body);
    if (!result.title) failures.push(`${route}: missing title`);
    if (!result.noIndex) {
      if (!result.description) failures.push(`${route}: missing description`);
      if (!result.canonical) failures.push(`${route}: missing canonical`);
      else {
        const issue = canonicalPathIssue(result.canonical, route, origin);
        if (issue) failures.push(`${route}: ${issue}`);
      }
    }
    if (result.h1Count !== 1) failures.push(`${route}: expected one H1, found ${result.h1Count}`);
    for (const match of requestedPaths ? [] : body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const path = localPath(match[1]);
      if (path) links.add(path);
    }
  }
  results.push(result);
  console.error(`[${results.length}] ${status || "ERROR"} ${route} (${elapsedMs}ms)`);
}

const routes = new Set(requestedPaths ? requestedPaths.map((path) => {
  const normalized = localPath(path);
  if (!normalized) throw new Error(`Not an in-scope inner page: ${path}`);
  return normalized;
}) : await discover("src/app"));
if (!requestedPaths) {
routes.add("/sitemap.xml");
routes.add("/robots.txt");
const sitemap = await request("/sitemap.xml");
for (const match of sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)) {
  try {
    const path = new URL(match[1]).pathname;
    if (!excluded(path)) routes.add(path);
  } catch { failures.push("sitemap.xml: invalid URL"); }
}
}
async function batch(paths) {
  const queue = [...paths];
  await Promise.all(Array.from({ length: 2 }, async () => {
    while (queue.length) await audit(queue.shift());
  }));
}
await batch(routes);
let remaining = [...links].filter((path) => !routes.has(path));
while (remaining.length) {
  remaining.forEach((path) => routes.add(path));
  await batch(remaining);
  remaining = [...links].filter((path) => !routes.has(path));
}
// A redirect's status alone cannot prove that its destination works.
for (const start of results.filter((item) => item.redirect)) {
  const seen = new Set([start.route]);
  let destination = localPath(start.redirect);
  while (destination) {
    if (seen.has(destination)) { failures.push(`${start.route}: redirect loop`); break; }
    seen.add(destination);
    const response = await request(destination);
    if (response.status >= 300 && response.status < 400 && response.location) destination = localPath(response.location);
    else break;
  }
}
const report = { origin, auditedAt: new Date().toISOString(), scope: "Public inner pages; homepage and preview/lab routes excluded", routes: results.sort((a, b) => a.route.localeCompare(b.route)), failures };
const outputPath = requestedPaths ? "docs/inner-page-targeted-audit-report.json" : "docs/inner-page-audit-report.json";
if (process.argv.includes("--write")) await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(process.argv.includes("--json") ? report : {
  origin, auditedAt: report.auditedAt, scope: report.scope,
  checked: results.length, failures,
  report: process.argv.includes("--write") ? outputPath : undefined,
}, null, 2));
if (failures.length) process.exitCode = 1;
