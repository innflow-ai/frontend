import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: ChevronRightIcon.js. */
export function ChevronRight({
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
        d={
          "M8.41692 20L15.0036 13.4134C15.3749 13.0367 15.5831 12.529 15.5831 12C15.5831 11.471 15.3749 10.9633 15.0036 10.5866L8.41692 4"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
