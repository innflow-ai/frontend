import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: LayoutLeftIcon.js. */
export function LayoutLeft({
  size = 24,
  weight: _weight,
  mirrored = false,
  style,
  ...props
}: MageIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{
        display: "inline-block",
        verticalAlign: "-0.125em",
        flexShrink: 0,
        ...(mirrored ? { transform: "scaleX(-1)" } : {}),
        ...style,
      }}
      {...props}
    >
      <path
        d={"M8.9165 21.25L8.91651 2.75"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <rect
        x={"2.75"}
        y={"2.75"}
        width={"18.5"}
        height={"18.5"}
        rx={"6"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
      ></rect>
    </svg>
  );
}
