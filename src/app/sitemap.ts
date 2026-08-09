import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allFeatureSlugs } from "@/content/marketing";

const staticRoutes = [
  "",
  "/property-management",
  "/integrations",
  "/pricing",
  "/demo",
  "/privacy",
  "/terms",
  "/cookies",
  "/legal/eula",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path, index) => ({
      url: `${siteConfig.marketingOrigin}${path}`,
      lastModified: new Date("2026-08-09T00:00:00.000Z"),
      changeFrequency: "weekly" as const,
      priority: index === 0 ? 1 : 0.7,
    })),
    ...allFeatureSlugs.map((slug) => ({
      url: `${siteConfig.marketingOrigin}/features/${slug}`,
      lastModified: new Date("2026-08-09T00:00:00.000Z"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
