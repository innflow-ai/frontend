#!/usr/bin/env node

import { createReadStream, existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { basename, resolve } from "node:path";
import { createClient } from "next-sanity";

const args = new Set(process.argv.slice(2));
const write = args.has("--write");
const contentPath = resolve("scripts/data/product-pages-framer.json");
const assetMapPath = resolve("scripts/data/product-asset-map.json");
const uploadCachePath = resolve("scripts/data/product-sanity-asset-map.json");
const assetRoot = resolve(
  process.env.PRODUCT_ASSET_ROOT ||
    "/Users/ak/Library/CloudStorage/Dropbox/beam_ai_assets",
);
const expectedSlugs = ["platform", "agent-os", "ai-agents", "agentic-workflows", "databases"];

const products = JSON.parse(readFileSync(contentPath, "utf8"));
const assetGroups = JSON.parse(readFileSync(assetMapPath, "utf8"));
const assetEntries = Object.values(assetGroups).flat();
const assetBySource = new Map(assetEntries.map((entry) => [entry.src, entry]));
const unresolved = assetEntries.filter((entry) => !entry.localPath);

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cta(label, destination) {
  return { _type: "productCta", label: label || "Start today", destination };
}

function imageDescriptor(image, title) {
  if (!image?.src) throw new Error(`Missing image for ${title}`);
  const mapped = assetBySource.get(image.src);
  return {
    source: image.src,
    localPath: mapped?.localPath ? resolve(assetRoot, mapped.localPath) : null,
    alt: image.alt || title,
  };
}

function productSections(product) {
  const sections = [];
  const introEyebrow = product.intro.find((block) => block.tag === "p")?.text;
  const introHeading = product.intro.find((block) => block.tag === "h2")?.text;
  const introBody = product.intro.findLast((block) => block.tag === "p")?.text;

  if (introHeading && introBody) {
    sections.push({
      _key: `${product.slug}-intro`,
      _type: "productIntroSection",
      eyebrow: introEyebrow,
      heading: introHeading,
      body: introBody,
    });
  }

  for (const [key, presentation, cards] of [
    ["primary-capabilities", "five-feature", product.spiral],
    ["supporting-capabilities", "supporting-grid", product.mosaic],
  ]) {
    if (!cards.length) continue;
    sections.push({
      _key: `${product.slug}-${key}`,
      _type: "productCapabilitiesSection",
      presentation,
      cards: cards.map((card) => ({
        _key: `${product.slug}-${key}-${card.slot}`,
        _type: "productFeatureCard",
        title: card.title,
        body: card.body,
        image: imageDescriptor(card.image, card.title),
      })),
    });
  }

  product.details.forEach((detail, index) => {
    const title = detail.content.find((block) => block.tag === "h3")?.text;
    const body = detail.content.find((block) => block.tag === "p")?.text;
    if (!title || !body) return;
    sections.push({
      _key: `${product.slug}-detail-${index + 1}`,
      _type: "productDetailSection",
      anchor: { _type: "slug", current: slugify(detail.toc || title) },
      tocLabel: detail.toc || title,
      title,
      body,
      points: detail.points,
      image: imageDescriptor(detail.image, title),
      theme: index % 2 === 1 ? "dark" : "light",
      mediaPosition: index % 2 === 1 ? "left" : "right",
    });
  });

  sections.push({
    _key: `${product.slug}-final-cta`,
    _type: "productFinalCtaSection",
    eyebrow: product.category,
    heading: product.hero.title,
    body: product.hero.body,
    primaryCta: cta(product.hero.primaryCtaLabel, "demo"),
  });

  return sections;
}

function normalizedProduct(product) {
  return {
    _type: "productPage",
    title: product.title,
    slug: { _type: "slug", current: product.slug },
    category: product.category,
    seo: {
      _type: "productSeo",
      title: product.seo.metaTitle,
      description: product.seo.metaDescription,
      image: imageDescriptor(product.seo.socialImage || product.hero.image, product.title),
      noIndex: false,
    },
    hero: {
      title: product.hero.title,
      body: product.hero.body,
      image: imageDescriptor(product.hero.image, product.hero.title),
      primaryCta: cta(product.hero.primaryCtaLabel, "demo"),
      ...(product.hero.secondaryCtaLabel
        ? { secondaryCta: cta(product.hero.secondaryCtaLabel, "contact") }
        : {}),
    },
    sections: productSections(product),
  };
}

const actualSlugs = products.map((product) => product.slug).sort();
if (JSON.stringify(actualSlugs) !== JSON.stringify([...expectedSlugs].sort())) {
  throw new Error(`Expected exactly five product slugs; received ${actualSlugs.join(", ")}`);
}

if (unresolved.length) {
  console.error(`Asset gate failed: ${unresolved.length} image references remain unresolved.`);
  for (const entry of unresolved) {
    console.error(`- ${entry.role}: ${entry.src} (closest score ${entry.score})`);
  }
  if (write) process.exit(1);
}

const normalized = products.map(normalizedProduct);

if (!write) {
  console.log(
    JSON.stringify(
      {
        mode: "dry-run",
        documents: normalized.map((document) => ({
          slug: document.slug.current,
          title: document.title,
          sectionCount: document.sections.length,
          detailCount: document.sections.filter((section) => section._type === "productDetailSection").length,
        })),
        assets: {
          total: assetEntries.length,
          resolved: assetEntries.length - unresolved.length,
          unresolved: unresolved.length,
        },
        nextStep: unresolved.length
          ? "Review the unresolved asset matches, then rerun the resolver with confirmed mappings."
          : "Run with --write and SANITY_API_TOKEN to create or update drafts.",
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const token = process.env.SANITY_API_TOKEN;
if (!token) throw new Error("SANITY_API_TOKEN is required for --write");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "hnjg8vum",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2026-08-22",
  token,
  useCdn: false,
  perspective: "raw",
});

const uploadCache = existsSync(uploadCachePath)
  ? JSON.parse(readFileSync(uploadCachePath, "utf8"))
  : {};

async function sanityImage(descriptor) {
  let assetId = uploadCache[descriptor.localPath];
  if (!assetId) {
    const asset = await client.assets.upload("image", createReadStream(descriptor.localPath), {
      filename: basename(descriptor.localPath),
    });
    assetId = asset._id;
    uploadCache[descriptor.localPath] = assetId;
    writeFileSync(uploadCachePath, `${JSON.stringify(uploadCache, null, 2)}\n`);
  }
  return {
    _type: "productImage",
    asset: { _type: "reference", _ref: assetId },
    alt: descriptor.alt,
  };
}

async function materializeImages(value) {
  if (Array.isArray(value)) return Promise.all(value.map(materializeImages));
  if (!value || typeof value !== "object") return value;
  if (value.localPath && value.source) return sanityImage(value);
  return Object.fromEntries(
    await Promise.all(Object.entries(value).map(async ([key, child]) => [key, await materializeImages(child)])),
  );
}

for (const document of normalized) {
  const slug = document.slug.current;
  const existing = await client.fetch(
    `*[_type == "productPage" && slug.current == $slug][0]._id`,
    { slug },
  );
  const draftId = existing
    ? existing.startsWith("drafts.")
      ? existing
      : `drafts.${existing}`
    : `drafts.${randomUUID()}`;
  const materialized = await materializeImages(document);
  await client.createOrReplace({ ...materialized, _id: draftId });
  console.log(`Draft upserted: ${slug} (${draftId})`);
}

console.log("Draft import complete. No documents were published.");
