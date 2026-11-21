# Apps and integrations CMS

The `/integrations` directory and `/integrations/[slug]` detail pages read published `integration` documents from Sanity. The shared detail template creates a page for each published record with **Show in directory** enabled and a slug. New integrations do not require a new route file.

## Field mapping

| Sanity field | Website placement |
| --- | --- |
| Name | Directory card, detail title, breadcrumbs, related cards |
| Slug | `/integrations/{slug}` URL |
| Logo | Directory card and detail sidebar |
| Category | Directory filter, card label, detail sidebar, related-page ordering |
| Short description | Directory summary and detail introduction |
| Overview | “About this connection” section; omitted when empty |
| Use cases | Repeated title and description sections under “What you can do” for available integrations or “Planned use cases” otherwise |
| Status | Availability badge, filter, explanatory text, and contact CTA wording |
| Status note | Additional public information in the availability panel |
| Vendor website | “Visit {name}” link; omitted when empty |
| SEO title / SEO description | Page metadata, with name and short-description fallbacks |
| Show in directory | Controls both directory visibility and public detail-page availability |
| Import source ID | Internal import identity; not displayed |

## Publishing an integration

1. Open the **Integration** collection in Sanity Studio and create a record.
2. Fill in the name, generate a unique slug, add the logo and short description, and select a category.
3. Add the overview, use cases, vendor URL, and any public setup or roadmap notes.
4. Set the correct availability. Use **Available** only when the Innflow connection has been verified to work. New records default to **Planned**.
5. Enable **Show in directory** and publish. Drafts are not displayed.
6. Check `/integrations` and `/integrations/{slug}`. Keep established slugs stable to preserve existing links.

## Categories

Categories are separate `integrationCategory` documents referenced by integrations. The directory derives its filter list from categories used by listed integrations, so unused categories do not create empty filters.

The current collection has four populated categories: Communication, Knowledge & documents, Data & reporting, and Project management. Reuse these when appropriate. For a new category, create and publish its title and unique slug in **Integration category**, then assign it to the integration and publish that record.

## Refresh behavior

Queries and pages use a 60-second revalidation interval. After that interval, a request can trigger refresh; this is not a guaranteed immediate publication deadline. The signed `/api/revalidate/sanity` webhook also supports integration and category changes, invalidating the directory, detail pages, and sitemap when configured in Sanity with the matching server secret.

## Implementation

- Schema: `sanity/schemaTypes/integrationType.ts`
- Published queries: `src/lib/integrations.ts`
- Directory: `src/app/integrations/page.tsx`
- Detail template: `src/app/integrations/[slug]/page.tsx`
- Search and category filters: `src/components/integration-directory.tsx`
- Sitemap: `src/app/sitemap.ts`

The existing seed script is for importing missing initial records, not ongoing editorial updates. Use Studio for existing records.
