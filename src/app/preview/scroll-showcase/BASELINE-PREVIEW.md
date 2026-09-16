# Calendly-layout baseline preview

Route: `/preview/scroll-showcase` (local preview, noindex).

This pass uses the supplied CMS Template composition `350:10858` as the
below-hero layout reference. It does not promote this page to `/` or replace
the Listing and Advertising homepage. Original custom continuation modules
(`homepage-content.ts`, `homepage-sections.tsx`, `homepage.module.css`) remain
available; the preview route now renders the separate baseline modules.

## Section mapping

| Section | Implementation | Figma source | Current interaction |
| --- | --- | --- | --- |
| Hero motion study | `scroll-showcase.tsx`, `scroll-showcase-motion.ts` | Existing hero plus September 16 recording | Inset entrance, four pinned chapters, inset release; static/manual on compact screens or reduced motion |
| One workspace. Every conversation. | `workspace-overview.tsx` | `350:11085`, `385:9888`, `385:9992`, `385:10096` | Four expanding cards; hover, click, focus, arrows, Home/End |
| Channels | `baseline-features.tsx` | `350:11199`, later `405:*` illustration exports | Six selectable reference illustrations |
| Agents | `baseline-features.tsx` | `350:11344` | First reference canvas; two explicitly pending illustrations |
| Workflows | `baseline-features.tsx` | `350:11402`, `397:10533`, `397:10544`, `397:10554` | Four selectable reference illustrations |
| Insights | `baseline-features.tsx` | `350:11485`, `397:9900`, `397:9902`, `397:9904` | Four selectable reference illustrations |
| Customer stories | `baseline-lower-sections.tsx` | `350:11559` | Existing CMS selections only; hidden when empty |
| Connected infrastructure | `baseline-lower-sections.tsx` | `350:11630` | Seventeen reference logos and two compact cards |
| Closing | `baseline-lower-sections.tsx` | `350:11820` | Four manually selectable scenes |

## Styling and assets

The baseline shell scopes Geist, Manrope, Source Serif 4, cream `#fcfbf8`, navy
`#071a31`, muted `#5f6d77`, and reference radii to the continuation. It does not
change global typography. Exported reference artwork is local under
`public/preview/homepage/{workspace-overview,baseline-features,baseline-lower}`.
Existing illustration exports are reused where the source mapping is known.
The three new directories contain source notes or manifests.

## Motion provenance and limitations

- The overview recording from September 15 at 8:29 PM shows hover expansion,
  narrowing neighbors, and an artwork crossfade. The 400ms implementation is
  an approximation within the sampled 250–500ms transition window, not a
  recovered vendor CSS value. There is no observed automatic card rotation.
- Figma returned no canvas animation tracks for the overview. Its four native
  layouts provide the visual states, not an executable animation timeline.
- Channels, Workflows and Insights currently switch supplied stills. Their
  internal form interactions are not fully recreated as live animations.
- The two missing Agent illustration states are visibly labeled Reference
  pending; unrelated artwork is not substituted.
- Closing has manual controls. No autoplay duration was inferred from a static
  frame. Reduced-motion preferences disable animated layout changes.
- Reference labels, imagery and sample data are design placeholders, not
  verified Innflow capability claims or customer endorsements. Review and
  replace them before production use.

The September 16 recording at 10:54 AM is the newer reference for hero entrance,
immersive chapters, contraction and navigation reappearance. It is separate
from the overview hover recording.

The hero expands over the first 12% of its scroll track, holds its four chapters
through 84%, then contracts. These are implementation proportions, not source
video timestamps. Navigation stays hidden through contraction and returns when
the overview crosses 75% of viewport height. Skip, reduced motion and component
cleanup restore the navigation. Screens at most 800px wide or 650px high use
manual, unpinned chapters. The bottom chapter counter, progress bar and scroll
hint have been removed at the user's request; chapter tabs remain available.

The hero is explicitly a reference motion study. Its Calendly copy and outgoing
reference links remain placeholders; adding an Innflow sign-in CTA does not
make the illustrated vendor features verified Innflow features. The existing
Google sign-in destination comes from `siteConfig.googleAuthUrl`. Microsoft is
a disabled, visibly labeled placeholder until its destination is supplied;
this pass does not implement or change any authentication backend.

## Verification

Run the focused Vitest suites for `workspace-overview`, `baseline-features`,
`baseline-lower-sections`, `scroll-showcase-motion`, and the preserved
`homepage-sections`, plus the hero CTA suite `scroll-showcase`; run TypeScript
and Biome for changed files. Browser checks should include desktop hover, all
selectable states, 320/390/768px widths, reduced motion, and hero exit back into
normal document flow. Screenshots are in `output/playwright/baseline-*`.

September 16 check: all 28 tests across those six suites passed; full TypeScript
and focused Biome passed. Browser checks confirmed no horizontal overflow at
320, 390, 700, 768 and 1440px, working manual mobile keyboard tabs, navigation
restoration on skip/reduced motion, the configured Google destination and a
disabled Microsoft button. Mobile pending copy and the narrow-tablet overview
were adjusted to avoid clipping. The dev browser reported no console errors;
existing third-party/dev asset warnings remain. No OAuth login was submitted.

No deployment, CMS edits, staging or commit is part of this preview pass.
