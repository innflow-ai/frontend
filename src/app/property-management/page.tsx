import { JsonLd } from "@/components/json-ld";
import {
  ControlsGrid,
  EvidenceBlock,
  FaqList,
  FinalCta,
  MarketingPage,
  OperatingSteps,
  PageHero,
} from "@/components/page-primitives";
import { HeroWorkflowFrame } from "@/components/product-media";
import { siteConfig } from "@/config/site";
import { faqs, portfolioFits } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Property Management Workflow Automation | Innflow",
  description:
    "Connect recurring property management workflows, approvals, files, and operational context around the systems your team already uses with Innflow.",
  path: "/property-management",
});

const operatingSteps = [
  "Choose one frequent request, report, document review, or approval path.",
  "Map the systems, records, people, exceptions, and review boundaries involved.",
  "Configure a bounded workflow using the product surfaces that are available.",
  "Validate execution history, failure handling, and ownership before expanding.",
] as const;

const controls = [
  {
    title: "System-of-record boundary",
    body: "Innflow coordinates operational work around your property-management, accounting, leasing, and maintenance systems.",
  },
  {
    title: "Human approval",
    body: "Place a person at the decision points where policy, money, safety, or outbound communication requires review.",
  },
  {
    title: "Visible execution",
    body: "Use run history and attached context to inspect the process and design recovery.",
  },
] as const;

export default function PropertyManagementPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.marketingOrigin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Property management",
        item: `${siteConfig.marketingOrigin}/property-management`,
      },
    ],
  };

  return (
    <MarketingPage>
      <PageHero
        eyebrow="Property-management operations"
        title="Coordinate recurring property work without replacing your core systems."
        secondaryHref="#property-workflow"
        mediaId="property-workflow"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property Management" },
        ]}
        description="Innflow is positioned as the operational layer connecting requests, workflows, knowledge, files, tables, approvals, and execution history."
      >
        <HeroWorkflowFrame />
      </PageHero>
      <EvidenceBlock
        items={[
          "Visual workflow surfaces",
          "Approvals and execution history",
          "Files, Tables, and Knowledge Base",
          "Approved connector paths",
        ]}
      />
      <section className="section">
        <div className="shell portfolio-selector">
          <div className="section-intro compact-intro">
            <span className="section-label">Fit by operating model</span>
            <h2>Start where recurring coordination is already visible.</h2>
            <p>
              Only management companies are treated as the initial ICP. Other
              portfolio fits remain hypotheses to validate.
            </p>
          </div>
          <div className="portfolio-links">
            {portfolioFits.map((fit) => (
              <article
                key={fit.title}
                id={fit.title.toLowerCase().replaceAll(" ", "-")}
              >
                <span>{fit.status}</span>
                <h3>{fit.title}</h3>
                <p>{fit.body}</p>
                <a href={siteConfig.demoUrl}>Discuss this operating model →</a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <OperatingSteps
        title="Validate one operation before expanding the system."
        intro="No universal setup-time promise is made. Timing depends on access, scope, exceptions, data quality, and review requirements."
        steps={operatingSteps}
      />
      <ControlsGrid
        title="Clear boundaries before automation."
        items={controls}
      />
      <section className="section faq-section">
        <div className="shell faq-layout">
          <div className="faq-intro">
            <span className="section-label">Property-operations FAQ</span>
            <h2>Qualify the workflow before promising the outcome.</h2>
          </div>
          <FaqList items={faqs.slice(0, 6)} />
        </div>
      </section>
      <FinalCta title="Bring one recurring property operation to the demo." />
      <JsonLd value={breadcrumbSchema} />
    </MarketingPage>
  );
}
