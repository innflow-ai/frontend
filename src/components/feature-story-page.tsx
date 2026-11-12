import { ConnectorCatalog } from "@/components/connector-catalog";
import { FeaturePageInk } from "@/components/feature-page-ink";
import { BotIcon } from "@/components/icons/bot-icon";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { showFeatureItem } from "@/config/unbuilt-features";
import type {
  FlowNode,
  StoryLink,
  StorySection,
} from "@/content/feature-story";
import { connectorGroups } from "@/content/wired-connectors";
import styles from "./feature-story-page.module.css";

export function FeatureStoryPage({ sections }: { sections: StorySection[] }) {
  const visible = sections.filter(
    (section) => showFeatureItem(section) && sectionHasContent(section),
  );
  return (
    <main className={styles.page} id="main-content">
      <FeaturePageInk />
      {visible.map((section) => (
        <SectionView key={section.id} section={section} />
      ))}
    </main>
  );
}

function sectionHasContent(section: StorySection) {
  if (
    section.type !== "features" &&
    section.type !== "faq" &&
    section.type !== "chips"
  ) {
    return true;
  }
  if (section.type === "faq") {
    return (section.questions ?? []).some(showFeatureItem);
  }
  if (section.type === "chips") {
    return (
      (section.built ?? []).length > 0 ||
      (section.unbuiltItems ?? []).some(
        (item) => showFeatureItem({ unbuilt: true }) && item,
      )
    );
  }
  return (section.items ?? []).some(showFeatureItem);
}

function SectionView({ section }: { section: StorySection }) {
  if (section.type === "hero") return <Hero section={section} />;
  if (section.type === "split") return <Split section={section} />;
  if (section.type === "features") return <Features section={section} />;
  if (section.type === "status") return <Status section={section} />;
  if (section.type === "steps") return <Steps section={section} />;
  if (section.type === "cards") return <Cards section={section} />;
  if (section.type === "faq") return <Faq section={section} />;
  if (section.type === "close") return <Close section={section} />;
  if (section.type === "columns") return <Columns section={section} />;
  if (section.type === "comparison") return <Comparison section={section} />;
  if (section.type === "chips") return <Chips section={section} />;
  if (section.type === "beats") return <Beats section={section} />;
  if (section.type === "dark") return <Dark section={section} />;
  if (section.type === "catalog") {
    return (
      <section
        className={styles.block}
        id={section.anchor === section.id ? undefined : section.anchor}
        aria-labelledby={section.id}
      >
        <StoryHeading section={section} />
        <ConnectorCatalog groups={connectorGroups} />
        {section.footnote ? (
          <p className={styles.footnote}>{section.footnote}</p>
        ) : null}
      </section>
    );
  }
  const unhandled: never = section.type;
  return unhandled;
}

function StoryHeading({
  section,
  as = "h2",
  size = "section",
}: {
  section: StorySection;
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "h2" | "h3";
}) {
  return (
    <SectionHeading
      id={section.id}
      as={as}
      size={size}
      align={section.type === "close" ? "center" : "start"}
      emphasis={section.emphasis}
      emphasisWeight="semibold"
      eyebrow={section.eyebrow}
      subtitle={section.subtitle}
      title={section.title}
      tone={section.tone}
    />
  );
}

function Hero({ section }: { section: StorySection }) {
  return (
    <>
      <section className={styles.hero} aria-labelledby={section.id}>
        <div>
          <StoryHeading
            as="h1"
            section={{ ...section, subtitle: undefined }}
            size="hero"
          />
          <div className={styles.actions}>
            {section.primary ? (
              <Cta link={section.primary} tone="primary" label={section.id} />
            ) : null}
            {section.secondary ? (
              <Cta
                link={section.secondary}
                tone="secondary"
                label={`${section.id}-secondary`}
              />
            ) : null}
          </div>
        </div>
        {section.subtitle ? (
          <p className={styles.heroCopy}>{section.subtitle}</p>
        ) : null}
      </section>
      <Scene lines={section.lines ?? []} chips={section.chips ?? []} />
    </>
  );
}

function Scene({
  lines,
  chips,
}: {
  lines: { role: string; text: string }[];
  chips: string[];
}) {
  return (
    <div className={styles.scene}>
      <div className={styles.window}>
        <p className={styles.windowBar}>
          <BotIcon size={16} />
          Workspace
        </p>
        <div className={styles.frost}>
          {lines.map((line) => (
            <p className={styles.bubble} key={`${line.role}-${line.text}`}>
              <strong>{line.role}</strong>
              {line.text}
            </p>
          ))}
          {chips.length > 0 ? (
            <div className={styles.fileChips}>
              {chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Dark({ section }: { section: StorySection }) {
  return (
    <section className={styles.dark} aria-labelledby={section.id}>
      <div>
        <StoryHeading section={{ ...section, tone: "inverse" }} />
        {section.body ? <p className={styles.copy}>{section.body}</p> : null}
      </div>
      <div className={styles.thread}>
        {(section.lines ?? []).map((line) => (
          <p key={`${line.role}-${line.text}`}>
            <strong>{line.role}</strong>
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}

function Split({ section }: { section: StorySection }) {
  return (
    <section className={styles.split} aria-labelledby={section.id}>
      <StoryHeading section={section} />
      {section.body ? <p className={styles.copy}>{section.body}</p> : null}
      {section.lines ? (
        <Thread lines={section.lines} chips={section.chips} />
      ) : null}
    </section>
  );
}

function Thread({
  lines,
  chips,
}: {
  lines: { role: string; text: string }[];
  chips?: string[];
}) {
  return (
    <div className={styles.mock}>
      {lines.map((line) => (
        <p key={`${line.role}-${line.text}`}>
          <BotIcon size={14} />
          <strong>{line.role}</strong>
          {line.text}
        </p>
      ))}
      {chips?.map((chip) => (
        <span key={chip}>{chip}</span>
      ))}
    </div>
  );
}

function Features({ section }: { section: StorySection }) {
  const items = (section.items ?? []).filter(showFeatureItem);
  if (section.anchor && items.length === 1 && items[0]?.nodes) {
    return (
      <section
        className={styles.canvasBand}
        id={section.anchor === section.id ? undefined : section.anchor}
        aria-label={section.title}
      >
        <NodeBoard title={items[0].title} nodes={items[0].nodes} />
      </section>
    );
  }
  return (
    <section
      className={styles.block}
      aria-labelledby={section.id}
      id={section.anchor === section.id ? undefined : section.anchor}
    >
      {section.subtitle ? (
        <SectionHeading
          id={section.id}
          align="start"
          title={section.title}
          subtitle={section.subtitle}
        />
      ) : null}
      <div className={styles.featureGrid}>
        {items.map((item) => (
          <article key={item.title}>
            <SectionHeading
              as="h3"
              size="h3"
              align="start"
              title={item.title}
              subtitle={item.body}
            />
            {item.nodes ? <NodeBoard nodes={item.nodes} /> : null}
            {item.actions ? (
              <div className={styles.actions}>
                {item.actions.map((action) => (
                  <span className={styles.ghost} key={action}>
                    {action}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function Status({ section }: { section: StorySection }) {
  return (
    <section className={styles.split} aria-labelledby={section.id}>
      <SectionHeading
        id={section.id}
        align="start"
        title={section.title}
        subtitle={section.subtitle}
      />
      <ul className={styles.status}>
        {(section.rows ?? []).map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <span className={styles.badge}>{row.state}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Steps({ section }: { section: StorySection }) {
  return (
    <section
      className={styles.block}
      id={section.anchor === section.id ? undefined : section.anchor}
      aria-labelledby={section.id}
    >
      <SectionHeading
        id={section.id}
        align="start"
        title={section.title}
        subtitle={section.subtitle}
      />
      <ol className={styles.steps}>
        {(section.steps ?? []).map((step) => (
          <li key={step.title}>
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
  );
}

function Cards({ section }: { section: StorySection }) {
  const cards = (section.cards ?? []).filter(showFeatureItem);
  return (
    <section className={styles.block} aria-labelledby={section.id}>
      <SectionHeading id={section.id} align="start" title={section.title} />
      <div className={styles.featureGrid}>
        {cards.map((card) => (
          <article className={styles.resource} key={card.title}>
            <SectionHeading
              as="h3"
              size="h3"
              align="start"
              title={card.title}
              subtitle={card.body}
            />
            {card.links?.map((link) => (
              <Cta key={link.href} link={link} tone="text" label={card.title} />
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function Faq({ section }: { section: StorySection }) {
  const questions = (section.questions ?? []).filter(showFeatureItem);
  return (
    <section className={styles.block} aria-labelledby={section.id}>
      <SectionHeading
        id={section.id}
        align="start"
        title={section.title}
        subtitle={section.subtitle}
      />
      <div className={styles.faq}>
        {questions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Close({ section }: { section: StorySection }) {
  return (
    <section className={styles.close} aria-labelledby={section.id}>
      <SectionHeading
        id={section.id}
        align="center"
        title={section.title}
        subtitle={section.subtitle}
      />
      <div className={styles.actions}>
        {(section.links ?? []).map((link) => (
          <Cta key={link.label} link={link} tone="primary" label={section.id} />
        ))}
      </div>
    </section>
  );
}

function Columns({ section }: { section: StorySection }) {
  return (
    <section className={styles.block} aria-labelledby={section.id}>
      <SectionHeading
        id={section.id}
        align="start"
        title={section.title}
        subtitle={section.subtitle}
      />
      <div className={styles.featureGrid}>
        {(section.columns ?? []).map((column) => (
          <article key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Comparison({ section }: { section: StorySection }) {
  return (
    <section
      className={section.tone === "inverse" ? styles.darkBand : styles.block}
      aria-labelledby={section.id}
    >
      <StoryHeading section={section} />
      <div className={styles.featureGrid}>
        {(section.sides ?? []).map((side) => (
          <article key={side.title}>
            <h3>{side.title}</h3>
            <ul>
              {side.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {section.links?.map((link) => (
        <Cta key={link.href} link={link} tone="text" label={section.id} />
      ))}
    </section>
  );
}

function Chips({ section }: { section: StorySection }) {
  const unbuilt = showFeatureItem({ unbuilt: true })
    ? (section.unbuiltItems ?? [])
    : [];
  return (
    <section className={styles.block} aria-labelledby={section.id}>
      <SectionHeading
        id={section.id}
        align="start"
        title={section.title}
        subtitle={section.body}
      />
      <div className={styles.chips}>
        {(section.built ?? []).map((item) => (
          <span key={item}>{item}</span>
        ))}
        {unbuilt.map((item) => (
          <span data-unbuilt="true" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function Beats({ section }: { section: StorySection }) {
  return (
    <section className={styles.block} aria-labelledby={section.id}>
      <SectionHeading
        id={section.id}
        align="start"
        title={section.title}
        subtitle={section.subtitle}
      />
      {section.body ? <p className={styles.copy}>{section.body}</p> : null}
      <ol className={styles.beats}>
        {(section.beats ?? []).map((beat) => (
          <li key={beat}>{beat}</li>
        ))}
      </ol>
    </section>
  );
}

function NodeBoard({ title, nodes }: { title?: string; nodes: FlowNode[] }) {
  return (
    <div className={styles.board}>
      {title ? (
        <p className={styles.boardTitle}>
          <BotIcon size={16} />
          {title}
        </p>
      ) : null}
      <ul>
        {nodes.map((node) => (
          <li
            key={`${node.label}-${node.owner ?? ""}`}
            data-status={node.status ?? "waiting"}
          >
            <span>{node.label}</span>
            {node.owner ? (
              <small>
                {node.agent ? <BotIcon size={12} /> : null}
                {node.owner}
              </small>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cta({
  link,
  tone,
  label,
}: {
  link: StoryLink;
  tone: "primary" | "secondary" | "text";
  label: string;
}) {
  return (
    <TrackedLink
      className={
        tone === "primary"
          ? styles.primary
          : tone === "secondary"
            ? styles.secondary
            : styles.textLink
      }
      destination={link.href}
      eventLabel={label}
    >
      {link.label}
    </TrackedLink>
  );
}
