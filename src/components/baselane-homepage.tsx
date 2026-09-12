"use client";

import {
  ArrowRight,
  CheckCircle,
  Database,
  FlowArrow,
  ShieldCheck,
} from "@phosphor-icons/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import previewStyles from "./runey-landing.module.css";
import { RuneyWorkspace } from "./runey-workspace";
import styles from "./site-shell.module.css";
import { TrackedLink } from "./tracked-link";

const capabilities = [
  {
    icon: Database,
    title: "Connected context",
    text: "Keep property records, files, and procedures beside the work they support.",
  },
  {
    icon: FlowArrow,
    title: "Workflow automation",
    text: "Give recurring requests a clear path, from the first trigger to the next action.",
  },
  {
    icon: ShieldCheck,
    title: "Human approvals",
    text: "Review the details before consequential work moves forward.",
  },
  {
    icon: CheckCircle,
    title: "Visible execution",
    text: "Follow each step, inspect the context, and see where a handoff needs attention.",
  },
];

export function BaselaneHomepage({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.page}>
      <main id="main-content">
        {children ?? (
          <>
            <section className={styles.hero}>
              <Image
                src="/brand/baselane-inspired/hero.webp"
                alt=""
                fill
                sizes="100vw"
                preload
                className={styles.heroPhoto}
              />
              <div className={styles.heroCopy}>
                <h1>
                  Operations that give
                  <br className={styles.desktopBreak} /> you your day back.
                </h1>
                <p>
                  Bring your workflows, knowledge, and approvals together.
                  <br className={styles.desktopBreak} /> Keep your property
                  operations moving with innflow.
                </p>
              </div>
              <div className={styles.heroBottom}>
                <div className={styles.actions}>
                  <TrackedLink
                    destination={siteConfig.googleAuthUrl}
                    eventLabel="baselane_hero_signup"
                    className={styles.blueButton}
                  >
                    <GoogleCtaContent />
                  </TrackedLink>
                  <a className={styles.darkButton} href={siteConfig.demoUrl}>
                    See demo <ArrowRight size={19} />
                  </a>
                </div>
                <p>One place for your team, context, and next steps.</p>
              </div>
            </section>
            <div className={styles.trustBar}>
              <span>Built around your property work</span>
              <span>Connected workflows. Clearer handoffs.</span>
            </div>
            <section
              className={`${styles.shell} ${styles.intro}`}
              aria-label="Connected property operations"
            >
              <p>Make room for the work that matters.</p>
              <div className={styles.pillars}>
                <div>
                  <strong>Connect</strong>
                  <span>
                    your systems
                    <br />
                    and context
                  </span>
                </div>
                <div>
                  <strong>Coordinate</strong>
                  <span>
                    your recurring
                    <br />
                    operations
                  </span>
                </div>
                <div>
                  <strong>Review</strong>
                  <span>
                    the moments
                    <br />
                    that matter
                  </span>
                </div>
              </div>
            </section>
            <section className={`${styles.shell} ${styles.products}`}>
              <h2>Operations organized. Mind clear.</h2>
              <nav
                aria-label="Explore product stories"
                className={styles.storyNav}
              >
                <a href="#baselane-workflows">Workflows</a>
                <a href="#baselane-knowledge">Knowledge</a>
              </nav>
              {[
                {
                  id: "workflows",
                  tag: "WORKFLOWS",
                  title: "Give every handoff a clear next step.",
                  copy: "Bring triggers, connected actions, and review points into a workflow your team can follow.",
                  href: "/products/agentic-workflows",
                  view: "Workflows" as const,
                  note: "From the first request to the final review, keep the right context attached to every step.",
                  foot: "Your team stays in control.",
                },
                {
                  id: "knowledge",
                  tag: "KNOWLEDGE & AI",
                  title: "Answers with your operation’s context.",
                  copy: "Keep procedures, files, and working records together. Give your assistant the context to help prepare the next step.",
                  href: "/products/ai-agents",
                  view: "Assistant" as const,
                  note: "A clearer answer starts with shared knowledge. Bring supporting records alongside the work.",
                  foot: "Context beside the conversation.",
                },
              ].map((story) => (
                <article
                  key={story.id}
                  id={`baselane-${story.id}`}
                  className={`${styles.story} ${story.id === "knowledge" ? styles.knowledgeStory : ""}`}
                >
                  <div className={styles.storyCopy}>
                    <span className={styles.storyTag}>{story.tag}</span>
                    <h3>{story.title}</h3>
                    <p>{story.copy}</p>
                    <a className={styles.lightButton} href={story.href}>
                      Explore {story.id} <ArrowRight size={16} />
                    </a>
                  </div>
                  <div
                    className={`${styles.productPreview} ${previewStyles.blueHome}`}
                  >
                    <RuneyWorkspace initialView={story.view} />
                  </div>
                  <aside className={styles.storyNote}>
                    <p>{story.note}</p>
                    <span>{story.foot}</span>
                  </aside>
                </article>
              ))}
            </section>
            <section className={`${styles.shell} ${styles.capabilities}`}>
              <h2>Clarity where it counts.</h2>
              <div className={styles.capabilityGrid}>
                {capabilities.map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <h3>
                      <Icon size={21} />
                      {title}
                    </h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className={`${styles.shell} ${styles.support}`}>
              <h2>
                Built around
                <br />
                your team.
              </h2>
              <div>
                {[
                  [
                    "A shared starting point",
                    "Bring procedures and operational records together so your team can work from the same context.",
                  ],
                  [
                    "People in control",
                    "Keep review points visible before consequential actions move forward.",
                  ],
                  [
                    "A clearer next step",
                    "Start with one recurring operation. Inspect the process and expand from there.",
                  ],
                ].map(([title, copy]) => (
                  <div className={styles.supportRow} key={title}>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
