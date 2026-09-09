"use client";

import {
  CheckCircle,
  Files,
  FlowArrow,
  ShieldCheck,
} from "@phosphor-icons/react";
import Image from "next/image";
import { type FormEvent, useRef, useState } from "react";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-insurance.module.css";

const root = "/brand/baselane-inspired/insurance/";
const benefits = [
  [
    "Useful property context",
    "Start with the property and the people who know it best.",
  ],
  ["Documents together", "Keep the records behind each review within reach."],
  ["A clear next step", "Turn outstanding questions into a shared checklist."],
  [
    "Easier handoffs",
    "Give your team a useful starting point for the next conversation.",
  ],
];
const steps = [
  [
    "time",
    "Start with the essentials",
    "Prepare a brief with your property address and contact details.",
  ],
  [
    "money",
    "Gather the supporting details",
    "Bring existing documents and open questions to your review.",
  ],
  [
    "peace",
    "Keep the conversation moving",
    "Share the brief with your team or insurance provider when you are ready.",
  ],
];
const reviewRows = [
  ["Property", "Address and property records", "Confirm the property details"],
  ["People", "Owner and team contacts", "Identify who should be involved"],
  [
    "Documents",
    "Existing policies and supporting files",
    "Check which documents are current",
  ],
  [
    "Questions",
    "Items your team wants to discuss",
    "Assign a person to follow up",
  ],
  ["Timing", "Relevant dates and reminders", "Agree on the next review date"],
  ["Handoff", "Notes from the review", "Record the next action"],
];

type Brief = { address: string; email: string; phone: string };
export function BaselaneInsurance() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBrief({
      address: String(data.get("address")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone")).trim(),
    });
    requestAnimationFrame(() => resultRef.current?.focus());
  }
  function download() {
    if (!brief) return;
    const text = `INNFLOW PROPERTY REVIEW BRIEF\n\nProperty: ${brief.address}\nEmail: ${brief.email}\nPhone: ${brief.phone}\n\nREVIEW CHECKLIST\n${reviewRows.map(([topic, details, action]) => `- ${topic}: ${details}. ${action}.`).join("\n")}\n\nPrepared locally for your review. This is not an insurance quote or policy.\n`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "innflow-property-review-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <BaselaneHomepage>
      <section className={styles.hero}>
        <div className={styles.heroPhoto}>
          <Image
            src={`${root}hero.webp`}
            alt="Property owner reviewing documents"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
            preload
          />
          <div className={styles.heroPreview}>
            <small>ILLUSTRATIVE WORKSPACE</small>
            <strong>Property review</strong>
            <span>Records gathered</span>
            <span>Questions organized</span>
            <span>Ready for your team</span>
          </div>
        </div>
        <div className={styles.heroCopy} id="property-brief">
          <h1>A clearer start to your insurance review.</h1>
          <p>
            Gather the essentials for your rental property and prepare a brief
            for your next conversation.
          </p>
          <form onSubmit={prepare} className={styles.form}>
            <label htmlFor="brief-address">Property address</label>
            <input
              id="brief-address"
              name="address"
              autoComplete="street-address"
              placeholder="Property address"
              required
              pattern=".*\S.*"
            />
            <label htmlFor="brief-email">Email</label>
            <input
              id="brief-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              required
            />
            <label htmlFor="brief-phone">Phone number</label>
            <input
              id="brief-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (___) ___-____"
              required
              pattern=".*[0-9].*"
            />
            <button type="submit" className={styles.primary}>
              Prepare property brief
            </button>
            <small>
              Your details stay in this page until you download or share them.
            </small>
          </form>
          {brief && (
            <div
              className={styles.result}
              ref={resultRef}
              tabIndex={-1}
              role="status"
            >
              <h2>Your brief is ready.</h2>
              <p>{brief.address}</p>
              <p>
                {brief.email} · {brief.phone}
              </p>
              <button type="button" onClick={download}>
                Download brief <Files size={18} />
              </button>
              <small>
                A preparation checklist for your review, not an insurance quote.
              </small>
            </div>
          )}
        </div>
      </section>
      <div className={styles.checks}>
        {[
          "Keep useful details together",
          "Prepare at your own pace",
          "Share when you are ready",
        ].map((text) => (
          <p key={text}>
            <CheckCircle size={24} />
            {text}
          </p>
        ))}
      </div>
      <section className={styles.benefits}>
        <h2>A little more clarity for your property team.</h2>
        <p>
          Bring the information, the questions, and the next steps into a
          process everyone can follow.
        </p>
        <div className={styles.benefitGrid}>
          {benefits.map(([title, text], i) => {
            const Icon = [Files, ShieldCheck, FlowArrow, CheckCircle][i];
            return (
              <article key={title}>
                <h3>
                  <Icon size={22} />
                  {title}
                </h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className={styles.process}>
        <h2>How your property review comes together.</h2>
        <div className={styles.steps}>
          {steps.map(([photo, title, text], i) => (
            <article key={photo}>
              <div className={styles.stepPhoto}>
                <Image
                  src={`${root}${photo}.webp`}
                  alt=""
                  fill
                  sizes="(max-width:700px) 100vw, 33vw"
                />
                <div className={styles.preview}>
                  <small>PROPERTY WORKSPACE</small>
                  <strong>
                    {["Property brief", "Review checklist", "Next steps"][i]}
                  </strong>
                  <span>
                    <CheckCircle size={18} />
                    {
                      [
                        "Contact details ready",
                        "Supporting records",
                        "Team review",
                      ][i]
                    }
                  </span>
                </div>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.comparison}>
        <h2>Know what comes next.</h2>
        <p>A simple framework for a more useful property conversation.</p>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th scope="col">Area to review</th>
                <th scope="col">What to gather</th>
                <th scope="col">Next step</th>
              </tr>
            </thead>
            <tbody>
              {reviewRows.map(([topic, details, action]) => (
                <tr key={topic}>
                  <th scope="row">{topic}</th>
                  <td>{details}</td>
                  <td>{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="#property-brief" className={styles.primary}>
          Prepare property brief
        </a>
      </section>
      <section className={styles.examples}>
        <h2>Keep your team in the picture.</h2>
        <p>Connected context for the work behind every property.</p>
        <div className={styles.exampleGrid}>
          {[
            "Property records",
            "Team questions",
            "Review steps",
            "Shared context",
          ].map((title, i) => (
            <a href="/products/agentic-workflows" key={title}>
              <Image
                src={`${root}${steps[i % 3][0]}.webp`}
                alt=""
                fill
                sizes="(max-width:700px) 80vw, 25vw"
              />
              <span>{title}</span>
              <h3>
                {
                  [
                    "Find the details you need.",
                    "Give each question an owner.",
                    "Make the handoff clear.",
                    "Keep the work connected.",
                  ][i]
                }
              </h3>
              <small>Explore workflows →</small>
            </a>
          ))}
        </div>
      </section>
      <section className={styles.closing}>
        <picture>
          <source
            media="(max-width:700px)"
            srcSet="/brand/baselane-inspired/renters/closing-mobile.webp"
          />
          <Image
            src="/brand/baselane-inspired/renters/closing-desktop.webp"
            alt=""
            fill
            sizes="100vw"
          />
        </picture>
        <div>
          <h2>Ready for a clearer starting point?</h2>
          <p>Prepare the essentials for your next property review.</p>
          <a className={styles.primary} href="#property-brief">
            Prepare property brief
          </a>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
