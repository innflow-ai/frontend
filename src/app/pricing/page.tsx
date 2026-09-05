import { PricingConfigurator } from "@/components/pricing-configurator";
import { Tag } from "@/components/tag";
import { TrackedLink } from "@/components/tracked-link";
import { pricingCatalog } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./pricing.module.css";

export const metadata = createPageMetadata({
  title: "Innflow Pricing | Free, Pro, Business & Enterprise Plans",
  description:
    "Compare Innflow Free, Pro, Business, and Enterprise plans and find the right workflow automation capacity for your team.",
  path: "/pricing",
});

const { free, pro, business, enterprise } = pricingCatalog.plans;
const price = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const comparisonRows = [
  [
    "Monthly plan · per month",
    "$0",
    price(pro.monthlyPrice),
    price(business.monthlyPrice),
    "Custom",
  ],
  [
    "Annual plan · per month",
    "$0",
    price(pro.commitmentMonthlyPrice),
    price(business.commitmentMonthlyPrice),
    "Custom",
  ],
  [
    "Monthly credits",
    free.monthlyCredits,
    pro.monthlyCredits,
    business.monthlyCredits,
    enterprise.monthlyCredits,
  ],
  [
    "Workspaces",
    free.workspaces,
    pro.workspaces,
    business.workspaces,
    enterprise.workspaces,
  ],
  [
    "Deployed workflows",
    free.deployedWorkflows,
    pro.deployedWorkflows,
    business.deployedWorkflows,
    enterprise.deployedWorkflows,
  ],
  ["Tables", free.tables, pro.tables, business.tables, enterprise.tables],
  [
    "Rows per table",
    free.rowsPerTable,
    pro.rowsPerTable,
    business.rowsPerTable,
    enterprise.rowsPerTable,
  ],
  [
    "Run history",
    free.runHistory,
    pro.runHistory,
    business.runHistory,
    enterprise.runHistory,
  ],
  [
    "Premium workflow nodes",
    free.premiumWorkflowNodes,
    pro.premiumWorkflowNodes,
    business.premiumWorkflowNodes,
    enterprise.premiumWorkflowNodes,
  ],
  [
    "Exclusive AI models",
    free.exclusiveAiModels,
    pro.exclusiveAiModels,
    business.exclusiveAiModels,
    enterprise.exclusiveAiModels,
  ],
] as const;

const comparisonPlanKeys = ["free", "pro", "business", "enterprise"] as const;
const comparisonPlanIndex = {
  free: 0,
  pro: 1,
  business: 2,
  enterprise: 3,
} as const;

const faqs = [
  {
    question: "What are Innflow credits?",
    answer:
      "Credits measure usage across supported workflow and AI actions. The amount used depends on the action and model involved, so the best plan is based on both run volume and workflow complexity.",
  },
  {
    question: "How does annual pricing work?",
    answer:
      "The annual plan is billed monthly at the lower annual rate: $16.99 for Pro or $169.99 for Business. Monthly billing remains available at the standard rate.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can move between Free, Pro, and Business as your usage changes. Contact the Innflow team if your requirements extend beyond the published plans.",
  },
  {
    question: "When should I choose Business instead of Pro?",
    answer:
      "Business includes 140,000 monthly credits, unlimited workspaces, workflows, and tables, plus exclusive AI models. Pro is a better fit for individual operators and smaller teams.",
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
              Start small. <em>Grow with your workflows.</em>
            </h1>
            <p className={styles.lede}>
              From your first automation to your whole operation. Choose the
              capacity your team needs today.
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

      <section className={styles.section} id="compare-plans">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div>
              <span className="section-label">Comparison</span>
              <h2 id="comparison-heading">Find your fit.</h2>
            </div>
            <p>
              Start with the capacity you need today, then move through the
              published plans as workflow volume grows.
            </p>
          </div>
          <p className={styles.tableHint}>
            Scroll across to compare all four plans.
          </p>
          {/* Keyboard users need to focus this region to scroll the comparison. */}
          <section
            className={styles.tableWrap}
            aria-labelledby="comparison-heading"
            // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access to horizontal scrolling
            tabIndex={0}
          >
            <table className={styles.comparisonTable}>
              <caption className={styles.visuallyHidden}>
                Innflow plan prices and included capacity. Annual plans are
                billed monthly. Prices are in USD.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">
                    Free <span className={styles.planLabel}>$0</span>
                  </th>
                  <th scope="col">
                    Pro <span className={styles.planLabel}>10K credits</span>
                  </th>
                  <th scope="col">
                    Business{" "}
                    <span className={styles.planLabel}>140K credits</span>
                  </th>
                  <th scope="col">
                    Enterprise <span className={styles.planLabel}>Custom</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, ...values]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    {comparisonPlanKeys.map((planKey) => (
                      <td key={`${feature}-${planKey}`}>
                        {values[comparisonPlanIndex[planKey]]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
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
