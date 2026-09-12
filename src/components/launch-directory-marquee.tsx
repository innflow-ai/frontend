"use client";

import Image from "next/image";
import { useState } from "react";
import { launchDirectories } from "@/content/launch-directories";
import styles from "./launch-directory-marquee.module.css";

export function LaunchDirectoryMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.section} aria-label="Launch directories">
      <div className={styles.heading}>
        <p>Launch directories</p>
        <button
          type="button"
          aria-pressed={paused}
          aria-label="Pause directory animation"
          onClick={() => setPaused(!paused)}
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
              {launchDirectories.map((directory) => (
                <a
                  key={directory.name}
                  className={styles.badge}
                  href={directory.href}
                  target="_blank"
                  rel={`noopener noreferrer${directory.nofollow ? " nofollow" : ""}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-label={`Visit ${directory.name} (opens in a new tab)`}
                >
                  <Image
                    src={directory.src}
                    alt={directory.name}
                    width={directory.width}
                    height={directory.height}
                    unoptimized
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
