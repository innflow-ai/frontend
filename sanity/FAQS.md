# Shared FAQ library and page selections

In the local Studio, use **FAQ library**, **FAQ sets**, and **Page FAQs**.

1. Create a question and plain-text answer in FAQ library. Paragraph breaks are retained. Tags organize the library; they do not select content for a page.
2. Create an FAQ set and select existing questions. Drag them into display order.
3. Create one Page FAQs document for the exact canonical page path, such as `/products/ai-agents` or `/rapid-rent`. Select any number of sets and drag them into order. Optionally override the section heading.
4. Publish the questions, then their sets, then the page selection when the copy is ready for the public website.

The accordion shows all questions from set one, then set two, in each set's question order. The same referenced FAQ appears once, at its first occurrence. Separate FAQ documents with similar wording are treated as different questions. Edit a shared answer once to update every placement that uses it. No automatic assignment based on tags.

Without a published page selection, existing hardcoded FAQ content remains. A published empty selection gives an empty question list. Missing/unpublished references are skipped; a CMS request failure uses existing content. Current templates may retain their section heading when the list is empty.

## Supported pages

- Shared `FigmaFeaturePage` routes (including `/products/agentic-workflows` and feature/solution routes in `src/content/feature-pages.json`).
- Shared `ProductPage` routes under `/products/[slug]`.
- `BaselaneProductPage` routes, including `/rent-collection` and `/landlord-accounting`.
- `/landlord-banking`, `/lease-agreement`, `/security-deposit-account`.
- `/skills`, `/faq`, and the `/features/[slug]` template.

New page templates must call `getPageFaqs(pagePath, fallback)` or `getPageFaqTuples(pagePath, fallback)`. Adding a Page FAQs record does not insert an accordion into a template that has none. Existing FAQ structured data uses the same resolved list as the visible accordion.

Published content uses a 60-second data-cache revalidation interval. For immediate invalidation, include `faq`, `faqSet`, and `faqPlacement` in the existing Sanity webhook filter, with projection `{_type}` and the configured signature secret. Trigger on create, update, and delete. The endpoint invalidates the shared `faqs` cache tag. Without this webhook change, timed revalidation still refreshes the content on subsequent requests.

## Agentic AI Solutions import

Source: [Figma FAQ section](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/-CMS_Template-?node-id=273-9878).

`scripts/data/agentic-ai-faqs.json` preserves eight source questions and their answer text, with source node IDs. These are editorial drafts, not verification of product capability claims. The selection covers agent behavior, building versus buying, architecture, memory, RAG, human review, and integrations/triggers. No pages are automatically assigned.

Run `node scripts/seed-agentic-ai-faqs.mjs` for a read-only dry run; add `--write` to create missing drafts. The importer uses stable IDs, reuses exact existing question matches, and never overwrites existing FAQs or sets. Repeating a completed import is a no-op.

Studio source changes and frontend source changes must be deployed through their existing release workflows before they appear in hosted interfaces. Importing draft content alone does not publish it or deploy either application.
