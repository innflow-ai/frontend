import fs from 'node:fs/promises';

const dir = new URL('.', import.meta.url);
const taxonomy = JSON.parse(await fs.readFile(new URL('taxonomy.json', dir), 'utf8'));
const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY;
if (!token) throw new Error('Missing Notion credential');
const headers = { Authorization: 'Bearer ' + token, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' };
async function request(path, method = 'GET', body) {
  for (let n = 0; n < 4; n++) {
    const r = await fetch('https://api.notion.com/v1' + path, { method, headers, ...(body ? { body: JSON.stringify(body) } : {}) });
    if (r.status === 429) {
      await new Promise(ok => setTimeout(ok, Math.min(Number(r.headers.get('retry-after') || 1) * 1000, 10000)));
      continue;
    }
    if (!r.ok) throw new Error(method + ' ' + path + ' HTTP ' + r.status + ' ' + await r.text());
    return r.json();
  }
  throw new Error('Rate limit persisted');
}
async function save(name, data) { await fs.writeFile(new URL(name, dir), JSON.stringify(data, null, 2) + '\n'); }

const path = '/data_sources/' + taxonomy.data_source_id;
const live = await request(path);
const originals = live.properties.Split.select.options;
const definitions = new Map(taxonomy.categories.map(c => [c.name, c]));
for (const c of taxonomy.categories) if (c.description.length > 280) throw new Error('Description too long: ' + c.name);
const options = originals.map(o => ({ id: o.id, ...(definitions.has(o.name) ? { description: definitions.get(o.name).description } : o.description ? { description: o.description } : {}) }));
for (const c of taxonomy.categories) if (!originals.some(o => o.name === c.name)) options.push({ name: c.name, color: c.color || 'default', description: c.description });
await request(path, 'PATCH', { properties: { [live.properties.Split.id]: {
  description: 'Primary editorial and visual category. Choose the main reader promise, not incidental keywords. Specific formats and technical subjects take precedence over audience context. Route images by saved option ID. Uncatagorized requires review.',
  select: { options }
} } });
const schema = await request(path);
for (const old of originals) if (!schema.properties.Split.select.options.some(x => x.id === old.id && x.name === old.name)) throw new Error('Existing option changed: ' + old.name);
for (const c of taxonomy.categories) {
  const option = schema.properties.Split.select.options.find(x => x.name === c.name);
  if (!option) throw new Error('Missing option ' + c.name);
  c.notion_option_id = option.id;
}
await save('schema-after.json', schema);
await save('taxonomy.json', taxonomy);
const log = [];
for (const c of taxonomy.queued_assignments) {
  const before = await request('/pages/' + c.id);
  if (before.properties.Status.status?.name !== 'Queued') throw new Error('Status changed for ' + c.title);
  const current = before.properties.Split.select?.name ?? null;
  if (current !== c.before && current !== c.after) throw new Error('Split edited concurrently for ' + c.title + ': ' + current);
  if (current !== c.after) await request('/pages/' + c.id, 'PATCH', { properties: { Split: { select: { id: taxonomy.categories.find(x => x.name === c.after).notion_option_id } } } });
  const after = await request('/pages/' + c.id);
  if (after.properties.Split.select?.name !== c.after) throw new Error('Verification failed ' + c.title);
  for (const [key, value] of Object.entries(before.properties)) {
    if (key === 'Split' || value.type === 'last_edited_time' || value.type === 'files') continue;
    if (JSON.stringify(value) !== JSON.stringify(after.properties[key])) throw new Error('Other property changed during update: ' + key + ' ' + c.title);
  }
  // File URLs may rotate. Compare stable names and types, not temporary signed URLs.
  for (const [key, value] of Object.entries(before.properties).filter(([, v]) => v.type === 'files')) {
    const identity = v => v.files.map(f => ({ name: f.name, type: f.type }));
    if (JSON.stringify(identity(value)) !== JSON.stringify(identity(after.properties[key]))) throw new Error('File attachments changed: ' + key);
  }
  log.push({ id: c.id, title: c.title, before: current, after: c.after, changed: current !== c.after, verified: true });
  await save('write-log.json', log);
}
const queued = await request(path + '/query', 'POST', { page_size: 100, filter: { property: 'Status', status: { equals: 'Queued' } } });
const verification = {
  verified_at: new Date().toISOString(), option_count: schema.properties.Split.select.options.length,
  added_options: taxonomy.categories.filter(x => x.new).map(x => x.name), preserved_existing_option_ids: originals.length,
  queued_count: queued.results.length, queued_has_more: queued.has_more,
  queued: queued.results.map(p => ({ id: p.id, title: p.properties.Title.title.map(x => x.plain_text).join(''), split: p.properties.Split.select?.name })), writes: log
};
if (verification.queued_has_more || verification.queued_count !== log.length || verification.queued.some(p => !log.some(x => x.id === p.id && x.after === p.split))) throw new Error('Queued set changed during verification');
await save('verification.json', verification);
console.log(JSON.stringify(verification, null, 2));
