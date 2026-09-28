"use client";

import { useState } from "react";
import {
  ArrowDown as MageArrowDown,
  ArrowRight as MageArrowRight,
  Minus as MageMinus,
  Plus as MagePlus,
} from "@/components/icons/mage";
import { TrackedLink } from "@/components/tracked-link";
import { pricingCatalog } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-pricing.module.css";

const plans = Object.values(pricingCatalog.plans);
const { pro, business } = pricingCatalog.plans;
const money = (value: number | null) =>
  value === null ? "Custom" : `$${value.toFixed(value % 1 ? 2 : 0)}`;
const groups = [
  {
    title: "WORKFLOW CAPACITY",
    rows: [
      ["Monthly credits", "monthlyCredits"],
      ["Workspaces", "workspaces"],
      ["Deployed workflows", "deployedWorkflows"],
    ],
  },
  {
    title: "DATA AND HISTORY",
    rows: [
      ["Tables", "tables"],
      ["Rows per table", "rowsPerTable"],
      ["Run history", "runHistory"],
    ],
  },
  {
    title: "ADVANCED CAPABILITIES",
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
export function BaselanePricing() {
  const [annual, setAnnual] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(
    groups.map((group) => group.title),
  );
  const allOpen = expanded.length === groups.length;
  const value = (plan: (typeof plans)[number]) =>
    money(annual ? plan.commitmentMonthlyPrice : plan.monthlyPrice);
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="pricing-title">
          <div className={styles.intro}>
            <div>
              <span className={styles.eyebrow}>INNFLOW PRICING</span>
              <h1 id="pricing-title">
                Less busywork.
                <br />
                More possibilities.
              </h1>
            </div>
            <div className={styles.introDetails}>
              <p>
                Start with your first workflow. Find the right plan to connect
                your tools, automate everyday work, and grow with your team.
              </p>
              <fieldset className={styles.billing}>
                <legend className={styles.srOnly}>Billing term</legend>
                <span className={styles.billingLabel} data-active={!annual}>
                  Monthly
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-label="Annual billing"
                  aria-checked={annual}
                  className={styles.billingSwitch}
                  onClick={() => setAnnual((value) => !value)}
                >
                  <span className={styles.billingThumb} />
                </button>
                <span className={styles.billingLabel} data-active={annual}>
                  Annual
                </span>
                <span className={styles.savings}>Save 15%</span>
              </fieldset>
              <p className={styles.billingNote} aria-live="polite">
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
                  <div className={styles.popular}>MOST POPULAR</div>
                )}
                <div className={styles.planTop}>
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
                  <div
                    className={styles.price}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <strong>{value(plan)}</strong>
                    {plan.monthlyPrice !== null && <span>/month</span>}
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
                  <TrackedLink
                    className={styles.button}
                    destination={
                      index === 3
                        ? siteConfig.contactUrl
                        : siteConfig.googleAuthUrl
                    }
                    eventLabel={`pricing_${plan.name.toLowerCase()}_${index === 3 ? "contact" : "signup"}`}
                    aria-label={
                      index === 3
                        ? "Talk to sales about Enterprise"
                        : `Get started with ${plan.name}`
                    }
                  >
                    {index === 3 ? "Talk to sales" : "Get started"}
                    <span aria-hidden="true">
                      <MageArrowRight size="1em" />
                    </span>
                  </TrackedLink>
                </div>
                <div className={styles.planFeatures}>
                  <p className={styles.includes}>
                    {
                      [
                        "The essentials to get started:",
                        "More capacity, plus premium nodes:",
                        "Higher limits, plus advanced AI:",
                        "A plan built around your team:",
                      ][index]
                    }
                  </p>
                  <h3>
                    {index === 3 ? "Custom capacity" : "Workflow automation"}
                  </h3>
                  <ul>
                    {index === 3 ? (
                      [
                        "Custom monthly credits",
                        "Custom workflow and data capacity",
                        "Security and deployment requirements",
                        "Onboarding and service levels",
                      ].map((feature) => <li key={feature}>{feature}</li>)
                    ) : (
                      <>
                        <li>
                          <strong>{plan.monthlyCredits}</strong> monthly credits
                        </li>
                        <li>
                          {plan.workspaces}{" "}
                          {index === 0 ? "workspace" : "workspaces"}
                        </li>
                        <li>{plan.deployedWorkflows} deployed workflows</li>
                        <li>{plan.tables} tables</li>
                        <li>{plan.rowsPerTable} rows per table</li>
                        <li>{plan.runHistory} of run history</li>
                        {plan.premiumWorkflowNodes === "Yes" && (
                          <li>Premium workflow nodes</li>
                        )}
                        {plan.exclusiveAiModels === "Yes" && (
                          <li>Exclusive AI models</li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <a className={styles.compareLink} href="#compare-features">
            Compare all features{" "}
            <span aria-hidden="true">
              <MageArrowDown size="1em" />
            </span>
          </a>
        </section>
        <section id="compare-features" className={styles.comparison}>
          <h2>Compare features</h2>
          <div className={styles.compareControls}>
            <button
              className={styles.outline}
              type="button"
              onClick={() =>
                setExpanded(allOpen ? [] : groups.map((g) => g.title))
              }
            >
              {allOpen ? "Collapse all features" : "Expand all features"}
            </button>
            <p>Scroll across on smaller screens to compare all four plans.</p>
          </div>
          {groups.map((group) => (
            <div className={styles.group} key={group.title}>
              <button
                type="button"
                className={styles.groupToggle}
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
                {group.title}
                <span aria-hidden="true">
                  {expanded.includes(group.title) ? (
                    <MageMinus size="1em" />
                  ) : (
                    <MagePlus size="1em" />
                  )}
                </span>
              </button>
              <div
                id={group.title.replaceAll(" ", "-")}
                hidden={!expanded.includes(group.title)}
              >
                {/* Keyboard access to the horizontally scrollable comparison. */}
                <section
                  className={styles.tableScroll}
                  aria-label={`${group.title.toLowerCase()} comparison`} // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access to horizontal scrolling
                  tabIndex={0}
                >
                  <table>
                    <caption className={styles.srOnly}>
                      {group.title} by innflow plan
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Feature</th>
                        {plans.map((plan) => (
                          <th key={plan.name} scope="col">
                            {plan.name}
                            <small>
                              {value(plan)}
                              {plan.monthlyPrice !== null ? "/mo." : ""}
                            </small>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map(([label, key]) => (
                        <tr key={key}>
                          <th scope="row">{label}</th>
                          {plans.map((plan) => (
                            <td key={plan.name}>{plan[key]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
          ))}
        </section>
        <section className={styles.terms}>
          <h2>Simple, transparent choices.</h2>
          <p>Know what your plan covers before you start.</p>
          <div>
            {[
              [
                "Monthly plans",
                "Pay the standard monthly rate without choosing an annual plan.",
              ],
              [
                "Annual plans",
                "Choose an annual commitment, billed monthly at the lower annual rate.",
              ],
              [
                "Usage",
                "Credits reflect workflow and AI actions. Different actions can use different amounts.",
              ],
              [
                "Enterprise",
                "Discuss custom requirements and service levels directly with the team.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.faq}>
          <div>
            <span className={styles.eyebrow}>A LITTLE MORE CLARITY</span>
            <h2>Frequently asked questions</h2>
            <p className={styles.faqIntro}>
              Need help choosing?{" "}
              <a href={siteConfig.contactUrl}>Talk to our team.</a>
            </p>
          </div>
          <div>
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
