"use client";

import type { AnimationItem } from "lottie-web";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  artwork: string;
  play: boolean;
  width: number;
  height: number;
  crop?: boolean;
};

export function LottieArtwork({
  artwork,
  play,
  width,
  height,
  crop = false,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = host.current;
    if (!play || !container) return;
    let disposed = false;
    let animation: AnimationItem | undefined;
    void import("lottie-web")
      .then(({ default: lottie }) => {
        if (disposed) return;
        animation = lottie.loadAnimation({
          container,
          renderer: "svg",
          autoplay: false,
          loop: true,
          rendererSettings: {
            preserveAspectRatio: crop ? "xMidYMid slice" : "xMidYMid meet",
          },
          path: artwork + ".json",
        });
        animation.addEventListener("DOMLoaded", () => {
          if (disposed) return;
          setReady(true);
          animation?.play();
        });
      })
      .catch(() => {});
    return () => {
      disposed = true;
      animation?.destroy();
      setReady(false);
    };
  }, [artwork, crop, play]);

  return (
    <>
      <Image
        src={artwork + ".png"}
        width={width}
        height={height}
        alt=""
        hidden={play && ready}
      />
      <div
        ref={host}
        style={{ opacity: play && ready ? 1 : 0 }}
        aria-hidden="true"
      />
    </>
  );
}
