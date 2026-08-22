import { PricingConfigurator } from "@/components/pricing-configurator";
import { Tag } from "@/components/tag";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./pricing.module.css";

export const metadata = createPageMetadata({
  title: "Innflow Pricing | Free, Pro, Max & Enterprise Plans",
  description:
    "Compare Innflow Free, Pro, Max, and Enterprise plans, choose a monthly credit tier, and find the right workflow automation capacity for your team.",
  path: "/pricing",
});

const comparisonRows = [
  ["Monthly base price", "$0", "$24.99", "$249.99", "Custom"],
  ["Annual monthly equivalent", "$0", "$19.99", "$199.99", "Custom"],
  ["Credits included", "400", "5,000–26,000", "70,000–470,000", "Custom"],
  ["Daily credit refresh", "50", "100–520", "1,400–9,400", "Custom"],
  ["Included seats", "1", "1", "5–15", "Custom"],
  ["Sync runs per minute", "—", "150–400", "1,250–3,000", "Custom"],
  ["Async runs per minute", "—", "1,500–4,000", "8,600–20,000", "Custom"],
  ["File storage", "5GB", "50–200GB", "2TB and up", "Custom"],
  ["Workspaces", "1", "3–6", "Unlimited", "Unlimited"],
  ["Copilot messages / month", "50", "500–2,000", "5,000–25,000", "Custom"],
  ["CODE node", "No", "Higher tiers", "Yes", "Yes"],
  ["Dedicated Slack channel", "No", "No", "Yes", "Yes"],
] as const;

const comparisonPlanKeys = ["starter", "pro", "max", "enterprise"] as const;
const comparisonPlanIndex = {
  starter: 0,
  pro: 1,
  max: 2,
  enterprise: 3,
} as const;

const faqs = [
  {
    question: "What are Innflow credits?",
    answer:
      "Credits measure usage across supported workflow and AI actions. The amount used depends on the action and model involved, so the best plan is based on both run volume and workflow complexity.",
  },
  {
    question: "How does annual billing work?",
    answer:
      "The annual option displays the effective monthly price with a 20% discount. The subscription is billed annually; monthly billing remains available at the standard rate.",
  },
  {
    question: "Can I increase my credit tier later?",
    answer:
      "Yes. Pro and Max are designed with multiple credit tiers so capacity can grow with usage. Contact the Innflow team if your requirements extend beyond the published tiers.",
  },
  {
    question: "When should I choose Max instead of Pro?",
    answer:
      "Max is designed for shared team usage, higher throughput, pooled credits, larger storage requirements, and dedicated support. Pro is a better fit for individual operators and smaller teams.",
  },
  {
    question: "What is included with Enterprise?",
    answer:
      "Enterprise plans are scoped around custom credit volume, rate limits, seats, security requirements, deployment needs, onboarding, and service levels.",
  },
] as const;

export default function PricingPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Tag variant="outline">Pricing</Tag>
            <h1>
              Pricing, <em>tailored to your needs.</em>
            </h1>
            <p className={styles.lede}>
              Flexible plans built to scale—from an individual operator
              exploring automation to teams running high-volume workflows.
            </p>
          </div>
          <PricingConfigurator />
        </div>
      </section>

      <section className={styles.enterprise}>
        <div className={styles.enterpriseInner}>
          <div>
            <span className="section-label">Enterprise</span>
            <h2>Need custom capacity?</h2>
            <p>
              Shape a plan around custom credits, throughput, seats, security,
              deployment, onboarding, and service levels.
            </p>
          </div>
          <TrackedLink
            className="button button-primary"
            destination={siteConfig.demoUrl}
            eventLabel="pricing_enterprise_demo"
          >
            Talk to sales <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div>
              <span className="section-label">Comparison</span>
              <h2>Compare plans.</h2>
            </div>
            <p>
              Start with the capacity you need today, then move through the
              published tiers as workflow volume grows.
            </p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">
                    Starter <span className={styles.planLabel}>Free</span>
                  </th>
                  <th scope="col">
                    Basic <span className={styles.planLabel}>Pro</span>
                  </th>
                  <th scope="col">
                    Business <span className={styles.planLabel}>Max</span>
                  </th>
                  <th scope="col">
                    Enterprise <span className={styles.planLabel}>Custom</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, ...values]) => (
                  <tr key={feature}>
                    <td>{feature}</td>
                    {comparisonPlanKeys.map((planKey) => (
                      <td key={`${feature}-${planKey}`}>
                        {values[comparisonPlanIndex[planKey]]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} id="faq">
        <div className={`${styles.sectionInner} ${styles.faqGrid}`}>
          <div>
            <span className="section-label">FAQ</span>
            <h2>Pricing, without the guesswork.</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
