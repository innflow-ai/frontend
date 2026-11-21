# Navigation inventory and consolidation

Audited the shared desktop/mobile navbar configuration in `src/components/mega-menu.tsx` on 2026-09-12. The navbar has Product, Solutions, Portfolios, and Resources dropdowns, plus direct Pricing and Blog links, the login menu, and Google signup. Latest blog cards in Resources are dynamic and are not counted below.

43 dropdown entries before, 39 after. The earlier move of Conventional and Student Housing into Portfolios is included in the starting inventory.

## Changes

- Consolidated Copilot into Agent OS (both led to `/products/agent-os`). Agent OS remains in Product.
- Consolidated Templates into Agent Skills (both led to `/skills`, which is the reusable skills library).
- Moved Agent Studio into Build and customize alongside skills, the website builder, and databases.
- Kept one Integrations entry under Product → Connections and governance, linking to the integration directory. The platform integration overview remains accessible by its existing route.
- Removed the duplicate Resources → Pricing link; the direct navbar Pricing link remains.
- Moved the page directory out of Product and into Resources, renaming Connections to Page Directory to describe its actual destination.
- Grouped Move-In and Renewals under Leasing. Moved Centralized Operations into Operations. Renamed the audience grouping from Solutions to By team.
- Corrected Customer Stories to `/our-customers` and Resource Library (formerly Asset Library) to `/resources`, instead of sending both to Blog.
- Changed Become an Affiliate to Partnerships and linked the existing partnership page rather than the booking calendar.
- Corrected Application & eSign and Owner Portal descriptions, which previously described tours and call handling.
- Preserved existing approved icon artwork for renamed links.

- Follow-up: ordered Solutions as Operations → Leasing → By team; added Leasing Teams, removed Maintenance & Mobile App, and replaced Delinquency’s shared card icon with the Mage Alarm Clock. Final column counts are 4 / 6 / 3.

## Remaining findings

- Several distinct Solutions entries still lead to general pages such as `/property-management` or `/products/agent-os`. They describe different tasks; merging them solely because they share a URL would hide meaningful choices. Dedicated pages or verified section anchors would improve these destinations.
- Residential, Multifamily, and Conventional overlap conceptually. They remain distinct because the requested portfolio choices should not be collapsed without deciding the intended property taxonomy. Commercial and Community Associations also still share the general multi-property destination.
- Blog remains both a direct navbar link and a Resources entry for discoverability alongside the latest-post cards.
- This change applies to the navbar; the separately maintained footer navigation was not changed.

## Final inventory

| Dropdown | Category | Item | Destination |
| --- | --- | --- | --- |
| Product | Platform and agents | Platform | /platform |
| Product | Platform and agents | Agentic Workflows | /products/agentic-workflows |
| Product | Platform and agents | Agent OS | /products/agent-os |
| Product | Platform and agents | AI Agents | /products/ai-agents |
| Product | Build and customize | Agent Studio | /products/agent-studio |
| Product | Build and customize | Agent Skills | /skills |
| Product | Build and customize | AI Website Builder | /features/website |
| Product | Build and customize | Databases | /products/databases |
| Product | Automation and intelligence | Agentic Automation | /platform/agentic-automation |
| Product | Automation and intelligence | Self Learning | /platform/self-learning |
| Product | Automation and intelligence | Evaluations | /platform/evaluations |
| Product | Automation and intelligence | Analytics and Observability | /platform/analytics-and-observability |
| Product | Connections and governance | Integrations | /integrations |
| Product | Connections and governance | Deployment Options | /platform/deployment-options |
| Product | Connections and governance | Security and Compliance | /platform/security-and-compliance |
| Solutions | Operations | Centralized Operations | /property-management |
| Solutions | Operations | Rent Collection | /rent-collection |
| Solutions | Operations | Delinquency | /property-management |
| Solutions | Operations | Owner Portal | /property-management |
| Solutions | Leasing | Listings | /products/agent-os |
| Solutions | Leasing | Advertising | /products/agent-os |
| Solutions | Leasing | Application & eSign | /products/agent-os |
| Solutions | Leasing | CRM | /products/databases |
| Solutions | Leasing | Move-In | /property-management |
| Solutions | Leasing | Renewals | /property-management |
| Solutions | By team | Owner Operators and Fee Managers | /property-management |
| Solutions | By team | Owners | /property-management |
| Solutions | By team | Leasing Teams | /property-management |
| Portfolios | Portfolios | Residential | /multi-property-investors |
| Portfolios | Portfolios | Multifamily | /multi-property-investors |
| Portfolios | Portfolios | Commercial | /multi-property-investors |
| Portfolios | Portfolios | Community Associations | /multi-property-investors |
| Portfolios | Portfolios | Conventional | /property-management |
| Portfolios | Portfolios | Student Housing | /property-management |
| Resources | Resources | Page Directory | /connections |
| Resources | Resources | Blog | /blog |
| Resources | Resources | Partnerships | /partner-with-us |
| Resources | Resources | Customer Stories | /our-customers |
| Resources | Resources | Resource Library | /resources |

## Starting inventory

| Dropdown | Category | Item | Destination |
| --- | --- | --- | --- |
| Product | Products | Platform | /platform |
| Product | Products | Copilot | /products/agent-os |
| Product | Products | Agentic Workflows | /products/agentic-workflows |
| Product | Products | Agent OS | /products/agent-os |
| Product | Products | Agent Studio | /products/agent-studio |
| Product | Products | AI Agents | /products/ai-agents |
| Product | Build With Agents | Agent Skills | /skills |
| Product | Build With Agents | AI Website Builder | /features/website |
| Product | Build With Agents | Databases | /products/databases |
| Product | Build With Agents | Templates | /skills |
| Product | Automation and intelligence | Agentic Automation | /platform/agentic-automation |
| Product | Automation and intelligence | Self Learning | /platform/self-learning |
| Product | Automation and intelligence | Evaluations | /platform/evaluations |
| Product | Automation and intelligence | Analytics and Observability | /platform/analytics-and-observability |
| Product | Connections and governance | Connections | /connections |
| Product | Connections and governance | Integrations | /platform/integrations |
| Product | Connections and governance | Deployment Options | /platform/deployment-options |
| Product | Connections and governance | Security and Compliance | /platform/security-and-compliance |
| Solutions | Leasing AI | Listings | /products/agent-os |
| Solutions | Leasing AI | Advertising | /products/agent-os |
| Solutions | Leasing AI | Application & eSign | /products/agent-os |
| Solutions | Leasing AI | CRM | /products/databases |
| Solutions | Solutions | Centralized Operations | /property-management |
| Solutions | Solutions | Owner Operators and Fee Managers | /property-management |
| Solutions | Solutions | Owners | /property-management |
| Solutions | Operations | Move-In | /property-management |
| Solutions | Operations | Renewals | /property-management |
| Solutions | Operations | Rent Collection | /rent-collection |
| Solutions | Operations | Delinquency | /property-management |
| Solutions | Operations | Maintenance & Mobile App | /multi-property-investors |
| Solutions | Operations | Owner Portal | /property-management |
| Portfolios | Portfolios | Residential | /multi-property-investors |
| Portfolios | Portfolios | Multifamily | /multi-property-investors |
| Portfolios | Portfolios | Commercial | /multi-property-investors |
| Portfolios | Portfolios | Community Associations | /multi-property-investors |
| Portfolios | Portfolios | Conventional | /property-management |
| Portfolios | Portfolios | Student Housing | /property-management |
| Resources | Resources | Integrations | /integrations |
| Resources | Resources | Pricing | /pricing |
| Resources | Resources | Blog | /blog |
| Resources | Resources | Become an Affiliate | https://cal.com/julian-patrick-afu0u2/innflow-demo?overlayCalendar=true |
| Resources | Resources | Customer Stories | /blog |
| Resources | Resources | Asset Library | /blog |

## Validation

TypeScript passed. All 12 existing navigation tests passed after updating the integration-directory expectation. All four desktop dropdowns opened without horizontal overflow. The five corrected or relocated resource destinations returned HTTP 200. All referenced menu icon files exist.
