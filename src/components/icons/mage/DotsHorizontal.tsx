import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: DotsHorizontalIcon.js. */
export function DotsHorizontal({
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
          "M18.08 12C18.08 12.5302 18.5098 12.96 19.04 12.96C19.5702 12.96 20 12.5302 20 12C20 11.4698 19.5702 11.04 19.04 11.04C18.5098 11.04 18.08 11.4698 18.08 12Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={
          "M11.04 12C11.04 12.5302 11.4698 12.96 12 12.96C12.5302 12.96 12.96 12.5302 12.96 12C12.96 11.4698 12.5302 11.04 12 11.04C11.4698 11.04 11.04 11.4698 11.04 12Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={
          "M3.99998 12C3.99998 12.5302 4.42981 12.96 4.95998 12.96C5.49016 12.96 5.91998 12.5302 5.91998 12C5.91998 11.4698 5.49016 11.04 4.95998 11.04C4.42981 11.04 3.99998 11.4698 3.99998 12Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
