import { readdir, writeFile, access, mkdir } from "node:fs/promises";
import { JSDOM } from "jsdom";

const origin = process.env.BL_AUDIT_ORIGIN || "http://localhost:3000";
const routes = (await readdir("src/app", { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
await mkdir("output/playwright/bl-copy", { recursive: true });
const report = [];
const texts = [];
for (const name of routes) {
  try { await access(`src/app/${name}/page.tsx`); } catch { continue; }
  const route = `/${name}`;
  const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(30000) });
  const dom = new JSDOM(await response.text());
  const document = dom.window.document;
  document.querySelectorAll("script, style, nextjs-portal").forEach((el) => el.remove());
  const main = document.querySelector("main");
  const text = document.body.textContent.replace(/\s+/g, " ").trim();
  const problems = [];
  if (response.status !== 200) problems.push(`HTTP ${response.status}`);
  if (document.querySelectorAll("h1").length !== 1) problems.push("Expected one page heading");
  if (/baselane|baseline/i.test(text)) problems.push("Competitor name in rendered copy");
  if (/design preview|reference design|original publisher|local preview journal/i.test(text)) problems.push("Implementation copy in visitor content");
  const badLinks = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((href) => /^https?:\/\/[^/]*(?:baselane|thread\.bank)/i.test(href));
  if (badLinks.length) problems.push(`Competitor destinations: ${badLinks.join(", ")}`);
  const brokenImages = [];
  for (const img of document.querySelectorAll("img")) {
    const url = new URL(img.src, origin);
    const path = url.pathname === "/_next/image" ? url.searchParams.get("url") : url.pathname;
    if (path?.startsWith("/brand/")) {
      try { await access(`public${path}`); } catch { brokenImages.push(path); }
    }
    if (/baselane|baseline/i.test(img.alt)) problems.push("Competitor name in image description");
  }
  if (brokenImages.length) problems.push(`Missing images: ${brokenImages.join(", ")}`);
  report.push({ route, status: response.status, title: document.title, heading: document.querySelector("h1")?.textContent.trim(), problems });
  texts.push(`${route}\n${main?.textContent.replace(/\s+/g, " ").trim()}\n`);
  dom.window.close();
}
await writeFile("output/playwright/bl-copy/route-audit.json", JSON.stringify({ origin, pages: report.length, report }, null, 2) + "\n");
await writeFile("output/playwright/bl-copy/rendered-copy.txt", texts.join("\n"));
const failed = report.filter((page) => page.problems.length);
console.log(JSON.stringify({ pages: report.length, failed }, null, 2));
if (failed.length) process.exitCode = 1;
