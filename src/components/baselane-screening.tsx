"use client";

import Image from "next/image";
import { useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-screening.module.css";

const source = siteConfig.demoUrl;
const topics = [
  "Rental application",
  "Identity verification",
  "Income verification",
  "Credit report",
  "Eviction report",
  "Criminal report",
];
const faqs = [
  [
    "How does innflow support screening workflows?",
    "Coordinate the tasks around your chosen screening provider: document requests, team review, and the next handoff. Keep supporting context connected to the work.",
  ],
  [
    "Does innflow generate screening reports?",
    "Your screening provider handles report requests and applicant verification. innflow helps your team organize the surrounding process.",
  ],
  [
    "What does the checklist do?",
    "Select the steps your team wants to discuss. The checklist stays on this page and helps you prepare for a workflow demo.",
  ],
  [
    "Can my team review the next action?",
    "Use human review points to keep consequential decisions with the responsible person and the supporting information close at hand.",
  ],
  [
    "Where do applicants submit information?",
    "Use your chosen provider’s authorized intake process. This page does not collect applicant information.",
  ],
  [
    "How do I get started?",
    "Book a demo to discuss your current screening process, the tools you use, and the handoffs you want to improve.",
  ],
];
function Photo({
  name,
  alt,
  priority = false,
}: {
  name: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/baselane-inspired/screening/${name}.webp`}
      alt={alt}
      width={1200}
      height={1000}
      className={styles.photo}
      priority={priority}
    />
  );
}
export function BaselaneScreening() {
  const [selected, setSelected] = useState<boolean[]>([false, false, false]);
  const completed = selected.filter(Boolean).length;
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <div className={styles.dark}>
          <section className={styles.hero}>
            <div>
              <h1>
                <span>Screening workflows.</span>
                <br />
                Keep the next step clear.
              </h1>
              <p>
                Keep document requests, review tasks, and team handoffs
                connected in innflow, alongside your chosen screening provider.
              </p>
              <a className={styles.button} href="#screening-overview">
                Explore the workflow
              </a>
            </div>
            <Photo
              name="hero"
              alt="Illustrative screening workflow records"
              priority
            />
          </section>
          <div className={styles.band}>
            <span>Connected records</span>
            <span>Human review</span>
            <span>Connected workflow resources</span>
          </div>
          <p className={styles.attribution}>
            Your provider handles screening. innflow helps your team coordinate
            the work around each request.
          </p>
        </div>
        <section className={styles.section} id="screening-overview">
          <h2>Start with the information behind the report.</h2>
          <p className={styles.lead}>
            Connect the property context, assign a reviewer, and keep the
            follow-up visible from the start.
          </p>
          <div className={styles.actions}>
            <a className={styles.button} href={source}>
              See innflow in action →
            </a>
            <a
              className={styles.outline}
              href="/BL/BL-lease-agreement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore lease workflows →
            </a>
          </div>
          <div className={styles.three}>
            {[
              ["01", "Report scope", "See which information is included."],
              [
                "02",
                "Verification",
                "Review the provider’s verification methods.",
              ],
              ["03", "Next steps", "Connect the work that follows the report."],
            ].map(([number, title, text]) => (
              <article key={title}>
                <span className={styles.number}>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2>Compare the details that matter.</h2>
          <p className={styles.lead}>
            Use a shared checklist to clarify what your team needs from its
            provider and who is responsible for the next action.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Review area</th>
                  <th scope="col">Information to gather</th>
                  <th scope="col">Questions to review</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Report coverage",
                    "Credit and optional reports",
                    "What is included in the selected package?",
                  ],
                  [
                    "Rental history",
                    "Eviction report option",
                    "What records and locations are covered?",
                  ],
                  [
                    "Income",
                    "Verification option",
                    "How is information verified?",
                  ],
                  [
                    "Identity",
                    "Identity checks",
                    "What does the applicant provide?",
                  ],
                  [
                    "Pricing",
                    "Base price plus options",
                    "Which fees apply to this request?",
                  ],
                  [
                    "Workflow",
                    "Related rental tools",
                    "How will the next steps be coordinated?",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={cell} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={cell}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.section}>
          <h2>Explore the report sections.</h2>
          <p className={styles.lead}>
            Keep each review area connected to the supporting records.
          </p>
          {[0, 1].map((group) => (
            <div
              className={`${styles.split} ${group ? styles.reverse : ""}`}
              key={group}
            >
              <Photo
                name={group ? "report" : "application"}
                alt={
                  group
                    ? "Illustrative tenant report layout"
                    : "Illustrative applicant record layout"
                }
              />
              <div className={styles.topicList}>
                {topics.slice(group * 3, group * 3 + 3).map((topic) => (
                  <div key={topic}>
                    <h3>{topic}</h3>
                    <a href="/BL/BL-lease-agreement">
                      Connect the next handoff →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        <section
          className={`${styles.section} ${styles.pricing}`}
          id="report-options"
        >
          <h2>Plan the handoffs around screening.</h2>
          <p className={styles.lead}>
            Select the steps you want to connect with innflow.
          </p>
          <div className={styles.priceGrid}>
            <article>
              <span>YOUR STARTING POINT</span>
              <h3>A process your team can follow</h3>
              <ul>
                <li>Property and request context</li>
                <li>A responsible reviewer</li>
                <li>A clear next action</li>
              </ul>
            </article>
            <article>
              <span>WORKFLOW CHECKLIST</span>
              {[
                "Gather supporting documents",
                "Assign a review step",
                "Coordinate the follow-up",
              ].map((label, index) => (
                <label key={label}>
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={selected[index]}
                    onChange={() =>
                      setSelected(
                        selected.map((value, i) =>
                          i === index ? !value : value,
                        ),
                      )
                    }
                  />
                </label>
              ))}
              <div className={styles.total} aria-live="polite">
                <span>Steps selected</span>
                <strong>{completed} / 3</strong>
              </div>
              <a className={styles.button} href={source}>
                Discuss your workflow →
              </a>
              <p className={styles.note}>
                Use this checklist to prepare for a demo. Your selections stay
                on this page.
              </p>
            </article>
          </div>
        </section>
        <section className={styles.section}>
          <h2>Keep the next steps connected.</h2>
          <div className={styles.three}>
            {[
              ["screen", "Plan your screening workflow", source],
              ["lease", "Explore lease workflows", "/BL/BL-lease-agreement"],
              ["rent", "Explore rental workflows", "/BL/BL-rent-collection"],
            ].map(([image, title, href], index) => (
              <article key={image}>
                <Photo name={image} alt={`Illustrative ${image} workflow`} />
                <span className={styles.number}>{index + 1}</span>
                <h3>{title}</h3>
                <a className={styles.outline} href={href}>
                  Explore →
                </a>
              </article>
            ))}
          </div>
          <div className={styles.productBand}>
            <div>
              <h3>Bring context into the wider workflow.</h3>
              <a className={styles.button} href={siteConfig.demoUrl}>
                Explore innflow →
              </a>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <h2>A clearer process for everyone.</h2>
          <div className={styles.audiences}>
            {[
              [
                "owner",
                "For property teams",
                "Keep the source, status, and next action together.",
              ],
              [
                "resident",
                "For applicants",
                "Use the provider’s process to review requests and requirements.",
              ],
            ].map(([image, title, text]) => (
              <article key={image}>
                <Photo
                  name={image}
                  alt={
                    image === "owner"
                      ? "Property owner portrait"
                      : "Resident portrait"
                  }
                />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.faq}>
          <h2>Frequently asked questions</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        <section className={styles.closing}>
          <h2>Make the next step clear.</h2>
          <p>Explore how innflow can connect your team’s work.</p>
          <a className={styles.button} href={siteConfig.googleAuthUrl}>
            <GoogleCtaContent />
          </a>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
