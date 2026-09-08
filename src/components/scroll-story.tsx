"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./scroll-story.module.css";

export type ScrollStoryStep = { id: string; label: string; content: ReactNode };

export function storyPosition(
  distance: number,
  segment: number,
  count: number,
) {
  const position = Math.max(
    0,
    Math.min(count, distance / Math.max(1, segment)),
  );
  return { position, active: Math.min(count - 1, Math.floor(position)) };
}

export function ScrollStory({ steps }: { steps: ScrollStoryStep[] }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (!steps.length) return;
    const media = window.matchMedia(
      "(min-width: 851px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches || !track.current || !stage.current) return;
      const rect = track.current.getBoundingClientRect();
      const top = Number.parseFloat(getComputedStyle(stage.current).top) || 110;
      const travel = rect.height - stage.current.offsetHeight;
      const result = storyPosition(
        top - rect.top,
        travel / steps.length,
        steps.length,
      );
      setActive(result.active);
      bars.current.forEach((bar, index) => {
        bar?.style.setProperty(
          "transform",
          `scaleX(${Math.max(0, Math.min(1, result.position - index))})`,
        );
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const sync = () => {
      setEnhanced(media.matches);
      schedule();
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (track.current) observer.observe(track.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [steps.length]);

  if (!steps.length) return null;

  return (
    <div className={styles.story} data-enhanced={enhanced}>
      <nav className={styles.nav} aria-label="Explore features">
        {steps.map((step, index) => (
          <a
            key={step.id}
            href={`#${step.id}`}
            aria-current={enhanced && active === index ? "step" : undefined}
            onClick={(event) => {
              if (!enhanced || !track.current || !stage.current) return;
              event.preventDefault();
              const rect = track.current.getBoundingClientRect();
              const top =
                Number.parseFloat(getComputedStyle(stage.current).top) || 110;
              const segment =
                (rect.height - stage.current.offsetHeight) / steps.length;
              window.scrollTo({
                top: window.scrollY + rect.top - top + segment * index + 1,
                behavior: "smooth",
              });
            }}
          >
            {step.label}
            <span className={styles.rail} aria-hidden="true">
              <span
                ref={(node) => {
                  bars.current[index] = node;
                }}
              />
            </span>
          </a>
        ))}
      </nav>
      <div
        ref={track}
        className={styles.track}
        style={{ "--story-count": steps.length } as CSSProperties}
      >
        <div ref={stage} className={styles.stage}>
          {steps.map((step, index) => (
            <div
              id={step.id}
              key={step.id}
              className={styles.panel}
              data-active={index === active}
              aria-hidden={enhanced && index !== active}
              inert={enhanced && index !== active}
            >
              {step.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
