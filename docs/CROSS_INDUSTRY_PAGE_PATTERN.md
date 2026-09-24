# Homepage and industry page design

The scroll showcase is the design reference for the public homepage and new industry pages, as requested September 24, 2026. The Rent collection pattern and `innflow-property-management-feature-page` skill apply only to property-management feature work.

## Shared design

- `ShowcaseHomepage` serves `/` and `/preview/scroll-showcase`; the preview remains noindex and can show a layout fallback when no testimonial is selected. The public homepage does not show that fallback.
- `ShowcaseTheme` shares Geist, Manrope and Source Serif 4 with cream backgrounds, navy text and pastel product scenes.
- New industry pages use a benefit-led hero, an interactive workflow example, three industry-specific workflow sections, supporting points, FAQs and the showcase closing/footer. Mobile retains normal document flow; controls do not autoplay.
- `src/content/industries.ts` owns 26 industry and use-case entries, including the separately requested overlapping categories. Financial Services & Banking is the overview; Finance focuses on finance operations and Banking on account service. Property & Real Estate focuses on inquiries and transactions; Property Management on resident and operational work. HR & Recruitment and Talent Acquisition have distinct audiences.
- `/solutions` is the industry and use-case directory. Every category has its own `/industries/[slug]` route. `/industries` redirects to the directory. Unknown slugs return 404.
- Desktop/mobile Solutions menus, the showcase footer, and the sitemap expose all 26 routes. Product navigation remains available. Existing property pages retain their routes but no longer define the Solutions menu.

## Content

Use original, audience-specific workflows. Examples are starting points, not evidence of customer adoption or confirmed integrations. Do not invent testimonials, results, compliance certifications, or availability claims. Confirm connections and requirements for a proposed workflow during the demo.

## Verification

Check homepage and directory, all route statuses and canonicals, 404 handling, desktop/mobile navigation, workflow controls, FAQs, anchors, horizontal overflow and reduced-motion behavior. Run typecheck, a production build and the focused navigation/showcase/industry tests. Inspect the rendered output before release.
