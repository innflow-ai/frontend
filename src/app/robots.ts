import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.marketingOrigin}/sitemap.xml`,
    host: siteConfig.marketingOrigin,
  };
}
