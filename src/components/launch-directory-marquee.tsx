"use client";

import Image from "next/image";
import { useState } from "react";
import { launchDirectories } from "@/content/launch-directories";
import styles from "./launch-directory-marquee.module.css";

const orderedDirectories = [...launchDirectories].sort(
  (a, b) => Number(a.status === "pending") - Number(b.status === "pending"),
);

export function LaunchDirectoryMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="featured-on"
      className={styles.section}
      aria-labelledby="directory-heading"
    >
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>THE STARTUP COMMUNITY</p>
          <h2 id="directory-heading">Featured on &amp; launching with</h2>
          <p className={styles.description}>
            Discover Innflow across startup directories. Upcoming listings are
            marked below.
          </p>
        </div>
        <button
          type="button"
          aria-pressed={paused}
          aria-label="Pause directory animation"
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div className={styles.viewport} data-paused={paused}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div
              className={styles.group}
              key={copy}
              aria-hidden={copy === 1 || undefined}
            >
              {orderedDirectories.map((directory) => (
                <a
                  key={directory.name}
                  className={styles.badge}
                  href={directory.href}
                  target="_blank"
                  rel={directory.rel}
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-label={`Visit ${directory.name}${directory.status === "pending" ? ", listing pending" : ""} (opens in a new tab)`}
                >
                  <span className={styles.artwork}>
                    <Image
                      src={directory.src}
                      alt={directory.alt}
                      width={directory.width}
                      height={directory.height}
                      unoptimized
                    />
                  </span>
                  <span className={styles.status}>
                    {directory.status === "pending"
                      ? "Listing pending"
                      : "Featured listing"}
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
