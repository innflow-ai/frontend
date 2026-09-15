import { ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { BlogAuthorCard } from "@/components/blog/author-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MarketingPage } from "@/components/page-primitives";
import { BLOG_CATEGORIES, matchesBlogQuery } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  type BlogPostSummary,
  coverImageUrl,
  formatPostDate,
  getBlogPosts,
  humanizeCategory,
} from "@/lib/sanity";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: "Property Operations & Automation Blog | Innflow",
  description:
    "Explore practical guides on property operations, workflow automation, AI assistants, integrations, and the systems modern teams use every day.",
  path: "/blog",
});

function PostMeta({ post }: { post: BlogPostSummary }) {
  const date = formatPostDate(post.publishedAt);
  return (
    <p className={styles.meta}>
      {date ? <time dateTime={post.publishedAt}>{date}</time> : null}
      {date && post.readTime ? (
        <span aria-hidden="true" className={styles.metaDot}>
          ·
        </span>
      ) : null}
      {post.readTime ? <span>{post.readTime} min read</span> : null}
    </p>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  const coverUrl = post.coverImage
    ? coverImageUrl(post.coverImage, 800, 450)
    : null;

  return (
    <a className={styles.card} href={`/blog/${post.slug}`}>
      {coverUrl ? (
        <div className={styles.cardMedia}>
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt ?? post.title}
            width={800}
            height={450}
            sizes="(max-width: 720px) 92vw, (max-width: 1024px) 44vw, 400px"
          />
        </div>
      ) : null}
      <div className={styles.cardBody}>
        <span className={styles.chip}>{humanizeCategory(post.category)}</span>
        <h3>{post.title}</h3>
        {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
        <PostMeta post={post} />
      </div>
    </a>
  );
}

function FeaturedPost({ post }: { post: BlogPostSummary }) {
  const coverUrl = post.coverImage
    ? coverImageUrl(post.coverImage, 1200, 675)
    : null;

  return (
    <article className={styles.featured}>
      <div className={styles.featuredMedia}>
        <a href={`/blog/${post.slug}`} aria-label={post.title}>
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={post.coverImage?.alt ?? post.title}
              width={1200}
              height={675}
              sizes="(max-width: 720px) 92vw, 740px"
              priority
            />
          ) : null}
        </a>
        {post.author ? (
          <BlogAuthorCard
            author={post.author}
            href={`/blog/${post.slug}#author-bio`}
            className={styles.featuredAuthor}
          />
        ) : null}
      </div>
      <div className={styles.featuredCopy}>
        <span className={styles.chip}>{humanizeCategory(post.category)}</span>
        <h2>
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </h2>
        {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
        <PostMeta post={post} />
        <a className={styles.readStory} href={`/blog/${post.slug}`}>
          Read the story <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; industry?: string }>;
}) {
  const { q = "", category = "", industry = "" } = await searchParams;
  const posts = await getBlogPosts();
  const filtered = posts.filter((post) => {
    const matchesQuery = matchesBlogQuery(
      [post.title, post.excerpt, post.category, ...(post.tags ?? [])],
      q,
    );
    const matchesCategory = category ? post.category === category : true;
    const matchesIndustry = industry
      ? (post.industries ?? ["General"]).includes(industry)
      : true;
    return matchesQuery && matchesCategory && matchesIndustry;
  });
  const featured =
    q || category || industry
      ? undefined
      : (filtered.find((post) => post.featured) ?? filtered[0]);
  const rest = featured
    ? filtered.filter((post) => post.slug !== featured.slug)
    : filtered;

  const hasFilters = Boolean(q || category || industry);
  const latest = featured ? rest.slice(0, 2) : [];
  const remaining = featured ? rest.slice(2) : rest;
  const industries = [
    ...new Set(
      posts.flatMap((post) =>
        post.industries?.length ? post.industries : ["General"],
      ),
    ),
  ].sort();
  const categoryHref = (value: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (industry) params.set("industry", industry);
    if (value) params.set("category", value);
    return `/blog${params.size ? `?${params}` : ""}`;
  };

  return (
    <MarketingPage>
      <div className={styles.directory}>
        <section className={styles.hero}>
          <div className={styles.shell}>
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            />
            <div className={styles.intro}>
              <div>
                <p className={styles.eyebrow}>The Innflow journal</p>
                <h1>
                  Good ideas.
                  <br />
                  Better property operations.
                </h1>
              </div>
              <p className={styles.heroSubline}>
                Practical guides, fresh perspectives, and smarter ways to run
                your properties. Find your next move here.
              </p>
            </div>
            <search className={styles.searchSlot}>
              <form action="/blog" method="get" className={styles.searchForm}>
                <div className={styles.searchInput}>
                  <MagnifyingGlass size={22} aria-hidden="true" />
                  <label className={styles.srOnly} htmlFor="directory-search">
                    Search the Innflow blog
                  </label>
                  <input
                    id="directory-search"
                    name="q"
                    type="search"
                    defaultValue={q}
                    placeholder="What would you like to explore?"
                  />
                </div>
                {category ? (
                  <input type="hidden" name="category" value={category} />
                ) : null}
                <label className={styles.srOnly} htmlFor="directory-industry">
                  Industry
                </label>
                <select
                  id="directory-industry"
                  name="industry"
                  defaultValue={industry}
                >
                  <option value="">All industries</option>
                  {industries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <button type="submit">
                  Search <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </form>
            </search>
            <nav aria-label="Blog topics" className={styles.topicNav}>
              <ul className={styles.filters}>
                <li>
                  <a
                    className={!category ? styles.filterActive : styles.filter}
                    aria-current={!category ? "page" : undefined}
                    href={categoryHref("")}
                  >
                    All stories
                  </a>
                </li>
                {BLOG_CATEGORIES.map((item) => (
                  <li key={item.value}>
                    <a
                      className={
                        category === item.value
                          ? styles.filterActive
                          : styles.filter
                      }
                      aria-current={
                        category === item.value ? "page" : undefined
                      }
                      href={categoryHref(item.value)}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
        <section className={styles.listing} aria-label="Blog articles">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <h2>{hasFilters ? "Your reading list" : "Fresh perspectives"}</h2>
              <span>
                {filtered.length} {filtered.length === 1 ? "story" : "stories"}
                {q ? ` matching “${q}”` : " to explore"}
              </span>
              {hasFilters ? (
                <a href="/blog" className={styles.clearFilters}>
                  Clear filters
                </a>
              ) : null}
            </div>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <MagnifyingGlass size={32} aria-hidden="true" />
                <h3>
                  {hasFilters
                    ? "No stories found just yet."
                    : "New perspectives are on the way."}
                </h3>
                <p>
                  {hasFilters
                    ? "Try another search or clear your filters to explore all stories."
                    : "Check back soon for practical ideas from the Innflow team."}
                </p>
                {hasFilters ? (
                  <a href="/blog" className={styles.readStory}>
                    Explore all stories{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : (
              <>
                {featured ? (
                  <div className={styles.spotlight}>
                    <FeaturedPost post={featured} />
                    {latest.length ? (
                      <div className={styles.latest}>
                        <p className={styles.eyebrow}>Also worth a read</p>
                        {latest.map((post) => (
                          <PostCard key={post.slug} post={post} />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {remaining.length ? (
                  <>
                    {featured ? (
                      <div className={styles.sectionHeading}>
                        <h2>Keep exploring</h2>
                        <span>More ideas for your everyday</span>
                      </div>
                    ) : null}
                    <div className={styles.grid}>
                      {remaining.map((post) => (
                        <PostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        </section>
      </div>
    </MarketingPage>
  );
}
