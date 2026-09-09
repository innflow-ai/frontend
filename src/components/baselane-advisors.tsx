"use client";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./baselane-advisors.module.css";
import { BaselaneHomepage } from "./baselane-homepage";

const source = "#advisor-inquiry";
const topics = [
  [
    "Property context",
    "Keep the property, entity, documents, and discussion together before the next client meeting.",
  ],
  [
    "Document workflows",
    "Give each requested item a clear owner and track what is ready for review.",
  ],
  [
    "Connected tools",
    "Review the integrations your team needs and the access each connection requires.",
  ],
  [
    "Shared follow-through",
    "Turn a conversation into assigned actions with supporting context close at hand.",
  ],
];
export function BaselaneAdvisors() {
  const [advisorType, setAdvisorType] = useState("");
  const [draft, setDraft] = useState("");
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <h1>Bring clarity to every client conversation.</h1>
            <p>
              Coordinate client records, document requests, and review steps in
              innflow. Spend less time chasing context before you give advice.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href="#advisor-inquiry">
                Start a conversation
              </a>
              <a className={styles.outline} href="#program-details">
                Explore the workflow →
              </a>
            </div>
            <p className={styles.note}>
              Build a shared process around your client’s property work, with
              clear ownership from the first request to the final review.
            </p>
          </div>
          <Image
            src="/brand/baselane-inspired/advisors/hero.webp"
            width={1164}
            height={792}
            priority
            alt="An advisor discussing property records"
          />
        </section>
        <div className={styles.band}>
          {[
            "Property context",
            "Shared records",
            "Clear ownership",
            "Connected follow-up",
          ].map((item, i) => (
            <div key={item}>
              <span>0{i + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <section className={styles.section}>
          <p className={styles.eyebrow}>Built around your advisory work</p>
          <div className={styles.benefits}>
            {[
              [
                "Accountants",
                "Gather property records and resolve open questions before the year-end handoff.",
              ],
              [
                "Bookkeepers",
                "Keep missing documents, team responses, and review tasks in one shared process.",
              ],
              [
                "Property advisors",
                "Connect meeting notes to owners and next actions, so the advice keeps moving.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2>Keep the context behind the advice.</h2>
          <p>
            Give your team a shared starting point, from the first document
            request through the next action.
          </p>
          <div className={styles.split}>
            <div className={styles.accordion}>
              {topics.map(([title, text], i) => (
                <details key={title} name="advisor-topics" open={i === 0}>
                  <summary>
                    {title}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{text}</p>
                </details>
              ))}
            </div>
            <Image
              src="/brand/baselane-inspired/advisors/benefits.webp"
              width={1160}
              height={1000}
              alt="A professional discussing client records on a call"
            />
          </div>
        </section>
        <section className={styles.section}>
          <h2>A stronger working relationship.</h2>
          <div className={styles.benefits}>
            {[
              [
                "Connect",
                "Understand the people, tools, and handoffs around each client.",
              ],
              [
                "Coordinate",
                "Bring the next steps into one place, with ownership visible.",
              ],
              [
                "Review",
                "Keep a record of decisions and revisit outstanding questions.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section} id="program-details">
          <h2>A clear handoff at every stage.</h2>
          <p>
            Use innflow to connect the people and supporting records around each
            client engagement.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <caption>Example client coordination workflow</caption>
              <thead>
                <tr>
                  <th scope="col">Work to coordinate</th>
                  {["Prepare", "Review", "Follow through"].map((tier) => (
                    <th scope="col" key={tier}>
                      <span className={styles.tier}>{tier}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Property records",
                    "Gather source files",
                    "Confirm missing details",
                    "Share the prepared record",
                  ],
                  [
                    "Document requests",
                    "List required items",
                    "Check what is ready",
                    "Assign outstanding items",
                  ],
                  [
                    "Open questions",
                    "Collect team questions",
                    "Resolve with the adviser",
                    "Record the response",
                  ],
                  [
                    "Client decisions",
                    "Attach supporting context",
                    "Include the responsible person",
                    "Assign the agreed action",
                  ],
                  [
                    "Team handoffs",
                    "Identify the next owner",
                    "Confirm the review outcome",
                    "Track the next step",
                  ],
                ].map(([topic, ...steps]) => (
                  <tr key={topic}>
                    <th scope="row">{topic}</th>
                    {steps.map((step) => (
                      <td key={step}>{step}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            Tell us how your firm works with property teams. We can discuss
            workflow fit, required connections, and the next steps together.
          </p>
        </section>
        <section className={styles.section}>
          <div className={styles.split}>
            <Image
              src="/brand/baselane-inspired/advisors/investors.webp"
              width={1740}
              height={1500}
              alt="An investor reviewing information on a phone"
            />
            <div>
              <h2>Choose your next step.</h2>
              <div className={styles.accordion}>
                {[
                  [
                    "Map your process",
                    "Talk through the document requests and handoffs your firm handles most often.",
                    source,
                  ],
                  [
                    "Learn together",
                    "Explore self-guided workflow topics for the property work your team handles.",
                    "/webinars",
                  ],
                  [
                    "Talk to innflow",
                    "Describe the client workflow you want to connect.",
                    "#advisor-inquiry",
                  ],
                ].map(([title, text, href], i) => (
                  <details key={title} name="advisor-next" open={i === 0}>
                    <summary>
                      {title}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{text}</p>
                    <a href={href}>Continue →</a>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.inquiry} id="advisor-inquiry">
          <h2>Start with the work you want to improve.</h2>
          <p>
            Prepare an innflow partnership inquiry. You can review the draft
            before opening your email app; nothing is submitted here.
          </p>
          <form
            onInput={() => setDraft("")}
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              setDraft(
                [
                  `Name: ${data.get("firstName")} ${data.get("lastName")}`,
                  `Email: ${data.get("email")}`,
                  `Phone: ${data.get("phone") || "Not provided"}`,
                  `Advisor type: ${data.get("advisorType")}${advisorType === "Other" ? ` — ${data.get("otherType")}` : ""}`,
                  `Client count: ${data.get("clients")}`,
                  `Workflow: ${data.get("workflow")}`,
                ].join("\n"),
              );
            }}
          >
            <div className={styles.fields}>
              <label>
                First name
                <input
                  name="firstName"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  autoComplete="family-name"
                  required
                  maxLength={80}
                />
              </label>
              <label>
                Work email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                />
              </label>
              <label>
                Phone (optional)
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                />
              </label>
              <label>
                Advisor type
                <select
                  name="advisorType"
                  required
                  value={advisorType}
                  onChange={(event) => {
                    setAdvisorType(event.target.value);
                    setDraft("");
                  }}
                >
                  <option value="">Select one…</option>
                  {[
                    "CPA / Accountant",
                    "Bookkeeper",
                    "Property manager",
                    "Financial advisor",
                    "Other",
                  ].map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label>
                Real estate clients
                <select name="clients" required defaultValue="">
                  <option value="" disabled>
                    Select a range…
                  </option>
                  {["1–10", "11–50", "51–200", "200+"].map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </label>
              {advisorType === "Other" && (
                <label className={styles.wide}>
                  Describe your role
                  <input name="otherType" required maxLength={120} />
                </label>
              )}
              <label className={styles.wide}>
                What workflow would you like to connect?
                <textarea name="workflow" required maxLength={1200} rows={3} />
              </label>
            </div>
            <button type="submit" className={styles.button}>
              Prepare inquiry →
            </button>
          </form>
          {draft && (
            <div className={styles.draft} role="status">
              <h3>Review your inquiry</h3>
              <pre>{draft}</pre>
              <a
                className={styles.button}
                href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent("Advisor partnership inquiry")}&body=${encodeURIComponent(draft)}`}
              >
                Open email draft ↗
              </a>
              <p>
                Addressed to {siteConfig.supportEmail}. Send from your email app
                when ready.
              </p>
            </div>
          )}
        </section>
      </div>
    </BaselaneHomepage>
  );
}
