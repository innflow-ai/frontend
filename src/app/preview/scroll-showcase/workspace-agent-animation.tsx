"use client";

import { RuntimeLoader, useRive } from "@rive-app/react-webgl2";
import { useEffect, useState } from "react";
import styles from "./workspace-overview.module.css";

RuntimeLoader.setWasmUrl("/brand/agents/rive-2.44.0.wasm");
RuntimeLoader.setWasmFallbackUrl("/brand/agents/rive-fallback-2.44.0.wasm");

export default function WorkspaceAgentAnimation({
  src,
  eyeY,
  face,
  rim,
}: {
  src: string;
  eyeY: number;
  face: number;
  rim: number;
}) {
  const [ready, setReady] = useState(false);
  const { canvas, RiveComponent } = useRive({
    src,
    stateMachine: "Agent States",
    autoBind: true,
    autoplay: true,
    enableRiveAssetCDN: false,
    onRiveReady: (player) => {
      const faceColor = player.viewModelInstance?.color("faceColor");
      const rimColor = player.viewModelInstance?.color("rimColor");
      if (faceColor && rimColor) {
        faceColor.value = face;
        rimColor.value = rim;
        setReady(true);
      }
    },
    onLoadError: () => setReady(false),
  });

  useEffect(() => {
    if (!canvas || !ready) return;
    const card = canvas.closest("article");
    if (!card) return;
    const surface = canvas;
    let tracking = false;

    // The native rigs use an 800 × 680 artboard and sample gaze around
    // the character's eye line. Send only the inner third of their travel.
    function aim(bounds: DOMRect, dx: number, dy: number) {
      surface.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: bounds.left + (bounds.width * (400 + dx * 80)) / 800,
          clientY: bounds.top + (bounds.height * (eyeY + dy * 70)) / 680,
        }),
      );
    }

    function reset() {
      if (!tracking) return;
      tracking = false;
      aim(surface.getBoundingClientRect(), 0, 0);
    }

    function follow(event: PointerEvent) {
      if (event.pointerType === "touch") return reset();
      const bounds = surface.getBoundingClientRect();
      const dx = event.clientX - (bounds.left + bounds.width / 2);
      const dy = event.clientY - (bounds.top + (bounds.height * eyeY) / 680);
      const distance = Math.hypot(dx, dy);
      if (distance > 96) return reset();
      tracking = true;
      // Reach the travel limit at 48 CSS pixels; stop tracking beyond 96.
      const range = Math.max(48, distance);
      aim(bounds, dx / range, dy / range);
    }

    card.addEventListener("pointermove", follow, { passive: true });
    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointercancel", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { capture: true, passive: true });
    return () => {
      card.removeEventListener("pointermove", follow);
      card.removeEventListener("pointerleave", reset);
      card.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset, true);
    };
  }, [canvas, ready, eyeY]);

  return <RiveComponent className={styles.agentCanvas} data-ready={ready} />;
}
