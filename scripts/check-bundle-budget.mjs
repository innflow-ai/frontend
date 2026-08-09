import { gzipSync } from "node:zlib";
import { writeFile } from "node:fs/promises";

const origin = (process.env.SITE_AUDIT_ORIGIN ?? "http://localhost:3000").replace(/\/$/, "");
const html = await fetch(origin).then((response) => {
  if (!response.ok) throw new Error(`Unable to fetch ${origin}: ${response.status}`);
  return response.text();
});

const assets = new Set();
for (const match of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.(?:js|css))"/g)) {
  assets.add(match[1]);
}

let javascriptGzipBytes = 0;
let cssGzipBytes = 0;
const files = [];
for (const path of assets) {
  const body = Buffer.from(await fetch(`${origin}${path}`).then((response) => response.arrayBuffer()));
  const gzipBytes = gzipSync(body).byteLength;
  if (path.endsWith(".js")) javascriptGzipBytes += gzipBytes;
  if (path.endsWith(".css")) cssGzipBytes += gzipBytes;
  files.push({ path, rawBytes: body.byteLength, gzipBytes });
}

const thirdPartyScripts = [...html.matchAll(/<script[^>]+src="(https?:\/\/[^"]+)"/g)].map((match) => match[1]);
const budgets = {
  javascriptGzipBytes: 120 * 1024,
  javascriptExceptionCeilingBytes: 180 * 1024,
  cssGzipBytes: 50 * 1024,
  thirdPartyScriptsBeforeConsent: 0,
};
const failures = [];
const targetMisses = [];
if (javascriptGzipBytes > budgets.javascriptGzipBytes) {
  targetMisses.push("Initial JavaScript exceeds the 120 kB target; the measured App Router framework baseline is accepted up to the documented 180 kB exception ceiling");
}
if (javascriptGzipBytes > budgets.javascriptExceptionCeilingBytes) failures.push("Initial JavaScript exceeds the 180 kB exception ceiling");
if (cssGzipBytes > budgets.cssGzipBytes) failures.push("Initial CSS exceeds 50 kB gzip");
if (thirdPartyScripts.length > budgets.thirdPartyScriptsBeforeConsent) failures.push("Third-party script loads before consent");

const report = {
  origin,
  measuredAt: new Date().toISOString(),
  javascriptGzipBytes,
  cssGzipBytes,
  thirdPartyScripts,
  budgets,
  targetMisses,
  files,
  failures,
};

if (process.argv.includes("--write")) {
  await writeFile("docs/performance-report.json", `${JSON.stringify(report, null, 2)}\n`);
}

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
