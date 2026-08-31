#!/usr/bin/env node
/**
 * One-shot: upload a single Notion blog row into Sanity as a DRAFT post.
 * Follows scripts/migrate-framer-to-sanity.mjs mechanics exactly.
 * Draft only: writes drafts.post-<slug>, never the published post-<slug>.
 */
import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// NOTE: innflow-web/.env.local token is stale (401); the working SANITY_API_TOKEN
// currently lives in the legacy repo's .env.local.
const env = readFileSync('/Users/ak/innflow-web-legacy-20260824/.env.local', 'utf8')
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

// --- inputs (from Notion page 3b90ac1b-d32e-8125-9aeb-c129416393f6) ---
const title = 'The Colorado Springs Real Estate Market: Everything You Need to Know'
const slug = 'colorado-springs-real-estate-market' // from first_comment URL
const category = 'case-study' // Notion Tag "Case Study" -> enum
const excerpt =
  'innflow guide to The Colorado Springs Real Estate Market: Everythin: operator playbook, metrics, and AI agent workflows for property teams.'
const metaDescription =
  'innflow guide to the Colorado Springs real estate market: operator playbook, key metrics, AI agent workflows, and automation strategies for property teams.'
const coverUrl = process.argv[2]
const html = readFileSync('/tmp/draft_blog.html', 'utf8')

if (metaDescription.length < 150 || metaDescription.length > 160) {
  throw new Error(`metaDescription length ${metaDescription.length} out of 150-160`)
}

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
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching image`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {filename})
  return asset._id
}

function preprocessHtml(src) {
  const doc = new JSDOM(`<body>${src}</body>`).window.document
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

function convertBody(processed, images, imageMap) {
  const blocks = htmlToBlocks(processed, blockContentType, {
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

// --- cover ---
const coverAssetId = await uploadImage(coverUrl, `${slug}-cover.png`)
const coverImage = {_type: 'image', asset: {_type: 'reference', _ref: coverAssetId}, alt: title}

// --- body ---
const {html: processed, images} = preprocessHtml(html)
const imageMap = new Map()
const dropped = []
for (const img of images) {
  if (img.src && !imageMap.has(img.src)) {
    try {
      imageMap.set(img.src, await uploadImage(img.src, `${slug}-inline`))
    } catch (err) {
      dropped.push({src: img.src, reason: String(err.message || err)})
      imageMap.set(img.src, null)
    }
  }
}
const body = convertBody(processed, images, imageMap)
if (!body.length) throw new Error('body converted to 0 blocks')

const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(words / 200))

const doc = {
  _id: `drafts.post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  category,
  excerpt,
  metaDescription,
  readTime,
  publishedAt: new Date().toISOString(),
  featured: false,
  tags: ['colorado-springs', 'real-estate-market', 'property-management'],
  coverImage,
  body,
}
await client.createOrReplace(doc)

// --- verify (include drafts) ---
const draftsClient = client.withConfig({perspective: 'drafts'})
const check = await draftsClient.fetch(
  `*[_type=="post" && slug.current==$slug][0]{_id,title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug},
)

console.log(
  JSON.stringify(
    {
      docId: doc._id,
      blocks: check?.blocks,
      hasCover: check?.hasCover,
      verifiedId: check?._id,
      words,
      readTime,
      metaLen: metaDescription.length,
      droppedInlineImages: dropped,
    },
    null,
    1,
  ),
)
