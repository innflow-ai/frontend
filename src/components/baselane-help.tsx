"use client";

import { useState } from "react";
import { ChevronRight } from "@/components/chevron-right";
import {
  ArrowRight as MageArrowRight,
  Box3d as MageBox3d,
  ChevronDown as MageChevronDown,
  Email as MageEmail,
  Home as MageHome,
  Phone as MagePhone,
  Play as MagePlay,
  Search as MageSearch,
  StarsA as MageStarsA,
  UserCircle as MageUserCircle,
} from "@/components/icons/mage";
import { MixedHeadingText } from "@/components/mixed-heading-text";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/home";
import styles from "./baselane-support.module.css";
import { InnerPageShell } from "./inner-page-shell";

const topics = [
  {
    title: "Getting started with innflow",
    icon: <ChevronRight />,
    links: [
      ["How innflow works", "/platform"],
      ["Explore a demo", siteConfig.demoUrl],
      ["Frequently asked questions", "/faq"],
    ],
  },
  {
    title: "Property operations",
    icon: <MageHome size="1em" />,
    links: [
      ["Multi-property workflows", "/multi-property-investors"],
      ["Recurring work", "/rent-collection-2"],
      ["Property records", "/landlord-accounting"],
    ],
  },
  {
    title: "Residents and requests",
    icon: <MageUserCircle size="1em" />,
    links: [
      ["Renter experience", "/renters"],
      ["Long-term rentals", "/long-term-rentals"],
      ["Short-term rentals", "/short-term-rentals"],
    ],
  },
  {
    title: "Connections and security",
    icon: <MageBox3d size="1em" />,
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
    <InnerPageShell>
      <div className={styles.help}>
        <section className={styles.helpHero}>
          <h1 data-mixed-heading>
            <MixedHeadingText>How can we help?</MixedHeadingText>
          </h1>
          <label className={styles.search}>
            <span aria-hidden="true">
              <MageSearch size="1em" />
            </span>
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
              <h2 data-mixed-heading>
                <MixedHeadingText>Search results</MixedHeadingText>
              </h2>
              <button type="button" onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>
            <p role="status">
              {answers.length + links.length} results for “{query.trim()}”
            </p>
            {links.map(([label, href]) => (
              <a className={styles.resultLink} key={href} href={href}>
                {label} <MageArrowRight size="1em" />
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
              <h2 data-mixed-heading>
                <MixedHeadingText>Contact us</MixedHeadingText>
              </h2>
              <div className={styles.contactGrid}>
                <a href={`mailto:${siteConfig.supportEmail}`}>
                  <span>
                    <MageEmail size="1em" />
                  </span>
                  <h3 data-mixed-heading>
                    <MixedHeadingText>Email support</MixedHeadingText>
                  </h3>
                  <p>
                    Share your question and the details our team needs to help.
                  </p>
                </a>
                <a href={siteConfig.contactUrl}>
                  <span>
                    <MagePhone size="1em" />
                  </span>
                  <h3 data-mixed-heading>
                    <MixedHeadingText>Talk to our team</MixedHeadingText>
                  </h3>
                  <p>
                    Discuss your property workflows and the next step for your
                    team.
                  </p>
                </a>
                <a
                  href={`mailto:${siteConfig.supportEmail}?subject=Feature%20request`}
                >
                  <span>
                    <MageStarsA size="1em" />
                  </span>
                  <h3 data-mixed-heading>
                    <MixedHeadingText>Suggest a feature</MixedHeadingText>
                  </h3>
                  <p>Tell us what would make your day-to-day work easier.</p>
                </a>
              </div>
            </section>
            <section className={styles.helpSection}>
              <h2 data-mixed-heading>
                <MixedHeadingText>Browse topics</MixedHeadingText>
              </h2>
              <div className={styles.topicGrid}>
                {topics.map((topic) => (
                  <details key={topic.title}>
                    <summary>
                      <span className={styles.topicIcon}>{topic.icon}</span>
                      {topic.title}
                      <span className={styles.chevron}>
                        <MageChevronDown size="1em" />
                      </span>
                    </summary>
                    <div>
                      {topic.links.map(([label, href]) => (
                        <a key={href} href={href}>
                          {label} <MageArrowRight size="1em" />
                        </a>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
            <section className={styles.helpSection}>
              <h2 data-mixed-heading>
                <MixedHeadingText>Popular resources</MixedHeadingText>
              </h2>
              <a className={styles.resource} href="/webinars">
                <span>
                  <MagePlay size="1em" />
                </span>
                <div>
                  <h3 data-mixed-heading>
                    <MixedHeadingText>Workflow learning</MixedHeadingText>
                  </h3>
                  <p>
                    Explore innflow workflow topics for property teams, from
                    recurring requests to document reviews.
                  </p>
                </div>
                <span>
                  <MageArrowRight size="1em" />
                </span>
              </a>
            </section>
          </>
        )}
      </div>
    </InnerPageShell>
  );
}
