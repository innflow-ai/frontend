import type { Metadata } from "next";
import { AgentLoopMotion } from "@/components/agent-loop-motion";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../framer-migration/page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Agent loop motion | Innflow",
  description:
    "Private validation surface for the CMS_Template icon-selection run.",
  path: "/component-lab/agent-loop",
  noIndex: true,
});

export default function AgentLoopLabPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.intro}>
        <p>Motion validation</p>
        <h1>Icon selection run</h1>
        <span>
          Figma CMS_Template node 534:10184 — eight distinct agents take the
          workspace slot, then reset. Preview is no-index.
        </span>
      </header>
      <section className={styles.section}>
        <h2>Live run</h2>
        <div className={styles.lightCard} style={{ padding: 16 }}>
          <AgentLoopMotion />
        </div>
      </section>
    </main>
  );
}
