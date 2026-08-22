import type { Metadata } from "next";
import {
  ConicGradient,
  RevealText,
  SlackUI,
  SmoothRingGallery,
  TypewriterEffect,
} from "@/components/framer-migrated";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Framer migration component lab | Innflow",
  description:
    "Private validation surface for Innflow's migrated Framer components.",
  path: "/component-lab/framer-migration",
  noIndex: true,
});

export default function FramerMigrationLabPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.intro}>
        <p>Migration validation</p>
        <h1>Framer code components</h1>
        <span>
          A private, no-index surface for validating the project-owned runtime
          components after removing their Framer-only dependencies.
        </span>
      </header>

      <section className={styles.section}>
        <h2>Typewriter</h2>
        <div className={styles.lightCard}>
          <TypewriterEffect
            staticText="Coordinate"
            words={["workflows", "approvals", "operations"]}
            colors={[
              { color: "#132235", label: "Static text" },
              { color: "#1760a8", label: "Animated words" },
            ]}
            cursorColor="#1760a8"
            font={{ fontSize: 30, fontWeight: 650, lineHeight: 1.2 }}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Conic status</h2>
        <div className={styles.compactPreview}>
          <ConicGradient
            width={220}
            height={44}
            borderColor="#5aaaf8"
            overlayBorderColor="rgba(90, 170, 248, 0.35)"
            backgroundColor="rgba(255, 255, 255, 0.92)"
            borderRadius={10}
            text="Thought for 10 minutes…"
            textColor="#132235"
            fontSize={13}
            fontWeight={600}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Scroll reveal</h2>
        <div className={styles.darkCard}>
          <RevealText
            text="Innflow turns recurring operational handoffs into visible, reviewable workflows with the right context attached."
            fontFamily="Figtree"
            fontSize={36}
            lineHeight={44}
            letterSpacing={-1.2}
            paragraphAlign="flex-start"
            transitionStartIndex={0}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Slack interface</h2>
        <div className={styles.scrollFrame}>
          <SlackUI />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Media ring</h2>
        <div className={styles.galleryFrame}>
          <SmoothRingGallery />
        </div>
      </section>
    </main>
  );
}
