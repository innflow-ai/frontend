# Innflow launch brand-reference audit

Audited the local redesign at http://localhost:3000 on September 9, 2026. No deployment was performed.

## Coverage and findings

- Crawled 537 routes discovered from local App Router pages, the sitemap, and internal links, including blog articles. No HTTP errors or crawl failures.
- Inspected rendered HTML copy, titles, descriptions, image labels, links, and redirect destinations. No Baselane branding or outgoing competitor-host links were found in the crawled HTML.
- Read-only OCR of 224 PNG/WebP assets in the design-source image folder found a remaining “Baselane Banking” screenshot and several account-opening, transfer, balance, and APY overlays used on pages.
- Viewed the embedded terms page in Chrome: it identifies 1001377163 Ontario Corporation, doing business as Innflow, and innflow.ai. Kept the existing Innflow Termly policies. This was a brand-identity check, not a legal review.

## Changes

- Removed the Baselane banking screenshot from the screening page and adjusted its callout to a single column.
- Removed the three banking overlays from the reserve-planning page and updated its explanatory caption.
- Removed account-opening and activity overlays from the industry-news page; retained the underlying photographs.
- Replaced the property-operations hero's bank-balance artwork on desktop and mobile with the supplied apartment-sky photograph.
- Renamed the global font family from “Baselane Preview Helvetica” to “Innflow Helvetica”. Font files and rendering are unchanged.
- Added scripts/audit-brand-references.mjs for repeatable route and rendered-copy checks.

## Intentional retention and limits

Ordinary uses of “baseline” in operational or blog explanations remain. Internal component names, CSS modules, BL routes, and source-asset paths remain to avoid breaking imports and URLs. Unused source images are still in the repository; they are not newly presented as Innflow product images. External article bodies and every remote CMS image were not exhaustively OCR-reviewed. The crawl covers local rendered content, not a separate production deployment.

Raw crawl results are in output/brand-audit/pages.json and images.json. Post-change checks in verification.json confirm the removed artwork is absent from affected routes. TypeScript passed; browser inspection confirmed the new property-operations hero renders correctly.
