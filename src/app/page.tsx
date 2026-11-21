import { AuthenticatedHomeRedirect } from "@/components/authenticated-home-redirect";
import { ShowcaseHomepage } from "@/components/showcase-homepage";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

// Keep the marketing homepage available to returning users until the automatic handoff is re-enabled.
const AUTHENTICATED_HOME_REDIRECT_ENABLED = false;

export const metadata = createPageMetadata({
  title: "AI Agents & Connected Workflows | Innflow",
  description:
    "Bring conversations, AI agents and everyday workflows into one workspace. Connect your team, tools and knowledge across industries.",
  path: "/",
  image: "/brand/deploy-agents-share.jpg",
  imageAlt: "Innflow’s blue inflatable mascot above a city street with the words “Deploy Agents”.",
});

export default function HomePage() {
  return (
    <>
      {AUTHENTICATED_HOME_REDIRECT_ENABLED && (
        <AuthenticatedHomeRedirect
          appOrigin={siteConfig.appOrigin}
          marketingOrigin={siteConfig.marketingOrigin}
        />
      )}
      <ShowcaseHomepage />
    </>
  );
}
