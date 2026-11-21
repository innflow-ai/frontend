# Website design and usability audit

Reviewed **October 3, 2026**, against **https://innflow.ai** and the local checkout at baseline **`e7a4006`**. This is an audit and implementation backlog, not a record of fixes or a deployment.

The biggest opportunities are making the blog easier to reach and browse, reducing mobile reading friction, and simplifying discovery across the navigation and directories. Two verified defects should be fixed before those refinements: invisible button text on the property-operations page and broken signup links in three articles.

## Recommended implementation order

| Order | Work package | Impact | Estimated effort |
| --- | --- | --- | --- |
| 1 | Restore readable primary buttons on `/landlord-banking` (F01) | Makes a primary action visible again | 1–2 hours |
| 2 | Repair four signup links across three blog posts (F02) | Removes a dead end for interested readers | 1–2 hours |
| 3 | Compact the blog introduction, broaden its copy, and hide the redundant industry filter (F03–F05) | The largest concentrated design quick win | 0.5–1 day |
| 4 | Collapse the mobile article contents/tools area (F08) | Gets readers to the article much sooner | 0.5–1 day |
| 5 | Enlarge mobile menu targets and finish the text-only Solutions rollout (F06–F07) | Easier navigation across the whole site | 0.5–1 day for targets and icon release; grouping is a separate 1–2 day refinement |

Effort estimates include focused implementation and verification, but exclude content approval and release wait time. They are estimates, not measured project commitments.

## Quick wins

### F01 · High · Primary button text disappears on `/landlord-banking`

**Verified defect.** The hero's “Explore innflow” link renders text and background as `rgb(1, 34, 50)`. The later “See what's possible” link has the same computed colors. A real button is present, but it looks empty. [Mobile evidence](../output/playwright/website-ux-audit-2026-10-03/banking-recheck-mobile.jpg).

**Change:** Make the banking button foreground explicit at sufficient specificity. Inspect the interaction between `.page a { color: inherit; }` in `site-shell.module.css` and `.button { color: #fff; }` in `baselane-banking.module.css`; avoid changing every link globally. **Benefit:** Visitors can see and understand the primary action. **Acceptance:** Both labels and arrows remain readable in default, hover, and keyboard-focus states at 320, 390, and 1440 pixels. Check other consumers of the shared shell. **Effort:** 1–2 hours.

### F02 · High · Four article links send readers to a 404 signup page

**Verified defect.** `/signup` on the marketing origin returns 404. The crawl traced four links to three published posts:

- `/blog/master-ai-driven-crm-automation-close-30-more-deals`
- `/blog/shopify-automation-with-innflowai-six-workflows`
- `/blog/unlock-ai-orchestration-automate-90-of-manual-work` (two links)

**Change:** Correct those CMS destinations to the configured application signup URL. Consider a marketing `/signup` redirect as compatibility protection for already-shared URLs. **Benefit:** Readers can continue from the article to signup. **Acceptance:** No published article links to the broken destination; the compatibility redirect, if implemented, uses the configured application origin and preserves attribution. Verify navigation without creating an account. **Effort:** 1–2 hours. [Exact link evidence](../output/website-ux-audit-2026-10-03/signup-link-sources.json).

### F03 · High · The blog introduction delays the content

**Measured observation; design recommendation.** At 390 × 844, the first article artwork starts approximately **829 pixels** below the document top after cookie dismissal. Breadcrumb spacing, a three-line heading, description, search, topic row, and section heading consume almost the entire first screen. [Mobile page](../output/playwright/website-ux-audit-2026-10-03/blog-mobile.jpg).

**Change:** Reduce top padding and introduction margins, shorten the headline and supporting copy, and tighten space around search and topic controls. Preserve clear artwork, titles below images, the featured story, and the approved open grid. **Benefit:** Readers encounter an actual story sooner. **Acceptance:** At 390 × 844, aim for first artwork to begin within 560 pixels and its title to be visible by the end of the first screen; retain readable controls, no overlap, and no page overflow at 320 pixels. **Effort:** 3–5 hours. Source: `src/app/blog/page.tsx` and its CSS module.

### F04 · Medium · Blog and article wrapper copy imply a property-only audience

**Verified content mismatch.** The listing says “Better property operations” and “run your properties,” while the featured content includes AI platforms and general automation. Article sidebar and introductory CTA copy also hardcode property operations.

**Change:** Use broad automation language in the listing and shared article chrome. Suggested listing direction: “Ideas for better everyday work.” Preserve property-specific article content and taxonomy. **Benefit:** General business readers can recognize the content is for them. **Acceptance:** Listing heading, supporting copy, page metadata, and shared article CTAs align with the broad homepage positioning; no article body is rewritten as part of the UI change. **Effort:** 2–3 hours. Sources: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/components/blog/article-intro-cta.tsx`.

### F05 · Medium · The blog industry selector offers no useful narrowing

**Verified observation.** The live selector contains only “All industries” and “General.” All 189 visible listing records are presented through this single industry bucket. The control adds visual weight without meaningful choice.

**Change:** Hide the industry selector whenever there are fewer than two meaningful industry choices. Keep existing URL-filter handling. Investigate CMS categorization separately instead of guessing industry assignments. **Benefit:** A simpler search surface. **Acceptance:** Search and category selection still preserve active URL filters; the selector automatically returns when useful choices exist. **Effort:** 1–2 hours. Source: industry options derived in `src/app/blog/page.tsx`.

### F06 · Medium · The mobile navigation toggle has a small hit area

**Measured observation.** At 320 pixels wide, the hamburger button's bounding rectangle is **22 × 22 pixels**; it sits beside a 40-pixel-high Google action. The page itself does not overflow.

**Change:** Give open and close controls a minimum **44 × 44 pixel** hit area, retaining the current icon size. Rebalance header gaps if needed. **Benefit:** Easier touch interaction without a visual redesign. **Acceptance:** The entire 44-pixel target responds at 320 and 390 pixels, without logo/CTA collisions; Escape, focus return, and scroll lock continue working. **Effort:** 1–2 hours. Source: `.menuToggle` in `src/components/site-shell.module.css` and responsive header styles.

### F07 · Medium · Solutions is a long menu, and icon removal is still local

**Verified current state plus recommendation.** Production still shows the repeated building icons. The existing local change sets `hideIcon: true` and gives icon-free mega-menu links a full-width text column. The menu contains **26 solution links** in four groups; mobile also places a testimonial before later menu items. [Live desktop menu](../output/playwright/website-ux-audit-2026-10-03/solutions-menu-desktop.jpg).

**Change:** Verify and release the already-authored icon change through the normal release workflow. As a separate refinement, put “Browse all solutions” at the beginning on mobile and make the four groups collapsible, rather than forcing a scroll through every link. Keep every existing route accessible. **Benefit:** Faster scanning and shorter paths to later navigation choices. **Acceptance:** Desktop and mobile have text-only solution entries; long names fit; all 26 destinations remain reachable; keyboard and touch open/close behavior works. **Effort:** 1–2 hours for validation/release preparation; 1–2 days for group interaction changes.

### F08 · High · Mobile article tools precede the article for nearly a full screen

**Measured observation; design recommendation.** On `/blog/openai-vs-anthropic-ai-platform` at 390 pixels, the tools/contents region is about **841 pixels tall**, starting at y≈883; the article-main container begins at y≈1765. It also begins with a promotional banner before the written article.

**Change:** Use a collapsed “In this article” disclosure on phones, compact the share controls, and move the sidebar signup promotion below the article or into an existing CTA location. Review the introductory banner's placement after the opening content. Preserve the single audio player directly below the title. **Benefit:** Reading begins sooner while navigation remains available. **Acceptance:** With contents collapsed, the body follows title/audio/taxonomy without an expanded sidebar or full promotional panel in between; contents links still reach headings below the fixed header. **Effort:** 0.5–1 day. Sources: `src/components/blog/article.module.css` and `src/app/blog/[slug]/page.tsx`.

### F09 · Medium · The cookie panel obscures the discovery controls

**Verified visual observation.** Before consent selection, the panel covers much of the lower first screen on mobile and overlaps blog search/topics on desktop. [Mobile](../output/playwright/website-ux-audit-2026-10-03/cookie-mobile.jpg), [desktop](../output/playwright/website-ux-audit-2026-10-03/cookie-desktop.jpg).

**Change:** Use a more compact provider-supported layout and concise approved first-layer copy. Keep Accept, Decline, and Preferences easy to find and retain the current consent behavior. **Benefit:** Visitors can understand both their choices and the page underneath. **Acceptance:** Test first visit, dismissal, and preference reopening at 320, 390, and 1440 pixels; all controls remain visible and keyboard usable. This is a presentation recommendation, not a legal-compliance conclusion. **Effort:** 2–4 hours plus any required copy review.

### F10 · Medium · Some CTA labels conceal that they open booking

**Verified observation.** “Explore the product” on `/about` and “Explore your workflow” on industry pages point directly to the external booking URL.

**Change:** Use “Book a demo” or “Discuss your workflow” for booking links. Reserve “Explore” product links for relevant on-site pages. **Benefit:** Visitors can predict the next step. **Acceptance:** Audit shared primary CTA labels against destinations; booking links and product-detail links are distinguishable before clicking. **Effort:** 2–4 hours. Sources: `baselane-company.tsx`, `industry-pages/industry-page.tsx`.

## Next improvements

### F11 · High · Skills renders all 319 cards at once

**Measured observation.** `/skills` renders **319 skill links**. At 390 pixels wide the page is approximately **76,384 pixels tall**. Search and categories exist, but `filtered.map(...)` renders every result without pagination or a load-more control.

**Change:** Start with 24 cards and “Show more,” following the integration directory's existing approach. Preserve a total result count, reset the visible limit after filtering, and keep the search/category controls near the results. **Benefit:** Much shorter initial browsing and keyboard traversal. **Acceptance:** Initial result grid contains at most 24 cards; repeated expansion exposes every matching skill without duplicates; filters and empty results work; result changes are announced. **Effort:** 0.5–1 day. Source: `src/components/skills-library.tsx`.

### F12 · Medium · Blog topics mix overlapping subjects and formats

**Verified observation; information-design recommendation.** The bar contains **14 categories plus All stories**. “AI,” “AI Agent,” “Automation,” “Workflow,” and “Software” overlap, while “Comparison” and “Case Study” describe formats. Important choices are off-screen on phones.

**Change:** Keep a small set of common topic choices visible, provide a clear “More topics” control, and separate content format from subject when the taxonomy is reviewed. Preserve existing category URLs and mappings until a content migration is explicitly scoped. **Benefit:** More predictable filtering with less horizontal hunting. **Acceptance:** Every existing category remains discoverable and keyboard reachable; combined search/category filters continue working; the active selection is visible even when it lives under More. **Effort:** 1–2 days for presentation; taxonomy migration is separate.

### F13 · Medium · General pages and footer still default to property management

**Verified cross-page inconsistency.** `/about`, `/careers`, the blog, and the legacy footer use property-specific positioning while the homepage and industries directory address broader automation. The footer's Solutions list emphasizes property subpages and repeats closely related rental destinations. The homepage/industry footer is a different component family.

**Change:** Broaden umbrella-page copy and make the general footer's Solutions links correspond to the actual industry directory. Keep property pages and their approved layouts property-specific. Retain legal and support access. **Benefit:** A consistent explanation of who Innflow serves. **Acceptance:** A visitor following Home → Blog → About → Solutions sees consistent umbrella positioning; property vertical pages retain their context; footer links resolve. **Effort:** 1–2 days. Sources: `site-footer.tsx`, `site-footer-boundary.tsx`, `baselane-company.tsx`.

### F14 · Medium · Two help centers offer different paths and content

**Verified observation.** `/help` has a searchable help interface; `/help-center` has the older property-focused support layout. The shared legacy footer points to `/help-center`. Several `/help` “articles” lead to marketing/product pages rather than dedicated task instructions.

**Change:** Use `/help` as the default help entry point, retain a compatibility route for `/help-center`, and distinguish quick answers from product overviews. Build task-specific help only where the underlying steps are verified. **Benefit:** Fewer competing support destinations and clearer expectations. **Acceptance:** Header/footer help links converge; old URLs remain usable; search results make their destination type clear; contact options remain available. **Effort:** 1–2 days for routing/navigation and labeling; substantive help content is a separate project.

### F15 · Medium · Product updates reads like evergreen marketing

**Verified observation.** `/product-updates` uses a static collection of resource, preparation, and property-workflow highlights with no visible release dates or versions. The title creates an expectation of recent changes.

**Change:** Connect the page to verified dated update content, or rename it “Product highlights” until a real changelog exists. Do not invent release history. **Benefit:** Visitors understand whether they are seeing capabilities or new releases. **Acceptance:** Every item labeled as an update has a real date and change summary; otherwise the navigation/page title accurately says highlights. **Effort:** 1–2 hours for honest relabeling; 1–3 days for a CMS-backed update listing. Source: `src/components/baselane-updates.tsx`.

### F16 · Low · Solutions repeats its introduction before the directory

**Verified layout observation; design recommendation.** `/solutions` presents “Your industry. Your way of working,” then another substantial introduction, “Different industries. One connected flow,” before the first industry card. [Mobile](../output/playwright/website-ux-audit-2026-10-03/solutions-mobile.jpg).

**Change:** Keep the hero and shorten the following directory introduction to a compact section label; bring useful choices upward. **Benefit:** Faster discovery without changing the approved visual language. **Acceptance:** At 390 pixels, the first industry choice is visible within the initial viewport, with both industry and team/use-case sections still clearly labeled. **Effort:** 2–4 hours.

## Larger opportunities, not immediate defects

- **Unify shared navigation, footer, and directory behavior.** Maintain the distinct approved blog and property-page designs, but reduce duplicated navigation implementations and align search, result counts, pagination, and empty states. Validate current behavior before refactoring. Estimated 3–5 days after design decisions.
- **Audit the homepage's complete motion journey separately.** The mobile page measured roughly 17,000 pixels in this capture. Review section value, animation visibility, reduced-motion behavior, and real-device playback before proposing cuts. A screenshot or successfully loaded asset is not proof of correct animation playback. Estimated 1–2 days for a focused review, with implementation scoped afterward.
- **Replace brochure-like help and update content with task-specific material.** This requires product evidence and content ownership, not only styling. Scope after selecting the most common customer questions.

## What passed and should be preserved

| Check | Result |
| --- | --- |
| Public route crawl | 1,019 URLs: 1,017 returned 200, one redirected, and `/signup` returned 404. Homepage checked separately. No other crawl failures reported. |
| Desktop/mobile page geometry | 90 route samples, 180 viewport observations; no document-width overflow detected at 1440 or 390 pixels. This does not guarantee every animated state or nested scroller. |
| Blog search and combined filters | Search “automation” plus General returned 63 stories; adding Comparison returned three. Query and industry survived topic navigation. |
| Blog empty state and reset | Nonsense query showed zero results and a recovery action; Clear filters returned `/blog` and 189 stories. |
| Blog pagination | Next reached page 2 of 21 with nine distinct article destinations, none repeated from page 1's story set. |
| Mobile menu | Opening locked body scrolling and made main content inert; Escape closed it, restored focus to the toggle, and restored scrolling. |
| Pricing interactions | Annual switch updated its state and displayed the annual commitment wording; Collapse all features closed all three groups. |
| Integration discovery | Show more increased visible results from 24 to 48; searching Slack returned one matching integration. |
| Help search | Search dialog opened and initially focused its search field; Escape closed it. Search-result quality was not exhaustively tested. |
| Existing local tests | Five focused files passed, 29 tests total: blog listing, blog pagination helpers, editorial header, pricing, and integration directory. |

## Coverage and limits

- **83 static public routes** were mapped to their source components and captured at desktop and mobile widths. Preview and component-lab pages were excluded.
- **Seven dynamic examples** were additionally rendered: two industry pages, one product page, one platform page, one integration detail, one skill detail, and one blog article. Other dynamic records received HTTP/HTML crawl coverage, not individual visual approval.
- The crawl included 386 integration URLs, 320 skills URLs, 190 blog URLs, 27 industry URLs, and smaller product/platform/feature groups. These counts include their directories where applicable.
- Screenshots and source review cover layout families, headings, controls, and representative lower-page sections. This is not a pixel-by-pixel inspection of every scroll position. Initial captures sometimes preceded lazy image loading; feature-page images were recaptured after visible images loaded. Blank initial frames are not reported as broken images.
- The very tall skills screenshot is capped at 65,000 pixels; its full height is recorded in the browser metrics. Full-page captures of sticky/animated content can also contain capture artifacts.
- No contact form, newsletter, privacy request, booking, signup, or authentication transaction was submitted. Form layouts were inspected; backend delivery and success/error paths remain untested.
- Legal documents were reviewed for layout/access only. External embeds can load after the first capture; direct fallback links exist. No legal-content or compliance conclusion is made.
- No performance score, conversion uplift, full accessibility conformance, or animation-playback certification is claimed.
- Production was the visual target. The prior Solutions icon edit remains local. Additional unrelated homepage/animation work appeared in the shared checkout during the audit and was left untouched; local source observations are a dated snapshot, not a claim that all live code matches the working tree.

### Evidence files

- [Prioritized backlog CSV](../output/website-ux-audit-2026-10-03/prioritized-backlog.csv)
- [Complete route coverage checklist](../output/website-ux-audit-2026-10-03/coverage.csv)
- [HTTP/HTML crawl results](../output/website-ux-audit-2026-10-03/route-audit.json)
- [Desktop/mobile DOM measurements](../output/website-ux-audit-2026-10-03/browser-metrics.json)
- [Route-to-template inventory](../output/website-ux-audit-2026-10-03/static-route-templates.json)
- [Screenshot index for all 90 rendered routes](../output/website-ux-audit-2026-10-03/visual-evidence.md)
- [Signup-link source records](../output/website-ux-audit-2026-10-03/signup-link-sources.json)
- [Recorded interaction checks](../output/website-ux-audit-2026-10-03/interaction-checks.json)

No application code or CMS records were changed by this audit. The recommended fixes still need implementation and release verification.
