# Product artwork

113 static illustration compositions cover the Create and Rework entries in
`outputs/product-asset-inventory-2026-09-27/product-assets.csv`. The shared
Calendly product renderer places them across 16 Product navigation pages.
The eight Reuse assets retain their existing SVG backgrounds and workspace scenes.

Review the complete set at `/preview/product-artwork` (excluded from indexing).
Each asset has a full composition and compact thumbnail. Three overview
illustrations use the wide composition.

## Styling and sources

The `innflow-storyboarding` and `innflow-demo-theme` skills informed the separate
translucent backing, opaque white cards, navy text, Geist typography, UI spacing,
and connected workflow nodes. CSS blur, border and shadow approximate the glass
backing; they do not reproduce Figma's native refraction shader.

- AI Agent: approved Dropbox brand SVG, copied to `public/brand/product-artwork/ai-agent.svg`.
- Laura Kim: approved demo portrait, sourced from `avatar-15-hana-kim.png` in the demo profiles library.
- Condition: official Lucide Split SVG, https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/split.svg.
- Other icons: installed Phosphor SSR package. Integration logos: existing local assets.

Illustrations show fictional examples, not live customer data or interactive
product controls. They are exposed as one accessible image description; internal
UI is hidden from accessibility APIs and contains no focusable controls.
There is no animation or client JavaScript in the illustration components.

## Editing

- `src/content/product-artwork-scenes.ts`: authored copy and composition selection per asset ID.
- `product-artwork.tsx` and `.module.css`: reusable layout primitives and responsive compositions.
- `src/content/product-artwork-inventory.json`: page placements and original briefs.
- `scripts/sync-product-artwork-inventory.py`: regenerates the placement map from the CSV.

Keep asset IDs stable. After regenerating, format the JSON with Biome.

## Verification

114 tests cover inventory completeness, accessible rendering, and noninteractive
illustrations. TypeScript and the production build pass. Browser checks at
1440px and 390px verified all 299 page placements and checked illustration labels
for overflow. The gallery was checked at both sizes; representative layout
screenshots are in `output/playwright/product-artwork/`.
