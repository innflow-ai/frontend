import Link from "next/link";
import { MarketingPage, PageHero } from "@/components/page-primitives";
import { PlatformDirectory } from "@/components/platform-directory";
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
        title="The foundation for connected property operations."
        description="Explore the building blocks behind agent workflows, from automation and learning to integrations and governance."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platform" }]}
      />
      <PlatformDirectory />
      <section className="section">
        <div className="shell">
          <Link className="button button-secondary" href="/products/platform">
            View the platform overview <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </MarketingPage>
  );
}
