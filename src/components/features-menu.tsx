"use client";

import type { AnimationItem } from "lottie-web";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./features-menu.module.css";

const features = [
  {
    name: "Flow",
    slug: "flow",
    body: "Plan multi-agent work with visible ownership, gates, and progress.",
    href: "/features/workflows",
  },
  {
    name: "Botmode",
    slug: "botmode",
    body: "Delegate outcomes while keeping execution visible and reviewable.",
  },
  {
    name: "Channels",
    slug: "channels",
    body: "Keep people, agents, files, and decisions in one shared workspace.",
  },
  {
    name: "Connectors",
    slug: "connectors",
    body: "Give agents scoped access to the tools and data your team uses.",
    href: "/integrations",
  },
  {
    name: "Agent Memory",
    slug: "agent-memory",
    body: "Carry relevant goals, decisions, and context across ongoing work.",
    href: "/features/agent-memory",
  },
  {
    name: "Teammates",
    slug: "teammates",
    body: "Agents that work in your Channels like colleagues.",
    href: "/features/teammates",
  },
  {
    name: "Computer",
    slug: "computer",
    body: "Mention Codex or Claude Code in a channel and run tasks on your Mac.",
  },
];

const assetRoot = "/brand/navigation/features/";

function FeatureArtwork({ slug }: { slug: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const update = () => {
      cleanup();
      setReady(false);
      const container = host.current;
      if (preference.matches || !container) return;
      let active = true;
      let animation: AnimationItem | undefined;
      cleanup = () => {
        active = false;
        animation?.destroy();
      };
      void import("lottie-web")
        .then(({ default: lottie }) => {
          if (!active) return;
          animation = lottie.loadAnimation({
            container,
            renderer: "svg",
            autoplay: false,
            loop: false,
            path: assetRoot + slug + ".json",
          });
          animation.addEventListener("DOMLoaded", () => {
            if (!active) return;
            setReady(true);
            animation?.play();
          });
          const showPoster = () => {
            if (active) setReady(false);
          };
          animation.addEventListener("complete", showPoster);
          animation.addEventListener("data_failed", showPoster);
        })
        .catch(() => {
          if (active) setReady(false);
        });
    };
    update();
    preference.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
      cleanup();
    };
  }, [slug]);
  return (
    <div className={styles.art} aria-hidden="true">
      <img alt="" src={assetRoot + slug + "-poster.png"} hidden={ready} />
      <div ref={host} hidden={!ready} />
    </div>
  );
}

export function FeaturesMenu({ closeMenu }: { closeMenu: () => void }) {
  const [selected, select] = useState(0);
  const id = useId();
  const feature = features[selected];
  return (
    <div className={styles.layout}>
      <div className={styles.list}>
        <h3>Features</h3>
        <div role="tablist" aria-label="Feature previews">
          {features.map((item, index) => (
            <button
              type="button"
              key={item.slug}
              role="tab"
              id={id + "-" + index}
              tabIndex={index === selected ? 0 : -1}
              aria-selected={index === selected}
              aria-controls={id}
              onKeyDown={(event) => {
                const next = {
                  ArrowDown: (index + 1) % features.length,
                  ArrowRight: (index + 1) % features.length,
                  ArrowUp: (index + features.length - 1) % features.length,
                  ArrowLeft: (index + features.length - 1) % features.length,
                  Home: 0,
                  End: features.length - 1,
                }[event.key];
                if (next === undefined) return;
                event.preventDefault();
                document.getElementById(id + "-" + next)?.focus();
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") select(index);
              }}
              onFocus={() => select(index)}
              onClick={() => select(index)}
            >
              <span className={styles.icon}>
                <img alt="" src={assetRoot + item.slug + "-glyph.png"} />
              </span>
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <section
        className={styles.preview}
        id={id}
        role="tabpanel"
        aria-labelledby={id + "-" + selected}
      >
        <div className={styles.copy}>
          <h3>
            {feature.href ? (
              <a href={feature.href} onClick={closeMenu}>
                {feature.name}
              </a>
            ) : (
              feature.name
            )}
          </h3>
          <p>{feature.body}</p>
        </div>
        <FeatureArtwork key={feature.slug} slug={feature.slug} />
      </section>
    </div>
  );
}
