# Innflow brand foundations

Verified 2026-10-29 from [INNFLOW_BRAND_KIT, frame 328:5](https://www.figma.com/design/TI7hq816ZzDMvvTd3HjyIS/INNFLOW_BRAND_KIT?node-id=328-5), named **Innflow / Complete design kit / Offloop-aligned**. This is the current shared visual authority. It supersedes the October 11 export, October 15 foundations, and former Paper 4J-0 sky-glass defaults.

## Principles and precedence

- Use neutral surfaces, clear hierarchy, compact controls, restrained borders, and purposeful color. Primary actions are neutral, not universally blue.
- Use actual specimen properties and current variable bindings. Some inherited layer names and brand-signature annotations still mention older fonts. The explicit Typography section and current 406-series variables define the new type roles.
- Preserve provider colors, agent artwork, tier materials, file icons, cursors, and the decorative grid. Do not recolor identity artwork to make it neutral or add glass around every item.
- Current user instructions and an explicitly requested reference match override defaults within their scope. A reference-specific treatment is not a new global rule.
- Do not add decorative numbered section labels. Preserve meaningful data, dates, prices, pagination, and authored sequence numbers.
- Preserve existing behavior, responsive structure, and content when applying styles. A guideline sync does not migrate or deploy existing products.

## Semantic palette

Source: workspace themes `329:49`, dialogs `409:133`, current color variables `VariableID:406:6` through `406:46`. Alpha is part of the token; do not silently convert translucent paints to opaque colors.

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#F8F8F8F5` | `#0A0A0B` |
| Surface | `#FFFFFF` | `#232528` |
| Dialog | `#FFFFFF` | `#252525` |
| Text | `#1A1A1A` | `#E2E2E2` |
| Secondary text | `#4D4D4D` | `#BEBEBF` |
| Muted text | `#818387` | `#7D8085` |
| Action | `#202020` | `#FCFCFC` |
| On action | `#FFFFFF` | `#1B1B1B` |
| Action hover / secondary | `#4D4D4D` | `#E2E2E2` |
| Control | `#F2F4F859` | cool white at 10% |
| Border | `#0E213E1A` | cool white at 8% |

Dark cool white is Figma RGB `(0.887748003, 0.939703345, 1)`. Preserve its alpha exactly: glass 4.5%, border 8%, control 10%. Portable CSS retains these floating-point channels. Light subtle surface is `#F9F9F9`, sidebar `#F7F7F7B3`, selection `#FFFFFFCC`; dark message is `#2B2E3299`.

Functional accents: cyan `#01AEFF`, hover `#0C7CBB`; status fills success `#9AF2BE`, warning `#FFE6A3`, danger `#FFB1B5`. Agent badge `#EAF4FE` / label `#2673B8`; activity mint `#78AEA4` and blue `#0E568E`. Keep color tied to meaning and pair statuses with readable labels. Use secondary text for essential copy; muted text is not a substitute for accessible body text. Check contrast over the final composited background.

The six ambient colors are retained in the token asset for reference-specific artwork. Their presence does not prescribe a gradient direction, background wash, or universal glass effect. **Previous blue foundations** rows and the older 52/254-series variables are historical, not the current palette.

## Typography

Source: `329:253`; dialog specimens `409:133`; font variables `406:47` UI, `406:48` display, `406:49` mono.

| Role | Family / weight | Size / line height | Tracking |
| --- | --- | --- | --- |
| Editorial display | Instrument Serif 400 | 48 / 50.4px | -0.02em |
| UI section specimen | Inter 500 | 24 / 30px | -0.48px |
| Dialog title | Inter 600 | 24 / 32px | preserve specimen |
| Body | Inter 400 | 14 / 21px | 0 |
| Dialog body | Inter 400 | 14 / 20px | preserve specimen |
| Control | Inter 500 | 14 / 20px | 0 in kit specimen |
| Caption | Inter 400 | 12 / 16px | 0 |
| Code | JetBrains Mono 400 | 13 / 19.5px | 0 |
| Metadata | JetBrains Mono 500 | 11 / 15.4px | 0 |

**Homepage exception, requested 2026-10-29:** use Instrument Sans for homepage headings, including the former Manrope and Source Serif 4 heading roles and “Let your experts build the agents.” Instrument Sans and Instrument Serif are different families. This exception does not replace the app's Inter controls or serif display role. Existing homepage body fonts are implementation history, not a new shared default. Check nested button labels and web-component shadow roots when implementing heading changes.

Cal Sans / Host Grotesk, Questrial / Figtree, and Space Mono / Geist Mono are no longer default shared UI roles. Preserve approved identity artwork, tier labels, and explicit reproduction exceptions. Load actual available font styles and licensed font files through the destination's loader. The new asset package does not claim to bundle font binaries. Never re-typeset the outlined logo.

## Geometry and component patterns

- Tight gaps: 4 / 6 / 8px; padding: 12 / 16px; groups: 20 / 24px. Larger spacing specimens retain 32 / 48 / 64px; choose by composition, not by stretching compact UI.
- Corner roles: cell 4px, control 12px, action 16px, panel 30px, dialog 40px. Preserve native corner smoothing. Pill/circle geometry belongs to the appropriate avatar or explicitly pill-shaped component, not every control.
- Controls are 36px high; dialog actions 40px; source hairlines 0.5px. Scale whole artwork uniformly for video. Provide appropriate interaction targets for the destination.
- Dialog recipe: 40px outer corners, 12px shell padding, Inter 24/32 semibold title, 14/20 secondary body text, 16px action gap, 40px actions with 16px corners. Secondary action uses control fill; primary uses action/on-action colors. Keep the actual action clear in its label.
- Floating UI may use restrained layered elevation. Ordinary actions remain flat. The selected dialog specimens currently have no effects; do not invent a universal shadow or blur value from the prose elevation rule.
- On marketing pages preserve full-width section backgrounds, readable copy widths, responsive stacking, and the approved scroll interactions. App dimensions do not dictate a universal website container width.
- Navigation, controls, tables, and composer text use Inter. Editorial display uses Instrument Serif sparingly; the homepage exception uses Instrument Sans. Preserve authentic third-party UI conventions inside Slack, Teams, email, and iMessage demonstrations.

## Motion and accessibility

Source `329:526`: ordinary UI feedback 150ms, `cubic-bezier(0.4, 0, 0.2, 1)`. This is not a storyboard duration or a mandate for every transition. Use task-specific choreography, keyboard/focus states, readable settled states, and reduced-motion alternatives. Do not lower essential content opacity just to distinguish inactive states.

## Assets and sources

Canonical bold logos, retaining their original viewBoxes and proportions:

- Light backgrounds: `/Users/ak/Library/CloudStorage/Dropbox/innflow_logo_set_B.svg`
- Dark backgrounds: `/Users/ak/Library/CloudStorage/Dropbox/innflow_white_logo_set_bold.svg`

The current portable handoff is `/Users/ak/Library/CloudStorage/Dropbox/Innflow Design System - 2026-10-29`. It includes this guide, JSON/CSS tokens, verified Figma source data, and exact copies of the two canonical wordmarks. Existing icon and agent artwork remains in the dated October 11 asset library; re-inspect the selected live asset before reuse. Do not replace native artwork with font glyphs or approximate symbols.

| Figma section | Node |
| --- | --- |
| Brand signature | `329:34` |
| Workspace themes | `329:49` |
| Typography / spacing | `329:253` |
| Dialogs | `409:133` |
| Workflow identity | `329:322` |
| Motion / elevation | `329:526` |
| Mage stroke / filled | `329:533` / `329:579` |
| Horizon agent collection | `352:96` |
| Tier badges | `329:620` |
| Tracing / cursor | `329:801` / `329:957` |
| Files / collaboration cursors / grid | `329:980` / `329:1183` / `329:1393` |

Reinspect the relevant live section for future changes. Keep source values separate from implementation decisions and historical component recipes.
