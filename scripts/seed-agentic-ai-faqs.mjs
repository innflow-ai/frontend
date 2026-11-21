/** Import Figma FAQ copy as drafts. Dry-run by default; never overwrites existing content. */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(fileURLToPath(new URL("../", import.meta.url)));
const write = process.argv.includes("--write");
const source = JSON.parse(readFileSync(new URL("./data/agentic-ai-faqs.json", import.meta.url), "utf8"));
if (!process.env.SANITY_API_TOKEN) throw new Error("SANITY_API_TOKEN is required");
const client = createClient({ projectId: process.env.SANITY_PROJECT_ID || "hnjg8vum", dataset: process.env.SANITY_DATASET || "production", apiVersion: "2026-08-22", token: process.env.SANITY_API_TOKEN, useCdn: false, perspective: "raw" });
const existing = await client.fetch('*[_type in ["faq", "faqSet"]]{_id,_type,question,title}');
const canonical = (id) => id.replace(/^drafts\./, "");
const normalize = (text) => text?.trim().toLowerCase();
const setId = "faq-set-agentic-ai-solutions";
if (existing.some((d) => d._type === "faqSet" && (canonical(d._id) === setId || normalize(d.title) === normalize(source.title)))) {
  console.log("Agentic AI Solutions already exists; no documents changed.");
  process.exit(0);
}
const pending = [];
const references = source.faqs.map((item, index) => {
  const matches = existing.filter((d) => d._type === "faq" && normalize(d.question) === normalize(item.question));
  const ids = [...new Set(matches.map((d) => canonical(d._id)))];
  if (ids.length > 1) throw new Error(`Multiple existing FAQs match source question ${index + 1}; resolve before import.`);
  const id = ids[0] || `faq-agentic-ai-${item.sourceNodeId.replace(":", "-")}`;
  if (!ids.length) pending.push({ _id: `drafts.${id}`, _type: "faq", question: item.question, answer: item.answer, tags: ["agentic-ai-solutions"], sourceUrl: source.sourceUrl });
  const published = matches.some((d) => d._id === id);
  return { _key: `faq-${index + 1}`, _type: "reference", _ref: id, ...(!published ? { _weak: true, _strengthenOnPublish: { type: "faq" } } : {}) };
});
pending.push({ _id: `drafts.${setId}`, _type: "faqSet", title: source.title, sourceUrl: source.sourceUrl, faqs: references });
console.log(JSON.stringify({ mode: write ? "write-drafts" : "dry-run", projectId: client.config().projectId, dataset: client.config().dataset, existingFaqRecords: existing.filter((d) => d._type === "faq").length, createCount: pending.length, questionCount: references.length }));
if (write) {
  const transaction = client.transaction();
  for (const doc of pending) transaction.createIfNotExists(doc);
  await transaction.commit();
  const saved = await client.fetch('*[_id in $ids]{_id,_type,title,question}', { ids: pending.map((d) => d._id) });
  if (saved.length !== pending.length) throw new Error("Import verification count did not match");
  console.log(JSON.stringify({ verifiedDrafts: saved.length, setId: `drafts.${setId}`, published: false }));
}
