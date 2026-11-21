# Innflow SEO: initial audit and keyword map

Date: 2026-09-11. Scope: homepage and core commercial pages, plus sitemap and preview-route checks. This is an initial qualitative research pass, not a completed sitewide SEO audit.

## Positioning assumption

Start with property management teams seeking workflow coordination and AI assistance around existing systems. Audience preference is pending. Treat broader AI-platform searches as a separate intent, rather than putting every keyword on the homepage. Current source describes connected context, workflows, approvals, and execution history; keywords must not imply unsupported accounting, banking, or autonomous maintenance capabilities.

## Verified findings

Direct HTTPS requests on September 11 returned 200 for the homepage, property-management, platform, products/platform, pricing, integrations, skills, BL, homepage-baselane, robots.txt, and sitemap.xml.

- Live homepage title: “A clearer day in property operations | Innflow”. Local root metadata already has “Property Operations Software & AI Workflows | Innflow”. Local source and production differ: do not count the local improvement as published.
- Both /platform and /products/platform currently return “Platform | Innflow” with separate self-canonicals. Decide whether they are distinct pages or should consolidate; duplicate titles alone do not establish duplicate content or prove ranking cannibalization.
- Live /property-management and /integrations already have descriptive, relevant titles. Improve their copy and intent coverage before replacing titles unnecessarily.
- /BL and /homepage-baselane return 200, index/follow, and a homepage canonical. Confirm the intended public role of these routes. Canonicals are hints; do not assume exclusion from the index. Do not blanket-block /BL: navigation currently links to some /BL pages.
- robots.txt allows crawling and declares a working sitemap. No crawl block was found in this sample.
- Local sitemap.ts assigns an August 22 date to many pages. Use defensible modification dates or omit them; do not bump every URL to today. The local sitemap omits /skills and its detail routes; review their indexability and content quality before adding them.
- Web search retrieval showed internal planning language on the property-management page, including ICP validation language. Recheck the current rendered body before editing: search retrieval and direct live metadata differed for some routes.
- Homepage source contains customer logos, numerical social proof, and testimonials. Establish their provenance before retaining them as evidence in revised copy. This audit did not validate those claims.

## Initial keyword-to-page map

These are candidate targets based on relevance and observed search-result intent. No search volume, keyword difficulty, CPC, or current ranking is implied. Priority reflects product fit and page role, not measured demand.

| Page | Primary candidate | Supporting topics | Intended role |
| --- | --- | --- | --- |
| / | property operations software | AI property operations, connected property workflows | Explain the product category, audience, and core value |
| /property-management | property management workflow automation | property management automation, resident request workflows, approval workflows | Explain practical use cases for property management teams |
| /products/agentic-workflows | AI workflow automation for property management | visual workflow builder, human approval workflows | Show how workflows are configured and reviewed |
| /products/ai-agents | AI agents for property management | property management AI assistant, agents with connected tools | Explain agent capabilities and controls |
| /integrations | property management software integrations | connecting property systems, workflow integrations | Show verified connections and configuration requirements |
| /platform | property operations platform capabilities | approvals, workflow observability, connected knowledge | Capability overview; resolve overlap with /products/platform first |
| /pricing | Innflow pricing | Innflow plans, property workflow software pricing | Answer commercial evaluation questions with current plan facts |
| /skills | AI agent skills library | reusable agent skills, workflow templates | Help visitors find usable skills; keep examples specific |
| /blog | property workflow automation guides | maintenance intake workflow, resident request routing, approval workflow examples | Support commercial pages with practical original content |

Agent OS, Agent Studio, database pages, platform details, and feature pages need individual intent assignments in the expanded inventory. Avoid assigning all of them the same broad AI platform target.

## Homepage draft direction

Title: Property Operations Software & AI Workflows | Innflow

H1: Property operations, connected in one workspace.

Introduction: Bring property requests, team knowledge, and approvals into one place. Use AI agents and visual workflows to coordinate the next step alongside the systems your team already uses.

Description: Coordinate property requests, knowledge, and approvals with Innflow. Build AI workflows around your existing systems and keep every step visible.

Suggested content order: audience and outcome; concrete request-to-approval example; workflows, agents, and connected context; integrations with accurate availability; verified proof; useful FAQ; demo CTA. Link each section to the page that answers the next question.

## Work order

1. Confirm the primary audience and baseline organic performance. Pull 90 days of Search Console queries/pages with clicks, impressions, CTR, and position; compare with the previous period. Identify branded vs nonbranded traffic and current country/device mix. Use Keyword Planner or another keyword dataset to validate demand for candidate clusters. Do not infer zero demand from missing data.
2. Complete a rendered URL inventory: status, final URL, title, description, H1, canonical, indexability, sitemap inclusion, internal links, and content intent. Resolve the two platform page roles and preview-route policy.
3. Rewrite the homepage and property-management page first. Align the title, visible heading, introductory copy, examples, and internal links. Preserve factual product boundaries and verified proof.
4. Optimize agent/workflow pages, integrations, pricing, and useful skill pages. Fill information gaps before creating more competing landing pages.
5. Produce practical supporting articles for maintenance request routing, approval workflows, and keeping property knowledge current. Verify feature support before turning examples into claims.
6. Validate rendered metadata, canonical URLs, response codes, structured data, mobile usability, and performance. Publish separately, then record the deployment date and measure organic landing-page conversions as well as search clicks. Avoid promising ranking improvements on a fixed schedule.

## Sources and limits

Research queries: “property management workflow automation software”; “AI property management operations software”. Search results establish candidate intent, not monthly volume or reliable rank positions.

- DoorLoop workflow page: https://www.doorloop.com/features/workflows — supports the existence of a commercial workflow-automation category.
- Buildium AI page: https://www.buildium.com/features/ai-property-management-software/ — shows the broader AI property-management intent competing with full property-management suites.
- RealPage operations platform: https://www.realpage.com/platforms/property-operations/ — supports operations-platform terminology; Innflow scope should remain distinct from a full suite.
- Google title guidance: https://developers.google.com/search/docs/appearance/title-link — descriptive, concise, distinct titles aligned with visible content.
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls — choose consistent canonical signals when content is actually duplicative.
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap — use accurate modification dates and intended canonical URLs.

No production content changed in this audit. No Search Console, keyword-volume, conversion, or Core Web Vitals dataset was accessed. Existing staged site changes and the local badge carousel remain separate work.
