import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: ChevronLeftIcon.js. */
export function ChevronLeft({
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
          "M15.5831 4L8.9964 10.5866C8.62508 10.9633 8.41693 11.471 8.41693 12C8.41693 12.529 8.62508 13.0367 8.9964 13.4134L15.5831 20"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
