# Innflow marketing design foundation

## Intent

Translate the light editorial system explored in the approved SynthAI-inspired mockup into Innflow's brand while using the existing DoorLoop-informed acquisition sequence. No third-party copy, identity, people, or product claims are reproduced.

## Reference evidence

The current homepage implementation uses these August 9, 2026 references:

- Approved visual target: `/Users/ak/Library/CloudStorage/Dropbox/innflow_web_plan/design_concepts/07-portfolio-canvas-synthai-inspired.png`.
- SynthAI visual assets supplied in `/Users/ak/Library/CloudStorage/Dropbox/Features _ Synth AI` for reference and the final CTA background.
- DoorLoop: `doorloop-desktop.png`, `doorloop-mobile.png`, and `doorloop-hero.png`.
- Existing Innflow site: `innflow-current-desktop.png`, `innflow-current-mobile.png`, and `innflow-current-hero.png`.

The approved target establishes Figtree typography, near-white section surfaces separated by pale-gray gutters, near-black actions, restrained borders and shadows, asymmetric product compositions, pastel lavender/mint/blush feature bands, an iridescent closing CTA, and a black footer. The DoorLoop capture supports the conversion order: property-specific hero, platform overview, operational stories, AI, proof/differentiation, portfolio fit, integrations, objections, and final CTA.

## Innflow token mapping

| Semantic role | Token | Value | Source/rationale |
| --- | --- | --- | --- |
| Canvas | `--canvas` | `#FAFAF7` | Kora reference translated through warm Innflow neutrals |
| Warm section | `--canvas-warm` | `#F5F4F1` | Approved Innflow brand kit |
| Primary ink | `--ink` | `#292929` | Kora reference; close to Innflow `#1A1A1A` |
| Strong ink | `--ink-strong` | `#171817` | Accessible near-black |
| Surface | `--surface` | `#FFFFFF` | Approved Innflow canvas |
| Quiet border | `--border` | `#DFDDD6` | Darkened from brand-kit `#F0EBE2` for visible separation |
| Primary action | `--brand` | `#1760A8` | Accessible dark companion to approved `#5AAAF8` |
| Brand highlight | `--brand-kit-blue` | `#5AAAF8` | Approved Innflow brand blue, used for focus and accents |
| Dark product surface | `--deep` | `#070909` | Prompt-provided Innflow deep canvas |
| Status green/plum | semantic pairs | restrained | Secondary differentiation only |

The brand-kit blue does not provide sufficient contrast for small white CTA text, so primary buttons use the darker semantic brand token while the approved blue remains visible in focus, diagrams, and accents.

## Typography

- Display, body, labels, and metadata: Figtree through `next/font`.
- Heading weight stays moderate; scale and spacing create hierarchy.
- Headings use tight tracking; body copy uses relaxed line height and a practical readable width.

## Layout rules

- Maximum homepage shell: `1400px` with `8px` section gutters; inner content retains 24–44px desktop breathing room and 18–24px phone padding.
- Major sections use 96–128px vertical spacing; phone sections use 76px.
- Product stories use asymmetric editorial copy/product compositions inside broad pastel bands.
- Borders communicate grouping; shadows are reserved for product evidence.
- Dark surfaces are limited to operational-control and conversion moments.
- Approved product media is labeled and paired with illustrative UI only where no approved screenshot exists.

## Responsive rules

- Desktop: two-column hero, editorial feature alternation, sticky walkthrough introduction.
- Tablet: navigation collapses; hero becomes single-column; feature media remains paired where space permits.
- Phone: all major compositions reflow, CTA buttons become full-width, workflow nodes remain inside their frame, data grids reduce to one or two columns, and no text shrinks below readable sizes.
- Intended review widths: 360, 768, 1024, 1440, and wide desktop.

## Interaction and motion

- Ordinary transitions are 160–180ms and limited to color, background, and a one-pixel hover lift.
- Native `<details>` provides keyboard-accessible FAQ disclosure.
- Mobile navigation uses an explicit button, `aria-expanded`, `aria-controls`, and Escape dismissal.
- `prefers-reduced-motion` disables smooth scrolling and effectively removes transitions.
- No autoplay, smooth-scroll interception, decorative canvas, or animation library is included.

## Prohibited cloning behavior

- Do not copy Kora or DoorLoop copy, logos, imagery, people, customer proof, pricing, or illustrations.
- Do not reproduce exact page sections, grids, card geometry, navigation density, or motion sequences.
- Do not reuse third-party screenshots as shipped media.
- Do not infer that a repeated reference pattern is part of Innflow's identity.

## Homepage night direction (2026 redesign)

The homepage moved to a dark, AI-forward visual language while every other page stays on the token system above.

- Dark near-black surfaces: `--night` `#06090F`, `--night-surface` `#0C111B`, `--night-border` `#1D2635`, with `--night-ink` / `--night-muted` text. Section rhythm alternates dark hero/setup/closing-CTA with light integrations, features, portfolio, partner, and FAQ surfaces.
- Iridescent accent ramp: `--glow-blue` `#5AAAF8` → `--glow-violet` `#8B7CF6`, exposed through `.gradient-text` (large display sizes only, for contrast) and `.gradient-border` (hairlines on dark cards). Gradients are CSS-only radial/linear washes — no canvas, no JS, no animation libraries.
- Display scale: `--display-size: clamp(56px, 7vw, 96px)` for the hero headline.
- Product evidence renders as floating glass panels: `--night-surface` fill, `--night-border`, backdrop blur, and a soft blue/violet glow shadow.
- Header is dark glass (blurred `--night` at 78% over the hero, white logo); footer is a `--night` surface. Both remain homepage-scoped (`editorial-*` classes in `src/app/page.module.css`); other pages keep `site-header`/`site-footer`.
- Motion stays restrained: 160–180ms color/background/border transitions and a one-pixel hover lift; `prefers-reduced-motion` removes transitions. No scroll animation.
- Copy honesty is unchanged: no customer names, logos, or fabricated metrics. The logo-wall slot shows product integration connectors only, labeled as such.
