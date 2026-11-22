"use client";

import { useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LottieArtwork } from "./lottie-artwork";
import styles from "./storyboard-artwork.module.css";

export type Storyboard = {
  number: number;
  title: string;
  poster: string;
  src?: string;
  artboard?: string;
  animation?: string;
  stateMachine?: string | null;
};

const StoryboardRive = dynamic(
  () => import("./storyboard-rive").then((module) => module.StoryboardRive),
  { ssr: false },
);

export function StoryboardArtwork({ storyboard }: { storyboard: Storyboard }) {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView && reducedMotion === false) setEntered(true);
  }, [inView, reducedMotion]);

  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  if (storyboard.src?.endsWith(".json")) {
    return (
      <div
        ref={container}
        className={styles.lottie}
        data-storyboard={storyboard.number}
        data-storyboard-source="lottie"
        aria-hidden="true"
      >
        <LottieArtwork
          artwork={storyboard.src.slice(0, -5)}
          width={640}
          height={640}
          play={inView && visible && reducedMotion === false}
        />
      </div>
    );
  }

  return (
    <div
      ref={container}
      className={styles.artwork}
      data-storyboard={storyboard.number}
      data-storyboard-source={storyboard.src ? "rive" : "poster"}
      aria-hidden="true"
    >
      <Image
        src={storyboard.poster}
        alt=""
        fill
        sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1280px) 46vw, 580px"
      />
      {entered && reducedMotion === false && storyboard.src && (
        <StoryboardRive storyboard={storyboard} playing={inView && visible} />
      )}
    </div>
  );
}
