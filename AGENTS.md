<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Testimonial CMS content

Before creating, importing, updating, or selecting testimonial CMS records, read [sanity/TESTIMONIALS.md](sanity/TESTIMONIALS.md). Apply its field mapping, source accuracy, reuse, and page-selection guidance.

## Property-management product and feature pages

Use the `innflow-property-management-feature-page` skill when available. Its installed entrypoint is `/Users/ak/.codex/skills/innflow-property-management-feature-page/SKILL.md`. Use `/rent-collection` as the default pattern for property-management product and feature pages. Before creating or redesigning one, read [docs/PRODUCT_FEATURE_PAGE_PATTERN.md](docs/PRODUCT_FEATURE_PAGE_PATTERN.md) and inspect the current Rent collection implementation. Preserve its section order, stacked scroll progression, image-led mobile layout, and shared components while adapting content to the feature. Do not bulk-restyle existing pages unless requested.

## Homepage and cross-industry pages

Use `src/app/preview/scroll-showcase` as the design reference for the homepage and new industry and cross-industry solution pages. Preserve its composition, visual components, spacing, and responsive motion behavior. For newly styled work follow the current brand guidance below; homepage headings use Source Serif 4 by user direction on 2026-10-30. The property-management feature-page skill and Rent collection pattern do not apply to these pages.

## Blog directory and article design

For blog UI work, use the `innflow-blog-design` skill when available at `/Users/ak/.codex/skills/innflow-blog-design/SKILL.md`. Read [docs/BLOG_DESIGN_PATTERN.md](docs/BLOG_DESIGN_PATTERN.md) before changing the directory, search/filter layout, article header, or author card. Preserve the approved clear artwork, smaller titles below images, audio beneath the article title, and borderless transparent author cards unless the user requests a different direction.

## Current visual direction (2026-10-29)

Use [the current brand guidelines](docs/design-tokens/innflow-brand/BRAND-GUIDELINES.md) and `innflow-design-v2`, sourced from Figma frame `328:5`. New shared UI uses Inter, Instrument Serif display, JetBrains Mono, neutral actions, and the documented component corner roles. Homepage headings use Source Serif 4 by explicit user choice on 2026-10-30, superseding the earlier Instrument Sans exception. Preserve existing page layouts, reference artwork, and responsive interactions. Older Calendly, cream/Baselane, and homepage token extractions record implementation history and do not override this source. Apply changes within the requested scope; this guidance does not itself restyle existing pages.
Use strong headings with compact supporting copy: normally 16px body, 14px card
copy, and 12px metadata, with readable line height. Do not enlarge all supporting
text to match headings or shrink article prose and form controls indiscriminately.

Never add decorative numbered section labels, eyebrows, or feature-card badges
such as 01, 02, 03. Use descriptive titles or meaningful icons. This does not
remove real numeric data, dates, prices, pagination, or numbers within authored
content where they carry meaning.
