#!/usr/bin/env node
/**
 * One-off: upload a single Notion blog row into Sanity as a DRAFT post.
 * Reads prepared data from /tmp/notion-post-data.json (title, slug, HTML body,
 * cover URL). Mechanics copied from migrate-framer-to-sanity.mjs.
 * Never prints SANITY_API_TOKEN.
 */
import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const env = readFileSync(join(ROOT, '.env.local'), 'utf8')
const tokenMatch = env.match(/^SANITY_API_TOKEN=(.+)$/m)
if (!tokenMatch) throw new Error('SANITY_API_TOKEN not found in .env.local')
const token = tokenMatch[1].trim().replace(/^['"]|['"]$/g, '')

const client = createClient({
  projectId: 'hnjg8vum',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// --- portable text schema (mirrors sanity/schemaTypes/postType.ts body) ---
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

async function uploadImage(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url.slice(0, 80)}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {filename})
  return asset._id
}

function preprocessHtml(html) {
  const doc = new JSDOM(`<body>${html}</body>`).window.document
  const body = doc.body

  for (const figure of [...body.querySelectorAll('figure')]) {
    figure.replaceWith(...figure.childNodes)
  }
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
  for (const tag of ['h4', 'h5', 'h6']) {
    for (const el of [...body.querySelectorAll(tag)]) {
      const h3 = doc.createElement('h3')
      h3.innerHTML = el.innerHTML
      el.replaceWith(h3)
    }
  }

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

// --- main ---
const data = JSON.parse(readFileSync('/tmp/notion-post-data.json', 'utf8'))
const {title, slug} = data

// strip the leading HTML metadata comment from the body
let html = data.draftHtml.replace(/^\s*<!--[\s\S]*?-->/, '')

const text = html.replace(/<[^>]+>/g, ' ')
const words = text.split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(words / 200))

// cover
const coverAssetId = await uploadImage(data.coverUrl, data.coverFilename || `${slug}-cover.png`)
const coverImage = {
  _type: 'image',
  asset: {_type: 'reference', _ref: coverAssetId},
  alt: title,
}

// inline images
const {html: processed, images} = preprocessHtml(html)
const imageMap = new Map()
const dropped = []
for (const img of images) {
  if (img.src && !imageMap.has(img.src)) {
    try {
      imageMap.set(img.src, await uploadImage(img.src, img.src.split('/').pop()?.split('?')[0]))
    } catch (err) {
      dropped.push(img.src)
      imageMap.set(img.src, null)
    }
  }
}

const body = convertBody(processed, images, imageMap)
if (!body.length) throw new Error('body converted to 0 blocks')

const doc = {
  _id: `drafts.post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  category: data.category,
  excerpt: data.excerpt,
  metaDescription: data.metaDescription,
  targetKeyword: data.targetKeyword,
  audience: data.audience,
  readTime,
  publishedAt: new Date(`${data.date}T09:00:00Z`).toISOString(),
  featured: false,
  tags: [],
  coverImage,
  body,
}

await client.createOrReplace(doc)

const check = await client.fetch(
  `*[_type=="post" && slug.current==$slug]{_id,title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug},
  {perspective: 'raw'},
)

console.log(
  JSON.stringify({
    slug,
    docId: doc._id,
    words,
    readTime,
    blocks: body.length,
    inlineImages: images.length,
    droppedInline: dropped,
    verify: check,
  }),
)
