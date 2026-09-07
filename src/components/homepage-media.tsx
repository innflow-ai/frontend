"use client";

import Image from "next/image";
import { useState } from "react";
import {
  type HomepageRecording,
  type HomepageView,
  homepageMedia,
  homepageViews,
} from "@/content/homepage-media";
import styles from "./runey-landing.module.css";

export function BlueRibbon() {
  return (
    <div className={styles.blueRibbon} aria-hidden="true">
      <Image
        src="/brand/runey/blue-glass-ribbon.webp"
        alt=""
        fill
        sizes="100vw"
        preload
        unoptimized
      />
    </div>
  );
}

export function GlassMediaFrame({
  src,
  poster,
  captions,
  label,
}: HomepageRecording) {
  return (
    <div className={styles.glassFrame}>
      {src ? (
        <video
          key={src}
          className={styles.recording}
          src={src}
          poster={poster}
          controls
          muted={!captions}
          playsInline
          preload="none"
          aria-label={label}
        >
          {captions && (
            <track
              kind="captions"
              src={captions}
              srcLang="en"
              label="English"
              default
            />
          )}
        </video>
      ) : (
        <div className={styles.glassInterior} aria-hidden="true" />
      )}
    </div>
  );
}

export function HomepageMedia({
  view = "Workflows",
  interactive = false,
  closing = false,
}: {
  view?: HomepageView;
  interactive?: boolean;
  closing?: boolean;
}) {
  const [selected, setSelected] = useState<HomepageView>(view);
  const media = closing
    ? homepageMedia.closing
    : interactive
      ? homepageMedia.hero[selected]
      : homepageMedia.features[view];
  return (
    <div className={styles.previewGroup}>
      {interactive && (
        <fieldset
          className={styles.previewTabs}
          aria-label="Explore product previews"
        >
          {homepageViews.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={selected === item}
              onClick={() => setSelected(item)}
            >
              {item}
            </button>
          ))}
        </fieldset>
      )}
      <GlassMediaFrame {...media} />
    </div>
  );
}
