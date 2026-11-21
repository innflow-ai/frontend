import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: PauseIcon.js. */
export function Pause({
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
          "M8.5 4.5H5.5C4.94772 4.5 4.5 4.94772 4.5 5.5V18.5C4.5 19.0523 4.94772 19.5 5.5 19.5H8.5C9.05229 19.5 9.5 19.0523 9.5 18.5V5.5C9.5 4.94772 9.05229 4.5 8.5 4.5Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={
          "M18.5 4.5H15.5C14.9477 4.5 14.5 4.94772 14.5 5.5V18.5C14.5 19.0523 14.9477 19.5 15.5 19.5H18.5C19.0523 19.5 19.5 19.0523 19.5 18.5V5.5C19.5 4.94772 19.0523 4.5 18.5 4.5Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
