# Redirect matrix draft

No redirects are active. This matrix is a Phase A/C planning artifact and must be expanded from a fresh Framer sitemap before cutover.

| Legacy route/family | Proposed destination | Status | Notes |
| --- | --- | --- | --- |
| `/` | `/` | Keep | Homepage replacement after approval |
| `/property-management` and equivalent validated solution URL | `/property-management` or `/` | Decide in Phase D | Preserve only if source intent and content quality warrant it |
| `/products/workflows` | `/features/workflows` | Proposed 301 | Build destination first |
| `/products/ai-agent` | `/features/assistant` | Proposed 301 | Remove unsupported autonomy claims |
| `/products/tables` | Future approved feature/context page | Unresolved | Do not redirect to an unrelated page |
| `/products/trigger` | `/features/workflows` | Proposed 301 | Preserve relevant workflow intent |
| `/automation` | No direct replacement | Review/remove | Audit identifies legacy Aurius content |
| `/page-2` | No replacement | Proposed 410 | Staging/test route; confirm no links or traffic |
| `/resources/page` | No replacement | Review | Keep only if given a real purpose |
| `/skills/*` | Curated content destination or staged legacy | Inventory required | 319 routes; do not blanket redirect without query/backlink review |
| Approved blog routes | `/blog/[slug]` | Preserve slug where feasible | Only after editorial review |
| Legal routes | Approved `/privacy`, `/terms`, `/cookies` | Preserve/normalize | Legal approval required before migration |

## Rules

- Preserve path, query parameters, UTMs, and `gclid` through any redirect.
- Use 301 only for genuine durable replacements; use 410 only after ownership and traffic review.
- Avoid redirecting every removed URL to the homepage.
- Test every approved redirect for loops, chains, final status, canonical, and analytics attribution.
