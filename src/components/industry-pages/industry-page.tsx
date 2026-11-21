import Link from "next/link";
import type { CSSProperties } from "react";
import { BaselineClosing } from "@/app/preview/scroll-showcase/baseline-closing";
import { ChevronRight } from "@/components/chevron-right";
import { ArrowDown as MageArrowDown } from "@/components/icons/mage";
import { MixedHeadingText } from "@/components/mixed-heading-text";
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
              All solutions{" "}
              <span aria-hidden="true">
                <ChevronRight />
              </span>
            </Link>
            <p className={styles.eyebrow}>{page.name}</p>
            <h1 data-mixed-heading>
              <MixedHeadingText>{page.headline}</MixedHeadingText>
            </h1>
            <p className={styles.intro}>{page.description}</p>
            <div className={styles.actions}>
              <a
                data-site-cta="primary"
                className={styles.primary}
                href={siteConfig.demoUrl}
              >
                Book a workflow demo{" "}
                <span aria-hidden="true">
                  <ChevronRight />
                </span>
              </a>
              <a
                data-site-cta="secondary"
                className={styles.secondary}
                href="#workflows"
              >
                See the possibilities{" "}
                <span aria-hidden="true">
                  <MageArrowDown size="1em" />
                </span>
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
            <h2 id="workflows-heading" data-mixed-heading>
              <MixedHeadingText>
                Less chasing.
                <br />
                Clearer next steps.
              </MixedHeadingText>
            </h2>
            <p>
              Explore how connected conversations and{" "}
              <strong>human review</strong> can shape everyday work in{" "}
              {page.name.toLowerCase()}.
            </p>
          </header>
          <nav className={styles.sectionNav} aria-label="Workflow sections">
            {page.workflows.map((flow, i) => (
              <a key={flow.label} href={`#workflow-${i + 1}`}>
                {flow.label}
                <span aria-hidden="true">
                  <ChevronRight />
                </span>
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
                <h3 data-mixed-heading>
                  <MixedHeadingText>{flow.title}</MixedHeadingText>
                </h3>
                <p>{flow.body}</p>
                <a href={siteConfig.demoUrl} className={styles.textLink}>
                  Talk through this workflow{" "}
                  <span aria-hidden="true">
                    <ChevronRight />
                  </span>
                </a>
              </div>
              <div
                className={styles.workflowVisual}
                role="img"
                aria-label={`${flow.label} example`}
              >
                <span className={styles.eyebrow}>Example workflow</span>
                <div className={styles.inputCard}>
                  <span>Request</span>
                  <strong>{flow.input}</strong>
                </div>
                <div className={styles.connector} aria-hidden="true">
                  <MageArrowDown size="1em" />
                </div>
                <div className={styles.contextCard}>
                  <span>Prepare</span>
                  <strong>{flow.context}</strong>
                  <div className={styles.paperLines} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className={styles.connector} aria-hidden="true">
                  <MageArrowDown size="1em" />
                </div>
                <div className={styles.outputCard}>
                  <span>Your team</span>
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
          <h2 id="working-heading" data-mixed-heading>
            <MixedHeadingText>Your people stay in the loop.</MixedHeadingText>
          </h2>
          <div>
            <article>
              <h3 data-mixed-heading>
                <MixedHeadingText>Keep the source close</MixedHeadingText>
              </h3>
              <p>
                Carry the original conversation and supporting information into
                each handoff.
              </p>
            </article>
            <article>
              <h3 data-mixed-heading>
                <MixedHeadingText>Make ownership clear</MixedHeadingText>
              </h3>
              <p>
                Give each next step a responsible person and a clear place for
                unresolved questions.
              </p>
            </article>
            <article>
              <h3 data-mixed-heading>
                <MixedHeadingText>Build around your process</MixedHeadingText>
              </h3>
              <p>
                Start with <strong>one defined workflow</strong> and explore the
                tools and review points it needs.
              </p>
            </article>
          </div>
        </section>
        <section className={styles.faq} aria-labelledby="faq-heading">
          <div>
            <p className={styles.eyebrow}>Before you begin</p>
            <h2 id="faq-heading" data-mixed-heading>
              <MixedHeadingText>A few useful answers.</MixedHeadingText>
            </h2>
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
