"use client";
import { ArrowRight, Copy } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-updates.module.css";

const entries = [
  {
    id: "resource-libraries",
    label: "RESOURCE LIBRARIES",
    title: "A new home for articles and masterclasses.",
    text: "The alternate resource pages bring featured reading, topic filters, and masterclasses into a shared library layout. Search the article collection, browse by category, or explore a complete row of cards.",
    image: "/brand/baselane-inspired/library/articles-hero.webp",
    heading: "Find a useful starting point",
    detail:
      "The reference articles and sessions retain their original publisher attribution. Each card leads to the relevant Baselane resource, while navigation and the surrounding experience use Innflow’s visual system.",
    links: [
      ["Resource library", "/BL/BL-resources"],
      ["Masterclasses", "/BL/BL-webinars"],
    ],
  },
  {
    id: "preparation-pages",
    label: "PROPERTY PREPARATION",
    title: "Clearer preparation for your next property review.",
    text: "Two new alternate pages explore document preparation and property review. Their layouts bring supporting information, checklists, and human review into focus.",
    image: "/brand/baselane-inspired/insurance/time.webp",
    heading: "A brief you can keep",
    detail:
      "The property review form prepares a local text brief from the details you enter. Download it with a six-part checklist for your next conversation. It does not submit an insurance application or issue a quote.",
    links: [
      ["Property review", "/BL/BL-landlord-insurance"],
      ["Document preparation", "/BL/BL-tax-preparation"],
    ],
  },
  {
    id: "connected-records",
    label: "CONNECTED RECORDS",
    title: "Recurring work and records, in one visual language.",
    text: "The rent collection and accounting reference layouts now have Innflow adaptations, with property photographs, section navigation, illustrative workflow panels, and expandable FAQs.",
    image:
      "/brand/baselane-inspired/accounting/solutions-reporting-bg-desktop.webp",
    heading: "Context beside the next step",
    detail:
      "The panels show example property records, document checklists, and team handoffs. They illustrate the page design; they are not live account balances, payment controls, or financial reports.",
    links: [
      ["Recurring work", "/BL/BL-rent-collection-2"],
      ["Property records", "/BL/BL-landlord-accounting"],
    ],
  },
  {
    id: "rental-audiences",
    label: "RENTAL AUDIENCES",
    title: "A distinct page for each rental perspective.",
    text: "Long-term, mid-term, and short-term rental pages share a consistent layout while keeping their own photography and content. A separate renter page uses a family hero, feature rows, and a four-step sequence.",
    image: "/brand/baselane-inspired/renters/closing-desktop.webp",
    heading: "Designed for different screens",
    detail:
      "The alternate pages use supplied phone crops where available, responsive layouts, and keyboard-accessible navigation. Each layout was checked in Chrome at desktop and phone widths.",
    links: [
      ["Long-term rentals", "/BL/BL-long-term-rentals"],
      ["Mid-term rentals", "/BL/BL-mid-term-rentals"],
      ["Short-term rentals", "/BL/BL-short-term-rentals"],
      ["Renters", "/BL/BL-renters"],
    ],
  },
  {
    id: "design-foundation",
    label: "DESIGN FOUNDATION",
    title: "The beginning of the BL page collection.",
    text: "The alternate homepage, landlord operations page, and multi-property page established the shared navigation, text-only Innflow wordmark, photographic sections, and dark primary actions used throughout the collection.",
    image: "/brand/baselane-inspired/hero.webp",
    heading: "A separate place to explore",
    detail:
      "These alternate routes keep the existing homepage intact. This journal records local design work; a committed preview is not a production launch. The remaining inventory continues to be built and reviewed in batches.",
    links: [
      ["Alternate homepage", "/BL/BL-home"],
      ["Landlord operations", "/BL/BL-landlord-banking"],
      ["Multi-property investors", "/BL/BL-multi-property-investors"],
    ],
  },
];
export function BaselaneUpdates() {
  const [copied, setCopied] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied("Link copied");
    } catch {
      setCopied("Copy the address from your browser to share this page.");
    }
  }
  return (
    <BaselaneHomepage>
      <section className={styles.hero}>
        <div>
          <small>UPDATED: SEPTEMBER 8, 2026</small>
          <h1>Product updates</h1>
          <p>Follow the Innflow design preview as it takes shape.</p>
          <span>LOCAL PREVIEW JOURNAL</span>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/brand/baselane-inspired/investing/updates-hero.webp"
            alt="Person working on a laptop"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
            preload
          />
        </div>
      </section>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2>Explore connected property operations with Innflow.</h2>
          <a className={styles.primary} href="https://app.innflow.ai/login">
            Continue with Google
          </a>
          <div className={styles.share}>
            <small>SHARE</small>
            <button type="button" onClick={copy}>
              <Copy size={18} />
              Copy page link
            </button>
            <span role="status">{copied}</span>
          </div>
          <nav aria-label="Update index">
            <small>UPDATES</small>
            {entries.map((e) => (
              <a href={`#${e.id}`} key={e.id}>
                {e.label}
                <ArrowRight size={14} />
              </a>
            ))}
          </nav>
        </aside>
        <div className={styles.entries}>
          {entries.map((e) => (
            <article id={e.id} key={e.id}>
              <h2>{e.title}</h2>
              <p>{e.text}</p>
              <h3>{e.heading}</h3>
              <div className={styles.entryImage}>
                <Image
                  src={e.image}
                  alt=""
                  fill
                  sizes="(max-width:700px) 100vw, 70vw"
                />
              </div>
              <p>{e.detail}</p>
              <div className={styles.links}>
                {e.links.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                    <ArrowRight size={18} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <section className={styles.closing}>
        <Image
          src="/brand/baselane-inspired/renters/closing-desktop.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div>
          <h2>More room for what comes next.</h2>
          <p>Bring your property operations into one flow.</p>
          <a className={styles.primary} href="/demo">
            See demo
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
