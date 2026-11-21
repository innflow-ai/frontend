#!/usr/bin/env node
/**
 * One-off: upload ONE Notion blog (page 3b90ac1b-d32e-81d2-b9f9-f18cc53031ca)
 * into Sanity as a DRAFT post document (drafts.post-how-to-evict-a-tenant).
 * Mechanics copied from scripts/migrate-framer-to-sanity.mjs. Never prints the token.
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
const token = env.match(/^SANITY_API_TOKEN=(.+)$/m)[1].trim().replace(/^["']|["']$/g, '')

const client = createClient({
  projectId: 'hnjg8vum',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

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

async function uploadImage(url, label) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${label}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = url.split('/').pop()?.split('?')[0] || 'image'
  const asset = await client.assets.upload('image', buffer, {filename})
  return asset._id
}

function preprocessHtml(html) {
  const doc = new JSDOM(`<body>${html}</body>`).window.document
  const body = doc.body
  for (const figure of [...body.querySelectorAll('figure')]) figure.replaceWith(...figure.childNodes)
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
        if (assetId) out.push({_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt: img.alt})
        continue
      }
      if (!text.trim() && !(b.markDefs || []).length) continue
    }
    out.push(b)
  }
  return out
}

// --- inputs -----------------------------------------------------------------
const slug = 'how-to-evict-a-tenant'
const title = 'How To Evict A Tenant: A Safe and Legal Guide' // <60 chars
const metaDescription =
  'How to evict a tenant legally: follow notice, filing, service, court, writ, and lockout, and keep a documented file that survives a hearing this year.'
const excerpt =
  'innflow guide to How To Evict A Tenant: The Complete Guide to a Safe and Legal Eviction: operator playbook, metrics, and AI agent workflows for property teams.'
const category = 'case-study' // Notion Tag "Case Study"; Topic "Legal" not in enum
const coverUrl = process.argv[2] // signed Notion S3 URL passed at runtime
const html = readFileSync('/Users/ak/.openclaw/workspace/innflow-blog-pipeline/temp/evict-body.html', 'utf8')

if (!coverUrl) throw new Error('cover URL arg required')
if (title.length > 60) throw new Error('title too long')
if (metaDescription.length < 150 || metaDescription.length > 160) throw new Error(`metaDescription length ${metaDescription.length}`)

// cover
const coverAssetId = await uploadImage(coverUrl, 'cover')
const coverImage = {_type: 'image', asset: {_type: 'reference', _ref: coverAssetId}, alt: title}

// body
const {html: processed, images} = preprocessHtml(html)
const imageMap = new Map()
for (const img of images) {
  if (img.src && !imageMap.has(img.src)) imageMap.set(img.src, await uploadImage(img.src, 'inline'))
}
const body = convertBody(processed, images, imageMap)
if (!body.length) throw new Error('body converted to 0 blocks')

const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(words / 200)) // body is truncated; Notion Est read = 9
const doc = {
  _id: `drafts.post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  category,
  author: {_type: 'reference', _ref: 'author.ari-khan'},
  excerpt,
  metaDescription,
  targetKeyword: 'how to evict a tenant',
  audience: 'Property operators, multifamily teams, landlords, portfolio managers',
  readTime: 9,
  publishedAt: '2026-08-11T00:00:00.000Z',
  featured: false,
  tags: [],
  coverImage,
  body,
}
await client.createOrReplace(doc)
console.log(`createOrReplace ok: ${doc._id} (${body.length} blocks, ${words} words, computedReadTime=${readTime})`)

const check = await client.fetch(
  `*[_type=="post" && slug.current==$slug && _id=="drafts.post-"+$slug][0]{title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug},
)
console.log('GROQ verify:', JSON.stringify(check))
