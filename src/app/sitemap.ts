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
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  {
    path: "/advisor-partner-program",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/connections", changeFrequency: "monthly", priority: 0.6 },
  {
    path: "/free-rental-forms-and-templates-for-landlords",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  { path: "/help-center", changeFrequency: "monthly", priority: 0.6 },
  {
    path: "/how-much-should-i-charge-for-rent",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  { path: "/in-the-news", changeFrequency: "monthly", priority: 0.6 },
  { path: "/landlord-accounting", changeFrequency: "monthly", priority: 0.6 },
  { path: "/landlord-banking", changeFrequency: "monthly", priority: 0.6 },
  { path: "/landlord-banking-apy", changeFrequency: "monthly", priority: 0.6 },
  { path: "/landlord-insurance", changeFrequency: "monthly", priority: 0.6 },
  { path: "/landlord-referral", changeFrequency: "monthly", priority: 0.6 },
  { path: "/lease-agreement", changeFrequency: "monthly", priority: 0.6 },
  { path: "/legal-agreements", changeFrequency: "monthly", priority: 0.6 },
  { path: "/long-term-rentals", changeFrequency: "monthly", priority: 0.6 },
  { path: "/mid-term-rentals", changeFrequency: "monthly", priority: 0.6 },
  {
    path: "/multi-property-investors",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  { path: "/our-customers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partner-with-us", changeFrequency: "monthly", priority: 0.6 },
  { path: "/product-updates", changeFrequency: "monthly", priority: 0.6 },
  { path: "/real-estate-investing", changeFrequency: "monthly", priority: 0.6 },
  { path: "/rent-collection", changeFrequency: "monthly", priority: 0.6 },
  { path: "/rent-collection-2", changeFrequency: "monthly", priority: 0.6 },
  { path: "/rental-property-loans", changeFrequency: "monthly", priority: 0.6 },
  { path: "/renters", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.6 },
  { path: "/security", changeFrequency: "monthly", priority: 0.6 },
  {
    path: "/security-deposit-account",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  { path: "/short-term-rentals", changeFrequency: "monthly", priority: 0.6 },
  { path: "/tax-preparation", changeFrequency: "monthly", priority: 0.6 },
  {
    path: "/tenant-screening-service",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  { path: "/webinars", changeFrequency: "monthly", priority: 0.6 },
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
