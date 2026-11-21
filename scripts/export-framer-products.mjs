/* global framer */

const productItemIds = [
  "o6EMP4Cen",
  "j56uT0KvQ",
  "Ucti7JzzJ",
  "v5hynOLSM",
  "AxGZz3WDk",
];

const nodes = await framer.agent.getNodes({ ids: productItemIds });

function attribute(node, key) {
  return node.attributes?.[`$control__${key}`];
}

function normalizeRichText(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((block) => ({
      tag: block.attributes?.tag ?? "p",
      text: (block.children ?? [])
        .map((child) =>
          child.attributes?.text ??
          (child.type === "TextLineBreak" ? "\n" : ""),
        )
        .join(""),
    }))
    .filter((block) => block.text.trim());
}

function normalizeImage(value) {
  if (typeof value === "string") return { src: value, alt: "" };
  if (!value?.src) return null;
  return { src: value.src, alt: value.alt ?? "" };
}

function normalizeCard(node, key, slot, bodyKey = "text") {
  const title = attribute(node, `${key}_title`) ?? "";
  if (!title) return null;

  return {
    slot,
    title,
    body: attribute(node, `${key}_${bodyKey}`) ?? "",
    image: normalizeImage(attribute(node, `${key}_image`)),
  };
}

const products = nodes.map((node) => {
  const spiral = [
    normalizeCard(node, "spiral_top_wide", "top-wide"),
    normalizeCard(node, "spiral_top_tall", "top-tall"),
    normalizeCard(node, "spiral_bottom_tall", "bottom-tall"),
    normalizeCard(node, "spiral_middle", "middle"),
    normalizeCard(node, "spiral_bottom_wide", "bottom-wide"),
  ].filter(Boolean);

  const mosaic = [
    normalizeCard(node, "mosaic3_top", "top", "body"),
    normalizeCard(node, "mosaic3_bottom_right", "bottom-right", "body"),
    normalizeCard(node, "mosaic3_bottom_left", "bottom-left", "body"),
  ].filter(Boolean);

  const details = Array.from({ length: 8 }, (_, index) => index + 1)
    .map((index) => ({
      toc: attribute(node, `toc_${index}`) ?? "",
      content: normalizeRichText(attribute(node, `content_${index}`)),
      points: [1, 2, 3]
        .map(
          (pointIndex) =>
            attribute(node, `content_${index}_point_${pointIndex}`) ?? "",
        )
        .filter(Boolean),
      image: normalizeImage(attribute(node, `content_${index}_image`)),
      visible:
        attribute(node, `show_content_block_${index}`) !== "false",
    }))
    .filter((section) => section.visible && section.content.length);

  return {
    _id: `productPage-${attribute(node, "slug")}`,
    _type: "productPage",
    title: attribute(node, "hero_title_unused") || attribute(node, "hero_title"),
    slug: attribute(node, "slug"),
    category: attribute(node, "category"),
    seo: {
      metaTitle: `${attribute(node, "hero_title")} | Innflow AI Agent Platform`,
      metaDescription: attribute(node, "paragraph"),
      socialImage: normalizeImage(attribute(node, "hero_image")),
    },
    hero: {
      title: attribute(node, "hero_title"),
      body: attribute(node, "paragraph"),
      primaryCtaLabel: attribute(node, "primary_cta"),
      secondaryCtaLabel: attribute(node, "secondary_cta"),
      image: normalizeImage(attribute(node, "hero_image")),
    },
    intro: normalizeRichText(attribute(node, "section_1")).concat(
      normalizeRichText(attribute(node, "section_2")),
    ),
    spiral,
    mosaic,
    details,
  };
});

console.log(JSON.stringify(products));
