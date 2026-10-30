# Hotel PMS pivot review

Branch: `codex/hotel-pms-pivot-2026-10-29`

## Direction

Position Innflow around the work behind the stay: guest operations, hotel operations, and finance. Mews informs the front-office and guest journey. The recorded Inn-Flow demos inform accounting, labor, reporting, and purchasing. Inn-Flow and Innflow are distinct products; the source inventory is not evidence of capabilities in this codebase.

This is a website implementation and proposed product narrative. It does not implement a PMS backend, supplier integrations, payment processing, or accounting engines. The public-facing pages identify the platform as a preview, label sample data, and ask teams to scope their workflow. No competitor testimonials, adoption metrics, or screenshots are presented as Innflow evidence.

## Source map

`feature-map.csv` maps every master CSV row to its primary page. It preserves feature IDs, evidence levels, original source links, and timestamps. The source snapshot has 278 rows: 141 Mews and 137 Inn-Flow. Navigation-only and announced capabilities are research-only. Financing is held out. Related features are grouped into a readable workflow; mapping a row to a route does not promise every source feature on that page.

| Page | Source rows | Website emphasis |
| --- | ---: | --- |
| `/hotel-pms/front-desk` | 10 | Reservation timeline, arrivals, room readiness, groups |
| `/hotel-pms/guest-experience` | 40 | Direct booking, guest profiles, check-in, messages, service handoffs |
| `/hotel-pms/housekeeping` | 9 | Assignments, inspections, room status, maintenance |
| `/hotel-pms/accounting` | 63 | AP, bank reconciliation, guest ledger, AR, budgets |
| `/hotel-pms/procurement` | 38 | Order guides, supplier comparison, budget approvals, receiving |
| `/hotel-pms/labor` | 46 | Forecasts, shift planning, time review, productivity |
| `/hotel-pms/revenue` | 12 | Channels, rate decisions, demand and performance |
| `/hotel-pms/payments` | 26 | Deposits, folios, POS room charges, settlement |
| `/hotel-pms/portfolio` | 34 | Daily flash, hotel KPIs, drilldowns, multi-property context |

## Implemented review surface

- `/`: hotel positioning, retained four-chapter scroll showcase, three operating pillars, full module map, stacked workflow stories, consultation CTA.
- `/hotel-pms`: platform directory and independent hotel, hotel group, extended-stay positioning.
- Nine detail pages: feature-specific narrative, interactive illustrative workspace, four stacked sections, supporting points, FAQs, related workflows.
- Shared desktop/mobile navigation points into the hotel structure. Homepage and hotel routes have a hotel footer. Existing non-hotel routes are retained for a later migration decision.
- Existing approved showcase motion and stacked ScrollStory reused, including reduced-motion and mobile layouts.
- No new CMS records, testimonials, dependencies, or backend changes.

## Assets

- Hotel lobby: Pexels photo 6876603, https://www.pexels.com/photo/brown-couch-in-the-hotel-lobby-6876603/ . Downloaded original service image to `public/hotel-pms/lobby.jpg`; Pexels license: https://www.pexels.com/license/ . Locally served, no runtime third-party image dependency.
- Black and white logos copied from the canonical Dropbox bold sets supplied in AGENTS.md. SVG proportions retained.
- Product workspace artwork is original HTML/CSS with explicitly illustrative records. No competitor branding or product screenshot reuse.
- Neutral theme verified against INNFLOW_BRAND_KIT node 329:49. Homepage composition derives from the existing scroll showcase; Instrument Sans headings and Inter body.

## Morning decisions

Confirm the hotel-first positioning, initial delivery scope, supplier/channel/payment partners, and the first workflow to validate with a hotel. Decide whether to migrate or retire legacy agent and rental-property pages before any production launch. Confirm final product photography and rollout wording.

## Validation

- Production build and TypeScript check pass. All 1,057 existing/new static pages generated successfully.
- Full Vitest suite: 483 pass, one pre-existing failure in `baseline-lower-sections.test.tsx` (old infrastructure heading assertion). Reproduced that failure against untouched commit `09e8066` in an isolated source checkout. All changed navigation, footer, routing, and showcase tests pass.
- All 11 review routes return HTTP 200 with exactly one H1 and the correct canonical URL. Unknown hotel feature returns 404.
- Browser checks: desktop keyboard tab selection; normal-motion chapter selection, reverse navigation, and skip; attention filter and reset; mobile Product navigation through to Procurement with menu dismissal; FAQ expansion; reduced motion; no horizontal overflow at 320, 390, 768, and 1440px.
- Existing local third-party consent/preload warnings remain. Apollo tracking returned 400 before declining optional cookies; no hotel-page application errors remained after verification.
- Changed-file Biome checks pass with existing specificity warnings in the reused showcase CSS.
- No production deployment or merge performed.

## Screenshots

- [Homepage desktop](../../output/playwright/hotel-home-desktop.png)
- [Homepage mobile](../../output/playwright/hotel-home-mobile.png)
- [Procurement desktop](../../output/playwright/hotel-procurement-desktop.png)
- [Procurement mobile](../../output/playwright/hotel-procurement-mobile.png)
- [Procurement showcase](../../output/playwright/hotel-procurement-showcase.png)
