/** Seed only missing integration records. Defaults to dry-run; --write creates published CMS records. */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import sharp from 'sharp';
import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;
const root = fileURLToPath(new URL('../', import.meta.url));
loadEnvConfig(root);
const write = process.argv.includes('--write');
if (!process.env.SANITY_API_TOKEN) throw new Error('SANITY_API_TOKEN is required');
const client = createClient({ projectId: process.env.SANITY_PROJECT_ID || 'hnjg8vum', dataset: process.env.SANITY_DATASET || 'production', apiVersion: '2026-08-22', token: process.env.SANITY_API_TOKEN, useCdn: false, perspective: 'raw' });
const rows = [
  ['Gmail', 'gmail', 'Communication', 'gmail.svg', 'https://workspace.google.com/products/gmail/', 'Email conversations and follow-ups for your property team.', 'Email follow-up', 'Explore turning incoming property emails into tracked follow-ups, with review before sending replies.'],
  ['Outlook', 'outlook', 'Communication', 'outlook.svg', 'https://www.microsoft.com/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook', 'Email and calendar context for day-to-day property operations.', 'Coordinate follow-ups', 'Explore connecting email context to the next action for your team, with account access and permissions defined first.'],
  ['Slack', 'slack', 'Communication', 'slack.svg', 'https://slack.com/', 'Team conversations and operational updates in one place.', 'Route team updates', 'Explore delivering property updates to the right channel so your team can review and act on exceptions.'],
  ['Microsoft Teams', 'microsoft-teams', 'Communication', 'teams.svg', 'https://www.microsoft.com/microsoft-teams/group-chat-software', 'Team messaging for property updates and handoffs.', 'Keep handoffs visible', 'Explore routing operational updates into team conversations, with clear ownership for the next action.'],
  ['Notion', 'notion', 'Knowledge & documents', 'notion.svg', 'https://www.notion.com/', 'Shared operating knowledge, notes, and team documentation.', 'Bring context to work', 'Explore making approved operating notes available to property workflows while preserving workspace access boundaries.'],
  ['Google Sheets', 'google-sheets', 'Data & reporting', 'google-sheets.svg', 'https://workspace.google.com/products/sheets/', 'Spreadsheet data for operational tracking and reporting.', 'Reduce manual updates', 'Explore moving selected property workflow data into reporting sheets, with the fields and update rules agreed first.'],
  ['Google Drive', 'google-drive', 'Knowledge & documents', 'google-drive.svg', 'https://workspace.google.com/products/drive/', 'Shared files and documents for your property workflows.', 'Find supporting files', 'Explore connecting approved documents to the property work they support, within your existing access permissions.'],
  ['SharePoint', 'sharepoint', 'Knowledge & documents', 'sharepoint.svg', 'https://www.microsoft.com/microsoft-365/sharepoint/collaboration', 'Shared document libraries and operational knowledge.', 'Connect team documents', 'Explore bringing approved document context into property workflows while keeping library access rules in place.'],
  ['Zoho Projects', 'zoho-projects', 'Project management', 'https://framerusercontent.com/images/d8Gk3lSIO4gX3XOtXl68u2GsV4.png', 'https://www.zoho.com/projects/', 'Project tasks and milestones for work across your properties.', 'Coordinate project handoffs', 'Explore connecting property work with project tasks, milestones, and responsible team members.'],
];
const slugify = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const existing = await client.fetch('*[_type in ["integration", "integrationCategory"]]{_id,_type,sourceId,"slug":slug.current,title}');
let created = 0;
for (const [name, slug, category, asset, websiteUrl, shortDescription, title, description] of rows) {
  const sourceId = `innflow-integration:${slug}`;
  if (existing.some(d => d._type === 'integration' && (d.sourceId === sourceId || d.slug === slug))) { console.log(`Exists: ${name}`); continue; }
  if (!write) { console.log(`Would create: ${name} (Planned)`); continue; }
  const categorySlug = slugify(category);
  let categoryDoc = existing.find(d => d._type === 'integrationCategory' && d.slug === categorySlug && !d._id.startsWith('drafts.'));
  if (!categoryDoc) {
    if (existing.some(d => d._type === 'integrationCategory' && d.slug === categorySlug)) throw new Error(`Publish existing category draft first: ${category}`);
    categoryDoc = await client.create({ _type: 'integrationCategory', title: category, slug: { _type: 'slug', current: categorySlug } });
    existing.push({ ...categoryDoc, slug: categorySlug });
  }
  let buffer;
  if (asset.startsWith('https:')) { const response = await fetch(asset); if (!response.ok) throw new Error(`Logo HTTP ${response.status}`); buffer = Buffer.from(await response.arrayBuffer()); }
  else buffer = readFileSync(`${root}public/integrations/${asset}`);
  // Sanity SVG sanitization corrupts this legacy Illustrator DOCTYPE; upload a PNG instead.
  if (asset === 'sharepoint.svg') buffer = await sharp(buffer).resize(256, 256, { fit: 'inside' }).png().toBuffer();
  const filename = asset === 'sharepoint.svg' ? 'sharepoint.png' : asset.startsWith('https:') ? 'zoho-projects.png' : asset;
  const uploaded = await client.assets.upload('image', buffer, { filename });
  const doc = await client.create({ _type: 'integration', sourceId, name, slug: { _type: 'slug', current: slug }, logo: { _type: 'image', alt: `${name} logo`, asset: { _type: 'reference', _ref: uploaded._id } }, category: { _type: 'reference', _ref: categoryDoc._id }, shortDescription, overview: `We’re planning a connection between ${name} and Innflow for property teams. ${description} The final scope and supported operations will be confirmed as this integration develops.`, status: 'planned', listed: true, websiteUrl, useCases: [{ _key: 'initial-use-case', _type: 'object', title, description }] });
  existing.push({ ...doc, slug }); created++;
  console.log(`Created: ${name} (Planned)`);
}
console.log(JSON.stringify({ mode: write ? 'write' : 'dry-run', created, target: `${client.config().projectId}/${client.config().dataset}` }));
