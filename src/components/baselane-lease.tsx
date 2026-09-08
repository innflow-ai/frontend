import Image from "next/image";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-lease.module.css";
import shared from "./baselane-partners.module.css";

const steps = [
  [
    "Gather the property information",
    "Bring the relevant property details, supporting files, and open questions into one review process.",
  ],
  [
    "Choose your document provider",
    "Use a document provider or qualified professional to prepare the agreement for your circumstances.",
  ],
  [
    "Review the proposed terms",
    "Keep your team's questions and decisions connected to the document under review.",
  ],
  [
    "Coordinate the final handoff",
    "Complete signing with your chosen provider and organize the final records for your team.",
  ],
];
const faqs = [
  [
    "What does this Innflow page provide?",
    "A way to explore lease-related workflows and find the original Baselane lease resource. It does not generate or sign a lease.",
  ],
  [
    "Where can I find the referenced lease tool?",
    "Use the Baselane resource link on this page. The publisher manages its account requirements, documents, and signing process.",
  ],
  [
    "How can I organize the supporting information?",
    "Connect the relevant property details, documents, and questions to the workflow your team is reviewing.",
  ],
  [
    "Can someone approve a document handoff?",
    "Include a human approval step before sharing a document or proceeding with an action that needs review.",
  ],
  [
    "Does a template fit every property?",
    "Check the document against your situation and current local requirements with a qualified professional before relying on it.",
  ],
  [
    "Where can I find other forms?",
    "The rental forms page links to Baselane's collections of notices, administration forms, checklists, and spreadsheets.",
  ],
];
function Action() {
  return (
    <a className={shared.button} href="https://app.innflow.ai/login">
      Continue with Google
    </a>
  );
}
export function BaselaneLease() {
  return (
    <BaselaneHomepage>
      <div className={`${shared.page} ${styles.page}`}>
        <div className={styles.dark}>
          <section className={shared.hero}>
            <div className={shared.heroCopy}>
              <h1>Lease paperwork. Connected context.</h1>
              <p>
                Bring property details, document reviews, and team handoffs into
                a clearer process.
              </p>
              <Action />
              <a
                className={styles.sourceLink}
                href="https://www.baselane.com/lease-agreement"
                target="_blank"
                rel="noreferrer"
              >
                Explore Baselane's lease resource ↗
              </a>
            </div>
            <figure>
              <Image
                className={shared.photo}
                src="/brand/baselane-inspired/forms/lease-hero.webp"
                alt="Baselane illustration of signing lease paperwork"
                width={1100}
                height={970}
                priority
              />
              <figcaption>Lease resource illustration · Baselane</figcaption>
            </figure>
          </section>
        </div>
        <section className={styles.tinted}>
          <div className={styles.three}>
            {[
              [
                "01",
                "Keep context close",
                "Connect property information and the questions behind your document review.",
              ],
              [
                "02",
                "Include a reviewer",
                "Make ownership and approval points part of the workflow.",
              ],
              [
                "03",
                "Find useful resources",
                "Explore the original publisher's lease tools and document collections.",
              ],
            ].map(([n, title, text]) => (
              <article key={title}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={shared.steps}>
          <div className={styles.stepsCopy}>
            <h2>A clearer lease-document workflow.</h2>
            <p>
              Keep the information and people involved connected at each stage.
            </p>
            {steps.map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
            <a className={shared.button} href="/BL/BL-demo">
              Explore the Innflow demo
            </a>
          </div>
          <figure>
            <Image
              className={shared.photo}
              src="/brand/baselane-inspired/forms/lease-steps.webp"
              alt="Baselane illustration of a person reviewing a lease document"
              width={1100}
              height={970}
            />
            <figcaption>Lease resource illustration · Baselane</figcaption>
          </figure>
        </section>
        <section className={styles.tinted}>
          <div className={styles.why}>
            <div>
              <h2>Keep the work around the agreement organized.</h2>
              <Action />
            </div>
            <div className={styles.four}>
              {[
                [
                  "Property details",
                  "Keep the relevant facts attached to the review.",
                ],
                [
                  "Supporting files",
                  "Organize the documents that inform a decision.",
                ],
                [
                  "Review questions",
                  "Give unresolved questions an owner and next step.",
                ],
                [
                  "Team handoffs",
                  "Carry the context forward when the work changes hands.",
                ],
              ].map(([title, text], i) => (
                <article key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.why}>
          <h2>Frequently asked questions</h2>
          <div className={shared.accordion}>
            {faqs.map(([title, text], i) => (
              <details key={title} open={i === 0}>
                <summary>
                  {title}
                  <span className={shared.plus} aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{text}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={`${shared.closing} ${styles.dark}`}>
          <div>
            <h2>Find the right starting document.</h2>
            <p>Browse the forms and checklists in the resource library.</p>
            <a
              className={shared.button}
              href="/BL/BL-free-rental-forms-and-templates-for-landlords"
            >
              Browse rental forms
            </a>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
