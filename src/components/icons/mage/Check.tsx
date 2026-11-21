import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: CheckIcon.js. */
export function Check({
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
          "M4.5 11.7948L8.72144 16.0163C8.86993 16.1666 9.04677 16.286 9.24172 16.3674C9.43668 16.4488 9.64586 16.4908 9.85715 16.4908C10.0685 16.4908 10.2776 16.4488 10.4726 16.3674C10.6675 16.286 10.8443 16.1666 10.9929 16.0163L19.5 7.50916"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
