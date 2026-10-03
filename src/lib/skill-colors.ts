// Presentation-only helpers stay independent of server-side CMS queries.
const skillColorMap: Record<string, string> = {
  "Sky Blue": "#38bdf8",
  "Soft Indigo": "#818cf8",
  "Violet Blue": "#6d5bff",
  Magenta: "#d946ef",
  "Hot Pink": "#ec4899",
  "Coral Orange": "#fb7a55",
  "Gold Amber": "#f5b53f",
  "Fresh Green": "#34c47c",
  Teal: "#2bb5a0",
};

export const skillColorFallback = "#00aeff";

export function skillColorValue(
  color: string | null | undefined,
  cardColor?: string | null,
): string {
  return (
    skillColorMap[color ?? ""] ??
    skillColorMap[cardColor ?? ""] ??
    skillColorFallback
  );
}
