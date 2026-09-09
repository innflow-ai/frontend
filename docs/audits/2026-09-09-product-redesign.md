# Product and platform redesign

The local site shares the redesigned navigation, photo CTA, and footer through the root layout. The redesigned homepage is now the main page at `/`. Pages formerly under the BL preview prefix use clean public paths, with permanent redirects from the old addresses. These changes are local and unpublished.

## Requested pages

The BL visual language is applied to these 17 routes:

- `/platform`
- `/products/platform`
- `/products/agent-os` (also the current Copilot menu destination)
- `/products/agent-studio`
- `/products/ai-agents`
- `/products/agentic-workflows`
- `/products/databases`
- `/skills` (also the current Templates destination; skill detail pages inherit the shared styling)
- `/features/website`
- `/platform/agentic-automation`
- `/platform/self-learning`
- `/platform/evaluations`
- `/platform/analytics-and-observability`
- `/platform/integrations`
- `/platform/deployment-options`
- `/platform/security-and-compliance`
- `/integrations`

## Shared structure

`SiteHeader`, `SiteCta`, and `SiteFooter` are rendered once in `src/app/layout.tsx`. BL page components now own their main content only. The header retains the mapped SVG icons, desktop menus, portfolio banner, blog previews, mobile accordion, focus handling, and scroll locking. The photo CTA keeps the previously deferred email signup disabled. All booking CTAs continue to use the approved Cal.com destination.

`product-experience.module.css` supplies the BL palette, typography, rounded surfaces, buttons, and responsive hero spacing. Product pages retain their section navigation and FAQs. Product illustrations use the BL workspace preview and clearly labeled workflow schematics instead of the older purple artwork. Platform detail pages retain their relevant blue feature artwork.

## Copy

Product heroes, legacy product capability/detail copy, FAQs, the platform overview, skills introduction, integrations copy, and website-preview copy were revised for a clear property-operations audience. Older generic claims about automatic learning, action counts, named deployments, and human-like agents were replaced with specific task, context, and review explanations. Website remains a preview; deployment and security requirements are discussed with the team rather than presented as blanket guarantees.

## Verification

- Rendered HTML audit: 23 routes (the requested pages plus homepage, BL Home, blog, pricing, contact, and terms) returned HTTP 200 with exactly one main, primary header, photo CTA, and footer. Results: `output/redesign-audit/routes.json`.
- Browser geometry: all 17 requested routes at mobile width 390 and desktop width 1920 had one header/footer and no document horizontal overflow. Desktop checks found no headings or paragraphs extending outside the viewport. A transient incomplete navigation on platform integrations was rechecked successfully.
- Visual checks included the platform overview, Agent OS, workflow detail sections, security and compliance, and the mobile integrations hero.
- Navigation regression tests now render the extracted shared header alongside BL content.
- Full test suite: 117 tests passed across 24 files.
- TypeScript passed. Optimized production build passed.

Changes are local. No deployment or publication was performed.
