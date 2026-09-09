"use client";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/home";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-support.module.css";

const topics = [
  {
    title: "Getting started with innflow",
    icon: "↗",
    links: [
      ["How innflow works", "/platform"],
      ["Explore a demo", siteConfig.demoUrl],
      ["Frequently asked questions", "/faq"],
    ],
  },
  {
    title: "Property operations",
    icon: "⌂",
    links: [
      ["Multi-property workflows", "/BL/BL-multi-property-investors"],
      ["Recurring work", "/BL/BL-rent-collection-2"],
      ["Property records", "/BL/BL-landlord-accounting"],
    ],
  },
  {
    title: "Residents and requests",
    icon: "☺",
    links: [
      ["Renter experience", "/BL/BL-renters"],
      ["Long-term rentals", "/BL/BL-long-term-rentals"],
      ["Short-term rentals", "/BL/BL-short-term-rentals"],
    ],
  },
  {
    title: "Connections and security",
    icon: "◇",
    links: [
      ["Integrations", "/integrations"],
      ["Security and compliance", "/platform/security-and-compliance"],
      ["Privacy policy", "/legal/privacy-policy"],
    ],
  },
];
export function BaselaneHelp() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const answers = faqs.filter((item) =>
    `${item.question} ${item.answer}`.toLowerCase().includes(term),
  );
  const links = topics
    .flatMap((topic) => topic.links)
    .filter(([label]) => label.toLowerCase().includes(term));
  return (
    <BaselaneHomepage>
      <div className={styles.help}>
        <section className={styles.helpHero}>
          <h1>How can we help?</h1>
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              aria-label="Search innflow help"
              placeholder="Search questions and topics"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </section>
        {term ? (
          <section className={styles.results}>
            <div className={styles.resultHeading}>
              <h2>Search results</h2>
              <button type="button" onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>
            <p role="status">
              {answers.length + links.length} results for “{query.trim()}”
            </p>
            {links.map(([label, href]) => (
              <a className={styles.resultLink} key={href} href={href}>
                {label} →
              </a>
            ))}
            {answers.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
            {answers.length + links.length === 0 && (
              <p>
                Try “maintenance”, “security”, or “demo”, or{" "}
                <a href={siteConfig.contactUrl}>contact our team</a>.
              </p>
            )}
          </section>
        ) : (
          <>
            <section className={styles.helpSection}>
              <h2>Contact us</h2>
              <div className={styles.contactGrid}>
                <a href={`mailto:${siteConfig.supportEmail}`}>
                  <span>✉</span>
                  <h3>Email support</h3>
                  <p>
                    Share your question and the details our team needs to help.
                  </p>
                </a>
                <a href={siteConfig.contactUrl}>
                  <span>☏</span>
                  <h3>Talk to our team</h3>
                  <p>
                    Discuss your property workflows and the next step for your
                    team.
                  </p>
                </a>
                <a
                  href={`mailto:${siteConfig.supportEmail}?subject=Feature%20request`}
                >
                  <span>✧</span>
                  <h3>Suggest a feature</h3>
                  <p>Tell us what would make your day-to-day work easier.</p>
                </a>
              </div>
            </section>
            <section className={styles.helpSection}>
              <h2>Browse topics</h2>
              <div className={styles.topicGrid}>
                {topics.map((topic) => (
                  <details key={topic.title}>
                    <summary>
                      <span className={styles.topicIcon}>{topic.icon}</span>
                      {topic.title}
                      <span className={styles.chevron}>⌄</span>
                    </summary>
                    <div>
                      {topic.links.map(([label, href]) => (
                        <a key={href} href={href}>
                          {label} →
                        </a>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
            <section className={styles.helpSection}>
              <h2>Popular resources</h2>
              <a className={styles.resource} href="/BL/BL-webinars">
                <span>▷</span>
                <div>
                  <h3>Workflow learning</h3>
                  <p>
                    Explore innflow workflow topics for property teams, from
                    recurring requests to document reviews.
                  </p>
                </div>
                <span>→</span>
              </a>
            </section>
          </>
        )}
      </div>
    </BaselaneHomepage>
  );
}
