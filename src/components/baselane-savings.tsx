import Image from "next/image";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-savings.module.css";

const source = "/BL/BL-demo";
const steps = [
  {
    image: "account",
    card: "account-card",
    title: "Gather your records",
    text: "Connect the account documents and property details your team needs to review.",
  },
  {
    image: "balances",
    card: "balances-card",
    title: "Set the review points",
    text: "Give recurring reserve reviews an owner, a checklist, and the right context.",
  },
  {
    image: "rent",
    card: "rent-card",
    title: "Coordinate the next step",
    text: "Turn review decisions into assigned tasks and keep the supporting notes attached.",
  },
];
const features = [
  {
    title: "Property context",
    items: [
      "Property records",
      "Supporting documents",
      "Team notes",
      "Connected knowledge",
    ],
  },
  {
    title: "Review workflows",
    items: [
      "Recurring tasks",
      "Clear ownership",
      "Review steps",
      "Human approvals",
    ],
  },
  {
    title: "Shared follow-through",
    items: [
      "Open questions",
      "Assigned actions",
      "Decision context",
      "Visible progress",
    ],
  },
];
const fees = [
  {
    title: "Preparation",
    items: [
      "Gather documents",
      "Confirm property details",
      "List open questions",
    ],
  },
  {
    title: "Review",
    items: [
      "Assign an owner",
      "Connect supporting records",
      "Record decisions",
    ],
  },
  {
    title: "Follow-up",
    items: ["Share next steps", "Track progress", "Resolve missing details"],
  },
  {
    title: "Recurring work",
    items: [
      "Plan the next review",
      "Update the checklist",
      "Keep context current",
    ],
  },
];

export function BaselaneSavings() {
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <h1>Keep property reserves connected to the plan.</h1>
            <p>
              Bring reserve plans, supporting records, and follow-up tasks into
              innflow. Keep the context behind each property decision within
              reach.
            </p>
            <a className={styles.button} href={source}>
              Explore innflow →
            </a>
          </div>
          <Image
            src="/brand/baselane-inspired/savings/hero.webp"
            width={1164}
            height={596}
            alt="An investor working on a laptop at home"
            priority
          />
        </section>
        <div className={styles.band}>
          <span>✓ Review the terms</span>
          <span>✓ Understand the conditions</span>
          <span>✓ Keep a record</span>
        </div>
        <section className={styles.section}>
          <h2>Start with the details.</h2>
          <div className={styles.steps}>
            {steps.map((step) => (
              <article key={step.image}>
                <div className={styles.scene}>
                  <Image
                    src={`/brand/baselane-inspired/savings/${step.image}.webp`}
                    fill
                    sizes="(max-width: 700px) 90vw, 30vw"
                    alt=""
                  />
                  <Image
                    className={styles.overlay}
                    src={`/brand/baselane-inspired/savings/${step.card}.webp`}
                    width={840}
                    height={566}
                    alt="Illustrative property records"
                  />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <p className={styles.note}>
            Illustrative records show how property context supports a review.
          </p>
        </section>
        <section className={styles.section} id="balance-tiers">
          <h2>Build a repeatable reserve review.</h2>
          <p>
            Make the purpose, supporting information, and next action clear
            before a decision moves forward.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <caption>Example reserve review checklist</caption>
              <thead>
                <tr>
                  <th scope="col">Review area</th>
                  <th scope="col">Supporting records</th>
                  <th scope="col">Team handoff</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Operating reserves",
                    "Current account records",
                    "Review with the responsible owner",
                  ],
                  [
                    "Upcoming repairs",
                    "Work requests and estimates",
                    "Confirm scope before approval",
                  ],
                  [
                    "Planned improvements",
                    "Project notes and proposals",
                    "Assign the next review",
                  ],
                  [
                    "Annual review",
                    "Prior decisions and open questions",
                    "Agree on the follow-up actions",
                  ],
                ].map(([area, records, handoff]) => (
                  <tr key={area}>
                    <th scope="row">{area}</th>
                    <td>{records}</td>
                    <td>{handoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            Keep your existing bank accounts. innflow supports the records,
            review steps, and follow-ups around your reserve planning.
          </p>
        </section>
        <section className={styles.features}>
          <div className={styles.featureInner}>
            <h2>Look at the whole picture.</h2>
            <p>Connect the work around your property plans.</p>
            <div className={styles.featureGrid}>
              {features.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <a className={styles.button} href={source}>
              See how innflow fits →
            </a>
          </div>
        </section>
        <section className={styles.section} id="fee-review">
          <h2>Give every follow-up an owner.</h2>
          <p>
            Organize the recurring tasks that keep your property plans current,
            from collecting records to closing out a review.
          </p>
          <div className={styles.fees}>
            {fees.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <a href={source}>{item} ↗</a>
                    </li>
                  ))}
                </ul>
                <a href={source}>Explore {group.title.toLowerCase()} →</a>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.support}>
          <h2>Keep the next step clear.</h2>
          <div>
            {[
              [
                "Ask",
                "Bring unresolved questions to the account provider. Keep their response alongside the information you reviewed.",
              ],
              [
                "Document",
                "Record the decision, its date, and the documents that informed it, so your team can follow the context.",
              ],
              [
                "Coordinate",
                "Connect the follow-up work in innflow, with an owner and a clear next action.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.closing}>
          <h2>Bring the work together.</h2>
          <p>
            Keep property decisions connected to the people carrying them out.
          </p>
          <div className={styles.actions}>
            <a className={styles.outline} href="/BL/BL-demo">
              See innflow →
            </a>
            <a className={styles.button} href={siteConfig.googleAuthUrl}>
              <GoogleCtaContent />
            </a>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
