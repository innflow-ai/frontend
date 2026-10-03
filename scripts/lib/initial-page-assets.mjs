// Count markup tags, not asset URLs embedded in RSC data.
// Modern browsers ignore nomodule scripts unless the same asset is preloaded.
export function initialPageAssets(html) {
  const assets = new Set();
  const modernAssets = new Set();
  const legacyAssets = new Set();
  const thirdPartyScripts = new Set();
  for (const [tag] of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
    const script = /^<script\b/i.test(tag);
    const src = tag.match(/\b(?:src|href)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!src) continue;
    const legacy = script && /\snomodule(?:\s|=|>)/i.test(tag);
    if (script && !legacy && /^https?:\/\//i.test(src)) thirdPartyScripts.add(src);
    if (!script && !/\brel\s*=\s*["'](?:stylesheet|preload|modulepreload)["']/i.test(tag)) continue;
    if (!/^\/_next\/static\/[^?#]+\.(?:js|css)(?:[?#].*)?$/.test(src)) continue;
    assets.add(src);
    (legacy ? legacyAssets : modernAssets).add(src);
  }
  return {
    assets,
    legacyOnly: new Set([...legacyAssets].filter((src) => !modernAssets.has(src))),
    thirdPartyScripts: [...thirdPartyScripts],
  };
}
