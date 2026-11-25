"use client";

import { RuntimeLoader, useRive } from "@rive-app/react-webgl2";
import { type RefObject, useEffect, useState } from "react";
import styles from "./workspace-overview.module.css";

RuntimeLoader.setWasmUrl("/brand/agents/rive-2.44.0.wasm");
RuntimeLoader.setWasmFallbackUrl("/brand/agents/rive-fallback-2.44.0.wasm");

export default function WorkspaceAgentAnimation({
  pointer,
  src,
  eyeY,
  face,
  rim,
}: {
  pointer: RefObject<{ x: number; y: number } | null>;
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
    const panel = card;
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

    function follow() {
      const position = pointer.current;
      if (!position) return reset();
      const panelBounds = panel.getBoundingClientRect();
      if (
        position.x < panelBounds.left ||
        position.x >= panelBounds.right ||
        position.y < panelBounds.top ||
        position.y >= panelBounds.bottom
      ) {
        return reset();
      }

      const bounds = surface.getBoundingClientRect();
      const dx = position.x - (bounds.left + bounds.width / 2);
      const dy = position.y - (bounds.top + (bounds.height * eyeY) / 680);
      // Cap the eye travel while keeping its direction across the entire card.
      const range = Math.max(48, Math.hypot(dx, dy));
      tracking = true;
      aim(bounds, dx / range, dy / range);
    }

    follow();
    card.addEventListener("pointermove", follow, { passive: true });
    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointercancel", reset);
    card.addEventListener("transitionend", follow);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", follow, { capture: true, passive: true });
    return () => {
      card.removeEventListener("pointermove", follow);
      card.removeEventListener("pointerleave", reset);
      card.removeEventListener("pointercancel", reset);
      card.removeEventListener("transitionend", follow);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", follow, true);
    };
  }, [canvas, ready, eyeY, pointer]);

  return <RiveComponent className={styles.agentCanvas} data-ready={ready} />;
}
