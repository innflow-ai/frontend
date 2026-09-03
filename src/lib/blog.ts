import type { PortableTextBlock } from "@portabletext/react";
import { siteConfig } from "@/config/site";

export const BLOG_CATEGORIES = [
  { title: "Product & Platform", value: "product-platform" },
  { title: "Company Updates", value: "company-updates" },
  { title: "Automation with Innflow", value: "automation-with-innflow" },
  { title: "AI Agent", value: "ai-agent" },
  { title: "Automation", value: "automation" },
  { title: "Workflow", value: "workflow" },
  { title: "Integrations", value: "integrations" },
  { title: "Comparison", value: "comparison" },
  { title: "Case Study", value: "case-study" },
  { title: "AI", value: "ai" },
  { title: "Maintenance", value: "maintenance" },
  { title: "Property Management", value: "property-management" },
  { title: "Software", value: "software" },
  { title: "Thought Leadership", value: "thought-leadership" },
] as const;

export type BlogCtaBlock = {
  _type: "ctaButton";
  _key: string;
  label: string;
  href: string;
};

type PortableChild = {
  _type?: string;
  text?: string;
  marks?: string[];
};

export type LoosePortableBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: string;
  children?: PortableChild[];
  markDefs?: Array<{
    _key?: string;
    _type?: string;
    text?: string;
    href?: string;
  }>;
  alt?: string;
  presentation?: string;
  ctaTitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  label?: string;
  href?: string;
  [key: string]: unknown;
};

const AUTO_CTA_EVERY = 3;
const AUTO_CTA_MAX = 3;

export function isNormalParagraph(block: LoosePortableBlock | undefined) {
  return (
    block?._type === "block" &&
    (block.style === "normal" || !block.style) &&
    !block.listItem
  );
}

export function injectInArticleCtas(
  blocks: LoosePortableBlock[] | null | undefined,
  cta: { label: string; href: string } = {
    label: siteConfig.primaryCta,
    href: siteConfig.demoUrl,
  },
): LoosePortableBlock[] {
  if (!blocks?.length) return [];

  const output: LoosePortableBlock[] = [];
  let paragraphCount = 0;
  let autoCtas = 0;
  let featureNext = false;

  for (const block of blocks) {
    const nearbyIsCta =
      block._type === "ctaButton" || output.at(-1)?._type === "ctaButton";

    if (featureNext && isNormalParagraph(block)) {
      output.push({ ...block, style: "featured" });
      featureNext = false;
      continue;
    }

    if (isNormalParagraph(block)) {
      paragraphCount += 1;
      output.push(block);

      const shouldInsert =
        autoCtas < AUTO_CTA_MAX &&
        paragraphCount % AUTO_CTA_EVERY === 0 &&
        !nearbyIsCta;

      if (shouldInsert) {
        autoCtas += 1;
        output.push({
          _type: "ctaButton",
          _key: `auto-cta-${paragraphCount}`,
          label: cta.label,
          href: cta.href,
        });
        featureNext = true;
      }
      continue;
    }

    featureNext = false;
    output.push(block);
  }

  return output;
}

export function portableTextToPlain(
  blocks: LoosePortableBlock[] | PortableTextBlock[] | null | undefined,
): string {
  if (!blocks?.length) return "";

  const parts: string[] = [];
  for (const block of blocks as LoosePortableBlock[]) {
    if (block._type === "block" && Array.isArray(block.children)) {
      const text = block.children
        .map((child) => child.text ?? "")
        .join("")
        .trim();
      if (text) parts.push(text);
    }
  }
  return parts.join("\n\n");
}

export type BlogFootnote = {
  id: string;
  number: number;
  text: string;
};

export function collectFootnotes(
  blocks: LoosePortableBlock[] | null | undefined,
): BlogFootnote[] {
  if (!blocks?.length) return [];

  const footnotes: BlogFootnote[] = [];
  const seen = new Set<string>();

  for (const block of blocks) {
    for (const def of block.markDefs ?? []) {
      if (def._type !== "footnote" || !def._key || seen.has(def._key)) continue;
      const text = def.text?.trim();
      if (!text) continue;
      seen.add(def._key);
      footnotes.push({
        id: def._key,
        number: footnotes.length + 1,
        text,
      });
    }
  }

  return footnotes;
}

export function isReferencesHeading(text: string | undefined) {
  if (!text) return false;
  return /^(references|footnotes|sources|endnotes)\b/i.test(text.trim());
}

export function blockPlainText(block: LoosePortableBlock | undefined) {
  if (!block?.children) return "";
  return block.children.map((child) => child.text ?? "").join("");
}

export function matchesBlogQuery(
  haystack: Array<string | null | undefined>,
  query: string,
) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return haystack.some((value) => value?.toLowerCase().includes(needle));
}

export function industriesForPost(industries: string[] | null | undefined) {
  if (industries && industries.length > 0) return industries;
  return ["General"];
}
