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
import {
  annualSavingsPercent,
  maxAnnualSavingsPercent,
  pricingCatalog,
} from "@/config/pricing";
import { siteConfig } from "@/config/site";
import styles from "./baselane-pricing.module.css";
import { InnerPageShell } from "./inner-page-shell";
import { SectionHeading } from "./section-heading";

const plans = Object.values(pricingCatalog.plans);
const { pro, business } = pricingCatalog.plans;
const money = (value: number | null) =>
  value === null
    ? "Custom"
    : `$${value.toLocaleString("en-US", { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
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
      ["Code node", "codeNode"],
      ["Analytics", "analytics"],
    ],
  },
] as const;
const workspaceNote =
  "Workspace availability and limits need confirmation. Enterprise limits shown are starting defaults and can be tailored by agreement.";
const toolGroups = [
  {
    title: "KNOWLEDGE, AGENTS AND CONNECTED WORK",
    label: "Knowledge, agents and connected work",
    note: "With setup: sign-in, permissions and supporting services are required. Rollout: availability depends on your workspace and permissions.",
    rows: [
      ["Files", "With setup", "With setup"],
      ["Knowledge bases", "With setup", "With setup"],
      ["Reusable skills", "With setup", "With setup"],
      ["Scheduled tasks", "With setup + credits", "With setup + credits"],
      ["Workspace agents", "Rollout", "Rollout"],
      ["Channels & personal agent", "Rollout", "Rollout"],
      ["Agent delegation", "Rollout", "Rollout"],
      ["Connected apps", "With permissions", "With permissions"],
    ],
  },
  {
    title: "COMPUTER TOOLS AND COMMUNICATION",
    label: "Computer tools and communication",
    note: "Eligible means a paid plan can qualify, subject to rollout and access approval. It does not mean unlimited computer or AI usage.",
    rows: [
      ["Dedicated cloud computers", "Not included", "Eligible"],
      ["Local computer access", "Approval + desktop", "Approval + desktop"],
      ["Browser sign-in vault", "Beta + authorization", "Beta + authorization"],
      ["Create & send from own mailbox", "Not included", "Eligible + setup"],
      ["Voice input & output", "Rollout + setup", "Rollout + setup"],
      ["Sensitive action approvals", "Requester review", "Requester review"],
    ],
  },
] as const;
const allGroupTitles = [...groups, ...toolGroups].map((group) => group.title);
const questions = [
  [
    "What are Innflow credits?",
    "AI and workflow activity consume credits. Basic includes 500 credits per month, Pro 10,000 and Business 140,000. Credits are not a fixed number of messages.",
  ],
  [
    "How does annual pricing work?",
    `Pay once upfront for 12 months: ${money(pro.commitmentValue)} for Pro or ${money(business.commitmentValue)} for Business. The displayed monthly equivalents are ${money(pro.commitmentMonthlyPrice)} and ${money(business.commitmentMonthlyPrice)}. Monthly plans are ${money(pro.monthlyPrice)} and ${money(business.monthlyPrice)} respectively. Prices are in USD.`,
  ],
  [
    "Are all workspace tools available immediately?",
    "Access to files, knowledge, skills and connected apps depends on account setup and permissions. Agents, channels, delegation and voice also depend on rollout. Computer tools require additional authorization.",
  ],
  [
    "When should I choose Business?",
    "Choose Business for 140,000 monthly credits, unlimited tables, 50,000 rows per table and 90-day run history. Premium workflow nodes, code nodes and analytics support more demanding workflows.",
  ],
  [
    "What is included with Enterprise?",
    "Enterprise uses a custom agreement. Discuss credit capacity and commercial limits with our team. The current starting defaults include 10,000 rows per table and 90-day run history; your agreement can tailor those limits.",
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
      eventLabel={`pricing_${plan.name === "Basic" ? "free" : plan.name.toLowerCase()}_${enterprise ? "contact" : "signup"}`}
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
  const [expanded, setExpanded] = useState<string[]>(allGroupTitles);
  const allOpen = expanded.length === allGroupTitles.length;
  const value = (plan: Plan) =>
    money(annual ? plan.commitmentMonthlyPrice : plan.monthlyPrice);
  return (
    <InnerPageShell>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="pricing-title">
          <SectionHeading
            id="pricing-title"
            level={1}
            title="Pick a plan."
            accent="Your AI team is waiting."
            subtitle="Agents, workflows and knowledge. One workspace."
          >
            <fieldset
              className={styles.billing}
              data-annual={annual}
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

              <label>
                <input
                  type="radio"
                  name="billing"
                  value="annual"
                  checked={annual}
                  onChange={() => setAnnual(true)}
                />
                Yearly{" "}
                <span className={styles.savings}>
                  (up to {maxAnnualSavingsPercent}% off)
                </span>
              </label>
            </fieldset>
            <p
              id="billing-note"
              className={styles.billingNote}
              aria-live="polite"
            >
              {annual
                ? "Billed yearly upfront. Monthly equivalents shown. All prices in USD."
                : "No annual commitment. All prices in USD."}
            </p>
          </SectionHeading>
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
                    <div className={styles.planTitle}>
                      <h2>{plan.name}</h2>
                      {annual &&
                        plan.monthlyPrice !== null &&
                        plan.monthlyPrice > 0 && (
                          <span className={styles.discountTag}>
                            {annualSavingsPercent(
                              plan.monthlyPrice,
                              plan.commitmentMonthlyPrice ?? 0,
                            )}
                            % OFF
                          </span>
                        )}
                    </div>
                    <p className={styles.planDescription}>
                      {
                        [
                          "Explore your AI workspace and build your first workflows.",
                          "Bring more capacity to your agents, knowledge and workflows.",
                          "Scale team automation with higher credit and data limits.",
                          "Shape your workspace and commercial terms around your team.",
                        ][index]
                      }
                    </p>
                  </div>
                  <div>
                    <div
                      className={styles.price}
                      data-custom={index === 3}
                      data-business={index === 2}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <strong>
                        {value(plan).split(".")[0]}
                        {value(plan).includes(".") && (
                          <span className={styles.cents}>
                            .{value(plan).split(".")[1]}
                          </span>
                        )}
                      </strong>
                      {index > 0 && index < 3 && (
                        <span className={styles.priceAside}>
                          {annual && (
                            <>
                              <span className={styles.srOnly}>
                                Regular monthly price{" "}
                              </span>
                              <del>
                                {money(plan.monthlyPrice).split(".")[0]}
                                <span className={styles.oldCents}>
                                  .{money(plan.monthlyPrice).split(".")[1]}
                                </span>
                                <svg
                                  className={styles.priceStrike}
                                  viewBox="0 0 100 28"
                                  preserveAspectRatio="none"
                                  aria-hidden="true"
                                  focusable="false"
                                >
                                  <path d="M1 26 L99 4" />
                                </svg>
                              </del>
                            </>
                          )}
                          <span>/month</span>
                        </span>
                      )}
                    </div>
                    <p className={styles.planNote}>
                      {index === 0
                        ? "No payment required"
                        : index === 3
                          ? "Custom agreement"
                          : annual
                            ? `${money("commitmentValue" in plan ? plan.commitmentValue : null)} billed yearly`
                            : `${money(plan.monthlyPrice)} billed monthly`}
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
                        "More room for your team:",
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
                                {key === "workspaces" ? "*" : ""}
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
          <p className={styles.capacityNote}>
            AI and workflow activity consume credits. Credits are not a fixed
            message count.
            <br />* {workspaceNote}
          </p>
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
              onClick={() => setExpanded(allOpen ? [] : allGroupTitles)}
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
                                <FeatureValue
                                  value={
                                    key === "workspaces"
                                      ? `${plan[key]}*`
                                      : plan[key]
                                  }
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              {toolGroups.map((group) => (
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
                          ? old.filter((title) => title !== group.title)
                          : [...old, group.title],
                      )
                    }
                  >
                    <span>{group.label}</span>
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
                    <p className={styles.groupNote}>{group.note}</p>
                    <table>
                      <caption className={styles.srOnly}>
                        {group.label} by Innflow plan
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className={styles.srOnly}>Feature</span>
                          </th>
                          {plans.map((plan) => (
                            <th scope="col" key={plan.name}>
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map(([label, basic, paid]) => (
                          <tr key={label}>
                            <th scope="row">{label}</th>
                            {plans.map((plan, index) => (
                              <td key={plan.name}>
                                {index === 0 ? basic : paid}
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
          <p className={styles.capacityNote}>
            * {workspaceNote}
            <br />
            Connected tools require the relevant account permissions. Local
            computer access needs owner approval and the desktop app. Voice
            requires provider setup.
          </p>
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
