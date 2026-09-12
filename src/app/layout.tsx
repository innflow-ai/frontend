import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { ConsentManagedTags } from "@/components/consent-managed-tags";
import { EditorialFooter } from "@/components/editorial-footer";
import { EditorialHeader } from "@/components/editorial-header";
import { MarketingExperienceRuntime } from "@/components/marketing-experience-runtime";
import { MarketingRuntime } from "@/components/marketing-runtime";
import type { LatestBlogPostNavItem } from "@/components/mega-menu";
import { NavigationBlogPostsProvider } from "@/components/navigation-blog-posts";
import { PostHogObservability } from "@/components/posthog-observability";
import { SiteCta } from "@/components/site-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteConfig } from "@/config/site";
import { getMarketingExperience } from "@/lib/marketing-experience-server";
import {
  formatPostDate,
  getLatestBlogPosts,
  humanizeCategory,
  urlForImage,
} from "@/lib/sanity";
import "./globals.css";
import "lenis/dist/lenis.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
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
  const experience = await getMarketingExperience();
  const latestPosts = await getLatestBlogPosts();
  const latestBlogPosts: LatestBlogPostNavItem[] = latestPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    categoryLabel: humanizeCategory(post.category),
    publishedLabel: formatPostDate(post.publishedAt),
    imageUrl: post.coverImage
      ? urlForImage(post.coverImage)
          .ignoreImageParams()
          .width(720)
          .auto("format")
          .url()
      : null,
    imageAlt: post.coverImage?.alt ?? post.title,
  }));

  return (
    // The head script applies a saved theme before first paint. Only this
    // root attribute is intentionally different from the static HTML.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={hostGrotesk.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("innflow-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body data-marketing-experience={experience.variant ?? undefined}>
        <SmoothScroll />
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
        <NavigationBlogPostsProvider posts={latestBlogPosts}>
          {experience.variant === "control" ? (
            <EditorialHeader latestBlogPosts={latestBlogPosts} />
          ) : (
            <SiteHeader />
          )}
          {children}
          {experience.variant === "control" ? (
            <EditorialFooter />
          ) : (
            <>
              <SiteCta />
              <SiteFooter />
            </>
          )}
        </NavigationBlogPostsProvider>
        <MarketingRuntime />
        <ConsentManagedTags />
        <PostHogObservability experience={experience} />
        {experience.variant && <MarketingExperienceRuntime />}
      </body>
    </html>
  );
}
