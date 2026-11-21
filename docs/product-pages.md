# Product page migration

The self-managed site supports these five canonical product routes:

- `/products/platform`
- `/products/agent-os`
- `/products/ai-agents`
- `/products/agentic-workflows`
- `/products/databases`

The checked-in Framer export is the temporary migration fallback. A published
Sanity `productPage` with the same slug takes precedence automatically.

## Content workflow

1. Export the five approved Framer CMS records to
   `scripts/data/product-pages-framer.json` with
   `scripts/export-framer-products.mjs` in the Framer agent environment.
2. Match image references to the approved Dropbox archive:

   ```sh
   npm run products:assets
   ```

   Override the archive location with `PRODUCT_ASSET_ROOT` when needed. The
   generated map stores paths relative to that root.
3. Validate the normalized content and asset gate:

   ```sh
   npm run products:import
   ```

4. After resolving every image and setting a Sanity editor token, create or
   update drafts only:

   ```sh
   SANITY_API_TOKEN=... npm run products:import -- --write
   ```

The importer uploads approved local files to Sanity, caches asset IDs, upserts
draft documents by slug, and never publishes them. Publication is a separate
manual approval step.

## Sanity setup

Validate and deploy the local Studio schema before importing:

```sh
cd sanity
npm run typecheck
npx sanity schema validate
npx sanity schema deploy
```

The revalidation webhook accepts `productPage` payloads with `slug` as either a
string or `{ "current": "..." }` and refreshes the matching route plus the
sitemap.
