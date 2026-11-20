import { CalendlyProductPage } from "@/components/calendly-product-page";
import { PlatformDirectory } from "@/components/platform-directory";
import { RuneyWorkspace } from "@/components/runey-workspace";
import { platformPages } from "@/content/platform";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Platform | Innflow",
  description:
    "Explore agentic automation, self learning, evaluations, analytics and observability, integrations, deployment options, and security and compliance.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <CalendlyProductPage
      content={{
        path: "/platform",
        name: "Platform",
        // Align with product platform draft: shared workspace, not PM-first.
        title: "A shared workspace for your team and its AI agents.",
        description:
          "Hand work to an agent in a shared channel. It uses the tools you connect and brings results back with the context your team needs to review them.",
        heroArtwork: <RuneyWorkspace />,
        cards: platformPages.map((page) => ({
          id: page.slug,
          title: page.title,
          body: page.description,
          href: `/platform/${page.slug}`,
        })),
      }}
    >
      <PlatformDirectory />
    </CalendlyProductPage>
  );
}
