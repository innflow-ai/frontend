# Product page design rotation

The 16 destinations in `allProductColumns` use the five Calendly references from [Paper](https://app.paper.design/file/01M3DS96VV117HSPX5SSGYFQCX/p-1-0), repeating in column order. The shared renderer adapts their rounded gradient heroes, serif section headings, split capability sections, artwork panels, horizontal feature cards, and related-product strip to existing Innflow content.

Paper artboards: AI Assistant `1-0`, Scheduling `EJ-0`, Notetaker `F6-0`, Contacts `FT-0`, Payments `GG-0`. Hero SVGs are local assets in `public/brand/calendly`. Artwork remains Innflow artwork.

| Route | Reference |
| --- | --- |
| /platform | Assistant |
| /integrations | Scheduling |
| /products/agentic-workflows | Notetaker |
| /products/agent-os | Contacts |
| /products/ai-agents | Payments |
| /products/agent-studio | Assistant |
| /skills | Scheduling |
| /files-and-documents | Notetaker |
| /features/website | Contacts |
| /products/databases | Payments |
| /platform/agentic-automation | Assistant |
| /platform/self-learning | Scheduling |
| /platform/evaluations | Notetaker |
| /platform/analytics-and-observability | Contacts |
| /platform/deployment-options | Payments |
| /platform/security-and-compliance | Assistant |

## Content and behavior

The adapters retain existing CMS product introductions, capability cards, details, points, anchors, closing copy, and CTA destinations. Feature pages retain their panel copy and layered artwork. Platform pages retain their capability content and directory. Integration search/filtering and the Skills library remain their original interactive components. FAQ content and testimonial selections retain their existing sources.

The shared page owns its closing CTA, so the global duplicate CTA is suppressed on these routes. Other routes keep their current renderers. The rotation test compares the complete destination list directly with the Product directory to catch omissions.

## Validation

- Production build and TypeScript check passed.
- Rotation and content-preservation tests passed.
- All 16 destinations returned HTTP 200 and the expected rotating style.
- No broken main-content images, missing internal anchors, or duplicate main-content IDs.
- No document overflow at 320, 390, 768, and 1440 pixels.
- Integration search/availability filtering, Skills search, and FAQ expansion checked in the browser.
- Browser evidence and structured results: `output/playwright/calendly-*`.

Changes are local and have not been deployed.
