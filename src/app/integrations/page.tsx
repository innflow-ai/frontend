import Image from "next/image";
import {
  MarketingPage,
  PageHero,
} from "@/components/page-primitives";
import { integrations } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Property Management Software Integrations | Innflow",
  description:
    "Connect Innflow with the property management tools your team uses and coordinate data, approvals, and operational workflows across systems.",
  path: "/integrations",
});

export default function IntegrationsPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Integrations"
        title="Keep your tools. Connect the work."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Integrations" }]}
        description="Bring the tools your team relies on into the same workflow. We’ll help you check the connections, access, and setup your operation needs."
      />
      <section className="section">
        <div className="shell integration-directory">
          <div className="section-intro compact-intro">
            <span className="section-label">Connector directory</span>
            <h2>Find your next connection.</h2>
            <p>
              Explore the tools below, then talk with us about your accounts and
              the information you want to connect.
            </p>
          </div>
          <div className="integration-grid integration-grid-large">
            {integrations.map((integration) => (
              <article className="integration-card" key={integration.name}>
                <Image src={integration.asset} alt="" width={40} height={40} />
                <strong>{integration.name}</strong>
                <small>{integration.status}</small>
              </article>
            ))}
            <article className="integration-card api-card">
              <span className="api-mark">API</span>
              <strong>Custom path</strong>
              <small>Scoping and implementation required</small>
            </article>
          </div>
        </div>
      </section>
      <section className="section quiet-section">
        <div className="shell statement-grid">
          <span className="section-label">Before implementation</span>
          <h2>
            Choose what to share, who can act, and where the next step belongs.
          </h2>
        </div>
      </section>
    </MarketingPage>
  );
}
