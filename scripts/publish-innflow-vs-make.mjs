#!/usr/bin/env node
/**
 * Publish the Innflow vs Make comparison post to Sanity.
 * Modeled on scripts/migrate-framer-to-sanity.mjs (token loading,
 * compiled-schema htmlToBlocks, createOrReplace). Never prints the token.
 */

import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SLUG = 'innflow-vs-make'

// --- config ---------------------------------------------------------------

const env = readFileSync(join(ROOT, '.env.local'), 'utf8')
const tokenMatch = env.match(/^SANITY_API_TOKEN=(.+)$/m)
if (!tokenMatch) throw new Error('SANITY_API_TOKEN not found in .env.local')
const token = tokenMatch[1].trim().replace(/^["']|["']$/g, '')

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

// --- HTML -> Portable Text (no inline images in this post) -----------------

function convertBody(html) {
  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
  })
  return blocks.filter((b) => {
    if (b._type !== 'block') return true
    const text = (b.children || []).map((c) => c.text || '').join('')
    return text.trim() || (b.markDefs || []).length
  })
}

// --- metadata from the HTML comment block ----------------------------------

const raw = readFileSync(join(ROOT, 'scripts/content/innflow-vs-make.html'), 'utf8')
const metaBlock = raw.match(/<!--([\s\S]*?)-->/)
if (!metaBlock) throw new Error('metadata comment block not found')
const meta = Object.fromEntries(
  metaBlock[1]
    .split('\n')
    .map((l) => l.match(/^\s*([A-Za-z ]+):\s*(.+)$/))
    .filter(Boolean)
    .map(([, k, v]) => [k.trim(), v.trim()])
)
const html = raw.slice(metaBlock.index + metaBlock[0].length).trim()

const title = meta['Title']
const metaDescription = meta['Meta Description']
if (!title || title.length > 60) throw new Error('title missing or >60 chars')
if (!metaDescription || metaDescription.length < 150 || metaDescription.length > 160)
  throw new Error(`metaDescription must be 150-160 chars, got ${metaDescription?.length}`)

const wordCount = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(wordCount / 200))
if (wordCount < 2000) throw new Error(`word count ${wordCount} < 2000`)
if (/[—→]/.test(html)) throw new Error('prohibited character (em dash or arrow) in body')

// --- slug uniqueness guard --------------------------------------------------

const existing = await client.fetch(
  `*[_type=="post" && slug.current==$slug][0]{_id}`,
  {slug: SLUG}
)
if (existing) {
  console.error(`ABORT: a published post with slug "${SLUG}" already exists (${existing._id}). Not overwriting.`)
  process.exit(1)
}

// --- publish ----------------------------------------------------------------

const body = convertBody(html)
if (!body.length) throw new Error('body converted to 0 blocks')

const doc = {
  _id: `post-${SLUG}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: SLUG},
  category: 'comparison',
  excerpt: metaDescription,
  metaDescription,
  targetKeyword: meta['Target Keyword'],
  audience: meta['Audience'],
  readTime,
  publishedAt: new Date().toISOString(),
  featured: false,
  tags: ['Innflow vs Make', 'Make', 'workflow automation', 'agentic workflows', 'comparison'],
  coverImage: {
    _type: 'image',
    asset: {_type: 'reference', _ref: 'image-a6626305a107807d12f1b313c9ad692777dec8c2-2000x1065-webp'},
    alt: 'Innflow vs Make comparison',
  },
  body,
}

await client.createOrReplace(doc)
console.log(`published post-${SLUG} (${body.length} blocks, ${wordCount} words, readTime ${readTime})`)

try {
  await client.delete(`drafts.post-${SLUG}`)
  console.log('deleted drafts twin')
} catch (err) {
  if (err.statusCode !== 404) throw err
}

const verify = await client.fetch(
  `*[_type=="post" && slug.current==$slug][0]{title,"blocks":count(body),"hasCover":defined(coverImage),"coverRef":coverImage.asset._ref}`,
  {slug: SLUG}
)
console.log('verify:', JSON.stringify(verify, null, 2))
if (!verify || verify.blocks < 1 || !verify.hasCover) throw new Error('verification failed')
console.log(`live at https://innflow.ai/blog/${SLUG}`)
