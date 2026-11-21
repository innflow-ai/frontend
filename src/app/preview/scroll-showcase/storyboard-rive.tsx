"use client";

import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  useRive,
} from "@rive-app/react-webgl2";
import { useEffect, useState } from "react";
import type { Storyboard } from "./storyboard-artwork";
import styles from "./storyboard-artwork.module.css";

// These binaries match @rive-app/webgl2 2.44.0, installed by react-webgl2.
RuntimeLoader.setWasmUrl("/brand/agents/rive-2.44.0.wasm");
RuntimeLoader.setWasmFallbackUrl("/brand/agents/rive-fallback-2.44.0.wasm");
const layout = new Layout({ fit: Fit.Contain, alignment: Alignment.Center });

export function StoryboardRive({
  storyboard,
  playing,
}: {
  storyboard: Storyboard;
  playing: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { rive, RiveComponent } = useRive({
    src: storyboard.src,
    artboard: storyboard.artboard,
    stateMachine: storyboard.stateMachine ?? undefined,
    autoplay: false,
    layout,
    shouldDisableRiveListeners: true,
    enableRiveAssetCDN: false,
    onRiveReady: (instance) => {
      const valid =
        instance.animationNames.includes(storyboard.animation ?? "") &&
        instance.stateMachineNames.includes(storyboard.stateMachine ?? "");
      setFailed(!valid);
      setReady(valid);
    },
    onLoadError: () => setFailed(true),
  });

  useEffect(() => {
    if (!rive || !ready || failed) return;
    if (playing) rive.play();
    else rive.pause();
    return () => rive.pause();
  }, [rive, ready, failed, playing]);

  return (
    <RiveComponent
      className={styles.canvas}
      data-rive-ready={ready && !failed}
      data-rive-playing={ready && !failed && playing}
      data-rive-error={failed}
      style={{ opacity: ready && !failed ? 1 : 0 }}
    />
  );
}
