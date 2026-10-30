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

Design correction: retain the Calendly-inspired homepage and the existing platform/agent design system. The hotel pivot changes positioning and workflow content within that established visual structure.

- `/`: original `ShowcaseHomepage` sequence, four-chapter scroll showcase, expandable workspace cards, agent showcase, collaboration, feature accordions, existing customer stories, integrations, and closing carousel. Hotel copy and illustrative workflows fit into those components.
- `/hotel-pms`: uses the existing `CalendlyProductPage` template, with a hotel capability rail and the connection to the agent layer.
- Nine detail pages: use that same template and its existing gradient variants, type, spacing, alternating artwork sections, FAQs, related platform pages, and closing CTA.
- Original homepage tokens, gradient artwork, button treatments, header styling, and shared `TemplateFooter` restored. Instrument Sans homepage headings retained. Hotel footer links use the existing footer layout.
- Platform, integrations, agentic workflows, Agent OS, and AI agents remain visible alongside the hotel workflow navigation.
- The 278-row source map and hotel content are retained. No new CMS records, dependencies, or backend changes.

## Assets

- Initial draft asset, no longer displayed in the revised layouts: Pexels photo 6876603, https://www.pexels.com/photo/brown-couch-in-the-hotel-lobby-6876603/ . Downloaded original service image to `public/hotel-pms/lobby.jpg`; Pexels license: https://www.pexels.com/license/ . Locally served, no runtime third-party image dependency.
- Black and white logos copied from the canonical Dropbox bold sets supplied in AGENTS.md. SVG proportions retained.
- Product workspace artwork is original HTML/CSS with explicitly illustrative records. No competitor branding or product screenshot reuse.
- The existing homepage and Calendly platform tokens and artwork are retained by explicit user direction. Shared templates own the typography, colors, spacing, and responsive behavior.

## Morning decisions

Confirm the hotel-first positioning, initial delivery scope, supplier/channel/payment partners, and the first workflow to validate with a hotel. Keep the platform and agent layer as the foundation. Decide how to handle older rental-property pages before launch and confirm rollout wording.

## Validation

- Production build and TypeScript check pass. All 1,057 existing/new static pages generated successfully.
- Full Vitest suite: 483 pass, one pre-existing failure in `baseline-lower-sections.test.tsx` (old infrastructure heading assertion). Reproduced that failure against untouched commit `09e8066` in an isolated source checkout. All changed navigation, footer, routing, and showcase tests pass.
- All 11 review routes return HTTP 200 with exactly one H1 and the correct canonical URL. Unknown hotel feature returns 404.
- Revised desktop/mobile captures confirm the original homepage shell and Calendly detail template. Keyboard showcase selection, mobile Product navigation, platform links, and reduced-motion rendering checked. No homepage horizontal overflow at 320, 390, 768, or 1440px.
- Existing local third-party consent/preload warnings remain. Apollo tracking returned 400 before declining optional cookies; no hotel-page application errors remained after verification.
- Changed-file Biome checks pass with existing specificity warnings in the reused showcase CSS.
- No production deployment or merge performed.

## Screenshots

- [Homepage desktop](../../output/playwright/hotel-home-desktop.png)
- [Homepage mobile](../../output/playwright/hotel-home-mobile.png)
- [Procurement desktop](../../output/playwright/hotel-procurement-desktop.png)
- [Procurement mobile](../../output/playwright/hotel-procurement-mobile.png)
- [Procurement showcase](../../output/playwright/hotel-procurement-showcase.png)
