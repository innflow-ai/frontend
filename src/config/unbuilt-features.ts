/**
 * One switch for sections and items the product does not ship yet.
 * They stay visible until this is set to false.
 */
export const showUnbuiltFeatures = true;

export function showFeatureItem(item: { unbuilt?: boolean }) {
  return showUnbuiltFeatures || item.unbuilt !== true;
}
