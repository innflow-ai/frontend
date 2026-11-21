import { ChevronRight } from "@/components/chevron-right";
import { MixedHeadingText } from "@/components/mixed-heading-text";
import { MarketingPage } from "@/components/page-primitives";
import { TermlyPolicyEmbed } from "@/components/termly-policy-embed";

export function LegalPolicyPage({
  title,
  policyId,
  source,
}: {
  title: string;
  policyId: string;
  source: string;
}) {
  return (
    <MarketingPage>
      <section className="legal-hero">
        <div className="shell">
          <h1 data-mixed-heading>
            <MixedHeadingText>{title}</MixedHeadingText>
          </h1>
          <p>
            Review Innflow’s {title.toLowerCase()} below. If the embedded
            document does not load, you can open it in a new tab.
          </p>
          <a
            className="text-link"
            href={source}
            target="_blank"
            rel="noreferrer"
          >
            Open policy in a new tab <ChevronRight />
          </a>
        </div>
      </section>
      <section className="legal-policy-shell" aria-label={title}>
        <TermlyPolicyEmbed policyId={policyId} />
      </section>
    </MarketingPage>
  );
}
