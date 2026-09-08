"use client";
import Image from "next/image";
import { useRef } from "react";
import styles from "./baselane-forms.module.css";
import { formGroups } from "./baselane-forms-data";
import { BaselaneHomepage } from "./baselane-homepage";
import shared from "./baselane-partners.module.css";

function FormGroup({ group }: { group: (typeof formGroups)[number] }) {
  const track = useRef<HTMLElement>(null);
  function move(direction: number) {
    const el = track.current;
    if (el)
      el.scrollBy({
        left: direction * el.clientWidth,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  return (
    <section className={styles.group} id={group.slug}>
      <h2>{group.title}</h2>
      <section
        className={styles.track}
        ref={track}
        aria-label={`${group.title} resources`} // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access to horizontal scrolling
        tabIndex={0}
      >
        {group.items.map(([title, slug]) => (
          <article key={slug}>
            <div className={styles.cardTop}>INNFLOW PREPARATION WORKSHEET</div>
            <div className={styles.cardBody}>
              <h3>{title}</h3>
              <p>{group.description}</p>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent([`innflow — ${title}`, "", group.description, "", "Property:", "Prepared by:", "Review date:", "", "Purpose of this document:", "Supporting records and source links:", "Questions for the reviewer:", "Document provider or adviser:", "Responsible owner:", "Next action and due date:", "Review outcome:", "", "Preparation worksheet only. Have the final document reviewed for your property and circumstances."].join("\n"))}`}
                download={`innflow-${slug}-preparation.txt`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Download ${title.toLowerCase()} preparation worksheet`}
              >
                Download worksheet ↓
              </a>
            </div>
          </article>
        ))}
      </section>
      <div className={styles.controls}>
        <a href="/BL/BL-lease-agreement" target="_blank" rel="noreferrer">
          Explore document workflows →
        </a>
        <div>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={`Previous ${group.title.toLowerCase()}`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={`Next ${group.title.toLowerCase()}`}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
export function BaselaneForms() {
  return (
    <BaselaneHomepage>
      <div className={`${shared.page} ${styles.page}`}>
        <section className={shared.hero}>
          <div className={shared.heroCopy}>
            <h1>Prepare your paperwork. Keep the context.</h1>
            <p>
              Use innflow preparation worksheets to organize property details,
              supporting records, and questions before a document review.
            </p>
          </div>
          <Image
            className={shared.photo}
            src="/brand/baselane-inspired/forms/forms-hero.webp"
            alt="A woman working at a kitchen table"
            width={1164}
            height={640}
            priority
          />
        </section>
        <nav className={styles.categoryNav} aria-label="Form categories">
          {formGroups.map((g) => (
            <a key={g.slug} href={`#${g.slug}`}>
              {g.title} ↓
            </a>
          ))}
        </nav>
        <div className={styles.publisher}>
          Download an editable text worksheet for the task at hand. These
          planning documents help you prepare; your document provider or adviser
          should prepare and review final agreements and notices.
        </div>
        {formGroups.map((group) => (
          <FormGroup key={group.slug} group={group} />
        ))}
        <section className={`${shared.closing} ${shared.photoClosing}`}>
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
            <h2>Bring the paperwork into the workflow.</h2>
            <p>
              Keep supporting information close to the work your team is doing.
            </p>
            <a className={shared.button} href="/BL/BL-lease-agreement">
              Explore lease workflows
            </a>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
