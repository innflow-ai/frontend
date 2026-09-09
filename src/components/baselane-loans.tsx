"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-loans.module.css";

const source = siteConfig.demoUrl;
const types = [
  {
    name: "Conventional loan",
    anchor: "tab-conventional-loan",
    focus: "Income, credit, and property documentation",
    questions: [
      "Which income records are required?",
      "What down payment and reserves apply?",
      "Which repayment terms are available?",
    ],
  },
  {
    name: "Asset-backed loans (DSCR)",
    anchor: "tab-asset-backed-loans",
    focus: "The property and its rental income",
    questions: [
      "How does the lender calculate coverage?",
      "Which rent records are accepted?",
      "What property and borrower requirements apply?",
    ],
  },
  {
    name: "Hard money loans",
    anchor: "tab-hard-money-loans",
    focus: "The project, timeline, and exit plan",
    questions: [
      "How are renovation costs reviewed?",
      "What fees and repayment dates apply?",
      "What happens if the project is delayed?",
    ],
  },
  {
    name: "HELOC",
    anchor: "tab-heloc",
    focus: "Equity, access to funds, and repayment",
    questions: [
      "How is available equity assessed?",
      "What are the draw and repayment periods?",
      "How can the rate or payment change?",
    ],
  },
];
const faqTopics = [
  "Property eligibility",
  "Borrower requirements",
  "Available loan amounts",
  "Rates and fees",
  "Required documents",
  "Property valuation",
  "Funding timelines",
  "Accessing funds",
  "Repayment terms",
  "Refinancing options",
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
      className={styles.photo}
      src={`/brand/baselane-inspired/loans/${name}.webp`}
      alt={alt}
      width={1164}
      height={800}
      priority={hero}
    />
  );
}
export function BaselaneLoans() {
  const [tab, setTab] = useState(0);
  const current = types[tab];
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <h1>Get your next property project ready.</h1>
            <p>
              Bring project records, document requests, and lender follow-ups
              into one innflow workflow. Keep your team ready for the next
              conversation.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href={source}>
                Explore innflow →
              </a>
              <a className={styles.outline} href="#loan-details">
                Compare loan types
              </a>
            </div>
          </div>
          <Photo name="hero" alt="A residential property" hero />
        </section>
        <div className={styles.band}>
          <span>Financing preparation</span>
          <span>Four loan categories</span>
          <span>Questions for your lender</span>
        </div>
        <section className={styles.section}>
          <h2>Resources for different property plans.</h2>
          <p className={styles.lead}>
            Organize the documents and handoffs around the project you have in
            mind.
          </p>
          <div className={styles.categories}>
            {[
              "Rentals",
              "Short-term rentals",
              "BRRRR",
              "New construction",
              "Fix and flips",
              "FHA",
              "HELOC",
            ].map((name, index) => (
              <a href="#loan-details" key={name}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{name}</h3>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
        <section className={styles.split}>
          <div>
            <h2>Keep every property in context.</h2>
            <p>
              Connect each property’s location, project scope, and open
              requests. Give your team a clear record to share with its chosen
              lender.
            </p>
            <a className={styles.button} href={source}>
              See the workspace →
            </a>
            <p className={styles.note}>
              innflow coordinates preparation and follow-up. Your lender handles
              applications, eligibility, and financing.
            </p>
          </div>
          <Photo
            name="values"
            alt="Residential properties across a neighborhood"
          />
        </section>
        <section className={styles.section}>
          <h2>Explore the loan categories.</h2>
          <div className={styles.cards}>
            {types.map((type, index) => (
              <article key={type.name}>
                <h3>{type.name}</h3>
                <p>{type.focus}</p>
                <button
                  type="button"
                  className={styles.reviewButton}
                  onClick={() => {
                    setTab(index);
                    document
                      .getElementById("loan-details")
                      ?.scrollIntoView({ block: "start", behavior: "instant" });
                    document
                      .getElementById(`loan-tab-${index}`)
                      ?.focus({ preventScroll: true });
                  }}
                >
                  Review questions →
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.split}>
          <Photo
            name="property"
            alt="A property investor reviewing information on a phone"
          />
          <div>
            <h2>Keep the project context together.</h2>
            <p>
              Collect the property details, the proposed work, and your timeline
              before starting a conversation. A clear project record gives
              everyone a shared starting point.
            </p>
            <a className={styles.outline} href={siteConfig.demoUrl}>
              Explore innflow →
            </a>
          </div>
        </section>
        <section className={styles.split}>
          <div>
            <h2>Make the conversation useful.</h2>
            <div className={styles.values}>
              {[
                ["Be specific", "Describe the project and desired outcome."],
                [
                  "Keep records",
                  "Retain the information behind each estimate.",
                ],
                ["Ask questions", "Clarify the terms you do not understand."],
                ["Follow through", "Record owners and next actions."],
              ].map(([title, text]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <Photo name="values" alt="Residential rooftops" />
        </section>
        <section className={styles.section} id="loan-details">
          <h2>A closer look at each option.</h2>
          <p className={styles.lead}>
            Use these prompts to structure a discussion. The lender determines
            terms and eligibility.
          </p>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Loan categories"
          >
            {types.map((type, index) => (
              <button
                type="button"
                role="tab"
                key={type.name}
                id={`loan-tab-${index}`}
                aria-selected={tab === index}
                aria-controls="loan-panel"
                tabIndex={tab === index ? 0 : -1}
                onClick={() => setTab(index)}
                onKeyDown={(event) => {
                  const next =
                    event.key === "ArrowRight"
                      ? (tab + 1) % 4
                      : event.key === "ArrowLeft"
                        ? (tab + 3) % 4
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 3
                            : null;
                  if (next !== null) {
                    event.preventDefault();
                    setTab(next);
                    event.currentTarget.parentElement
                      ?.querySelectorAll<HTMLButtonElement>("button")
                      [next]?.focus();
                  }
                }}
              >
                {type.name}
              </button>
            ))}
          </div>
          <div
            className={styles.panel}
            role="tabpanel"
            id="loan-panel"
            aria-labelledby={`loan-tab-${tab}`}
          >
            <div>
              <h3>{current.name}</h3>
              <p>{current.focus}</p>
              <ul>
                {current.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Before you proceed</h3>
              <div className={styles.checks}>
                <section>
                  <h4>Confirm</h4>
                  <p>
                    Product availability, fees, documentation, and the full
                    repayment schedule.
                  </p>
                </section>
                <section>
                  <h4>Record</h4>
                  <p>
                    The lender’s answers, supporting documents, and outstanding
                    questions.
                  </p>
                </section>
              </div>
              <a className={styles.button} href={source}>
                Plan your workflow →
              </a>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <h2>A starting point for every stage.</h2>
          <div className={styles.audiences}>
            {[
              [
                "new",
                "For a first project",
                "Build a clear record of the property and the questions you need answered.",
              ],
              [
                "experienced",
                "For a growing portfolio",
                "Keep each project’s documents, discussions, and next actions organized.",
              ],
            ].map(([image, title, text]) => (
              <article key={image}>
                <Photo name={image} alt={title} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2>Compare the conversation topics.</h2>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Topic</th>
                  <th scope="col">DSCR</th>
                  <th scope="col">Fix and flip</th>
                  <th scope="col">HELOC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Project",
                    "Rental property",
                    "Renovation plan",
                    "Use of equity",
                  ],
                  [
                    "Documents",
                    "Rental records",
                    "Scope and budget",
                    "Property and mortgage records",
                  ],
                  [
                    "Timing",
                    "Purchase or refinance",
                    "Work and exit schedule",
                    "Draw and repayment schedule",
                  ],
                  [
                    "Questions",
                    "Coverage calculation",
                    "Cost overruns",
                    "Rate and payment changes",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((text, i) =>
                      i === 0 ? (
                        <th scope="row" key={text}>
                          {text}
                        </th>
                      ) : (
                        <td key={text}>{text}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.section}>
          <h2>Prepare for the next conversation.</h2>
          <div className={styles.steps}>
            {[
              ["Gather", "Collect the project details."],
              ["Review", "Read the provider’s information."],
              ["Discuss", "Confirm the terms and requirements."],
              ["Coordinate", "Track the agreed next steps."],
            ].map(([title, text], index) => (
              <article key={title}>
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <a className={styles.button} href={source}>
            Explore financing workflows →
          </a>
        </section>
        <section className={styles.faq}>
          <h2>Questions to bring to your lender</h2>
          {faqTopics.map((topic) => (
            <details key={topic}>
              <summary>
                {topic}
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Ask the provider to explain {topic.toLowerCase()} for your
                specific property and application. This page does not assess
                eligibility or offer financing.
              </p>
              <a href={source}>Discuss your workflow with innflow →</a>
            </details>
          ))}
        </section>
      </div>
    </BaselaneHomepage>
  );
}
