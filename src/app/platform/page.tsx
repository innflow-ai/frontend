import { MarketingPage, PageHero } from "@/components/page-primitives";
import { PlatformDirectory } from "@/components/platform-directory";
import { RuneyWorkspace } from "@/components/runey-workspace";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Platform | Innflow",
  description:
    "Explore agentic automation, self learning, evaluations, analytics and observability, integrations, deployment options, and security and compliance.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Platform"
        title="Your operation, connected."
        description="Bring your team, tools, and knowledge into one flow. Give everyday property work a clear path, with room for people to review what matters."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platform" }]}
      >
        <RuneyWorkspace />
      </PageHero>
      <PlatformDirectory />
    </MarketingPage>
  );
}
