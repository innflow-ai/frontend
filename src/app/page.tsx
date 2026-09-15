import type { Metadata } from "next";
import { AuthenticatedHomeRedirect } from "@/components/authenticated-home-redirect";
import { BaselaneHomepage } from "@/components/baselane-homepage";
import { FigmaFeaturePage } from "@/components/figma-feature-page";
import { siteConfig } from "@/config/site";
import { getFeaturePageDesign } from "@/content/feature-pages";

// Temporary homepage swap. Set to false to restore the original homepage.
const TEMPORARY_LISTING_HOMEPAGE = true;
const listingPage = getFeaturePageDesign("listing-and-advertising");

export const metadata: Metadata = {
  title: TEMPORARY_LISTING_HOMEPAGE
    ? `${listingPage.name} | Innflow`
    : "A clearer day in property operations | Innflow",
  description: TEMPORARY_LISTING_HOMEPAGE
    ? listingPage.description
    : "Connect property workflows, knowledge, and approvals in one Innflow workspace.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <AuthenticatedHomeRedirect
        appOrigin={siteConfig.appOrigin}
        marketingOrigin={siteConfig.marketingOrigin}
      />
      {TEMPORARY_LISTING_HOMEPAGE ? (
        <FigmaFeaturePage page={listingPage} />
      ) : (
        <BaselaneHomepage />
      )}
    </>
  );
}
