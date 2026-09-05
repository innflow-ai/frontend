import {
  EvidenceBlock,
  MarketingPage,
  OperatingSteps,
  PageHero,
} from "@/components/page-primitives";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Book an Innflow Property Operations Demo",
  description:
    "Book an Innflow demo to map a recurring property operation, the systems it touches, required approvals, and a practical next step.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Operations demo"
        title="Bring one recurring operation. Map one clear next step."
        description="The provisional contact path is email while scheduling, packaging, and implementation ownership await approval. No setup-time or outcome promise is implied."
      />
      <EvidenceBlock
        items={[
          "One workflow in scope",
          "Systems and records identified",
          "Human review points named",
          "Available and preview surfaces separated",
        ]}
      />
      <OperatingSteps
        title="What to bring to the conversation."
        intro="A useful starting point is a process your team repeats often enough to explain, measure, and validate."
        steps={[
          "The request, trigger, or recurring schedule that starts the work.",
          "The systems, files, records, and people involved.",
          "The exceptions and decisions that require human review.",
          "The current handoff that creates delay, ambiguity, or duplicate work.",
        ]}
      />
      <section className="section demo-contact-section">
        <div className="shell demo-contact-card">
          <div>
            <span className="section-label label-dark">
              Provisional contact path
            </span>
            <h2>Email the operation you want to map.</h2>
            <p>
              The destination is configurable and should be replaced when an
              approved scheduling or CRM path is available.
            </p>
          </div>
          <TrackedLink
            className="button button-light"
            destination={siteConfig.contactUrl}
            eventLabel="demo_page_email"
          >
            Contact our team
            <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </section>
    </MarketingPage>
  );
}
