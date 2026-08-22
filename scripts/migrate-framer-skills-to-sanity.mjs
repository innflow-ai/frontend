#!/usr/bin/env node
/**
 * Migrate the Framer "Agent Skills Library" + "Skill Categories" collections
 * into Sanity.
 *
 * Input:  ../migration-data/framer-skills-items.json (319 skills)
 *         ../migration-data/framer-skill-categories.json (9 categories)
 * Target: Sanity project hnjg8vum, dataset production.
 *
 * Re-runnable: deterministic IDs (skillCategory-<slug>, skill-<slug>) with
 * createOrReplace. Token read from ../.env.local at runtime, never printed.
 */

import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// --- config ---------------------------------------------------------------

const env = readFileSync(join(ROOT, '.env.local'), 'utf8')
const tokenMatch = env.match(/^SANITY_API_TOKEN=(.+)$/m)
if (!tokenMatch) throw new Error('SANITY_API_TOKEN not found in .env.local')
const token = tokenMatch[1].trim()

const client = createClient({
  projectId: 'hnjg8vum',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
  perspective: 'raw',
})

const F = {
  name: 'KOdoq0BSJ',
  category: 's92CWfaiY',
  icon: 'ar9QwgtW2',
  short: 'ameTVp9pd',
  builtBy: 'iJTzDkEkV',
  long: 'OnGfRWzym',
  color: 'CwF3wVYn1',
  cardColor: 'GjkVOlIeP',
}
const CAT_TITLE = 'hyE6JHms_'

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// --- portable text schema (mirrors skillType longDescription block config) --

const compiled = Schema.compile({
  name: 'migration',
  types: [
    {
      name: 'skill',
      type: 'document',
      fields: [
        {
          name: 'longDescription',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'Quote', value: 'blockquote'},
              ],
              lists: [
                {title: 'Bullet', value: 'bullet'},
                {title: 'Numbered', value: 'number'},
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                  {title: 'Code', value: 'code'},
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [{name: 'href', type: 'url', title: 'URL'}],
                  },
                ],
              },
            },
            {
              type: 'image',
              options: {hotspot: true},
              fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
            },
          ],
        },
      ],
    },
  ],
})
const blockContentType = compiled.get('skill').fields.find((f) => f.name === 'longDescription').type

// --- asset upload (deduped by source URL) -----------------------------------

const assetByUrl = new Map()
const failedImages = []

async function uploadImage(url, label) {
  if (assetByUrl.has(url)) return assetByUrl.get(url)
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const filename = url.split('/').pop()?.split('?')[0] || 'image'
    const asset = await client.assets.upload('image', buffer, {filename})
    assetByUrl.set(url, asset._id)
    return asset._id
  } catch (err) {
    failedImages.push({url, label, reason: String(err.message || err)})
    console.warn(`  ! image dropped (${label}): ${url} — ${err.message}`)
    assetByUrl.set(url, null)
    return null
  }
}

// --- HTML preprocessing ------------------------------------------------------

function preprocessHtml(html) {
  const doc = new JSDOM(`<body>${html}</body>`).window.document
  const body = doc.body

  // Unwrap <figure> wrappers (keep children)
  for (const figure of [...body.querySelectorAll('figure')]) {
    figure.replaceWith(...figure.childNodes)
  }

  // Flatten tables: one paragraph per row, cells joined with " | "
  for (const table of [...body.querySelectorAll('table')]) {
    const frag = doc.createDocumentFragment()
    for (const row of table.querySelectorAll('tr')) {
      const cells = [...row.querySelectorAll('th,td')].map((c) => c.textContent.trim())
      if (!cells.some(Boolean)) continue
      const p = doc.createElement('p')
      p.textContent = cells.join(' | ')
      frag.appendChild(p)
    }
    table.replaceWith(frag)
  }

  // Map h4-h6 down to h3
  for (const tag of ['h4', 'h5', 'h6']) {
    for (const el of [...body.querySelectorAll(tag)]) {
      const h3 = doc.createElement('h3')
      h3.innerHTML = el.innerHTML
      el.replaceWith(h3)
    }
  }

  // Hoist every <img> to a top-level marker paragraph; images are swapped
  // back in as real image blocks after htmlToBlocks (which would otherwise
  // nest them inside block children).
  const images = []
  for (const img of [...body.querySelectorAll('img')]) {
    let top = img
    while (top.parentElement && top.parentElement !== body) top = top.parentElement
    const idx = images.length
    images.push({src: img.getAttribute('src'), alt: img.getAttribute('alt') || ''})
    const marker = doc.createElement('p')
    marker.textContent = `__SANITY_IMG_${idx}__`
    if (top === img) {
      img.replaceWith(marker)
    } else {
      top.after(marker)
      img.remove()
      for (let el = top; el !== body && !el.textContent.trim() && !el.querySelector('img'); ) {
        const parent = el.parentElement
        el.remove()
        el = parent
      }
    }
  }

  return {html: body.innerHTML, images}
}

// --- HTML -> Portable Text ----------------------------------------------------

function convertBody(html, images, imageMap) {
  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
  })
  const out = []
  for (const b of blocks) {
    if (b._type === 'block') {
      const text = (b.children || []).map((c) => c.text || '').join('')
      const marker = text.match(/^__SANITY_IMG_(\d+)__$/)
      if (marker) {
        const img = images[Number(marker[1])]
        const assetId = img?.src ? imageMap.get(img.src) : null
        if (assetId) {
          out.push({_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt: img.alt})
        }
        continue
      }
      if (!text.trim() && !(b.markDefs || []).length) continue
    }
    out.push(b)
  }
  return out
}

// --- main ---------------------------------------------------------------------

const skills = JSON.parse(readFileSync(join(ROOT, 'migration-data/framer-skills-items.json'), 'utf8'))
const categories = JSON.parse(
  readFileSync(join(ROOT, 'migration-data/framer-skill-categories.json'), 'utf8'),
)
console.log(`Migrating ${skills.length} skills across ${categories.length} categories…`)

// 1) skillCategory docs from the Skill Categories collection
const catIdBySlug = new Map()
const catDocs = categories.map((c) => {
  const doc = {
    _id: `skillCategory-${c.slug}`,
    _type: 'skillCategory',
    title: c.fieldData[CAT_TITLE]?.value,
    slug: {_type: 'slug', current: c.slug},
  }
  catIdBySlug.set(c.slug, doc._id)
  return doc
})
{
  const tx = client.transaction()
  for (const doc of catDocs) tx.createOrReplace(doc)
  await tx.commit()
}
console.log(`committed ${catDocs.length} skillCategory docs`)

// 2) map skill Category enum strings to category refs (create when missing)
const catIdByEnum = new Map()
const autoCreatedCategories = []
for (const s of skills) {
  const enumVal = s.fieldData[F.category]?.value
  if (!enumVal || catIdByEnum.has(enumVal)) continue
  const slug = slugify(enumVal)
  let id = catIdBySlug.get(slug)
  if (!id) {
    id = `skillCategory-${slug}`
    await client.createOrReplace({
      _id: id,
      _type: 'skillCategory',
      title: enumVal,
      slug: {_type: 'slug', current: slug},
    })
    catIdBySlug.set(slug, id)
    autoCreatedCategories.push({enum: enumVal, id})
    console.log(`  + auto-created category "${enumVal}" (${id})`)
  }
  catIdByEnum.set(enumVal, id)
}

// 3) skill docs (all published)
const docs = []
const failures = []
let prepared = 0

for (const item of skills) {
  const f = item.fieldData || {}
  const slug = item.slug
  const name = f[F.name]?.value
  const html = f[F.long]?.value
  try {
    if (!name || !slug) throw new Error('missing name/slug')
    const categoryId = catIdByEnum.get(f[F.category]?.value)
    if (!categoryId) throw new Error(`unmapped category: ${f[F.category]?.value}`)

    // icon (frequently absent)
    let icon
    const iconUrl = f[F.icon]?.value?.url
    if (iconUrl) {
      const assetId = await uploadImage(iconUrl, `${slug} icon`)
      if (assetId) icon = {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt: name}
    }

    // long description
    let longDescription
    if (html) {
      const {html: processed, images} = preprocessHtml(html)
      const imageMap = new Map()
      for (const img of images) {
        if (img.src && !imageMap.has(img.src)) {
          imageMap.set(img.src, await uploadImage(img.src, `${slug} inline`))
        }
      }
      longDescription = convertBody(processed, images, imageMap)
    }

    const doc = {
      _id: `skill-${slug}`,
      _type: 'skill',
      name,
      slug: {_type: 'slug', current: slug},
      category: {_type: 'reference', _ref: categoryId},
      shortDescription: f[F.short]?.value || undefined,
      builtBy: f[F.builtBy]?.value || undefined,
      color: f[F.color]?.value || undefined,
      cardColor: f[F.cardColor]?.value || undefined,
      longDescription,
    }
    if (icon) doc.icon = icon
    docs.push(doc)
    prepared++
    if (prepared % 50 === 0) console.log(`  prepared ${prepared}/${skills.length}`)
  } catch (err) {
    failures.push({slug, reason: String(err.message || err)})
    console.error(`  ✗ ${slug}: ${err.message}`)
  }
}

// batch createOrReplace in transactions of 20
let created = 0
for (let i = 0; i < docs.length; i += 20) {
  const batch = docs.slice(i, i + 20)
  const tx = client.transaction()
  for (const doc of batch) tx.createOrReplace(doc)
  await tx.commit()
  created += batch.length
  console.log(`committed ${created}/${docs.length}`)
}

console.log('\n--- summary ---')
console.log(`source skills:        ${skills.length}`)
console.log(`created skills:       ${docs.length}`)
console.log(`categories (from CMS): ${catDocs.length}`)
console.log(`categories auto-created: ${autoCreatedCategories.length}`)
for (const c of autoCreatedCategories) console.log(`  + ${c.enum} (${c.id})`)
console.log(`failures:             ${failures.length}`)
for (const f of failures) console.log(`  ✗ ${f.slug}: ${f.reason}`)
console.log(`dropped images:       ${failedImages.length}`)
for (const f of failedImages) console.log(`  ! [${f.label}] ${f.url} — ${f.reason}`)
