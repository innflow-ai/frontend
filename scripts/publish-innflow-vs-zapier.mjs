#!/usr/bin/env node
/**
 * Publish the "Innflow vs Zapier" comparison post to Sanity.
 *
 * Modeled on scripts/migrate-framer-to-sanity.mjs: same token loading,
 * same compiled-schema htmlToBlocks conversion, createOrReplace with
 * deterministic IDs. Cover image reuses an existing asset (no upload).
 * Token is never printed.
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

const SLUG = 'innflow-vs-zapier'
const COVER_ASSET_ID = 'image-e3232c718b27649e0a4a0d40f03f058b4db5b408-2000x1065-webp'

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

const raw = readFileSync(join(ROOT, 'scripts', `${SLUG}.html`), 'utf8')

// parse the required HTML comment metadata block
const metaMatch = raw.match(/<!--([\s\S]*?)-->/)
if (!metaMatch) throw new Error('metadata comment block not found')
const meta = Object.fromEntries(
  metaMatch[1]
    .trim()
    .split('\n')
    .map((line) => {
      const idx = line.indexOf(':')
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()]
    }),
)

const html = raw.slice(metaMatch[0].length)

const blocks = htmlToBlocks(html, blockContentType, {
  parseHtml: (h) => new JSDOM(h).window.document,
})
// drop empty paragraphs
const body = blocks.filter((b) => {
  if (b._type !== 'block') return true
  const text = (b.children || []).map((c) => c.text || '').join('')
  return text.trim() || (b.markDefs || []).length
})
if (!body.length) throw new Error('body converted to 0 blocks')

const plainText = html.replace(/<[^>]+>/g, ' ')
const wordCount = plainText.split(/\s+/).filter(Boolean).length
const readTime = Math.max(1, Math.round(wordCount / 200))

const doc = {
  _id: `post-${SLUG}`,
  _type: 'post',
  title: meta['Title'],
  slug: {_type: 'slug', current: SLUG},
  category: 'comparison',
  excerpt: meta['Meta Description'],
  metaDescription: meta['Meta Description'],
  targetKeyword: meta['Target Keyword'],
  audience: meta['Audience'],
  readTime,
  coverImage: {
    _type: 'image',
    asset: {_type: 'reference', _ref: COVER_ASSET_ID},
    alt: 'Innflow vs Zapier comparison',
  },
  publishedAt: new Date().toISOString(),
  featured: false,
  tags: ['innflow', 'zapier', 'automation', 'ai agents', 'workflow automation', 'comparison'],
  body,
}

await client.createOrReplace(doc)
console.log(`published ${doc._id} (${body.length} blocks, ${wordCount} words, ${readTime} min)`)

// remove any draft twin
try {
  await client.delete(`drafts.post-${SLUG}`)
  console.log('deleted drafts twin')
} catch (err) {
  if (err.statusCode !== 404) throw err
}

// verify
const check = await client.fetch(
  `*[_type=="post" && slug.current==$slug][0]{title,"blocks":count(body),"hasCover":defined(coverImage)}`,
  {slug: SLUG},
)
console.log('verification:', JSON.stringify(check))
