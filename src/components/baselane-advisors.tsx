"use client";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./baselane-advisors.module.css";
import { BaselaneHomepage } from "./baselane-homepage";

const source = "https://get.baselane.com/advisor-partner-program";
const stories = [
  {
    image: "nick",
    name: "Nick Aiola",
    role: "Founder & CEO, aiola cpa",
    theme: "Less year-end cleanup",
    detail:
      "Nick describes how organized client records reduced the preparation work his firm faced at tax time.",
  },
  {
    image: "lawrence",
    name: "Lawrence Courtien",
    role: "Partner, Vestora AI",
    theme: "More room for advice",
    detail:
      "Lawrence describes using Baselane to reduce repetitive bookkeeping work and spend more time on client strategy.",
  },
  {
    image: "phillip",
    name: "Phillip Munoz",
    role: "Real estate investor",
    theme: "A connected financial picture",
    detail:
      "Phillip describes keeping property accounts separate and staying current with bookkeeping throughout the year.",
  },
];
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
            <p className={styles.eyebrow}>
              For accountants, bookkeepers & property advisors
            </p>
            <h1>Bring clarity to every client conversation.</h1>
            <p>
              Explore a connected way to coordinate property work with Innflow,
              and discover Baselane’s advisor-program resources.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href="#advisor-inquiry">
                Start a conversation
              </a>
              <a className={styles.outline} href="#program-details">
                Explore the program →
              </a>
            </div>
            <p className={styles.note}>
              The banking product illustration and partner stories below belong
              to Baselane.
            </p>
          </div>
          <Image
            src="/brand/baselane-inspired/advisors/hero.webp"
            width={1164}
            height={792}
            priority
            alt="Baselane property account illustration above an advisor conversation"
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
          <p className={styles.eyebrow}>
            Perspectives from Baselane’s advisor community
          </p>
          <div className={styles.stories}>
            {stories.map((story) => (
              <article key={story.name}>
                <div className={styles.portrait}>
                  <Image
                    src={`/brand/baselane-inspired/advisors/${story.image}.webp`}
                    fill
                    sizes="(max-width:700px) 90vw, 30vw"
                    alt={story.name}
                  />
                  <div className={styles.identity}>
                    <span>{story.name}</span>
                    <small>{story.role}</small>
                  </div>
                  <h3>{story.theme}</h3>
                </div>
                <details>
                  <summary>
                    Read the perspective <span aria-hidden="true">+</span>
                  </summary>
                  <p>{story.detail}</p>
                  <a href={source}>Read Baselane’s story ↗</a>
                </details>
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
              alt="Baselane cash-flow illustration beside a professional on a call"
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
          <h2>Explore Baselane’s advisor program.</h2>
          <p>
            The original program has three partner tiers. Use this overview to
            find the details to review with Baselane.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <caption>
                Baselane program overview — provider terms apply
              </caption>
              <thead>
                <tr>
                  <th scope="col">Program topic</th>
                  {["Bronze", "Silver", "Gold"].map((tier) => (
                    <th scope="col" key={tier}>
                      <span className={styles.tier}>{tier}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Balance requirements",
                  "Referral rewards",
                  "Banking rewards",
                  "Advisor badge",
                  "Directory access",
                  "Client subscription",
                  "Client onboarding",
                  "Co-marketing",
                  "Featured listing",
                ].map((topic) => (
                  <tr key={topic}>
                    <th scope="row">{topic}</th>
                    {["Bronze", "Silver", "Gold"].map((tier) => (
                      <td key={tier}>
                        <a
                          href={`${source}#benefits-module`}
                          aria-label={`Review ${tier} ${topic.toLowerCase()}`}
                        >
                          View terms ↗
                        </a>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            This is a Baselane resource, not an Innflow reward offer or
            enrollment. Confirm eligibility, benefits, and payment conditions
            with the program provider.
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
                    "Explore the provider",
                    "Read the original partner program and contact Baselane for enrollment.",
                    source,
                  ],
                  [
                    "Learn together",
                    "Browse the masterclass collection for conversations about property work.",
                    "/BL/BL-webinars",
                  ],
                  [
                    "Talk to Innflow",
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
            Prepare an Innflow partnership inquiry. You can review the draft
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
