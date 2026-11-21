// Display-only formatting, safe to import from interactive blog components.
export function humanizeCategory(category: string | null | undefined): string {
  if (!category) return "Blog";
  return category
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ai") return "AI";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
