import {
  PortableText,
  type PortableTextComponents,
  type PortableTextTypeComponentProps,
} from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { MarketingPage } from "@/components/page-primitives";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  coverImageUrl,
  formatPostDate,
  getBlogPost,
  getBlogSlugs,
  humanizeCategory,
  urlForImage,
} from "@/lib/sanity";
import styles from "./page.module.css";

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

type BodyImageValue = {
  alt?: string;
  asset?: { _ref?: string };
};

function BodyImage({ value }: PortableTextTypeComponentProps<BodyImageValue>) {
  if (!value?.asset?._ref) return null;
  const src = urlForImage(value).width(1200).auto("format").url();
  return (
    <figure className={styles.bodyImage}>
      <Image
        src={src}
        alt={value.alt ?? ""}
        width={1200}
        height={675}
        sizes="(max-width: 760px) 92vw, 760px"
      />
      {value.alt ? <figcaption>{value.alt}</figcaption> : null}
    </figure>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: BodyImage,
  },
  block: {
    h2: ({ children }: { children?: ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3>{children}</h3>,
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  },
  marks: {
    code: ({ children }: { children?: ReactNode }) => <code>{children}</code>,
    link: ({
      children,
      value,
    }: {
      children?: ReactNode;
      value?: { href?: string };
    }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }: RouteParams) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const coverUrl = post.coverImage
    ? coverImageUrl(post.coverImage, 1600, 900)
    : null;
  const date = formatPostDate(post.publishedAt);
  const authorName = post.author?.name ?? "Ari Khan";

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

  return (
    <MarketingPage>
      <JsonLd value={articleSchema} />
      <section className={styles.hero}>
        <div className={`shell ${styles.article}`}>
          <span className={styles.chip}>{humanizeCategory(post.category)}</span>
          <h1>{post.title}</h1>
          <p className={styles.meta}>
            <span className={styles.author}>{authorName}</span>
            {date ? <span aria-hidden="true">·</span> : null}
            {date ? <time dateTime={post.publishedAt}>{date}</time> : null}
            {post.readTime ? <span aria-hidden="true">·</span> : null}
            {post.readTime ? <span>{post.readTime} min read</span> : null}
          </p>
          {coverUrl ? (
            <div className={styles.cover}>
              <Image
                src={coverUrl}
                alt={post.coverImage?.alt ?? post.title}
                width={1600}
                height={900}
                sizes="(max-width: 760px) 92vw, 760px"
                priority
              />
            </div>
          ) : null}
        </div>
      </section>
      {post.body ? (
        <div className={`shell ${styles.body}`}>
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      ) : null}
      {post.tags && post.tags.length > 0 ? (
        <div className={`shell ${styles.tags}`}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className={`shell ${styles.footerNav}`}>
        <a className={styles.backLink} href="/blog">
          <span aria-hidden="true">←</span> Back to blog
        </a>
      </div>
    </MarketingPage>
  );
}
