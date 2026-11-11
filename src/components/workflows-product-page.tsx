import { BotIcon } from "@/components/icons/bot-icon";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import {
  workflowsPage as page,
  showWorkflowSection,
} from "@/content/workflows-page";
import styles from "./workflows-product-page.module.css";

export function WorkflowsProductPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="workflows-title">
        <SectionHeading
          id="workflows-title"
          as="h1"
          size="hero"
          title={page.hero.title}
          emphasis={page.hero.emphasis}
          subtitle={page.hero.subtitle}
        >
          <div className={styles.actions}>
            <TrackedLink
              className={styles.primary}
              destination={page.hero.primary.href}
              eventLabel="workflows_hero_demo"
            >
              {page.hero.primary.label}
            </TrackedLink>
            {showWorkflowSection(page.example) ? (
              <a className={styles.secondary} href={page.hero.secondary.href}>
                {page.hero.secondary.label}
              </a>
            ) : null}
          </div>
        </SectionHeading>
        {showWorkflowSection(page.example) ? <ExampleCard /> : null}
      </section>

      <section className={styles.block} aria-labelledby="workflows-plan">
        <SectionHeading
          id="workflows-plan"
          title={page.plan.title}
          subtitle={page.plan.subtitle}
        />
        <ol className={styles.rows}>
          {page.plan.rows.filter(showWorkflowSection).map((row, index) => (
            <li className={styles.row} key={row.title}>
              <div>
                <p className={styles.index}>{index + 1}</p>
                <SectionHeading
                  as="h3"
                  size="h3"
                  align="start"
                  title={row.title}
                  subtitle={row.body}
                />
              </div>
              {showWorkflowSection(page.example) ? (
                <StepStrip active={index} />
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {showWorkflowSection(page.attention) ? (
        <section className={styles.block} aria-labelledby="workflows-attention">
          <SectionHeading
            id="workflows-attention"
            title={page.attention.title}
            subtitle={page.attention.subtitle}
          />
          <ul className={styles.states} aria-label="Example workflow states">
            {page.attention.rows.map((row) => (
              <li key={row.name}>
                <span>{row.name}</span>
                <strong>{row.state}</strong>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className={styles.block} aria-labelledby="workflows-loop">
        <SectionHeading
          id="workflows-loop"
          title={page.loop.title}
          subtitle={page.loop.subtitle}
        />
        <ol className={styles.steps}>
          {page.loop.steps.filter(showWorkflowSection).map((step, index) => (
            <li key={step.title}>
              <p className={styles.index}>{index + 1}</p>
              <SectionHeading
                as="h3"
                size="h3"
                align="start"
                title={step.title}
                subtitle={step.body}
              />
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.block} aria-labelledby="workflows-angles">
        <SectionHeading id="workflows-angles" title={page.angles.title} />
        <div className={styles.cards}>
          {page.angles.cards.map((card) => (
            <article className={styles.card} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              {card.href &&
              card.label &&
              (card.href !== "#example" ||
                showWorkflowSection(page.example)) ? (
                <a href={card.href}>{card.label}</a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.close} aria-labelledby="workflows-close">
        <SectionHeading
          id="workflows-close"
          title={page.close.title}
          emphasis={page.close.emphasis}
          subtitle={page.close.subtitle}
        >
          <TrackedLink
            className={styles.primary}
            destination={page.close.cta.href}
            eventLabel="workflows_close_demo"
          >
            {page.close.cta.label}
          </TrackedLink>
        </SectionHeading>
      </section>
    </main>
  );
}

function ExampleCard() {
  const { example } = page;
  return (
    <aside
      className={styles.example}
      id="example"
      aria-label="Example workflow"
    >
      <p className={styles.exampleLabel}>{example.label}</p>
      <p className={styles.exampleName}>{example.name}</p>
      <p className={styles.progress}>{example.progress}</p>
      <ol>
        {example.steps.map((step) => (
          <li key={step.name}>
            <span>{step.name}</span>
            <Owner owner={step.owner} />
          </li>
        ))}
      </ol>
    </aside>
  );
}

function StepStrip({ active }: { active: number }) {
  return (
    <ol className={styles.strip} aria-hidden="true">
      {page.example.steps.map((step, index) => (
        <li data-active={index === active} key={step.name}>
          <Owner owner={step.owner} />
          <span>{step.name}</span>
        </li>
      ))}
    </ol>
  );
}

function Owner({ owner }: { owner: string }) {
  return (
    <span className={styles.owner}>
      {owner === "Agent" ? <BotIcon size={14} /> : null}
      {owner}
    </span>
  );
}
