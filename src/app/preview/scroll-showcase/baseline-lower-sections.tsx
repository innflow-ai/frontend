"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useState } from "react";
import { siteConfig } from "@/config/site";
import type { Testimonial } from "@/lib/testimonials";
import styles from "./baseline-lower-sections.module.css";
import { integrationIcons, integrationNames } from "./homepage-content";

const assets = "/preview/homepage";
const lower = `${assets}/baseline-lower`;

export function BaselineCustomerStories({
  testimonials,
  heading,
}: {
  testimonials: Testimonial[];
  heading: string;
}) {
  const [active, setActive] = useState(0);
  const selected = testimonials[active % Math.max(1, testimonials.length)];
  // Empty CMS selections remain empty: never replace customer evidence with reference endorsements.
  if (!selected) return null;
  const neighbors = testimonials
    .filter((item) => item.id !== selected.id)
    .slice(0, 4);
  return (
    <section
      className={styles.stories}
      aria-labelledby="baseline-stories-heading"
      data-source-node="350:11559"
    >
      <header className={styles.heading}>
        <h2 id="baseline-stories-heading">{heading}</h2>
      </header>
      <div className={styles.storyStage}>
        {neighbors.map((item, i) => (
          <button
            type="button"
            key={item.id}
            className={styles.sideStory}
            data-slot={i}
            aria-label={`Read ${item.name}'s story`}
            onClick={() => setActive(testimonials.indexOf(item))}
          >
            <Image src={item.portrait.url} alt="" fill sizes="105px" />
          </button>
        ))}
        <article className={styles.storyCard}>
          <div className={styles.storyCopy}>
            {selected.statistic && (
              <h3>
                {selected.statistic.value}
                <br />
                {selected.statistic.label}
              </h3>
            )}
            <div className={styles.attribution}>
              <blockquote>“{selected.quote}”</blockquote>
              <p className={styles.name}>{selected.name}</p>
              {selected.role && <p className={styles.role}>{selected.role}</p>}
            </div>
          </div>
          <div className={styles.storyPhoto}>
            <Image
              src={selected.portrait.url}
              alt={selected.portrait.alt}
              fill
              sizes="(max-width: 700px) 85vw, 361px"
            />
          </div>
        </article>
      </div>
      {testimonials.length > 1 && (
        <fieldset
          className={styles.controls}
          aria-label="Choose a customer story"
        >
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.name}'s story`}
              aria-pressed={selected.id === item.id}
              onClick={() => setActive(i)}
            >
              <span />
            </button>
          ))}
        </fieldset>
      )}
    </section>
  );
}

export function BaselineConnectedInfrastructure() {
  const cards = [
    {
      title: "Support channels",
      body: "Connect Slack, Microsoft Teams, Discord, email and chat. Meet customers where they already are.",
      icon: "card-google.png",
      href: "/integrations",
    },
    {
      title: "Your tools. Your workflows.",
      body: "Connect your CRM and issue tracker, call your own APIs, and automate the work across your systems.",
      icon: "card-microsoft.png",
      href: "/integrations",
    },
  ];
  return (
    <section
      className={styles.infrastructure}
      aria-labelledby="baseline-infrastructure-heading"
      data-source-node="350:11630"
    >
      <header className={styles.heading}>
        <h2 id="baseline-infrastructure-heading">
          Build on the tools
          <br />
          you already use
        </h2>
        <p>Connect your channels, internal data and external systems.</p>
        <Link className={styles.directory} href="/integrations">
          View all integrations <span aria-hidden="true">→</span>
        </Link>
      </header>
      <div className={styles.integrations}>
        {[integrationNames.slice(0, 9), integrationNames.slice(9)].map(
          (row) => (
            <div className={styles.integrationRow} key={row[0]}>
              {row.map((name) => (
                <div className={styles.integrationTile} key={name}>
                  <Image
                    src={integrationIcons[name]}
                    alt={name}
                    width={64}
                    height={64}
                  />
                </div>
              ))}
            </div>
          ),
        )}
      </div>
      <div className={styles.infrastructureCards}>
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className={styles.cardTop}>
              <Image
                src={`${lower}/${card.icon}`}
                width={24}
                height={24}
                alt=""
              />
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </Link>
        ))}
      </div>
      <p className={styles.referenceNote}>
        Connection examples from the design. Check the directory for
        availability.
      </p>
    </section>
  );
}

const scenes = [
  {
    person: `${assets}/closing-imgImage.png`,
    background: `${assets}/closing-imgContainer.png`,
    label: "Request resolved",
    stripe: "#f2f8de",
  },
  {
    person: `${assets}/closing-imgImage2.png`,
    background: `${assets}/closing-imgContainer1.png`,
    label: "Product highlight 2",
    stripe: "#d4c2ff",
  },
  {
    person: `${assets}/closing-imgImage3.png`,
    background: `${assets}/closing-imgContainer2.png`,
    label: "Product highlight 3",
    stripe: "#6bb1ff",
  },
  {
    person: `${lower}/closing-four-person.png`,
    background: `${lower}/closing-four-background.png`,
    label: "Product highlight 4",
    stripe: "#baf0ec",
  },
];

export function BaselineClosing() {
  const [active, setActive] = useState(0);
  // Manual by default: static source artwork does not establish an observed autoplay timeline.
  return (
    <section
      className={styles.closing}
      aria-labelledby="baseline-closing-heading"
      data-source-node="350:11820"
    >
      <header className={styles.heading}>
        <h2 id="baseline-closing-heading">
          Start fast.
          <br />
          Scale fearlessly.
        </h2>
        <p>
          Connect your channels, bring in your customer context, and build the
          support workflows your team needs.
        </p>
        <a className={styles.cta} href={siteConfig.demoUrl}>
          Book an Innflow demo
        </a>
      </header>
      <div className={styles.closingViewport}>
        <div className={styles.closingTrack}>
          {[-1, 0, 1].map((offset) => {
            const index = (active + offset + scenes.length) % scenes.length;
            const scene = scenes[index];
            return (
              <div
                key={offset}
                className={styles.scene}
                data-active={offset === 0}
                aria-hidden={offset !== 0}
                style={{ "--stripe": scene.stripe } as CSSProperties}
              >
                <div className={styles.sceneBackdrop}>
                  <Image src={scene.background} alt="" fill sizes="656px" />
                  <div />
                </div>
                <Image
                  className={styles.scenePerson}
                  src={scene.person}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 85vw, 593px"
                />
                {index === 0 && (
                  <div className={styles.sceneBadge}>
                    <Image
                      src={`${assets}/innflow-mark.png`}
                      alt=""
                      width={42}
                      height={42}
                    />
                    <span>Request</span>
                    <strong>Resolved</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <fieldset className={styles.controls} aria-label="Closing highlights">
        <button
          type="button"
          onClick={() => setActive((active + 3) % 4)}
          aria-label="Previous highlight"
        >
          ←
        </button>
        {scenes.map((scene, i) => (
          <button
            type="button"
            key={scene.label}
            aria-label={scene.label}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setActive((active + 1) % 4)}
          aria-label="Next highlight"
        >
          →
        </button>
      </fieldset>
    </section>
  );
}
