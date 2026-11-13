# Innflow Web: Paper desktop and mobile change list

Status: functional CMS/announcement implementation and provisional visual changes are in the working tree. See [implementation and release notes](ANNOUNCEMENT_IMPLEMENTATION.md). Exact Paper comparison remains pending; the checkboxes below are the acceptance inventory, not a claim that visual review is complete.

## Design sources and precedence

- [Paper target A, node 3C-0](https://app.paper.design/file/01M7B2J3JHCRFF9SY0C6S2X9F2/p-1-0/3C-0)
- [Paper target B, node 1JT-0](https://app.paper.design/file/01M7B2J3JHCRFF9SY0C6S2X9F2/p-1-0/1JT-0)
- [Announcement bar and countdown behavior spec](ANNOUNCEMENT_BAR_COUNTDOWN_SPEC.md)

The user identifies the linked pair as desktop and mobile references. Direct access to the Paper canvas is currently unavailable, so their node-to-device mapping, exact geometry, font runs, colors and full visible contents have **not** been visually verified. This document separates confirmed user requirements, observed local implementation, and measurements still needed from Paper. It is a comprehensive implementation checklist, not a completed pixel-by-pixel visual audit.

**Latest design direction:** the Paper blue gradient button becomes the default primary action for Innflow Web. This supersedes the earlier neutral-primary recommendation for this website. The requested mixed-font hero and announcement treatment also take precedence over older defaults. Keep that change scoped to the marketing website; it does not automatically restyle the separate Innflow product app.

Repository baseline inspected: `/Users/ak/innflow-web`, branch `fix/restore-homepage-scroll`, commit `41440f5`. Production deployment has not been checked.

## Confirmed changes

| Area | Required outcome | Still to extract from Paper |
| --- | --- | --- |
| Primary actions | Shared blue gradient primary button, including its desktop/mobile appearances | Gradient stops, direction, border, highlight, shadow, radius and dimensions |
| Other buttons | Distinct secondary, outline and text-action treatments matching their roles | Which visible button uses which treatment; exact colors and sizes |
| Hero title | Mixed typography within the main headline | Exact words per font, families, weight, italic treatment, tracking, line height and line breaks |
| Announcement | Responsive strip above the navigation with offer/urgency content | Exact row order, colors, heights, padding and mobile differences |
| Timer | Real deadline-driven countdown, matching the urgency timer design | Unit labels, separators, digit styling and mobile display |
| Model status | `NEW [official model icon] Model name - Exclusive on innflow` | Badge measurements and icon placement details |
| Announcement/nav seam | Blue backing visible around the navigation's curved upper corners | Actual layer construction and desktop/mobile corner radius |
| Responsive composition | Desktop and mobile each match their own reference | Widths, stacking, alignment, visibility and spacing |

## Primary button migration

- [ ] Extract the actual Paper blue gradient. Do not substitute the older solid cyan accent, dark navy button, or an invented blue gradient.
- [ ] Define shared tokens for default/hover/pressed backgrounds, foreground, border, focus ring and elevation. Give radius, spacing and type explicit roles for compact navigation and larger hero buttons.
- [ ] Separate **background paint** from **border color**. A `linear-gradient(...)` value is valid for `background` but cannot be reused as a border color. The current Google CTA uses the same variable in both places, so a token-only substitution is insufficient.
- [ ] Route primary CTA variants through a shared style/component. Prefer semantic names such as primary and secondary over color names like `darkButton` or `blueButton`.
- [ ] Update the desktop navigation's primary action, mobile navigation's primary action, and hero primary action.
- [ ] Audit all marketing primary-action consumers: pricing, contact, demo/signup prompts, closing sections, footer actions and eligible form submits. Apply the new primary role consistently where appropriate.
- [ ] Preserve intentional secondary, destructive, provider-branded and embedded demo controls. Do not recolor every dark rectangle or every blue element.
- [ ] Match normal, hover, pressed, keyboard-focus, disabled and loading states. Define missing interaction states as implementation decisions, distinct from observed Paper values.
- [ ] Check white or dark label contrast over the entire gradient, including its lightest stop and hover state.
- [ ] Retain destinations, tracking labels, authentication flows and submit semantics while changing appearance.
- [ ] Keep the official multicolor Google/Microsoft marks and their proportions wherever those sign-in actions remain in the reference.
- [ ] Remove conflicting hover/background overrides rather than adding another broad `!important` rule.
- [ ] Verify the global primary migration on representative inner pages, not just the homepage screenshot.

**Observed code concerns:** `globals.css` currently maps `--gradient-cta` to solid `--button-primary: #012232`. `google-cta.module.css` imposes background, border, pill shape, spacing and shadow using `!important` and a broad `:has(> .content)` selector. `site-shell.module.css` has both `.darkButton` and `.blueButton` pointing to the same primary token. Some closing buttons use their own dark backgrounds. These paths need coordinated updates.

## Secondary buttons and action hierarchy

- [ ] Inventory every button visible in both Paper frames: label, destination, icon, variant, size and order.
- [ ] Identify the primary action in each group and apply the new blue gradient to that role. Match any intentionally equal-priority actions in the reference rather than guessing which provider should be secondary.
- [ ] Match secondary background, foreground, outline and hover treatment independently of the primary token.
- [ ] Match text links, including login and email signup, without accidentally turning them into filled buttons.
- [ ] Verify desktop CTA gaps and mobile stacking/full-width behavior. Preserve sufficient touch targets even where the visual button is compact.
- [ ] Reconcile the reference with the current hero's Google and Microsoft actions and email signup link. Do not delete or reroute an authentication option merely because a screenshot crop omits it.

## Mixed-font hero title

- [ ] Transcribe the title and identify every change of font family, weight, style or color. Record the exact phrase boundaries rather than styling the title by line number.
- [ ] Render one semantic `h1` with styled spans, or semantic emphasis where appropriate. Keep the headline readable as one sentence for assistive technology and search engines.
- [ ] Match the main and accent typefaces from Paper. Do not assume they are Instrument Serif, Source Serif 4, Archivo or Instrument Sans until inspected.
- [ ] Load the actual required font weights and italic styles through the existing font system; avoid synthetic bold/italic and duplicate font downloads.
- [ ] Account for `homepage-typography.module.css`, which currently forces one Source Serif family on all homepage headings. Add a specific hero treatment that does not reset unrelated homepage headings.
- [ ] Reuse or refine the existing `--font-heading-emphasis` mechanism if it matches the inspected design. The current global rule already styles `strong`/`b` inside headings with Archivo bold, but the current hero contains no such spans.
- [ ] Match desktop and mobile font size, line height, tracking, text color, maximum width, alignment and intentional wrapping.
- [ ] Review the current explicit `<br />` after “Turn conversations.” Preserve it only if it matches the requested composition across relevant widths.
- [ ] Check intermediate widths and long words, not just the two artboard widths. Avoid clipping and unintentional orphan words.
- [ ] Match subtitle copy, width, line height, color and distance from the title; then match the CTA row and signup-note spacing.
- [ ] Check font loading for headline layout shifts and wrapping changes.

## Announcement strip and urgency timer

- [ ] Use the existing `OfferAnnouncementBar`; do not add another competing announcement implementation.
- [ ] Match the Paper strip's surface/gradient, content width, side gutters, vertical padding, alignment and separators.
- [ ] Match the urgency label, timer pill, icon, weight/italic treatment and countdown digit layout. Treat “urgency timer” and “countdown timer” as the same deadline source unless Paper clearly shows separate uses.
- [ ] If urgency appears in more than one location, use the same campaign deadline and state so both displays agree. Do not create independently resetting timers.
- [ ] Wire the configured absolute deadline, optional start time, readable timezone and real CTA destination.
- [ ] Show a stable initial deadline instead of flashing `00:00:00:00` while hydration completes.
- [ ] Use tabular digits and stable widths; support long day counts without layout movement.
- [ ] Match the mobile unit/seconds treatment after inspecting Paper. The prior days/hours/minutes-only mobile proposal remains provisional.
- [ ] Handle exact expiry, already-expired visits, invalid dates, sleeping tabs and blocked storage. Default expiry hides the campaign; an explicit replacement state can show new copy/action.
- [ ] Persist dismissals per campaign ID and allow a new campaign to appear after an earlier campaign was dismissed.
- [ ] Ensure only one announcement occupies the slot. Coordinate the existing experience-announcement switch and route eligibility.
- [ ] Give the dismiss control an accessible label, visible focus and a usable touch target.
- [ ] Do not announce every second to screen readers. Include an understandable fixed deadline and a way to view that deadline instead of continuously updating digits.
- [ ] Preserve consent-aware CTA analytics and add no tick-driven network requests.
- [ ] Keep the disabled placeholder campaign off until the actual message, deadline and destination are configured.

Countdown edge cases, expiry, storage and accessibility are specified in detail in [the companion countdown spec](ANNOUNCEMENT_BAR_COUNTDOWN_SPEC.md). Its earlier guessed dimensions and colors must yield to the newly linked Paper frames once inspected.

## New-model badge

- [ ] Render exactly this sequence: **NEW → official model/provider icon → full model name → `- Exclusive on innflow`**.
- [ ] Replace the current generic bot mark with the correct official model icon, or official provider mark where no separate model icon exists.
- [ ] Store name and icon together in a release record so they change together for each new announcement. Do not hardcode the reference's “Opus 5.”
- [ ] Preserve official icon proportions/colors and use a suitable official variant for the badge background.
- [ ] Match the dark badge surface, border/highlight, pill shape, inner padding, icon size, baseline alignment, NEW color and name/suffix hierarchy.
- [ ] Keep a literal hyphen before `Exclusive on innflow`; keep `innflow` lowercase.
- [ ] Keep a configured release visible on mobile; wrap the suffix or move the badge to another row rather than dropping model identity.
- [ ] Support longer names and missing-image fallback without a broken icon or truncated title.
- [ ] Use a new campaign ID for each new release announcement so an old dismissal does not suppress the new model.
- [ ] Omit the release block when the campaign is not announcing a model. V1 uses configured releases rather than automatically monitoring provider launches.

## Curved announcement/navigation transition

- [ ] Inspect the actual Paper layers before choosing a radius or exact CSS construction.
- [ ] Based on the user's description, extend a local blue backing behind the navigation's top edge, with the navigation's own surface rounded at its upper corners.
- [ ] Match the left/right corner shape independently at desktop and mobile sizes. The announcement strip and navigation surface must meet without a gap or a doubled border.
- [ ] Keep gradient continuity through the curved areas. Avoid separate backgrounds that visibly restart with different colors at the seam.
- [ ] Keep the blue backing local to the announcement/nav transition; do not tint the entire page to create the effect.
- [ ] Preserve the current normal-flow announcement and the site's flat-to-floating navigation behavior unless Paper establishes a different interaction requirement.
- [ ] Recalculate navigation offsets from actual bar height, including wrapped model content, rather than assuming the current 44px height.
- [ ] Remove blue corner remnants and reserved space on dismissal/expiry and restore normal navigation styling.
- [ ] Keep dropdowns, mobile overlays and focus outlines unclipped. Do not use overflow clipping on an ancestor containing interactive menus merely to produce rounded corners.
- [ ] Check stacking with the timer, close button, navigation, dropdowns and mobile overlay.

## Header, hero and surrounding layout

- [ ] Compare logo placement/size and use the canonical bold Innflow wordmark with its original proportions. Verify the existing `/brand/innflow-wordmark.svg` against the approved Dropbox asset before replacing it.
- [ ] Match navigation height, horizontal padding, item gaps, login appearance, primary CTA, menu icon and desktop/mobile visibility.
- [ ] Match the combined vertical rhythm of announcement, curved transition, nav, hero title, subtitle, actions and first visual.
- [ ] Review the current hero shell's 24px desktop / 12px mobile side margins and 40px / 28px corners against Paper; those are current values, not target specifications.
- [ ] Review current hero top padding of 135px desktop / 72px at the mobile breakpoint. Adjust for the newly sized announcement and header without double-counting their height.
- [ ] Compare hero surface, border, gradient/artwork, shadows, cropping and first-screen composition. Record actual differences before changing decorative artwork.
- [ ] Inspect any trust labels, badges, helper copy, icons or extra actions visible in either reference and add them to the implementation inventory. Their presence is not yet verified.
- [ ] Preserve the existing feature showcase behavior, scroll progression and lower-page sections unless a visible reference difference requires a scoped change.
- [ ] If the frames show lower sections, audit those visible sections separately for spacing, type and primary-button adoption rather than assuming the work ends at the hero.

## Responsive and interaction checks

| Concern | Desktop | Mobile / narrow widths |
| --- | --- | --- |
| Announcement | Match alignment and optional supporting copy | Match row order, keep close control clear, permit natural height |
| Model badge | Keep icon/name/suffix aligned | Keep complete identity; wrap gracefully |
| Hero title | Match mixed type and desktop line breaks | Match mobile type scale and intentional wrapping |
| CTAs | Match sizes, colors and horizontal grouping | Match stacking, full-width behavior, spacing and tap targets |
| Navigation seam | Match curve and uninterrupted blue backing | Match mobile curve without horizontal overflow |
| Scroll/menu behavior | Preserve floating nav and dropdown placement | Verify menu open/close, focus containment and body scroll restoration |

- [ ] Capture at the references' actual widths once known, plus 320, 390, 768, 1024 and 1440px and a short-height viewport.
- [ ] Check existing breakpoint interactions: announcement at 700px, showcase at 800px, compact header styles at 850/1100px and desktop menu handling above 1180px. Do not assume the same breakpoint controls all components.
- [ ] Check text zoom, browser reflow, reduced motion, keyboard navigation and touch input.
- [ ] Check active, disabled, scheduled, dismissed, expired, replacement-message and long-model-name states.
- [ ] Verify no initial layout jump, timer width movement, clipped menu, obscured hero or leftover empty announcement slot.

## Files likely to change

| File / group | Responsibility |
| --- | --- |
| `src/app/globals.css` | Primary background/state tokens and shared typography roles; audit legacy overrides |
| `src/components/google-cta.module.css` | Separate gradient background from border color, align variants, remove conflicting forced styling |
| `src/components/google-cta-content.tsx` | Retain provider icon/label semantics; change only if reference content requires it |
| `src/components/site-shell.module.css` | Navigation CTA roles, header dimensions and floating offsets |
| `src/components/site-header.tsx` | Header action variants, single announcement coordination, responsive nav |
| `src/components/site-header-preview.module.css` | Initial header surface, curved seam and layout rules |
| `src/components/editorial-header.tsx` and its styles | Mobile navigation action parity; inspect exact consumers before editing |
| `src/app/preview/scroll-showcase/scroll-showcase.tsx` | Mixed-font headline markup, hero actions and reference copy |
| `src/app/preview/scroll-showcase/showcase.module.css` | Hero typography, spacing, responsive layout and artwork positioning |
| `src/components/homepage-typography.module.css` | Hero exception to the broad heading-family override |
| `src/components/showcase-homepage.tsx`, `src/app/layout.tsx` | Required font loading and announcement integration |
| `src/components/offer-announcement-bar.tsx` and `.module.css` | Countdown, urgency layout, real model icon and responsive presentation |
| `src/config/announcement-bar.ts` | Campaign/release fields, deadline calculation and pre-paint behavior |
| `src/lib/marketing-chrome.ts` | Announcement priority, visibility and route scope |
| `public/brand/announcement/` | Verified local icon assets |
| `src/app/preview/scroll-showcase/homepage.module.css` and lower-section styles | Independent primary CTA implementations |
| Pricing, contact and other primary-token consumers | Sitewide marketing primary-style migration and regression review |
| Existing relevant tests | Behavior and integration regression coverage |
| Website design-token documentation | Record blue gradient primary and hero font roles once measured; retain source provenance |

## Execution order and completion criteria

1. Inspect/export both Paper frames and record exact styles, assets and text. Resolve the outstanding measurement table below.
2. Implement shared primary/secondary button roles and required font loading.
3. Implement the announcement, timer and model badge with the curved navigation seam.
4. Match hero type, spacing and desktop/mobile CTA layout.
5. Migrate remaining marketing primary actions and verify representative inner pages.
6. Run relevant countdown/header tests, typecheck and lint; run a production build for font/asset/integration changes. Compare screenshots at the exact Paper dimensions and responsive stress widths.

Completion requires reference comparisons for both desktop and mobile, functional countdown/dismissal/navigation behavior, and consistent adoption of the new blue primary. A token rename or a desktop-only screenshot is insufficient evidence.

## Measurements still needed from Paper

| Item | Status |
| --- | --- |
| Which target node is desktop vs mobile; artboard dimensions | Not verified |
| Primary gradient stops/angle, border, shadow and radius | Not verified |
| Secondary/action role mapping and exact colors | Not verified |
| Hero wording, font runs, weights, sizes, leading and tracking | Not verified |
| Desktop/mobile line breaks, CTA order and widths | Not verified |
| Announcement height, timer treatment and mobile row order | Not verified |
| Model badge geometry, artwork and text sizes | Not verified |
| Navigation corner radii and actual backing-layer construction | Not verified |
| Additional visible content, artwork and lower-section changes | Not verified |

Paper access or desktop/mobile exports will resolve these visual details. The confirmed requirements and current-code migration work above are already actionable; do not present guessed measurements as extracted design values.
