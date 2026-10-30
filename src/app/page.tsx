import { AuthenticatedHomeRedirect } from "@/components/authenticated-home-redirect";
import { ShowcaseHomepage } from "@/components/showcase-homepage";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "AI Agents & Connected Workflows | Innflow",
  description:
    "Bring conversations, AI agents and everyday workflows into one workspace. Connect your team, tools and knowledge across industries.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <AuthenticatedHomeRedirect
        appOrigin={siteConfig.appOrigin}
        marketingOrigin={siteConfig.marketingOrigin}
      />
      <ShowcaseHomepage />
    </>
  );
}
