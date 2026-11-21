/* biome-ignore-all lint/performance/noImgElement: Supplied SVGs preserve their exact native canvas and mask geometry. */

import { Easing, interpolate } from "./timeline";
export const FocusAgent = ({ frame }: { frame: number }) => {
  if (frame <= 48 || frame >= 174) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 303,
        top: 230,
        width: 166,
        height: 166,
        transformOrigin: "50% 50%",
        translate: interpolate(
          frame,
          [48, 60, 75, 156, 174],
          [
            "2.72px -0.5px",
            "0.94px 1.94px",
            "0px 0px",
            "0px 0px",
            "2.72px -0.5px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          },
        ),
        scale: interpolate(
          frame,
          [48, 60, 75, 156, 174],
          [112 / 165, 189.8923 / 165, 1, 1, 112 / 165],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          },
        ),
      }}
    >
      <img alt="" src={"/brand/mcp-agent-orbit/d522a.svg"} />
    </div>
  );
};
