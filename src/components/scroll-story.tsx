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

export function ScrollStory({
  steps,
  fallback,
  after,
  navFooter,
  navClassName,
  layout = "slides",
}: {
  steps: ScrollStoryStep[];
  fallback?: ReactNode;
  after?: ReactNode;
  navFooter?: ReactNode;
  navClassName?: string;
  layout?: "slides" | "stacked";
}) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (!steps.length) return;
    const media = window.matchMedia(
      layout === "stacked"
        ? "(min-width: 851px)"
        : "(min-width: 851px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches || !track.current || !stage.current) return;
      if (layout === "stacked") {
        const panels = Array.from(stage.current.children);
        const bounds = panels.map((panel) => panel.getBoundingClientRect());
        const readingLine = 110;
        setActive(
          Math.max(
            0,
            bounds.findLastIndex((rect) => rect.top <= readingLine),
          ),
        );
        bars.current.forEach((bar, index) => {
          const rect = bounds[index];
          const end = bounds[index + 1]?.top ?? rect.bottom;
          const progress = Math.max(
            0,
            Math.min(1, (readingLine - rect.top) / Math.max(1, end - rect.top)),
          );
          bar?.style.setProperty("transform", `scaleX(${progress})`);
        });
        return;
      }
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
    // Reconnect after the desktop stage replaces a supplied mobile fallback.
    if (enhanced && track.current) observer.observe(track.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [steps.length, enhanced, layout]);

  if (!steps.length) return null;
  if (!enhanced && fallback !== undefined) return fallback;

  return (
    <div className={styles.story} data-enhanced={enhanced} data-layout={layout}>
      <nav
        className={`${styles.nav} ${navClassName ?? ""}`}
        aria-label="Explore features"
      >
        {steps.map((step, index) => (
          <a
            key={step.id}
            href={`#${step.id}`}
            aria-current={enhanced && active === index ? "step" : undefined}
            onClick={(event) => {
              if (!enhanced || !track.current || !stage.current) return;
              event.preventDefault();
              // This timeline owns the destination; avoid the global anchor scroller.
              event.stopPropagation();
              const rect = track.current.getBoundingClientRect();
              const top =
                Number.parseFloat(getComputedStyle(stage.current).top) || 110;
              const segment =
                (rect.height - stage.current.offsetHeight) / steps.length;
              const destination =
                layout === "stacked"
                  ? stage.current.children[index].getBoundingClientRect().top -
                    110
                  : rect.top - top + segment * index;
              window.scrollTo({
                top: window.scrollY + destination + 1,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
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
        {navFooter}
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
              aria-hidden={layout === "slides" && enhanced && index !== active}
              inert={layout === "slides" && enhanced && index !== active}
            >
              {step.content}
            </div>
          ))}
        </div>
      </div>
      {after && <div className={styles.after}>{after}</div>}
    </div>
  );
}
