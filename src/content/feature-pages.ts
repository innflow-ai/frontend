import pages from "./feature-pages.json";

export type FeaturePageContent = (typeof pages)[number];
export type FeatureArtwork = FeaturePageContent["heroArtwork"][number];
export const featurePageDesigns = pages;
export function getFeaturePageDesign(key: string) {
  const page = pages.find((page) => page.key === key);
  if (!page) throw new Error(`Unknown feature design: ${key}`);
  return page;
}
