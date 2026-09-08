"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./baselane-customers.module.css";
import { BaselaneHomepage } from "./baselane-homepage";

const root = "/brand/baselane-inspired/customers";
const source = "https://www.baselane.com/our-customers";
const videos = [
  ["melanie", "Melanie", "melanie-pellew-v1", "mel_invests"],
  ["sarah", "Sarah", "sarah-weaver-v1", "sarahdweaver"],
  ["rob", "Rob", "robuilt-v1", "robuilt"],
  ["andrew", "Andrew", "andrew-choi-v1", "millennialmoneyveteran"],
  ["caroline", "Caroline", "caroline-baird-v1", "thebairdsinvest"],
];
const reviews = [
  ["AJ Sibley", "Finding a banking platform"],
  ["Brian FitzGerald", "Preparing for tax time"],
  ["Adam", "Simplifying bookkeeping"],
  ["Bryan Atkins", "Understanding cash movement"],
  ["Perry", "A different banking experience"],
  ["Kelsie", "Making more time"],
  ["Chris Peahl", "Changing banks"],
  ["Marco Cruz Santos", "Organizing property accounts"],
  ["Alex Spino", "Tracking expenses"],
  ["Crystal Burton", "Easier everyday work"],
  ["Jason Wallace", "Connecting rental finances"],
  ["Earl Co", "Reducing fees"],
];
const cases = [
  [
    "john-chaney",
    "John Chaney",
    "8",
    "Less manual reconciliation",
    "A story about bookkeeping and accounting costs.",
    "https://cdn.prod.website-files.com/67d7c19efde3196be25abb1f/69ce932d601d0598c5387e31_JOHN%20CHANEY.pdf",
  ],
  [
    "santosh-sekar",
    "Santosh Sekar",
    "35",
    "Fewer trips to the branch",
    "A story about accounts across multiple businesses.",
    "https://cdn.prod.website-files.com/67d7c19efde3196be25abb1f/69825514050c7cf4e35e733b_Case%20Study%20%E2%80%93%20Santosh%20Sekar%20%E2%80%93%20Final.pdf",
  ],
  [
    "melissa-cote",
    "Melissa Cote",
    "11",
    "Bringing financial tools together",
    "A story about replacing disconnected software.",
    "https://cdn.prod.website-files.com/67d7c19efde3196be25abb1f/69a9f526214e6b18787cfa4c_0f6310904d362f3d79da5815207aed67_Case%20study%20-%20MELISSA%20COTE.pdf",
  ],
  [
    "phillip-munoz",
    "Phillip Munoz",
    "11",
    "More time for the rental business",
    "A story about expenses and tax preparation.",
    "https://cdn.prod.website-files.com/67d7c19efde3196be25abb1f/69a9f55ac991fd02143821fc_3b052f4817d2f19164ee4243c38dc35e_Case%20study%20-%20PHIL%20MUNOZ.pdf",
  ],
];

export function BaselaneCustomers() {
  const [selected, setSelected] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [reviewPage, setReviewPage] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const story = cases[caseIndex];
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <picture>
            <source
              media="(max-width:700px)"
              srcSet={`${root}/hero-mobile.webp`}
            />
            <Image
              src={`${root}/hero.webp`}
              alt="Baselane investor photography and customer review cards"
              fill
              priority
              sizes="100vw"
            />
          </picture>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>BASELANE CUSTOMER STORIES</span>
            <h1>Perspectives from property investors</h1>
            <p>
              Explore the experiences behind the reference design, in the
              investors’ own words.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href="#investor-videos">
                Watch their stories
              </a>
              <a className={styles.outline} href="#case-studies">
                Read case studies →
              </a>
            </div>
          </div>
        </section>
        <div className={styles.band}>
          <span>Stories and imagery published by Baselane</span>
          <a href={source}>Visit the original collection ↗</a>
        </div>
        <section className={styles.section} id="investor-videos">
          <h2>Meet the investors</h2>
          <div className={styles.videoDeck}>
            {videos.map(([id, name, file, instagram], index) => (
              <article
                key={id}
                className={`${styles.videoCard} ${selected === index ? styles.active : ""}`}
              >
                {selected === index && playing ? (
                  // biome-ignore lint/a11y/useMediaCaption: The original publisher supplies no caption tracks; the original source remains linked below.
                  <video
                    key={file}
                    controls
                    playsInline
                    preload="metadata"
                    poster={`${root}/${id}.png`}
                    aria-label={`${name}'s Baselane story`}
                  >
                    <source src={`${root}/${file}.mp4`} type="video/mp4" />
                    Your browser cannot play this video.{" "}
                    <a href={`https://static.baselane.com/videos/${file}.mp4`}>
                      Open the video
                    </a>
                    .
                  </video>
                ) : (
                  <button
                    className={styles.poster}
                    type="button"
                    onClick={() => {
                      setSelected(index);
                      setPlaying(true);
                    }}
                    aria-label={`Open ${name}'s video`}
                  >
                    <Image
                      src={`${root}/${id}.png`}
                      alt=""
                      fill
                      sizes="(max-width:700px) 80vw, 22vw"
                    />
                    <span className={styles.play} aria-hidden="true">
                      ▶
                    </span>
                  </button>
                )}
                <div className={styles.videoName}>
                  <h3>{name}</h3>
                  <a
                    href={`https://www.instagram.com/${instagram}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Investor profile ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.note}>
            Select a story, then use the video’s playback controls. These are
            Baselane customer experiences. The original videos do not supply
            separate caption tracks.
          </p>
        </section>
        <section className={styles.section}>
          <h2>What investors talk about</h2>
          <p className={styles.lead}>
            Themes from Baselane’s published reviews. Open the original
            collection to read the full comments.
          </p>
          <div className={styles.reviews} aria-live="polite">
            {reviews
              .slice(reviewPage * 6, reviewPage * 6 + 6)
              .map(([name, topic]) => (
                <article key={name}>
                  <span className={styles.eyebrow}>REVIEW HIGHLIGHT</span>
                  <h3>{topic}</h3>
                  <p>{name}</p>
                  <a href={source}>Read on Baselane ↗</a>
                </article>
              ))}
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => setReviewPage(1 - reviewPage)}
            >
              ←
            </button>
            <span aria-live="polite">{reviewPage + 1} / 2</span>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => setReviewPage(1 - reviewPage)}
            >
              →
            </button>
          </div>
        </section>
        <section
          className={styles.caseSection}
          id="case-studies"
          aria-label="Customer case studies"
        >
          <div className={styles.case} aria-live="polite">
            <div className={styles.casePhoto}>
              <Image
                src={`${root}/${story[0]}.webp`}
                alt={story[1]}
                fill
                sizes="(max-width:700px) 100vw, 50vw"
              />
              <div className={styles.caseBadge}>
                <strong>{story[1]}</strong>
                <span>{story[2]} properties in the source story</span>
              </div>
            </div>
            <div className={styles.caseCopy}>
              <span className={styles.eyebrow}>
                BASELANE CUSTOMER CASE STUDY
              </span>
              <h2>{story[3]}</h2>
              <p>{story[4]}</p>
              <a
                className={styles.button}
                href={story[5]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read {story[1]}’s story (PDF) ↗
              </a>
            </div>
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              aria-label="Previous case study"
              onClick={() => setCaseIndex((caseIndex + 3) % 4)}
            >
              ←
            </button>
            <span aria-live="polite">{caseIndex + 1} / 4</span>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => setCaseIndex((caseIndex + 1) % 4)}
            >
              →
            </button>
          </div>
        </section>
        <section className={styles.closing}>
          <picture>
            <source
              media="(max-width:700px)"
              srcSet="/brand/baselane-inspired/partners/closing-mobile.webp"
            />
            <Image
              src="/brand/baselane-inspired/partners/closing-desktop.webp"
              alt=""
              fill
              sizes="100vw"
            />
          </picture>
          <div>
            <h2>Make room for your next idea.</h2>
            <p>Explore a more connected way to work with Innflow.</p>
            <div className={styles.actions}>
              <a className={styles.outline} href="/BL/BL-demo">
                Explore Innflow →
              </a>
              <a
                className={styles.button}
                href={`${siteConfig.appOrigin}/login`}
              >
                Continue with Google
              </a>
            </div>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
