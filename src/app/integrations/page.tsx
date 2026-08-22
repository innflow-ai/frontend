import Image from "next/image";
import {
  EvidenceBlock,
  FinalCta,
  MarketingPage,
  PageHero,
} from "@/components/page-primitives";
import { integrations } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Integration paths | Innflow",
  description:
    "Review the connector paths evidenced in the Innflow product repository and the validation required before implementation.",
  path: "/integrations",
});

export default function IntegrationsPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Integrations"
        title="Connect the systems involved in the operation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Integrations" }]}
        description="The marks below correspond to connector paths in the product repository. Presence in code does not, by itself, prove production readiness, scope, or account-specific compatibility."
      />
      <EvidenceBlock
        items={[
          "Approved integration marks",
          "Product connector routes",
          "API and custom implementation path",
          "No customer endorsement implied",
        ]}
      />
      <section className="section">
        <div className="shell integration-directory">
          <div className="section-intro compact-intro">
            <span className="section-label">Connector directory</span>
            <h2>Evidence first, readiness second.</h2>
            <p>
              Each implementation still requires account prerequisites, scopes,
              data contracts, error handling, and security review.
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
            Confirm permissions, data direction, retry behavior, ownership, and
            the system of record for every connection.
          </h2>
        </div>
      </section>
      <FinalCta title="Map one operation and the systems it touches." />
    </MarketingPage>
  );
}
