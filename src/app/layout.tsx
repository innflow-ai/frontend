import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { ConsentManagedTags } from "@/components/consent-managed-tags";
import { MarketingRuntime } from "@/components/marketing-runtime";
import type { LatestBlogPostNavItem } from "@/components/mega-menu";
import { NavigationBlogPostsProvider } from "@/components/navigation-blog-posts";
import { PostHogObservability } from "@/components/posthog-observability";
import { SiteCta } from "@/components/site-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteFooterBoundary } from "@/components/site-footer-boundary";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteConfig } from "@/config/site";
import {
  formatPostDate,
  getLatestAppUpdate,
  getLatestBlogPosts,
  humanizeCategory,
  urlForImage,
} from "@/lib/sanity";
import { TemplateFooter } from "./preview/scroll-showcase/template-footer";
import "./globals.css";
import { getNavigationTestimonial } from "@/lib/testimonials";
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
  title: "AI Agents & Connected Workflows | Innflow",
  description:
    "Bring conversations, AI agents and everyday workflows into one workspace. Connect your team, tools and knowledge across industries.",
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
    title: "AI Agents & Connected Workflows | Innflow",
    description:
      "Bring conversations, AI agents and everyday workflows into one workspace. Connect your team, tools and knowledge across industries.",
    type: "website",
    url: "/",
    siteName: "Innflow",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Innflow connected workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents & Connected Workflows | Innflow",
    description:
      "Connect conversations, agents and everyday workflows in one workspace.",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Innflow connected workspace",
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
  const experience = { variant: null, measure: false } as const;
  const [latestPosts, appUpdate, navigationTestimonial] = await Promise.all([
    getLatestBlogPosts(),
    getLatestAppUpdate(),
    getNavigationTestimonial(),
  ]);
  const latestUpdate: LatestBlogPostNavItem | null = appUpdate
    ? {
        title: appUpdate.title,
        actionLabel: appUpdate.button?.label ?? "Explore update",
        href: new URL(appUpdate.button?.href || "/home", siteConfig.appOrigin)
          .href,
        categoryLabel: "Company updates",
        publishedLabel: formatPostDate(appUpdate.publishedAt),
        imageUrl: appUpdate.image
          ? urlForImage(appUpdate.image).width(720).auto("format").url()
          : null,
        imageAlt: appUpdate.image?.alt ?? appUpdate.title,
      }
    : null;
  const latestBlogPosts: LatestBlogPostNavItem[] = latestPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    categoryLabel: humanizeCategory(post.category),
    publishedLabel: formatPostDate(post.publishedAt),
    imageUrl: post.coverImage
      ? urlForImage(post.coverImage)
          .ignoreImageParams()
          .width(1440)
          .quality(100)
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
      <body>
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
        <NavigationBlogPostsProvider
          posts={latestBlogPosts}
          latestUpdate={latestUpdate}
          testimonial={navigationTestimonial}
        >
          <SiteHeader />
          {children}
          <SiteCta />
          <SiteFooterBoundary preview={<TemplateFooter />}>
            <SiteFooter />
          </SiteFooterBoundary>
        </NavigationBlogPostsProvider>
        <MarketingRuntime />
        <ConsentManagedTags />
        <PostHogObservability experience={experience} />
      </body>
    </html>
  );
}
