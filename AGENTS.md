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

Use `src/app/preview/scroll-showcase` as the design reference for the homepage and new industry and cross-industry solution pages. Preserve its typography, colors, visual components, spacing, and responsive motion behavior. The property-management feature-page skill and Rent collection pattern do not apply to these pages.

## Blog directory and article design

For blog UI work, use the `innflow-blog-design` skill when available at `/Users/ak/.codex/skills/innflow-blog-design/SKILL.md`. Read [docs/BLOG_DESIGN_PATTERN.md](docs/BLOG_DESIGN_PATTERN.md) before changing the directory, search/filter layout, article header, or author card. Preserve the approved clear artwork, smaller titles below images, audio beneath the article title, and borderless transparent author cards unless the user requests a different direction.
