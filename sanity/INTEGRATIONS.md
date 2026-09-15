# Integrations CMS

Project `hnjg8vum`, dataset `production`. Studio source lives in this directory; the project currently has no hosted Studio application. Run `npm run dev` here to edit the collection locally at http://localhost:3333.

`integration` documents drive `/integrations` and `/integrations/[slug]`. `integrationCategory` documents supply shared categories. Skills remain separate and unchanged.

## Editing

- Name and slug identify the vendor and URL. Keep published slugs stable to preserve links.
- Logo is a Sanity image asset. Category is a reference; publish it before the integration.
- Short description appears on the card. Overview and use cases appear on the detail page.
- Status is **Planned** by default. Use **In development** for active work and **Available** only after verifying a working Innflow connection. Planned and in-development pages label capabilities as planned and never offer a direct connect action.
- Status note adds public scope or setup context. No unconfirmed release dates.
- Turn **Show in directory** off to hide both card and detail page. Drafts do not appear on the public website. Publishing a planned entry lists it without claiming availability.
- SEO title and description are optional. Vendor website links externally. Source ID prevents duplicate imports.

## Initial content

Nine published entries: Gmail, Outlook, Slack, Microsoft Teams, Notion, Google Sheets, Google Drive, SharePoint, Zoho Projects. Four categories: Communication, Knowledge & documents, Data & reporting, Project management.

The first eight names and logo assets come from the existing website (`src/content/home.ts`, `public/integrations`). Zoho Projects comes from the user-provided Beam reference. Descriptions and proposed use cases are original Innflow copy. All nine start as Planned because the old directory did not establish verified release status. This is an initial catalog, not an import of Beam’s full catalog.

`node scripts/seed-integrations.mjs` from the repository root previews missing entries. `--write` creates them. The script uses generated document IDs, looks up source IDs and slugs across raw documents, and skips existing records, including drafts. It never replaces editorial changes. It reads the existing Sanity token from environment without printing it.

## Refresh and deployment

Website routes refresh every 60 seconds. The signed `/api/revalidate/sanity` handler also supports `integration` and `integrationCategory`; include those types in the Sanity webhook filter when deploying the website. Schema deployment does not deploy the website or create a hosted Studio.

Verify Studio types with `npm run typecheck`, and deploy the local schema with `npx sanity schema deploy --workspace default` from this directory. Website changes need their usual review and deployment before public routes change.

## Verification (2026-09-14)

Schema deployed and remotely verified; nine published records, four categories, all logos present. Website and Studio TypeScript checks passed; nine focused filtering and webhook tests passed. Browser search, category/status filters, reset, detail navigation, and desktop/mobile checks passed without horizontal overflow. Directory and detail routes return 200, unknown slug returns 404, and sitemap includes detail URLs. Static CMS logos are marked essential so declining optional tracking does not hide them. The legacy SharePoint SVG is rasterized before CMS upload because Sanity sanitization breaks its Illustrator DOCTYPE.
