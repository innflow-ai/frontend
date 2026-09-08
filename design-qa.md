# Alternate Innflow homepage design QA

final result: passed

## Evidence

- Source visual truth: https://www.baselane.com/ in Chrome, captured through browser screenshots in this conversation. Supplied assets are inventoried in `docs/design/baselane-asset-inventory.json`.
- Implementation: http://localhost:3000/homepage-baselane; browser-rendered viewport and full-page screenshots are embedded in this conversation, not saved as local screenshot files.
- Desktop comparison: source and implementation hero screenshots emitted together at 1114 × 623 CSS pixels, with equal viewport and capture scale. Mobile captures: 390 × 844 CSS pixels. Narrow layout additionally checked at 320 × 740.
- Full-view evidence: desktop source section-by-section captures from hero to footer; implementation full-page capture from hero to footer. Focused evidence: both hero/nav views, source dropdown and implementation dropdown, mobile menu and hero, product-story panels. Full-page fixed-nav position reflects scroll position at capture, not a misplaced document element.

## Findings and resolutions

- Typography initially inherited Figtree in the reused product previews. Fixed with page-scoped font inheritance. Browser computed styles now confirm the same Helvetica family for navigation, hero, product-story headings and embedded preview headings.
- Original supplied hero contained a baked-in $10,000 banking promotion. Generated an edited background removing the promotional card and retained the supplied composition. Used that separate asset locally.
- Legacy product-preview greens replaced with the existing homepage light-blue treatment.
- No remaining actionable P0/P1/P2 layout or interaction issues observed for the adapted design.

## Fidelity surfaces

- Fonts: local reference regular and medium Helvetica Now Display Pro assets; consistent display/navigation/body family and restrained weights. Headline wrapping intentionally follows new Innflow copy.
- Spacing: floating 64px desktop nav, pill corners, compact single-column dropdowns, large photographic hero, spaced product introduction, photo-backed product stories, capability grid and dark multi-column footer.
- Colors: reference warm ivory and deep navy, with Innflow light-blue actions and preview accents. Nav matches source 60% ivory/15px blur; dropdown uses 30px blur.
- Imagery: user-supplied desktop/mobile backgrounds and closing artwork; edited hero keeps the ocean scene. Innflow logo used throughout. Product visuals reuse existing Innflow UI components.
- Content: banking/account screenshots, claims, ratings, press logos and testimonials are deliberately replaced or omitted. This is an Innflow adaptation, not a pixel-identical copy of Baselane's content. Product panels are taller to fit existing illustrative previews; footer is shorter to fit Innflow's current destinations.

## Validation

- Desktop dropdown open and Escape close verified.
- Mobile menu and nested product links verified; Escape returns focus to menu trigger.
- Product-story anchors verified.
- Both `/` and `/homepage-baselane` return HTTP 200.
- One header on alternate route; no duplicate global chrome.
- No broken image elements or horizontal page overflow at mobile widths.
- No browser console errors observed on alternate route.
- noindex/nofollow metadata confirmed.
- Focused Biome check and TypeScript passed; 9 existing homepage/chrome tests passed.
- Responsive viewport override cleared on preview after checks.

## Follow-up polish

- Replace illustrative product panels with approved recordings when available.
- Review final brand copy and source-font usage before publishing. No publication performed.

## Multi-property page — 2026-09-07

Final result: passed (Innflow adaptation).

- Route: `/BL/BL-multi-property-investors`; shared BL navigation now includes this page.
- Reference: https://www.baselane.com/multi-property-investors. Desktop and 390px source captures inspected in Chrome; source font sizes read from DOM. Local desktop and mobile captures compared.
- Supplied assets copied from `Banking & Bookkeeping for Multi-Property Investors _ Baselane`; 11 original photo assets retained locally with separate mobile crops where supplied.
- Preserved portrait hero, property panorama with glass panel, three tall product cards, control grid, resource block, horizontal story row, and closing artwork. Adapted text and illustrative product panels to Innflow; testimonial section becomes workflow examples.
- Desktop and mobile navigation/submenu, Escape close, loaded images, and primary link destinations inspected. No document overflow at desktop, 390px, or 320px. All 11 page image elements loaded successfully at mobile width. Dark CTA text confirmed white by computed style.
- TypeScript and scoped Biome checks passed. No new test suite needed for static page composition.
- Preview remains local. No commit, push, or deployment.

## Rental audience batch 1 — 2026-09-07

Final result: passed for the two Innflow page adaptations.

- Added `/BL/BL-long-term-rentals` and `/BL/BL-mid-term-rentals` using a shared audience component with distinct content and assets. Original multi-property defaults retained.
- Source desktop and mobile references inspected in Chrome. Preserved hero, panorama/glass panel, three product columns, control grid, resource split, horizontal stories, and closing artwork. Mid-term includes the additional dark context strip.
- Same public source imagery copied locally while the user asset folder is being prepared; provenance is in `bl-rental-asset-sources.json`. No hotlinks.
- Innflow copy and illustrative product panels substitute for Baselane financial promises and endorsements, consistent with the existing BL adaptations.
- Verified long-term desktop and mobile hero, panels, menu/submenu/Escape and no overflow at 320px. Verified mid-term desktop/mobile at 390px, correct mobile crop, no failed images or document overflow, no console errors. Image decode completion checked after lazy loading.
- Scoped Biome and TypeScript passed. Google actions retain the working `/login` destination; direct social initiation remains a separate auth concern.
- No production deployment performed.


## Rental audience batch 2 — 2026-09-08

Routes: `/BL/BL-renters`, `/BL/BL-short-term-rentals`.

Prepared Downloads imagery copied with provenance in `docs/design/bl-rental-batch-2-assets.json`. Short-term preserves the audience-page composition and ocean promotion section. Renters preserves the family hero, statement panel, three split feature rows, three image cards, four-step sequence, and rooftop closing. Copy and illustrative panels describe Innflow workflows; source banking promises and testimonials are not presented as Innflow claims.

Chrome inline captures reviewed at desktop and 390 CSS-pixel mobile widths. No horizontal document overflow; renters navigation opened and closed with Escape. Hero contrast repaired with a light-blue gradient. Lazy images were reviewed across desktop and mobile scrolling; full-page screenshots can omit assets before entering the viewport. No console errors observed. Google links on short-term point to the existing app login page, not a direct OAuth endpoint. No authentication was submitted.

Scoped Biome and TypeScript passed. Original homepage remains unchanged. This is local implementation QA, not a deployment verification.


## Product page batch 3 — 2026-09-08

Routes: `/BL/BL-rent-collection-2`, `/BL/BL-landlord-accounting`. Final result: passed for this batch.

Source pages inspected in Chrome at desktop and phone widths. Captured the photographic hero, sticky section navigation, three image/product panels, additional-features grid (three versus six items), ocean promotion position, four cards, FAQ accordion, and rooftop closing. Verified source accounting in-page anchor and rent FAQ expansion. Source product controls are baked into imagery.

Implemented the captured structure with shared `BaselaneProductPage` and distinct content/assets. Sixteen desktop/mobile photos copied directly from the supplied collection; provenance is in `docs/design/bl-product-batch-3-assets.json`. Source hero images retain baked-in illustrative financial panels. Main feature panels use Innflow workflow illustrations. Financial guarantees, contest copy, and attributed customer testimonials were replaced with Innflow content and expandable workflow examples. This is a visual page recreation, not implementation of banking or payment services.

Chrome desktop and 390 CSS-pixel phone captures reviewed inline. Page anchor navigation, FAQ expansion, expandable use-case content, and mobile menu/Escape passed. Document width matched the phone viewport. Accounting mobile image audit confirmed all loaded image sources valid. No browser console errors observed on either route. Scoped Biome passed; `npm run typecheck` passed.

The existing app-login destination is preserved for Google CTAs; no OAuth submission was attempted. No main homepage edits or deployment changes in this batch.


## Product page batch 4 — 2026-09-08

Routes: `/BL/BL-tax-preparation`, `/BL/BL-landlord-insurance`.

Source desktop and mobile compositions inspected in Chrome. Tax preparation preserves the photographic hero, sticky navigation, three product panels, additional features, ocean section, four workflow cards, FAQ, and rooftop closing. Insurance preserves the form-led split hero, four benefits, three photographic process cards, three-column table, horizontal cards, and closing. Twelve source assets copied from the prepared Downloads collection with provenance in `docs/design/bl-product-batch-4-assets.json`.

Adaptations describe Innflow document coordination and property review. The insurance hero quote panel is covered by a coded illustrative workspace; process overlays also use Innflow examples. Its form validates required address, email, and phone inputs and prepares a downloadable local text brief. It does not request or issue insurance quotes. Tax hero retains the supplied illustrative document-selection panel; FAQ distinguishes coordination from professional tax filing. Source endorsements and partner claims are not attributed to Innflow.

Chrome desktop and 390px phone views reviewed inline, with no document overflow. Tax section anchor, FAQ expansion, and mobile navigation/Escape passed. Insurance empty submission correctly leaves three invalid fields and no result; a populated submission produced a brief, and the downloaded file was read back with the expected sample values and all six checklist rows. All eleven insurance image elements loaded after scrolling. Neither route logged browser errors. Scoped Biome and TypeScript passed.

Main homepage unchanged. Local implementation only; no push or deployment.


## Resource library batch 5 — 2026-09-08

Routes: `/BL/BL-resources`, `/BL/BL-webinars`. Source desktop and phone layouts inspected in Chrome. Recreated the featured image card, three blue gradient links, category strip, article search, three-column card rows, phone card stacks, pagination, and rooftop closing. Resource page contains eighteen article cards across three sections; webinar page contains six sessions. Twenty-six supplied images copied with provenance in `docs/design/bl-library-batch-5-assets.json`.

The original publisher is credited in the introduction and cards; article and session destinations remain the original Baselane pages. No third-party speakers, recordings, or events are presented as Innflow productions. Headlines and descriptions are shortened. The source webinar featured side links repeated a title and pointed to articles; this adaptation connects them to actual sessions. Category controls filter the captured collection, with an empty state and a link to the full source category when more content is needed. No registration was submitted.

Browser QA passed at desktop and 390 CSS-pixel phone widths. Search for Citibank returned its single card; no-result search and reset worked; banking filter returned six cards; tax webinar filter returned one. Pagination advanced to the remaining cards, and View all exposed all six sessions. Phone menu and Escape worked. All fourteen rendered resource images and all eight rendered webinar images loaded. No document overflow or console errors observed. Header/footer Resources now link to both alternates; destinations inspected. Scoped Biome and TypeScript passed.

Fixed the previous batch's missing route values for insurance and tax preparation in the inventory. No main homepage changes, push, or deployment.


## Editorial page batch 6 — 2026-09-08

Routes: `/BL/BL-product-updates`, `/BL/BL-real-estate-investing`. Source pages inspected in Chrome. Investing preserves the category bar, search, three-column article grid, phone stack, and rooftop closing; all forty reference cards have local artwork and original publisher destinations. Titles and descriptions are shortened, with Baselane attribution. Available topics filter the captured collection. Product updates preserves the split photographic introduction, sticky index, share control, and long-form illustrated entries. Its five entries describe verified Innflow preview batches instead of claiming Baselane’s release history as Innflow’s. Local preview status is explicit.

Forty-one assets copied from prepared Downloads files and hash-checked against the originals; manifest at `docs/design/bl-editorial-batch-6-assets.json`. Existing local artwork reused for update entries. Shared BL Resources navigation now includes both routes.

Chrome desktop and 390 CSS-pixel phone layout checks passed without document overflow. Investing search for Pennsylvania returned one article; clearing search and choosing Loans returned three resources; the full collection restored forty. Updates anchor navigation reached the chosen section and Copy page link reported success. Mobile menu/Escape passed. No browser console errors observed. Scoped Biome and TypeScript passed. Main homepage untouched; no push or deployment.

## Batch 7 — Demo and help center

- Added `/BL/BL-demo` and `/BL/BL-help-center`; shared BL navigation now reaches both.
- Demo preserves the photographic hero, unequal two-card grid, centered statement, and ocean closing. Sales calls to action use Innflow's configured contact destination; the learning card links the attributed masterclass library. Source endorsements and booking forms are not presented as Innflow's.
- Help center retains search hero, three contact cards, four expandable topic cards, and popular resource layout. Uses Innflow FAQ content and twelve existing topic links; two results for security and a zero-result search/reset verified in Chrome. Contact links inspected without sending messages.
- Reference help background was missing from supplied inventory and returned HTTP 403. Supplied demo house photography used as a blue-toned substitute. Existing shared BL navigation/footer retained for consistency.
- Chrome desktop and 390px phone reviewed; demo mobile crops loaded, no horizontal overflow, topic expansion and menu Escape work. Fixed hero and mobile card text contrast after visual review. No console errors on either preview.
- Scoped Biome and TypeScript pass. Six copied assets hash-match prepared downloads; provenance recorded in `docs/design/bl-support-batch-7-assets.json`. No production deployment.

## Batch 8 — Pricing

- Added `/BL/BL-pricing`, completing the seventeen yellow inventory rows. Shared BL pricing links point to this alternate page; the original pricing route and catalog remain unchanged.
- Reference roof photograph, three-column hero with two glass cards, expandable comparison groups, four-column information section, ocean band, four cards, FAQ and roof closing are present. Free and Pro lead; Business and Enterprise appear in the comparison and growth section. All rates and capacity values come from `src/config/pricing.ts`.
- Adapted financial fee tables to Innflow billing/usage explanations and source testimonials to rental audience cards. No Baselane bank rates, insurance claims, customer endorsements or sweepstakes are attributed to Innflow.
- Chrome verified monthly Pro $19.99 / Business $199.99; annual Pro $16.99 / Business $169.99 and monthly billing disclosure. All three groups expand/collapse, FAQ opens, and comparison regions scroll with ArrowRight on phone (53px observed). No page-level horizontal overflow at 390px; all five images loaded and console errors empty.
- Scoped Biome and TypeScript pass; both copied roof assets hash-match the prepared Downloads originals. Screenshot review covered desktop hero/comparison and complete phone page. No deployment.
- Additional inventory investigation: row 43 `/rent-collection` remains a distinct live page, not a redirect to `/rent-collection-2`; it remains pending for its own adaptation.

## Batch 9 — Legal directory and policies

- Added `/BL/BL-legal-agreements`, `/BL/BL-privacy-policy`, and `/BL/BL-terms-of-use` for inventory rows 28, 31, 32. Directory uses reference three-section, two-column layout with ruled links; policy pages use centered titles and a narrow reading column.
- Reuses exact existing Innflow policy IDs and Termly embed component. No policy text, legal commitments, dates, or third-party banking agreements were rewritten. The external document retains Termly typography; shell and navigation use the BL styling. Complete-policy link remains available above each document.
- Chrome verified privacy document rendered (13,385px embedded height) and navigation to the configured terms ID (12,433px desktop height). Terms content visibly identifies Innflow and renders within a 304px mobile frame without page overflow. Directory reviewed desktop and phone; seven destinations inspected; back and cross-policy navigation exercised. No console errors.
- No new image assets needed for these text-only reference pages. Existing wordmark and policy provider reused. Scoped Biome and TypeScript pass. Main legal routes and their document configuration unchanged; no production deployment.

## Batch 10 — About and Careers

- Added `/BL/BL-about` and `/BL/BL-careers`; BL Why Innflow navigation/footer exposes both.
- Preserved inset roof-photo heroes, split statement/visual sections, expandable principles, About four-column band and three-card section, Careers panorama and three-column introduction, link band and photographic closing.
- Used supplied architectural imagery and coded Innflow examples. Replaced source founder portraits, funding/volume claims, investor logos and press endorsements with product context and navigation. Careers inquiry points to the configured Innflow support address with a careers subject; no job openings, benefits, hiring process or biographies were invented, and no message was sent.
- Chrome desktop About hero and split sections reviewed; phone full page and career hero checked. All About and Careers images loaded at phone size, no horizontal page overflow. Principles expand and careers hero reaches `#career-inquiries`; inquiry mailto destination inspected. Console errors empty. Five copied assets hash-match prepared Downloads files. Scoped Biome and TypeScript pass; no deployment.

## Batch 11 — Security

- Added `/BL/BL-security` using supplied hero desktop/mobile and three section photographs. Preserved full-width hero, three-column band, alternating photo/accordion sections and central link band. Navigation exposes the new page.
- Copy is grounded in existing Innflow security guidance (`src/content/platform-remaining.ts` and `src/content/home.ts`): evidence review, access, connected-account scopes, data handling and deployment requirements. Source FDIC, financial partner, certification and fraud guarantees were not attributed to Innflow. Policy links lead to the implemented BL legal routes.
- Chrome desktop hero and alternating sections reviewed; complete 390px phone layout reviewed, all six images loaded and no horizontal overflow. Access topic reaches `#access`; connected-account scope expansion verified. No console errors. Five assets hash-match prepared Downloads originals. Scoped Biome and TypeScript pass; no deployment.

## Batch 12 — Referral and partnerships

- Added `/BL/BL-landlord-referral` and `/BL/BL-partner-with-us`; shared Why Innflow navigation/footer reaches both.
- Reference split photo heroes, referral four-step accordion, partner audience cards, six-topic grid, large demo panel, three-step inquiry section and photographic closing preserved. Supplied photography copied locally; eight files hash-match the Downloads originals with provenance in `docs/design/bl-partners-batch-12-assets.json`.
- Source cash referral/affiliate rewards have no corresponding Innflow program configuration. Copy instead provides a public share link and a partnership inquiry; no reward, commission, enrollment or tracking is promised. Source banking phone screenshots/video replaced with an illustrative blue Innflow workflow and a working demo-page link. Inquiry opens the configured support email with a partnership subject; no message sent.
- Chrome desktop and 390px mobile reviewed. Clipboard reports success, public URL remains selectable, partner hero anchor reaches inquiry, accordion expansion and mobile menu/Escape work. All eight partner images loaded; no document horizontal overflow and no console errors observed. Scoped Biome and TypeScript pass. No push or deployment.

## Batch 13 — Deposit workflows and rent-collection variant

- Added `/BL/BL-security-deposit-account` and `/BL/BL-rent-collection`; both are exposed in BL Solutions navigation/footer.
- Deposit layout preserves split roof-photo hero, three-point band, alternating owner/resident accordion sections, four-feature grid, three related cards, onboarding rows, all fifty state-guide links, four attributed resource destinations, and eight FAQs. Financial account/interest/payment promises adapted to Innflow document and workflow coordination. Google CTA replaces the source email signup form. Related cards reuse supplied photography instead of banking UI screenshots.
- Four deposit assets copied and hash-checked against prepared Downloads files, with provenance manifest. All fifty state URLs match the observed reference naming. The guides and four articles remain visibly attributed outbound Baselane resources; no state-law content is rewritten.
- Reference behavior changed during inspection: Chrome navigation from `/rent-collection` now lands on `/rent-collection-2`, while the fetched source still exposes the older variant without the short-term band. Kept an independent alternate route using the existing rental product layout/assets with that band disabled. The original `/BL/BL-rent-collection-2` retains its band.
- Desktop and 390px phone layouts reviewed. Deposit anchor/accordion and rental feature anchor/FAQ expansion passed; fifty state links rendered, all deposit and rental images loaded, no horizontal document overflow or console errors observed. Scoped Biome and TypeScript passed. No push or deployment.

## Batch 14 — Rental forms and lease workflows

- Added `/BL/BL-free-rental-forms-and-templates-for-landlords` and `/BL/BL-lease-agreement`, with BL Resources navigation/footer links.
- Forms preserves the split photographic introduction, band, four resource carousels, collection links, arrow controls, and roof closing. All twenty-one template URLs were compared directly with the source DOM and match. Titles shortened; publisher attribution replaces source testimonial claims. Buttons open Baselane download pages, with the potential publisher signup requirement stated. No document gates bypassed or email submitted.
- Lease preserves the dark uppercase hero, supplied illustrations, three-card band, four-step walkthrough, four-card section, six expandable FAQs, and dark closing. Innflow coordinates document work; the original Baselane resource remains linked and illustrations attributed. No lease generation, e-signature service, universal legal compliance, or free lease allowance is promised on Innflow's behalf. Signup forms replaced with working destinations.
- Three copied assets hash-match prepared Downloads files, recorded in `docs/design/bl-forms-batch-14-assets.json`. Existing roof photography reused. Desktop and 390px phone reviewed; carousel advances (306px phone scroll observed), keyboard scroll region available, FAQ expands, images load, no page overflow or console errors. Card spacing corrected after review. Scoped Biome and TypeScript pass. No push or deployment.

## Batch 15 — Industry coverage

- Added `/BL/BL-in-the-news`, linked in the shared Why Innflow navigation/footer. Preserves the reference centered introduction, six-card press carousel, two split photographic feature sections with product overlays, and centered publisher closing.
- Six publisher URLs retained; article descriptions paraphrased. Coverage and product screenshots explicitly attributed to Baselane, rather than presented as Innflow endorsements or capabilities.
- Ten supplied assets copied and hash-matched with provenance in `docs/design/bl-news-batch-15-assets.json`. Chrome desktop and 390px mobile reviewed; carousel advances, overlays render, no horizontal document overflow or console errors observed. Offscreen carousel images use native lazy loading. Scoped Biome and TypeScript pass. No push or deployment.

## Batch 16 — Investor stories

- Added `/BL/BL-our-customers` and shared Why Innflow navigation/footer link. Preserves photo hero, five portrait video cards with an enlarged active card, twelve review highlights in two groups, four case-study slides with original PDF destinations, and photographic closing.
- Stories remain explicitly attributed to Baselane. Review themes and case summaries paraphrased; no Baselane customer counts, ratings, financial results, or partnerships attributed to Innflow. Mobile supplied hero image placed below the copy after review to avoid overlapping embedded review cards.
- Eleven prepared images hash-matched. Five original published MP4s copied locally after external embeds failed to become playable; files probed successfully and source URLs/hashes/durations recorded in the asset manifest. Playback verified in Chrome at 5.37 seconds; switching to another story leaves exactly one paused player. No autoplay. Original publisher supplies no caption tracks; this limitation is stated beside the gallery.
- Chrome desktop and 390px phone reviewed; anchors, review pagination, and all four case-study selections exercised. No horizontal document overflow or console errors observed. Scoped Biome and TypeScript pass. No push or deployment.

## Batch 17 — Rent comparison calculator

- Added `/BL/BL-how-much-should-i-charge-for-rent` and Resources navigation/footer link. Preserves split form/photo layout, pill controls, report metrics, sticky article sidebar, sharing control, and five guide sections. Both supplied responsive hero images hash-match Downloads assets.
- No address-based rental-data provider is configured in Innflow. The implemented calculator explicitly summarizes visitor-entered comparable monthly rents; address/bed/bath/type label the report and do not filter the inputs. The original Baselane lookup remains linked. Email marketing collection and third-party submission were not copied. This is a functional comparison worksheet, not live market-estimate parity.
- Median, arithmetic mean, quartiles by linear interpolation, range, and sample size calculated locally; no invented market data. Nine unit tests cover unsorted samples, interpolation, decimals, repeated values, invalid inputs, and sample-size limits.
- Chrome desktop and 390px mobile verified: four-rent sample produced 1700 median, 1750 mean, 1500/1950 quartiles; five-rent sample produced 2000 median/mean and 1900/2100 quartiles. Invalid sample rejected; edit preserves input; copy and guide navigation exercised. No horizontal overflow. Scoped Biome and TypeScript pass. No push or deployment.

## Batch 18 — Screening resources

- Added `/BL/BL-tenant-screening-service` with Solutions navigation/footer link. Dark uppercase hero uses light-blue accent; preserves three-point band, overview and sample link, comparison table, alternating report illustrations, interactive pricing cards, three workflow cards, product band, audience portraits, eight FAQs, and dark closing.
- Provider resource and screenshots attributed to Baselane. No screening, identity verification, credit-report access, processing-time guarantee, or applicant billing represented as an Innflow capability. Pricing is an explicitly labeled provider illustration; report links open the original service or its sample PDF (HTTP 200 verified).
- Nine supplied assets hash-matched and recorded in the batch manifest. Chrome desktop and 390px mobile reviewed; all images loaded. Pricing starts at 24.99, all options produce 49.99, deselecting the five-dollar option produces 44.99. FAQ expansion works; no horizontal document overflow.
- Existing Chrome preview initially stalled before hydration; reloading the same tab restored interaction and image loading. Scoped Biome and TypeScript pass. No push or deployment.

## Batch 19 — Financing resources

- Added `/BL/BL-rental-property-loans` and shared Solutions navigation/footer link. Preserves split photo hero, three-point band, seven category cards, coverage map, four loan cards, two alternating feature sections, four detailed tabs, audience cards, comparison table, four steps, and ten FAQs.
- Financial offers adapted to an attributed Baselane resource and lender discussion worksheet. No loan approval, lending coverage, rates, or Innflow financial service claimed. Original provider destinations retained.
- Six supplied assets hash-match Downloads files; provenance recorded in the batch manifest. Corrected photo alternative text after visual inspection.
- Desktop and 390px Chrome reviewed. Loan cards select and focus the relevant tab; Home and ArrowRight keyboard navigation selects DSCR correctly; FAQ expands. All six images load, no horizontal document overflow or console errors. Scoped Biome and TypeScript pass. No push or deployment.

## Batch 20 — Savings resources (visual QA pending)

- Added `/BL/BL-landlord-banking-apy`, with shared Solutions navigation/footer link. Preserves split hero, three layered photo/product cards, four balance rows, three feature columns over roof photography, four fee columns, three support rows, and photo closing. Light-blue surfaces and charcoal gradient buttons follow the BL theme.
- Original reference: https://www.baselane.com/landlord-banking-apy. Its displayed base/bonus table conflicts with the total-yield footnote. This resource links to current provider terms instead of quoting an Innflow yield or fee schedule. Banking illustrations explicitly attributed to Baselane; no Innflow deposit product implied.
- Eleven supplied assets copied with source URLs and SHA-256 provenance. Scoped Biome and TypeScript pass. Desktop HTML/layout observed without document overflow, but Chrome did not finish loading images and subsequently timed out during page control. Direct original and optimized hero requests both returned HTTP 200. Full rendered-image, mobile, and navigation QA remain pending; this batch is not fully verified. No push or deployment.

## Batch 21 — Advisor partnerships; savings QA follow-up

- Added `/BL/BL-advisor-partner-program` for inventory row 23, whose source now redirects to https://get.baselane.com/advisor-partner-program. Shared Why Innflow navigation/footer exposes the route. Six supplied images copied with provenance and hashes.
- Preserves split hero, four-point band, three portrait stories, four-topic accordion, three benefits, three-tier comparison, illustrated next-step accordion, and two-column inquiry form. Stories and banking screenshots attributed to Baselane; program terms stay with the original provider. No Innflow reward/enrollment promise.
- Inquiry validates required fields, exposes an additional role field for Other, and builds a local review plus a mailto draft addressed to configured Innflow support. Editing inputs invalidates the old draft. Tested with fictitious preview values on desktop and 390px mobile; no email opened or sent. Native accordions exercised; all six images loaded; no horizontal document overflow.
- Savings visual QA is now complete: all seven inline images, layered cards, and desktop/mobile photographic backgrounds rendered correctly in Chrome. Both viewport layouts reviewed without document overflow. Earlier timeouts did not require a dev-server restart.
- Scoped Biome and TypeScript pass. No push or deployment.

## Batch 22 — Inventory navigation and delivery audit

- Added eight previously missing local destinations to shared Solutions/footer navigation. Long dropdowns now scroll within viewport height. Added an expandable, explicitly attributed Baselane reference footer containing the inventory’s two app-store, four social, and two bank-disclosure links.
- All 45 rows re-matched directly against Numbers; 37 local routes and 8 external destinations covered. Production HTML includes every mapped footer destination. All 37 routes and all 52 internal linked destinations return HTTP 200. All 187 rendered image sources resolve where local.
- Production build and TypeScript pass; 111 tests in 23 files pass; scoped Biome passes. All 206 manifest asset records match their hashes. Desktop navigation and 390px expanded footer reviewed without document overflow.
- External links match inventory exactly; seven respond HTTP 200, LinkedIn returns HTTP 999 to automated requests. This remote limitation is recorded without claiming its destination was successfully loaded.
- Full inventory map, evidence, adaptation boundaries, and publication state recorded in `docs/design/bl-inventory-delivery.md` and machine-readable `bl-inventory-audit.json`. No push or deployment.
