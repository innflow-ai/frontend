import type { Metadata, Viewport } from "next";
import { Figtree, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { MarketingRuntime } from "@/components/marketing-runtime";
import { siteConfig } from "@/config/site";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
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
  title: "Innflow for property operations | Connected operational workflows",
  description:
    "Coordinate recurring property operations, connected context, approvals, and execution history in one operational workspace.",
  alternates: { canonical: "/" },
  applicationName: "Innflow",
  authors: [{ name: "Innflow" }],
  category: "business",
  openGraph: {
    title: "Run property operations from one connected workspace",
    description:
      "A focused Innflow walkthrough for property-management operators.",
    type: "website",
    url: "/",
    siteName: "Innflow",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innflow for property operations",
    description: "Connected operational workflows with visible human control.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <MarketingRuntime />
      </body>
    </html>
  );
}
