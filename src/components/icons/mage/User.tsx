import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: UserIcon.js. */
export function User({
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
          "M19.6177 21.25C19.6177 17.6479 15.6021 14.7206 12 14.7206C8.39794 14.7206 4.38235 17.6479 4.38235 21.25"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={
          "M12 11.4559C14.404 11.4559 16.3529 9.50701 16.3529 7.10294C16.3529 4.69888 14.404 2.75 12 2.75C9.59594 2.75 7.64706 4.69888 7.64706 7.10294C7.64706 9.50701 9.59594 11.4559 12 11.4559Z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
