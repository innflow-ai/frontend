import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import nextEnv from '@next/env';
import { createClient } from '@sanity/client';

nextEnv.loadEnvConfig(process.cwd());
const write = process.argv.includes('--write');
const input = JSON.parse(readFileSync(new URL('./data/notion-integrations-import.json', import.meta.url), 'utf8'));
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'hnjg8vum',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2026-08-22',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: 'raw',
});
const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const normalize = value => value.trim().toLowerCase();
const hash = value => createHash('sha256').update(value).digest('hex').slice(0, 24);
const before = await client.fetch('*[_type in ["integration", "integrationCategory"]]{_id,_rev,_type,name,title,sourceId,"slug":slug.current}');
const categories = before.filter(doc => doc._type === 'integrationCategory');
const integrations = before.filter(doc => doc._type === 'integration');
const additions = [];
const matches = [];
const mapping = [];
for (const row of input.rows) {
  if (!row.name?.trim() || !row.source) throw new Error('Invalid source row');
  const slug = slugify(row.name);
  const sourceId = `notion:${row.source.split('/').at(-1)}`;
  const existing = integrations.filter(doc => doc.sourceId === sourceId || normalize(doc.name || '') === normalize(row.name) || doc.slug === slug);
  const published = existing.filter(doc => !doc._id.startsWith('drafts.'));
  if (published.length > 1) throw new Error(`Ambiguous existing integration: ${row.name}`);
  if (existing.length && !published.length) throw new Error(`Existing draft requires review: ${row.name}`);
  if (published.length) {
    matches.push(row.name);
    mapping.push({ name: row.name, id: published[0]._id, slug: published[0].slug });
    continue;
  }
  const title = row.categories[0] || 'Sales Tools';
  const categorySlug = slugify(title);
  let category = categories.find(doc => doc.slug === categorySlug && !doc._id.startsWith('drafts.'));
  if (!category) {
    if (categories.some(doc => doc.slug === categorySlug)) throw new Error(`Existing category draft: ${title}`);
    category = { _id: `integration-category.notion-${hash(categorySlug)}`, _type: 'integrationCategory', title, slug: { _type: 'slug', current: categorySlug } };
    additions.push(category);
    categories.push({ ...category, slug: categorySlug });
  }
  const doc = {
    _id: `integration.notion-${hash(normalize(row.name))}`,
    _type: 'integration', name: row.name, sourceId,
    slug: { _type: 'slug', current: slug },
    category: { _type: 'reference', _ref: category._id },
    shortDescription: `${row.name} is planned for Innflow workflows. Explore this connection on our roadmap.`,
    overview: `We plan to bring ${row.name} into Innflow workflows. Supported capabilities and setup requirements will be confirmed as this connection develops.`,
    status: 'planned',
    statusNote: 'On our integration roadmap. Availability and supported operations have not yet been verified.',
    listed: true,
  };
  if (doc.shortDescription.length > 240) throw new Error(`Description too long: ${row.name}`);
  additions.push(doc);
  integrations.push({ ...doc, slug });
  mapping.push({ name: row.name, id: doc._id, slug });
}
const report = {
  mode: write ? 'write' : 'dry-run', project: client.config().projectId, dataset: client.config().dataset,
  source: input.source, sourceRows: input.rows.reduce((sum, row) => sum + row.copies, 0), distinctNames: input.rows.length,
  matched: matches, newIntegrations: additions.filter(doc => doc._type === 'integration').length,
  newCategories: additions.filter(doc => doc._type === 'integrationCategory').map(doc => doc.title),
};
if (write && additions.length) {
  if (!process.env.SANITY_API_TOKEN) throw new Error('SANITY_API_TOKEN is required');
  let transaction = client.transaction();
  for (const doc of additions) transaction = transaction.createIfNotExists(doc);
  await transaction.commit();
}
if (write) {
  const after = await client.fetch('*[_type == "integration" && !(_id in path("drafts.**"))]{_id,_rev,name,listed,status,"slug":slug.current,"category":category->title}');
  const missing = mapping.filter(item => !after.some(doc => doc._id === item.id && doc.slug === item.slug && doc.listed && doc.category));
  const changedExisting = before.filter(doc => doc._type === 'integration' && !doc._id.startsWith('drafts.')).filter(doc => after.find(item => item._id === doc._id)?._rev !== doc._rev);
  if (missing.length || changedExisting.length) throw new Error(JSON.stringify({ missing, changedExisting }));
  report.verifiedTotal = after.length;
  report.verifiedMapped = mapping.length;
  report.existingRecordsUnchanged = true;
  writeFileSync(new URL('./data/notion-integrations-import-report.json', import.meta.url), `${JSON.stringify({ ...report, mapping }, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
