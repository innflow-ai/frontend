"use client";

import Image from "next/image";
import { useRef } from "react";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-news.module.css";

const coverage = [
  [
    "forbes",
    "Forbes",
    "A changing rental market",
    "Independent perspectives on evolving investor priorities.",
    "https://www.forbes.com/councils/forbesbusinesscouncil/2023/09/21/guide-to-rental-property-investing-trends-and-developments/?streamIndex=0",
  ],
  [
    "financial-brand",
    "The Financial Brand",
    "The shift toward digital rent payments",
    "Industry reading on technology in rental transactions.",
    "https://thefinancialbrand.com/news/payments-trends/how-chase-plans-to-revolutionize-rent-payments-with-a-digital-solution-155501",
  ],
  [
    "nasdaq",
    "Nasdaq",
    "Understanding deposit accounts",
    "Background reading on organizing rental deposits.",
    "https://www.nasdaq.com/articles/how-to-open-a-security-deposit-account-to-hold-rental-deposits",
  ],
];
const root = "/brand/baselane-inspired/news";

export function BaselaneNews() {
  const track = useRef<HTMLElement>(null);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({
      left: direction * element.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <header className={styles.intro}>
          <h1>Industry coverage and perspectives</h1>
          <p>
            Explore independent reporting on the property market and the tools
            around it, alongside practical ways to connect your work with
            innflow.
          </p>
        </header>
        <div className={styles.press}>
          <section
            ref={track}
            className={styles.track}
            aria-label="Media coverage"
            // biome-ignore lint/a11y/noNoninteractiveTabindex: This horizontal region supports keyboard scrolling.
            tabIndex={0}
          >
            {coverage.map(([logo, publisher, title, description, href]) => (
              <article className={styles.card} key={logo}>
                <div className={styles.logo}>
                  <Image
                    src={`${root}/${logo}.svg`}
                    alt={publisher}
                    width={220}
                    height={42}
                  />
                </div>
                <div className={styles.body}>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    Read the article <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </section>
          <div className={styles.controls}>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous articles"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next articles"
            >
              →
            </button>
          </div>
        </div>
        <section className={styles.features}>
          <h2>A closer look at connected property work</h2>
          <article className={styles.feature}>
            <div className={styles.visual}>
              <Image
                className={styles.photo}
                src={`${root}/banking.webp`}
                alt="An investor reviewing paperwork"
                width={1160}
                height={1000}
              />
            </div>
            <div className={styles.copy}>
              <span>EXPLORE INNFLOW</span>
              <h3>Operations organized around your properties</h3>
              <p>
                Bring recurring requests, team ownership, and property context
                into one connected flow.
              </p>
              <a href="/landlord-banking">Explore property operations →</a>
            </div>
          </article>
          <article className={styles.feature}>
            <div className={styles.visual}>
              <Image
                className={styles.photo}
                src={`${root}/plumbing.webp`}
                alt="A plumbing professional at work"
                width={740}
                height={648}
              />
            </div>
            <div className={styles.copy}>
              <span>EXPLORE INNFLOW</span>
              <h3>Keep the records behind the work together</h3>
              <p>
                Connect supporting documents and review notes to the requests
                and decisions they belong to.
              </p>
              <a href="/landlord-accounting">Explore connected records →</a>
            </div>
          </article>
        </section>
        <section className={styles.closing}>
          <h2>More perspectives on property technology</h2>
          <p>
            Visit the innflow blog for ideas on workflows, AI agents, and the
            day-to-day work of running a property operation.
          </p>
          <a href="/blog">Read the innflow blog →</a>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
