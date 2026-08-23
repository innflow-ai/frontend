import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image = "/opengraph-image.png",
  imageAlt = `${siteConfig.name} property operations platform`,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const canonical = new URL(path, siteConfig.marketingOrigin).toString();

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
  };
}
