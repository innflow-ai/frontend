"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Testimonial } from "@/lib/testimonials";
import styles from "./testimonial-cards.module.css";

export function TestimonialCard({ item }: { item: Testimonial }) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const id = useId();
  const open = pinned || hovered;
  return (
    <article
      className={styles.card}
      data-open={open}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setPinned(false);
          setHovered(false);
        }
      }}
    >
      <Image
        className={styles.portrait}
        src={item.portrait.url}
        alt={item.portrait.alt}
        fill
        sizes="(max-width: 700px) 82vw, 300px"
      />
      <div className={styles.shade} />
      <div className={styles.front} aria-hidden={open}>
        <span className={styles.name}>{item.name}</span>
        {item.statistic ? (
          <p className={styles.statistic}>
            <strong>{item.statistic.value}</strong>
            <span>{item.statistic.label}</span>
          </p>
        ) : (
          <p className={styles.shortQuote}>
            <span aria-hidden="true">“</span>
            {item.shortQuote}
          </p>
        )}
      </div>
      <div id={id} className={styles.details} hidden={!open}>
        <div className={styles.profile}>
          <Image src={item.avatarUrl} alt="" width={40} height={40} />
          <div>
            <p>{item.name}</p>
            {item.role && <span>{item.role}</span>}
            {typeof item.propertyCount === "number" && (
              <small>
                {item.propertyCount}{" "}
                {item.propertyCount === 1 ? "property" : "properties"}
              </small>
            )}
          </div>
        </div>
        <blockquote>“{item.quote}”</blockquote>
      </div>
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${open ? "Close" : "Read"} ${item.name}’s testimonial`}
        onClick={() => {
          setPinned(!open);
          setHovered(false);
        }}
      >
        {open ? "Close" : "Read story"}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
    </article>
  );
}

export function TestimonialCards({
  testimonials,
  heading = "In their own words.",
}: {
  testimonials: Testimonial[];
  heading?: string;
}) {
  const headingId = useId();
  if (!testimonials.length) return null;
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId}>{heading}</h2>
      <div className={styles.track}>
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
