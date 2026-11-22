import Script from "next/script";
import { createElement } from "react";
import { MixedHeadingContent } from "@/components/section-heading";
import styles from "./homepage-agent-showcase.module.css";

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
            <h2 id="agent-showcase-heading" data-mixed-heading>
              <MixedHeadingContent
                title="Let experts"
                emphasis={<strong>build the agents</strong>}
              />
            </h2>
          </header>

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
