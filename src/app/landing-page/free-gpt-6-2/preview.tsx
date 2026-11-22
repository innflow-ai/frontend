"use client";

import { useState } from "react";
import styles from "./promo.module.css";

export function PromoHero() {
  const [warm, setWarm] = useState(false);
  return (
    <header className={styles.hero} data-warm={warm}>
      <div className={styles.copy}>
        <span>Promotion preview</span>
        <h1>GPT-6.2 Sol and GPT-6.2 Astra</h1>
        <p>
          Explore Sol and Astra with a proposed US$200 credit offer. This
          preview shows how the promotion could work in Innflow.
        </p>
        <div className={styles.actions}>
          <a href="#offer" data-site-cta="primary">
            Preview signup offer
          </a>
          <a href="#use-cases" data-site-cta="secondary">
            Explore use cases
          </a>
        </div>
      </div>
      <button
        className={styles.color}
        aria-pressed={warm}
        onClick={() => setWarm(!warm)}
      >
        Warm landscape
      </button>
    </header>
  );
}

const cases = [
  {
    label: "Engineering delivery",
    description: "Follow a change through review and staging.",
    channel: "release-review",
    lines: [
      [
        "Priya",
        "Checkout retries sometimes create two orders. Can we reproduce that in staging?",
      ],
      [
        "Quinn",
        "The second request gets a new key. I’ve added a test that retries the original order.",
      ],
      [
        "Alex",
        "The retry now returns the same order. Ready for release review.",
      ],
    ],
  },
  {
    label: "Creator campaign",
    description: "Keep outreach, replies and terms together.",
    channel: "creator-launch",
    lines: [
      ["Rachel", "Which creators have confirmed a delivery date?"],
      [
        "Quinn",
        "Two have confirmed Friday. One is waiting on the usage terms.",
      ],
      ["Melody", "I’ll review those terms before we send the brief."],
    ],
  },
  {
    label: "Sales follow-up",
    description: "Turn a meeting into decisions and next steps.",
    channel: "account-team",
    lines: [
      ["Fred", "What did we agree to on the demo call?"],
      [
        "Quinn",
        "The buyer requested a sample report. Tuesday was proposed for the review.",
      ],
      ["Rachel", "I’ll send the report and ask them to confirm Tuesday."],
    ],
  },
];
export function UseCases() {
  const [selected, setSelected] = useState(0);
  const example = cases[selected];
  return (
    <section id="use-cases" className={styles.cases} aria-label="Use cases">
      <div className={styles.options}>
        {cases.map((item, index) => (
          <button
            key={item.label}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </button>
        ))}
      </div>
      <div className={styles.chat} aria-live="polite">
        <h2># {example.channel}</h2>
        {example.lines.map(([name, line]) => (
          <p key={name}>
            <strong>{name}</strong>
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
