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
    "Perspectives on evolving investor priorities.",
    "https://www.forbes.com/councils/forbesbusinesscouncil/2023/09/21/guide-to-rental-property-investing-trends-and-developments/?streamIndex=0",
  ],
  [
    "marketers",
    "MarketersMEDIA",
    "Housing constraints and financial tools",
    "Coverage of Baselane's approach to landlord finances.",
    "https://news.marketersmedia.com/adapting-to-a-constrained-housing-market-through-financial-innovations/89103558",
  ],
  [
    "financial-brand",
    "The Financial Brand",
    "The shift toward digital rent payments",
    "A look at technology in rental transactions.",
    "https://thefinancialbrand.com/news/payments-trends/how-chase-plans-to-revolutionize-rent-payments-with-a-digital-solution-155501",
  ],
  [
    "nasdaq",
    "Nasdaq",
    "Understanding deposit accounts",
    "An introduction to holding rental deposits.",
    "https://www.nasdaq.com/articles/how-to-open-a-security-deposit-account-to-hold-rental-deposits",
  ],
  [
    "business-insider",
    "Business Insider",
    "Companies shaping property technology",
    "Baselane in a 2023 proptech company roundup.",
    "https://www.businessinsider.com/top-proptech-companies-startups-2023-3",
  ],
  [
    "unit",
    "Unit",
    "Inside a rental finance platform",
    "A partner case study about Baselane.",
    "https://www.unit.co/case-study/baselane",
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
            Explore media coverage collected by Baselane, our design reference.
            These articles cover Baselane and the wider property market.
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
          <h2>A closer look at property finance</h2>
          <article className={styles.feature}>
            <div className={styles.visual}>
              <Image
                className={styles.photo}
                src={`${root}/banking.webp`}
                alt="An investor reviewing paperwork"
                width={1160}
                height={1000}
              />
              <Image
                className={styles.overlay}
                src={`${root}/account.webp`}
                alt="Baselane virtual account interface"
                width={600}
                height={652}
              />
            </div>
            <div className={styles.copy}>
              <span>BASELANE PRODUCT NEWS</span>
              <h3>Banking designed around rental properties</h3>
              <p>
                Explore the banking product featured in the original coverage.
              </p>
              <a href="https://www.baselane.com/landlord-banking">
                Explore Baselane banking →
              </a>
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
              <Image
                className={styles.overlay}
                src={`${root}/oversight.webp`}
                alt="Baselane property transaction interface"
                width={640}
                height={751}
              />
            </div>
            <div className={styles.copy}>
              <span>BASELANE PRODUCT NEWS</span>
              <h3>One view of rental finances</h3>
              <p>
                Read about the bookkeeping tools behind the source platform.
              </p>
              <a href="https://www.baselane.com/landlord-accounting">
                Explore Baselane bookkeeping →
              </a>
            </div>
          </article>
        </section>
        <section className={styles.closing}>
          <h2>More perspectives on property technology</h2>
          <p>
            Read the original publisher coverage for its context and publication
            date.
          </p>
          <a href={coverage[4][4]} target="_blank" rel="noopener noreferrer">
            <Image
              src={`${root}/business-insider.svg`}
              alt="Read Business Insider coverage"
              width={150}
              height={48}
            />
          </a>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
