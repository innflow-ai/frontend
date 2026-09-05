"use client";

import { useState } from "react";
import styles from "@/app/pricing/pricing.module.css";
import { TrackedLink } from "@/components/tracked-link";
import { pricingCatalog } from "@/config/pricing";
import { siteConfig } from "@/config/site";

type BillingCycle = "commitment" | "monthly";

const { free, pro, business } = pricingCatalog.plans;

const PRO_FEATURES = [
  `${pro.workspaces} workspaces`,
  `${pro.deployedWorkflows.toLowerCase()} deployed workflows`,
  `${pro.tables} tables`,
  `${pro.rowsPerTable} rows per table`,
  `${pro.runHistory} of run history`,
  "Premium workflow nodes",
] as const;

const BUSINESS_FEATURES = [
  `${business.workspaces} workspaces`,
  `${business.deployedWorkflows.toLowerCase()} deployed workflows`,
  `${business.tables.toLowerCase()} tables`,
  `${business.rowsPerTable} rows per table`,
  `${business.runHistory} of run history`,
  "Premium workflow nodes and exclusive AI models",
] as const;

function displayPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function PaidPlanCard({
  accent,
  badge,
  billing,
  description,
  features,
  name,
  monthlyCredits,
  monthlyPrice,
  commitmentMonthlyPrice,
}: {
  accent: "blue" | "gold";
  badge: string;
  billing: BillingCycle;
  description: string;
  features: readonly string[];
  name: "Pro" | "Business";
  monthlyCredits: string;
  monthlyPrice: number;
  commitmentMonthlyPrice: number;
}) {
  const price =
    billing === "commitment" ? commitmentMonthlyPrice : monthlyPrice;

  return (
    <article
      id={`plan-${name.toLowerCase()}`}
      className={`${styles.planCard} ${styles[accent]}`}
    >
      <div className={styles.planHeader}>
        <div className={styles.planTitleRow}>
          <h2>{name}</h2>
          <span className={styles.badge}>{badge}</span>
        </div>
        <p className={styles.planDescription}>{description}</p>
        <div className={styles.priceLine} aria-live="polite" aria-atomic="true">
          <strong>{displayPrice(price)}</strong>
          <span>/ month</span>
        </div>
        <p className={styles.billingNote}>
          {billing === "commitment"
            ? "Annual plan, billed monthly"
            : "Month to month"}
        </p>
      </div>

      <div className={styles.creditBlock}>
        <p>
          <strong>{monthlyCredits}</strong> monthly credits
        </p>
      </div>

      <TrackedLink
        aria-label={`Get started with ${name}`}
        className={styles.planCta}
        destination={siteConfig.signupUrl}
        eventLabel={`pricing_${name.toLowerCase()}_signup`}
      >
        Get started <span aria-hidden="true">↗</span>
      </TrackedLink>

      <ul className={styles.featureList}>
        {features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PricingConfigurator() {
  const [billing, setBilling] = useState<BillingCycle>("commitment");

  return (
    <>
      <fieldset className={styles.billingToggle}>
        <legend className={styles.visuallyHidden}>Billing frequency</legend>
        <button
          aria-pressed={billing === "commitment"}
          className={
            billing === "commitment" ? styles.activeBilling : undefined
          }
          onClick={() => setBilling("commitment")}
          type="button"
        >
          Annual plan
          <span>Save 15%</span>
        </button>
        <button
          aria-pressed={billing === "monthly"}
          className={billing === "monthly" ? styles.activeBilling : undefined}
          onClick={() => setBilling("monthly")}
          type="button"
        >
          Monthly
        </button>
      </fieldset>

      <p className={styles.billingExplanation}>
        {billing === "commitment"
          ? "Save 15% with an annual plan. Payments are made monthly."
          : "Monthly pricing, with no annual commitment."}
        <span>All prices in USD.</span>
      </p>
      <nav className={styles.planJumpNav} aria-label="Jump to a plan">
        <a href="#plan-free">Free</a>
        <a href="#plan-pro">Pro</a>
        <a href="#plan-business">Business</a>
      </nav>

      <div className={styles.planGrid}>
        <article id="plan-free" className={`${styles.planCard} ${styles.free}`}>
          <div className={styles.planHeader}>
            <div className={styles.planTitleRow}>
              <h2>Free</h2>
            </div>
            <p className={styles.planDescription}>
              Explore Innflow and build your first workflows with a focused
              monthly credit allowance.
            </p>
            <div className={styles.priceLine}>
              <strong>$0</strong>
              <span>/ month</span>
            </div>
            <p className={styles.billingNote}>No paid plan required</p>
          </div>
          <div className={styles.creditBlock}>
            <p>
              <strong>{free.monthlyCredits}</strong> monthly credits
            </p>
          </div>
          <TrackedLink
            aria-label="Get started with Free"
            className={styles.planCta}
            destination={siteConfig.signupUrl}
            eventLabel="pricing_free_signup"
          >
            Get started <span aria-hidden="true">↗</span>
          </TrackedLink>
          <ul className={styles.featureList}>
            {[
              `${free.workspaces} workspace`,
              `${free.deployedWorkflows} deployed workflows`,
              `${free.tables} tables`,
              `${free.rowsPerTable} rows per table`,
              `${free.runHistory} of run history`,
            ].map((feature) => (
              <li key={feature}>
                <span aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </article>

        <PaidPlanCard
          accent="blue"
          badge="Most popular"
          billing={billing}
          description="For individual operators and growing teams putting recurring workflows into action."
          features={PRO_FEATURES}
          name="Pro"
          monthlyCredits={pro.monthlyCredits}
          monthlyPrice={pro.monthlyPrice}
          commitmentMonthlyPrice={pro.commitmentMonthlyPrice}
        />

        <PaidPlanCard
          accent="gold"
          badge="Best value"
          billing={billing}
          description="For teams running higher-volume automation with more capacity and advanced AI capabilities."
          features={BUSINESS_FEATURES}
          name="Business"
          monthlyCredits={business.monthlyCredits}
          monthlyPrice={business.monthlyPrice}
          commitmentMonthlyPrice={business.commitmentMonthlyPrice}
        />
      </div>
      <a className={styles.compareLink} href="#compare-plans">
        Compare all features <span aria-hidden="true">↓</span>
      </a>
    </>
  );
}
