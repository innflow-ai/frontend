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
          <span className="section-label">Legal</span>
          <h1>{title}</h1>
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
            Open policy in a new tab ↗
          </a>
        </div>
      </section>
      <section className="legal-policy-shell" aria-label={title}>
        <TermlyPolicyEmbed policyId={policyId} />
      </section>
    </MarketingPage>
  );
}
