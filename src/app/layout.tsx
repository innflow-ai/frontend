import type { Metadata } from "next";
import { Figtree, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { MarketingRuntime } from "@/components/marketing-runtime";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.marketingOrigin),
  title: "Innflow for property operations | Connected operational workflows",
  description:
    "Coordinate recurring property operations, connected context, approvals, and execution history in one operational workspace.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Run property operations from one connected workspace",
    description:
      "A focused Innflow walkthrough for property-management operators.",
    type: "website",
    url: "/",
    siteName: "Innflow",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innflow for property operations",
    description: "Connected operational workflows with visible human control.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${figtree.variable}`}>
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
