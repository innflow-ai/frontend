import type { Metadata } from "next";
import Image from "next/image";
import { MarketingPage } from "@/components/page-primitives";
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
  title: "Innflow blog | Property operations, automation, and AI workflows",
  description:
    "Guides, comparisons, and product notes on connected property operations — automation, AI agents, integrations, and day-to-day workflows for operators.",
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
    <a className={styles.featured} href={`/blog/${post.slug}`}>
      {coverUrl ? (
        <div className={styles.featuredMedia}>
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt ?? post.title}
            width={1200}
            height={675}
            sizes="(max-width: 1024px) 92vw, 640px"
            priority
          />
        </div>
      ) : null}
      <div className={styles.featuredCopy}>
        <span className={styles.chip}>{humanizeCategory(post.category)}</span>
        <h2>{post.title}</h2>
        {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
        <PostMeta post={post} />
      </div>
    </a>
  );
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : [];

  return (
    <MarketingPage>
      <section className={styles.hero}>
        <div className="shell">
          <span className="section-label">Innflow blog</span>
          <h1>Field notes on connected property operations.</h1>
          <p className={styles.heroSubline}>
            Guides, comparisons, and product notes on automation, AI agents,
            integrations, and the recurring workflows property teams run every
            day.
          </p>
        </div>
      </section>
      <section className={styles.listing}>
        <div className="shell">
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>
                No posts yet. New writing on property operations is on the way.
              </p>
            </div>
          ) : (
            <>
              {featured ? <FeaturedPost post={featured} /> : null}
              {rest.length > 0 ? (
                <div className={styles.grid}>
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </MarketingPage>
  );
}
