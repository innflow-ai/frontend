"use client";

import Image from "next/image";
import { type FormEvent, useRef, useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { summarizeRents } from "@/lib/rent-comparison";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-rent-calculator.module.css";

const source = "/BL/BL-demo";
const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
const sections = [
  ["comparable-rentals", "Compare similar rentals"],
  ["local-rules", "Check local requirements"],
  ["operating-costs", "Account for expenses"],
  ["amenities", "Consider the property"],
  ["timing", "Review the timing"],
];

export function BaselaneRentCalculator() {
  const [result, setResult] = useState<
    | (ReturnType<typeof summarizeRents> & { address: string; details: string })
    | null
  >(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const report = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const summary = summarizeRents(String(data.get("rents")));
      setResult({
        ...summary,
        address: String(data.get("address")).trim(),
        details: `${data.get("bedrooms")} bedrooms · ${data.get("baths") || "Any"} baths · ${data.get("type")}`,
      });
      setError("");
      requestAnimationFrame(() => {
        report.current?.focus();
        report.current?.scrollIntoView({ block: "start", behavior: "instant" });
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check the rent values.");
    }
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        `${siteConfig.marketingOrigin}/BL/BL-how-much-should-i-charge-for-rent`,
      );
      setCopied("Link copied.");
    } catch {
      setCopied("Copy this page’s address from your browser.");
    }
  }
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <h1>How do your comparable rents stack up?</h1>
            <p className={styles.intro}>
              Summarize rents you have researched. This calculator uses your
              entries; it does not look up local listings.
            </p>
            <form ref={form} onSubmit={analyze} className={styles.form}>
              <label>
                Property address
                <input
                  name="address"
                  required
                  maxLength={200}
                  placeholder="Enter the property address"
                />
              </label>
              <div className={styles.two}>
                <label>
                  Bedrooms
                  <input
                    name="bedrooms"
                    type="number"
                    required
                    min="0"
                    max="100"
                    step="1"
                    placeholder="Enter a number"
                  />
                </label>
                <label>
                  Baths (optional)
                  <select name="baths" defaultValue="">
                    <option value="">Any</option>
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Property type
                <select name="type" required defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>{" "}
                  <option>Apartment/Condo</option>
                  <option>House/Duplex</option>
                  <option>All types</option>
                </select>
              </label>
              <label>
                Comparable monthly rents (USD)
                <textarea
                  name="rents"
                  required
                  rows={3}
                  placeholder="1800, 1900, 2000, 2100, 2200"
                  aria-describedby="rent-input-help rent-error"
                />
              </label>
              <p id="rent-input-help" className={styles.note}>
                Enter 3–100 amounts separated by commas or new lines. Use 1800,
                not 1,800. Address and property details label your report; they
                do not filter your entries.
              </p>
              <p id="rent-error" role="alert" className={styles.error}>
                {error}
              </p>
              <button className={styles.button} type="submit">
                Analyze comparable rents
              </button>
            </form>
            <a className={styles.sourceLink} href={source}>
              Connect your research workflow with innflow →
            </a>
          </div>
          <picture>
            <source
              media="(max-width:700px)"
              srcSet="/brand/baselane-inspired/rent-calculator/hero-mobile.webp"
            />
            <Image
              className={styles.heroImage}
              src="/brand/baselane-inspired/rent-calculator/hero.webp"
              alt="Example rent report over property photography; illustrative values, not your calculated results"
              width={1120}
              height={956}
              priority
            />
          </picture>
        </section>
        {result && (
          <section
            className={styles.report}
            ref={report}
            tabIndex={-1}
            aria-label="Your comparable rent report"
          >
            <span className={styles.eyebrow}>YOUR COMPARABLE RENT REPORT</span>
            <h2>{result.address}</h2>
            <p>{result.details}</p>
            <div className={styles.metrics}>
              {[
                ["Median rent", result.median],
                ["Average rent", result.average],
                ["25th percentile", result.lower],
                ["75th percentile", result.upper],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{money(Number(value))}</strong>
                </div>
              ))}
            </div>
            <p>
              Based on {result.count} values you supplied, ranging from{" "}
              {money(result.min)} to {money(result.max)}. Percentiles use linear
              interpolation between sorted values. This is a summary of your
              sample, not an appraisal or a recommended asking rent.
            </p>
            <button
              type="button"
              className={styles.outline}
              onClick={() => {
                setResult(null);
                form.current?.querySelector("input")?.focus();
              }}
            >
              Edit this comparison
            </button>
          </section>
        )}
        <div className={styles.articleLayout}>
          <aside>
            <h2>Bring the next step into innflow.</h2>
            <a className={styles.button} href={siteConfig.googleAuthUrl}>
              <GoogleCtaContent />
            </a>
            <button className={styles.copy} type="button" onClick={copyLink}>
              Copy page link ↗
            </button>
            <p role="status">{copied}</p>
            <nav aria-label="In this guide">
              <span className={styles.eyebrow}>IN THIS GUIDE</span>
              {sections.map(([id, title]) => (
                <a key={id} href={`#${id}`}>
                  {title}
                </a>
              ))}
            </nav>
          </aside>
          <article className={styles.article}>
            <p>
              Keep the context behind each comparison alongside the numbers.
              This worksheet helps organize that review.
            </p>
            <section id="comparable-rentals">
              <h2>Compare similar rentals</h2>
              <p>
                Record the source, date, location, size, and condition of each
                comparable. Use the calculator to summarize the monthly rents in
                your selected sample.
              </p>
              <ul>
                <li>Keep asking rents and signed rents distinguishable.</li>
                <li>
                  Note differences in lease duration and included services.
                </li>
                <li>
                  Retain links or notes so the sample can be reviewed later.
                </li>
              </ul>
            </section>
            <section id="local-rules">
              <h2>Check local requirements</h2>
              <p>
                Review the rules that apply to the property before making a
                pricing decision. Keep the official sources and your adviser’s
                review notes alongside the property record.
              </p>
              <a href="/BL/BL-lease-agreement">
                Explore document review workflows →
              </a>
            </section>
            <section id="operating-costs">
              <h2>Account for expenses</h2>
              <p>
                Keep a separate record of recurring expenses and planned work. A
                comparison of rents does not calculate the property’s costs or
                returns.
              </p>
              <div className={styles.checklist}>
                {[
                  "Maintenance and repairs",
                  "Utilities and services",
                  "Insurance and taxes",
                  "Management and financing",
                ].map((x) => (
                  <div key={x}>{x}</div>
                ))}
              </div>
            </section>
            <section id="amenities">
              <h2>Consider the property</h2>
              <p>
                Document the features that distinguish the property from the
                sample. Review whether each comparison includes similar space,
                equipment, and shared facilities.
              </p>
            </section>
            <section id="timing">
              <h2>Review the timing</h2>
              <p>
                Save the date of your research. Revisit the inputs when listings
                or property circumstances change.
              </p>
              <a href={source}>
                Bring your research into an innflow workflow →
              </a>
            </section>
          </article>
        </div>
      </div>
    </BaselaneHomepage>
  );
}
