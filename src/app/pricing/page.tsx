import {
  ControlsGrid,
  EvidenceBlock,
  FinalCta,
  MarketingPage,
  OperatingSteps,
  PageHero,
} from "@/components/page-primitives";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Property-operations buying motion | Innflow",
  description:
    "Understand the current demo-led property-operations buying motion without publishing unapproved packages, prices, or implementation timelines.",
  path: "/pricing",
});

const steps = [
  "Bring one recurring operation and the systems it touches.",
  "Confirm product availability, preview boundaries, integrations, and human review points.",
  "Define the implementation and validation scope before any commercial proposal.",
] as const;

export default function PricingPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Buying motion"
        title="Scope the operation before pricing the implementation."
        description="The application currently uses credit-based plan configuration, but property-management packaging and implementation scope are not approved for public pricing. This release therefore uses one demo-led path."
      />
      <EvidenceBlock
        title="Public pricing boundary"
        items={[
          "No stale Framer prices",
          "No invented property package",
          "No setup-time promise",
          "One consistent demo CTA",
        ]}
      />
      <OperatingSteps
        title="What the initial conversation should establish."
        intro="This is a qualification path, not a promise of a fixed implementation package."
        steps={steps}
      />
      <ControlsGrid
        eyebrow="Commercial guardrails"
        title="Keep product usage and implementation scope separate."
        items={[
          {
            title: "Product usage",
            body: "Current account plans use credits; exact public names and rates must remain sourced from the authenticated product configuration.",
          },
          {
            title: "Implementation",
            body: "Property workflow discovery, configuration, integration, and validation scope require separate approval.",
          },
          {
            title: "Expansion",
            body: "Begin with one validated operation before committing to adjacent workflows.",
          },
        ]}
      />
      <FinalCta title="Bring one workflow. Leave with a clearer scope." />
    </MarketingPage>
  );
}
