import { writeFile } from "node:fs/promises";

const origin = (process.env.SITE_AUDIT_ORIGIN ?? "http://localhost:3000").replace(/\/$/, "");
const expectedRoutes = [
  "/",
  "/property-management",
  "/features/workflows",
  "/features/assistant",
  "/features/communications",
  "/features/website",
  "/integrations",
  "/pricing",
  "/demo",
  "/privacy",
  "/terms",
  "/cookies",
  "/legal/eula",
  "/legal/dsar",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
];

const results = [];
const internalLinks = new Set(expectedRoutes);
const failures = [];

for (const route of expectedRoutes) {
  const response = await fetch(`${origin}${route}`, { redirect: "manual" });
  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.text();
  const html = contentType.includes("text/html");
  const title = html ? body.match(/<title>(.*?)<\/title>/)?.[1] : undefined;
  const description = html
    ? body.match(/<meta name="description" content="([^"]+)"/)?.[1]
    : undefined;
  const canonical = html
    ? body.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
    : undefined;
  const h1Count = html ? (body.match(/<h1[ >]/g) ?? []).length : undefined;

  if (response.status !== 200) failures.push(`${route}: HTTP ${response.status}`);
  if (html && !title) failures.push(`${route}: missing title`);
  if (html && !description) failures.push(`${route}: missing description`);
  if (html && !canonical) failures.push(`${route}: missing canonical`);
  if (html && h1Count !== 1) failures.push(`${route}: expected one H1, found ${h1Count}`);

  if (html) {
    for (const match of body.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (href.startsWith("/") && !href.startsWith("/_next/")) {
        internalLinks.add(href.split("#")[0].split("?")[0] || "/");
      }
    }
  }

  results.push({ route, status: response.status, title, description, canonical, h1Count });
}

for (const route of internalLinks) {
  const response = await fetch(`${origin}${route}`, { redirect: "manual" });
  if (![200, 307, 308].includes(response.status)) {
    failures.push(`internal link ${route}: HTTP ${response.status}`);
  }
}

const previewChecks = [
  ["/features/communications", "Preview"],
  ["/features/website", "Preview"],
];
for (const [route, label] of previewChecks) {
  const body = await fetch(`${origin}${route}`).then((response) => response.text());
  if (!body.includes(label)) failures.push(`${route}: missing ${label} label`);
}

const report = {
  origin,
  auditedAt: new Date().toISOString(),
  routes: results,
  internalLinkCount: internalLinks.size,
  failures,
};

if (process.argv.includes("--write")) {
  await writeFile("docs/site-audit-report.json", `${JSON.stringify(report, null, 2)}\n`);
}

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
