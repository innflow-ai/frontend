import Image from "next/image";
import styles from "./baselane-deposits.module.css";
import { BaselaneHomepage } from "./baselane-homepage";
import shared from "./baselane-partners.module.css";

const states =
  "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming".split(
    ",",
  );
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
    "How can Innflow help with deposit-related work?",
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
    "Where do the state guides lead?",
    "The links above open Baselane's published state guides. They are external resources from that publisher; check current official requirements for your situation.",
  ],
  [
    "Where can I explore a workflow?",
    "Open the Innflow demo page to see the workspace and discuss the process your team would like to connect.",
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
    <a className={shared.button} href="https://app.innflow.ai/login">
      Continue with Google
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
                "/BL/BL-tax-preparation",
              ],
              [
                "tenants",
                "Resident context",
                "Keep requests and useful information connected.",
                "/BL/BL-renters",
              ],
              [
                "owners",
                "Property operations",
                "Give recurring work a clear path through your team.",
                "/BL/BL-landlord-banking",
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
          <h2>Explore state deposit guides.</h2>
          <p className={shared.centerCopy}>
            External reading published by Baselane. Confirm current requirements
            with official state sources and your adviser.
          </p>
          <nav
            className={styles.states}
            aria-label="Baselane state security deposit guides"
          >
            {states.map((state) => (
              <a
                key={state}
                href={`https://www.baselane.com/security-deposit-account/${state.toLowerCase().replaceAll(" ", "-")}`}
                target="_blank"
                rel="noreferrer"
              >
                {state}
                <span className={styles.srOnly}>
                  {" "}
                  — Baselane, opens a new tab
                </span>
              </a>
            ))}
          </nav>
        </section>
        <section className={shared.section}>
          <h2>Additional resources</h2>
          <p className={shared.centerCopy}>Selected reading from Baselane.</p>
          <div className={styles.resources}>
            <article>
              <Photo
                name="resource"
                alt="Two windows on the side of a white house"
              />
              <div className={styles.resourceCopy}>
                <h3>Collecting and managing deposits</h3>
                <a
                  className={shared.button}
                  href="https://www.baselane.com/resources/a-landlords-guide-to-collecting-and-managing-security-deposits"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read on Baselane ↗
                </a>
              </div>
            </article>
            <div>
              {[
                ["How much is a deposit?", "how-much-is-security-deposit"],
                ["Reviewing deposit deductions", "security-deposit-deductions"],
                ["Deposit accounting", "security-deposit-accounting"],
              ].map(([title, slug]) => (
                <a
                  key={slug}
                  href={`https://www.baselane.com/resources/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <small>BASELANE ARTICLE</small>
                  <h3>{title} ↗</h3>
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
