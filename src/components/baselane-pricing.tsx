"use client";

import Image from "next/image";
import { useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { pricingCatalog } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { faqs as homepageFaqs } from "@/content/home";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-pricing.module.css";

const plans = Object.values(pricingCatalog.plans);
const { free, pro, business } = pricingCatalog.plans;
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
  ...homepageFaqs.map(({ question, answer }) => [question, answer]),
];
export function BaselanePricing() {
  const [annual, setAnnual] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([groups[0].title]);
  const allOpen = expanded.length === groups.length;
  const value = (plan: (typeof plans)[number]) =>
    money(annual ? plan.commitmentMonthlyPrice : plan.monthlyPrice);
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <picture>
            <source
              media="(max-width:700px)"
              srcSet="/brand/baselane-inspired/pricing/hero-mobile.webp"
            />
            <Image
              src="/brand/baselane-inspired/pricing/hero-desktop.webp"
              alt="House rooftops beneath a blue sky"
              fill
              preload
              sizes="100vw"
            />
          </picture>
          <div className={styles.heroGrid}>
            <div className={styles.intro}>
              <h1>
                Clearer work.
                <br />
                Room to grow.
              </h1>
              <p>
                Choose the workflow capacity you need, with a clear view of
                what’s included.
              </p>
              <fieldset className={styles.billing}>
                <legend>Billing term</legend>
                {[false, true].map((option) => (
                  <label key={String(option)}>
                    <input
                      type="radio"
                      name="billing"
                      checked={annual === option}
                      onChange={() => setAnnual(option)}
                    />
                    {option ? "Annual plan" : "Monthly plan"}
                  </label>
                ))}
              </fieldset>
              <div className={styles.note}>
                <strong>Start with your next workflow.</strong>
                <p>
                  Compare the volume, context, and history your team needs. Move
                  to more capacity as your operations grow.
                </p>
              </div>
            </div>
            {[free, pro].map((plan, index) => (
              <article
                className={`${styles.plan} ${index ? styles.featured : ""}`}
                key={plan.name}
              >
                <span className={styles.eyebrow}>
                  {index ? "MORE ROOM TO AUTOMATE" : "YOUR FIRST WORKFLOWS"}
                </span>
                <h2>{plan.name}</h2>
                <div className={styles.price}>
                  {value(plan)}
                  <span>/mo.</span>
                </div>
                <p className={styles.planDescription}>
                  {index
                    ? "More capacity for connected operations"
                    : "The essentials to get started"}
                </p>
                <a className={styles.button} href={siteConfig.googleAuthUrl}>
                  <GoogleCtaContent />
                </a>
                <span className={styles.eyebrow}>INCLUDED CAPACITY</span>
                <ul>
                  <li>{plan.monthlyCredits} monthly credits</li>
                  <li>
                    {plan.workspaces} {index ? "workspaces" : "workspace"}
                  </li>
                  <li>{plan.deployedWorkflows} deployed workflows</li>
                  <li>{plan.tables} tables</li>
                  <li>{plan.rowsPerTable} rows per table</li>
                  <li>{plan.runHistory} of run history</li>
                  {index === 1 && <li>Premium workflow nodes</li>}
                </ul>
                <small>
                  {annual && index
                    ? "Annual commitment, billed monthly."
                    : "Monthly plan."}{" "}
                  Prices in USD.
                </small>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.growth}>
          <div>
            <span className={styles.eyebrow}>FOR YOUR WHOLE OPERATION</span>
            <h2>Growing beyond Pro?</h2>
            <p>
              Business starts at {value(business)}/month with{" "}
              {business.monthlyCredits} monthly credits. Enterprise brings
              custom capacity for your team.
            </p>
          </div>
          <a className={styles.outline} href={siteConfig.contactUrl}>
            Talk to the team ↗
          </a>
        </section>
        <section className={styles.comparison}>
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
                <span>{expanded.includes(group.title) ? "−" : "+"}</span>
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
        <section className={styles.ocean}>
          <Image
            src="/brand/baselane-inspired/hero.webp"
            alt="A calm coastal bay"
            fill
            sizes="100vw"
          />
          <div>
            <h2>
              Make room for
              <br />
              what’s next.
            </h2>
            <p>Connect the work behind your properties.</p>
            <a className={styles.button} href={siteConfig.demoUrl}>
              Explore a demo ↗
            </a>
          </div>
        </section>
        <section className={styles.useCases}>
          <h2>Find your starting point.</h2>
          <p>Explore the workflows behind different rental operations.</p>
          <div>
            {[
              [
                "Long-term rentals",
                "Keep recurring work moving.",
                "/BL/BL-long-term-rentals",
              ],
              [
                "Mid-term rentals",
                "Give each handoff a clear next step.",
                "/BL/BL-mid-term-rentals",
              ],
              [
                "Short-term rentals",
                "Connect fast-moving operations.",
                "/BL/BL-short-term-rentals",
              ],
              [
                "Multi-property teams",
                "Keep property context close.",
                "/BL/BL-multi-property-investors",
              ],
            ].map(([title, text, href]) => (
              <a key={href} href={href}>
                <h3>{title}</h3>
                <p>{text}</p>
                <span>Explore →</span>
              </a>
            ))}
          </div>
        </section>
        <section className={styles.faq}>
          <h2>FAQs</h2>
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
