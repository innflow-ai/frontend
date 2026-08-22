"use client";

import { useState } from "react";
import styles from "@/app/pricing/pricing.module.css";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

type BillingCycle = "annual" | "monthly";

type PricingStop = {
  credits: string;
  monthlyPrice: number;
  label: string;
};

const PRO_STOPS: readonly PricingStop[] = [
  { credits: "5,000", monthlyPrice: 24.99, label: "5K" },
  { credits: "8,500", monthlyPrice: 39.99, label: "8.5K" },
  { credits: "12,500", monthlyPrice: 54.99, label: "12.5K" },
  { credits: "16,500", monthlyPrice: 69.99, label: "16.5K" },
  { credits: "21,000", monthlyPrice: 84.99, label: "21K" },
  { credits: "26,000", monthlyPrice: 99.99, label: "26K" },
];

const MAX_STOPS: readonly PricingStop[] = [
  { credits: "70,000", monthlyPrice: 249.99, label: "70K" },
  { credits: "120,000", monthlyPrice: 399.99, label: "120K" },
  { credits: "175,000", monthlyPrice: 549.99, label: "175K" },
  { credits: "250,000", monthlyPrice: 749.99, label: "250K" },
  { credits: "350,000", monthlyPrice: 999.99, label: "350K" },
  { credits: "470,000", monthlyPrice: 1299.99, label: "470K" },
];

const PRO_FEATURES = [
  "100–520 daily credit refresh",
  "150–400 sync runs per minute",
  "1,500–4,000 async runs per minute",
  "50–200GB file storage",
  "3–6 workspaces",
  "500–2,000 copilot messages per month",
  "CLI access",
] as const;

const MAX_FEATURES = [
  "1,400–9,400 daily credit refresh",
  "5–15 seats in a shared workspace",
  "1,250–3,000 sync runs per minute",
  "8,600–20,000 async runs per minute",
  "2TB pooled file storage and up",
  "Dedicated Slack channel",
  "Priority support",
] as const;

function displayPrice(price: number, billing: BillingCycle) {
  const billedPrice = billing === "annual" ? price * 0.8 : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(billedPrice);
}

function TierRange({
  id,
  stops,
  value,
  onChange,
}: {
  id: string;
  stops: readonly PricingStop[];
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className={styles.rangeWrap}>
      <input
        aria-label={`${id} credit tier`}
        className={styles.range}
        id={id}
        max={stops.length - 1}
        min={0}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        step={1}
        type="range"
        value={value}
      />
      <div className={styles.rangeLabels} aria-hidden="true">
        {stops.map((stop) => (
          <span key={stop.label}>{stop.label}</span>
        ))}
      </div>
    </div>
  );
}

function PaidPlanCard({
  accent,
  badge,
  billing,
  description,
  features,
  name,
  stops,
}: {
  accent: "blue" | "gold";
  badge: string;
  billing: BillingCycle;
  description: string;
  features: readonly string[];
  name: string;
  stops: readonly PricingStop[];
}) {
  const [tier, setTier] = useState(0);
  const stop = stops[tier];
  const rangeId = `${name.toLowerCase()}-credits`;

  return (
    <article className={`${styles.planCard} ${styles[accent]}`}>
      <span className={styles.badge}>{badge}</span>
      <div className={styles.planHeader}>
        <p className={styles.planEyebrow}>{name}</p>
        <h2>{name === "Pro" ? "Basic" : "Business"}</h2>
        <p className={styles.billingNote}>
          {billing === "annual" ? "Billed annually" : "Billed monthly"}
        </p>
        <div className={styles.priceLine} aria-live="polite">
          <strong>{displayPrice(stop.monthlyPrice, billing)}</strong>
          <span>/ month</span>
        </div>
        <p className={styles.planDescription}>{description}</p>
      </div>

      <div className={styles.creditBlock}>
        <p>
          <strong>{stop.credits}</strong> monthly credits
        </p>
        <TierRange id={rangeId} stops={stops} value={tier} onChange={setTier} />
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
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <>
      <fieldset className={styles.billingToggle}>
        <legend className={styles.visuallyHidden}>Billing frequency</legend>
        <button
          aria-pressed={billing === "annual"}
          className={billing === "annual" ? styles.activeBilling : undefined}
          onClick={() => setBilling("annual")}
          type="button"
        >
          Annually
          <span>Save 20%</span>
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
            <p className={styles.planEyebrow}>Starter</p>
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
              <strong>400</strong> monthly credits
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
              "50-credit daily refresh",
              "5-minute sync run limit",
              "5GB file storage",
              "Public template access",
              "24-hour log retention",
              "CLI access",
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
          stops={PRO_STOPS}
        />

        <PaidPlanCard
          accent="gold"
          badge="Best value"
          billing={billing}
          description="For teams running automation at scale with pooled credits, shared workspaces, and dedicated support."
          features={MAX_FEATURES}
          name="Max"
          stops={MAX_STOPS}
        />
      </div>
    </>
  );
}
