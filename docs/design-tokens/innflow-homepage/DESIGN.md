# Innflow homepage design tokens

Snapshot: 2026-10-03. Extracted from the current local homepage implementation, including uncommitted workspace-section edits. This is a reusable design export, not confirmation of the deployed site's styling. The application does not import these files yet.

## Files

- `tokens.json`: 100 named tokens with values, types, descriptions, and source references.
- `variables.css`: namespaced `--innflow-*` CSS custom properties, including expanded typography properties.
- `theme.css`: optional Tailwind v4 adapter. Import after `variables.css`.
- `DESIGN.md`: usage, responsive behavior, and extraction decisions.

The JSON follows the supplied Calendly file's `$value`, `$type`, and `$description` shape. It is a CSS-oriented interchange format, not a claim of strict DTCG schema compliance: dimensions are strings, typography can contain `clamp()`, and CSS effects are strings. An importer may need to convert those values. `$extensions.ai.innflow.source` identifies the originating file and selector. The JSON is the canonical snapshot; keep CSS exports synchronized when updating it.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| `color.ink` | `#071a31` | Main text and lower-homepage CTA fill |
| `color.muted-hero` | `#5d6d7b` | Hero supporting copy |
| `color.muted-body` | `#5f6d77` | Lower-section supporting copy |
| `color.canvas` | `#fcfbf8` | Warm homepage canvas |
| `color.surface` | `#ffffff` | Raised cards |
| `color.surface-warm` | `#f5f3ee` | Hero shell and infrastructure cards |
| `color.surface-workspace` | `#f5f4ef` | Workspace backdrop fallback |
| `color.focus` | `#006bff` | Keyboard focus ring |
| `color.agent` / `agent-soft` | `#6bb0ff` / `#d3e5ff` | Hero AI agent category |
| `color.workflow` / `workflow-soft` | `#daf098` / `#f1f8dc` | Hero workflow category |
| `color.sidekick` / `sidekick-soft` | `#ba9dff` / `#eae3f9` | Hero sidekick category |
| `color.insights` / `insights-soft` | `#5aded7` / `#e5f9f9` | Hero insights category |

Category names describe the current hero tabs. The lower feature library has its own accent assignments in `homepage-content.ts`; these are not universal product-category mappings. Use pastels as surfaces and decorative accents with navy text. Shared global sky blue (`#00aeff`) and the shared CTA color (`#012232`) are preserved as separate roles rather than substituted for homepage-local values. This kit captures the light homepage only.

## Typography

| Role | Family | Desktop size | Compact behavior |
| --- | --- | --- | --- |
| Hero | Host Grotesk | `clamp(40px, 4.5vw, 72px)` | `clamp(32px, 9vw, 40px)` at 480px |
| Workspace section | Manrope | `clamp(38px, 4.17vw, 60px)` | `clamp(32px, 8vw, 44px)` through 1100px |
| Feature section | Source Serif 4 | 48px | 40px through 800px; 34px through 480px |
| Workspace card | Manrope | 36px | 26px through 1100px |
| Feature row | Manrope | 20px / 28px | 18px through 480px |
| Body | Geist | 16px / 22.4px | Component-specific |
| Section introduction | Geist | 18px / 1.4 | 16px in compact layouts |
| Customer quote | Source Serif 4 | 20px / 1.45 | 18px through 800px |

Most headings use weight 500, body copy 400, and tight heading tracking. The lower stories heading is a separate 60px Manrope treatment, falling to 40px through 800px; the workspace fluid heading is not a universal replacement. Hero body and shared navigation use Host Grotesk. Roboto exists inside a contact-demo illustration and is intentionally outside the core four-family set.

Fonts are not bundled with this kit. In this app, `layout.tsx` loads Host Grotesk and `ShowcaseTheme` loads the lower-section families using `next/font`. The CSS variables include readable font-name fallbacks for use elsewhere. Load those font files in other projects before expecting an exact visual match.

## Layout and shape

Use the 1280px content shell with 40px internal desktop gutters. Feature sections use 120px vertical padding and an 80px column gap. Through 800px, those become 72px section padding, 24px gutters, and a 32px single-column gap. The workspace uses its own 64px compact section padding and 16px content gutter. Outer homepage panels have 24px insets, reduced to 12px on compact screens.

Radii belong to components: 8px controls, 20px lower CTAs, 32px hero cards, 40px hero shells, 48px workspace cards, and 64px workspace surfaces. Compact variants are recorded separately. Feature animation panels retain a `771 / 830` aspect ratio and `7.241% / 6.726%` elliptical radius; preserve these proportions when embedding the Rive artboards.

Breakpoints are documentation values, not interchangeable universal sizes. The workspace switches at 760px; hero/features switch at 800px; desktop workspace rows begin at 1101px. CSS custom properties cannot be used directly in media-query conditions. Write the corresponding pixel value in a query.

## Motion and artwork

Hero transitions use 150ms tooltip fades, 250ms tab changes, and 280ms panel fades. Feature image changes use 300ms. The workspace file still contains a 400ms expansion rule, but current desktop rows override it with no transition; it is not exported as a default motion token.

Respect `prefers-reduced-motion` by disabling decorative animation and transitions and following the source components' static/mobile fallbacks. Do not apply timing tokens to re-enable effects in that mode. Focus rings are 3px with a 5px offset in hero/features; workspace CTAs use a 4px offset. Mobile feature controls have a 44px minimum target.

The hero and customer-story gradients are image assets. Their tokens retain the real app-relative URLs; a CSS gradient would not reproduce those images. Copy the assets from `public/` when using this package in another project. The workflow backdrop is an actual CSS gradient, exported with its original stops. `shadow.hero` is a `filter: drop-shadow()` value. `shadow.story` is a box shadow, suppressed by the homepage's preview-fallback story-card variant.

## Use in CSS

Import `variables.css` once through the application's global stylesheet or layout when you decide to adopt the kit. No runtime imports were added as part of this extraction.

```css
.card {
  color: var(--innflow-color-ink);
  background: var(--innflow-color-surface);
  border-radius: var(--innflow-radius-workspace-card);
  padding: var(--innflow-spacing-40);
}

.heading {
  font-family: var(--innflow-typography-section-font-family);
  font-size: var(--innflow-typography-section-font-size);
  font-weight: var(--innflow-typography-section-font-weight);
  line-height: var(--innflow-typography-section-line-height);
  letter-spacing: var(--innflow-typography-section-letter-spacing);
}

@media (max-width: 1100px) {
  .heading {
    font-size: var(--innflow-typography-section-compact-font-size);
  }
}
```

For scoped `next/font` variables, put `data-innflow-tokens` on an element inside `ShowcaseTheme` so the font aliases resolve within that font scope. Font-family utilities and text-size utilities are separate in the Tailwind adapter, for example `font-innflow-heading text-innflow-section bg-innflow-canvas`. Responsive tokens do not automatically apply media queries. The kit defines values, not component behaviors.

## Sources and Calendly reference

The entry path is `src/app/page.tsx` → `src/components/showcase-homepage.tsx`. Source styles and typography come from:

- `src/app/preview/scroll-showcase/showcase.module.css` and `scroll-showcase.tsx`
- `src/app/preview/scroll-showcase/homepage.module.css`
- `src/app/preview/scroll-showcase/workspace-overview.module.css`
- `src/app/preview/scroll-showcase/baseline-features.module.css`
- `src/app/preview/scroll-showcase/baseline-lower-sections.module.css`
- `src/components/showcase-theme.tsx`, `src/app/layout.tsx`, and selected shared roles from `src/app/globals.css`

The existing Calendly kit was located and read at `/Users/ak/Downloads/Calendly_variables/`:

- `tokens.json`
- `variables.css`
- `theme.css`
- `DESIGN (1).md`

Calendly's kit uses Gilroy, navy `#0b3558`, and a cool `#f8f9fb` canvas. It provided the export structure; the Innflow values above come from the homepage implementation. The original Calendly files were left intact.
