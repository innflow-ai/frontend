import { ImageResponse } from "next/og";

export const alt = "Innflow — connected operational workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fafaf7",
        color: "#171817",
        padding: "70px 76px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "#5aaaf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19,
          }}
        >
          in
        </div>
        innflow
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          maxWidth: 980,
        }}
      >
        <div
          style={{
            color: "#1760a8",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Property-management operations
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 650,
            lineHeight: 1.02,
            letterSpacing: -4,
          }}
        >
          Run property operations from one connected workspace.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 21,
          color: "#555954",
        }}
      >
        <span>
          Connected context · governed workflows · visible human control
        </span>
        <span>innflow.ai</span>
      </div>
    </div>,
    size,
  );
}
