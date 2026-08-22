import { mkdir, writeFile } from "node:fs/promises";

const sitemapUrl = process.env.LEGACY_SITEMAP_URL ?? "https://innflow.ai/sitemap.xml";
const response = await fetch(sitemapUrl);
if (!response.ok) throw new Error(`Unable to fetch ${sitemapUrl}: ${response.status}`);

const xml = await response.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));

function classify(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  const direct = new Map([
    ["/", ["keep", "/", "Focused property-management homepage"]],
    ["/pricing", ["keep", "/pricing", "Demo-led buying-motion page"]],
    ["/contact", ["redirect-308", "/demo", "Single approved demo path"]],
    ["/solution/property-management", ["redirect-308", "/property-management", "Approved phase-one solution route"]],
    ["/product/agentic-workflows", ["redirect-308", "/features/workflows", "Closest verified product category"]],
    ["/product/ai-agents", ["redirect-308", "/features/assistant", "Closest bounded product category"]],
    ["/product/agent-os", ["redirect-308", "/features/assistant", "Closest bounded product category"]],
    ["/legal/privacy-policy", ["keep", "/legal/privacy-policy", "Preserve approved Termly policy"]],
    ["/legal/terms-of-service", ["keep", "/legal/terms-of-service", "Preserve approved Termly policy"]],
    ["/legal/cookie-policy", ["keep", "/legal/cookie-policy", "Preserve approved Termly policy"]],
    [
      "/legal/acceptable-use-policy",
      ["keep", "/legal/acceptable-use-policy", "Preserve approved Termly policy"],
    ],
    [
      "/acceptable-use-policy",
      ["redirect-308", "/legal/acceptable-use-policy", "Use the canonical legal namespace"],
    ],
    ["/privacy", ["redirect-308", "/legal/privacy-policy", "Use the canonical legal namespace"]],
    ["/terms", ["redirect-308", "/legal/terms-of-service", "Use the canonical legal namespace"]],
    ["/cookies", ["redirect-308", "/legal/cookie-policy", "Use the canonical legal namespace"]],
    ["/legal/eula", ["keep", "/legal/eula", "Preserve approved Termly policy"]],
    ["/legal/dsar", ["keep", "/legal/dsar", "Preserve approved Termly request form"]],
  ]);
  if (direct.has(path)) return direct.get(path);

  if (path === "/blog" || path.startsWith("/blog/")) {
    return ["hold-legacy", path, "Retain on legacy surface until editorial quality and migration approval"];
  }
  if (path === "/case-study" || path.startsWith("/case-study/")) {
    return ["retire-410", "", "No attributable customer evidence approved for phase one"];
  }
  if (path === "/agent-skills" || path.startsWith("/skills/")) {
    return ["retire-410", "", "Oversized programmatic inventory excluded from phase one"];
  }
  if (path.startsWith("/solution/")) {
    return ["retire-410", "", "Unsupported vertical excluded from property-management release"];
  }
  if (path.startsWith("/templates/") || path.startsWith("/resources/")) {
    return ["retire-410", "", "Template, staging, or low-quality resource route excluded"];
  }
  if (path === "/legal/ccpa" || path.toLowerCase().includes("ccpa")) {
    return ["redirect-308", "/legal/privacy-policy", "Privacy rights are maintained in the approved privacy policy"];
  }
  if (path.startsWith("/legal/")) {
    return ["hold-legacy", path, "Legal route requires owner review before cutover"];
  }
  if (path.startsWith("/product/")) {
    return ["retire-410", "", "No verified equivalent in the focused phase-one taxonomy"];
  }
  return ["retire-410", "", "No approved phase-one route or attributable content source"];
}

const rows = urls.map((url) => {
  const [disposition, destination, rationale] = classify(url.pathname);
  return { source: url.pathname, disposition, destination, rationale };
});

const counts = Object.fromEntries(
  [...new Set(rows.map((row) => row.disposition))]
    .sort()
    .map((key) => [key, rows.filter((row) => row.disposition === key).length]),
);

const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`;
const csv = [
  ["source", "disposition", "destination", "rationale"].map(escapeCsv).join(","),
  ...rows.map((row) => [row.source, row.disposition, row.destination, row.rationale].map(escapeCsv).join(",")),
].join("\n");

await mkdir("docs", { recursive: true });
await writeFile("docs/legacy-route-inventory.csv", `${csv}\n`);
await writeFile(
  "docs/legacy-route-summary.json",
  `${JSON.stringify({ source: sitemapUrl, capturedAt: new Date().toISOString(), total: rows.length, counts }, null, 2)}\n`,
);

console.log(JSON.stringify({ total: rows.length, counts }, null, 2));
