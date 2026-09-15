# Innflow blog design pattern

Approved in the September 14, 2026 styling session. Use this as the default for
Innflow's blog directory and article UI. Adapt content and responsive details to
the task; the user's newer instructions take precedence.

## Visual direction

- Warm cream canvas (`#fffbf4`), deep navy text (`#012232`), muted supporting text
  (`#586567`), restrained dividers (`#d8ddd8`). Follow the current site typography.
- Image-led editorial layouts. Show the supplied cover artwork clearly, retaining
  its composition. Put page titles and descriptions below the cover, never behind
  a full-image tint, blur, or text overlay. Text baked into artwork stays intact.
- Keep headings modest and readable, with generous spacing. Avoid heavy boxed
  cards; use image corners and whitespace to separate directory stories.
- Use the shared scrollbar rules in `src/app/globals.css` for both axes and nested
  scrollers: rounded 5px thumbs in supporting browsers, theme-aware colors, and a
  thin fallback. Avoid local overrides or hidden-scrollbar rules.

## Directory: `/blog`

Implementation: `src/app/blog/page.tsx` and `src/app/blog/page.module.css`.

1. Breadcrumbs, a small editorial eyebrow, a concise two-line headline, and a
   short introduction. Desktop splits headline and supporting copy into columns;
   mobile stacks them.
2. Prominent, softly elevated search surface. Visible search action and industry
   selector, with accessible labels and keyboard focus indicators.
3. Horizontally scrollable topic pills: navy/white active state, muted inactive
   state, and an accessible current-selection indication.
4. Section heading and accurate result count.
5. Without filters, a large featured story with its title, excerpt, metadata, and
   read link below the image. Its author card sits over the image at bottom right.
   Two secondary stories sit beside it on desktop; everything stacks on mobile.
6. Remaining stories use an open three-column grid, two columns at tablet widths,
   one on phones. Each has a clear 16:9 cover, category, smaller title, short
   excerpt, and date/read time. No repeated posts between featured and grid areas.
7. Search/filter results use the grid directly. Preserve query and industry when
   changing topics, and preserve selected category when submitting search. Provide
   a clear-filters action and an honest no-results state.

Reference values: shell max-width 1136px; desktop heading about 50px, mobile 36px;
featured title 32px/27px; grid title 22px. These are defaults, not limits that
justify truncation or layout breakage.

## Article: `/blog/[slug]`

Implementation: `src/app/blog/[slug]/page.tsx`,
`src/components/blog/article.module.css`, and the shared blog components.

- Keep the 16:9 hero artwork clear and below the fixed navigation.
- Keep the author's profile card at the image's bottom-right corner.
- Place date/read time and a smaller title below the image (40px desktop, 28px
  mobile in the approved implementation).
- Place **Listen to this post directly below the title**, then industry, tags,
  and content-type controls, before the article columns/body. Render one player.
- Use white text on dark taxonomy pills. Keep the extra content types collapsible.
- Retain article tools, body, author bio, related stories, and their existing
  functionality. The written article supplies the narration transcript. Moving
  the player improves discoverability; it is not evidence of full ADA compliance.

## Author card: final approved glass treatment

Implementation: `src/components/blog/author-card.tsx` and
`src/components/blog/author-card.module.css`.

- Show CMS full name, portrait, and role. Do not replace these with hardcoded
  display strings or omit available fields.
- Keep the card borderless, including on hover. Remove bright inset rim shadows;
  retain the keyboard-only focus indicator.
- Almost see-through warm glass: gradient `rgb(255 251 244 / 40%)` to
  `rgb(255 251 244 / 28%)`; `backdrop-filter: blur(6px) saturate(115%)` and its
  WebKit equivalent; 12px corners; soft outer shadow. A stronger opaque fallback
  is used when backdrop filtering is unsupported.
- Do not revert to the earlier 60–78% tint, 27px blur, or solid cream card. Those
  were intermediate versions superseded by the user's transparency request.
- Keep the portrait/text opaque; adjust the background, not whole-card opacity.
  Check legibility over the actual artwork on desktop and mobile.
- The portrait currently requests a 300×300 Sanity crop at quality 100 and renders
  at 50×50 with Next Image quality 100. Preserve source identity and CMS hotspot.
  Prefer better delivery of the original photo over generating a new likeness.

CMS mapping: `src/lib/sanity.ts` resolves a post's selected author first, then
`author.ari-khan` when no author resolves. That default is Arianna Khan; her role
was set to `Account Executive @ Innflow.ai`. Read the current CMS record when
changing identity details; names and positions may change. Do not overwrite a
post's explicitly selected author or assume every employee works in the same role.

## Verification

- Read the relevant installed Next.js guide before code changes, as required by
  AGENTS.md. Inspect current source rather than blindly replacing it from this doc.
- Check desktop and phone layouts, image clarity, author-card readability, focus
  visibility, and absence of horizontal page overflow.
- For directory behavior changes, exercise search, combined filters, clear filters,
  empty results, and story navigation. For player changes, use its existing tests.
- Run scoped lint and relevant checks; report local, committed, and published
  state accurately. Applying this pattern does not itself authorize publishing.
