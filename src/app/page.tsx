import type { Metadata } from "next";
import { AuthenticatedHomeRedirect } from "@/components/authenticated-home-redirect";
import { BaselaneHomepage } from "@/components/baselane-homepage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "A clearer day in property operations | Innflow",
  description:
    "Connect property workflows, knowledge, and approvals in one Innflow workspace.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <AuthenticatedHomeRedirect
        appOrigin={siteConfig.appOrigin}
        marketingOrigin={siteConfig.marketingOrigin}
      />
      <BaselaneHomepage />
    </>
  );
}
