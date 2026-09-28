import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: EmailIcon.js. */
export function Email({
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
      <rect
        x={"2.68159"}
        y={"3.5"}
        width={"18.5"}
        height={"17"}
        rx={"4"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
      ></rect>
      <path
        d={
          "M2.72875 7.58978L9.93399 11.7198C10.5383 12.0709 11.2238 12.2557 11.9216 12.2557C12.6195 12.2557 13.305 12.0709 13.9093 11.7198L21.1344 7.58978"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
