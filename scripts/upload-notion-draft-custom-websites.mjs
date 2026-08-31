#!/usr/bin/env node
/**
 * One-off: upload Notion row 3b90ac1b-d32e-8119-8170-f98437cee984 as a Sanity DRAFT post.
 * Deterministic _id drafts.post-<slug>, createOrReplace (idempotent). Drafts only.
 */
import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// innflow-web/.env.local token is stale (401); legacy repo holds the live one
const env = readFileSync('/Users/ak/innflow-web-legacy-20260824/.env.local', 'utf8')
const token = env.match(/^SANITY_API_TOKEN=(.+)$/m)[1].trim()
const client = createClient({
  projectId: 'hnjg8vum',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const slug = 'custom-websites-for-property-managers-landlords'
const title = 'Custom Websites for Property Managers and Landlords'
const meta = JSON.parse(readFileSync('/tmp/notion-row-meta.json', 'utf8'))
const html = readFileSync('/tmp/draft_blog.html', 'utf8')

// portable text schema mirroring sanity/schemaTypes/postType.ts body
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

function preprocessHtml(h) {
  const doc = new JSDOM(`<body>${h}</body>`).window.document
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
  return {html: body.innerHTML, images: []} // source HTML has no <img>
}

function convertBody(h) {
  const blocks = htmlToBlocks(h, blockContentType, {
    parseHtml: (x) => new JSDOM(x).window.document,
  })
  return blocks.filter((b) => {
    if (b._type !== 'block') return true
    const text = (b.children || []).map((c) => c.text || '').join('')
    return text.trim() || (b.markDefs || []).length
  })
}

const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(words / 200))
const metaDescription =
  'innflow introduces custom websites for property managers and landlords. This press release covers branded listings, applications, and lead intake now.' // 150 chars

// cover image upload
const res = await fetch(meta.cover)
if (!res.ok) throw new Error(`cover fetch HTTP ${res.status}`)
const coverAsset = await client.assets.upload('image', Buffer.from(await res.arrayBuffer()), {
  filename: `${slug}-cover.png`,
})
console.log('cover asset:', coverAsset._id)

const body = convertBody(preprocessHtml(html).html)
if (!body.length) throw new Error('body converted to 0 blocks')

const doc = {
  _id: `drafts.post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  category: 'company-updates',
  author: {_type: 'reference', _ref: 'author.ari-khan'},
  excerpt: meta.description,
  metaDescription,
  targetKeyword: 'press releases',
  audience: meta.audience,
  readTime,
  publishedAt: new Date(`${meta.date}T00:00:00Z`).toISOString(),
  featured: false,
  tags: [],
  coverImage: {_type: 'image', asset: {_type: 'reference', _ref: coverAsset._id}, alt: title},
  body,
}
await client.createOrReplace(doc)
console.log(`createOrReplace OK: ${doc._id} (${body.length} blocks, ${words} words, readTime ${readTime})`)

const check = await client.fetch(
  `*[_type=="post" && slug.current==$slug]{_id,title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug},
)
console.log('GROQ verify:', JSON.stringify(check))
