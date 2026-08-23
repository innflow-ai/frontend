# Sanity Blog Pipeline Migration — Spec

Status: draft
Owner: TBD
Scope: migrate the blog publishing workflow (currently Notion queue → Framer CMS → innflow.ai → social distribution) to a Sanity-native pipeline. Goal is that **publishing a post never requires a redeploy** — Sanity webhooks already trigger on-demand ISR revalidation.

## 1. Why

- Sanity publishes are content changes, not code changes: publish in Studio → signed webhook → `revalidatePath("/blog")` + `/blog/[slug]`. No Vercel build, no Framer publish step.
- Real-time content: Studio supports live collaborative editing and the Live Content API for real-time streaming if we ever want it.
- The frontend and content model already exist (see §2) — this spec covers the workflow and governance gaps, not a rebuild.

## 2. Current state (verified)

Already in place:

- `sanity/schemaTypes/postType.ts` — `post` schema: title, slug, category (13 fixed values), excerpt, metaDescription, targetKeyword, audience, readTime, coverImage (hotspot + required alt), publishedAt, tags, featured, body (Portable Text; normal/h2/h3/blockquote, lists, strong/em/code, link, inline image).
- `src/lib/sanity.ts` — `next-sanity` client (project `hnjg8vum`, dataset `production`), GROQ helpers (`getBlogPosts`, `getBlogSlugs`, `getBlogPost`), image URL builder.
- `src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx` — ISR (`revalidate = 60`), static params, full OG/Twitter/JSON-LD metadata, Portable Text renderer.
- `src/app/api/revalidate/sanity/route.ts` — webhook (`SANITY_REVALIDATE_SECRET`) revalidating blog + product pages on `post` publish. Tested.
- `scripts/migrate-framer-to-sanity.mjs` — migrates 112 Framer "Blog 2 CMS" items → Sanity with deterministic IDs (`post-<slug>` / `drafts.post-<slug>`), HTML→Portable Text, image re-upload with dedupe.
- `next.config.ts` — legacy URL redirects (`/blog-2-cms/*` → `/blog/*` etc.).

Not in place (the gaps this spec closes):

1. No Notion→Sanity source integration (the current pipeline starts in Notion; no Notion code exists in this repo).
2. No draft/preview mode in the Next app — unpublished drafts can't be previewed on the real frontend.
3. No social-distribution step wired to Sanity publishes (currently manual/skill-driven off Framer URLs).
4. Cutover governance: 351 legacy `/blog*` routes are still `hold-legacy` in `docs/legacy-route-inventory.csv` pending owner + traffic/backlink review.
5. `next.config.ts` still allows `framerusercontent.com` images (needed until all cover/body images are Sanity-hosted).

## 3. Target workflow

```
Draft (Sanity Studio or Notion intake → script) → Review in Studio
→ Preview on real frontend (draft mode) → Publish
→ Webhook: ISR revalidate (/blog, /blog/[slug]) — no redeploy
→ Social distribution (triggered from publish, Sanity URL)
```

- **Authoring:** directly in Sanity Studio (hosted, `autoUpdates: true`). Notion is dropped as the editorial queue, OR kept only as an upstream intake with a one-way sync script (see §5, option B). Decision needed.
- **Review:** Studio's built-in draft/published document states; `featured`, `publishedAt`, SEO fields enforced by existing validations.
- **Preview:** Next.js Draft Mode via `next-sanity`, so editors see unpublished posts rendered by the real `/blog/[slug]` page.
- **Publish:** Studio publish button → existing webhook → live within seconds.
- **Social:** after publish, distribution automation (existing social skills) uses the canonical `https://innflow.ai/blog/<slug>` URL.

## 4. Workstreams

### W1 — Content migration (mostly done, verify)

- [ ] Run `scripts/migrate-framer-to-sanity.mjs` (re-runnable, deterministic IDs) against production dataset; confirm all 112 Framer items present, categories mapped, images Sanity-hosted.
- [ ] Spot-check 10 posts: Portable Text rendering, cover images, metaDescription, publishedAt.
- [ ] Confirm no post body still references `framerusercontent.com` images; then remove that host from `next.config.ts` `images.remotePatterns`.

### W2 — Draft preview mode (new code)

- [ ] Add Next.js Draft Mode: `/api/draft/enable` + `/api/draft/disable` routes using `next-sanity` (`token`, `perspective: "drafts"` when enabled).
- [ ] Swap the static client in `src/lib/sanity.ts` for a `draftMode()`-aware client (fetch with `no-store` in draft, CDN/cache otherwise).
- [ ] Studio Presentation tool or "Open preview" URL pointing at the draft enable route.

### W3 — Editorial workflow in Studio

- [ ] Add optional `author` field to `postType` (reference to a new `author` schema: name, role, avatar, social handles) — needed for bylines currently set in Framer CMS.
- [ ] Optional: Studio document badges/actions for "Ready to publish" review state (or use Sanity's built-in workflow plugin).
- [ ] Set `publishedAt` discipline: default now; editors set future dates for scheduled posts. (Scheduled publishing is native in Sanity.)

### W4 — Notion handoff (decision)

- Option A (recommended): retire Notion as the blog queue; authors draft directly in Studio. The skills `blog-morning-drafts` / `blog-go-live` / `blog-publish-e2e` become obsolete for blog and are archived.
- Option B: keep Notion as ideation intake; write `scripts/sync-notion-to-sanity.mjs` (Notion API → `drafts.post-*`, markdown/HTML → Portable Text via `@portabletext/block-tools`, same pattern as the Framer script). Requires a `NOTION_API_TOKEN` + database ID — neither exists in the repo today.

### W5 — Social distribution off Sanity

- [ ] Point the existing social-distribution skills (`blog-publishing-pipeline`, `blog-first-comment`, etc.) at Sanity as source of truth: published posts query via GROQ (`publishedAt desc`), canonical URL `https://innflow.ai/blog/<slug>`.
- [ ] Optional: Sanity webhook (separate endpoint) or scheduled job that, on first publish of a post, enqueues the cover/story/first-comment steps.
- [ ] Update those skill docs to remove Framer CMS steps.

### W6 — Cutover & legacy routes

- [ ] Resolve the 351 `hold-legacy` `/blog*` rows: traffic + backlink review per `docs/ROUTE_INVENTORY.md`, then either map to migrated Sanity slugs (add redirects in `next.config.ts`) or leave on legacy surface.
- [ ] After traffic cutover, decommission the Framer blog collection per `docs/MIGRATION_PLAN.md` rollback policy.
- [ ] Update `docs/CONTENT_MATRIX.md` and `docs/ANALYTICS_ATTRIBUTION.md` — neither currently mentions the blog.

## 5. Acceptance criteria

- Publishing a post in Studio is live on innflow.ai within ~60s with zero deploys (verified by webhook logs).
- An unpublished draft can be previewed at its real URL via draft mode.
- All 112 migrated posts render correctly; zero `framerusercontent.com` references in production content.
- Social distribution runs from the Sanity-published URL without any Framer step.
- Legacy route dispositions updated from `hold-legacy` for all migrated slugs.

## 6. Risks / open questions

- **Notion dependency:** several blog skills assume Notion as the queue. Confirm owners are okay dropping it (Option A) before writing the sync script.
- **SEO cutover:** slugs from Framer are preserved by deterministic IDs, but verify each legacy slug resolves; missing ones need explicit redirects.
- **Studio access:** hosted Studio needs to be deployed/accessible to editors (`sanity deploy`).
- **Webhook secret rotation:** `SANITY_REVALIDATE_SECRET` must be set in both Sanity webhook config and Vercel env.

## 7. Out of scope

- Product pages (already have their own import path), skills data, Framer code components.
- Any redesign of `/blog` templates.
