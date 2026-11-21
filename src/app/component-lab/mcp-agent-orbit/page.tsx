import type { Metadata } from "next";
import { McpAgentOrbit } from "@/components/mcp-agent-orbit/mcp-agent-orbit";
import { PreviewControls } from "./preview-controls";
export const metadata: Metadata = {
  title: "MCP agent storyboard preview | Innflow",
  robots: { index: false, follow: false },
};
export default function McpAgentOrbitPreview() {
  return (
    <main
      id="main-content"
      style={{
        padding: "120px 24px 64px",
        background: "#EFF7FD",
        color: "#0C1B2A",
      }}
    >
      <div style={{ maxWidth: 1152, marginInline: "auto" }}>
        <h1>MCP agent orbit</h1>
        <p>
          Proposed storyboard timing. Scroll the animation into view to play one
          pass.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
            gap: 32,
            marginTop: 32,
          }}
        >
          <PreviewControls />
          <section>
            <h2>Reduced motion</h2>
            <McpAgentOrbit reducedMotion />
          </section>
        </div>
      </div>
    </main>
  );
}
