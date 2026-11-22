"use client";

import { RuntimeLoader, useRive } from "@rive-app/react-webgl2";
import { useState } from "react";

RuntimeLoader.setWasmUrl("/brand/agents/rive-2.44.0.wasm");
RuntimeLoader.setWasmFallbackUrl("/brand/agents/rive-fallback-2.44.0.wasm");

export default function FooterWorkspaceBackdrop() {
  const [ready, setReady] = useState(false);
  const { RiveComponent } = useRive({
    src: "/brand/footer-workspace.riv",
    artboard: "Backdrop",
    stateMachine: "Ambient",
    autoplay: true,
    shouldDisableRiveListeners: true,
    enableRiveAssetCDN: false,
    onRiveReady: () => setReady(true),
    onLoadError: () => setReady(false),
  });
  return <RiveComponent aria-hidden="true" data-ready={ready} style={{ position: "absolute", inset: 0, opacity: ready ? 1 : 0 }} />;
}
