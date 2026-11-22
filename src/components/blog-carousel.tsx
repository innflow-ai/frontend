"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import pager from "./carousel-pagination.module.css";
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
  const [visibleCount, setVisibleCount] = useState(1);
  const slideStep = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild;
    if (!track || !firstSlide) return;

    let frame = 0;
    function updatePosition() {
      frame = 0;
      if (!track || !slideStep.current) return;
      const left = Math.max(0, track.scrollLeft);
      setActiveIndex(Math.min(posts.length - 1, Math.round(left / slideStep.current)));
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(updatePosition);
    }
    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      slideStep.current = firstSlide.getBoundingClientRect().width + gap;
      if (!slideStep.current) return;
      setVisibleCount(Math.max(1, Math.floor((track.clientWidth + gap + 1) / slideStep.current)));
      onScroll();
    };
    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(firstSlide);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [posts.length]);

  const scroll = (index: number, keyboard: boolean) => {
    const track = trackRef.current;
    if (!track || !slideStep.current) return;
    track.scrollTo({
      left: index * slideStep.current,
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
      aria-label="Recent blog posts"
      aria-roledescription="carousel"
    >
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
                    sizes="(max-width: 720px) min(84vw, 350px), (max-width: 980px) 48vw, (max-width: 1160px) 31vw, 360px"
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
      {posts.length > visibleCount && (
        <fieldset className={pager.controls} aria-label="Choose blog posts">
          {posts.slice(0, posts.length - visibleCount + 1).map((post, index) => (
            <button
              type="button"
              key={post.slug}
              aria-label={`Show posts starting with ${post.title}`}
              aria-pressed={activeIndex === index}
              onClick={(event) => scroll(index, event.detail === 0)}
            >
              <span />
            </button>
          ))}
        </fieldset>
      )}
    </section>
  );
}
