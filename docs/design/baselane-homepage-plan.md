# Alternate Innflow homepage — Baselane reference

## Scope

Create a separate `/homepage-baselane` route in the existing Next.js website. Preserve `/` and all existing product routes. Use Baselane's homepage as the layout reference, with Innflow branding and accurate Innflow product content. Keep the alternate page out of the navigation and sitemap initially and set noindex metadata while it is a design preview.

Reference: https://www.baselane.com/ (review started 2026-09-07).
Asset inventory: `baselane-asset-inventory.json`, 43 user-supplied files.

## Page composition

1. Dedicated navigation following the reference's spacing and hierarchy: Innflow logo, product/solutions/resources menus, pricing, demo, login and primary CTA.
2. Large photographic hero with prominent headline and supporting copy, paired conversion actions, and generous breathing room. Proposed Innflow headline: “Property operations that give you your day back.”
3. Product introduction and tabbed navigation. Translate banking/bookkeeping into workflows/knowledge while retaining the reference's layout rhythm.
4. Two large product stories with full-width lifestyle imagery and overlapping product visuals. Use existing Innflow workflow and assistant previews until real recordings or approved screenshots are supplied.
5. Four capability cards covering connected context, workflow automation, approvals, and operational visibility.
6. An evidence section only with verified Innflow material. Baselane's press logos, ratings and customer quotes remain source references, not Innflow endorsements.
7. Three trust/support columns using supported Innflow claims and working destinations.
8. Large photographic closing CTA with demo and signup actions.
9. Dedicated footer with Innflow product, company, support and legal links.

## Asset mapping and content review

- `10k-takeovers-hero-bg.webp`: supplied full-width hero photography. Visually inspected; the $10,000 cash-deposit promotion is baked into this image. Requires a clean or Innflow-specific replacement for a branded page.
- `homepage-solutions-banking-bg-retina.webp` and mobile counterpart: lifestyle background for first product story. Desktop version visually inspected.
- `homepage-solutions-bookkeeping-bg-retina.webp` and mobile counterpart: second product-story background.
- Banking/bookkeeping `pe` desktop/mobile images: reference product composition; inspect embedded branding before placing.
- `cta-image.webp` / `cta-bg-mobile.webp`: closing CTA candidates.
- Baselane logos, press logos, testimonial portraits and third-party ratings: reference assets; use Innflow logo and verified evidence for the alternate page.
- Keep the supplied originals intact. Copy only assets actually used into a dedicated public directory.

## Implementation boundaries

- Dedicated component and CSS module so reference styling cannot leak into the current homepage.
- Route-specific header/footer handling; preserve concurrent navigation work in `RuneyChrome` and editorial components.
- Reuse current Innflow destinations, tracking conventions and accessibility patterns.
- Login must use a verified app destination; `/auth/google` currently returns 404, so do not reuse that broken URL.
- Read installed Next.js guides before route implementation.

## Capture and validation remaining

- Capture full desktop and 390 × 844 mobile reference, including navigation and product-tab states.
- Measure typography, width, spacing, image crop and responsive behavior before implementing.
- Validate each asset against its actual reference slot.
- Verify route rendering, keyboard/mobile navigation, tabs, CTA destinations, reduced-motion behavior and absence of horizontal overflow.
- Compare rendered page and source at matching viewport sizes. Run focused checks and document deviations from reference caused by Innflow content.

## Current status

Implemented locally at `/homepage-baselane` and verified in Chrome at desktop, 390px and 320px widths. The current homepage still returns 200 and its route remains unchanged. The alternate page has noindex/nofollow metadata and is not added to the sitemap or navigation.

The source nav uses #fffcf4 at 60% opacity, 15px blur, a 45px radius, and a subtle shadow. Dropdowns use 30px blur and 20px corners. The local preview uses the source Helvetica Now Display Pro regular and medium font assets consistently, including the embedded product previews.

Intentional adaptation: Innflow branding and copy, light-blue accents, existing code-built product previews instead of banking UI, and product explanations instead of Baselane testimonials or financial claims. The hero promotional overlay was removed using image generation; original assets were preserved. Press logos and banking promotions are not represented as Innflow claims.

Validation: focused lint and TypeScript passed; 9 existing homepage/chrome tests passed. Browser checks confirmed desktop dropdowns, Escape dismissal, mobile nested menus, story anchor navigation, no broken images, no page overflow at 390px and 320px, and no console errors on the new route. Normal preview viewport restored after responsive checks. Not published.
