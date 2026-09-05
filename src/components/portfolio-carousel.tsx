"use client";

import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  HouseLine,
  Key,
  UsersThree,
  Warehouse,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./portfolio-carousel.module.css";

const portfolioTypes = [
  {
    title: "Residential",
    body: "Apartments, condos & mixed-use",
    image: "/portfolio/generated/residential.webp",
    icon: Buildings,
  },
  {
    title: "Single-Family",
    body: "Build-to-rent & single-family",
    image: "/portfolio/generated/single-family.webp",
    icon: HouseLine,
  },
  {
    title: "Multifamily",
    body: "Large and mid-sized communities",
    image: "/portfolio/generated/multifamily.webp",
    icon: Buildings,
  },
  {
    title: "Commercial",
    body: "Office, retail & industrial",
    image: "/portfolio/generated/commercial.webp",
    icon: Warehouse,
  },
  {
    title: "Community Associations",
    body: "HOAs, condos & townhomes",
    image: "/portfolio/generated/community-associations.webp",
    icon: UsersThree,
  },
  {
    title: "Affordable Housing",
    body: "Public, LIHTC & subsidized",
    image: "/portfolio/generated/affordable-housing.webp",
    icon: Key,
  },
];

export function PortfolioCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updatePosition = useCallback(() => {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstSlide) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = firstSlide.getBoundingClientRect().width + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setVisibleCount(
      Math.max(1, Math.floor((track.clientWidth + gap + 1) / step)),
    );

    setActiveIndex(
      Math.min(portfolioTypes.length - 1, Math.round(track.scrollLeft / step)),
    );
    setCanScrollBack(track.scrollLeft > 2);
    setCanScrollForward(track.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updatePosition();
    track.addEventListener("scroll", updatePosition, { passive: true });
    const observer = new ResizeObserver(updatePosition);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", updatePosition);
      observer.disconnect();
    };
  }, [updatePosition]);

  const scroll = (direction: -1 | 1, keyboard: boolean) => {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstSlide) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstSlide.getBoundingClientRect().width + gap),
      behavior:
        keyboard ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  };

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Property types"
    >
      <div className={styles.controls}>
        <span className={styles.status} aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")}
          {visibleCount > 1
            ? `–${String(Math.min(portfolioTypes.length, activeIndex + visibleCount)).padStart(2, "0")}`
            : ""}{" "}
          / {String(portfolioTypes.length).padStart(2, "0")}
        </span>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            aria-label="Show previous property type"
            disabled={!canScrollBack}
            onClick={(event) => scroll(-1, event.detail === 0)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            className={styles.button}
            type="button"
            aria-label="Show next property type"
            disabled={!canScrollForward}
            onClick={(event) => scroll(1, event.detail === 0)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul className={styles.track} ref={trackRef}>
        {portfolioTypes.map(({ title, body, image, icon: Icon }) => (
          <li className={styles.slide} key={title}>
            <article className={styles.card}>
              <Image
                className={styles.image}
                src={image}
                alt={`${title} property portfolio`}
                fill
                sizes="(max-width: 720px) 84vw, (max-width: 980px) 48vw, 31vw"
              />
              <div className={styles.copy}>
                <span className={styles.icon}>
                  <Icon size={20} weight="duotone" aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
