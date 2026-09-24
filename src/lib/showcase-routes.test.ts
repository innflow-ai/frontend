import { expect, it } from "vitest";
import { isShowcaseHome, usesShowcaseDesign } from "./showcase-routes";

it("treats Vercel's regenerated root pathname and the public root as the same showcase", () => {
  for (const path of ["/", "/index", "/preview/scroll-showcase"]) {
    expect(isShowcaseHome(path)).toBe(true);
    expect(usesShowcaseDesign(path)).toBe(true);
  }
  for (const path of ["/solutions", "/industries/healthcare"]) {
    expect(isShowcaseHome(path)).toBe(false);
    expect(usesShowcaseDesign(path)).toBe(true);
  }
  expect(usesShowcaseDesign("/rent-collection")).toBe(false);
  expect(usesShowcaseDesign("/index-not-a-page")).toBe(false);
});
