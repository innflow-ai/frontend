"use client";

import { useState } from "react";
import {
  Database,
  ArrowDown as MageArrowDown,
  Minus as MageMinus,
  Plus as MagePlus,
  Share,
  StarsA,
} from "@/components/icons/mage";
import { TrackedLink } from "@/components/tracked-link";
import { pricingCatalog } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import styles from "./baselane-pricing.module.css";
import { InnerPageShell } from "./inner-page-shell";

const plans = Object.values(pricingCatalog.plans);
const { pro, business } = pricingCatalog.plans;
const money = (value: number | null) =>
  value === null ? "Custom" : `$${value.toFixed(value % 1 ? 2 : 0)}`;
const groups = [
  {
    title: "WORKFLOW CAPACITY",
    label: "Workflow capacity",
    icon: Share,
    rows: [
      ["Monthly credits", "monthlyCredits"],
      ["Workspaces", "workspaces"],
      ["Deployed workflows", "deployedWorkflows"],
    ],
  },
  {
    title: "DATA AND HISTORY",
    label: "Data and history",
    icon: Database,
    rows: [
      ["Tables", "tables"],
      ["Rows per table", "rowsPerTable"],
      ["Run history", "runHistory"],
    ],
  },
  {
    title: "ADVANCED CAPABILITIES",
    label: "Advanced capabilities",
    icon: StarsA,
    rows: [
      ["Premium workflow nodes", "premiumWorkflowNodes"],
      ["Exclusive AI models", "exclusiveAiModels"],
    ],
  },
] as const;
const questions = [
  [
    "What are innflow credits?",
    "Credits measure usage across supported workflow and AI actions. Usage depends on the action and model involved, so consider both run volume and workflow complexity.",
  ],
  [
    "How does annual pricing work?",
    `Annual plans are billed monthly at the lower annual rate: ${money(pro.commitmentMonthlyPrice)} for Pro or ${money(business.commitmentMonthlyPrice)} for Business. Monthly plans remain available at the standard rate. Prices are in USD.`,
  ],
  [
    "Can I change plans later?",
    "You can move between Free, Pro, and Business as your usage changes. Contact the team if your requirements extend beyond the published plans.",
  ],
  [
    "When should I choose Business?",
    `Business includes ${business.monthlyCredits} monthly credits, unlimited workspaces, workflows, and tables, plus exclusive AI models. Compare this with the capacity your team needs.`,
  ],
  [
    "What is included with Enterprise?",
    "Enterprise plans are scoped around custom credit volume, rate limits, seats, security requirements, deployment needs, onboarding, and service levels.",
  ],
];
type Plan = (typeof plans)[number];

function PlanLink({
  plan,
  compact = false,
}: {
  plan: Plan;
  compact?: boolean;
}) {
  const enterprise = plan.name === "Enterprise";
  const featured = plan.name === "Pro";
  return (
    <TrackedLink
      className={`${styles.button} ${compact ? styles.compactButton : ""} ${featured ? styles.primaryButton : ""}`}
      destination={
        enterprise ? siteConfig.contactUrl : siteConfig.googleAuthUrl
      }
      eventLabel={`pricing_${plan.name.toLowerCase()}_${enterprise ? "contact" : "signup"}`}
      aria-label={
        enterprise
          ? "Talk to sales about Enterprise"
          : `Get started with ${plan.name}`
      }
    >
      {enterprise ? "Talk to sales" : "Get started"}
      {!compact && (
        // biome-ignore lint/performance/noImgElement: Exact, local Figma control asset.
        <img
          src={`/pricing/figma/arrow-right${featured ? "-light" : ""}.svg`}
          alt=""
          width={24}
          height={24}
        />
      )}
    </TrackedLink>
  );
}

function FeatureValue({ value }: { value: string }) {
  if (value === "Yes")
    return (
      <>
        {/* biome-ignore lint/performance/noImgElement: Exact local 20px comparison icon. */}
        <img
          className={styles.includedIcon}
          src="/pricing/figma/included.svg"
          alt=""
          width={20}
          height={20}
        />
        <span className={styles.srOnly}>Included</span>
      </>
    );
  if (value === "No")
    return (
      <>
        <span aria-hidden="true">·</span>
        <span className={styles.srOnly}>Not included</span>
      </>
    );
  return value;
}

export function BaselanePricing() {
  const [annual, setAnnual] = useState(true);
  const [expanded, setExpanded] = useState<string[]>(
    groups.map((group) => group.title),
  );
  const allOpen = expanded.length === groups.length;
  const value = (plan: Plan) =>
    money(annual ? plan.commitmentMonthlyPrice : plan.monthlyPrice);
  return (
    <InnerPageShell>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="pricing-title">
          <div className={styles.intro}>
            <h1 id="pricing-title">
              Less busywork.
              <br />
              More possibilities.
            </h1>
            <div className={styles.introDetails}>
              <p>
                Connect your tools, automate everyday work, and give your team
                more room to grow. Find the plan that fits.
              </p>
              <fieldset
                className={styles.billing}
                aria-describedby="billing-note"
              >
                <legend className={styles.srOnly}>Billing term</legend>
                <label>
                  <input
                    type="radio"
                    name="billing"
                    value="monthly"
                    checked={!annual}
                    onChange={() => setAnnual(false)}
                  />
                  Monthly
                </label>
                <span className={styles.billingDivider} aria-hidden="true" />
                <label>
                  <input
                    type="radio"
                    name="billing"
                    value="annual"
                    checked={annual}
                    onChange={() => setAnnual(true)}
                  />
                  Annual commitment
                </label>
                <span className={styles.savings}>Save 15%</span>
              </fieldset>
              <p
                id="billing-note"
                className={styles.billingNote}
                aria-live="polite"
              >
                {annual
                  ? "Annual commitment, billed monthly. All prices in USD."
                  : "No annual commitment. All prices in USD."}
              </p>
            </div>
          </div>
          <nav className={styles.planNav} aria-label="Jump to a plan">
            {plans.map((plan) => (
              <a key={plan.name} href={`#plan-${plan.name.toLowerCase()}`}>
                {plan.name}
              </a>
            ))}
          </nav>
          <div className={styles.planGrid}>
            {plans.map((plan, index) => (
              <article
                id={`plan-${plan.name.toLowerCase()}`}
                className={`${styles.plan} ${index === 1 ? styles.featured : ""}`}
                key={plan.name}
                aria-label={`${plan.name} plan`}
              >
                {index === 1 && (
                  <div className={styles.popular}>POPULAR PLAN</div>
                )}
                <div className={styles.planTop}>
                  <div>
                    <h2>{plan.name}</h2>
                    <p className={styles.planDescription}>
                      {
                        [
                          "Build your first workflows and see what’s possible.",
                          "Put everyday work on autopilot, with room to grow.",
                          "Scale connected workflows across your team.",
                          "Shape a plan around your organization’s needs.",
                        ][index]
                      }
                    </p>
                  </div>
                  <div>
                    <div
                      className={styles.price}
                      data-free={index === 0}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <strong>
                        {index === 0 ? "Always free" : value(plan)}
                      </strong>
                      {index > 0 && index < 3 && <span>/month</span>}
                    </div>
                    <p className={styles.planNote}>
                      {index === 0
                        ? "Free to get started"
                        : index === 3
                          ? "Let’s find the right fit"
                          : annual
                            ? "Annual plan, billed monthly"
                            : "Billed monthly"}
                    </p>
                    <PlanLink plan={plan} />
                  </div>
                </div>
                <div className={styles.planFeatures}>
                  <p className={styles.includes}>
                    {
                      [
                        "Includes:",
                        "More capacity, plus premium nodes:",
                        "Higher limits, plus advanced AI:",
                        "A plan built around your team:",
                      ][index]
                    }
                  </p>
                  {groups.map((group, groupIndex) => (
                    <div className={styles.featureSection} key={group.title}>
                      <h3>
                        <span
                          className={styles.featureIcon}
                          data-category={groupIndex}
                        >
                          <group.icon size={16} />
                        </span>
                        {
                          ["Workflows", "Data & history", "AI & capabilities"][
                            groupIndex
                          ]
                        }
                      </h3>
                      <ul>
                        {group.rows.map(([label, key]) => (
                          <li key={key} data-unavailable={plan[key] === "No"}>
                            {plan[key] === "Yes" || plan[key] === "No" ? (
                              label
                            ) : (
                              <>
                                <strong>{plan[key]}</strong>{" "}
                                {key === "workspaces" && plan[key] === "1"
                                  ? "workspace"
                                  : label.toLowerCase()}
                              </>
                            )}
                            {plan[key] === "No" && (
                              <span className={styles.srOnly}>
                                {" "}
                                (not included)
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {index === 3 && (
                    <p className={styles.enterpriseNote}>
                      Talk with us about security, deployment, onboarding, and
                      service levels.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
          <a className={styles.compareLink} href="#compare-features">
            Compare all features <MageArrowDown size={18} />
          </a>
        </section>
        <section
          id="compare-features"
          className={styles.comparison}
          aria-labelledby="comparison-title"
        >
          <h2 id="comparison-title">Compare features</h2>
          <div className={styles.compareControls}>
            <button
              className={styles.outline}
              type="button"
              onClick={() =>
                setExpanded(allOpen ? [] : groups.map((g) => g.title))
              }
            >
              {allOpen ? "Collapse all features" : "Expand all features"}
              {allOpen ? <MageMinus size={16} /> : <MagePlus size={16} />}
            </button>
            <p>
              All plans in USD. Scroll across to compare on smaller screens.
            </p>
          </div>
          <section
            className={styles.tableScroll}
            aria-label="Plan feature comparison"
            // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard access to horizontal comparison scrolling.
            tabIndex={0}
            data-lenis-prevent
          >
            <div className={styles.comparisonInner}>
              <div className={styles.comparePlans}>
                <span className={styles.comparePlanLabel}>Find your fit</span>
                {plans.map((plan) => (
                  <div key={plan.name}>
                    <h3>{plan.name}</h3>
                    <p>
                      {value(plan)}
                      {plan.monthlyPrice !== null ? "/mo." : ""}
                    </p>
                    <PlanLink plan={plan} compact />
                  </div>
                ))}
              </div>
              {groups.map((group) => (
                <div className={styles.group} key={group.title}>
                  <button
                    type="button"
                    className={styles.groupToggle}
                    aria-label={group.title}
                    aria-expanded={expanded.includes(group.title)}
                    aria-controls={group.title.replaceAll(" ", "-")}
                    onClick={() =>
                      setExpanded((old) =>
                        old.includes(group.title)
                          ? old.filter((t) => t !== group.title)
                          : [...old, group.title],
                      )
                    }
                  >
                    <span>
                      <group.icon size={28} />
                      {group.label}
                    </span>
                    {expanded.includes(group.title) ? (
                      <MageMinus size={18} />
                    ) : (
                      <MagePlus size={18} />
                    )}
                  </button>
                  <div
                    id={group.title.replaceAll(" ", "-")}
                    hidden={!expanded.includes(group.title)}
                  >
                    <table>
                      <caption className={styles.srOnly}>
                        {group.title} by Innflow plan
                      </caption>
                      <thead className={styles.srOnly}>
                        <tr>
                          <th scope="col">Feature</th>
                          {plans.map((plan) => (
                            <th key={plan.name} scope="col">
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map(([label, key]) => (
                          <tr key={key}>
                            <th scope="row">{label}</th>
                            {plans.map((plan) => (
                              <td key={plan.name}>
                                <FeatureValue value={plan[key]} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
        <section className={styles.faq} aria-labelledby="faq-title">
          <h2 id="faq-title">Frequently asked questions</h2>
          <div className={styles.questions}>
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  <span className={styles.faqSymbol} aria-hidden="true" />
                  {question}
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <p className={styles.faqIntro}>
            Need help choosing?{" "}
            <a href={siteConfig.contactUrl}>Talk to our team.</a>
          </p>
        </section>
      </div>
    </InnerPageShell>
  );
}
