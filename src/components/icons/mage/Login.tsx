import type { MageIconProps } from "./types";
/** Mage Icons stroke, Apache-2.0. Source: LoginIcon.js. */
export function Login({
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
          "M10.9728 2.75524H16.1088C17.4008 2.69559 18.6641 3.14724 19.6254 4.01241C20.5867 4.87757 21.1685 6.08659 21.2448 7.37762V16.6224C21.1685 17.9134 20.5867 19.1224 19.6254 19.9876C18.6641 20.8527 17.4008 21.3045 16.1088 21.2448H10.9728"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
      <path
        d={"M16.1088 12H2.75522"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeMiterlimit={"10"}
        strokeLinecap={"round"}
      ></path>
      <path
        d={
          "M11.3965 17.136L15.8006 12.7319C15.9935 12.5371 16.1017 12.2741 16.1017 12C16.1017 11.7259 15.9935 11.4629 15.8006 11.2681L11.3965 6.86401"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}
