#!/usr/bin/env node
/**
 * publish-one-post.mjs — one-off: create/replace a single published `post`
 * document in Sanity (project hnjg8vum, dataset production) from a JSON input.
 *
 * Input JSON: { slug, title, category, excerpt, metaDescription, readTime,
 *               publishedAt, tags, coverImageUrl, htmlBody }
 * Token is read from ../.env.local (SANITY_API_TOKEN) and never printed.
 */

import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {createClient} from '@sanity/client'
import {htmlToPortableText} from '@portabletext/html'
import {defaultSchema} from '@portabletext/html'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

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

const input = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const {slug, title, category, excerpt, metaDescription, readTime, publishedAt, tags, coverImageUrl, htmlBody} = input
if (!slug || !title || !htmlBody) throw new Error('missing slug/title/htmlBody')

// Hoist <img> out of the body: upload each and emit image blocks at top-level
// position; the text path keeps everything else.
const dom = new JSDOM(`<body>${htmlBody}</body>`)
const body = dom.window.document.body
const images = []
for (const img of [...body.querySelectorAll('img')]) {
  let top = img
  while (top.parentElement && top.parentElement !== body) top = top.parentElement
  images.push({src: img.getAttribute('src'), alt: img.getAttribute('alt') || ''})
  const marker = body.ownerDocument.createElement('p')
  marker.textContent = `__SANITY_IMG_${images.length - 1}__`
  top.after(marker)
  img.remove()
}

let blocks = htmlToPortableText(body.innerHTML, {
  schema: defaultSchema,
  parseHtml: (h) => new JSDOM(h).window.document,
})

// drop empties, map h4-h6 leftovers, re-insert image blocks
const out = []
for (const b of blocks) {
  if (b._type === 'block') {
    const text = (b.children || []).map((c) => c.text || '').join('')
    const marker = text.match(/^__SANITY_IMG_(\d+)__$/)
    if (marker) {
      const img = images[Number(marker[1])]
      if (img?.src) {
        try {
          const res = await fetch(img.src)
          if (res.ok) {
            const buf = Buffer.from(await res.arrayBuffer())
            const asset = await client.assets.upload('image', buf, {filename: img.src.split('/').pop().split('?')[0]})
            out.push({_type: 'image', asset: {_type: 'reference', _ref: asset._id}, alt: img.alt})
          }
        } catch (err) {
          console.warn(`  ! inline image dropped: ${img.src} — ${err.message}`)
        }
      }
      continue
    }
    if (!text.trim() && !(b.markDefs || []).length) continue
    if (b.style && !['normal', 'h2', 'h3', 'blockquote'].includes(b.style)) {
      b.style = b.style.startsWith('h') ? 'h3' : 'normal'
    }
  }
  out.push(b)
}
blocks = out
if (!blocks.length) throw new Error('body converted to 0 blocks')

const doc = {
  _id: `post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  category,
  excerpt: excerpt || undefined,
  metaDescription: metaDescription || undefined,
  readTime: readTime || undefined,
  publishedAt: publishedAt || new Date().toISOString(),
  featured: false,
  tags: Array.isArray(tags) ? tags : [],
  body: blocks,
}

if (coverImageUrl) {
  const res = await fetch(coverImageUrl)
  if (!res.ok) throw new Error(`cover fetch failed: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buf, {filename: `${slug}-cover.jpg`})
  doc.coverImage = {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, alt: title}
}

await client.createOrReplace(doc)
console.log(`✓ Sanity doc ${doc._id} published (${blocks.length} blocks)`)
