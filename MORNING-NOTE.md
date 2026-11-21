# Morning note — Innflow Web blog redesign

Status: article UI is in the working tree on **`main`, uncommitted**. Dev server is in tmux.

```bash
tmux attach -t innflow-web
```

Preview: http://localhost:3000/blog/pm-1031-exchange-timeline

Windows: `work` · `dev` (Next :3000) · `test` · `git`

## Shipped in code
Black article, Figtree body, search + crumbs, cover, category/date/read, byline, listen player, share, industries/tags/content types, hide-nav, in-article CTAs, featured paragraph, lists, author bio, continue-learning, related 3-up.

Accent is **Hyper Blue `#00AEFF`** with dark labels (innflow kit), not Microsoft purple.

## Needs you

1. **Commit / branch** — changes are still on `main`. I did not commit.
2. **Purple vs Hyper Blue** — todos said purple; brand kit forbids a second palette. If you want Microsoft purple, say so.
3. **Glass title-card covers** — live covers already have the glass card baked into the image. I removed a CSS overlay that was double-stamping the title. Posts *without* that cover treatment need `/blog-cover-image-generation`. I did not batch-regenerate Sanity images.
4. **Listen / transcription** — player uses on-device speech for every post. Hosted `audioUrl` is in the Sanity schema. A real TTS/transcription pipeline is not built.
5. **Author records** — several posts have no Sanity author linked. Bio falls back to “Ari Khan” with a letter avatar, no role or photo.
6. **Auto CTAs** — renderer injects “Book an operations demo” every 3 paragraphs (max 3). Turn this off if you only want CMS-placed CTAs.
7. **Theme switcher** — header toggle exists; article pages stay black regardless.

Screenshots from this pass: `output/playwright/blog-article-desktop-top.png` and `blog-article-mobile-top.png`.
