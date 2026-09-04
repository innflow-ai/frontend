#!/usr/bin/env node
/**
 * Publish the "Innflow vs n8n" comparison post to Sanity.
 * Mechanics copied from migrate-framer-to-sanity.mjs (token loading,
 * compiled-schema htmlToBlocks conversion, createOrReplace).
 */

import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const SLUG = 'innflow-vs-n8n'
const COVER_ASSET_ID = 'image-67ad4a81036dad4c1d99d38e142208a712eb254b-1280x720-webp'
const COVER_ALT = 'Innflow vs n8n comparison'

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

// --- main -------------------------------------------------------------------

const html = readFileSync(join(ROOT, 'blog-content/innflow-vs-n8n.html'), 'utf8')

// strip the HTML comment metadata block, parse metadata out of it
const metaBlock = html.match(/<!--([\s\S]*?)-->/)
if (!metaBlock) throw new Error('metadata comment block missing')
const meta = Object.fromEntries(
  metaBlock[1]
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(':')
      return [l.slice(0, i), l.slice(i + 1).trim()]
    }),
)
const bodyHtml = html.replace(/<!--[\s\S]*?-->/, '').trim()

const title = meta['Title']
const metaDescription = meta['Meta Description']
const targetKeyword = meta['Target Keyword']
const audience = meta['Audience']
const readTime = Number(meta['Read Est'])

// slug uniqueness check
const existing = await client.fetch(
  `*[_type=="post" && slug.current==$slug][0]{_id}`,
  {slug: SLUG},
)
if (existing) {
  console.error(`STOP: a post with slug "${SLUG}" already exists (${existing._id}). Not overwriting.`)
  process.exit(1)
}

// no inline images in this post: convert directly
const body = htmlToBlocks(bodyHtml, blockContentType, {
  parseHtml: (h) => new JSDOM(h).window.document,
}).filter((b) => {
  if (b._type !== 'block') return true
  const text = (b.children || []).map((c) => c.text || '').join('')
  return text.trim() || (b.markDefs || []).length
})
if (!body.length) throw new Error('body converted to 0 blocks')

const doc = {
  _id: `post-${SLUG}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: SLUG},
  category: 'comparison',
  excerpt: metaDescription,
  metaDescription,
  targetKeyword,
  audience,
  readTime,
  coverImage: {_type: 'image', asset: {_type: 'reference', _ref: COVER_ASSET_ID}, alt: COVER_ALT},
  publishedAt: new Date().toISOString(),
  featured: false,
  tags: ['n8n', 'comparison', 'workflow automation', 'AI agents', 'self-hosted', 'agentic AI'],
  body,
}

await client.createOrReplace(doc)
console.log(`✓ published ${doc._id} (${body.length} blocks)`)

// delete draft twin if present
try {
  await client.delete(`drafts.post-${SLUG}`)
  console.log('✓ removed drafts twin')
} catch (err) {
  if (err.statusCode === 404 || /not found/i.test(String(err.message))) {
    console.log('· no drafts twin to remove')
  } else {
    throw err
  }
}

// verify
const check = await client.fetch(
  `*[_type=="post" && slug.current==$slug][0]{title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug: SLUG},
)
console.log('GROQ verification:', JSON.stringify(check))
if (!check || !(check.blocks > 0) || !check.hasCover) {
  throw new Error('verification failed')
}
console.log('✓ verified')
