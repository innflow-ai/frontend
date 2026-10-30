import Script from "next/script";
import { createElement } from "react";
import styles from "./homepage-agent-showcase.module.css";
import { TrackedLink } from "./tracked-link";

const capabilities = [
  ["app-triggers", "App triggers"],
  ["recurring-tasks", "Recurring tasks"],
  ["connectors", "400+ Connectors"],
  ["skills", "Skills"],
  ["artifact-building", "Artifact building"],
  ["image-generation", "Image generation"],
  ["self-improvement", "Self-improvement"],
] as const;

/** Embed the supplied portable HTML component without duplicating its UI or state. */
export function HomepageAgentShowcase() {
  return (
    <section
      id="agent-showcase"
      className={styles.section}
      aria-labelledby="agent-showcase-heading"
    >
      <div className={styles.container}>
        <div className={styles.copy}>
          <header className={styles.heading}>
            <h2 id="agent-showcase-heading">
              Let your experts <br />
              build the agents
            </h2>
          </header>
          <p className={styles.description}>
            Understanding a task is the only prerequisite to automating it. Let
            your team who already understand the problem build the necessary
            agents. No learning curve involved.
          </p>
          <div className={styles.actions}>
            <TrackedLink
              destination="/products/ai-agents"
              eventLabel="homepage_agent_showcase_explore"
              className={styles.primaryButton}
            >
              Explore agents
            </TrackedLink>
            <TrackedLink
              destination="https://docs.innflow.ai"
              eventLabel="homepage_agent_showcase_docs"
              className={styles.secondaryButton}
            >
              Read docs
            </TrackedLink>
          </div>
          <ul className={styles.capabilities} aria-label="Agent capabilities">
            {capabilities.map(([icon, label]) => (
              <li key={icon}>
                {/* biome-ignore lint/performance/noImgElement: Tiny local SVG preserves the reference's intrinsic dimensions. */}
                <img
                  src={`/components/agent-showcase/section-icons/${icon}.svg`}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.component}>
          {createElement("innflow-agent-showcase", { agent: "research" })}
          <noscript>
            <p>
              Enable JavaScript to explore the Research, Content, Ad Spend,
              Pipeline, Support, and Finance agent examples.
            </p>
          </noscript>
        </div>
      </div>
      <Script
        src="/components/agent-showcase/agent-showcase.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
