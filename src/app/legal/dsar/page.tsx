import { MarketingPage } from "@/components/page-primitives";
import { createPageMetadata } from "@/lib/metadata";

const source =
  "https://app.termly.io/dsar/d253192a-6c11-4338-9883-67b3307aea2f";

export const metadata = createPageMetadata({
  title: "Data subject access request | Innflow",
  description:
    "Submit a request to access, correct, or delete your personal data.",
  path: "/legal/dsar",
  noIndex: true,
});

export default function DsarPage() {
  return (
    <MarketingPage>
      <section className="legal-hero">
        <div className="shell">
          <span className="section-label">Privacy request</span>
          <h1>Data subject access request</h1>
          <p>
            Use the form below to submit a privacy request. If the embedded form
            does not load, you can open it in a new tab.
          </p>
          <a
            className="text-link"
            href={source}
            target="_blank"
            rel="noreferrer"
          >
            Open request form in a new tab ↗
          </a>
        </div>
      </section>
      <section
        className="legal-policy-shell"
        aria-label="Data subject access request form"
      >
        <iframe
          className="legal-policy-frame legal-dsar-frame"
          src={source}
          title="Data subject access request form"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
        />
      </section>
    </MarketingPage>
  );
}
