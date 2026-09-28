import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: SunIcon.js. */
export function Sun({
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
      <g clipPath={"url(#clip0_1181_947)"}>
        <path
          d={
            "M12.0001 17.8854C15.2504 17.8854 17.8854 15.2504 17.8854 12.0001C17.8854 8.74969 15.2504 6.11475 12.0001 6.11475C8.74969 6.11475 6.11475 8.74969 6.11475 12.0001C6.11475 15.2504 8.74969 17.8854 12.0001 17.8854Z"
          }
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M2.7189 12.0059H1.5"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M22.5003 12.0059H21.293"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M12.0059 2.7189V1.5"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M12.0059 22.5V21.2927"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M5.43521 5.43521L4.57617 4.57617"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M19.4235 19.4237L18.5645 18.5647"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M18.5645 5.43521L19.4235 4.57617"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
        <path
          d={"M4.57617 19.4237L5.43521 18.5647"}
          stroke={"currentColor"}
          strokeWidth={"1.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
      </g>
      <defs>
        <clipPath id={"clip0_1181_947"}>
          <rect width={"24"} height={"24"} fill={"white"}></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
