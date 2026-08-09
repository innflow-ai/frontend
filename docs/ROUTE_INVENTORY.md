# Route inventory

## Implemented in Phase C

| Route | Rendering | Purpose | Indexability |
| --- | --- | --- | --- |
| `/` | Static App Router page | Property-management homepage | Index when deployed and approved |
| `/robots.txt` | Generated metadata route | Crawler policy | Generated |
| `/sitemap.xml` | Generated metadata route | Current standalone route inventory | Generated |

All homepage navigation uses in-page anchors except the authenticated app login and provisional demo destination. This avoids publishing empty supporting routes.

## Proposed supporting routes (Phase D, not implemented)

- `/property-management`
- `/features/workflows`
- `/features/assistant`
- `/features/communications` (preview labeling required)
- `/features/website` (preview labeling required)
- `/integrations`
- `/pricing`
- `/demo`
- `/privacy`
- `/terms`
- `/cookies`
- `/blog` and `/blog/[slug]` only after editorial migration approval

## Current product/app handoff

- Login default: `https://app.innflow.ai/login`
- Signup default: `https://app.innflow.ai/signup`
- Demo default: pre-addressed `support@innflow.ai` email, configurable and provisional

## Legacy discovery requirement

The July 18 audit found approximately 695 Framer sitemap URLs, including 319 `/skills/` detail URLs and known staging/legacy paths such as `/automation`, `/page-2`, and `/resources/page`. A fresh export and URL-level disposition is required before cutover. This Phase C inventory does not claim full legacy parity.
