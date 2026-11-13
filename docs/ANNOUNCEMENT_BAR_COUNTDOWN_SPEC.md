# Announcement bar with countdown

> Visual source update: approved Figma frame `351:24439` and primary button `354:5843` supersede provisional Paper values below. See [implementation details](ANNOUNCEMENT_IMPLEMENTATION.md).

Draft for review · 13 November 2026

**Updated design direction:** [Paper desktop/mobile change list](PAPER_DESKTOP_MOBILE_CHANGE_LIST.md) expands this work to the hero, navigation and website button system. The user has specified the Paper blue gradient as Innflow Web's new primary button style, superseding this draft's earlier dark-primary recommendation. Exact Paper measurements remain unverified; earlier proposed dimensions in this document are provisional.

Extend the existing `OfferAnnouncementBar` into a responsive campaign strip above the navigation. Follow the supplied Figma composition: blue background, pink offer/countdown pill, optional dark release badge, supporting copy, and dismiss control. Add one clear CTA and a real campaign deadline.

This document records the design proposal. Functional CMS/announcement support and provisional website styling are now implemented locally; see [implementation notes](ANNOUNCEMENT_IMPLEMENTATION.md). No live campaign is enabled and the design sources have not been edited.

## Sources and current state

- [Requested Figma reference](https://www.figma.com/design/PYDAg6cwYXTJb6dpWuPLYF/innflow-web?node-id=334-5597), inspected directly. Frame `334:5597` is 1461 × 40px. Its offer pill is 346 × 26px, release pill 338 × 26px, with 8px gaps and a 40 × 40px dismiss target. Figma explicitly describes the countdown as static editable text.
- [Current Innflow brand kit](https://www.figma.com/design/TI7hq816ZzDMvvTd3HjyIS/INNFLOW_BRAND_KIT?node-id=328-5) and the installed `innflow-design-v2` foundations. The requested colorful reference is a deliberate exception for this campaign component. It does not change the site's neutral visual system.
- Repository inspected on `fix/restore-homepage-scroll`, commit `41440f5`. These findings describe the local checkout, not a verified production deployment.

| Existing piece | Observed behavior | Proposed use |
| --- | --- | --- |
| `src/components/offer-announcement-bar.tsx` | Countdown, CTA, optional model badge, persistent dismissal, optional expiry message | Extend this component |
| `src/config/announcement-bar.ts` | Campaign config and date helpers; `enabled: false` | Keep one source of campaign truth |
| `src/app/layout.tsx` | Mounts offer bar above `SiteHeader`; includes conditional pre-paint script | Retain placement |
| `src/components/site-header.tsx` | Separate experience announcement, currently disabled | Make mutually exclusive with campaign bar |
| `src/lib/marketing-chrome.ts` | Separate experience and inner-page visibility switches | Align route rules and announcement priority |
| `src/components/announcement-bar.tsx` | Older standalone announcement component | Do not build another implementation here |
| `src/components/site-shell.module.css` | Floating navigation uses `--announcement-h` | Preserve offset behavior with measured height |
| `src/components/offer-announcement-bar.test.tsx` | Existing countdown, dismissal and expiry tests | Extend for missing boundary/integration cases |

The current offer config contains a **disabled placeholder** for 63% off, ending 15 November 2026 at 09:00 Eastern. The Figma reference instead says 34% off and uses Opus 5 as model copy. Those discount values and that model name remain reference content. The user has specified the release-badge format as `NEW [model icon] [model name] - Exclusive on innflow`.

## Design proposal

### Desktop composition

```text
┌───────────────────────────────────────────────────────────────────────────────────┐
│ [ ◷ Limited offer · Ends in 02d : 03h : 04m : 05s ] [ NEW · Release ] [View offer →] × │
└───────────────────────────────────────────────────────────────────────────────────┘
                                 Site navigation
```

Example offer copy is illustrative. The diagram's release slot uses the full model-release format below. Include that badge whenever the announcement features a new model; omit it only for announcements without a model release. On wide screens an optional short supporting line can sit between the badge and CTA. Supporting copy yields before the offer, model identity, or CTA.

| Element | Proposed specification |
| --- | --- |
| Outer strip | Full width, square outer corners; 48px minimum height on desktop; normal document flow |
| Container | Centered, maximum 1360px; 24px horizontal padding with at least 48px reserved for dismiss |
| Background | Reference cyan-to-blue gradient, approximately `#00AEEF` to `#0095FF` |
| Offer pill | Reference pink gradient family; 30–32px visual height; rounded ends; 12px horizontal padding; 6–8px internal gaps |
| Release badge | Near-black surface; cyan NEW label, official model/provider icon, white model name, then `- Exclusive on innflow`; preserve authentic artwork and provider colors |
| CTA | New shared blue gradient primary style from Paper; exact type, surface and dimensions pending reference inspection; preserve a usable interaction target |
| Dismiss | 16px close icon inside a 44 × 44px target, right aligned; visible keyboard focus |
| Typography | Inter UI, 13–14px desktop and at least 12px mobile; 16–20px line height; offer label may use semibold italic |
| Timer | Inter semibold, tabular numerals, fixed digit widths and visible unit labels; no italic numerals |
| Gaps | 8–12px between groups; separate CTA and dismissal targets |

The source's Host Grotesk and the current implementation's Archivo are implementation/reference history. Use the current Inter UI role for this adaptation. The source pill geometry and expressive colors remain scoped to this component.

Before implementation is accepted, check final text contrast over both gradients. Darken the pink beneath white timer text if needed; use dark text on exposed blue areas if white fails contrast. Decorative sparkles are optional, and must never displace functional content. Reuse verified assets in `public/brand/announcement/` where they match; otherwise export the relevant Figma assets into the project.

### Curved transition into the top navigation

Additional reference: [Paper announcement/navigation design](https://app.paper.design/file/01M7B2J3JHCRFF9SY0C6S2X9F2/p-1-0/1-0). The user describes a curve at the top of the navigation beneath the announcement, made visible by the blue background. The Paper canvas could not be opened during this review; the construction below is a proposed interpretation, and the exact radius and geometry remain to be visually verified.

- Extend the announcement's blue backing behind the top edge of the navigation surface. Keep that backing local to this announcement/navigation transition, not the entire page background.
- Give the navigation surface rounded top-left and top-right corners. Its own page-colored background covers the blue except at the curved corners, producing the visible blue cutout effect beneath the announcement.
- Keep the announcement's outer top edge square. The curve belongs to the navigation surface below it, rather than the countdown pill or the announcement's bottom corners.
- Use one continuous blue backing, or matching background coordinates, so the gradient does not visibly restart at the seam. Reuse the current navigation surface color for each theme.
- Keep the navigation content in its existing layout and do not clip dropdowns or focus outlines to create the curve. A dedicated backing layer can provide the effect without `overflow: hidden` on the interactive navigation container.
- When the announcement is dismissed, excluded or expired, remove the blue backing and restore the normal navigation treatment without leftover blue corners or space. Once the initial navigation transitions to its floating state, preserve the existing floating shape.
- On mobile, preserve the same relationship with a radius suited to the smaller width. Verify the radius against Paper before finalizing pixel values.

Acceptance: the blue is visible around the navigation's two upper corners while the announcement is shown; the seam is continuous, menus remain unclipped, and dismissing the announcement removes the blue transition cleanly.

### New-model release badge

Required order and wording:

```text
NEW  [official model icon]  Model name  - Exclusive on innflow
```

For the supplied reference, this reads `NEW [Anthropic icon] Opus 5 - Exclusive on innflow`. Opus 5 is the reference example, not a hardcoded name for future announcements.

- Each new-model announcement supplies the actual display name and its matching official icon as one release record. Use the model-specific icon where one exists, otherwise its official provider mark. Replace the current generic bot icon for this slot.
- Render the icon immediately before the model name at approximately 18 × 18px, with `object-fit: contain`, its original proportions and provider colors. Use a suitable official variant for the dark badge background.
- Keep `NEW` and `- Exclusive on innflow` as consistent component copy. Use a literal hyphen before the suffix and lowercase `innflow`. Give the model name stronger weight; keep the suffix readable but secondary.
- The model name and icon change together for every release. Configuration drives the content; v1 does not automatically discover external model launches. Publish a new campaign ID for a new model announcement so dismissal of an earlier release does not hide it.
- Keep the complete badge visible on mobile. Move it onto its own row and wrap the suffix beneath the name when necessary. Never hide the release identity or truncate the name merely to preserve desktop height.
- The adjacent model name provides the icon's accessible text, so the image can use empty alt text. Validate the asset before activation; if it fails at runtime, keep the model name and suffix visible without a broken-image glyph.

### Responsive behavior

- **Wide desktop, 1200px and above:** offer/timer, optional release badge, optional supporting copy, CTA. Remove supporting copy first if the content does not fit.
- **Tablet, 701–1199px:** offer/timer and CTA remain; suppress supporting copy. When a release badge is configured, wrap it onto a separate row if needed rather than hiding it.
- **Mobile, 700px and below:** use two base rows with approximately 80–96px total height, allowing natural growth for text zoom. First row contains the short campaign headline and close target. Second row contains `02d : 03h : 04m` and the CTA. Add a dedicated model-release row whenever configured; allow its suffix to wrap. Hide seconds, decorative sparkles and supporting copy, while retaining the model icon, full name and exclusivity suffix. Total height grows with the release row.
- At 320px and with long copy, wrap the CTA onto its own row. Never clip the timer, overlap dismiss, or reduce type to make the desktop layout fit.
- Keep existing site breakpoints; the 1200px rule is local to this component. Use content-fit checks during review rather than assuming every campaign has the same width.

```text
Mobile
┌───────────────────────────────────┐
│ Limited-time offer              × │
│ Ends in 02d : 03h : 04m            │
│ [ View offer → ]                  │
│ NEW [icon] Model name             │
│ - Exclusive on innflow            │
└───────────────────────────────────┘
```

The compact two-row offer layout is preferred where it fits; the CTA gets its own row on narrow screens. The model-release badge adds the final row(s) shown whenever configured.

## Countdown and interaction contract

| State | Required behavior |
| --- | --- |
| Disabled / excluded route | Render no bar and reserve no height |
| Before optional start date | Render no campaign bar; activate when the start time is reached in an open tab |
| Active | Show approved message, countdown, optional release badge and one CTA |
| Initial render | Reserve the correct responsive geometry; show a stable absolute deadline until the first client calculation, never a fake zero countdown |
| Expired | Default: remove the entire campaign bar and its navigation offset. Optional: replace with explicitly configured post-campaign message and optional new CTA |
| Invalid deadline/config | Hide the campaign and report a development validation error; do not treat invalid data as a valid expired message |
| Dismissed | Hide immediately and remember dismissal for this campaign ID; a different campaign ID may appear |
| Storage unavailable | Countdown and dismissal still work for the current mounted view; storage failure must not bypass expiry checks |

- Store a single absolute ISO-8601 deadline with `Z` or an explicit UTC offset. Display its meaning in the campaign's named timezone, such as `America/New_York`. Resolve daylight saving time when authoring the timestamp. All visitors count down to the same instant.
- Recalculate from `targetMs - Date.now()` each tick. Never decrement a stored seconds counter or reset on refresh, route navigation, or a repeat visit.
- Evaluate expiry with `remainingMs <= 0`; for positive time use `Math.ceil(remainingMs / 1000)` before splitting into days/hours/minutes/seconds. This avoids expiring up to one second early, as the current floor-based helper can.
- Update displayed seconds once per second. Recompute immediately on focus and `visibilitychange` when returning to a visible tab, so sleeping tabs catch up. Clear intervals and listeners on expiry and unmount.
- Display `DDd : HHh : MMm : SSs` on desktop and `DDd : HHh : MMm` on mobile. Hours/minutes/seconds are zero-padded. Support three-digit day counts without clipping. During the final minute, mobile shows “Less than 1 min” instead of a misleading all-zero timer.
- A browser-clock countdown is sufficient for this display. Pricing and offer validity must be enforced by the destination/checkout, not by the timer. A trusted server-time anchor can be added later if clock manipulation or precise synchronization becomes a requirement.
- Keep the bar in normal flow so it scrolls away. The navigation retains its existing flat-to-floating behavior. No sticky promotional overlay in v1.
- The CTA is a real link. Only the CTA is clickable; timer and badge are not disguised links. Dismiss works by mouse, touch, and keyboard.
- Persist dismissal using the existing campaign-scoped `innflow:announcement:dismissed:<id>` key. Handle storage exceptions. Reset document-level visibility when a new eligible campaign replaces the old one, so stale `data-offer-bar="hidden"` cannot suppress it.
- After user-triggered dismissal, move focus to the home/logo link if focus was inside the removed bar. Automatic expiry should not steal unrelated focus; if focus is inside removed content, move it to the next stable navigation control.

## Accessibility and motion

- Use a labeled announcement region, semantic link and button, visible focus outlines, and decorative icons hidden from assistive technology.
- Give the timer an understandable accessible label including units. Keep second-by-second updates out of live announcements. Prefer a static accessible absolute deadline and one polite message when the campaign ends; remove the current automatic every-minute announcements.
- Provide a quiet “Show deadline” / “Show countdown” control, which can be visually understated text. It replaces continuously updating numbers with the fixed closing date and timezone; it must work on mobile and keyboard. This is also a useful option for users who find ticking timers distracting.
- Do not use flip clocks, blinking separators, pulsing urgency, marquees, or entrance motion that shifts the header. Optional hover/focus feedback uses approximately 150ms and respects reduced motion.
- Validate text contrast, 200% text zoom and 400% browser zoom/reflow, keyboard order, screen-reader output, and touch target separation.

## Campaign configuration

Keep configuration in TypeScript for v1. Sanity authoring is a later enhancement, not a prerequisite for a working timer.

| Field | Meaning |
| --- | --- |
| `enabled`, `id` | Master switch and stable campaign identity |
| `message`, optional `mobileMessage` | Main headline and genuinely shorter mobile alternative |
| optional `startsAt`, `targetTime` | Absolute start and end instants; `targetTime` retains the existing field name |
| `displayTimeZone` | Named timezone for the readable absolute deadline |
| `ctaLabel`, `ctaHref` | One approved action; safe internal path or permitted HTTPS URL |
| optional `modelRelease` | Structured release record containing required `id`, `name`, and `iconSrc`; required whenever announcing a new model. Replaces the existing name-only `modelName` field. The component supplies `NEW` and `- Exclusive on innflow` |
| optional `supportingCopy` | Wide-desktop supporting detail |
| `expiryBehavior` | Explicit `hide` or `replace`; default `hide` |
| optional `expiredMessage`, `expiredCtaLabel`, `expiredCtaHref` | Required message for replace mode; CTA fields supplied together. Do not reuse an expired offer's CTA automatically |
| `routeScope` | Explicit route eligibility; proposed initial scope is homepage, matching the current restriction on inner-page announcements |

Validate required text, deadline parsing, timezone validity, start-before-end, paired CTA fields, permitted link schemes, and replacement-state requirements. A configured model release requires a non-placeholder display name and a valid matching icon asset. Treat config text as text, never executable HTML. Safely serialize and escape data embedded in the existing pre-paint script.

A homepage-first campaign is the proposed rollout default. The current offer component is mounted globally and does not use the inner-page visibility switch, so implement route eligibility explicitly. Re-evaluate on client navigation. The pre-paint visibility calculation and mounted component must agree on route, schedule, dismissal and expiry.

Announcement priority: when an eligible campaign is active, suppress the separate experience strip. For the first release, leave the experience switch disabled even after campaign dismissal or expiry. This avoids immediately replacing one dismissed announcement with another.

## Implementation plan

1. **Config and state:** extend the existing config and pure countdown helpers. Use one shared eligibility/state calculation for disabled, scheduled, active, expired, invalid and dismissed states. Replace the ambiguous `liveMessage` branch with explicit expiry behavior, preserving existing callers during migration.
2. **Presentation:** update `offer-announcement-bar.tsx` and its CSS module using the responsive design above. Replace the name-only/generic-bot badge with the configured model icon, full name and fixed `- Exclusive on innflow` suffix. Keep the release visible at every breakpoint. Keep the timer small and isolated, without a new dependency or requests on each tick. Add absolute-deadline mode and accessible labels.
3. **Header integration:** coordinate `layout.tsx`, `site-header.tsx`, `marketing-chrome.ts` and header styles so only one announcement owns the space. Use `ResizeObserver` to measure natural bar height, including replacement state and text wrapping. Update the visible-height offset on scroll/resize and clear it on removal. Replace the boot script's fixed 44px assumption with matching responsive reserved geometry.
4. **Lifecycle fixes:** handle invalid deadlines before rendering; calculate expiry independently of localStorage availability; clear the actual interval at expiry; resync after tab sleep; clear stale document attributes when campaign identity/eligibility changes. The current replacement message renders while offset tracking stops, which must be fixed.
5. **Analytics:** use `captureMarketingEvent` and the existing consent behavior. Track CTA clicks with `marketing_cta_clicked`, `placement: announcement_bar`, campaign ID, route and destination. If impression/dismiss events are added, extend the typed event union and emit once per visible campaign/view, never per tick. Guard storage access so analytics cannot interfere with the CTA or dismissal.
6. **Review and release:** review desktop/mobile and active/expired/dismissed states with fixture campaign data in preview. Set real content and deadline only when available, verify the offer destination, then enable the campaign through the usual release workflow. Turning `enabled` off is the rollback.

## Acceptance criteria

- Only one bar appears above navigation on eligible routes; no empty strip remains when disabled, dismissed, invalid or expired.
- At 320, 390, 768, 1024 and 1440px, no horizontal overflow, truncated required content, hidden CTA or dismiss overlap occurs. Supporting copy and decorative sparkles yield first; a configured model-release badge stays visible and wraps.
- Every new-model announcement shows `NEW`, the matching official icon, the complete model name, and exactly `- Exclusive on innflow` in that order. Changing the release updates both name and icon; a new campaign ID is eligible after dismissal of the previous release. Verify long names, missing assets and mobile suffix wrapping.
- Timer remains aligned as digits change; hydration has no mismatch warning or visible fake-zero state. Initial height matches the chosen responsive layout.
- Fake-clock tests cover 100+ days, day/hour/minute rollover, the final positive millisecond, exact deadline, invalid timestamps, explicit timezone offsets, future start, expiry replacement, and refresh with an already expired campaign.
- Lifecycle tests cover tab resume, interval cleanup, denied storage, campaign ID changes, dismissal persistence, route transitions and stale global visibility attributes.
- Integration checks cover the flat and floating header, scrolled dismissal, replacement state, mobile menu, and anchor targets without header overlap.
- Keyboard and screen-reader checks confirm clear unit/deadline labels, no second-by-second chatter, usable deadline toggle, and sensible focus after removal.
- With JavaScript unavailable, show a static deadline and destination rather than frozen countdown digits; the destination remains authoritative about expiry. Avoid rendering time-sensitive claims that require client-side removal in that fallback.
- Analytics respects consent, generates no tick events, and never blocks navigation when storage is unavailable.
- The final campaign contains no unconfirmed discount, model availability, unlimited-usage or exclusivity claim.

## Inputs needed before activation

Actual campaign headline and optional short mobile copy; offer/launch details; exact closing date, time and timezone; CTA label and destination; the new model's display name and official icon when announcing a release; and whether the initial homepage-only scope should expand. The release suffix is fixed as `- Exclusive on innflow`. The draft can be implemented in preview with fixtures while these content inputs are pending.
