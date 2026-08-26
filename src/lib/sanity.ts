import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";
import { unstable_cache } from "next/cache";
import { createClient } from "next-sanity";

export const sanityProjectId = process.env.SANITY_PROJECT_ID ?? "hnjg8vum";
export const sanityDataset = process.env.SANITY_DATASET ?? "production";
const sanityApiVersion = process.env.SANITY_API_VERSION ?? "2026-08-22";

// Server-side only: the token must never be exposed to the client bundle.
export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: "published",
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export function coverImageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
): string {
  return (
    builder
      .image(source)
      .width(width)
      .height(height)
      // biome-ignore lint/suspicious/noFocusedTests: `fit` is the image-url crop API, not a test
      .fit("crop")
      .auto("format")
      .url()
  );
}

export type BlogAuthor = {
  name: string;
  slug: string | null;
  role: string | null;
  bio: string | null;
  image: (SanityImageSource & { alt?: string }) | null;
};

export type BlogPostSummary = {
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  publishedAt: string;
  readTime: number | null;
  featured: boolean;
  coverImage: (SanityImageSource & { alt?: string }) | null;
  tags: string[] | null;
  author: BlogAuthor | null;
};

export type BlogPost = BlogPostSummary & {
  metaDescription: string | null;
  body: PortableTextBlock[] | null;
};

const postFields = `
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  readTime,
  "featured": coalesce(featured, false),
  coverImage,
  tags,
  "author": author->{
    name,
    "slug": slug.current,
    role,
    bio,
    image
  }
`;

const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  ${postFields}
}`;

const latestPostsQuery = `*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(publishedAt desc)[0...5] {
  ${postFields}
}`;

const postSlugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  ${postFields},
  metaDescription,
  body
}`;

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    return await sanityClient.fetch<BlogPostSummary[]>(postsQuery);
  } catch {
    return [];
  }
}

const fetchLatestBlogPosts = unstable_cache(
  () => sanityClient.fetch<BlogPostSummary[]>(latestPostsQuery),
  ["latest-blog-posts"],
  { revalidate: 60, tags: ["blog-posts"] },
);

export async function getLatestBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    return await fetchLatestBlogPosts();
  } catch {
    return [];
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    return await sanityClient.fetch<string[]>(postSlugsQuery);
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await sanityClient.fetch<BlogPost | null>(postBySlugQuery, {
      slug,
    });
  } catch {
    return null;
  }
}

// Categories are stored as slugs (e.g. "property-management"); humanize for display.
export function humanizeCategory(category: string | null | undefined): string {
  if (!category) return "Blog";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatPostDate(publishedAt: string | null | undefined): string {
  if (!publishedAt) return "";
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
