# Phase A discovery and source truth

## Boundary

Build target: `/Users/ak/innflow-web`.

Read-only sources:

- `/Users/ak/innflow`
- `/Users/ak/Documents/GitHub/innflow`
- `/Users/ak/.openclaw/workspace/innflow-brand-kit`
- `/Users/ak/innflow-web/output/playwright`

No source repository was modified. The current repository contains copied approved assets only.

## Positioning decision

- Initial ICP: property-management operators and management teams coordinating recurring work across properties, stakeholders, and systems.
- Primary buyer hypothesis: operations leader or property-management operator responsible for process consistency and cross-system handoffs.
- Buying motion: provisionally demo-led until packaging and implementation ownership are approved.
- Primary CTA: **Book an operations demo**.
- Secondary CTA: **Watch the workflow**.
- Product boundary: Innflow coordinates operational work around a property-management system of record; it is not presented as a replacement.

## Verified product surfaces

The current App Router exposes routes for Workflows, Assistant, Approvals, Executions, Files, Tables, Knowledge Base, Scheduled Tasks, Templates, Inbox, and Chat, plus multiple connector and v1 API routes. Only the surfaces used in homepage copy are described as present. The site does not say Chat is live or position it as an available capability.

Communications and Website are preview-only on the homepage. Their public readiness is not inferred from adjacent source routes or media.

## Brand findings

- Approved brand canvas: `#F5F4F1`.
- Approved primary text: `#1A1A1A`.
- Approved brand blue: `#5AAAF8`; suitable for large accents but not small white-text controls.
- Approved fonts in the supplied kit: Inter and Fragment Mono. The build uses prompt-approved Manrope and Figtree for the Kora-to-Innflow marketing translation while retaining the brand palette.
- Approved logo assets include black, white, expanded, collapsed, and brand-kit primary variants.

## Product media copied locally

| Local asset | Read-only source | Use |
| --- | --- | --- |
| `public/brand/innflow-black-full.svg` | product `public/assets/in/` | light header |
| `public/brand/innflow-white-full.svg` | product `public/assets/in/` | dark footer |
| `public/brand/innflow-logo-primary.svg` | supplied brand kit | preserved approved variant |
| `public/product/assistant-knowledge.png` | product `home-start-cards/ai-copilot.png` | Assistant story |
| `public/product/assistant-preview.png` | product `home-start-cards/ai-agent.png` | retained approved media inventory |
| `public/product/website-structure-preview.png` | product `knowledge-base/add-website-structure.png` | Website preview story |
| `public/integrations/*.svg` | product `public/logos/` | connector evidence |

The existing integrations UI image contains user/account details and was not copied into the marketing build.

## Pricing finding

The current product configuration contains Free, multiple Basic/PRO SKUs, multiple Business/MAX SKUs, and Enterprise. The audit records unresolved naming, credit explanation, seat, billing, and packaging issues. Phase C therefore describes the application as credit-based but does not render public prices.

## Analytics and legal finding

The app uses PostHog and the current public site serves privacy, cookie, terms, EULA, and DSAR content through Termly. The standalone site preserves those existing Termly sources. Analytics events remain local unless an approved consent-gated loader is present.

## Reference limitation

Playwright browser captures taken on August 9, 2026 are the visual evidence for Kora, DoorLoop, and the current Innflow homepage. No Firecrawl claim is made, and the captures are retained under `output/playwright/` for traceability.
