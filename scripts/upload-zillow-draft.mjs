#!/usr/bin/env node
/** One-off: upload Notion row (Zillow post) to Sanity as drafts.post-zillow. */
import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const env = readFileSync(join(ROOT, '.env.local'), 'utf8')
const token = env.match(/^SANITY_API_TOKEN=(.+)$/m)[1].trim().replace(/^"|"$/g, '')
const client = createClient({projectId: 'hnjg8vum', dataset: 'production', apiVersion: '2024-01-01', token, useCdn: false})

const compiled = Schema.compile({
  name: 'migration',
  types: [{
    name: 'post', type: 'document',
    fields: [{name: 'body', type: 'array', of: [
      {type: 'block',
        styles: [{title: 'Normal', value: 'normal'}, {title: 'H2', value: 'h2'}, {title: 'H3', value: 'h3'}, {title: 'Quote', value: 'blockquote'}],
        lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
        marks: {
          decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}, {title: 'Code', value: 'code'}],
          annotations: [{name: 'link', type: 'object', title: 'Link', fields: [{name: 'href', type: 'url', title: 'URL'}]}],
        }},
      {type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt Text'}]},
    ]}],
  }],
})
const blockContentType = compiled.get('post').fields.find((f) => f.name === 'body').type

const assetByUrl = new Map()
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
    console.warn(`  ! image dropped (${label}): ${err.message}`)
    assetByUrl.set(url, null)
    return null
  }
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
      const p = doc.createElement('p'); p.textContent = cells.join(' | '); frag.appendChild(p)
    }
    table.replaceWith(frag)
  }
  for (const tag of ['h4', 'h5', 'h6']) {
    for (const el of [...body.querySelectorAll(tag)]) {
      const h3 = doc.createElement('h3'); h3.innerHTML = el.innerHTML; el.replaceWith(h3)
    }
  }
  const images = []
  for (const img of [...body.querySelectorAll('img')]) {
    let top = img
    while (top.parentElement && top.parentElement !== body) top = top.parentElement
    const idx = images.length
    images.push({src: img.getAttribute('src'), alt: img.getAttribute('alt') || ''})
    const marker = doc.createElement('p'); marker.textContent = `__SANITY_IMG_${idx}__`
    if (top === img) img.replaceWith(marker)
    else {
      top.after(marker); img.remove()
      for (let el = top; el !== body && !el.textContent.trim() && !el.querySelector('img');) {
        const parent = el.parentElement; el.remove(); el = parent
      }
    }
  }
  return {html: body.innerHTML, images}
}

function convertBody(html, images, imageMap) {
  const blocks = htmlToBlocks(html, blockContentType, {parseHtml: (h) => new JSDOM(h).window.document})
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

// --- inputs ---
const slug = 'zillow'
const title = 'Listing Rentals on Zillow to Find New Tenants & Renters'
const metaDescription = 'Listing rentals on Zillow to find new tenants: Zillow Rental Manager steps, photos, pricing, leads, and how innflow turns inquiries into a leasing queue.'
const category = 'case-study'
const audience = 'Property operators, multifamily teams, and portfolio managers'
const targetKeyword = 'listing rentals zillow find new tenants'
const rawHtml = readFileSync('/tmp/blog-upload/body.html', 'utf8')
const html = rawHtml.replace(/<!--[\s\S]*?-->/, '').trim()
const coverUrl = readFileSync('/tmp/blog-upload/cover.txt', 'utf8').trim()

const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(words / 200))

let coverImage
const coverAsset = await uploadImage(coverUrl, `${slug} cover`)
if (coverAsset) coverImage = {_type: 'image', asset: {_type: 'reference', _ref: coverAsset}, alt: title}

const {html: processed, images} = preprocessHtml(html)
const imageMap = new Map()
for (const img of images) {
  if (img.src && !imageMap.has(img.src)) imageMap.set(img.src, await uploadImage(img.src, `${slug} inline`))
}
const body = convertBody(processed, images, imageMap)
if (!body.length) throw new Error('body converted to 0 blocks')

const doc = {
  _id: `drafts.post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  category,
  excerpt: metaDescription,
  metaDescription,
  targetKeyword,
  audience,
  readTime,
  publishedAt: '2026-08-11T00:00:00.000Z',
  featured: false,
  tags: [],
  body,
}
if (coverImage) doc.coverImage = coverImage

await client.createOrReplace(doc)
console.log(`created drafts.post-${slug} | words=${words} readTime=${readTime} blocks=${body.length} cover=${Boolean(coverImage)}`)

const check = await client.withConfig({perspective: 'drafts'}).fetch(
  `*[_type=="post" && slug.current==$slug][0]{_id,title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug}
)
console.log('GROQ verify:', JSON.stringify(check))
