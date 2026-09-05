import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { FaqList, FinalCta, MarketingPage } from "@/components/page-primitives";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions | Innflow",
  description:
    "Answers to common questions about innflow: how agents and workflows work, human review, memory, deployment, security, PMS integrations, and policies.",
  path: "/faq",
});

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <MarketingPage>
      <section className={`section faq-section ${styles.hero}`}>
        <div className={`shell ${styles.layout}`}>
          <div className={`faq-intro ${styles.intro}`}>
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
            />
            <span className="section-label">FAQ</span>
            <h1>Frequently Asked Questions</h1>
          </div>
          <div className={styles.questions}>
            <FaqList items={faqs} />
          </div>
          <aside className={styles.support} aria-label="More help and policies">
            <div className="faq-still">
              <h2>Still have a question?</h2>
              <p>
                <a href={siteConfig.contactUrl}>Contact us!</a> We’ll be happy
                to help you.
              </p>
            </div>
            <div className="faq-policies">
              <h2>Policies</h2>
              <div className="faq-policy-links">
                <Link href="/legal/privacy-policy">Privacy</Link>
                <Link href="/legal/terms-of-service">Terms</Link>
                <Link href="/legal/cookie-policy">Cookies</Link>
                <Link href="/legal/eula">EULA</Link>
                <Link href="/legal/dsar">DSAR</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <FinalCta title="Bring one recurring property operation to the demo." />
      <JsonLd value={faqSchema} />
    </MarketingPage>
  );
}
