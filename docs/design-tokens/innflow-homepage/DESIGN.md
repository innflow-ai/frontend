# Innflow homepage design system

> White and cool-gray surfaces, navy typography, rounded product stories, and motion that explains the work.

**Theme:** light. **Source:** current local homepage at commit `2ce4deb`, reviewed 2026-10-03. **Scope:** homepage and its shared navigation/footer, with guidance for new cross-industry pages. This is a source-based design reference, not a fresh visual audit of the deployed site.

Innflow's homepage presents general automation through conversations, agents, workflows, assistance, and insights. It combines a white canvas with dark navy text, pastel category colors, large rounded panels, and product artwork. Typography changes by role: Host Grotesk for the hero and site chrome, Geist for lower-page body copy, Manrope for sans headings, and Source Serif 4 for editorial feature headings and quotations. Motion connects each explanation to its visual example. On smaller screens, the layout prioritizes readable copy, accessible controls, and visible artwork.

The 2026-10-03 user direction supersedes the earlier warm palette: use white and cool-gray surfaces, 16px supporting copy, and 14px compact card copy. Never add decorative section numbers or numbered feature badges. Keep actual data, prices, dates, and pagination.

## Package and authority

This is the Innflow counterpart to the entire four-file `Calendly_variables` folder. It includes a rewritten design guide, JSON tokens, CSS variables, and a Tailwind adapter. Every part is adapted to Innflow rather than renamed from Calendly.

| File | Purpose |
| --- | --- |
| `DESIGN.md` | Visual identity, component recipes, composition, imagery, interaction, responsive rules, and implementation guidance |
| `tokens.json` | 151 source-referenced design tokens; canonical values for this export |
| `variables.css` | Generated, namespaced `--innflow-*` custom properties |
| `theme.css` | Generated Tailwind v4 adapter |
| `generate.mjs` | Regenerates both CSS files from the JSON using Node built-ins |

The app does not import this kit yet. Existing homepage source is the authority for actual behavior and CSS cascade. When values change, update the JSON and run `node generate.mjs` from this folder. Keep descriptions and this guide aligned with those changes.

The JSON retains the supplied Calendly file's `$value`, `$type`, and `$description` shape. It is a CSS-oriented interchange format, not strict DTCG schema compliance: dimensions are strings, typography can contain `clamp()`, and CSS effects are strings. Importers may need conversion. Each token's `$extensions.ai.innflow.source` records its source file and selector. Assets and font files are referenced, not bundled.

## Colors

| Role | Value | CSS token |
| --- | --- | --- |
| Main ink | `#071a31` | `--innflow-color-ink` |
| Hero supporting copy | `#5d6d7b` | `--innflow-color-muted-hero` |
| Lower supporting copy | `#5f6d77` | `--innflow-color-muted-body` |
| Main canvas | `#ffffff` | `--innflow-color-canvas` |
| White card | `#ffffff` | `--innflow-color-surface` |
| Cool-gray hero/infrastructure surface | `#f8f9fb` | `--innflow-color-surface-warm` |
| Workspace backdrop fallback | `#f8f9fb` | `--innflow-color-surface-workspace` |
| Small badge | `#f0f0ee` | `--innflow-color-surface-inset` |
| Subtle control tint | `#071a310d` | `--innflow-color-border-subtle` |
| Feature divider | `#071a3133` | `--innflow-color-border-divider` |
| Homepage focus | `#006bff` | `--innflow-color-focus` |
| Shared signup/action | `#012232` | `--innflow-color-action-shared` |
| Shared action hover | `#013247` | `--innflow-color-action-shared-hover` |
| Shared brand sky | `#00aeff` | `--innflow-color-brand-sky` |
| Shared brand-kit blue | `#5aaaf8` | `--innflow-color-brand-kit` |
| Announcement strip | `#87bdff` | `--innflow-color-announcement` |
| Story active indicator | `#4890e3` | `--innflow-color-story-active` |
| Footer secondary text | `#d0d7df` | `--innflow-color-footer-muted` |

### Hero category colors

| Hero tab | Accent | Demo surface | Token suffixes |
| --- | --- | --- | --- |
| AI agent | `#6bb0ff` | `#d3e5ff` | `agent`, `agent-soft` |
| Workflows | `#daf098` | `#f1f8dc` | `workflow`, `workflow-soft` |
| Sidekick | `#ba9dff` | `#eae3f9` | `sidekick`, `sidekick-soft` |
| Insights | `#5aded7` | `#e5f9f9` | `insights`, `insights-soft` |

Use these as category fills and decorative surfaces with navy text. They are not substitutes for readable text or semantic success/error colors. They describe the current hero tabs, not a universal product taxonomy. The active lower-page renderer is `baseline-features.tsx`; its historical IDs (`channels`, `agents`, `workflows`, `insights`) do not directly describe their current labels. Preserve its current storyboard mapping rather than inferring labels from those IDs or older preview content.

The shared brand palette and shared signup navy remain separate from homepage-local colors. A shared brand accent does not make every homepage CTA blue. This kit defines no dark theme or comprehensive product-app error, warning, or input-state system.

## Typography

### Families and roles

| Family | Role | Typical weights | CSS token |
| --- | --- | --- | --- |
| Host Grotesk | Hero, navigation, signup controls, footer | 400, 500 | `--innflow-font-hero` |
| Geist | Lower homepage body text and interface labels | 400, 500 | `--innflow-font-body` |
| Manrope | Lower sans headings and feature-row titles | 500 | `--innflow-font-heading` |
| Source Serif 4 | Editorial feature headings and customer quotations | 400, 500 | `--innflow-font-editorial` |

The app loads Host Grotesk in `layout.tsx` and the lower-section families in `ShowcaseTheme`. Roboto is used inside a contact-demo illustration; it is not a fifth general homepage typeface. Named fallbacks in the export do not load fonts. Other projects must load the font files separately.

### Type scale

| Role / typography token | Font | Size | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| `hero` | Host Grotesk | `clamp(40px, 4.5vw, 72px)` | 500 | 1.1 | -0.045em |
| `hero-mobile` | Host Grotesk | `clamp(32px, 9vw, 40px)` | 500 | 1.1 | -0.045em |
| `hero-body` | Host Grotesk | 15px | 400 | 22px | 0.02em |
| `section` | Manrope | `clamp(38px, 4.17vw, 60px)` | 500 | 1.1 | -0.029em |
| `section-compact` | Manrope | `clamp(32px, 8vw, 44px)` | 500 | 1.1 | -0.029em |
| `feature` | Source Serif 4 | 48px | 500 | 1.1 | -1.6484px |
| `feature-tablet` | Source Serif 4 | 40px | 500 | 1.1 | -1.2px |
| `feature-mobile` | Source Serif 4 | 34px | 500 | 1.1 | -1.2px |
| `workspace-card` | Manrope | 36px | 500 | 1.2 | -0.025em |
| `workspace-card-compact` | Manrope | 26px | 500 | 1.2 | 0.38px |
| `feature-row` | Manrope | 20px | 500 | 28px | -0.4492px |
| `body` | Geist | 16px | 400 | 22.4px | 0.02em |
| `body-large` | Geist | 18px | 400 | 1.4 | 0.02em |
| `quote` | Source Serif 4 | 20px | 400 | 1.45 | 0.02em |
| `signup` | Host Grotesk | 15px | 400 | 1.35 | 0.02em in hero |
| `button` | Geist | 16px | 500 | 22.4px | 0.02em |
| `caption` | Geist | 12px | 400 | 1.4 | 0.02em |
| `stories-heading` | Manrope | 60px | 500 | 1.1 | -1.74px |
| `stories-heading-mobile` | Manrope | 40px | 500 | 1.1 | -1px |
| `infrastructure-card` | Geist | 24px | 500 | 1.4 | 0.005em |
| `footer-heading` | Host Grotesk | 18px | 500 | 26px | 0.005em |
| `footer-link` | Host Grotesk | 14px | 400 | 20px | 0.02em |

Inherited values are recorded for this homepage context. Header typography has a separate zero-tracking reset. Hero supporting copy becomes 14px/20px at 480px; feature rows become 18px at 480px; quotes become 18px at 800px. Do not scale every text role using one breakpoint or replace all headings with the hero treatment.

## Spacing and shapes

**Density:** spacious section composition with compact controls. **Spacing model:** commonly 8px steps, with 4px subdivisions and component-specific values. The observed export includes 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 72, 80, and 120px. Use semantic layout tokens when a value describes a section or control.

| Element | Desktop | Compact |
| --- | --- | --- |
| Feature/workspace content shell | 1280px including internal padding | Fluid |
| Feature internal gutter | 40px | 24px through 800px |
| Feature vertical section padding | 120px | 72px through 800px |
| Feature column gap | 80px | 32px single-column gap |
| Outer panel inset | 24px | 12px in the relevant mobile rules |
| Workspace compact padding | Component-specific above 1100px | 64px vertical, 16px horizontal through 1100px |
| Workspace desktop row padding | 40px | 24px compact card padding |
| Signup minimum height | 48px | Header-specific compact override is separate |
| Lower CTA minimum height | 50px | Same base size |
| Mobile feature-control target | Not a desktop layout token | 44px minimum |

### Border radii

| Component | Token | Value / compact variant |
| --- | --- | --- |
| Feature controls | `radius.control` | 8px |
| Lower CTA | `radius.button` | 20px |
| Signup | `radius.signup` | 999px |
| Hero main card | `radius.card` | 32px / 24px |
| Hero outer shell | `radius.hero` | 40px / 28px |
| Workspace card | `radius.workspace-card` | 48px / 32px |
| Workspace shell | `radius.workspace-surface` | 64px / 36px on mobile |
| Feature artwork | `radius.storyboard` | `7.241% / 6.726%`; fixed mobile variants in source |
| Floating navigation | `radius.navigation` | 45px; initial header is flat |
| Navigation dropdown | `radius.dropdown` | 20px |
| Hero badge | `radius.badge` | 4px |
| Integration tile | `radius.integration` | 24px / 16px |
| Footer | `radius.footer` | 64px / 32px |

Rounded corners follow the size and purpose of each component. Innflow has no universal 8px-button or 24px-card rule. Artwork uses a 771 × 830 source canvas; retain its aspect ratio and the proportional corner treatment when scaling it.

## Surfaces and elevation

| Surface token | Value | Use |
| --- | --- | --- |
| `surface.canvas` | `#ffffff` | Main page |
| `surface.card` | `#ffffff` | Product and workspace cards |
| `surface.hero` | `#f8f9fb` | Hero shell / cool-gray lower cards |
| `surface.workspace` | `#f8f9fb` | Workspace fallback beneath imagery |
| `surface.badge` | `#f0f0ee` | Hero badge |
| `surface.control` | `#071a310d` | Subtle control wash |
| `surface.dark` | `#071a31` | Footer and lower CTAs |
| `surface.signup` | `#012232` | Hero signup control |
| `surface.navigation-glass` | `rgb(255 251 244 / 60%)` | Floating header and dropdown |

Use elevation selectively. Current desktop workspace rows explicitly remove their active-card shadow. White cards do not all need shadows.

| Effect | Value | Application |
| --- | --- | --- |
| `shadow.hero` | `0 24px 24px #47678818` | `filter: drop-shadow(...)` on the hero showcase |
| `shadow.story` | `0 0 0 8px #ffffff50, 0 12px 32px -5px #637d9e29` | Story-card box shadow; preview fallback suppresses it |
| `shadow.signup` | `inset 0 1px 2px #ffffff70, 0 3px 7px #0002` | Signup button |
| `shadow.signup-hover` | `inset 0 1px 2px #ffffff70, 0 5px 12px #0003` | Signup hover |
| `shadow.navigation` | `0 4px 10px #0000001a` | Floating header |
| `shadow.dropdown` | `0 4px 10px #0003` | Dropdown |
| `blur.navigation` | 15px | Header backdrop filter |
| `blur.dropdown` | 30px | Dropdown backdrop filter |

Neutral shadows are part of the current signup/navigation system. The source does not impose Calendly's blue-shadow-only rule.

## Components

### 1. Hero signup buttons

Both Google and Microsoft hero links use the same shared dark signup treatment: `#012232` background, white text, 999px radius, at least 48px height, and 12px 22px padding. Content is centered with a 10px gap and provider artwork. Use the shared signup component rather than inventing provider-specific colors. Hover changes to `#013247` with the stronger button shadow over 160ms. The text uses 15px Host Grotesk, weight 400. Header and footer contexts have deliberate overrides; the footer signup variant is white on navy.

### 2. Lower-section CTA

Workspace CTAs use `#071a31` with `#ffffff` text, a 20px radius, 50px minimum height, 12px 20px padding, and a transparent 2px border. The closing CTA also uses navy but white text and its own inherited text weight. Match the relevant component, not a single global recipe. Preserve its real destination and label.

### 3. Text links and utility links

Keep links visually lighter than filled actions. The infrastructure-directory link uses 16px text with a 12px icon gap; the hero email-signup link is a smaller underlined helper. Footer links underline on hover with a 4px underline offset. Preserve keyboard focus. Do not introduce an outlined-white CTA variant solely because it appears in Calendly's guide; adopt it only if a real Innflow component calls for it.

### 4. Hero showcase card and tabs

The hero places a centered headline and provider actions above a large animated showcase, not a permanent text-left/calendar-right split. The card has a cool-gray canvas fill, 32px desktop corners, and a two-column inner panel with 48px padding and 64px gap. Its desktop content width is `min(996px, calc(100% - 96px))`. Four icon tabs identify AI agent, Workflows, Sidekick, and Insights. Desktop tabs are 56px square with a 4px white border and 24px corners. Active tabs use their category fill; icon opacity indicates inactivity. Mobile tabs become 48px square with 20px corners. Preserve accessible selected states and keyboard navigation.

### 5. Workspace overview rows

Use the large rounded workspace surface and centered introduction. Above 1100px, all cards are fully expanded stacked rows, with text/artwork columns in a 3:2 ratio, 48px card corners, 40px copy padding, and at least 380px row height. Desktop card titles are 36px Manrope; body copy is 18px with 1.5 line height. Do not restore the old hover-expanding desktop card layout from earlier rules in the stylesheet. Compact layouts use smaller headings and card radii, with all mobile card content available as the reader scrolls.

### 6. Feature rows and artwork panels

Use Source Serif 4 section headings above Manrope feature-row titles. Rows have 24px vertical padding and a 2px `#071a3133` bottom divider. Titles use 20px/28px, weight 500. Desktop inactive rows use reduced opacity; active rows are fully visible. Descriptions use Geist 16px/22.4px in muted navy-gray. The arrow control is 32px square with 8px corners and a subtle navy wash, expanding to 44px on mobile. Keep the selected row synchronized with its illustration and retain the section's special scroll behavior where implemented. Mobile overrides improve inactive-row readability; do not copy desktop opacity indiscriminately.

Artwork retains its 771:830 ratio, masks, and source-specific backgrounds. Lower feature sections may reverse copy/art columns on desktop. Keep the implemented mobile order and in-flow artwork placement; do not force a fixed desktop stage onto a narrow viewport.

### 7. Badges and attribution chips

The hero's small New label uses 12px text, 4px corners, 4px 8px padding, and `#f0f0ee`. Story attribution chips use a navy 5%-alpha wash, 8px corners, 4px 8px padding, and 12px Geist with 1.4 line height. These are separate treatments, not a universal blue pill. Only display factual statuses and supported attribution.

### 8. Customer-story card

Use the image-backed story section with a centered heading, white card, quotation, attribution, and portrait. The desktop base card is 762px wide with 64px corners and a 361px portrait column; portrait corners are 48px. The compact card becomes one column, up to 580px wide, with 32px outer and 24px portrait corners; the image moves above the copy. Story controls use `#4890e3` for the active marker. The page can render a layout-preview fallback when no selected stories are available; preserve its disclosure and different elevation behavior. For any actual testimonial content work, read `sanity/TESTIMONIALS.md` before selecting or changing records.

### 9. Integration tiles and infrastructure cards

Integration logos sit in cool-gray rounded tiles rather than Calendly's unframed trust-logo strip. Desktop tiles are 112px square with 24px corners, 64px contained logos, and connectors between tiles. At 800px they become 64px tiles with 16px corners, wrap, and omit those connectors. Infrastructure cards use a two-column grid, 24px gap and padding, 48px corners, and cool-gray backgrounds; mobile becomes one column with 32px corners. Logos describe integrations or examples, not customer endorsements.

### 10. Product illustrations and calendar demos

Product UI, Rive scenes, and existing SVG/image assets illustrate work in context. The calendar illustration is a demonstration, not a functioning booking flow. Preserve local interactions and source assets rather than reconstructing it from generic Calendly widget rules. Illustration-internal colors, microtype, and control sizes can differ from the website interface; do not promote them into general site tokens.

### 11. Section header

Center the heading and supporting paragraph where the section calls for it. Workspace headings use the fluid Manrope treatment; lower stories/infrastructure headings use 60px Manrope with their own 40px compact treatment. Supporting copy is generally 18px Geist, 1.4 line height, with a 560px maximum width. Feature blocks instead use left-aligned serif headings. Match the role before choosing the type scale.

### 12. Navigation and announcement

The homepage begins with a flat white navigation area at 70px height and an optional 40px blue announcement strip. The floating header uses a 1320px width calculation, 64px minimum height, 45px corners, translucent white fill, 15px blur, and a subtle shadow. Navigation transitions with the hero rather than remaining a static 64px strip throughout. Dropdowns use 20px corners and stronger blur. Preserve dismissal, menu focus behavior, Escape handling, and mobile navigation. The main mobile navigation breakpoint is 1180px, independent of the content breakpoints.

### 13. Closing product highlights

Use a centered heading and navy CTA above a horizontally scrollable product-highlight track. Keep scroll snapping and the visible previews of adjacent artwork. The current closing component is a horizontal exploration surface; do not add autoplay based on the old preview README. The base slide width is 656px with a 38px gap; mobile uses 82vw and a 20px gap.

### 14. Footer

Use a navy `#071a31` panel inside a 24px white outer inset, with 64px corners. Desktop padding is 96px at the top and 64px at the bottom, with responsive horizontal insets. Use an inverse Innflow logo, white primary text, `#d0d7df` secondary links, and a translucent divider. Column headings are 18px Host Grotesk; links are 14px/20px. Through 1100px, upper content stacks and padding becomes 48px 32px. Through 600px, outer padding becomes 12px, corners 32px, and inner padding 40px 24px. Keep legal links and contact information grouped distinctly.

## Imagery and iconography

Use the existing Innflow wordmark and provider logos in their approved variants. Homepage artwork combines product UI, gradient scenes, icons, and portraits. Photography is part of the actual composition, especially in customer-story and closing scenes; Calendly's no-photography rule does not apply.

The hero gradient and story backdrop are real images at `/preview/scroll-showcase/gradient.png` and `/preview/homepage/baseline-lower/stories-background.png`. Retain those files, cropping, and positioning rather than claiming a few CSS stops reproduce them. The agent and workflow gradients are actual CSS gradients and are exported as tokens. Keep different gradient families distinct.

Use the existing Mage icons for matching website controls. Preserve provider-logo proportions, and use contained rendering where the component does. Use the source icons' stroke/fill treatment rather than imposing a global line weight absent from the homepage. Decorative art should not compete with the headline or obscure controls. When transferring Rive scenes, preserve their source canvas, masks, text readability, and loop behavior. This guide does not certify the current binary assets' playback.

## Layout and page composition

The current composition is:

1. Announcement and shared navigation.
2. Centered hero statement, supporting copy, provider signup actions, and four-tab showcase.
3. Workspace overview with centered introduction and product rows.
4. Four lower feature groups: AI agent, Workflows, Assistant, and Insights, using the current 18-storyboard mapping.
5. Customer stories or the disclosed layout-preview fallback.
6. Connected infrastructure, integration tiles, and infrastructure cards.
7. Closing CTA and horizontally scrollable product highlights.
8. Navy rounded footer.

Use the 1280px content shell for the main lower sections, generous vertical breathing room, and component-specific rounded surfaces. Alternate feature composition only where the source does. The hero, navigation, and footer have their own widths and should not be squeezed into one universal container.

For new industry and cross-industry pages, adapt the homepage's typography, palette, components, spacing, and responsive motion. Position Innflow around general automation unless the page explicitly addresses an industry. Property-management product/feature pages use their separate Rent collection pattern; blog pages use the separate blog design pattern. This kit does not supersede those repository rules.

## Responsive and motion behavior

| Boundary | Current purpose |
| --- | --- |
| 480px | Small hero and feature typography |
| 600px | Footer compact layout |
| 760px | Workspace mobile layout |
| 800px | Hero/feature compact layouts and unpinned hero |
| 1100px | Workspace compact layout; desktop expanded rows begin at 1101px |
| 1180px | Shared mobile navigation |
| 650px viewport height | Hero unpins on short screens |

Breakpoints are literal CSS query values. Custom properties cannot be substituted directly into media-query conditions. Responsive values in the kit do not apply their own queries.

Desktop hero motion uses a 500svh scroll track. Current motion logic reserves the first 12% for entry and begins exit at 84%, splitting the middle range into four chapters. Do not copy obsolete chapter percentages from the old preview README. At widths up to 800px, heights up to 650px, or reduced motion, the stage is unpinned with automatic height. Preserve controls and content reachability in those modes.

Use 150ms tooltip fades, 250ms tab changes, 280ms panel crossfades, 300ms feature-art fades, and 160ms signup transitions where those source components use them. Story layout-preview transitions use 600ms, reduced to zero for reduced motion. The workspace's old 400ms expansion rule is not a current desktop default; desktop rows override it.

Respect reduced motion in component logic and CSS. Keep user-selectable content available, avoid automatic scrolling/animation when reduced motion is active, and follow source visibility/playback controls for illustrations. Preserve focus indicators and selected-state semantics; color alone must not be the sole indication of a selected tab. Source focus styles vary: hero/features use 3px blue with a 5px offset, workspace CTA uses a 4px offset, navigation uses its own 2px treatment, and footer uses 2px category blue. This document records implementation and is not a substitute for a full accessibility audit.

## Do's and don'ts

### Do

- Use white canvas, navy text, and the correct muted-copy role.
- Match typography to component role, including serif feature headings.
- Use the real signup pill and lower CTA recipes as distinct components.
- Preserve large panel radii, source artwork ratios, and mobile variants.
- Keep gradient artwork and portraits where the homepage uses them.
- Prefer product examples about connected work, conversations, and general automation.
- Verify current component code before copying rules from historical previews.
- Keep mobile content reachable and honor reduced motion.

### Don't

- Import the entire Calendly kit and assume the homepage will remain visually unchanged.
- Replace Innflow fonts with Gilroy or apply bold 80px headings everywhere.
- Make every CTA bright blue or every button 8px rounded.
- Ban gradients, portraits, or neutral shadows; each exists in the current design.
- Add decorative blobs behind every product visual as a universal requirement.
- Reintroduce obsolete desktop hover cards or closing autoplay from older documentation.
- Use integration logos as proof of customer relationships or turn illustration labels into product claims.
- Apply these homepage rules as an unsolicited redesign of unrelated existing page families.

## Design-agent prompt guide

Use the homepage code as the visual authority and this package as its extracted design reference. Request or implement the relevant component rather than combining arbitrary tokens.

**Reusable starting brief:**

> Create an Innflow section consistent with the current homepage. Use a white #ffffff canvas, #071a31 primary text, and #5f6d77 supporting copy. Use Geist for body text, Manrope for sans headings, and Source Serif 4 for editorial feature headings. Work within a 1280px content shell with 40px desktop gutters. Preserve component-specific rounded corners, spacious section rhythm, original gradient artwork, and responsive behavior. Write for general automation unless the brief names a specific industry. Use the documented reduced-motion and keyboard behavior.

**Example component briefs:**

1. **Workspace row:** White 48px-rounded card inside the cool-gray workspace surface. Above 1100px use fully expanded text/art columns at 3:2, 40px copy padding, a 36px/1.2 Manrope title, and 16px/1.5 Geist copy. Follow existing compact rules and keep all mobile content readable.
2. **Feature section:** Use a 48px Source Serif 4 heading, 20px Manrope selectable row titles, muted 16px Geist descriptions, navy dividers, and a 771:830 illustration. Preserve the section's existing desktop order and mobile artwork presentation.
3. **Hero signup:** Reuse the shared provider button: #012232 fill, white 15px Host Grotesk text, 999px radius, 48px minimum height, 12px 22px padding, existing logo and hover effect. Keep both hero provider buttons visually consistent.
4. **Integration section:** Place contained provider logos in cool-gray 112px tiles with 24px radii and the existing connectors. At 800px use 64px tiles, 16px radii, wrapping, and no connectors. Do not imply endorsement or availability beyond the actual content.
5. **Footer:** Use a large navy panel with 64px desktop corners and a white outer inset. Use the inverse Innflow logo, white body text, muted light links, and the existing contact/legal grouping. Apply the 1100px and 600px layout changes.

## Calendly alignment and reference hierarchy

The supplied Calendly folder is a historical extraction, with `tokens.json` metadata recording 2026-07-03. It is not an authoritative specification of today's Innflow homepage or a verified current Calendly website. Its four files also contain internal inconsistencies: the guide prescribes 8px buttons but one example prompt asks for a 9999px pill; the guide's social-button recipe and primary-action descriptions differ; it discourages gradients while referencing gradient-like decoration elsewhere. Innflow's guide resolves those choices using its current implementation.

| Area | Calendly folder | Current Innflow |
| --- | --- | --- |
| Primary ink | `#0b3558` | `#071a31` |
| Canvas | Cool `#f8f9fb` | White `#ffffff` |
| Typography | Gilroy, bold display emphasis | Four main families with role-specific styling |
| Main action | Blue primary / navy secondary | Navy signup pills and distinct lower navy CTAs |
| Corners | Mostly 8px buttons, 16–24px cards | 999px signup, 20px lower CTA, 32–64px large surfaces |
| Imagery | Guide says no photography and no background gradients | Gradient scenes, product UI, and portraits |
| Hero | Guide describes a two-column split | Centered intro above an immersive tabbed showcase |
| Footer | Light canvas | Large dark navy panel |
| Layout | 1200px shell and generic gaps | 1280px lower content shell plus component-specific widths |
| Motion | Limited behavioral guidance | Scroll chapters, unpinned compact mode, selected artwork, reduced-motion behavior |

Use current Innflow source first, this generated kit second, and historical Calendly material only as a reference. Brand comparisons are not implementation rules; no external brand needs to be imitated to complete an Innflow component. The original Calendly files remain intact at `/Users/ak/Downloads/Calendly_variables/`.

## Quick start

### CSS variables

Import `variables.css` once from the consumer application's global stylesheet or layout. Applying the package does not automatically refactor existing components. For this Next.js app, place `data-innflow-tokens` on an element inside `ShowcaseTheme` so its scoped `next/font` aliases resolve correctly.

```css
@import "./variables.css";

.card {
  color: var(--innflow-color-ink);
  background: var(--innflow-surface-card);
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

### Tailwind v4

```css
@import "tailwindcss";
@import "./variables.css";
@import "./theme.css";
```

Example utilities: `font-innflow-heading text-innflow-section bg-innflow-canvas`, `bg-innflow-surface-card rounded-innflow-workspace-card p-innflow-40`, and `shadow-innflow-signup`. Font-family utilities and text-size utilities are separate. Responsive rules remain explicit. Elliptical artwork radius and the hero's drop-shadow filter are intentionally omitted from generic Tailwind radius/box-shadow utilities; apply their variables with the correct CSS properties.

### Regenerate

```sh
node generate.mjs
```

Edit `tokens.json`, regenerate both CSS files, update the guide when component rules change, and validate the resulting utilities. Adoption into the running app should replace matching hard-coded values while retaining component-specific overrides, then verify desktop, mobile, and reduced-motion appearance. This package update alone does not alter or deploy the homepage.

## Source map

All paths below are relative to the repository root, `/Users/ak/innflow-web`.

| Concern | Source |
| --- | --- |
| Homepage composition | `src/app/page.tsx`, `src/components/showcase-homepage.tsx` |
| Fonts and inherited base styles | `src/app/layout.tsx`, `src/app/globals.css`, `src/components/showcase-theme.tsx`, `src/app/preview/scroll-showcase/baseline-shell.module.css` |
| Hero | `src/app/preview/scroll-showcase/scroll-showcase.tsx`, `showcase.module.css`, `scroll-showcase-motion.ts` in that same directory |
| Signup controls | `src/components/google-cta.module.css`, `src/components/google-cta-content.tsx` |
| Navigation | `src/components/site-header.tsx`, `src/components/site-header-preview.module.css`, `src/components/site-shell.module.css` |
| Workspace | `src/app/preview/scroll-showcase/workspace-overview.tsx` and `.module.css` |
| Feature sections | `src/app/preview/scroll-showcase/baseline-features.tsx` and `.module.css`, `homepage-storyboards.json` |
| Stories, infrastructure, closing | `src/app/preview/scroll-showcase/baseline-lower-sections.tsx` and `.module.css` |
| Footer | `src/app/preview/scroll-showcase/template-footer.tsx` and `.module.css` |
| Artwork | `public/preview/scroll-showcase/`, `public/preview/homepage/`, plus the paths in `homepage-storyboards.json` |

Historical README descriptions can predate current behavior. Verify actual component imports and later CSS overrides before extending a design. Values in this package were checked against source; no new production screenshot or comprehensive accessibility audit is claimed.
