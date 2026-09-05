import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allFeatureSlugs } from "@/content/marketing";
import { platformPages } from "@/content/platform";
import { productSlugs } from "@/lib/product-pages";
import { getBlogPosts } from "@/lib/sanity";

const staticRoutes: Array<{
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/property-management", changeFrequency: "weekly", priority: 0.9 },
  { path: "/platform", changeFrequency: "monthly", priority: 0.9 },
  { path: "/integrations", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/demo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/legal/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  {
    path: "/legal/terms-of-service",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  { path: "/legal/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  {
    path: "/legal/acceptable-use-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  { path: "/legal/eula", changeFrequency: "yearly", priority: 0.3 },
] as const;

const siteLastModified = new Date("2026-08-22T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.marketingOrigin}${route.path}`,
      lastModified: siteLastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...platformPages.map((page) => ({
      url: `${siteConfig.marketingOrigin}/platform/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...allFeatureSlugs.map((slug) => ({
      url: `${siteConfig.marketingOrigin}/features/${slug}`,
      lastModified: siteLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...productSlugs.map((slug) => ({
      url: `${siteConfig.marketingOrigin}/products/${slug}`,
      lastModified: siteLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.marketingOrigin}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
