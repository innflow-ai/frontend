# Innflow home and property landing design

## Target

Primary visual target: `refero.design - Logging in on Runey.zip`, step 1 (2732 × 20000). Live supporting reference: https://runey.app/, inspected September 5, 2026. The live reference has changed to a video hero and tabbed feature presentation; this implementation follows the ZIP's stacked feature layout.

Applies to `/` and `/property-management`. Existing shared chrome remains on the other routes. Pre-existing footer and theme-switcher edits are preserved.

## Design decisions

| Decision | Source | Implementation |
| --- | --- | --- |
| Left aligned, two-line hero | ZIP step 1 and live homepage | Poppins 600, tight tracking, 66px desktop; responsive mobile scale |
| White canvas and charcoal pill actions | Live homepage | White background, subtle borders, inset highlight on primary CTA |
| Lime glass media surrounding product | ZIP hero, live background video | Original Runey decorative media stored locally |
| Large light product panels | ZIP stacked features | Innflow-specific illustrative workspace components |
| Photographic horizontal cards | ZIP and live homepage | Four original photographic assets, new Innflow labels |
| Feature rhythm | ZIP | Label, heading, copy, checklist, product preview |
| Product content and destinations | Existing Innflow content/config | Workflow, Assistant, Knowledge, Approvals; signup, demo and pricing links |

Product interfaces are intentionally marked as illustrative previews and are not represented as live product screenshots. The source invoice UI, pricing, customer testimonials, and endorsements are not used as Innflow claims. Existing FAQ content and homepage authentication redirect are retained. Mobile navigation, preview selection, FAQ disclosure, and destination links are functional.

## Source assets

Source origin: https://runey.app/assets/. Downloaded September 5, 2026 at the user's direction. ZIP contains screenshots only; these assets were obtained from the supplied live reference.

- `hero-motion.mp4`: `hero-bg-video-3cxTEO11.mp4`
- `glass-green-yellow.webp`: `glass-green-yellow-CGpwln4t.webp` (static and reduced-motion fallback)
- `team-1.webp`: `feature-card-1-XEN3ktkc.webp`
- `team-2.webp`: `feature-card-2-6-Q0jlh_.webp`
- `team-3.webp`: `feature-card-3-DWiT0-Nm.webp`
- `team-4.webp`: `feature-card-4-CYVr_AKg.webp`

Delivery branch: `0.1.29`, prepared for GitHub review under Ari’s account. Branch publication is separate from merging or production deployment.

## Verification

- TypeScript check and changed-file Biome check passed.
- 16 tests passed across the new landing interactions, existing editorial header, and theme-switcher suites.
- Browser checks at 1440px, 1034px, 390px, and 320px: no document overflow. The narrow-screen preview selector spacing was corrected during QA.
- Hero preview selection, animation pause, mobile navigation and FAQ disclosure verified in the browser.
- Property landing title/metadata and existing pricing-page chrome verified.
- Original developer server was unresponsive and restarted. Local preview runs at http://localhost:3000/.
- Product screenshots are an intentional Innflow adaptation of the reference composition, not pixel-identical copies of Runey's invoice application.
