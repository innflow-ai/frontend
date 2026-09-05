# Website UI coverage — 2026-09-05

This is a local implementation audit, not a production-release approval.

## Current route sweep

28 routes rendered at 1440px and 390px. Each had one H1 and no unresolved main-content fragment links. No page-level horizontal overflow remained except the Skills category rail; its width constraint was then corrected and rechecked separately at 320, 390, 768, and 1440px.

Routes: `/`, `/contact`, `/pricing`, `/faq`, `/integrations`, `/property-management`, `/features/workflows`, `/features/assistant`, `/features/communications`, `/features/website`, `/products/platform`, `/products/agent-os`, `/products/agent-studio`, `/products/ai-agents`, `/products/agentic-workflows`, `/products/databases`, `/skills`, `/skills/1-1-conversation-planner`, `/blog`, `/blog/10-best-practices-for-ai-workflow-security`, `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`, `/legal/acceptable-use-policy`, `/legal/eula`, `/legal/dsar`, `/platform`, `/platform/evaluations`.

The off-screen homepage portfolio descriptions belong to its horizontal carousel; the document itself did not overflow. This sweep verifies geometry and anchor existence, not every image, claim, interaction, or CMS record.

## Completed improvements with browser evidence

| Area | Implemented and checked |
| --- | --- |
| Homepage | Hero height, headline rhythm, image layering, mobile spacing, and initial readability; desktop/mobile screenshots in `output/playwright/` |
| Pricing | Plan hierarchy, billing states, comparison scrolling, responsive cards, and dark surfaces |
| Contact | Responsive hero spacing and readable form layout; user-approved visual direction retained |
| Agent OS / Studio | Centered heroes, capability mosaics, anchored details, responsive reading column; local Studio assets and navigation entries |
| Blog / Skills | Search/filter hierarchy; Skills rail bounded to mobile width |
| FAQ | Questions precede secondary support on mobile; readable answers and keyboard disclosure |
| Shared navigation | Mobile focus/scroll handling; login modal focus containment, Escape, restoration, backdrop dismissal, short-screen fit |
| Theme loading | Root-only expected theme attribute mismatch handled; fresh homepage/pricing/FAQ loads in both saved themes produced no console errors |
| Property Management | Workflow CTA now targets its illustration rather than reloading the same page |

## Completion still unproven

### Production-mode follow-up

- Subsequent read-only review: Evaluations desktop dark detail screenshots captured for every anchored section; accuracy, datasets, and reporting visually inspected with readable headings, body text, and illustrations. Mobile section links measured only 32.8px tall / 12px type. Scoped platform stylesheet change raises them to at least 44px / 14px. All seven platform detail routes verified at 320px and 390px: minimum target >=44px, no document overflow. Evaluations dataset link reaches `#datasets`. Focused Biome passed; this change is not yet verified in a fresh production build.
- Concurrent restoration now also affects homepage hero height, layering, typography, and scrollbar visibility. Earlier homepage approval evidence does not prove this restored current variant. Preserve the restoration until the user clarifies the desired baseline; do not silently reapply prior hero/global changes.

- Lower-page review found washed-out dark control cards and a white-on-white `.button-light` closing CTA. Scoped token fixes passed Biome and TypeScript, but concurrent edits subsequently restored the old rules in `globals.css` (the fixes remain in the Git index). Browser verification confirmed the current dark CTA is still white on white. Do not count those fixes as currently applied or restore over the concurrent changes without coordination. The preview was also navigated away during verification.

- Latest production build completed successfully (497 generated pages); 20 test files / 90 tests passed.
- Separate production server on port 3001: all four `/features/*` routes and all seven `/platform/*` detail routes checked at a 390px mobile viewport in saved dark mode. No document overflow, missing decoded main-content images, unresolved main fragment links, or uncaught page exceptions. Screenshots saved as `output/playwright/production-dark-*.png`; these are hero captures, not full-page visual approval.
- Viewed workflow and security hero captures: readable dark text hierarchy and controls. Feature breadcrumbs unnecessarily repeated the long headline; changed the shared feature route to use its concise feature name. This last text change is newer than the production build.
- Console is not clean: existing Termly placement warnings and Apollo analytics HTTP 400 responses remain. These are distinct from the uncaught page-exception check above.

- Full-page visual/interaction review of every feature template and all seven newly added platform detail routes, including dark mode. The platform directory/details were changing during the sweep and were not edited by this pass.
- Consolidated production build and browser verification against the final combined worktree. Previous build success does not validate later edits.
- Whole-page dark-mode consistency beyond the corrected header, pricing, and sampled routes.
- Product-theme follow-up: shared product heroes, CTA contrast, light detail sections, FAQ surfaces, and feature-card backgrounds corrected for dark mode. Platform's shared soft-accent and secondary-button surfaces now use dark tokens. Agent Studio, product Platform, and Evaluations were visually sampled in dark mode. A production build passed including all seven platform routes; production-server browser QA is still pending.
- Carousel keyboard/touch behavior and all contact/demo form states should receive a final integrated review.
- Contact follow-up: invalid/whitespace input, error focus, correction, and valid-field state checked in the browser. Message requirements are explicitly described and the CTA says “Review in email.” The mailto builder has unit coverage; no actual email handoff or inquiry was submitted. Demo's contact link now describes its actual destination.
- Carousel follow-up: both homepage carousels now honor reduced motion for pointer and keyboard activation. Browser checks reached `06 / 06` and `05 / 05` on mobile with forward controls disabled at the end. Desktop counters show the visible range. Native touch scrolling still requires a physical-device check; this is not claimed from desktop emulation.
- Supplied Beam illustrations retain Beam UI and example claims; asset rights and product-claim approval are required before publishing them as production marketing material.

The broad site-wide goal remains active. No commit, push, CMS mutation, or deployment was performed by this pass.
