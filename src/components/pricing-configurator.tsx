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
    <article className={`${styles.planCard} ${styles[accent]}`}>
      <span className={styles.badge}>{badge}</span>
      <div className={styles.planHeader}>
        <p className={styles.planEyebrow}>{name}</p>
        <h2>{name}</h2>
        <p className={styles.billingNote}>
          {billing === "commitment"
            ? "12-month commitment, billed monthly"
            : "Month to month"}
        </p>
        <div className={styles.priceLine} aria-live="polite">
          <strong>{displayPrice(price)}</strong>
          <span>/ month</span>
        </div>
        <p className={styles.planDescription}>{description}</p>
      </div>

      <div className={styles.creditBlock}>
        <p>
          <strong>{monthlyCredits}</strong> monthly credits
        </p>
      </div>

      <TrackedLink
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
          12-month commitment
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

      <div className={styles.planGrid}>
        <article className={`${styles.planCard} ${styles.free}`}>
          <div className={styles.planHeader}>
            <p className={styles.planEyebrow}>Free</p>
            <h2>Free</h2>
            <div className={styles.priceLine}>
              <strong>$0</strong>
              <span>/ month</span>
            </div>
            <p className={styles.planDescription}>
              For individuals exploring Innflow with a focused monthly credit
              allowance.
            </p>
          </div>
          <div className={styles.creditBlock}>
            <p>
              <strong>{free.monthlyCredits}</strong> monthly credits
            </p>
          </div>
          <TrackedLink
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
          description="For solo operators and growing teams scaling complex workflows across their operation."
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
          description="For teams running automation at scale with higher capacity and advanced AI capabilities."
          features={BUSINESS_FEATURES}
          name="Business"
          monthlyCredits={business.monthlyCredits}
          monthlyPrice={business.monthlyPrice}
          commitmentMonthlyPrice={business.commitmentMonthlyPrice}
        />
      </div>
    </>
  );
}
