/** Height of a fixed banner sitting on the bottom edge, so the card can stack above it. */
export function fixedBottomBannerHeight(view: Window = window) {
  let height = 0;
  const nodes = view.document.body?.querySelectorAll<HTMLElement>("*") ?? [];
  for (const element of nodes) {
    if (element.closest("[data-email-capture]")) continue;
    const style = view.getComputedStyle(element);
    const marked = element.hasAttribute("data-bottom-banner");
    if (!marked && style.position !== "fixed") continue;
    if (style.display === "none" || style.visibility === "hidden") continue;
    const rect = element.getBoundingClientRect();
    if (rect.height < 24 || rect.height > 180) continue;
    if (rect.width < view.innerWidth * 0.6) continue;
    if (view.innerHeight - rect.bottom > 8) continue;
    height = Math.max(height, rect.height);
  }
  return height;
}
