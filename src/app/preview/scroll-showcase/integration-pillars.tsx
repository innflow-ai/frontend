"use client";

import type { Rive } from "@rive-app/webgl2";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./baseline-lower-sections.module.css";

// Row-major order of the diamonds on the Rive artboard.
const companies = [
  "Notion",
  "Gmail",
  "Google Drive",
  "Salesforce",
  "Claude",
  "Chrome",
  "Cursor",
  "Slack",
  "OpenAI",
  "Google Calendar",
  "Microsoft Teams",
  "Google Meet",
  "GitHub",
  "Outlook",
  "HubSpot",
  "Zoom",
  "LinkedIn",
  "SharePoint",
  "Railway",
  "Stripe",
  "Google Sheets",
  "PayPal",
  "Greenhouse",
  "Zapier",
];

export function IntegrationPillars() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(stage);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [tabStop, setTabStop] = useState(0);
  const inputs = useRef(new Map<string, { value: boolean | number }>());
  const active = useRef("");

  function clear() {
    for (const input of inputs.current.values()) input.value = false;
    active.current = "";
  }

  function lift(name: string) {
    if (active.current === name) return;
    clear();
    const hover = inputs.current.get(name + " hover");
    if (hover) hover.value = true;
    active.current = name;
  }

  function press(name: string, value: boolean) {
    const input = inputs.current.get(name + " pressed");
    if (input) input.value = value;
  }

  useEffect(() => {
    const target = canvas.current;
    if (!inView || reduced !== false || !target) return;
    let disposed = false;
    let instance: Rive | undefined;
    const observer = new ResizeObserver(() =>
      instance?.resizeDrawingSurfaceToCanvas(),
    );
    function visibility() {
      if (document.hidden) {
        clear();
        instance?.pause();
      } else instance?.play();
    }
    void import("@rive-app/webgl2")
      .then(({ Rive, RuntimeLoader }) => {
        if (disposed) return;
        RuntimeLoader.setWasmUrl("/brand/agents/rive-2.44.0.wasm");
        RuntimeLoader.setWasmFallbackUrl(
          "/brand/agents/rive-fallback-2.44.0.wasm",
        );
        instance = new Rive({
          src: "/brand/homepage/integration-pillars.riv",
          canvas: target,
          stateMachine: "Pillars",
          autoplay: true,
          shouldDisableRiveListeners: true,
          onLoad: () => {
            if (disposed || !instance) return;
            const controls = instance.stateMachineInputs("Pillars");
            if (!controls?.length) return;
            inputs.current = new Map(
              controls.map((input) => [input.name, input]),
            );
            instance.resizeDrawingSurfaceToCanvas();
            if (canvas.current) observer.observe(canvas.current);
            visibility();
            setReady(true);
          },
          onLoadError: () => {
            if (!disposed) setReady(false);
          },
        });
      })
      .catch(() => {
        if (!disposed) setReady(false);
      });
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", visibility);
      clear();
      inputs.current.clear();
      instance?.cleanup();
      setReady(false);
    };
  }, [inView, reduced]);

  return (
    <div
      ref={stage}
      data-home-reveal className={styles.pillars}
      role="group"
      aria-label="Integration pillars"
    >
      <Image
        src="/brand/homepage/integration-pillars.webp"
        width={720}
        height={365}
        alt={`Integrations: ${companies.join(", ")}`}
        hidden={ready}
      />
      <canvas
        ref={canvas}
        aria-hidden="true"
        style={{ opacity: ready ? 1 : 0 }}
      />
      {ready &&
        companies.map((name, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          return (
            <button
              key={name}
              type="button"
              aria-label={name}
              tabIndex={i === tabStop ? 0 : -1}
              className={styles.pillarTarget}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              style={{
                left: `${((297 + (col - row) * 63) / 720) * 100}%`,
                top: `${((76 + (col + row) * 28) / 365) * 100}%`,
              }}
              onPointerEnter={() => lift(name)}
              onPointerLeave={clear}
              onPointerDown={() => {
                lift(name);
                press(name, true);
              }}
              onPointerUp={(e) => {
                press(name, false);
                if (e.pointerType !== "mouse") clear();
              }}
              onPointerCancel={clear}
              onBlur={clear}
              onFocus={() => {
                setTabStop(i);
                lift(name);
              }}
              onKeyDown={(e) => {
                const offsets: Record<string, number> = {
                  ArrowRight: 1,
                  ArrowLeft: -1,
                  ArrowDown: 6,
                  ArrowUp: -6,
                };
                if (e.key in offsets) {
                  e.preventDefault();
                  buttons.current[
                    (i + offsets[e.key] + companies.length) % companies.length
                  ]?.focus();
                } else if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  press(name, true);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") press(name, false);
              }}
            />
          );
        })}
    </div>
  );
}
