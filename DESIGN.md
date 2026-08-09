# Innflow marketing design foundation

## Intent

Translate Kora's calm editorial character into Innflow's approved brand while using DoorLoop only for homepage conversion sequence. No third-party copy, identity, media, or exact composition is reproduced.

## Reference evidence

The implementation used the existing August 9, 2026 captures in `output/playwright/` rather than recapturing live sites:

- Kora: `kora-desktop.png`, `kora-mobile.png`, and `kora-hero.png`.
- DoorLoop: `doorloop-desktop.png`, `doorloop-mobile.png`, and `doorloop-hero.png`.
- Existing Innflow site: `innflow-current-desktop.png`, `innflow-current-mobile.png`, and `innflow-current-hero.png`.

Observed/inherited Kora evidence: Manrope-led typography, warm off-white canvas near `#FAFAF7`, near-black ink near `#292929`, restrained borders and shadows, large editorial headings, asymmetric content blocks, and selective deep-blue, green, and plum accents. The DoorLoop capture supports the conversion order: property-specific hero, platform overview, operational stories, AI, proof/differentiation, portfolio fit, integrations, objections, and final CTA.

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

- Display and body: Manrope through `next/font`.
- Labels and metadata: Figtree through `next/font`.
- Heading weight stays moderate; scale and spacing create hierarchy.
- Headings use tight tracking; body copy uses relaxed line height and a practical readable width.

## Layout rules

- Maximum shell: `1280px` with `24px` desktop gutters and `16px` phone gutters.
- Major sections use 96–128px vertical spacing; phone sections use 76px.
- Alternating product stories use asymmetric 40/60 grids, not repeated three-card rows.
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
