"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import styles from "./blog-carousel.module.css";

export type BlogCarouselPost = {
  category: string;
  coverImageAlt: string;
  coverImageUrl: string | null;
  date: string;
  excerpt: string | null;
  readTime: number | null;
  slug: string;
  title: string;
};

export function BlogCarousel({ posts }: { posts: BlogCarouselPost[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(posts.length > 1);

  const updatePosition = useCallback(() => {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstSlide) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = firstSlide.getBoundingClientRect().width + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    setActiveIndex(
      Math.min(posts.length - 1, Math.round(track.scrollLeft / step)),
    );
    setCanScrollBack(track.scrollLeft > 2);
    setCanScrollForward(track.scrollLeft < maxScroll - 2);
  }, [posts.length]);

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

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstSlide) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstSlide.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      className={styles.carousel}
      aria-label="Recent blog posts"
      aria-roledescription="carousel"
    >
      <div className={styles.controls}>
        <span className={styles.status} aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(posts.length).padStart(2, "0")}
        </span>
        <div className={styles.buttons}>
          <button
            aria-label="Show previous blog post"
            className={styles.button}
            disabled={!canScrollBack}
            onClick={() => scroll(-1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          <button
            aria-label="Show next blog post"
            className={styles.button}
            disabled={!canScrollForward}
            onClick={() => scroll(1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      <ul className={styles.track} ref={trackRef}>
        {posts.map((post) => (
          <li className={styles.slide} key={post.slug}>
            <TrackedLink
              className={styles.card}
              destination={`/blog/${post.slug}`}
              eventLabel="homepage_recent_blog_post"
            >
              <span className={styles.media}>
                {post.coverImageUrl ? (
                  <Image
                    alt={post.coverImageAlt}
                    className={styles.image}
                    fill
                    sizes="(max-width: 720px) 84vw, (max-width: 980px) 48vw, 31vw"
                    src={post.coverImageUrl}
                  />
                ) : (
                  <span className={styles.mediaFallback} aria-hidden="true" />
                )}
              </span>
              <span className={styles.copy}>
                <span className={styles.category}>{post.category}</span>
                <strong>{post.title}</strong>
                {post.excerpt ? (
                  <span className={styles.excerpt}>{post.excerpt}</span>
                ) : null}
                <span className={styles.meta}>
                  {post.date ? <time>{post.date}</time> : null}
                  {post.date && post.readTime ? (
                    <span aria-hidden="true">·</span>
                  ) : null}
                  {post.readTime ? <span>{post.readTime} min read</span> : null}
                </span>
              </span>
            </TrackedLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
