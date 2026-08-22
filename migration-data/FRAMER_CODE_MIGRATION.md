# Framer custom-code migration

Source project: the current Innflow Framer project, read on 2026-08-22.

| Framer source | Self-managed component |
| --- | --- |
| `Workshop/TypewriterEffect.tsx` | `src/components/framer-migrated/typewriter-effect.tsx` |
| `Reveal_Text_1.tsx` | `src/components/framer-migrated/reveal-text.tsx` |
| `Conic_Gradient_Component.tsx` | `src/components/framer-migrated/conic-gradient.tsx` |
| `MediaSlideshowPack.tsx` | `src/components/framer-migrated/smooth-ring-gallery.tsx` |
| `desktop/home/SlackUI.tsx` | `src/components/framer-migrated/slack-ui.tsx` |

The migrated versions preserve runtime behavior while removing Framer property
controls, Framer static-renderer hooks, and runtime Google Font injection. Motion
imports use the repository's existing `motion` dependency.

The no-index route `/component-lab/framer-migration` renders all five components
for visual and interaction regression checks without adding their JavaScript to
the public homepage bundle.

`framer-assets-manifest.json` is the provenance manifest from the public Framer
asset crawl. It records source URLs, hashes, sizes, and discovery pages for 385
downloaded assets. The full 100 MB archive remains outside the application until
an asset is approved for public use; copying the whole archive into `public/`
would add deployment weight without making it part of a page.
