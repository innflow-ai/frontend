"use client";

import { ArrowRight, Copy } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-updates.module.css";

const entries = [
  {
    id: "resource-libraries",
    label: "RESOURCES",
    title: "Find a starting point for your next workflow.",
    text: "Explore innflow resources by topic, from property operations and document reviews to planning tools and team handoffs.",
    image: "/brand/baselane-inspired/library/articles-hero.webp",
    heading: "Start with the work you handle every day",
    detail:
      "Search the resource library or explore a self-guided workflow topic. Bring a real example to a demo so we can discuss the people, information, and review steps it needs.",
    links: [
      ["Resource library", "/BL/BL-resources"],
      ["Workflow learning", "/BL/BL-webinars"],
    ],
  },
  {
    id: "preparation-pages",
    label: "PREPARATION",
    title: "Prepare a property review brief.",
    text: "Gather property details and open questions before your next conversation with an adviser or team member.",
    image: "/brand/baselane-inspired/insurance/time.webp",
    heading: "Keep the brief with the supporting records",
    detail:
      "Create a downloadable brief from the details you enter and use the checklist to prepare the next review. You choose when and with whom to share it.",
    links: [
      ["Prepare a brief", "/BL/BL-landlord-insurance"],
      ["Document preparation", "/BL/BL-tax-preparation"],
    ],
  },
  {
    id: "connected-records",
    label: "RECORDS",
    title: "Keep context beside the next action.",
    text: "Explore how recurring rental work and property records fit together, from the initial request to team review.",
    image:
      "/brand/baselane-inspired/accounting/solutions-reporting-bg-desktop.webp",
    heading: "Make the handoff easier to follow",
    detail:
      "Connect supporting information with the person responsible for the next step. Shared context helps the team continue the work without starting the conversation again.",
    links: [
      ["Recurring work", "/BL/BL-rent-collection-2"],
      ["Property records", "/BL/BL-landlord-accounting"],
    ],
  },
  {
    id: "rental-audiences",
    label: "RENTAL OPERATIONS",
    title: "A workflow for the way you rent.",
    text: "Long-term, mid-term, and short-term rentals each bring a different rhythm of requests, turnovers, and follow-ups.",
    image: "/brand/baselane-inspired/renters/closing-desktop.webp",
    heading: "Bring the right context into each process",
    detail:
      "Explore workflows for your rental model and keep resident requests connected to the people and property information behind the response.",
    links: [
      ["Long-term rentals", "/BL/BL-long-term-rentals"],
      ["Mid-term rentals", "/BL/BL-mid-term-rentals"],
      ["Short-term rentals", "/BL/BL-short-term-rentals"],
      ["Resident experiences", "/BL/BL-renters"],
    ],
  },
  {
    id: "design-foundation",
    label: "PLATFORM",
    title: "Bring property operations into one flow.",
    text: "innflow brings workflows, knowledge, and approvals together around the work your team needs to move forward.",
    image: "/brand/baselane-inspired/hero.webp",
    heading: "Connected work. People in control.",
    detail:
      "Start with one recurring process. Connect the tools and context it needs, make review points visible, and keep ownership clear as the work changes hands.",
    links: [
      ["Explore innflow", "/BL/BL-home"],
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
          <small>EXPLORE INNFLOW</small>
          <h1>Product updates</h1>
          <p>
            Explore the tools and workflows that bring property operations
            together.
          </p>
          <span>PRODUCT HIGHLIGHTS</span>
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
          <h2>Explore connected property operations with innflow.</h2>
          <a className={styles.primary} href={siteConfig.googleAuthUrl}>
            <GoogleCtaContent />
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
          <a className={styles.primary} href={siteConfig.demoUrl}>
            See demo
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
