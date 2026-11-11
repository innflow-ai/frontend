import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getProductFaqs } from "@/content/product-faqs";
import { JsonLd } from "./json-ld";
import { PlatformPiecesAccordion } from "./platform-pieces-accordion";
import styles from "./platform-product-page.module.css";

const shots = {
  home: {
    src: "/products/platform/home.webp",
    alt: "Innflow home, with a prompt and suggested workflows",
  },
  chats: {
    src: "/products/platform/chats.webp",
    alt: "Innflow chat, with an agent preparing a workflow",
  },
  workflows: {
    src: "/products/platform/workflows.webp",
    alt: "Innflow workflows list, with drafts and deployed runs",
  },
  analytics: {
    src: "/products/platform/analytics.webp",
    alt: "Innflow analytics, with executions, success rate, and duration",
  },
} as const;

type ShotName = keyof typeof shots;

const pieces = [
  {
    title: "AI agents",
    body: "Give an agent a question and the information behind it. Let it prepare a response or next step for your team to review.",
  },
  {
    title: "Agentic workflows",
    body: "Break the task into clear steps. Connect the tools and information needed at each stage, and decide where a person should review the work.",
  },
  {
    title: "Analytics and observability",
    body: "Understand workflow outcomes, follow execution, and identify where your operations need attention.",
  },
  {
    title: "Integrations and tools",
    body: "Connect the systems involved in a task. Choose the information and actions the workflow needs, with access managed through your connected accounts.",
  },
] as const;

const options = [
  {
    title: "Ask your agent",
    body: "Start from one prompt. Describe what you want done and let your agent prepare the next step.",
    href: "#ai-agents",
    shot: "home",
  },
  {
    title: "Build in chat",
    body: "Talk through a task with your agent. It checks your connected tools and drafts the workflow with you.",
    href: "#ai-agents",
    shot: "chats",
  },
  {
    title: "Run workflows",
    body: "Keep every workflow in one list. See what is live, what is a draft, and switch runs on when ready.",
    href: "#agentic-workflows",
    shot: "workflows",
  },
  {
    title: "See every run",
    body: "Follow executions, success rate, and usage over time so you know where work needs attention.",
    href: "#analytics",
    shot: "analytics",
  },
] as const;

type FeatureMedia =
  | { kind: "shot"; shot: ShotName; edge: "start" | "end" }
  | { kind: "integrations" };

const features: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  link: string;
  media: FeatureMedia;
}[] = [
  {
    id: "ai-agents",
    eyebrow: "AI agents",
    title: "Make room for a clearer answer.",
    body: pieces[0].body,
    points: ["Frame the question", "Attach the context", "Review the response"],
    href: "/products/ai-agents",
    link: "Explore AI agents",
    media: { kind: "shot", shot: "chats", edge: "end" },
  },
  {
    id: "agentic-workflows",
    eyebrow: "Agentic workflows",
    title: "Turn the request into a plan.",
    body: pieces[1].body,
    points: ["Outline the steps", "Connect resources", "Add review points"],
    href: "/products/agentic-workflows",
    link: "Explore agentic workflows",
    media: { kind: "shot", shot: "workflows", edge: "start" },
  },
  {
    id: "analytics",
    eyebrow: "Analytics and observability",
    title: "Know where to focus next.",
    body: pieces[2].body,
    points: [
      "Follow every execution",
      "Check success rate and duration",
      "Spot the runs that need a look",
    ],
    href: "/platform/analytics-and-observability",
    link: "Explore analytics",
    media: { kind: "shot", shot: "analytics", edge: "end" },
  },
  {
    id: "integrations",
    eyebrow: "Integrations and tools",
    title: "Keep your tools in the flow.",
    body: pieces[3].body,
    points: ["Choose your connections", "Set access", "Keep handoffs clear"],
    href: "/integrations",
    link: "Browse integrations",
    media: { kind: "integrations" },
  },
];

const nextStops = [
  {
    title: "Products",
    body: "See every product built on the platform, from AI agents to Agent Studio.",
    href: "/products",
    path: "/products",
    icon: "bot",
  },
  {
    title: "Features",
    body: "Look closer at custom workflows, human review, security, and more.",
    href: "/features",
    path: "/features",
    icon: "list",
  },
  {
    title: "Integrations",
    body: "Find the tools your agents can connect to and what they can do there.",
    href: "/integrations",
    path: "/integrations",
    icon: "link",
  },
  {
    title: "Pricing",
    body: "Compare plans and pick the one that fits how your team works.",
    href: "/pricing",
    path: "/pricing",
    icon: "gauge",
  },
] as const;

const integrations = [
  { name: "Gmail", detail: "Read request" },
  { name: "Drive", detail: "Find document" },
  { name: "Slack", detail: "Ask reviewer" },
  { name: "Sheets", detail: "Update record" },
] as const;

function Mark({ name, className }: { name: string; className?: string }) {
  return (
    <Image
      alt=""
      className={className}
      height={24}
      src={`/products/platform/icons/${name}.svg`}
      unoptimized
      width={24}
    />
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

function GradientActions() {
  return (
    <div className={styles.actions}>
      <a className={styles.primary} href={siteConfig.signupUrl}>
        Get started free
      </a>
      <a className={styles.secondary} href={siteConfig.demoUrl}>
        Book a demo
      </a>
    </div>
  );
}

function AppWindow({
  shot,
  frameClassName,
  sizes,
  priority = false,
}: {
  shot: ShotName;
  frameClassName?: string;
  sizes: string;
  priority?: boolean;
}) {
  const image = shots[shot];
  return (
    <div className={styles.window}>
      <div className={`${styles.shotFrame} ${frameClassName ?? ""}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={styles.shot}
        />
      </div>
    </div>
  );
}

function FeatureVisual({ media }: { media: FeatureMedia }) {
  switch (media.kind) {
    case "shot":
      return (
        <div className={styles.tile} data-edge={media.edge}>
          <AppWindow
            shot={media.shot}
            frameClassName={styles.featureShot}
            sizes="(max-width: 800px) 120vw, 680px"
          />
        </div>
      );
    case "integrations":
      return (
        <div className={styles.tile} data-edge="start">
          <div className={styles.diagram}>
            <div className={styles.diagramRow}>
              {integrations.slice(0, 2).map((tool) => (
                <div className={styles.tool} key={tool.name}>
                  <strong>{tool.name}</strong>
                  <span>{tool.detail}</span>
                </div>
              ))}
            </div>
            <div className={styles.hub}>inn</div>
            <div className={styles.diagramRow}>
              {integrations.slice(2).map((tool) => (
                <div className={styles.tool} key={tool.name}>
                  <strong>{tool.name}</strong>
                  <span>{tool.detail}</span>
                </div>
              ))}
            </div>
            <p className={styles.diagramCaption}>Access stays scoped</p>
          </div>
        </div>
      );
    default: {
      const unreachable: never = media;
      return unreachable;
    }
  }
}

function FeatureCopy({ feature }: { feature: (typeof features)[number] }) {
  return (
    <div className={styles.featureCopy}>
      <Eyebrow>{feature.eyebrow}</Eyebrow>
      <h2 id={`${feature.id}-title`}>{feature.title}</h2>
      <p>{feature.body}</p>
      <ul className={styles.points}>
        {feature.points.map((point) => (
          <li key={point}>
            <Mark name="check" className={styles.check} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <Link className={styles.textLink} href={feature.href}>
        {feature.link}
        <Mark name="chevron" className={styles.chevron} />
      </Link>
    </div>
  );
}

/**
 * Approved /products/platform frame: hero, capabilities, options, spotlight,
 * feature rows, FAQ, and where to go next.
 *
 * FAQ answers are pending Julian's approval. Questions match the frame.
 * The shared footer, including its sign-up panel, replaces the mockup's
 * closing gradient bands. This page does not render or restyle that footer.
 */
export function PlatformProductPage() {
  const faqs = getProductFaqs("platform");

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="platform-hero-title">
        <div className={styles.heroPanel}>
          <p className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Mark name="workflow" className={styles.badgeMark} />
            </span>
            Platform
          </p>
          <h1 id="platform-hero-title">Your operation, connected.</h1>
          <p>
            Bring your team, tools, and knowledge into one flow. Build agents,
            connect your tools, and run workflows with room for people to review
            what matters.
          </p>
          <GradientActions />
          <div className={styles.heroShot}>
            <AppWindow
              shot="home"
              frameClassName={styles.heroFrame}
              priority
              sizes="(max-width: 800px) 130vw, 1104px"
            />
          </div>
        </div>
      </section>

      <section
        className={styles.pieces}
        aria-labelledby="platform-pieces-title"
      >
        <div className={styles.piecesCopy}>
          <Eyebrow>One workspace</Eyebrow>
          <h2 id="platform-pieces-title">
            The pieces that keep your work connected.
          </h2>
          <p>
            Start with the way your team works. Connect the right tools, keep
            useful context close, and give every handoff a clear next step.
          </p>
          <PlatformPiecesAccordion items={[...pieces]} />
        </div>
        <div className={styles.piecesVisual}>
          <AppWindow
            shot="chats"
            frameClassName={styles.piecesFrame}
            sizes="640px"
          />
        </div>
      </section>

      <section
        className={styles.options}
        aria-labelledby="platform-options-title"
      >
        <div className={styles.sectionHead}>
          <Eyebrow>Your options</Eyebrow>
          <h2 id="platform-options-title">
            More ways to move your work forward.
          </h2>
        </div>
        <div className={styles.optionGrid}>
          {options.map((option) => (
            <article className={styles.option} key={option.title}>
              <Link href={option.href} className={styles.optionMedia}>
                <Image
                  src={shots[option.shot].src}
                  alt={shots[option.shot].alt}
                  fill
                  sizes="(max-width: 800px) 90vw, 282px"
                  className={styles.shot}
                />
              </Link>
              <h3>
                <Link href={option.href}>
                  {option.title}
                  <Mark name="chevron" className={styles.chevron} />
                </Link>
              </h3>
              <p>{option.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.focus} aria-labelledby="platform-focus-title">
        <div className={styles.focusPanel}>
          <div className={styles.sectionHead}>
            <Eyebrow>Platform in focus</Eyebrow>
            <h2 id="platform-focus-title">Every handoff. One clear flow.</h2>
            <p>
              Build a workflow once, keep it in one place, and turn it on when
              it is ready to run.
            </p>
          </div>
          <AppWindow
            shot="workflows"
            frameClassName={styles.heroFrame}
            sizes="(max-width: 800px) 130vw, 1104px"
          />
        </div>
      </section>

      <div className={styles.features}>
        {features.map((feature) => (
          <section
            className={styles.feature}
            data-edge={
              feature.media.kind === "shot" ? feature.media.edge : "start"
            }
            id={feature.id}
            key={feature.id}
            aria-labelledby={`${feature.id}-title`}
          >
            <FeatureVisual media={feature.media} />
            <FeatureCopy feature={feature} />
          </section>
        ))}
      </div>

      <section
        className={styles.faq}
        id="faq"
        aria-labelledby="platform-faq-title"
      >
        <div className={styles.sectionHead}>
          <h2 id="platform-faq-title">Frequently asked questions</h2>
          <p>
            Direct answers on agents, workflows, human review, integrations,
            deployment, and security.
          </p>
        </div>
        {/* FAQ answers are pending Julian's approval. */}
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <span className={styles.plus} aria-hidden="true">
                  +
                </span>
                {faq.question}
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      </section>

      <section className={styles.next} aria-labelledby="platform-next-title">
        <div className={styles.sectionHead}>
          <Eyebrow>Keep exploring</Eyebrow>
          <h2 id="platform-next-title">Where to go next.</h2>
          <p>Pick the page that answers your next question.</p>
        </div>
        <div className={styles.nextGrid}>
          {nextStops.map((stop) => (
            <Link className={styles.nextCard} href={stop.href} key={stop.href}>
              <span className={styles.nextIcon}>
                <Mark name={stop.icon} className={styles.nextMark} />
              </span>
              <strong>{stop.title}</strong>
              <span>{stop.body}</span>
              <span className={styles.pathLabel}>
                {stop.path}
                <Mark name="arrow-right" className={styles.arrow} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
