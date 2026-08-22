#!/usr/bin/env node
/**
 * Migrate blog posts from the Framer "Blog 2 CMS" dump into Sanity.
 *
 * Input:  ../migration-data/framer-blog-items.json (produced via the Framer agent)
 * Target: Sanity project hnjg8vum, dataset production, `post` documents.
 *
 * Re-runnable: document IDs are deterministic (post-<slug> / drafts.post-<slug>)
 * and creation uses createOrReplace. The token is read from ../.env.local at
 * runtime (SANITY_API_TOKEN) and never printed.
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
})

const F = {
  title: 'nilxc6eaA',
  category: 'f9YoC2B5a',
  status: 'OYziywlwm',
  image: 'WOG6WOwK7',
  content: 'GlNVIU3UP',
  date: 'loog8IEFM',
  tags: 'WFSZdCj_E',
  estRead: 'VXMBw7ue5',
  description: 'WHvycqVu0',
}

// --- portable text schema (must mirror sanity/schemaTypes/postType.ts body) ---

const compiled = Schema.compile({
  name: 'migration',
  types: [
    {
      name: 'post',
      type: 'document',
      fields: [
        {
          name: 'body',
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
const blockContentType = compiled.get('post').fields.find((f) => f.name === 'body').type

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

  // Hoist every <img> to a top-level position, then swap it for a marker
  // paragraph. htmlToBlocks nests custom-rule objects inside blocks, so
  // images are re-inserted as real image blocks after conversion instead.
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
      // drop parents left empty (e.g. <p><img></p>)
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
      // drop empty paragraphs (e.g. Framer trailing <br> spacers)
      if (!text.trim() && !(b.markDefs || []).length) continue
    }
    out.push(b)
  }
  return out
}

// --- main ---------------------------------------------------------------------

const items = JSON.parse(readFileSync(join(ROOT, 'migration-data/framer-blog-items.json'), 'utf8'))
console.log(`Migrating ${items.length} items…`)

const docs = []
const failures = []

for (const item of items) {
  const f = item.fieldData || {}
  const slug = item.slug
  const title = f[F.title]?.value
  const status = f[F.status]?.value
  const category = f[F.category]?.value
  const html = f[F.content]?.value
  try {
    if (!title || !slug || !html) throw new Error('missing title/slug/content')

    // cover image
    let coverImage
    const coverUrl = f[F.image]?.value?.url
    if (coverUrl) {
      const assetId = await uploadImage(coverUrl, `${slug} cover`)
      if (assetId) coverImage = {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt: title}
    }

    // inline images: pre-upload every <img> so conversion is synchronous
    const {html: processed, images} = preprocessHtml(html)
    const imageMap = new Map()
    for (const img of images) {
      if (img.src && !imageMap.has(img.src)) {
        imageMap.set(img.src, await uploadImage(img.src, `${slug} inline`))
      }
    }

    const body = convertBody(processed, images, imageMap)
    if (!body.length) throw new Error('body converted to 0 blocks')

    const doc = {
      _id: status === 'Posted' ? `post-${slug}` : `drafts.post-${slug}`,
      _type: 'post',
      title,
      slug: {_type: 'slug', current: slug},
      category,
      excerpt: f[F.description]?.value || undefined,
      metaDescription: f[F.description]?.value || undefined,
      readTime: Number(f[F.estRead]?.value) || undefined,
      publishedAt: f[F.date]?.value || undefined,
      featured: false,
      tags: Array.isArray(f[F.tags]?.value) ? f[F.tags].value : [],
      body,
    }
    if (coverImage) doc.coverImage = coverImage
    docs.push(doc)
    console.log(`  ✓ prepared ${doc._id} (${body.length} blocks)`)
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

const published = docs.filter((d) => !d._id.startsWith('drafts.')).length
console.log('\n--- summary ---')
console.log(`source items:     ${items.length}`)
console.log(`created published: ${published}`)
console.log(`created drafts:    ${docs.length - published}`)
console.log(`failures:          ${failures.length}`)
for (const f of failures) console.log(`  ✗ ${f.slug}: ${f.reason}`)
console.log(`dropped images:   ${failedImages.length}`)
for (const f of failedImages) console.log(`  ! [${f.label}] ${f.url} — ${f.reason}`)
