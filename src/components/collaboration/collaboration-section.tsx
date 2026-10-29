"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./collaboration-section.module.css";
import { useCollaborationScroll } from "./use-collaboration-scroll";

const platforms = [
  {
    id: "slack",
    title: "Slack",
    icons: ["slack"],
    description: "@mention an agent in any channel or thread",
  },
  {
    id: "teams",
    title: "Microsoft Teams",
    icons: ["teams"],
    description: "Bring your agents into your team's conversations",
  },
  {
    id: "email",
    title: "Email",
    icons: ["gmail", "outlook"],
    description: "Delegate work directly from your inbox",
  },
  {
    id: "messages",
    title: "iMessage",
    icons: ["messages"],
    description: "Send a message. Let your assistant take it from there.",
  },
] as const;

/** Independent HTML demos stay mounted so local edits survive scroll transitions. */
export function CollaborationSection({ demos }: { demos: ReactNode[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const scroll = useCollaborationScroll(setActive);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const frames = section.querySelectorAll<HTMLElement>("[data-platform]");
    const resize = new ResizeObserver((entries) => {
      for (const entry of entries) {
        section.style.setProperty(
          "--demo-scale",
          String(entry.contentRect.width / 900),
        );
      }
    });
    if (scroll.visualRef.current) resize.observe(scroll.visualRef.current);
    // A single reading line keeps scroll selection stable even when two panels are visible.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.platform;
            const index = platforms.findIndex((platform) => platform.id === id);
            if (!scroll.pinned && index !== -1) setActive(index);
          }
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 },
    );
    if (!scroll.pinned) for (const frame of frames) observer.observe(frame);
    return () => {
      resize.disconnect();
      observer.disconnect();
    };
  }, [scroll.pinned, scroll.visualRef]);

  return (
    <section
      ref={root}
      id="collaborate"
      className={styles.section}
      data-scroll={scroll.pinned}
      aria-labelledby="collaboration-heading"
    >
      <div ref={scroll.layoutRef} className={styles.layout}>
        <aside className={styles.copy}>
          <p className={styles.eyebrow}>Collaborate</p>
          <h2 id="collaboration-heading">
            Meet your team <br />
            where they work
          </h2>
          <nav
            className={styles.navigation}
            aria-label="Collaboration platforms"
          >
            {platforms.map((platform, index) => (
              <a
                key={platform.id}
                href={`#collaboration-${platform.id}`}
                aria-label={platform.title}
                aria-current={active === index ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  // This showcase owns its scroll destinations, as in ScrollStory.
                  event.stopPropagation();
                  scroll.select(index);
                  if (scroll.pinned) return;
                  document
                    .getElementById(`collaboration-${platform.id}`)
                    ?.scrollIntoView({
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    });
                }}
              >
                <span className={styles.platformTitle}>
                  {platform.icons.map((icon) => (
                    <Image
                      key={icon}
                      src={`/brand/collaboration/${icon}.png`}
                      width={16}
                      height={16}
                      alt=""
                    />
                  ))}
                  <span>{platform.title}</span>
                </span>
                <span className={styles.description}>
                  {platform.description}
                </span>
              </a>
            ))}
          </nav>
        </aside>
        <div ref={scroll.visualRef} className={styles.demos}>
          {platforms.map((platform, index) => (
            <figure
              key={platform.id}
              id={`collaboration-${platform.id}`}
              className={styles.demo}
              data-platform={platform.id}
              hidden={scroll.pinned && active !== index}
            >
              <figcaption className={styles.mobileCaption}>
                {platform.title}
              </figcaption>
              <section
                className={styles.viewport}
                aria-label={`${platform.title} interactive demo`}
              >
                <div className={styles.stage}>{demos[index]}</div>
              </section>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
