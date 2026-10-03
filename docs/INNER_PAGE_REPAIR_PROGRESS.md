# Inner-page repair progress

Updated October 2, 2026 (America/New_York).

## Scope

Public inner pages in `innflow-web`. The homepage, preview homepage, and its animation work are excluded at the user's request. Existing staged and unstaged homepage/Rive changes are preserved. This work is local only: no commit, push, CMS publication, or deployment was performed.

## Repairs completed

- Product updates Copy page link now uses the configured public `/product-updates` URL instead of the current browser address, avoiding localhost and query parameters in copied links. Added mocked success and failure regressions; both pass, alongside scoped Biome, TypeScript and diff checks. No system clipboard write occurred. This change postdates the latest production build.

- Added responsive size hints to both news feature photos, matching the mobile single-column and desktop 1.1:1 grid without changing crops or layout. At 390px the browser selected 384px-wide candidates for both 337px rendered photos, with no horizontal overflow or console errors. A focused candidate regression, scoped Biome, TypeScript and diff checks pass. Production rebuild and desktop image checks remain pending.

- Added the Skills directory, published skill detail routes, and Help to the sitemap, with regression coverage.
- Added page-specific descriptions, canonical URLs, and social-sharing metadata to 25 routes. The Demo page no longer inherits a homepage canonical URL.
- Removed duplicate directory navigation and replaced internal BL labels with Innflow labels.
- Extracted `InnerPageShell` and switched 28 inner-page consumers to it. The wrapper retains the same markup and styling without importing the unused fallback homepage demo. Homepage source files were not modified by this repair pass.
- Removed an unused duplicate testimonial helper field. Published/draft selection behavior and CMS content were not changed.
- Updated stale navigation, CTA, and feature-artwork tests to reflect the existing inner-page behavior; added coverage for the new shell and dedicated listing artwork.
- Added a repeatable inner-page audit and route-specific bundle checks.
- Extracted the 26 industry names and slugs into a small shared navigation index. The header no longer pulls in complete industry workflow examples; tests verify labels and destinations remain aligned with the full pages.
- Fixed stale rent-calculator results: changing inputs clears the previous report, invalid rents receive focus and an accessible invalid state, and whitespace-only addresses are rejected.
- Fixed stale property-review downloads: editing the form clears the old brief until it is prepared again. Native form validity is checked before generating a brief.
- Fixed the blog directory's HTTP 500 for repeated search parameters. Filters now consistently use the first trimmed value, whitespace-only searches remain unfiltered, malformed page numbers fall back safely, and posts with empty industry lists appear under General.
- Resource and investing category arrows now use instant scrolling when reduced motion is requested, retaining smooth scrolling otherwise. Four interaction regressions cover both directions on both pages.
- Advisor inquiries reject whitespace-only required fields, trim draft values, and clear custom errors when edited. Existing local email-draft behavior remains unchanged; no inquiry was sent.
- Replaced internal release-scope wording on the custom 404 page with a clear missing-page explanation and links to Home and Products. Homepage source and behavior remain unchanged.
- Integration load failures now invoke Next.js's route `retry` callback instead of `reset`, so Try again requests fresh contents instead of only clearing boundary state. Verified the installed Next.js 16.3 runtime supplies this callback and its documentation distinguishes these behaviors.

## Verification

- Refreshed full production route audit after the latest build: 1,018 URLs, zero audit failures (2026-10-03 02:38 UTC). The report covers HTTP responses, metadata, canonical paths, H1 counts and discovered local destinations, not full visual/behavior acceptance. Rechecked About's modern declared JavaScript at 229,883 gzip bytes versus the 184,320-byte ceiling; CSS 50,586 bytes passes its 51,200-byte ceiling. The shared navigation performance gap remains unresolved, not hidden by the passing route audit.

- Production article narration controls tested with a silent browser speech stub: Play invoked speak once and changed the accessible label to Pause; Pause invoked pause once and restored Play. No sound was generated. General category navigation loaded the filtered blog directory, but performed a document navigation that discarded instrumentation, so this does not prove the component's unmount cleanup in-browser. Reload removed the test stubs; unmount coverage remains the focused automated regression.

- Restarted only the verified repository-owned production preview on port 3013 after the latest successful build; port 3012 was untouched. Latest targeted audit of the representative blog article, Product updates, In the news and Integrations returned 200 with required metadata, matching canonical paths and one H1, with zero audit failures. `inner-page-targeted-audit-report.json` now holds this four-route snapshot; earlier 25-route findings remain historical evidence in this log.

- Integration directory regression now covers category plus availability plus trimmed case-insensitive search together, active category state, and Reset all returning to the first 24 results. All three directory tests and TypeScript pass. Current implementation already handles this case; no directory behavior change was needed.

- Rental applications FAQ at 320px: first question opens on click, Enter closes and reopens it while retaining SUMMARY focus. Other answers remain closed; expanded state has no horizontal overflow. Inspected `output/playwright/inner-rental-faq-320.png`: visible keyboard outline, wrapped question and readable answer. This verifies a representative native-details interaction, not all FAQ content.

- At 320×740, Bank sync, Bookkeeping, CRM, Files and documents, Reports, Showings, Tenant management, Work orders, Communication tools and Rental applications all returned 200, rendered one H1 and had no document overflow or main-content input/select/textarea/button wider than the viewport. Inspected the Rental applications hero screenshot (`output/playwright/inner-rental-applications-320.png`): headline, description and CTAs remain readable. This covers initial rendered states, not every lower section or interaction.

- At 390×844, a rendered-DOM sweep of Contact, Product updates, Legal agreements, FAQ, Security, Careers, Connections and Lease agreement found one H1 per page, no document overflow, no main-content buttons lacking text/ARIA/title labeling, and no main-content form fields lacking labels/ARIA. This is a basic labeling heuristic, not an accessibility audit or verification of every interactive state. No forms were submitted.

- News follow-up: at 1440px both feature photos rendered at 665.75px and selected loaded 750px candidates, without page overflow. At 390px the Media coverage region retained focus and ArrowRight scrolled it to 327px, without document overflow or console errors. Latest production build completed successfully after the audio cleanup, sharing recovery and news photo changes. This is build and targeted interaction evidence, not a complete site acceptance check.

- Browser-tested sharing failure recovery at 320px with native share and clipboard APIs deliberately mocked to reject. The announced fallback and correct canonical post URL appeared without horizontal overflow or console errors. Clicking the read-only field selected all 46 characters. Inspected `output/playwright/inner-blog-share-fallback-320.png`; reloaded afterward to remove the temporary browser mocks. No external sharing or system clipboard write occurred. Native platform sharing itself remains untested.

- Latest development browser check of `/blog/1031-exchange-timeline` at 320×740: one H1, no horizontal overflow, audio controls visible and readable, speed changes from 1x to 1.5x with narration estimate updating from 14:03 to 9:22. Inspected `output/playwright/inner-blog-audio-320.png`. No audio played and no sharing action was triggered. Console had no errors; shared image sizing, Termly ordering and development CSS preload warnings remain. This verifies the default player rendering and speed control only, not audio playback, share failure presentation, or unmount behavior in a real browser.

- Initial crawl: 1,018 URLs checked, no HTTP failures. `/industries` redirected to `/solutions`. This is a baseline snapshot, not a visual or interaction review of every route.
- Latest targeted rendered-page check: all 25 metadata repair routes returned 200 with a title, description, non-homepage canonical, and one H1. See `inner-page-targeted-audit-report.json`.
- Representative browser checks covered pricing, products, platform, integrations, skills, solutions, help, about, security, resources, connections, help center, contact, demo, and example detail pages at desktop and mobile sizes. No horizontal overflow was found in those checks.
- Pricing billing selection and integration search/empty-state recovery passed in the browser. No external forms were submitted.
- Production build passed after the latest metadata, navigation, and form repairs, generating 1,034 static pages. This confirms compilation, not a complete visual review of every generated page.
- Latest full test run: 467 passed, 1 failed across 85 files. The remaining failure is the pre-existing homepage copy expectation in `baseline-lower-sections.test.tsx`, left untouched because the homepage is excluded. This run includes the audio, sharing, news, updates and combined integration filter regressions.
- Blog regression coverage verifies repeated parameters, combined filters, filter-preserving pagination, nonduplicated results, and whitespace-only search. Live development requests with repeated search, industry, and page parameters all returned HTTP 200 with one H1. TypeScript passed after these changes.
- Resource-library tests cover combined category/search filtering, empty-state reset, workflow-topic pagination boundaries, category changes resetting pagination, and View all/Show fewer. These are component tests, not a substitute for the remaining browser checks.
- The six resource filtering, pagination, and motion tests pass together. TypeScript and whitespace checks pass after the reduced-motion repair.
- The production build passed again after the blog and resource-motion repairs, generating all 1,034 static pages. The local production server was restarted and representative browser revalidation is recorded below; comprehensive rendering checks remain ongoing.
- Restarted the dedicated local production server on port 3013 with that build. Resource category plus search returned the expected single brief card; an unmatched query showed the empty state, and Reset filters restored all 12 cards. Both filtered and reset states had no horizontal overflow at 390px. No console errors were reported.
- Help search was checked at 390px: searching security returned one result and the dialog fit within the viewport. The browser's search-input Escape behavior clears the query first; a second Escape closed the dialog and restored focus to its opener. No console errors or horizontal overflow were observed. Support actions were not submitted.
- Help's mobile Menu to Contact support transition also closed with Escape and restored focus to Menu. Existing native-dialog behavior was preserved.
- Production blog URLs with repeated search, industry, and page parameters, plus whitespace-only search, returned 200 and one H1. The webinars and investing routes did as well.
- At 390px, the webinar Next control showed the remaining three distinct topics and became disabled on the final page. View all displayed all six cards without horizontal overflow or console errors.
- Added worksheet-library regression coverage for every generated text download: matching title and description, editable preparation fields, preparation-only disclaimer, unique filename, and category anchors. This validates rendered download payloads, not browser file-save behavior.
- Two advisor-form regressions pass for invalid values, error recovery, trimmed draft contents, and removal of stale drafts after edits. TypeScript passes. Production-build revalidation of this latest form repair remains pending.
- Advisor form browser verification at 390px passed on the development server: whitespace-only first name and Other role were both rejected with focus on the first invalid field. Correcting them produced a trimmed local draft without horizontal overflow. Switching from Other to Bookkeeper removed both the conditional field and stale draft. The email link was not opened and nothing was sent.
- A static scan of 523 literal image-path references outside preview/component-lab found no missing local files after inspecting two apparent misses and confirming they are remote badge URLs. This does not cover computed paths, remote availability, or visual correctness.
- Invalid product, platform, feature, integration, skill, blog, solution, and industry URLs returned HTTP 404 and noindex in the production build. The updated custom 404 copy has a focused recovery-link regression and was visually checked at 820px on the development server (`output/playwright/inner-not-found-tablet.png`). The expected failed document request was the only console error; shared image-sizing and consent-script warnings remain separate findings.
- A subsequent production build passed with the advisor validation and new 404 copy, generating 1,034 static pages. It preceded the integration retry edit. The retry callback has focused component regression coverage; an induced server-failure recovery browser check remains outstanding.
- Pricing comparison regression passes: Collapse all hides all three tables, Enter on an individual group reveals only that table, Expand all restores them, and aria-expanded/aria-controls remain synchronized with each panel's hidden state. Pricing amounts and design were not changed.
- Checked same-page fragment links in production HTML across 76 top-level inner routes from the route inventory. No nonempty fragment links pointed to missing IDs. This covers rendered local anchors only, not remote links, deferred client markup, or every generated detail route. The deliberate Termly `href="#"` trigger was excluded.
- Checked all 398 distinct local main-content image sources extracted from those 76 production routes, including URLs decoded from Next Image requests. Every source returned a successful response with an image content type. This excludes CSS backgrounds, picture source alternatives, remote images, and runtime-only media; it is a delivery check, not a full visual audit.
- A separate delivery check covered 53 distinct local picture-source alternatives and CSS-referenced assets discovered across the same 76 routes and 31 stylesheets. All returned successful responses. Remote URLs and relative stylesheet URLs were not included; browser visual checks remain necessary for crops and layout.
- Inspected the careers mobile hero screenshot at 390px. Its heading, supporting copy, CTA, and next-section introduction are readable without overlap in the captured viewport. Artifact: `output/playwright/inner-careers-mobile.png`. No console errors were reported.
- At 820px, Pricing has no document overflow and all three comparison tables stay inside their scroll containers. The pricing hero and first plan row were visually inspected in `output/playwright/inner-pricing-tablet.png`. Contact also has no document overflow or fields extending outside the viewport; screenshot: `output/playwright/inner-contact-tablet.png`. Neither route reported console errors.
- Latest focused verification: all 25 tests across nine recently added/changed suites pass together. TypeScript and `git diff --check` pass.
- TypeScript and `git diff --check` passed after the navigation and form repairs.
- In the mobile browser, the calculator returned the expected median of $1,700 and average of $1,750 for the supplied sample. Invalid input now removes the old report, marks the field invalid, and returns focus to it, with no horizontal overflow.
- The property-review form was tested with dummy details in the mobile browser. Editing the address now removes both the old brief and its download control; no horizontal overflow was observed and no details were submitted externally.

## Performance result and remaining gap

Production `/pricing`, measured locally on port 3013 using the bundle audit:

| Measure | Before shell extraction | After shell extraction |
| --- | ---: | ---: |
| JavaScript gzip bytes | 284,425 | 280,183 |
| CSS gzip bytes | 56,494 | 52,559 |

This is a modest improvement, not a completed performance repair. JavaScript remains above the 184,320-byte ceiling and CSS remains above the 51,200-byte budget. Shared dependencies need further profiling before additional changes.

After extracting the industry navigation index, total declared JavaScript fell to 273,131 gzip bytes, a further 7,052-byte reduction. CSS measured 51,329 bytes in that build; chunk composition can change between builds, so do not attribute that CSS difference to the data-only refactor.

The original checker counted a 39,473-byte `nomodule` polyfill in initial JavaScript. Browser resource timing confirmed this asset was not downloaded by the modern test browser. The checker now reports it separately, preserves the combined total, and has four regression tests for asset discovery. The corrected modern-browser JavaScript measurement is 233,658 bytes, still above budget. This accounting correction is not a download reduction. The script measures SSR-declared assets, not all runtime traffic or consent behavior.

Additional production measurements on the same build: `/about` declares 229,883 modern JavaScript gzip bytes and 50,586 CSS bytes; `/partner-with-us` declares 233,363 JavaScript bytes and 50,697 CSS bytes. Both pass CSS but exceed the JavaScript ceiling. Their shared asset set includes the same 47,286-byte Motion chunk, while the partner-specific difference is 3,480 bytes. Source inspection confirms `site-header.tsx` imports `MobileNavigation` from `editorial-header.tsx`, which statically imports Motion. Prioritize safe separation/deferred loading of inner-page navigation dependencies rather than rewriting static page content. No shared navigation changes were made during this profiling pass.

## Still to do

Latest build completed with all 1,034 generated pages after the product-updates canonical copy-link repair and integration filter regression. Shared consent and navigation changes remain awaiting explicit scope clarification because root layout uses them on the excluded homepage too. No automatic goal continuation is treated as permission for those changes. Further inner-page runtime checks remain possible; the overall goal is not complete.

Article sharing recovery: native-share failures now fall back to clipboard; clipboard success is announced, and unavailable/rejected copying exposes a read-only selectable post link. Native share cancellation remains quiet and does not write the clipboard. Cancellation regression caught a DOMException/Error identity mismatch, corrected with an error-name guard. Four share tests, scoped Biome, TypeScript and diff checks pass. All sharing APIs were mocked; nothing was externally shared or copied. Browser verification remains pending, with article layout otherwise preserved.

Article audio navigation cleanup: capture the current recorded audio element inside the effect so unmount cleanup can pause it even after React clears the DOM ref. Rebind cleanup when the audio source changes. Added an unmount regression; all four player tests, scoped Biome, TypeScript and diff checks pass. No real audio playback was performed. This follow-up postdates the latest successful production build and still needs runtime verification.

Latest full verification: production build completed successfully with 1,034 generated pages. Full Vitest run completed with 459 passing tests and one failure out of 460: the excluded homepage-preview infrastructure heading assertion expects older copy (`baseline-lower-sections.test.tsx:200`). No homepage assertion or implementation was changed. This verifies compilation and the current automated coverage, not complete visual coverage or publication. Latest article audio changes still need browser verification. Removed the audio regression test's non-null assertion in favor of an explicit missing-element failure.

Text-to-speech fallback now announces unsupported browsers instead of silently ignoring Play. Non-cancellation narration errors get a retry message; deliberate cancellation/interruption is ignored to avoid stale failure messages. Added unsupported-browser coverage. Three player tests pass, and TypeScript/diff checks pass after the cancellation guard. No speech was played during testing.

Audio recovery follow-up: successful media play now clears stale rejection/load messages, and pause restores the Play control. Added mocked assertions for both rejection-to-play and error-to-play-to-pause sequences. Three player/taxonomy tests, TypeScript, and diff checks pass; no actual audio playback or deployment occurred.

Article audio repair: handle rejected media play promises and media-load errors with an announced retry message; playback button state now follows media play/pause/end events. Recorded audio duration is no longer overwritten by transcript estimates when changing speed. Mocked tests cover rejection, metadata duration, speed changes, and media error state, alongside existing speech narration coverage. Both player tests and TypeScript pass. No real audio was played; production rebuild and browser verification remain pending.

Rebuilt article browser check at 320px: one H1, no document overflow or broken loaded main-content images; content-type expansion sets aria-expanded=true and wraps all category links within the viewport. Inspected screenshots `inner-blog-taxonomy-320.png` (article header) and `inner-blog-types-320.png` (expanded types). Category labels and focus indicator remain readable. This covers the representative article and category expansion, not every article or audio playback.

Blog article production measurement: `/blog/1031-exchange-timeline` modern SSR-declared JavaScript decreased from 274,114 to 235,073 gzip bytes after label-helper extraction (39,041 bytes, about 14.2%). CSS stays 52,444 bytes. The production build passed with 1,034 generated pages. JavaScript and CSS budgets still fail, so this does not close performance work. New taxonomy regression covers encoded industry/tag/category URLs, expansion/collapse state, and avoiding a duplicate active category; it passes.

Blog taxonomy dependency repair: extracted unchanged `humanizeCategory` into `blog-labels.ts`; the interactive taxonomy now imports that presentation-only helper instead of the CMS module. Existing CMS imports remain compatible through a re-export. Blog-design guidance was read and the approved layout, labels, filters, author treatment, and article content remain unchanged. Sanity tests, TypeScript, and scoped helper/taxonomy lint pass. Production bundle and browser verification remain pending for this latest extraction.

Skills production measurement after helper separation: modern SSR-declared JavaScript decreased from 273,416 to 234,361 gzip bytes (39,055 bytes, about 14.3%). CSS remains 49,556 bytes. The new production build generated all 1,034 pages successfully and is running on the verified dedicated port 3013. The JavaScript total still exceeds the 184,320-byte ceiling; this is a measured improvement, not a passing performance gate. Import-order formatting was corrected afterward without behavior changes.

Skills client boundary: moved the unchanged color mapping into presentation-only `src/lib/skill-colors.ts` and switched SkillsLibrary's runtime import to it. The CMS module re-exports the helpers for existing consumers; type-only imports remain erased. This removes the client component's direct runtime dependency on the module that initializes CMS queries/client configuration. Existing color/data tests and SkillsLibrary behavior tests pass, along with TypeScript and diff checks. Bundle-byte savings are not yet measured and are not claimed.

Directory regression pass: added Skills Library coverage for case/whitespace-normalized description search, combined category filtering, zero-result recovery through All, uncategorized results, restored full counts, and detail-link destinations. This and the existing integration search/pagination/reset coverage pass together (three tests). No directory behavior change was needed for the tested cases.

Scoped quality follow-up: converted the four comparison-region wrappers to semantic named sections and documented the intentional tabindex needed for horizontal keyboard scrolling. Formatted the touched components. Biome checks on all four components and seven focused tests pass; no blanket lint suppression was added.

Three-region browser follow-up at 320px: advisor and savings regions both retain focus and scroll 40 pixels with ArrowRight (690/630-pixel content within 267-pixel containers). The property-review table fits its 267-pixel container, needs no horizontal scroll, and remains a named focus target. None of these pages showed document overflow or console errors. These checks used the development build; production rebuilding remains outstanding for the latest accessibility changes.

Verified financing comparison keyboard scroll at 320px in the development browser: the focused 267-pixel region scrolled its 700-pixel table 40 pixels on ArrowRight. Applied the same named, focusable-region treatment and focus outline to the advisor, savings, and property-review tables, which lacked explicit keyboard targets. Seven existing focused tests and TypeScript pass. These three additional regions still need individual browser checks and the latest accessibility changes need production rebuilding.

320-pixel financing check: document stays within the viewport; the wide tab strip and 700-pixel comparison table use local horizontal scrolling. Added an explicitly focusable, named comparison region and visible focus outline so keyboard access does not depend on browser-specific automatic scroll-container focusability. Both loan component tests and TypeScript pass. Live keyboard scrolling of the updated region remains to be checked.

Canonical regression guard: the inner-page audit now rejects canonicals pointing to any different route, not only the homepage, and reports malformed URLs without aborting the run. It allows the public hostname during localhost testing and trailing slashes. Four helper tests cover these cases plus protocol/query/fragment validation; all pass. Fresh production checks for About, both Help routes, and Blog pass with the stricter validator. Intentional future cross-route canonical aliases would need explicit documented handling.

Metadata uniqueness follow-up: every canonical in the 1,018-URL report matches its route path. Seven title pairs are duplicated: four blog pairs (1031 exchange, AI automation toolkit, AI chatbots, commercial property software), `/help` with `/help-center`, `/platform` with `/products/platform`, and `/rent-collection` with `/rent-collection-2`. Read-only comparisons show differing rendered main-content text for every pair, so titles alone are insufficient grounds for merging or redirecting these pages. Editorial differentiation or canonical-route ownership needs review before consolidation. No CMS records or redirects were changed. `/legal/dsar` is the only reported noindex route.

Production refresh 2026-10-03 02:13 UTC: latest image changes build successfully (1,034 generated pages). Restarted the verified dedicated port-3013 process against this build. Full inner-page HTTP/metadata/link discovery audit checked 1,018 URLs with zero reported failures; refreshed `docs/inner-page-audit-report.json`. The audit checks response status, required metadata, canonical presence/non-homepage destination, H1 count, and discovered local routes. It does not prove visual quality, animation behavior, consent correctness, or external destinations.

Desktop partner image check at 1,440 pixels, DPR 1: hero rendered at 681 pixels and selected 750w; the three audience photos rendered at 438 pixels and selected 640w; the join photo rendered at 671 pixels and selected 750w after scrolling. All five loaded successfully, with no document overflow. A new regression ensures all five retain responsive sizes and width-based source candidates; all four partner/referral tests pass. This confirms desktop candidates are not undersized at the tested density, not full cross-device visual coverage.

Financing preparation image delivery: added responsive `sizes` to the six loan-page photos, matching the split sections and separate audience-card spacing. The tab interaction test, TypeScript, and diff whitespace check pass. At a 390-pixel viewport the updated `/rental-property-loans` hero selects the 384-pixel resource with no document overflow; production rebuild remains pending. This is an image-delivery adjustment, not a page redesign or change to financing content.

Verified responsive image selection on the referral page at 390-pixel viewport, DPR 1: old production markup selected a 1,200-pixel resource for a 337-pixel rendered hero; the updated development markup selected 384 pixels at the same rendered width. This confirms the browser uses the new slot hints. Production rebuild of this latest image change is still pending.

Partner/referral image delivery: their responsive Photo component previously omitted `sizes` despite rendering 1,164-pixel source images in narrower columns. Added layout-specific slot hints for the hero, three-column audience cards, and two-column join photo, including the 700/900-pixel breakpoints and 1,440-pixel container cap. No artwork, dimensions, or layout changed. Existing referral tests and TypeScript passed. Browser-selected resource widths and byte savings still need measurement; do not count this as a verified download reduction yet.

Additional control audit: the contact form explicitly opens a reviewable email draft rather than claiming delivery; its existing validation and encoding tests pass. Added a loan-category regression covering all four tab selections, ArrowLeft/ArrowRight wraparound, Home/End, roving tab stops, focused tab, accessible panel naming, and matching panel headings. Four tests across loan categories and contact passed, followed by TypeScript. No inquiry was sent and no loan page content was changed.

Referral production browser check at 390 × 844: clicking the read-only public URL selected all 19 characters; no horizontal overflow or broken loaded main-content images were observed. The second instructional disclosure opened on click and closed with Enter while retaining focus. Its expanded mobile screenshot was inspected at `output/playwright/inner-referral-mobile.png`; copy is readable and controls remain within the viewport. No real clipboard write was performed. Clipboard denial and API absence remain covered by component tests rather than browser fault injection.

Latest combined validation (2026-10-03 UTC): production build completed successfully with 1,034 static pages. The full Vitest run passed 448 of 449 tests across 79 files; the sole failure remains the excluded homepage preview heading assertion in `baseline-lower-sections.test.tsx:200`. The dedicated production server on port 3013 was restarted after verifying its process and checkout. Fresh HTTP/metadata checks passed for `/landlord-referral`, `/advisor-partner-program`, `/integrations`, `/resources`, `/blog`, and `/about`. These checks do not replace interaction or visual verification. No deployment was performed.

Referral clipboard fallback: the public-link field now receives focus and selects its full URL when clipboard access is unavailable or rejected. The status message describes the selected link rather than incorrectly directing users below the message. Three component tests cover successful copying, rejected access, and missing Clipboard API. These tests mock the clipboard and do not write to the real system clipboard. Browser verification of this change remains pending.

- Shared consent concern verified on local production `/about`: Termly reported analytics=false, advertising=false, performance=false, social_networking=false, and unclassified=false, while resource timing showed Google Tag Manager, Google Analytics, and pagead2.googlesyndication.com requests. This establishes network activity despite those consent flags, not a legal conclusion or proof of what payloads were sent. `ConsentManagedTags` currently waits for blocker load, then injects trackers; it does not itself gate injection on consent. Repair would affect the shared root layout and homepage as well, so request the user's scope decision before changing it.
- Profile the shared client chunks and reduce inner-page delivery cost without changing homepage behavior, consent, analytics, or navigation.
- Complete deeper interaction checks for remaining inner-page forms and calculators, plus blog/resource templates. HTTP success alone does not establish that these controls work.
- Check lazy-loaded media and full-page rendering across more route families.
- Rebuild and repeat representative production browser checks after the final repairs.
- Keep the existing homepage test failure separate from this scope.

## Repeatable checks

```sh
SITE_AUDIT_ORIGIN=http://localhost:3012 npm run audit:inner-pages -- --write
SITE_AUDIT_ORIGIN=http://localhost:3012 SITE_AUDIT_PATHS=/about,/demo,/careers npm run audit:inner-pages -- --write
SITE_AUDIT_ORIGIN=http://localhost:3013 SITE_AUDIT_PATH=/pricing npm run audit:bundle
```

The default inner-page audit prints a summary. Add `--json` for the full report. Full and targeted runs write separate report files. The initial full audit was captured before all metadata repairs, so use the later targeted report for those pages.
