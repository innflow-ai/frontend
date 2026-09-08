"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-screening.module.css";

const source =
  "https://www.baselane.com/tenant-management/tenant-screening-service";
const sample =
  "https://cdn.prod.website-files.com/68302b3f2baf68e6d1ecf558/68aca1e1af437f35d7b83764_Sample%20Tenant%20Screening%20Report.pdf";
const addons = [
  ["Criminal report", 5],
  ["Eviction report", 10],
  ["Income verification", 10],
] as const;
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
    "Does this page perform tenant screening?",
    "No. This page presents a screening resource and workflow reference. Open the provider's website to review and request its service.",
  ],
  [
    "Where can I see a sample?",
    "The sample-report link opens the PDF published by Baselane. It is an example, not a report about an applicant.",
  ],
  [
    "What does the pricing selector do?",
    "It adds the displayed optional report fees to the illustrated base price. It does not place an order or charge anyone.",
  ],
  [
    "Are these Innflow prices?",
    "No. The example uses the pricing shown on Baselane's reference page. Confirm current pricing and availability with the provider before proceeding.",
  ],
  [
    "Can I enter applicant information here?",
    "This page has no applicant intake form. Use the selected provider's authorized process for any applicant information.",
  ],
  [
    "How can Innflow fit into the process?",
    "Explore Innflow to organize the tasks, information, and follow-ups surrounding your team's work.",
  ],
  [
    "Can I review related document workflows?",
    "The lease and rental-workflow cards below link to the related Innflow design previews.",
  ],
  [
    "Where do I find the provider's full terms?",
    "Follow the original screening-page link to review the provider's descriptions, requirements, and terms.",
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
  const total =
    24.99 +
    addons.reduce(
      (sum, item, index) => sum + (selected[index] ? item[1] : 0),
      0,
    );
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <div className={styles.dark}>
          <section className={styles.hero}>
            <div>
              <h1>
                <span>Tenant screening.</span>
                <br />
                See the complete picture.
              </h1>
              <p>
                Explore a screening resource, understand the report options, and
                connect the next steps in your workflow.
              </p>
              <a className={styles.button} href="#screening-overview">
                Explore the resource
              </a>
            </div>
            <Photo
              name="hero"
              alt="Baselane screening illustration with report types"
              priority
            />
          </section>
          <div className={styles.band}>
            <span>Report examples</span>
            <span>Provider pricing illustration</span>
            <span>Connected workflow resources</span>
          </div>
          <p className={styles.attribution}>
            Screening services and product illustrations shown here are from
            Baselane.
          </p>
        </div>
        <section className={styles.section} id="screening-overview">
          <h2>Start with the information behind the report.</h2>
          <p className={styles.lead}>
            Review the source service and its sample before deciding what fits
            your process.
          </p>
          <div className={styles.actions}>
            <a className={styles.button} href={source}>
              View Baselane screening ↗
            </a>
            <a
              className={styles.outline}
              href={sample}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download sample report ↗
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
            Use the source page to review coverage and ask questions about the
            service.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Review area</th>
                  <th scope="col">Source offering</th>
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
          <p className={styles.lead}>Illustrations from Baselane’s product.</p>
          {[0, 1].map((group) => (
            <div
              className={`${styles.split} ${group ? styles.reverse : ""}`}
              key={group}
            >
              <Photo
                name={group ? "report" : "application"}
                alt={
                  group
                    ? "Baselane sample tenant report"
                    : "Baselane applicant overview"
                }
              />
              <div className={styles.topicList}>
                {topics.slice(group * 3, group * 3 + 3).map((topic) => (
                  <div key={topic}>
                    <h3>{topic}</h3>
                    <a href={sample}>Review in the sample PDF ↗</a>
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
          <h2>Explore the report options.</h2>
          <p className={styles.lead}>
            Baselane pricing illustration. Confirm the current fees on the
            provider’s website.
          </p>
          <div className={styles.priceGrid}>
            <article>
              <span>BASE REPORT</span>
              <strong>$24.99</strong>
              <ul>
                <li>Rental application</li>
                <li>Identity verification</li>
                <li>Credit report</li>
              </ul>
            </article>
            <article>
              <span>OPTIONAL REPORTS</span>
              {addons.map(([label, price], index) => (
                <label key={label}>
                  <span>{label}</span>
                  <span>${price}</span>
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
                <span>Illustrated total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <a className={styles.button} href={source}>
                Review provider pricing ↗
              </a>
              <p className={styles.note}>
                No report is ordered and no payment is taken here.
              </p>
            </article>
          </div>
        </section>
        <section className={styles.section}>
          <h2>Keep the next steps connected.</h2>
          <div className={styles.three}>
            {[
              ["screen", "Review the resource", source],
              ["lease", "Explore lease workflows", "/BL/BL-lease-agreement"],
              ["rent", "Explore rental workflows", "/BL/BL-rent-collection"],
            ].map(([image, title, href], index) => (
              <article key={image}>
                <Photo
                  name={image}
                  alt={`Baselane ${image} product illustration`}
                />
                <span className={styles.number}>{index + 1}</span>
                <h3>{title}</h3>
                <a className={styles.outline} href={href}>
                  Explore →
                </a>
              </article>
            ))}
          </div>
          <div className={styles.productBand}>
            <Photo
              name="banking"
              alt="Baselane banking and bookkeeping illustration"
            />
            <div>
              <h3>Bring context into the wider workflow.</h3>
              <a className={styles.button} href="/BL/BL-demo">
                Explore Innflow →
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
          <p>Explore how Innflow can connect your team’s work.</p>
          <a className={styles.button} href={`${siteConfig.appOrigin}/login`}>
            Continue with Google
          </a>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
