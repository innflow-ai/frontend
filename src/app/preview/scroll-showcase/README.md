# Scroll showcase preview

Local route: `/preview/scroll-showcase` (noindex, not linked from navigation).

Source: Figma file `JkJnW5Q1AIVAqgoV2AqAyb`, frames `365:9480`, `358:9480`, `359:9513`, `359:9557`. Icons, gradient and cropped portraits are local Figma exports in `public/preview/scroll-showcase`. Scheduling now uses Innflow copy and links to the platform page; other panels retain their existing reference copy and destinations.

Scheduling illustration: storyboard `731:728`, eight poses. A 3.2-second Motion clock expands the glass-backed shell, resolves skeletons into the month and date grid, reveals availability by week, then holds. No date selection or booking confirmation is implied. The shared demo playback hook pauses off-screen, when inactive, or when the document is hidden; reduced motion shows the complete calendar. Switching panels preserves progress. Exact exported waveform, controls and availability SVGs are local in `calendar-storyboard/`. Figma native glass is approximated with a translucent rim, inset highlight, blur and shadow in CSS.

Styling follows these frames and the supplied Calendly_variables token files, with the site's Host Grotesk. All CSS is scoped to this route. The existing shared header/footer and Lenis controller remain in use. No dependencies added.

## Motion

- A 500svh track gives four scroll chapters, switching at 23%, 46%, and 69% of the available sticky scroll range.
- Content crossfades over 280ms inside one shared card. The background shifts over 1.4s with a slow independent drift.
- Each newly activated illustration restarts its own animation; scrolling does not scrub its timeline.
- The last 8% contracts the stage slightly before sticky positioning releases.
- Tab clicks jump to chapter centers. Arrow keys, Home and End navigate tabs. Close skips to the Channels section.
- Reduced motion removes pinning and animation, leaving a directly selectable tabbed card.

Timings and small illustration sequences are approximations from the supplied recordings; screenshots alone do not encode the original motion. Tuning lives in `scroll-showcase.tsx` (chapter thresholds) and `showcase.module.css` (track length, transitions, keyframes).

## Homepage continuation (2026-09-16)

The route now continues after the existing hero study with Channels, Agents,
Workflows, Insights, Customer stories, Connected infrastructure, and the closing
CTA. `page.tsx` owns the single main landmark and loads the existing homepage
CMS testimonial selection. The shared `SiteCta` omits itself only on this exact
preview route. Header, footer, production homepage, and CMS records are unchanged.

### Source map

All node IDs refer to Figma file `JkJnW5Q1AIVAqgoV2AqAyb`.

| Content | Source nodes | Implementation |
| --- | --- | --- |
| Section order and composition | 350:10858; sections 350:11199 through 350:11820 | `homepage-content.ts`, `homepage-sections.tsx` |
| Channels | 405:9891–405:9896 | Six selectable rows and exact exported illustrations |
| Agents | 439:10266; 439:10270, 439:10309, 439:10324 | Three feature examples with themed artwork |
| Agent progression | 391:9888, 391:9896, 391:9908, 391:9918, 391:9926 | Five manually selectable HTML sequence states |
| Workflows | 439:10158; 439:10212, 439:10231, 439:10242, 439:10162 | Four feature states |
| Insights | 439:10454; 439:10457, 439:10480, 439:10495, 439:10516 | Four feature states |
| Before/After examples | 417:10140, 417:10141, 417:10142; 417:9969, 417:9986, 417:10004; 417:10139, 417:10256, 417:10272 | Nine native HTML comparisons |
| Innflow copy adaptations | 416:9895 | Retains the review-oriented messaging from the expanded draft |
| Customer stories | 350:11559; 397:9906, 397:9921 | Entering/rest presentation; existing CMS story selection or an unattributed preview placeholder |
| Integrations | 350:11630; 397:9936, 397:10126, 397:10316 | Default, Slack focus, OpenAI focus |
| Infrastructure cards | 441:10145 | Six cards with exact exported illustration layers and HTML copy |
| Closing | 350:11820; 397:10568, 397:10735, 397:10902 | Three selectable highlights, exact source portraits/backgrounds, HTML badges |

`public/preview/homepage/sources.json` records exported asset source nodes and
SHA-256 hashes. No expiring Figma URLs are used by the frontend. Illustration
images retain the design's reference UI; surrounding copy, comparison content,
and controls are native HTML. Examples are labeled illustrative. Reference
integration logos are not a claim of current integration availability.

The supplied `calendly-sitemap-2026-09-15.csv` contains 1,039 English-language
page URLs and five sitemap columns. It has no component/state/copy mappings.
It is used as a page reference inventory; Figma supplies section content and
state mappings. New CTAs point to existing Innflow destinations.

### Motion and accessibility

Feature rows use roving tab focus with arrows/Home/End and synchronized panels.
Before/After controls are directly selectable. Selecting a new feature resets its
comparison to After. Agent sequence states are manually selected; no timer takes
control away from the reader. Comparisons use a 280ms entrance transition.

Customer stories move 30px into their resting position over 600ms on entry.
The closing track advances every 5 seconds while visible, with a 900ms transition.
It has a pause control; manual selection pauses autoplay. Reduced motion disables
transitions and autoplay, retaining manual controls. These timings are deliberate
approximations: the static Figma states do not encode a playback timeline.

### Validation

- Production build and TypeScript passed.
- Focused Biome checks passed.
- 17 tests passed: section keyboard navigation, all nine comparison pairs, five
  agent states, integration focus, missing testimonial fallback, closing pause /
  visibility / reduced motion, preview-only CTA, and existing testimonial/login tests.
- Browser checks: 1440, 768, 390, and 320px; no horizontal overflow, one main
  landmark, no broken inspected images, all feature panels reachable, reduced
  motion disables closing autoplay and hero pinning, preview remains noindex.
- Browser screenshots are in `output/playwright/homepage-*.png`.
- Local preview only; no deployment or CMS publication performed.
