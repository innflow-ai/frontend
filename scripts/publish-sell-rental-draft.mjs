#!/usr/bin/env node
/* One-off: create drafts.post-sell-rental-property from Notion row HTML.
   Mirrors scripts/migrate-framer-to-sanity.mjs mechanics. Draft only. */
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

async function uploadImage(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching image`)
  const buffer = Buffer.from(await res.arrayBuffer())
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

// --- inputs ---------------------------------------------------------------
const slug = 'sell-rental-property'
const title = 'How to Sell a Rental Property: Everything You Need to Know'
const html = readFileSync('/tmp/draft_blog2.html', 'utf8')
const coverUrl = readFileSync('/tmp/cover_url.txt', 'utf8').trim()

// 0. existing doc check
const existing = await client.fetch(`*[_type=="post" && slug.current==$slug]{_id}`, {slug})
console.log('existing docs:', JSON.stringify(existing))

// 1. cover
let coverImage
try {
  const assetId = await uploadImage(coverUrl, `${slug}-cover.png`)
  coverImage = {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt: title}
  console.log('cover asset:', assetId)
} catch (e) {
  console.warn('cover upload failed:', e.message)
}

// 2. inline images + body
const {html: processed, images} = preprocessHtml(html)
const imageMap = new Map()
for (const img of images) {
  if (img.src && !imageMap.has(img.src)) {
    try {
      imageMap.set(img.src, await uploadImage(img.src, `${slug}-inline`))
    } catch (e) {
      console.warn('inline image dropped:', img.src, e.message)
      imageMap.set(img.src, null)
    }
  }
}
const body = convertBody(processed, images, imageMap)
if (!body.length) throw new Error('body converted to 0 blocks')
console.log('body blocks:', body.length)

// 3. fields
const text = html.replace(/<[^>]+>/g, ' ')
const words = text.split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(words / 200))
let metaDescription =
  'How to sell a rental property while it is occupied: timing, tenants, deposits, taxes, and the operator workflow that keeps leasing and showings from colliding.'
if (metaDescription.length > 160) {
  metaDescription =
    'How to sell a rental property while occupied: timing, tenants, deposits, taxes, and the operator workflow that keeps leasing and showings on track.'
}
const excerpt =
  'innflow guide to How to Sell a Rental Property: Everything You Need: operator playbook, metrics, and AI agent workflows for property teams.'

const doc = {
  _id: `drafts.post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  category: 'case-study',
  author: {_type: 'reference', _ref: 'author.ari-khan'},
  excerpt,
  metaDescription,
  targetKeyword: 'sell a rental property',
  audience: 'Property operators, multifamily teams, and portfolio managers',
  readTime,
  publishedAt: new Date('2026-08-11T00:00:00.000Z').toISOString(),
  featured: false,
  tags: ['sell a rental property', 'property management'],
  body,
}
if (coverImage) doc.coverImage = coverImage

await client.createOrReplace(doc)
console.log('createOrReplace ok:', doc._id)

// 4. verify (drafts perspective)
const check = await client.withConfig({perspective: 'drafts'}).fetch(
  `*[_type=="post" && slug.current==$slug][0]{_id,title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug},
)
console.log('verify:', JSON.stringify(check))
