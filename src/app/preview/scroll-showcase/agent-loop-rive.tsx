"use client";

import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  useRive,
} from "@rive-app/react-webgl2";
import { useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./showcase.module.css";

// Keep these self-hosted binaries in sync with the installed WebGL2 runtime.
RuntimeLoader.setWasmUrl("/brand/agents/rive-2.44.0.wasm");
RuntimeLoader.setWasmFallbackUrl("/brand/agents/rive-fallback-2.44.0.wasm");

export function AgentLoopRive({ active }: { active: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { rive, RiveComponent } = useRive({
    src: "/brand/agents/innflow-agent-seamless-loop.riv",
    artboard: "Innflow Agent Seamless Loop",
    stateMachine: "Agent Loop Controller",
    autoplay: false,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onRiveReady: () => setReady(true),
    onLoadError: () => setFailed(true),
  });

  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!rive) return;
    if (active && inView && visible && reducedMotion === false) {
      rive.play();
    } else {
      rive.pause();
    }
    return () => rive.pause();
  }, [active, inView, visible, reducedMotion, rive]);

  return (
    <div
      ref={container}
      className={styles.agentLoopArtwork}
      data-agent-loop="rive"
      data-ready={ready && !failed}
      data-playing={
        ready &&
        !failed &&
        active &&
        inView &&
        visible &&
        reducedMotion === false
      }
      aria-hidden="true"
    >
      <Image
        src="/brand/agents/agent-seamless-loop-poster.jpg"
        alt=""
        fill
        sizes="310px"
      />
      <RiveComponent
        className={styles.agentLoopCanvas}
        style={{ opacity: ready && !failed && reducedMotion === false ? 1 : 0 }}
      />
    </div>
  );
}
