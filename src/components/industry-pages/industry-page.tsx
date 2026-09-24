import Link from "next/link";
import type { CSSProperties } from "react";
import { BaselineClosing } from "@/app/preview/scroll-showcase/baseline-lower-sections";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { siteConfig } from "@/config/site";
import type { IndustryPageContent } from "@/content/industries";
import styles from "./industry-pages.module.css";
import { WorkflowDemo } from "./workflow-demo";

export function IndustryPage({ page }: { page: IndustryPageContent }) {
  return (
    <ShowcaseTheme>
      <main
        id="main-content"
        className={styles.page}
        style={{ "--industry-surface": page.surface } as CSSProperties}
      >
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Link href="/solutions" className={styles.back}>
              All solutions <span aria-hidden="true">↗</span>
            </Link>
            <p className={styles.eyebrow}>{page.name}</p>
            <h1>{page.headline}</h1>
            <p className={styles.intro}>{page.description}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href={siteConfig.demoUrl}>
                Explore your workflow <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.secondary} href="#workflows">
                See the possibilities <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <WorkflowDemo page={page} />
          </div>
        </section>
        <section
          id="workflows"
          className={styles.workflows}
          aria-labelledby="workflows-heading"
        >
          <header className={styles.sectionHeading}>
            <p className={styles.eyebrow}>A place to start</p>
            <h2 id="workflows-heading">
              Less chasing.
              <br />
              Clearer next steps.
            </h2>
            <p>
              Explore how connected conversations and human review can shape
              everyday work in {page.name.toLowerCase()}.
            </p>
          </header>
          <nav className={styles.sectionNav} aria-label="Workflow sections">
            {page.workflows.map((flow, i) => (
              <a key={flow.label} href={`#workflow-${i + 1}`}>
                {flow.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          {page.workflows.map((flow, i) => (
            <article
              key={flow.label}
              id={`workflow-${i + 1}`}
              className={styles.workflow}
            >
              <div className={styles.workflowCopy}>
                <p className={styles.eyebrow}>
                  0{i + 1} / {flow.label}
                </p>
                <h3>{flow.title}</h3>
                <p>{flow.body}</p>
                <a href={siteConfig.demoUrl} className={styles.textLink}>
                  Talk through this workflow <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div
                className={styles.workflowVisual}
                role="img"
                aria-label={`${flow.label} example`}
              >
                <span className={styles.eyebrow}>Example workflow</span>
                <div className={styles.inputCard}>
                  <span>01 / Request</span>
                  <strong>{flow.input}</strong>
                </div>
                <div className={styles.connector} aria-hidden="true">
                  ↓
                </div>
                <div className={styles.contextCard}>
                  <span>02 / Prepare</span>
                  <strong>{flow.context}</strong>
                  <div className={styles.paperLines} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className={styles.connector} aria-hidden="true">
                  ↓
                </div>
                <div className={styles.outputCard}>
                  <span>03 / Your team</span>
                  <strong>{flow.output}</strong>
                  <span className={styles.reviewBadge}>Ready for review</span>
                </div>
              </div>
            </article>
          ))}
        </section>
        <section
          className={styles.supporting}
          aria-labelledby="working-heading"
        >
          <h2 id="working-heading">Your people stay in the loop.</h2>
          <div>
            <article>
              <span>01</span>
              <h3>Keep the source close</h3>
              <p>
                Carry the original conversation and supporting information into
                each handoff.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Make ownership clear</h3>
              <p>
                Give each next step a responsible person and a clear place for
                unresolved questions.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Build around your process</h3>
              <p>
                Start with one defined workflow and explore the tools and review
                points it needs.
              </p>
            </article>
          </div>
        </section>
        <section className={styles.faq} aria-labelledby="faq-heading">
          <div>
            <p className={styles.eyebrow}>Before you begin</p>
            <h2 id="faq-heading">A few useful answers.</h2>
          </div>
          <div>
            <details>
              <summary>
                Where can {page.name.toLowerCase()} teams start?
              </summary>
              <p>
                Start with {page.workflows[0].label.toLowerCase()}. Bring an
                example such as: “{page.request}” We can walk through the
                information, handoffs and review steps your team needs.
              </p>
            </details>
            <details>
              <summary>Can we use our existing tools?</summary>
              <p>
                Bring your current tools and data sources to the demo. We will
                confirm available connections and any setup needed for your
                specific workflow.
              </p>
            </details>
            <details>
              <summary>Who reviews the next action?</summary>
              <p>
                Plan the review points with your team. These examples keep
                decisions with the responsible people; the exact actions and
                permissions depend on the workflow you configure.
              </p>
            </details>
            <details>
              <summary>Are these examples ready for our organization?</summary>
              <p>
                These are workflow starting points. We will confirm product fit,
                data requirements and available capabilities with you before
                implementation.
              </p>
            </details>
          </div>
        </section>
        <BaselineClosing />
      </main>
    </ShowcaseTheme>
  );
}
