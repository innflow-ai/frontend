# Property-management product and feature page pattern

Scope: This guide applies to property-management product and feature pages only. The homepage and new industry pages follow the scroll-showcase design, as clarified on September 24, 2026.

The user designated `/rent-collection` as the default design pattern for property-management product and feature pages on September 12, 2026. Use the current implementation as the visual reference. Apply this pattern when creating or intentionally redesigning a page; this decision does not require an immediate rewrite of every existing page.

## Page sequence

1. **Full-width photographic hero.** A single H1 states the main benefit, followed by concise supporting copy, the shared Continue with Google button, and the terms/privacy disclaimer. Use the cream button variant shown on Rent collection and the navbar's responsive button sizing. Keep the image edge-to-edge across the viewport and at the top of the hero.
2. **Benefit-led introduction and feature story.** A short H2 introduces the feature. Use typically four primary feature sections, with the count adjusted to the feature. Each contains a small category label, a concise benefit heading, supporting copy, and a relevant product visual. Adjust the subjects to the page rather than copying Rent collection's wording.
3. **Three to six supporting points.** A clearly defined, compact feature grid follows the main sections. These are supporting benefits for the page as a whole, not three to six additional subsections inside every panel.
4. **Shared post-feature CTA.** Use `ProductHeadspaceCta` after the feature scroll and supporting points, before testimonials. It uses the beach-and-hammock photograph and copy from CMS Template node `3:273`, with the shared Google signup and demo destinations. Keep this placement in both desktop and mobile flow.
5. **Shared CMS testimonials.** Place selected testimonial cards immediately above FAQs, with a centered section heading. Reuse Sanity references and the shared card interaction. Do not bring back the former “See the work in a new light” process-card section alongside testimonials.
6. **Feature-specific FAQs.**
7. **Shared site footer.**

The user refined the pattern after the initial Rent collection review: use typically four sections, then three to six supporting points. The current route's three panels are not the required count for future pages. The shared lifestyle CTA is now part of the product and feature page sequence, as requested on September 14, 2026.

The extra promotional band is off on the canonical Rent collection route. Do not add it by default to a new page.

## Visual language

- Before selecting a MidJourney image, check `/Users/ak/Downloads/midjourney_session/asset-register.csv`. Reserve selected files using `<Page title>/<Page title>-Hero.png` for heroes and update the register with the page, role, file hash, and Figma destination. Do not reuse assigned assets across pages without an explicit decision. Accounting's selected banner is stored at `Accounting/Accounting-Hero.png`.
- Start every new hero with a banner from the user-generated MidJourney collection at `/Users/ak/Downloads/midjourney_session`. Review the actual images for lifelike appearance, feature relevance, copy space, and desktop/mobile crops. Prefer the user's explicit selection; otherwise choose a suitable first draft that can be replaced during review. Keep product illustrations as separate editable layers. For the Accounting Figma draft, the selected banner is `Photorealistic_candid_lifestyle_photograph._A_Latino_man_in_h_947e502c-a368-4d95-9707-b74df6693b6c_0.png`.
- Navy and cream surfaces, full-width photography, rounded feature/card containers, and restrained line icons.
- Spacious separation between sections; compact text blocks inside them. The page should feel easy to absorb one section at a time.
- Match the current shared typography. Use small monospace navigation/category labels and fine dividers. Apply the compact tablet-style feature typography to desktop too.
- The hero is the only H1. Main section headings are H2s; individual feature headings are H3s. A centered testimonial heading remains an H2.
- Use matching stroke icons from the existing category and shared Google CTA components. Avoid introducing an unrelated icon style or button size.

## Scroll behavior

On desktop, use the stacked ScrollStory pattern from Rent collection: every feature panel exists in the page and stays visible. The sidebar's active item and progress rails update as the visitor scrolls. Dividers separate the items. Sidebar links navigate to their corresponding panels.

Do not replace this with the default slide-swapping ScrollStory mode used by other older pages. Keep the progression reversible when scrolling upward, and respect reduced-motion preferences.

## Mobile behavior

- For the Accounting-style layered hero, the user uses Kie AI's `seedream/5-pro-layer-decomposition` to extract a foreground cutout. Follow the Baselane skill's `references/hero-layer-decomposition.md`. Stack original photograph → editable product cards → foreground cutout, and review in Figma before export. Keep the photo and cutout aligned under the same responsive crop; store derived layers alongside the assigned page hero.
- Keep the hero photo edge-to-edge. Choose a deliberate focal point for each photo so the subject survives the narrow crop; do not blindly reuse Rent collection's right-side focal position for unrelated images.
- Use a prominent linear blur/gradient transition into the hero copy, with a slight overlap between the image and text. Keep the heading, subheading, and disclaimer compact and legible.
- Give feature-panel imagery more of the card than the text. Follow the same image-to-copy gradient/blur treatment, compact headings and body copy, and reduced product-preview padding used on Rent collection.
- Preserve the mobile static section navigation and normal vertical flow. Do not force desktop sticky progression onto a narrow viewport.
- Test testimonial swipe/overflow and tap-to-expand behavior, as well as desktop hover and keyboard access.

## Reuse and content

For hero and section artwork, use the `baselane-feature-page` skill at `/Users/ak/.codex/skills/baselane-feature-page/SKILL.md`. Most features already have component groups: inventory the matching feature group and existing BL Components first, then reuse or adapt those components. Recreate the feature-specific composition or missing components where needed; do not rebuild the library from scratch or reuse Rent collection artwork merely because its layout fits.

Before implementation, map each page's hero component(s), typically four section components, three to six supporting points, selected testimonial references/order, and FAQs. Track which artwork already exists and which needs adaptation or creation.

Assemble page-specific imagery and layered visuals locally, one page at a time. Reuse established layouts as a small family of templates emerges; reconsider a general asset CMS after roughly five useful templates exist. Testimonials already belong in Sanity and remain shared across pages.

Carry over the design system and interactions, while writing feature-specific content and choosing relevant images. Audience counts, customer quotes, statistics, and sample records on a reference page are not universal template content. Follow `sanity/TESTIMONIALS.md` and the claim-verification guidance for actual entries.

For marketing pages outside `/products/`, add an explicit page selection to the testimonial placement schema and connect that path when needed. For `/products/` pages, use their existing Testimonials reference field.

## Implementation references

Build the missing pages represented in the current navbar as complete Figma drafts first, then implement them as standalone Innflow Web routes using the shared page pattern. Maintain a mapping of navbar label, intended route, Figma frame, and assigned assets. During implementation, replace retired destinations in both desktop and mobile navigation and verify each link resolves to the intended new page. A completed Figma frame is a design handoff, not evidence that its route or navigation links are implemented.

- `src/app/rent-collection/page.tsx`: canonical route configuration.
- `src/components/baselane-product-page.tsx`: section order and composition.
- `src/components/baselane-product-page.module.css`: Rent collection's scoped responsive styles.
- `src/components/baselane-product-content.ts`: page-specific copy and image selection.
- `src/components/scroll-story.tsx` and its CSS module: stacked progression and fallback behavior.
- `src/components/google-cta-content.tsx` and `google-cta.module.css`: shared Google button and cream variant.
- `src/components/page-testimonials.tsx`, `testimonial-cards.tsx`, and its CSS module: CMS selection and cards.

Some of the canonical behavior is currently conditional on `kind === "rent-collection"`. Adding a new content entry alone does not apply all of these styles. When extending the template, deliberately share those behaviors through an explicit reusable variant rather than copying the whole page or silently restyling older routes.

## Review before finishing

Compare the new page with Rent collection at desktop, tablet, and mobile widths. Confirm section order, image focal points, readable overlays, compact text, generous spacing, sidebar progression, mobile overflow, CTA destinations, testimonial selection, and FAQ content. Keep changes scoped to the requested page and shared improvements it actually needs.

## Shared feature testimonials

All feature and product templates use `FeatureTestimonials` immediately after
`ProductHeadspaceCta` and before FAQs. This shared section reads the first four
valid records, in order, and the heading from the existing `/rent-collection`
Page testimonials selection. Edit that one CMS selection to update this section
across feature pages; do not duplicate testimonial records or page placements.
This shared selection supersedes page-specific testimonial selection for these
templates. Existing page-specific CMS records remain available for other uses.
The heading is CMS-authored; any audience count must remain supported by the
team's source material.
