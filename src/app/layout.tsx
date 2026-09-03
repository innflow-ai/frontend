import type { Metadata, Viewport } from "next";
import { Figtree, Questrial } from "next/font/google";
import type { ReactNode } from "react";
import { ConsentManagedTags } from "@/components/consent-managed-tags";
import { EditorialFooter } from "@/components/editorial-footer";
import { EditorialHeader } from "@/components/editorial-header";
import { MarketingRuntime } from "@/components/marketing-runtime";
import type { LatestBlogPostNavItem } from "@/components/mega-menu";
import { PostHogObservability } from "@/components/posthog-observability";
import { siteConfig } from "@/config/site";
import {
  coverImageUrl,
  formatPostDate,
  getLatestBlogPosts,
  humanizeCategory,
} from "@/lib/sanity";
import "./globals.css";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#070909" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.marketingOrigin),
  title: "Property Operations Software & AI Workflows | Innflow",
  description:
    "Coordinate property workflows, approvals, operational context, and execution history in one connected workspace built for modern property management teams.",
  alternates: { canonical: "/" },
  applicationName: "Innflow",
  authors: [{ name: "Innflow" }],
  creator: "Innflow",
  publisher: "Innflow",
  category: "business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Property Operations Software & AI Workflows | Innflow",
    description:
      "Coordinate property workflows, approvals, operational context, and execution history in one connected workspace built for modern property management teams.",
    type: "website",
    url: "/",
    siteName: "Innflow",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Innflow property operations platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Operations Software & AI Workflows | Innflow",
    description:
      "Coordinate property workflows, approvals, operational context, and execution history in one connected workspace.",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Innflow property operations platform",
      },
    ],
  },
  robots: {
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
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const latestPosts = await getLatestBlogPosts();
  const latestBlogPosts: LatestBlogPostNavItem[] = latestPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    categoryLabel: humanizeCategory(post.category),
    publishedLabel: formatPostDate(post.publishedAt),
    imageUrl: post.coverImage ? coverImageUrl(post.coverImage, 320, 180) : null,
    imageAlt: post.coverImage?.alt ?? post.title,
  }));

  return (
    <html lang="en" className={`${questrial.variable} ${figtree.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("innflow-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
        <ConsentManagedTags />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.analytics.googleTagManagerId}`}
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <EditorialHeader latestBlogPosts={latestBlogPosts} />
        {children}
        <EditorialFooter />
        <MarketingRuntime />
        <PostHogObservability />
      </body>
    </html>
  );
}
