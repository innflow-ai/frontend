import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/home";
import { HomepageMedia } from "./homepage-media";
import { JsonLd } from "./json-ld";
import styles from "./runey-landing.module.css";
import { RuneyHeroArtwork, RuneyWorkspace } from "./runey-workspace";
import { TrackedLink } from "./tracked-link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const features = [
  {
    id: "workflows",
    label: "Workflows",
    title: "Give every handoff a clear next step.",
    body: "Bring triggers, connected actions, and review points into a visual workflow. Coordinate recurring property work with the context and execution history your team needs.",
    bullets: [
      "Visual workflow configuration",
      "Connected records and actions",
      "Human review points",
      "Visible execution history",
      "Clear ownership at each step",
      "Context beside the work",
    ],
    view: "Workflows" as const,
    href: "/products/agentic-workflows",
  },
  {
    id: "assistant",
    label: "AI assistant",
    title: "Answers with your operation’s context.",
    body: "Bring a question to the Assistant with the supporting knowledge and records attached. Move toward a reviewable next step while keeping your team in control.",
    bullets: [
      "Connected operational knowledge",
      "Explicit workflow actions",
      "Supporting context attached",
      "Reviewable next steps",
      "Clear action boundaries",
      "People stay in control",
    ],
    view: "Assistant" as const,
    href: "/products/ai-agents",
  },
  {
    id: "knowledge",
    label: "Knowledge & records",
    title: "Keep your team’s knowledge together.",
    body: "Put procedures, files, table records, and reference material beside the work they support. Give every workflow a shared source of context.",
    bullets: [
      "Operational procedures",
      "Files and reference material",
      "Structured working records",
      "Context for your Assistant",
      "Knowledge beside workflows",
      "Connected source systems",
    ],
    view: "Knowledge" as const,
    href: "/platform",
  },
  {
    id: "approvals",
    label: "Approvals",
    title: "Automate the steps. Keep the decisions.",
    body: "Add a review point before a consequential action. Give your team the request, supporting records, and proposed next step in one place.",
    bullets: [
      "Explicit approval boundaries",
      "Context for each decision",
      "Review before outbound actions",
      "Clear workflow ownership",
      "Inspectable run history",
      "Controlled handoffs",
    ],
    view: "Approvals" as const,
    href: "/platform/security-and-compliance",
  },
];

export function RuneyLanding({ property = false }: { property?: boolean }) {
  return (
    <main
      id="main-content"
      className={`${styles.page} ${property ? poppins.className : styles.blueHome}`}
    >
      <section className={styles.hero} id="home-hero">
        <div className={styles.shell}>
          <div className={styles.heroCopy}>
            <h1>
              {property ? (
                <>
                  Run your property work
                  <br />
                  in one place.
                </>
              ) : (
                <>
                  Run your operations
                  <br />
                  in one place.
                </>
              )}
            </h1>
            <p>
              {property
                ? "Connect your workflows, knowledge, and approvals. Give your team a clear next step, and keep your property operations organized in one place."
                : "Connect workflows, knowledge, and approvals. Keep your property operations moving in one place."}
            </p>
            <div className={styles.actions}>
              <TrackedLink
                className={styles.primaryButton}
                destination={siteConfig.signupUrl}
                eventLabel="hero_get_started"
              >
                Get started <ArrowRight size={17} />
              </TrackedLink>
              <a className={styles.secondaryButton} href="#features">
                See features
              </a>
              {property && (
                <TrackedLink
                  className={styles.textButton}
                  destination="/demo"
                  eventLabel="hero_request_demo"
                >
                  Request demo
                </TrackedLink>
              )}
            </div>
          </div>
        </div>
        <div className={styles.heroShowcase}>
          <RuneyHeroArtwork home={!property} />
          <div className={styles.shell}>
            {property ? (
              <RuneyWorkspace interactive />
            ) : (
              <HomepageMedia interactive />
            )}
          </div>
        </div>
        <div className={`${styles.shell} ${styles.benefits}`}>
          {[
            {
              title: "Connected workflows",
              body: "Turn recurring requests and handoffs into a process your team can follow and inspect.",
            },
            {
              title: "One shared context",
              body: "Bring working records, files, and operational knowledge alongside the next step.",
            },
            {
              title: "Your team in control",
              body: "Keep human review visible, with clear boundaries before consequential actions.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className={styles.audienceRail}
        aria-label="Built around your property work"
      >
        {[
          "Workflows for property teams",
          "Context for every handoff",
          "Approvals for clearer decisions",
          "Operations for your growing portfolio",
        ].map((title, i) => (
          <a
            href={
              i === 3
                ? "/property-management"
                : `#${features[i === 2 ? 3 : i].id}`
            }
            className={styles.audienceCard}
            key={title}
          >
            <Image
              src={`/brand/runey/team-${i + 1}.webp`}
              alt=""
              fill
              unoptimized={!property}
              sizes="(max-width: 640px) 75vw, 27vw"
            />
            <h2>{title}</h2>
            <ArrowRight size={19} />
          </a>
        ))}
      </section>
      <section className={styles.features} id="features">
        <div className={styles.sectionHeading}>
          <span>Features</span>
          <h2>
            Everything you need
            <br />
            to keep work moving.
          </h2>
          <p>
            From the first request to the final review — connected in one place.
          </p>
        </div>
        <div className={styles.featureStack}>
          {features.map((feature) => (
            <article
              className={styles.featureCard}
              key={feature.id}
              id={feature.id}
            >
              <div className={styles.featureCopy}>
                <span>{feature.label}</span>
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
                <ul>
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>
                      <CheckCircle size={15} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <a className={styles.featureLink} href={feature.href}>
                  Explore {feature.label.toLowerCase()} <ArrowRight size={14} />
                </a>
              </div>
              {property ? (
                <RuneyWorkspace initialView={feature.view} />
              ) : (
                <HomepageMedia view={feature.view} />
              )}
            </article>
          ))}
        </div>
      </section>
      <section className={`${styles.shell} ${styles.process}`}>
        <div className={styles.sectionHeading}>
          <span>How it works</span>
          <h2>
            Start with one workflow.
            <br />
            Build from there.
          </h2>
        </div>
        <div className={styles.processGrid}>
          {[
            {
              title: "Connect the context",
              body: "Choose a recurring operation and the systems, records, and people it needs.",
            },
            {
              title: "Define the next step",
              body: "Configure actions, conditions, and approval points with clear ownership.",
            },
            {
              title: "Review and expand",
              body: "Inspect execution, handle exceptions, and expand when the process is ready.",
            },
          ].map((step, i) => (
            <div key={step.title}>
              <span>0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.pricing}>
        <div className={styles.sectionHeading}>
          <span>Built for your team</span>
          <h2>A plan for the way you operate.</h2>
          <p>
            Explore Innflow’s plans and configure the right fit for your team.
          </p>
        </div>
        <div className={styles.actions}>
          <TrackedLink
            destination="/pricing"
            eventLabel="landing_view_pricing"
            className={styles.primaryButton}
          >
            Explore pricing <ArrowRight size={17} />
          </TrackedLink>
          <a className={styles.secondaryButton} href="/contact">
            Talk to us
          </a>
        </div>
      </section>
      <section className={styles.faq} id="faq">
        <div className={styles.sectionHeading}>
          <span>FAQ</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.slice(0, 6).map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <a className={styles.moreLink} href="/faq">
          More questions <ArrowRight size={15} />
        </a>
      </section>
      <section className={styles.finalCta}>
        <div className={styles.ctaCopy}>
          <h2>
            A clearer day starts
            <br />
            with a connected flow.
          </h2>
          <p>
            Bring your team, context, and next steps together. Let’s make your
            property operations work better.
          </p>
          <div className={styles.actions}>
            <TrackedLink
              destination={siteConfig.signupUrl}
              eventLabel="landing_final_get_started"
              className={styles.primaryButton}
            >
              Get started <ArrowRight size={17} />
            </TrackedLink>
            <a href="/demo" className={styles.textButton}>
              Request demo
            </a>
          </div>
        </div>
        <div className={styles.ctaPreview}>
          {property ? (
            <RuneyWorkspace initialView="Approvals" />
          ) : (
            <HomepageMedia closing />
          )}
        </div>
      </section>
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.slice(0, 6).map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
    </main>
  );
}
