import type { ComponentType, SVGProps } from "react";
export type MageIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  mirrored?: boolean;
};
export type Icon = ComponentType<MageIconProps>;
