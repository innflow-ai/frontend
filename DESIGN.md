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
- No autoplay, smooth-scroll interception, or decorative canvas. Animation libraries are limited to the documented homepage exception (see "Homepage skyline direction" below).

## Prohibited cloning behavior

- Do not copy Kora or DoorLoop copy, logos, imagery, people, customer proof, pricing, or illustrations.
- Do not reproduce exact page sections, grids, card geometry, navigation density, or motion sequences.
- Do not reuse third-party screenshots as shipped media.
- Do not infer that a repeated reference pattern is part of Innflow's identity.

## Homepage skyline direction (Aeline transplant, 2026-08-22)

The homepage moved to the light, photographic "skyline" visual language transplanted from the Aeline donor site (`/Users/ak/aeline-web`), while every other page stays on the token system above. This section supersedes the former "Homepage night direction" (dark, AI-forward) redesign.

### Token layer (additive block at the end of `globals.css`; base `:root` tokens unchanged)

| Semantic role | Token | Value | Source/rationale |
| --- | --- | --- | --- |
| Canvas | `--sky-canvas` | `#FFFFFF` | Aeline canvas |
| Soft band | `--sky-soft` | `#F4F8FC` | Aeline alternating cool surface |
| Hairline | `--sky-line` | `#E3ECF4` | Aeline hairline |
| Ink | `--sky-ink` | `#0C1B2A` | Aeline navy ink |
| Muted ink | `--sky-muted` | `#51606F` | Aeline secondary text |
| Action blue | `--sky-blue` | `#1F7EF7` (hover `#0F68DD`) | Aeline action blue adopted verbatim as the Innflow homepage brand blue (owner decision, 2026-08-22) |
| Accent blue | `--sky-blue-bright` | `var(--brand-kit-blue)` `#5AAAF8` | Brand-kit blue for icon/accent moments |
| Blue tint | `--sky-blue-soft` | `#E3F0FE` | Aeline chip/tag fill |
| Night (footer) | `--night` | `#08121F` | Remapped; footer is the only full-dark element |
| Night support | `--night-border` / `--night-ink` / `--night-muted` | `#1B2C42` / `#F2F7FD` / `#93A5BA` | Footer palette |
| Geometry | pill / card / image radius | `999px` / `20px` / `22px` | Aeline geometry |
| Shells | content / header / hero / CTA | `1160` / `1240` / `940` / `760px` | Aeline shells |
| Rhythm | `--sky-section` | `120px` | Aeline section padding (76px on phone) |
| Shadows | `--sky-shadow-card` / `--sky-shadow-media` / `--sky-shadow-panel` | ink-tinted | Aeline ink-tinted shadows |

### Section map (`src/app/page.tsx` + `page.module.css`)

1. Hero — full-bleed `/aeline/hero-sky.avif` with a white gradient overlay; eyebrow pill, existing Innflow H1/lede, two pill CTAs (demo URL via `TrackedLink`), avatar-stack proof row.
2. Customer-logo strip — `/aeline/logos/logo-1..5.svg`, grayscale to color on hover.
3. `#features` — 3×2 card grid, `/aeline/cards/*.avif` imagery, existing Innflow feature copy.
4. `#why-innflow` — alternating two-column rows, `Float` on `/aeline/services/*.webp`, CheckCircle checklists.
5. Testimonials — 2×2 grid, `/aeline/testimonials/` people and logos.
6. `#portfolios` — existing Innflow portfolio imagery/copy on Aeline card geometry.
7. Partner — three quiet cards with blue-soft icon chips.
8. `#faq` — native `<details>` driven by `faqs` from `src/content/home.ts`.
9. Final CTA — full-bleed `/aeline/cta-bg.avif` with a dark overlay; white pill to the demo URL.
10. Footer — `EditorialFooter` on the remapped night palette; `#resources` anchor unchanged.

### Asset sources

All transplanted media lives in `public/aeline/` (`hero-sky.avif`, `cta-bg.avif`, `cards/`, `services/`, `blog/`, `testimonials/`, `logos/`, `avatars/`). Innflow branding stays Innflow (`/brand/innflow-*.svg`); no `aeline-*.svg` wordmarks are used.

### Motion allowance (amends the global "no animation libraries" rule)

The homepage uses `motion` v12 (`motion/react`) via `src/components/motion.tsx`: `HeroIntro`/`HeroItem` stagger container (stagger `0.12`, delay `0.05`), `Reveal` scroll fade-rise (`viewport: { once: true, amount: 0.2 }`), and `Float` perpetual bob (5s). Springs are `stiffness: 120, damping: 20`. Every primitive bails out to static rendering under `useReducedMotion`, and CSS transitions remain 160ms color/background/lift with a `prefers-reduced-motion` reset. This allowance is homepage-scoped; other routes stay CSS-only.

### Placeholder content notice (2026-08-22)

Per an explicit owner decision on 2026-08-22, the homepage testimonials, customer-logo strip, and the hero "2,400+ teams" avatar-stack metric are **placeholder content** transplanted from the Aeline donor, not real Innflow customers or metrics. They must be replaced with verified proof or removed before any public launch claim audit.
