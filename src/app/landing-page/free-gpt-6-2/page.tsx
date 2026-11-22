import type { Metadata } from "next";
import Link from "next/link";
import { PromoHero, UseCases } from "./preview";
import styles from "./promo.module.css";

export const metadata: Metadata = {
  title: "GPT-6.2 Sol and Astra promotion preview | Innflow",
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "What is Innflow?",
    body: "Bring the request, the people doing the work and the agent helping them into one workspace. A teammate joining later can follow the decisions in the channel.",
    href: "/about",
    label: "Introducing Innflow",
    art: "flow",
  },
  {
    title: "Work with AI teammates",
    body: "Give an agent the campaign brief and ask for the first outreach draft. Your team can review the shortlist and decide who gets an invitation.",
    href: "/features/teammates",
    label: "Explore AI teammates",
    art: "channels",
  },
  {
    title: "How an AI-native team works",
    body: "Start with one recurring report. Give the agent the inputs, name the reviewer and agree on what happens when a source is missing.",
    href: "/resources/guides/agent-ownership",
    label: "Explore team ownership",
    art: "bot",
  },
  {
    title: "Bring your local agents",
    body: "A teammate reports a checkout issue. One agent investigates the retry path, another reviews the change, and the release owner checks the result in staging.",
    href: "/features/local-agents",
    label: "Explore local agents",
    art: "computer",
  },
];

export default function Page() {
  return (
    <main id="main-content" className={styles.page}>
      <PromoHero />
      <UseCases />
      {sections.map((section) => (
        <section className={styles.story} key={section.href}>
          <div>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            <Link href={section.href}>{section.label}</Link>
          </div>
          <img
            src={"/preview/scroll-showcase/hero-rive/" + section.art + ".webp"}
            alt=""
            loading="lazy"
            width="640"
            height="354"
          />
        </section>
      ))}
      <section id="offer" className={styles.close}>
        <h2>Start with US$200 in credits</h2>
        <p>
          Proposed offer: 200,000 credits once per account, with no card
          required. This is a design preview. Signups for this offer are closed.
        </p>
        <Link
          href="/resources/guides/gpt-6-2-sol-vs-astra"
          data-site-cta="primary"
        >
          Compare Sol and Astra
        </Link>
      </section>
    </main>
  );
}
