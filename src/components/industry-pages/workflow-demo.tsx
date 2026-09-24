"use client";

import Image from "next/image";
import { useState } from "react";
import type { IndustryPageContent } from "@/content/industries";
import styles from "./industry-pages.module.css";

export function WorkflowDemo({ page }: { page: IndustryPageContent }) {
  const [active, setActive] = useState(0);
  const notes = [
    page.request,
    `Prepare a clear handoff for ${page.team.toLowerCase()}. Keep the original request close to the work.`,
    "Your team reviews the prepared context and decides what happens next.",
  ];
  return (
    <section
      className={styles.demo}
      aria-label={`${page.name} workflow example`}
    >
      <div className={styles.demoTop}>
        <span className={styles.statusDot} />
        {page.team}
        <span>Example workflow</span>
      </div>
      <div className={styles.request}>
        <span className={styles.eyebrow}>Incoming request</span>
        <p>{page.request}</p>
      </div>
      <div className={styles.flowLine} aria-hidden="true" />
      <div className={styles.agentCard}>
        <Image
          src="/brand/innflow-wordmark.svg"
          alt="Innflow"
          width={92}
          height={27}
        />
        <p>Context, prepared for your team.</p>
        <ol className={styles.steps}>
          {page.steps.map((step, i) => (
            <li key={step}>
              <button
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span>{i + 1}</span>
                {step}
                <b aria-hidden="true">{active === i ? "↗" : "+"}</b>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.demoNote} aria-live="polite">
        <span>0{active + 1} / 03</span>
        <p>{notes[active]}</p>
      </div>
    </section>
  );
}
