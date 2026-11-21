import inventory from "@/content/product-artwork-inventory.json";

export type ArtworkPlacement = { id: string; assetId: string };
export type ArtworkPage = {
  name: string;
  style: string;
  hero: ArtworkPlacement;
  overview: ArtworkPlacement | null;
  capability: ArtworkPlacement | null;
  cards: ArtworkPlacement[];
  details: Record<string, ArtworkPlacement>;
  related: Record<string, ArtworkPlacement>;
};
export type ArtworkAsset = {
  id: string;
  name: string;
  brief: string;
  action: string;
};

export const artworkPages: Record<string, ArtworkPage> = inventory.pages;
export const artworkAssets: Record<string, ArtworkAsset> = inventory.assets;

export function placementAttributes(placement?: ArtworkPlacement | null) {
  return placement
    ? {
        "data-artwork-placement": placement.id,
        "data-artwork-asset": placement.assetId,
      }
    : {};
}
