"use client";

import Image from "next/image";
import { useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import styles from "./baselane-customers.module.css";
import { BaselaneHomepage } from "./baselane-homepage";

const workflows = [
  [
    "Maintenance coordination",
    "Connect the request, property details, and assigned owner before the next handoff.",
    "/property-management",
  ],
  [
    "Resident follow-up",
    "Keep questions and supporting context together so your team can prepare a useful response.",
    "/BL/BL-renters",
  ],
  [
    "Document preparation",
    "Gather missing records and track the review steps before sharing a prepared package.",
    "/BL/BL-tax-preparation",
  ],
  [
    "Recurring property work",
    "Give routine tasks a consistent path with visible ownership and human review.",
    "/BL/BL-rent-collection",
  ],
  [
    "Portfolio context",
    "Keep each property’s records close to its requests, decisions, and next actions.",
    "/BL/BL-multi-property-investors",
  ],
  [
    "Advisor handoffs",
    "Bring open questions and supporting documents into the same client conversation.",
    "/BL/BL-advisor-partner-program",
  ],
];
const scenarios = [
  [
    "A new maintenance request",
    "From request to assigned work",
    "A resident reports an issue. Bring the property record and relevant procedure alongside the request, assign the next step, and include a review where a decision is needed.",
    "/property-management",
  ],
  [
    "A document review",
    "Prepare a handoff your advisor can follow",
    "Start with the property checklist. Gather supporting records, give missing items an owner, and keep the team’s review notes with the prepared information.",
    "/BL/BL-tax-preparation",
  ],
  [
    "A growing portfolio",
    "Keep context as the work expands",
    "Organize requests around the right property. Give recurring processes consistent steps so your team can follow progress across the portfolio.",
    "/BL/BL-multi-property-investors",
  ],
  [
    "A recurring resident question",
    "Start with the information you already have",
    "Connect your procedures and working records to the question. Use that context to prepare a response and let the responsible person review the next action.",
    "/BL/BL-renters",
  ],
];

export function BaselaneCustomers() {
  const [caseIndex, setCaseIndex] = useState(0);
  const story = scenarios[caseIndex];
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <Image
            src="/brand/baselane-inspired/hero.webp"
            alt="A person kayaking on clear water"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroCopy}>
            <h1>Your people. Your properties. One connected flow.</h1>
            <p>
              innflow brings workflows, knowledge, and approvals together for
              the people keeping property operations moving.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href="#team-workflows">
                Explore team workflows
              </a>
              <a className={styles.outline} href={siteConfig.demoUrl}>
                Book a demo →
              </a>
            </div>
          </div>
        </section>
        <div className={styles.band}>
          <span>Clear ownership. Shared context. Visible progress.</span>
          <a href="/BL/BL-multi-property-investors">
            Explore portfolio operations →
          </a>
        </div>
        <section className={styles.section} id="team-workflows">
          <h2>Built around the work on your team’s desk.</h2>
          <p className={styles.lead}>
            Start with a recurring process. Connect the information behind it
            and make the next handoff clear.
          </p>
          <div className={styles.reviews}>
            {workflows.map(([title, text, href]) => (
              <article key={title}>
                <span className={styles.eyebrow}>WORKFLOW</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href={href}>Explore the workflow →</a>
              </article>
            ))}
          </div>
        </section>
        <section
          className={styles.caseSection}
          id="case-studies"
          aria-label="Example property workflows"
        >
          <div className={styles.case} aria-live="polite">
            <div className={styles.casePhoto}>
              <Image
                src="/brand/baselane-inspired/loans/property.webp"
                alt="A property owner reviewing information on a phone"
                fill
                sizes="(max-width:700px) 100vw, 50vw"
              />
              <div className={styles.caseBadge}>
                <strong>{story[0]}</strong>
                <span>Illustrative workflow</span>
              </div>
            </div>
            <div className={styles.caseCopy}>
              <span className={styles.eyebrow}>HOW THE WORK CONNECTS</span>
              <h2>{story[1]}</h2>
              <p>{story[2]}</p>
              <a className={styles.button} href={story[3]}>
                Explore with innflow →
              </a>
            </div>
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              aria-label="Previous workflow"
              onClick={() =>
                setCaseIndex(
                  (caseIndex + scenarios.length - 1) % scenarios.length,
                )
              }
            >
              ←
            </button>
            <span aria-live="polite">
              {caseIndex + 1} / {scenarios.length}
            </span>
            <button
              type="button"
              aria-label="Next workflow"
              onClick={() => setCaseIndex((caseIndex + 1) % scenarios.length)}
            >
              →
            </button>
          </div>
        </section>
        <section className={styles.closing}>
          <picture>
            <source
              media="(max-width:700px)"
              srcSet="/brand/baselane-inspired/partners/closing-mobile.webp"
            />
            <Image
              src="/brand/baselane-inspired/partners/closing-desktop.webp"
              alt=""
              fill
              sizes="100vw"
            />
          </picture>
          <div>
            <h2>Make room for your next idea.</h2>
            <p>Bring your team’s recurring work into one connected flow.</p>
            <div className={styles.actions}>
              <a className={styles.outline} href={siteConfig.demoUrl}>
                Explore innflow →
              </a>
              <a className={styles.button} href={siteConfig.googleAuthUrl}>
                <GoogleCtaContent />
              </a>
            </div>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
