import assert from "node:assert/strict";
import { test } from "vitest";
import { initialPageAssets } from "./initial-page-assets.mjs";

test("separates nomodule scripts without silently dropping their cost", () => {
  const result = initialPageAssets('<script src="/_next/static/main.js"></script><script src="/_next/static/polyfill.js" noModule=""></script>');
  assert.deepEqual([...result.assets], ["/_next/static/main.js", "/_next/static/polyfill.js"]);
  assert.deepEqual([...result.legacyOnly], ["/_next/static/polyfill.js"]);
});

test("counts deduplicated preloads and styles, including query strings", () => {
  const result = initialPageAssets('<link rel="preload" href="/_next/static/main.js?v=1" as="script"><script src="/_next/static/main.js?v=1"></script><link href="/_next/static/site.css" rel="stylesheet">');
  assert.deepEqual([...result.assets], ["/_next/static/main.js?v=1", "/_next/static/site.css"]);
});

test("a preload makes an otherwise legacy script part of modern transfer", () => {
  const result = initialPageAssets('<script nomodule src="/_next/static/polyfill.js"></script><link rel="preload" href="/_next/static/polyfill.js" as="script">');
  assert.equal(result.legacyOnly.size, 0);
});

test("ignores embedded data and unrelated links, but reports external scripts", () => {
  const result = initialPageAssets('<script>const data = {src:"/_next/static/not-loaded.js"};</script><a href="/_next/static/download.js">Download</a><script src="https://example.com/tag.js"></script>');
  assert.equal(result.assets.size, 0);
  assert.deepEqual(result.thirdPartyScripts, ["https://example.com/tag.js"]);
});
