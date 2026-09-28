import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: ArrowUpIcon.js. */
export function ArrowUp({
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
        d={"M12 4L12 20"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeMiterlimit={"10"}
        strokeLinecap={"round"}
      ></path>
      <path
        d={
          "M19.6606 11.0325L13.0877 4.45962C12.9454 4.31608 12.776 4.20207 12.5892 4.12433C12.4025 4.04647 12.2023 4.00642 12 4.00642C11.7977 4.00642 11.5975 4.04647 11.4108 4.12433C11.224 4.20207 11.0546 4.31608 10.9122 4.45962L4.3394 11.0325"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
