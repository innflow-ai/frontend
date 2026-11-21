import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { productArtworkScenes } from "@/content/product-artwork-scenes";
import { artworkAssets, artworkPages } from "./inventory";
import { ProductArtwork } from "./product-artwork";

describe("inventory artwork coverage", () => {
  it("authors every create/rework brief and preserves reuse assets", () => {
    expect(Object.keys(productArtworkScenes).sort()).toEqual(
      Object.values(artworkAssets)
        .filter((asset) => asset.action !== "Reuse")
        .map((asset) => asset.id)
        .sort(),
    );
    expect(Object.keys(artworkPages)).toHaveLength(16);
    const placements = Object.values(artworkPages).flatMap((page) =>
      [
        page.hero,
        page.overview,
        page.capability,
        ...page.cards,
        ...Object.values(page.details),
        ...Object.values(page.related),
      ].filter(Boolean),
    );
    expect(placements).toHaveLength(299);
    expect(new Set(placements.map((placement) => placement?.id)).size).toBe(
      299,
    );
  });
  it.each(Object.keys(productArtworkScenes))(
    "renders %s with an accessible description and no pretend interactive controls",
    (assetId) => {
      const root = document.createElement("div");
      root.innerHTML = renderToStaticMarkup(
        <ProductArtwork assetId={assetId} />,
      );
      const illustration = root.querySelector('[role="img"]');
      expect(illustration?.getAttribute("aria-label")).toContain(
        artworkAssets[assetId].brief,
      );
      expect(root.querySelector("button,input,select,a,[tabindex]")).toBeNull();
      const labels = productArtworkScenes[assetId].items.map(
        (item) => `${item.label}:${item.value}`,
      );
      expect(new Set(labels).size).toBe(labels.length);
    },
  );
});
