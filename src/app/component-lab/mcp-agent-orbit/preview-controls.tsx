"use client";
import { useState } from "react";
import { McpAgentOrbit } from "@/components/mcp-agent-orbit/mcp-agent-orbit";
export function PreviewControls() {
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  return (
    <section>
      <h2>Animation</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => {
            setPaused(false);
            setRun(run + 1);
          }}
        >
          Replay
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <McpAgentOrbit key={run} paused={paused} />
    </section>
  );
}
