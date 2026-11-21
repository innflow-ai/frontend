# Sanity website dependency audit

Date: 2026-09-25
Scope: current local source in /Users/ak/innflow-web. Read-only application audit; no additional sections disabled. Production deployment, billing status, cache contents, API availability, and asset availability were not tested. Failure behavior below is inferred from the implementation when a fresh fetch fails; existing cached content can change what visitors see.

## Key finding

Commenting out the homepage testimonial section removes that section and its fetch only. The root layout still awaits three Sanity-backed navigation sources on every route: latest blog posts, latest company update, and a selected customer testimonial. Catch handlers prevent those failures from directly crashing the layout, but they do not eliminate the requests or their waiting time.

## Visible content and failure behavior

| Area | Sanity-owned content | Behavior on a failed fresh fetch | Source |
| --- | --- | --- | --- |
| Global Resources menu | Recent article titles, links, categories, dates and cover images | Recent-post cards disappear; static menu links remain | src/app/layout.tsx; src/components/site-header.tsx; src/components/editorial-header.tsx |
| Global Product menu | Latest company update title, image, date and CTA | Update card disappears | src/lib/sanity.ts; navigation components above |
| Global Solutions menu | Selected testimonial quote, customer identity, portrait and avatar | Testimonial card disappears | src/lib/testimonials.ts; navigation components above |
| Homepage and homepage preview | Customer stories section | Temporarily commented out, including its query | src/components/showcase-homepage.tsx |
| Shared feature/product testimonials | Up to four records from the /rent-collection placement | Section disappears because empty testimonial arrays render null | src/components/page-testimonials.tsx; src/components/testimonial-cards.tsx |
| /blog | Article directory cards, search/filter data, categories, authors and covers | Empty listing, potentially misleadingly presented as no stories | src/app/blog/page.tsx; src/lib/sanity.ts |
| /blog/[slug] | Article body, title, excerpt, metadata, author identity/bio/photo, cover and inline images, audio URL, related stories | Missing article result calls notFound(); related-story failures return an empty list | src/app/blog/[slug]/page.tsx; src/components/blog; src/lib/sanity.ts |
| /skills | Skill names, descriptions, categories, colors and icons | Empty library with “No skills yet. The agent skills library is on the way.” | src/app/skills/page.tsx; src/lib/skills.ts |
| /skills/[slug] | Skill detail copy, category and icon | Missing skill result calls notFound() | src/app/skills/[slug]/page.tsx; src/lib/skills.ts |
| /integrations | Integration cards, logos, descriptions, categories, status and roadmap information | Unhandled CMS error can fail rendering; no local fallback | src/app/integrations/page.tsx; src/lib/integrations.ts |
| /integrations/[slug] | Detail copy, logo, status, use cases, SEO and related integrations | Unhandled CMS error can fail rendering or metadata generation | src/app/integrations/[slug]/page.tsx; src/lib/integrations.ts |
| /products/[slug] | Product hero copy, sections, CTAs, SEO and asset URLs | Known products use checked-in fallback content. CMS-only products without a fallback can return 404 | src/lib/product-pages.ts; src/components/product-page.tsx |
| FAQ sections | Selected headings, questions and answers, including FAQ structured data | Fall back to checked-in questions supplied by each caller | src/lib/faqs.ts and its callers |

## Exact shared-testimonial placement footprint

All of these use the same /rent-collection testimonial selection, not separate CMS selections per page. The 33 FigmaFeaturePage routes are:

- `/affordable-housing`
- `/bank-sync`
- `/bookkeeping`
- `/commercial`
- `/communication-tools`
- `/community-associations`
- `/crm`
- `/features/website`
- `/files-and-documents`
- `/inspections`
- `/landlord-accounting`
- `/leasing`
- `/listing-and-advertising`
- `/mobile-apps`
- `/mobile-home`
- `/multifamily`
- `/operations`
- `/owners`
- `/products/agentic-workflows`
- `/property-management`
- `/quickbooks-online-integration`
- `/rapid-rent`
- `/rental-applications`
- `/reports`
- `/residential`
- `/residents`
- `/self-storage`
- `/showings`
- `/single-family`
- `/student-housing`
- `/tenant-management`
- `/tenant-screening-service`
- `/work-orders`

Four additional named routes use the same shared selection:

- `/landlord-banking`
- `/rent-collection`
- `/rent-collection-2`
- `/tax-preparation`

Dynamic `/products/[slug]` pages also use it. The known fallback-backed dynamic routes are `/products/platform`, `/products/agent-os`, `/products/agent-studio`, `/products/ai-agents`, and `/products/databases`. `/products/agentic-workflows` has its own static route using FigmaFeaturePage and is already in the list above. Other CMS-defined product slugs can also use the dynamic renderer.

The general PageTestimonials wrapper exists but has no active callers. The homepage-specific BaselineCustomerStories usage is commented out. The navigation testimonial is a separate query selecting a fixed published testimonial ID.

## FAQ footprint

CMS FAQ overrides are requested by:

- All 33 FigmaFeaturePage routes listed above.
- `/landlord-banking`, `/security-deposit-account`, `/lease-agreement`, `/rent-collection`, `/rent-collection-2`, and `/tax-preparation`.
- `/faq` and `/skills`.
- Dynamic `/products/[slug]` pages.
- Dynamic `/features/[slug]` pages: workflows, assistant and communications. `/features/website` uses its explicit FigmaFeaturePage route instead.

These callers supply local fallback questions. `/rent-collection-2` uses the rent-collection content kind and selection path.

## Dependencies beyond visible sections

- `/sitemap.xml` loads blog posts and integrations together. Blog failure returns an empty list, omitting article URLs. Integration failure propagates and can fail the entire sitemap generation, including its otherwise static URLs.
- Integration static-parameter generation fetches Sanity without a fallback, so a fresh build can fail there too. Blog and skills parameter generation return empty slug arrays on fetch failures. Product slug generation retains the built-in slugs.
- CMS asset delivery is separate from document fetching. Blog covers, inline images and author photos; testimonial portraits and avatars; skill icons; integration logos; and product CMS images can use Sanity assets. Cached document content does not guarantee those images remain available. The actual media failure status was not probed.
- Article audio URL is stored in Sanity, but its actual host depends on the record. When no URL is supplied, the player supports browser speech from article text. This is not a backup for a missing article.
- `/api/revalidate/sanity` is a signed cache-invalidation endpoint, not a visual page. It handles FAQ types, posts, integrations/categories and product pages. It does not currently handle testimonials/placements, skills/categories, authors or appUpdate events. Post handling invalidates blog routes but does not explicitly invalidate the latest-blog-posts cache tag. Latest navigation posts and company updates have 60-second timed caches.
- The shared client uses the published perspective and `useCdn: false` for document queries. Next.js caching is configured separately for selected reads/routes. A visible stale page should not be interpreted as proof the API is healthy.

## Areas that are locally authored

The new homepage's hero, workspace overview, feature stories, connected-infrastructure section and closing content are locally authored. Its body testimonial query is disabled, but the global navigation still depends on Sanity.

The bodies of `/our-customers` and `/product-updates` are local components, despite names that could suggest a CMS feed. They still inherit the global navigation dependencies. Industry/platform/marketing page copy generally comes from local content; the feature-page FAQ and shared-testimonial exceptions are listed above. No additional active Sanity query modules were found beyond sanity.ts, testimonials.ts, faqs.ts, skills.ts, integrations.ts and product-pages.ts.

## Suggested temporary outage priorities

1. Address integrations and sitemap error handling first, since these lack fallbacks and can affect page delivery or builds.
2. If the goal is to stop homepage CMS requests entirely, also bypass the three root-layout navigation queries and omit their optional cards temporarily.
3. Shared feature testimonials already hide on failure; a temporary query bypass would additionally remove their request latency across the listed pages.
4. Decide whether blog and skills should keep cached content or show a deliberate temporary-unavailability state instead of empty results and false 404s.
5. Preserve local product and FAQ fallbacks. Their requests could be bypassed during the outage if needed.

No application changes were made as part of this audit.
