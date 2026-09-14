<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Testimonial CMS content

Before creating, importing, updating, or selecting testimonial CMS records, read [sanity/TESTIMONIALS.md](sanity/TESTIMONIALS.md). Apply its field mapping, source accuracy, reuse, and page-selection guidance.

## Product and feature pages

Use the `innflow-feature-page` skill when available. Its installed entrypoint is `/Users/ak/.codex/skills/innflow-feature-page/SKILL.md`. Use `/rent-collection` as the default pattern for all future product and feature pages. Before creating or redesigning one, read [docs/PRODUCT_FEATURE_PAGE_PATTERN.md](docs/PRODUCT_FEATURE_PAGE_PATTERN.md) and inspect the current Rent collection implementation. Preserve its section order, stacked scroll progression, image-led mobile layout, and shared components while adapting content to the feature. Do not bulk-restyle existing pages unless requested.
