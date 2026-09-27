import { describe, expect, it } from "vitest";
import { allProductColumns } from "@/components/mega-menu";
import {
  calendlyStyles,
  getProductDesign,
  productDesignRoutes,
} from "./product-design-rotation";

describe("Product navigation design rotation", () => {
  it("covers every Product directory destination in its displayed order", () => {
    const links = allProductColumns.flatMap((column) => column.links);
    expect(productDesignRoutes.map((route) => route.path)).toEqual(
      links.map((link) => link.href),
    );
    expect(new Set(productDesignRoutes.map((route) => route.path)).size).toBe(
      links.length,
    );
    for (const [index, link] of links.entries()) {
      expect(getProductDesign(link.href)).toBe(calendlyStyles[index % 5]);
    }
  });
  it("leaves unrelated pages outside the redesign", () => {
    for (const path of [
      "/",
      "/rent-collection",
      "/blog",
      "/products/platform",
      "/platform/integrations",
      null,
    ]) {
      expect(getProductDesign(path)).toBeUndefined();
    }
  });
});
