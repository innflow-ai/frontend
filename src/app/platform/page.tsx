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
        title: "Your operation, connected.",
        description:
          "Bring your team, tools, and knowledge into one flow. Give everyday property work a clear path, with room for people to review what matters.",
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
