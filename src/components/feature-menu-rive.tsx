"use client";

import { RuntimeLoader, useRive } from "@rive-app/react-webgl2";
import { useState } from "react";

RuntimeLoader.setWasmUrl("/brand/agents/rive-2.44.0.wasm");
RuntimeLoader.setWasmFallbackUrl("/brand/agents/rive-fallback-2.44.0.wasm");

export default function FeatureMenuRive({ src }: { src: string }) {
  const [ready, setReady] = useState(false);
  const { RiveComponent } = useRive({
    src,
    stateMachine: "Menu",
    autoplay: true,
    shouldDisableRiveListeners: true,
    enableRiveAssetCDN: false,
    onRiveReady: () => setReady(true),
    onLoadError: () => setReady(false),
  });
  return (
    <RiveComponent
      data-menu-rive={src}
      data-ready={ready}
      style={{ opacity: ready ? 1 : 0, pointerEvents: "none" }}
    />
  );
}
