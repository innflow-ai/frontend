# Homepage mixed italic heading specification

Status: Implemented locally. Validation results are recorded below.
Date: 2026-11-15
Scope: Innflow Web homepage (`/`), its matching scroll-showcase preview, and the remaining Web marketing page and section headings, per the subsequent user request. The separate Innflow product application remains outside this checkout and awaits scope clarification.

## Desired result

Extend the homepage hero's two-font treatment to the section headlines throughout the page. Each heading combines a strong opening phrase in **Archivo Bold Italic** with a contrasting continuation in **Source Serif 4 Italic**.

Example:

- Archivo Bold Italic: “Turn conversations”
- Source Serif 4 Italic: “into completed work.”

Apply the same pairing to “Get more done with AI agents,” “Move work forward with less effort,” “Spend less time managing requests,” “Move everyday work forward,” and “Let your experts build the agents,” along with the remaining homepage section titles.

This is a typography change. Preserve existing copy, punctuation, section order, alignment, colors, artwork, links, interactions, and scroll behavior. Existing section sizes remain distinct from the larger hero.

The user’s direction on 2026-11-15 supersedes the homepage’s earlier single-family heading rule. It explicitly requests Archivo **700**, whereas the current hero uses Archivo **600**. Update the hero to 700 as part of this rollout so the reference and all section headings use the same pairing.

## Typography rules

| Role | Family | Weight | Style | Existing font variable |
| --- | --- | --- | --- | --- |
| Opening phrase | Archivo | 700 | Italic | `--font-archivo-italic` |
| Continuation | Source Serif 4 | 400 | Italic | `--font-source-serif-4` |

Both fonts and these weights/styles are loaded by `src/app/layout.tsx`. Source Serif 4 and the existing Host Grotesk UI face are now bundled locally to resolve the installed Next.js Google font loader failure; see `src/app/fonts/README.md`. The font variables remain unchanged. Do not synthesize italics with transforms or substitute Instrument Serif for Source Serif 4.

- Give both runs the same inherited font size, tracking, line height, and color within a heading.
- Use `font-synthesis: none` for the mixed heading runs.
- Keep the opening phrase bold and the serif phrase regular. Do not inherit bold weight into the serif run.
- Keep existing section font-size ranges and maximum widths initially. Resolve any new wrapping with the local heading width or line break, rather than changing every section to the hero’s 84px size.
- Preserve section spacing unless the new text requires a small documented adjustment to avoid collisions.
- Retain the existing hero scale and compact line height initially. Check the heavier 700 face for collisions and clipping at every breakpoint.
- For section headings, retain each section’s current line height initially. Allow more line height where necessary for italic ascenders and descenders; do not copy the hero’s tight line height globally.

## Heading inventory and proposed phrase splits

These splits preserve the current source wording. They are the proposed editorial mapping for implementation.

| Section | Archivo Bold Italic | Source Serif 4 Italic | Source |
| --- | --- | --- | --- |
| Hero | Turn conversations | into completed work. | `scroll-showcase.tsx` |
| Workspace overview | Move everyday | work forward. | `workspace-overview.tsx` |
| Agent builder | Let your experts | build the agents | `homepage-agent-showcase.tsx` |
| AI agents | Get more done | with AI agents. | `baseline-features.tsx` |
| Workflows | Move work forward | with less effort. | `baseline-features.tsx` |
| Assistant | Spend less time | managing requests. | `baseline-features.tsx` |
| Insights | Know where | to focus next. | `baseline-features.tsx` |
| Collaboration | Meet your team | where they work | `collaboration/collaboration-section.tsx` |
| Connected infrastructure | Connect the tools | behind your work. | `baseline-lower-sections.tsx` |
| Closing feature section | From the first meeting | to the follow-up | `baseline-lower-sections.tsx` |
| Directory band | Featured | on | `launch-directory-marquee.tsx` |
| Final signup CTA | A clearer day starts | with a connected flow. | `site-cta.tsx` |
| Customer stories, when enabled | In their | own words. | `src/lib/testimonials.ts`, default CMS heading |
| Customer story layout preview | Real customers. | Real results. | `baseline-lower-sections.tsx`, layout-preview heading |

The directory heading retains its small existing scale and inline layout. Its semantic H2 does not make it a hero-sized headline.

The testimonial section is currently disabled by `SHOW_TESTIMONIAL = false`. Prepare its heading treatment without enabling the section or changing any customer content. Its real heading comes from CMS data and must preserve that published text; the two sample splits above apply only when the heading matches the existing default or layout-preview wording.

### Marketing titles inside the feature showcase

Apply the same pairing at the existing smaller showcase title size. These are marketing headlines around the demo, distinct from labels inside the simulated product UI.

| Archivo Bold Italic | Source Serif 4 Italic |
| --- | --- |
| Delegate tasks | to your AI agent |
| Keep work moving | across your tools |
| Get the help you need | in the moment |
| See what needs | your attention |

Do not apply this treatment to accordion controls, the Connect/Train/Assign/Deploy step labels, capability labels, testimonials themselves, form headings/status messages, navigation, footer link-group labels, or text inside product demos. Those serve as UI labels or supporting content rather than section headlines.

## Semantics and responsive behavior

“H1” describes the desired headline appearance in this request, not a change to document structure. Keep one H1 for the hero. Keep section headings as H2 and existing supporting headings at their correct levels.

Each mixed heading remains one semantic heading containing two spans. Preserve its existing ID and every `aria-labelledby` relationship. Assistive technology must encounter the complete sentence once, with a real word boundary between the two runs. Do not add separate heading elements, duplicate hidden text, or whole-heading `aria-label` overrides for font styling.

The font change and the line break are separate choices:

- Preserve the current deliberate phrase break for the hero, workspace, agent-builder and major section titles where it fits.
- Permit each phrase to wrap naturally on small screens. Never make a whole phrase unbreakable with `white-space: nowrap`.
- Allow inline presentation for compact headings such as the directory band and narrow showcase cards.
- Use balanced wrapping where supported, with normal wrapping as the fallback.
- Prevent clipped italic overhangs and descenders in headings inside rounded or overflow-clipped containers.
- Test at 320, 390, 768, 1024 and 1440px, and at 200% text zoom. No horizontal scrolling, overlapping copy, clipped letters or reduced access to controls.

## Implementation approach

### Reuse the shared heading system with an explicit variant

`SectionHeading` now defaults to `variant="mixed-italic"` across Web, following the expanded scope. An explicit `variant="default"` retains the legacy treatment.

In this variant:

- `title` is the Archivo opening phrase.
- `emphasis` is the Source Serif 4 continuation.
- Both runs are italic with explicit weights 700 and 400.
- `as`, `id`, alignment and color remain independent of the font pairing.
- Provide an explicit phrase-break option, such as `breakAt="always" | "desktop" | "never"`, without tying font choice to a mandatory `<br />`.

Expose a small shared heading-content helper for existing H1/H2 elements whose surrounding layout must remain intact. This lets direct headings use the same two styled spans without introducing the `SectionHeading` wrapper and its default spacing. Both paths must use the same CSS rules.

Suggested usage:

```tsx
<SectionHeading
  variant="mixed-italic"
  as="h2"
  id="baseline-infrastructure-heading"
  title="Connect the tools"
  emphasis="behind your work."
  align="center"
/>
```

The mixed variant places Archivo Bold Italic first and Source Serif 4 Italic second. The legacy variant preserves the former serif-first order.

### Replace the blanket homepage font override

`homepage-typography.module.css` currently forces most H1–H6 elements to a single `--font-homepage-heading` family. Narrow that rule so it does not override opted-in mixed headings or their spans. Preserve unrelated heading behavior.

Audit local `font` shorthand declarations, especially in `homepage-agent-showcase.module.css`, because shorthand can reset font family, weight and italic style. Let each run explicitly own its font family, weight and style while the surrounding heading controls layout and scale.

Migrate the hero’s existing `heroEmphasis` and `heroSerif` styling to the shared rules, or alias those classes to the same tokens. Avoid two divergent versions of the pairing.

### Use explicit structured phrase data

For the four entries in `baseline-features.tsx` and the showcase states, store the opening and continuation as explicit fields instead of parsing existing newline characters to determine font roles. Preserve the combined plain-text title where accessible labels or other consumers need it.

For CMS-driven testimonial headings, support an optional, validated split marker against the existing full heading string. It must identify an exact word boundary without changing the text. An unconfigured legacy CMS heading should remain readable and unchanged; mark that section as awaiting editorial split configuration rather than inventing or replacing customer-facing copy. Complete its mixed-style acceptance before enabling that section.

### Include the shared closing CTA on the homepage

`SiteCta` and its directory band render outside `ShowcaseHomepage` through `SiteCloseAndFooter`. Styling only the homepage `<main>` will miss them.

`SiteCta` and `LaunchDirectoryMarquee` now default to the mixed treatment on every Web route. `SiteCloseAndFooter` continues to omit the shared footer on `/help`.

## Files expected to change during implementation

| Area | Files |
| --- | --- |
| Shared heading variant/content helper | `src/components/section-heading.tsx`, `section-heading.module.css` |
| Homepage font override | `src/components/homepage-typography.module.css`, `showcase-homepage.tsx` if its font wiring needs adjustment |
| Hero and showcase titles | `src/app/preview/scroll-showcase/scroll-showcase.tsx`, `showcase.module.css` |
| Overview | `src/app/preview/scroll-showcase/workspace-overview.tsx`, local CSS if necessary |
| Agent builder | `src/components/homepage-agent-showcase.tsx`, local CSS if necessary |
| Four feature sections | `src/app/preview/scroll-showcase/baseline-features.tsx`, `homepage.module.css` if necessary |
| Customer stories, infrastructure and closing | `src/app/preview/scroll-showcase/baseline-lower-sections.tsx`, its local CSS if necessary |
| Collaboration | `src/components/collaboration/collaboration-section.tsx`, its local CSS if necessary |
| Shared homepage closing area | `src/components/site-close-and-footer.tsx`, `site-cta.tsx`, `launch-directory-marquee.tsx` and their styles as needed |
| CMS split support, if implemented now | Testimonial heading query/type and existing page-settings schema, after reading `sanity/TESTIMONIALS.md` |

## Acceptance criteria

- Every active homepage section headline in the inventory uses the two specified font families, styles and weights.
- The hero uses Archivo 700 italic, matching the new section standard.
- Each headline preserves its complete existing wording and punctuation.
- The semantic outline remains one H1 with correctly leveled H2/H3 headings and working section labels.
- The final signup CTA and directory band receive the style on the homepage, despite rendering outside its `<main>`.
- Other Web marketing routes use the same pairing, following the separately requested expansion.
- Mobile and text-zoom checks pass without clipping, overflow, awkward font fallback or inaccessible controls.
- Existing animation, sticky sections, tabs, accordions and sign-up interactions continue to work after heading reflow.
- Disabled testimonial content stays disabled; CMS headings keep their source text.
- Verify computed font families, weights and italic styles in the browser, not just CSS declarations.
- Run targeted heading/section tests, TypeScript checks and a production build. Test semantic text/order, linked titles, changing CMS content, and shared closing-area scoping; avoid snapshot tests that merely reproduce CSS values.

## Expanded Web rollout

After the homepage implementation, the user requested the remaining headings throughout the app. The Web portion is implemented in this checkout. The separate product-app repository is pending clarification.

- Direct page and section headings use `MixedHeadingText`; shared `SectionHeading` consumers inherit the mixed default.
- Coverage includes product and feature templates, industry pages, pricing, company and partner pages, resource directories, integrations landing/detail pages, help landing pages, blog listing/article titles, legal page titles, and shared marketing CTAs.
- Authored homepage splits stay explicit. Dynamic titles prefer an existing line break, then a phrase boundary near the midpoint, with a complete-word fallback. Single-word titles remain intact in Archivo Bold Italic.
- Dynamic text is never rewritten. Links, IDs, semantic levels, inline markup, icons, and authored line breaks remain in place. Font-boundary whitespace is a real text node, including for accessible names.
- Body prose, article-body subheadings, product/provider names in compact integration cards, author names, navigation/footer groups, interactive controls, form/dialog headings, and simulated product UI keep their existing reading/UI typography.
- CMS testimonial text and visibility are unchanged. The disabled homepage testimonial supports an explicit validated split; shared active testimonial section headings use the dynamic helper.

## Validation

- TypeScript check passed.
- Full suite: 97 test files passed, 528 tests passed, 7 skipped. Command: `NODE_OPTIONS=--no-experimental-webstorage npx vitest run --maxWorkers=4`. The flag prevents Node 26's experimental native storage from replacing jsdom storage in existing tests.
- Browser review at 390px confirmed all 14 active mixed headings inside the homepage main content use italic Archivo 700 and Source Serif 4 400, with no horizontal page overflow.
- Homepage and Rent collection mobile screenshots were reviewed for natural wrapping and preservation of artwork, controls, and spacing.
- Production build passed (`npm run build`), including static route generation.
- Production browser checks at 320, 768, 1024, and 1440px found no page or mixed-heading horizontal overflow on the homepage; 390px was also checked above.
- The homepage hero and overview section were visually checked at 200% browser zoom.
- Platform, Rent collection, Pricing, Integrations, Solutions, and Blog passed page/heading overflow checks at both 390 and 1440px. All mixed font runs on these six templates matched italic 700/400 in the 390px computed-style check.
- Biome passed on all 81 changed source/test/style files, with four existing showcase CSS warnings. `git diff --check` passed.
- Changes are local and uncommitted. Existing staged navigation/logo and sitemap changes were preserved. No deployment was performed.
