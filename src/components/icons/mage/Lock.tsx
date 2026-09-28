import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: LockIcon.js. */
export function Lock({
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
          "M17 9.6875H7C5.61929 9.6875 4.5 10.7228 4.5 12V18.9375C4.5 20.2147 5.61929 21.25 7 21.25H17C18.3807 21.25 19.5 20.2147 19.5 18.9375V12C19.5 10.7228 18.3807 9.6875 17 9.6875Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={
          "M7.375 9.6875V7.375C7.375 6.14837 7.86228 4.97199 8.72963 4.10463C9.59699 3.23728 10.7734 2.75 12 2.75C13.2266 2.75 14.403 3.23728 15.2704 4.10463C16.1377 4.97199 16.625 6.14837 16.625 7.375V9.6875"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={"M8.53128 17.7812H15.4688"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
