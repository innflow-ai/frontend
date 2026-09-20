# Approved storyboard migration

Local preview only. No publishing, deployment, push, merge, CMS edits, or public-homepage changes.

## Confirmed pilot

- Agents hero: calendar storyboard `615:710` in Figma file `JkJnW5Q1AIVAqgoV2AqAyb`, selected by the user from the reviewed Numbers workbook.
- `BookingCalendar` implements the six-pose, five-second date/time-selection loop. It stops at **Ready to book**, not a confirmed reservation.
- Original staged `CalendarStoryboard` (`731:728`, shell/skeleton/availability reveal) is preserved as a separate component.
- Other three existing hero illustrations and their copy are unchanged. Only the first hero's label/copy follows the approved Agents workbook row.
- Exact exported waveform, month controls and availability assets are stored in `public/preview/scroll-showcase/booking-calendar`.
- Figma native glass uses a CSS translucent rim, inset highlight, shadow and static backdrop blur approximation, not native refraction.
- Playback uses the shared clock with a 50% viewport threshold, selected/visible-tab gating, saved-position resume, explicit pause/replay, and a static resolved reduced-motion pose.

## Remaining scope and decisions

The workbook's Section Copy sheet records sixteen flagged briefs and exact candidate Figma links. Those candidates are not blanket implementation approval. Do not select based on board names alone.

- MCP: selected ring `534:10184` now uses the compact shell, upward expansion, skeleton-to-text opening, 0.8s reading hold and separate contraction/rotation/reading/expansion phases. All 32 tiles remain mounted. Only the selected tile layers above the center; glass tiles pass behind it. The brand uses the exact current export. Exit leaves the label visible and waits for replay/reentry. Reduced motion shows the ready center without orbit tiles.
- Vendor coordination: content-match candidate `808:26861`; confirm whether it is shared with maintenance before mapping it twice.
- Remaining Agents, Channels, Operations and Finance feature mappings need the recorded copy/source conflicts resolved before implementation.
- Channels, Operations and Accounting & Finance hero rows are explicitly **Leave unchanged**.

## Verification gates

- Focused component, shared playback and preview regression tests; type checking; changed-file lint.
- Desktop, tablet, 390px and 320px visual checks: Ready, expanded times, selected time, split Book, loop seam, static reduced motion.
- Pause/resume, replay, deselection, off-screen and document-hidden checks; no page overflow or clipped time rows.
- Other hero panels, existing staged files, and public homepage preserved.

## Verification result, September 19

- 15 focused tests pass across the calendar, ring, shared playback and hero preview. Types and changed-file formatting/lint pass.
- Browser verified calendar replay, pause, deselection and off-screen gating. Reduced-motion startup resolves directly to Ready to book. Fixed a real hydration mismatch by using a hydration-safe, subscribed media-query snapshot in the shared playback hook; added hydration and live-preference regression tests.
- Browser verified ring readable opening, selected layering, updated brand and full exit. The ring stops with every tile hidden and the center label visible. Reduced motion also shows this unobscured center.
- Read-only layout checks at 320px and 390px found no page overflow. Calendar time rows and controls fit their viewport. Desktop opening/selected states were inspected visually. The in-app browser's 80% zoom causes unreliable screenshot cropping, so a full tablet/mobile visual comparison and every intermediate pose still need a clean capture pass. Do not treat DOM bounds checks as complete visual approval.
- The full preview suite reports 58 passed / 1 failed after adding the three ring tests. The failure is an existing closing-headline expectation (`Start fast` versus current `Bring your team`), in files unchanged from HEAD and untouched by this migration.
- A separate existing reduced-motion hydration warning remains in the testimonial preview (`data-motion` differs between server and client). It is outside the two migrated demos and has not been suppressed or changed.
- Original staged calendar/favicon work, other hero panels, and public homepage are preserved. No commit, push, merge or deployment.

Remaining mappings still need the user's title-versus-brief decision before implementation.

## Continuation audit

- The preceding implementation turn made progress, not just a status update: the approved calendar and existing ring component changed, with focused tests and browser evidence.
- Runtime samples confirm the calendar is compact at 0.35s, has expanded time rows at 1.6s, transitions the Book chip at 2.5s, holds it at 3.2s and returns to compact after the five-second seam.
- A temporary browser-side `visibilitychange` simulation pauses the actual Motion clock, preserves its rendered state and resumes it. The document property was restored in a `finally` block. This is a simulated visibility check, not proof of real browser tab-background behavior: this in-app browser keeps `document.visibilityState` visible across tab switches.
- The current preview's three untouched hero tabs remain Callie, Notetaker and Payments. They have not been relabeled as Channels, Operations or Finance. The updated ring is still in its existing `Build your own agents` placement, not a newly confirmed AUT-6 menu slot. Source fidelity work is not final placement approval.
- New feature placement or copy changes must wait for the workbook source-of-truth decision. No remaining candidate was silently promoted to confirmed.
- Clean tablet/mobile screenshot comparison remains open because the in-app capture output disagrees with its zoomed layout coordinates. Geometry checks are useful but do not close that visual gate.
