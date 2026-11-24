export const featureAccents = {
  bot: "#81E0FF",
  flow: "#FFD8B1",
  channels: "#BA9DFF",
  computer: "#5ADED7",
} as const;

export type FeatureIconName = keyof typeof featureAccents;

export function featureIconSrc(name: FeatureIconName) {
  return `/preview/scroll-showcase/feature-tabs/${name}.svg`;
}
