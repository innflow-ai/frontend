import Image from "next/image";
import styles from "./baselane-banking.module.css";
import { BaselaneHomepage } from "./baselane-homepage";

const sections = [
  {
    id: "properties",
    label: "Property-specific context",
    title: "A clear home for every property.",
    text: "Bring each property's records, requests, and next steps together. Give your team the context to move forward with confidence.",
    image: "accounts",
    rows: ["142 Oak Street", "88 Riverside Drive", "24 Maple Avenue"],
    detail: "Property workspace",
  },
  {
    id: "visibility",
    label: "Visible operations",
    title: "More clarity. Fewer loose ends.",
    text: "Keep the details close to the work. See what needs attention, who owns the next step, and where things stand.",
    image: "fees",
    rows: [
      "New request received",
      "Assigned to property team",
      "Ready for review",
    ],
    detail: "Activity overview",
  },
  {
    id: "automation",
    label: "Workflow automation",
    title: "Give routine work a reliable rhythm.",
    text: "Turn repeatable processes into connected workflows. Keep your team involved at the moments that need a human decision.",
    image: "automation",
    rows: [
      "Request arrives",
      "Gather property context",
      "Request team approval",
    ],
    detail: "Maintenance workflow",
  },
  {
    id: "knowledge",
    label: "Connected knowledge",
    title: "The right information, right where you work.",
    text: "Keep procedures, property information, and supporting documents connected to your team's everyday questions.",
    image: "accounts",
    rows: ["Property handbook.pdf", "Vendor directory", "Move-in checklist"],
    detail: "Knowledge library",
  },
];
const features = [
  [
    "01",
    "Context for every property",
    "Organize work around the properties and people it belongs to.",
  ],
  [
    "02",
    "Thoughtful permissions",
    "Keep access and consequential decisions under your team's control.",
  ],
  ["03", "Connected teams", "Make ownership and handoffs easier to follow."],
  [
    "04",
    "Repeatable workflows",
    "Give recurring work a consistent path from request to resolution.",
  ],
  [
    "05",
    "Human review",
    "Add approval steps wherever your team needs to check the details.",
  ],
  [
    "06",
    "Useful integrations",
    "Explore ways to connect the tools your operation already uses.",
  ],
];
const faqs = [
  [
    "What is this page?",
    "This is an alternate Innflow design exploring a property-focused layout. The banking imagery is a visual reference; it does not represent an Innflow banking offering.",
  ],
  [
    "How does Innflow support property operations?",
    "Innflow brings workflows, knowledge, and approvals into a connected workspace so teams can organize recurring property work.",
  ],
  [
    "Can my team review actions before they happen?",
    "Approval steps keep your team involved in consequential workflow decisions. Explore the platform to see how these controls fit your processes.",
  ],
  [
    "Where can I see the product?",
    "Book a demo to explore Innflow's workflows and discuss the needs of your property operation.",
  ],
];
function Scene({
  name,
  priority = false,
}: {
  name: string;
  priority?: boolean;
}) {
  return (
    <picture className={styles.scene}>
      <source
        media="(max-width: 700px)"
        srcSet={`/brand/baselane-inspired/banking/${name}-mobile.webp`}
      />
      <Image
        src={`/brand/baselane-inspired/banking/${name}-desktop.webp`}
        alt=""
        fill
        sizes="100vw"
        preload={priority}
      />
    </picture>
  );
}
export function BaselaneBanking() {
  return (
    <BaselaneHomepage>
      <section className={styles.hero}>
        <Scene name="hero" priority />
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>PROPERTY OPERATIONS</span>
          <h1>
            Built for life with
            <br />
            more than one property.
          </h1>
          <p>
            Bring the moving parts of your portfolio together. Less chasing
            details. More room to move forward.
          </p>
          <a className={styles.button} href="/demo">
            Explore Innflow <span>↗</span>
          </a>
          <small>
            Design preview · Banking imagery shown for illustration.
          </small>
        </div>
      </section>
      <section className={styles.solutions}>
        <h2>
          Give every next step
          <br />a clear sense of direction.
        </h2>
        <div className={styles.solutionLayout}>
          <nav className={styles.sectionNav} aria-label="On this page">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
                <span>↗</span>
              </a>
            ))}
          </nav>
          <div className={styles.cards}>
            {sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.card}>
                <Scene name={`solutions-${section.image}-bg`} />
                <span className={styles.cardLabel}>{section.label}</span>
                <div className={styles.cardCopy}>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
                <div className={styles.product}>
                  <div className={styles.productTop}>
                    <span>innflow</span>
                    <span>•••</span>
                  </div>
                  <small>ILLUSTRATIVE WORKSPACE</small>
                  <h4>{section.detail}</h4>
                  {section.rows.map((row, i) => (
                    <div className={styles.productRow} key={row}>
                      <span className={styles.productIcon}>{i + 1}</span>
                      <span>
                        {row}
                        <small>
                          {i === 2
                            ? "Ready to review"
                            : "Connected to your workspace"}
                        </small>
                      </span>
                      <span>↗</span>
                    </div>
                  ))}
                  <div className={styles.productBottom}>
                    <span>Everything in context</span>
                    <span>✓</span>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.features}>
        <h2>
          Made for the way
          <br />
          your team works.
        </h2>
        <div>
          {features.map(([number, title, text]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.banner}>
        <Image
          src="/brand/baselane-inspired/hero.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div>
          <span className={styles.eyebrow}>A LITTLE MORE HEADSPACE</span>
          <h2>
            Your properties.
            <br />
            Your team.
            <br />
            One connected flow.
          </h2>
          <a href="/demo" className={styles.button}>
            See what's possible <span>↗</span>
          </a>
        </div>
      </section>
      <section className={styles.useCases}>
        <h2>
          From the first request
          <br />
          to the final handoff.
        </h2>
        <div>
          {[
            "Maintenance coordination",
            "Resident requests",
            "Property onboarding",
            "Team knowledge",
          ].map((title, i) => (
            <a href="/products/agentic-workflows" key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <span>Explore workflows ↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className={styles.faq}>
        <h2>
          A few things
          <br />
          you might be wondering.
        </h2>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className={styles.closing}>
        <Image
          src="/brand/baselane-inspired/closing-desktop.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div>
          <h2>
            Make room for
            <br />
            what comes next.
          </h2>
          <p>Bring your property operations into one flow.</p>
          <a href="/demo" className={styles.button}>
            See Innflow in action <span>↗</span>
          </a>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
