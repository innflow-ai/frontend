import { MarketingPage } from "@/components/page-primitives";

export function LegalPolicyPage({
  title,
  source,
}: {
  title: string;
  source: string;
}) {
  return (
    <MarketingPage>
      <section className="legal-hero">
        <div className="shell">
          <span className="section-label">Legal</span>
          <h1>{title}</h1>
          <p>
            This page preserves Innflow’s currently approved policy source. If
            the embedded viewer is unavailable, open the policy directly.
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
        <iframe
          className="legal-policy-frame"
          src={source}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
        />
      </section>
    </MarketingPage>
  );
}
