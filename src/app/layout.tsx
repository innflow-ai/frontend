import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import { ConsentManagedTags } from "@/components/consent-managed-tags";
import { DeferredAnalytics } from "@/components/deferred-analytics";
import { EmailCaptureSlot } from "@/components/email-capture-slot";
import { MarketingPageView } from "@/components/marketing-page-view";
import { MarketingRuntime } from "@/components/marketing-runtime";
import type { LatestBlogPostNavItem } from "@/components/mega-menu";
import { NavigationBlogPostsProvider } from "@/components/navigation-blog-posts";
import { PostHogObservability } from "@/components/posthog-observability";
import { SiteCloseAndFooter } from "@/components/site-close-and-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WebsiteAnnouncementBar } from "@/components/website-announcement";
import { siteConfig } from "@/config/site";
import {
  announcementIdentity,
  announcementState,
  websiteAnnouncementBootScript,
} from "@/config/website-announcement";
import {
  formatPostDate,
  getLatestAppUpdate,
  getLatestBlogPosts,
  humanizeCategory,
  urlForImage,
} from "@/lib/sanity";
import { getWebsiteAnnouncement } from "@/lib/website-announcement";
import "./globals.css";
import { getNavigationTestimonial } from "@/lib/testimonials";
import "lenis/dist/lenis.css";

const archivo = Archivo({
  subsets: ["latin"],
  // 400, 600, and 700 are the brand kit faces. 500 stays so existing UI
  // that already asks for medium does not synthesize a weight.
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  // 400 is the kit regular. 500 stays for serif headings outside this kit.
  weight: ["400", "500"],
  variable: "--font-source-serif-4",
  display: "swap",
});
const archivoItalic = Archivo({
  subsets: ["latin"],
  weight: "800",
  style: "italic",
  variable: "--font-archivo-italic",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=20261030",
        sizes: "16x16 24x24 32x32 48x48 64x64 96x96 128x128 256x256",
        type: "image/x-icon",
      },
      { url: "/icon.png?v=20261030", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
  const [latestPosts, appUpdate, navigationTestimonial, announcement] =
    await Promise.all([
      getLatestBlogPosts(),
      getLatestAppUpdate(),
      getNavigationTestimonial(),
      getWebsiteAnnouncement(),
    ]);
  const announcementNow = Date.now();
  const announcementVisible = announcement
    ? announcementState(announcement, announcementNow).visible
    : false;
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
      data-website-announcement={announcementVisible ? "visible" : "hidden"}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${archivoItalic.variable} ${inter.variable} ${sourceSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("innflow-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
        {announcement && (
          <script
            dangerouslySetInnerHTML={{
              __html: websiteAnnouncementBootScript(announcement),
            }}
          />
        )}
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
          {announcement && (
            <WebsiteAnnouncementBar
              key={announcementIdentity(announcement)}
              config={announcement}
              initialNow={announcementNow}
            />
          )}
          <SiteHeader />
          {children}
          <SiteCloseAndFooter />
        </NavigationBlogPostsProvider>
        <MarketingRuntime />
        <MarketingPageView />
        <ConsentManagedTags />
        <PostHogObservability experience={experience} />
        <EmailCaptureSlot />
        <DeferredAnalytics />
      </body>
    </html>
  );
}
