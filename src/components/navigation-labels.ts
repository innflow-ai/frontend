export const navigationLabels = [
  "Product",
  "Models",
  "Solutions",
  "Resources",
] as const;
export type NavigationLabel = (typeof navigationLabels)[number];
