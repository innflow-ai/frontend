import Image from "next/image";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import styles from "./baselane-deposits.module.css";
import { BaselaneHomepage } from "./baselane-homepage";
import shared from "./baselane-partners.module.css";

const benefits = [
  {
    title: "Clarity for property owners",
    image: "owners",
    alt: "A man checking his phone",
    items: [
      [
        "Property condition records",
        "Keep inspection notes, photographs, and maintenance requests connected to the property they describe.",
      ],
      [
        "A consistent review process",
        "Organize the documents and questions your team needs to review before making a deposit decision.",
      ],
      [
        "Clear handoffs",
        "Assign outstanding tasks and keep the next reviewer connected to the supporting context.",
      ],
    ],
  },
  {
    title: "Clarity for residents",
    image: "tenants",
    alt: "A family together at home",
    items: [
      [
        "Shared context",
        "Prepare a clear explanation of the records and next steps your team wants to share with a resident.",
      ],
      [
        "Questions with an owner",
        "Give incoming questions a place in the workflow and make responsibility for responding explicit.",
      ],
      [
        "A record of the process",
        "Keep the information behind each decision together so your team can follow what happened.",
      ],
    ],
  },
];
const features = [
  [
    "Property context",
    "Organize the documents and tasks around the right property and resident.",
  ],
  [
    "Connected knowledge",
    "Keep the supporting information available to the people reviewing it.",
  ],
  [
    "Human approvals",
    "Include a review before a sensitive action or resident communication.",
  ],
  [
    "Repeatable workflows",
    "Build a consistent checklist for the team's move-in and move-out work.",
  ],
];
const faqs = [
  [
    "How can innflow help with deposit-related work?",
    "Use property context, supporting documents, and workflows to coordinate your team's review and follow-up tasks.",
  ],
  [
    "Does this page open a bank account?",
    "This page describes workflow coordination. It does not open a deposit account, hold funds, or provide banking services.",
  ],
  [
    "Can I organize records for different properties?",
    "Keep each process connected to its property context and the people responsible for reviewing it.",
  ],
  [
    "Where should payment processing happen?",
    "Use your chosen financial provider for collecting, holding, and returning funds. Confirm that provider's capabilities and requirements directly.",
  ],
  [
    "How should a team prepare a review?",
    "Gather the relevant agreement, condition records, communications, and open questions. Decide who needs to review the information before the next action.",
  ],
  [
    "Can a workflow include human approval?",
    "Yes. Define the point where a person needs to review the context and approve the next step.",
  ],
  [
    "Where should I keep local requirements?",
    "Keep current official requirements and your adviser’s notes with the property record. The related innflow pages help organize supporting documents and follow-up tasks.",
  ],
  [
    "Where can I explore a workflow?",
    "Open the innflow demo page to see the workspace and discuss the process your team would like to connect.",
  ],
];
function Photo({
  name,
  alt,
  hero = false,
}: {
  name: string;
  alt: string;
  hero?: boolean;
}) {
  return (
    <Image
      className={shared.photo}
      src={`/brand/baselane-inspired/deposits/${name}.webp`}
      alt={alt}
      width={1164}
      height={1000}
      priority={hero}
    />
  );
}
function GoogleAction() {
  return (
    <a className={shared.button} href={siteConfig.googleAuthUrl}>
      <GoogleCtaContent />
    </a>
  );
}
export function BaselaneDeposits() {
  return (
    <BaselaneHomepage>
      <div className={`${shared.page} ${styles.page}`}>
        <section className={shared.hero}>
          <div className={shared.heroCopy}>
            <h1>Bring clarity to deposit-related work.</h1>
            <p>
              Connect the records, questions, and review steps behind every
              move-in and move-out.
            </p>
            <GoogleAction />
            <a className={styles.secondary} href="#deposit-benefits">
              Explore the workflow ↓
            </a>
          </div>
          <Photo
            name="hero"
            alt="A house with a brick chimney and a covered entrance"
            hero
          />
        </section>
        <div className={styles.band}>
          {["Property context", "Connected documents", "Human review"].map(
            (text) => (
              <span key={text}>✓ {text}</span>
            ),
          )}
        </div>
        <section className={shared.section} id="deposit-benefits">
          <h2>A clearer process for everyone.</h2>
          <p className={shared.centerCopy}>
            Keep the supporting information together, from the first inspection
            to the final handoff.
          </p>
        </section>
        {benefits.map((section, index) => (
          <section
            className={`${shared.steps} ${styles.benefit} ${index === 0 ? shared.referralSteps : ""}`}
            key={section.title}
          >
            <div className={shared.stepsCopy}>
              <h2>{section.title}</h2>
              <div className={shared.accordion}>
                {section.items.map(([title, text], i) => (
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
            </div>
            <Photo name={section.image} alt={section.alt} />
          </section>
        ))}
        <section className={shared.section}>
          <h2>Connect the work around each deposit.</h2>
          <p className={shared.centerCopy}>
            Keep the process organized while your chosen financial provider
            handles the funds.
          </p>
          <div className={styles.features}>
            {features.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={shared.section}>
          <h2>Essentials for every property.</h2>
          <p className={shared.centerCopy}>
            Follow the information through the rest of your team's work.
          </p>
          <div className={shared.cards}>
            {[
              [
                "hero",
                "Tax preparation",
                "Coordinate the records and review steps for your adviser.",
                "/tax-preparation",
              ],
              [
                "tenants",
                "Resident context",
                "Keep requests and useful information connected.",
                "/renters",
              ],
              [
                "owners",
                "Property operations",
                "Give recurring work a clear path through your team.",
                "/landlord-banking",
              ],
            ].map(([image, title, text, href]) => (
              <article key={title}>
                <Photo name={image} alt="" />
                <h3>{title}</h3>
                <p>{text}</p>
                <a className={shared.textLink} href={href}>
                  Explore {title.toLowerCase()} →
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.start}>
          <div>
            <h2>Start with a clear next step.</h2>
            <GoogleAction />
          </div>
          <div>
            {[
              [
                "Gather the context",
                "Bring together property records, supporting documents, and the questions to resolve.",
              ],
              [
                "Define the review",
                "Decide who owns the task and where human approval belongs.",
              ],
              [
                "Connect the handoff",
                "Keep the outcome and next steps available to the team.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={shared.section}>
          <h2>Keep the requirements with the property.</h2>
          <p className={shared.centerCopy}>
            Use innflow to connect source documents, review notes, and the
            person responsible for each follow-up. Confirm applicable
            requirements with your adviser.
          </p>
          <div className={styles.resources}>
            <article>
              <Photo
                name="resource"
                alt="Two windows on the side of a white house"
              />
              <div className={styles.resourceCopy}>
                <h3>Prepare a deposit-document handoff</h3>
                <a
                  className={shared.button}
                  href="/free-rental-forms-and-templates-for-landlords"
                >
                  Explore preparation worksheets →
                </a>
              </div>
            </article>
            <div>
              {[
                ["Keep supporting records together", "/landlord-accounting"],
                ["Connect the lease review", "/lease-agreement"],
                ["Coordinate resident follow-up", "/renters"],
              ].map(([title, href]) => (
                <a key={href} href={href}>
                  <small>INNFLOW WORKFLOW</small>
                  <h3>{title} →</h3>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.start}>
          <h2>FAQs</h2>
          <div className={shared.accordion}>
            {faqs.map(([title, text]) => (
              <details key={title}>
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
      </div>
    </BaselaneHomepage>
  );
}
