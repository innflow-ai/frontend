#!/usr/bin/env node
/**
 * Upload four local desktop covers and patch coverImage on matching Sanity posts.
 * Token from .env.local — never printed.
 */
import {createReadStream, readFileSync} from 'node:fs'
import {basename, dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const env = readFileSync(join(ROOT, '.env.local'), 'utf8')
const token = env
  .match(/^SANITY_API_TOKEN=(.+)$/m)[1]
  .trim()
  .replace(/^["']|["']$/g, '')

const client = createClient({
  projectId: 'hnjg8vum',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const JOBS = [
  {
    folder:
      '/Users/ak/Downloads/Refresh/Refresh/Desktop/5 Best Property Management CRM Software',
    needles: ['property management crm', 'best property management crm'],
  },
  {
    folder:
      '/Users/ak/Downloads/Refresh/Refresh/Desktop/5 Ways to Simplify Landlord-Tenant Communications',
    needles: ['landlord-tenant', 'landlord tenant', 'simplify landlord'],
  },
  {
    folder:
      '/Users/ak/Downloads/Refresh/Refresh/Desktop/Generative AI for Property Management',
    needles: ['generative ai'],
  },
  {
    folder:
      '/Users/ak/Downloads/Refresh/Refresh/Desktop/Property Management Fees by State',
    needles: ['fees by state', 'property management fees'],
  },
]

const mode = process.argv[2] || 'find'

if (mode === 'find') {
  const posts = await client.fetch(
    `*[_type=="post"]{_id,title,"slug":slug.current,"hasCover":defined(coverImage),coverImage{alt,"assetId":asset._ref}} | order(publishedAt desc)`,
  )
  for (const job of JOBS) {
    const hits = posts.filter((p) => {
      const t = (p.title || '').toLowerCase()
      return job.needles.some((n) => t.includes(n))
    })
    console.log('\n===', basename(job.folder), '===')
    if (!hits.length) console.log('NO MATCH')
    for (const h of hits) {
      console.log(
        `${h._id} | ${h.slug} | ${h.title} | cover=${h.hasCover} alt=${h.coverImage?.alt || ''}`,
      )
    }
  }
  process.exit(0)
}

if (mode !== 'apply') {
  console.error('usage: node scripts/update-four-covers.mjs [find|apply]')
  process.exit(1)
}

const posts = await client.fetch(
  `*[_type=="post"]{_id,title,"slug":slug.current,coverImage}`,
)

for (const job of JOBS) {
  const hits = posts.filter((p) => {
    const t = (p.title || '').toLowerCase()
    return job.needles.some((n) => t.includes(n))
  })
  console.log('\n===', basename(job.folder), '===')
  if (!hits.length) {
    console.log('SKIP: no matching post')
    continue
  }

  const file = join(job.folder, 'Attached Image.png')
  const filename = `${hits[0].slug || 'cover'}-cover.png`

  const asset = await client.assets.upload('image', createReadStream(file), {
    filename,
    contentType: 'image/png',
  })
  console.log('uploaded', asset._id, filename)

  for (const h of hits) {
    const alt = h.coverImage?.alt || h.title
    await client
      .patch(h._id)
      .set({
        coverImage: {
          _type: 'image',
          asset: {_type: 'reference', _ref: asset._id},
          alt,
        },
      })
      .commit()
    console.log('patched', h._id, h.slug, h.title)
  }
}

const slugs = [
  ...new Set(
    posts
      .filter((p) =>
        JOBS.some((job) =>
          job.needles.some((n) => (p.title || '').toLowerCase().includes(n)),
        ),
      )
      .map((p) => p.slug),
  ),
]
const check = await client.fetch(
  `*[_type=="post" && slug.current in $slugs]{_id,title,"slug":slug.current,"hasCover":defined(coverImage),"assetId":coverImage.asset._ref,coverImage{alt}}`,
  {slugs},
)
console.log('\nVERIFY')
for (const c of check) {
  console.log(
    `${c._id} | ${c.slug} | hasCover=${c.hasCover} asset=${c.assetId} alt=${c.coverImage?.alt || ''}`,
  )
}
