import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "@/components/blog/article.module.css";
import { BlogAuthorBio } from "@/components/blog/author-bio";
import { BlogContinueLearning } from "@/components/blog/continue-learning";
import { BlogListenPlayer } from "@/components/blog/listen-player";
import { BlogPortableBody } from "@/components/blog/portable-body";
import { BlogRelatedPosts } from "@/components/blog/related-posts";
import { BlogShareBar } from "@/components/blog/share-bar";
import { BlogTaxonomy } from "@/components/blog/taxonomy";
import { GoogleSignInButton } from "@/components/google-sign-in";
import { JsonLd } from "@/components/json-ld";
import { MarketingPage } from "@/components/page-primitives";
import { siteConfig } from "@/config/site";
import {
  blockPlainText,
  industriesForPost,
  type LoosePortableBlock,
  portableTextToPlain,
} from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  coverImageUrl,
  formatPostDateShort,
  getBlogPost,
  getBlogSlugs,
  getRelatedBlogPosts,
  humanizeCategory,
  urlForImage,
} from "@/lib/sanity";

export const revalidate = 60;

type RouteParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const description =
    post.metaDescription?.trim() ||
    post.excerpt?.trim() ||
    `Read ${post.title} on the Innflow property operations blog.`;
  const canonical = new URL(
    `/blog/${post.slug}`,
    siteConfig.marketingOrigin,
  ).toString();
  const coverUrl = post.coverImage
    ? coverImageUrl(post.coverImage, 1200, 630)
    : "/opengraph-image.png";
  const imageAlt = post.coverImage?.alt ?? post.title;
  const title = `${post.title} | Innflow`;
  const authorName = post.author?.name ?? "Ari Khan";
  const baseMetadata = createPageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
  });

  return {
    ...baseMetadata,
    authors: [{ name: authorName }],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.publishedAt,
      section: humanizeCategory(post.category),
      tags: post.tags ?? undefined,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: coverUrl, alt: imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: RouteParams) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.slug, post.category);
  const coverUrl = post.coverImage
    ? coverImageUrl(post.coverImage, 1600, 900)
    : null;
  const date = formatPostDateShort(post.publishedAt);
  const authorName = post.author?.name ?? "Ari Khan";
  const authorRole = post.author?.role;
  const canonical = new URL(
    `/blog/${post.slug}`,
    siteConfig.marketingOrigin,
  ).toString();
  const listenText = portableTextToPlain(
    (post.body ?? []) as LoosePortableBlock[],
  );
  const industries = industriesForPost(post.industries);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt ?? undefined,
    datePublished: post.publishedAt,
    image: coverUrl ?? undefined,
    author: {
      "@type": "Person",
      name: authorName,
    },
  };

  const headings = ((post.body ?? []) as LoosePortableBlock[])
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => ({
      id: `section-${block._key}`,
      title: blockPlainText(block),
    }));
  const authorPhoto = post.author?.image
    ? urlForImage(post.author.image).width(80).height(80).url()
    : null;
  const author = post.author ?? {
    name: authorName,
    slug: null,
    role: null,
    bio: null,
    image: null,
  };

  return (
    <MarketingPage>
      <JsonLd value={articleSchema} />
      <article className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.articleHero}>
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={post.coverImage?.alt ?? post.title}
                fill
                sizes="(max-width: 760px) calc(100vw - 40px), 1136px"
                priority
                className={styles.heroImage}
              />
            ) : null}
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>
                {date ? (
                  <time dateTime={post.publishedAt}>Published: {date}</time>
                ) : null}
                {date && post.readTime ? (
                  <span aria-hidden="true">▪</span>
                ) : null}
                {post.readTime ? <span>{post.readTime} min read</span> : null}
              </p>
              <h1 className={styles.title}>{post.title}</h1>
            </div>
            <a className={styles.heroAuthor} href="#author-bio">
              <span className={styles.heroAuthorName}>
                {authorPhoto ? (
                  <Image src={authorPhoto} alt="" width={36} height={36} />
                ) : (
                  <span className={styles.heroAuthorInitial}>
                    {authorName.slice(0, 1)}
                  </span>
                )}
                {authorName}
              </span>
              <span>{authorRole || humanizeCategory(post.category)}</span>
            </a>
          </header>
          <div className={styles.articleColumns}>
            <aside className={styles.articleAside} aria-label="Article tools">
              <div className={styles.asideCta}>
                <p>Bring your property operations together with Innflow</p>
                <GoogleSignInButton
                  label="Get started"
                  eventLabel="blog_sidebar_get_started"
                  className={styles.ctaButton}
                />
              </div>
              <BlogShareBar url={canonical} title={post.title} />
              {headings.length > 0 ? (
                <nav className={styles.toc} aria-label="In this article">
                  <p className={styles.metaLabel}>In this article:</p>
                  {headings.map((heading) => (
                    <a key={heading.id} href={`#${heading.id}`}>
                      {heading.title}
                    </a>
                  ))}
                </nav>
              ) : null}
            </aside>
            <div className={styles.articleMain}>
              {post.body ? (
                <div className={styles.body}>
                  <BlogPortableBody
                    blocks={post.body as unknown as LoosePortableBlock[]}
                  />
                </div>
              ) : null}
              <div className={styles.articleExtras}>
                <BlogListenPlayer text={listenText} audioUrl={post.audioUrl} />
                <BlogTaxonomy
                  category={post.category}
                  industries={industries}
                  tags={post.tags ?? []}
                />
              </div>
              <BlogAuthorBio author={author} />
              <BlogContinueLearning nextPost={related[0] ?? null} />
            </div>
          </div>
        </div>
        <div className={styles.shell}>
          <BlogRelatedPosts posts={related.slice(0, 3)} />
          <div className={styles.footerNav}>
            <a className={styles.backLink} href="/blog">
              ← Back to blog
            </a>
          </div>
        </div>
      </article>
    </MarketingPage>
  );
}
