# Homepage lifestyle video implementation

Prepared 2026-09-08. Planning only: no footage generated, homepage code changed, or deployment performed.

## Current integration point

- Confirmed checkout: `/Users/ak/innflow-web`, origin `innflow-ai/frontend`, branch `main`.
- `src/app/page.tsx` renders `#home-hero` using `grassy-city-overlook.webp` and `grassy-city-foreground.webp` around centered white copy and CTAs.
- `src/app/page.module.css` defines a tall hero: `calc(112svh - 70px)` desktop and `calc(132svh - 70px)` phone. Phone images currently align right.
- `RuneyHeroArtwork` in `src/components/runey-workspace.tsx` has a muted looping video and reduced-motion handling, but belongs to an alternate design. Use it as a reference; do not switch homepage designs.
- Existing unrelated edit: `src/components/customer-support-hours.tsx`; preserve it.

## Production recipe

1. Generate three coordinated reference stills. Preview them behind the actual centered headline at desktop and phone dimensions before animation. Use the Innflow design-v2 palette for overlays/UI; natural photography needs no artificial blue tint.
2. Animate each still separately with Runway Gen-4.5 image-to-video, initially 5 seconds per shot. Generate one candidate per shot, inspect, then retry only shots that need correction. Runway supports 2–10-second outputs. No readable screen content, logos, dialogue, or audio is needed.
3. Edit to approximately 12–15 seconds with consistent exposure and restrained motion. Trim unstable starts/ends. Keep a high-quality master outside public web assets.
4. Export one continuous silent H.264 MP4 with faststart and a matching WebP poster. A single file handles the loop; do not switch three video sources at runtime.
5. Create a separately framed mobile version if video is used on phones. A deliberate mobile poster is the initial fallback if framing is unsuccessful.

Shared still direction: believable contemporary rental homes and a modest property-management office; soft daylight, natural skin texture, understated clothing, consistent photographic treatment. Centered text-safe space is essential. Place faces and key gestures below or outside the copy zone. No generated brand marks or readable text.

| Shot | Still composition | Motion prompt |
| --- | --- | --- |
| Tenant | Adult tenant relaxed on a couch in a lived-in apartment; medium-wide framing, phone angled away, uncluttered wall in text zone | Slow subtle push inward. The tenant glances at their phone, makes one small thumb movement, smiles gently and settles back. Natural breathing and stable room geometry. |
| Manager | Property manager at a tidy desk in a realistic small office; face offset from the text zone, monitor angled away | Gentle lateral camera drift. The manager briefly checks a request, makes a small mouse movement and returns attention to work with a relaxed expression. |
| Neighborhood | Leafy residential neighborhood viewed from a moderately elevated aerial angle; identifiable homes, generous sky/quiet area | Slow smooth forward aerial drift. Trees move softly in a light breeze. Buildings retain their shape and position. |

## Repeat seam

Use ordinary cuts between scenes first. For the final-to-first transition, test a restrained dissolve or foreground occlusion using compatible brightness and camera direction. Do not make a simulated flight through a roof a prerequisite. If the seam calls attention to itself, adjust the edit or regenerate a boundary shot. Review at least three consecutive repeats. Do not reverse human movement to manufacture a loop.

## Homepage implementation

- Add a small client `HeroBackgroundVideo` component in `src/components/hero-background-video.tsx`; keep page content server-rendered.
- Replace both scenic image layers in `#home-hero` with that component. Keep the existing copy, CTA links, hero dimensions, and lower fade initially. Retire the grass foreground for this treatment so it does not overlay indoor scenes.
- Render a responsive, prioritized poster immediately. Reserve the existing hero geometry. Start video only after the appropriate source is selected; reveal it once playback actually begins. Keep the poster on playback rejection, load error, or disabled motion.
- Use muted, loop, playsInline, no audio track, object-fit cover, and decorative video semantics. Give the pause/play button its own accessible label and keyboard focus outside the decorative container.
- Before assigning a video source, check reduced-motion and Save-Data where supported. With either enabled, show the poster and avoid automatic video download. Unsupported network hints must not be treated as reliable connection measurements.
- Respect live motion-preference changes, manual pause, tab visibility, and hero visibility. Returning to the hero must not override a user's manual pause.
- Keep copy above a static Ink-based scrim, adjusted against the brightest and darkest frames. Position the pause/play control above overlays and clear of CTAs.
- Proposed public outputs: `/brand/hero-life/desktop-v1.mp4`, `desktop-poster-v1.webp`, `mobile-v1.mp4`, `mobile-poster-v1.webp`. Load only the chosen video variant.
- Initial engineering targets, subject to visual review: desktop MP4 <=5 MB, mobile <=2.5 MB, posters <=200 KB each. Prefer a 720p/1080p delivery candidate over 4K. Add another codec only if measured benefit warrants it.
- Serve versioned files through the existing site asset path for the first prototype; verify response caching and byte-range behavior before release. No streaming backend or new video player dependency is needed for this short decorative loop.

## Verification and release

- Inspect local Next.js guides required by AGENTS.md before coding.
- Check faces, fingers, phones, architecture, loop seam, text contrast, and CTA visibility through the entire clip.
- Preview at 1440px, 810px, 390px, and 320px widths. Validate crop through all three scenes.
- Test muted inline playback in Chrome and Safari; check autoplay rejection and mobile behavior.
- Verify reduced-motion, Save-Data when supported, keyboard pause/resume, offscreen pause, failed media, and a slow connection. Check that posters remain visible and only one variant downloads.
- Run scoped lint, TypeScript, and meaningful component tests for playback/fallback behavior. Compare homepage loading and layout shift to the still-image baseline.
- Create a reviewable local/preview result. Production publishing is a separate action after review.

## Available tools and dependency

This session exposes image generation; FFmpeg and FFprobe are installed locally. No dedicated Runway/Veo generation connector was exposed when checked. Runway generation can proceed through an authenticated browser session or a configured API account; access and credits have not been verified. Do not describe generation as ready until that dependency is checked, and never put provider credentials in frontend code.

## References

- Runway generation controls: https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5
- Runway image-to-video prompting: https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide
- Muted inline autoplay and fallback: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
- Pause control for ongoing automatic movement: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
