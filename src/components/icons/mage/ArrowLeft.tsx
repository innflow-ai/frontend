import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: ArrowLeftIcon.js. */
export function ArrowLeft({
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
        d={"M4 12L20 12"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeMiterlimit={"10"}
        strokeLinecap={"round"}
      ></path>
      <path
        d={
          "M11.0325 4.33939L4.45961 10.9122C4.31606 11.0546 4.20206 11.224 4.12432 11.4108C4.04646 11.5975 4.00641 11.7977 4.00641 12C4.00641 12.2023 4.04646 12.4025 4.12432 12.5892C4.20206 12.776 4.31606 12.9454 4.45961 13.0877L11.0325 19.6606"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
