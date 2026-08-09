# Route inventory

## Implemented public routes

| Route | Purpose | Status boundary |
| --- | --- | --- |
| `/` | Property-operations homepage | Implemented |
| `/property-management` | ICP and operating-model overview | Implemented |
| `/features/workflows` | Visual workflow capability | Available category |
| `/features/assistant` | Bounded assistant capability | Available category |
| `/features/communications` | Communication workflow concept | Preview |
| `/features/website` | Generated-site concept | Preview |
| `/integrations` | Connector evidence and validation boundary | Implemented |
| `/pricing` | Demo-led buying motion without unapproved prices | Implemented |
| `/demo` | Workflow qualification and contact handoff | Implemented |
| `/privacy`, `/terms`, `/cookies` | Current approved Termly policy sources | Implemented |
| `/legal/eula`, `/legal/dsar` | Current EULA and privacy-request source | Implemented |

Generated discovery assets include `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/llms.txt`, `/opengraph-image`, and `/icon.svg`.

## Current handoff destinations

- Login: `https://app.innflow.ai/login`
- Signup: `https://app.innflow.ai/signup`
- Demo: local `/demo` qualification page
- Contact fallback: `mailto:support@innflow.ai`

## Legacy inventory

The fresh live sitemap inventory captured August 9, 2026 contains 383 URLs. Every URL has an explicit proposed disposition in `legacy-route-inventory.csv`:

- keep: 4
- redirect with 308: 8
- hold on the legacy origin pending editorial/traffic review: 351
- retire with 410 after approval: 20

The blog family is intentionally held rather than copied or blanket-redirected. Deployment and cutover still require owner approval and traffic/backlink review.
