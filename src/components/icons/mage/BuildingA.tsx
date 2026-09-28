import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: BuildingAIcon.js. */
export function BuildingA({
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
          "M8.53125 3.21249H15.4688C16.2047 3.21249 16.9106 3.50486 17.431 4.02527C17.9514 4.54569 18.2438 5.25152 18.2438 5.98749V20.7875H5.75625V5.98749C5.75625 5.25152 6.04862 4.54569 6.56903 4.02527C7.08944 3.50486 7.79527 3.21249 8.53125 3.21249Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={"M2.75 20.7875H21.25"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={
          "M11.075 14.3125H12.925C13.293 14.3125 13.6459 14.4587 13.9061 14.7189C14.1663 14.9791 14.3125 15.332 14.3125 15.7V20.7875H9.6875V15.7C9.6875 15.332 9.83368 14.9791 10.0939 14.7189C10.3541 14.4587 10.707 14.3125 11.075 14.3125Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={"M9.225 6.91251H14.775"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={"M9.225 10.6125H14.775"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
