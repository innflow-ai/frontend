import Image from "next/image";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-security.module.css";

const sections = [
  {
    id: "review",
    title: "Start with your security requirements.",
    alt: "A hand unlocking a front door",
    items: [
      [
        "Evidence and deployment scope",
        "Identify the standards and documentation relevant to your organization. Request current evidence for the proposed deployment before treating a requirement as satisfied.",
      ],
      [
        "Connected services",
        "Map the services involved in your workflow and the permissions each connection needs. Review their processing terms alongside your own requirements.",
      ],
      [
        "Human review points",
        "Define which actions need a person's approval, who can approve them, and the context they need before making a decision.",
      ],
      [
        "Operational ownership",
        "Establish who maintains the controls and who responds when an issue appears. Include network access, operations, and recovery in the review.",
      ],
    ],
  },
  {
    id: "access",
    title: "Match access to responsibility.",
    alt: "A person working with a laptop",
    items: [
      [
        "Workspace permissions",
        "Define who can view, change, and approve the work. Match access to the responsibilities of each person on the team.",
      ],
      [
        "Connected-account scopes",
        "Review the permissions granted to each connected account when roles or responsibilities change. Provider permissions and workflow approvals serve different purposes.",
      ],
      [
        "Action history",
        "Plan which events and decisions need a record. Agree on who can review that history and how long it should remain available.",
      ],
    ],
  },
  {
    id: "data",
    title: "Make data handling explicit.",
    alt: "A house roof beneath a blue sky",
    items: [
      [
        "Privacy and retention",
        "Map the data involved in your workflow and the services that process it. Review storage, retention, and regional requirements together.",
      ],
      [
        "Protection across the data path",
        "Document the protection expected for stored information and connections between systems. Confirm the controls used by each service in the proposed environment.",
      ],
      [
        "AI inputs and boundaries",
        "Treat external content as information to evaluate. Define action boundaries and human review points for requests that could affect sensitive records or decisions.",
      ],
    ],
  },
];
export function BaselaneSecurity() {
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <picture>
            <source
              media="(max-width:700px)"
              srcSet="/brand/baselane-inspired/security/hero-mobile.webp"
            />
            <Image
              src="/brand/baselane-inspired/security/hero-desktop.webp"
              alt="A woman using her phone at home"
              fill
              preload
              sizes="100vw"
            />
          </picture>
          <div>
            <h1>Build trust into the way work gets done.</h1>
            <p>
              Explore access, data handling, and operational governance with
              innflow. Bring your security requirements into the conversation
              from the start.
            </p>
          </div>
        </section>
        <section className={styles.intro}>
          <h2>
            A clear view of the work.
            <br />A clear view of the controls.
          </h2>
          <nav aria-label="Security topics">
            <a href="#review">
              <strong>Review</strong>
              <span>Evidence and requirements</span>
            </a>
            <a href="#access">
              <strong>Access</strong>
              <span>People and permissions</span>
            </a>
            <a href="#data">
              <strong>Data</strong>
              <span>Handling and boundaries</span>
            </a>
          </nav>
        </section>
        {sections.map((section, index) => (
          <div key={section.id}>
            <section
              id={section.id}
              className={`${styles.split} ${index === 1 ? styles.reverse : ""}`}
            >
              <div className={styles.photo}>
                <Image
                  src={`/brand/baselane-inspired/security/${section.id}.webp`}
                  alt={section.alt}
                  fill
                  sizes="(max-width:700px) 100vw, 50vw"
                />
              </div>
              <div className={styles.copy}>
                <h2>{section.title}</h2>
                <div>
                  {section.items.map(([title, text], i) => (
                    <details key={title} open={i === 0}>
                      <summary>{title}</summary>
                      <p>{text}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
            {index === 0 && (
              <section className={styles.policies}>
                <h2>Understand the terms behind the work.</h2>
                <p>
                  Review innflow’s published policies and bring your questions
                  to the team.
                </p>
                <div>
                  <a href="/BL/BL-privacy-policy">Privacy Policy ↗</a>
                  <a href="/BL/BL-terms-of-use">Terms of Service ↗</a>
                  <a href="/BL/BL-legal-agreements">All agreements ↗</a>
                </div>
              </section>
            )}
          </div>
        ))}
        <section className={styles.contact}>
          <div>
            <h2>Discuss your requirements.</h2>
            <p>
              Certification, encryption, and residency requirements are reviewed
              for the proposed implementation.
            </p>
          </div>
          <a href="/contact">Talk to the team ↗</a>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
