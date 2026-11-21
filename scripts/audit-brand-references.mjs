import { mkdir, readdir, writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const origin = (process.env.BRAND_AUDIT_ORIGIN ?? "http://localhost:3000").replace(/\/$/, "");
const output = process.env.BRAND_AUDIT_OUTPUT ?? "output/brand-audit";
const names = /\bbaselane\b|\bbaseline\b|skylight financial|thread bank|\bfdic\b/gi;
const competitor = /baselane|baseline|thread\.bank|skylightfinancial/i;
const routes = new Set(["/"]);
async function pageRoutes(path, prefix = "") {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith("[") && !entry.name.startsWith("(")) await pageRoutes(`${path}/${entry.name}`, `${prefix}/${entry.name}`);
    if (entry.name === "page.tsx") routes.add(prefix || "/");
  }
}
await pageRoutes("src/app");
const sitemap = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(60000) }).then(r => r.text());
for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) routes.add(new URL(match[1]).pathname);
const queue = [...routes];
const results = [];
const images = new Set();
let cursor = 0;
async function worker() {
  while (cursor < queue.length) {
    const route = queue[cursor++];
    const result = { route, status: null, references: [], outgoing: [], assets: [], internalLinks: [] };
    try {
      const response = await fetch(`${origin}${route}`, { redirect: "manual", signal: AbortSignal.timeout(60000) });
      result.status = response.status;
      const location = response.headers.get("location");
      if (location) result.redirect = location;
      const content = await response.text();
      if (!(response.headers.get("content-type") ?? "").includes("text/html")) { results.push(result); continue; }
      const dom = new JSDOM(content);
      const doc = dom.window.document;
      result.title = doc.title;
      for (const el of doc.querySelectorAll("img, source")) {
        for (const attr of ["src", "srcset"]) {
          const value = el.getAttribute(attr);
          if (!value) continue;
          for (const src of attr === "srcset" ? value.split(",").map(v => v.trim().split(" ")[0]) : [value]) {
            try {
              const url = new URL(src, origin);
              const path = url.pathname === "/_next/image" ? url.searchParams.get("url") : url.origin === origin ? url.pathname : url.href;
              if (path) { images.add(path); result.assets.push(path); }
            } catch {}
          }
        }
      }
      for (const el of doc.querySelectorAll("[style]")) {
        for (const match of el.getAttribute("style").matchAll(/url\(["']?([^)'" ]+)/g)) { images.add(match[1]); result.assets.push(match[1]); }
      }
      doc.querySelectorAll("script,style,noscript,template,nextjs-portal").forEach(e => e.remove());
      const body = doc.body.textContent.replace(/\s+/g, " ").trim();
      for (const match of body.matchAll(names)) result.references.push(body.slice(Math.max(0, match.index - 110), match.index + match[0].length + 180));
      for (const el of doc.querySelectorAll("[alt],[title],meta[name=description]")) {
        const value = el.getAttribute("alt") ?? el.getAttribute("title") ?? el.getAttribute("content");
        if (value?.match(names)) result.references.push(`${el.tagName}: ${value}`);
      }
      for (const el of doc.querySelectorAll("a[href],iframe[src],form[action]")) {
        const value = el.getAttribute("href") ?? el.getAttribute("src") ?? el.getAttribute("action");
        try {
          const url = new URL(value, origin);
          if (competitor.test(url.hostname)) result.outgoing.push({ href: url.href, label: el.textContent.trim() });
          if (url.origin === origin && !url.pathname.startsWith("/_") && !/\.(?:svg|png|jpg|webp|pdf|xml|txt)$/.test(url.pathname)) {
            result.internalLinks.push(url.pathname);
            if (!routes.has(url.pathname) && routes.size < 2000) { routes.add(url.pathname); queue.push(url.pathname); }
          }
        } catch {}
      }
      dom.window.close();
    } catch (error) { result.error = error.message; }
    results.push(result);
    if (results.length % 25 === 0) console.log(`Audited ${results.length}/${queue.length} pages`);
  }
}
await Promise.all([worker(), worker(), worker()]);
await mkdir(output, { recursive: true });
await writeFile(`${output}/pages.json`, JSON.stringify({ origin, auditedAt: new Date().toISOString(), count: results.length, results }, null, 2));
await writeFile(`${output}/images.json`, JSON.stringify([...images].sort(), null, 2));
const flagged = results.filter(r => r.references.length || r.outgoing.length || r.error || r.status >= 400);
console.log(JSON.stringify({ count: results.length, imageCount: images.size, flagged: flagged.map(({assets,internalLinks,...r})=>r) }, null, 2));
