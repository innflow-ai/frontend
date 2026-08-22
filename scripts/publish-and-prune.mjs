// Publish every drafts.post-* document and prune the "all" tag artifact.
// Re-runnable: already-published posts are skipped; tag pruning is idempotent.
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const token = readFileSync(join(root, '.env.local'), 'utf8')
  .match(/^SANITY_API_TOKEN=(.+)$/m)[1]
  .trim()

const client = createClient({
  projectId: 'hnjg8vum',
  dataset: 'production',
  apiVersion: '2026-08-22',
  token,
  useCdn: false,
  perspective: 'raw', // sees drafts.* and published docs with their real ids
})

const drafts = await client.fetch(`*[_id in path("drafts.**")]{_id}`)
console.log(`found ${drafts.length} drafts to publish`)

let published = 0
for (const d of drafts) {
  const publishedId = d._id.replace(/^drafts\./, '')
  const doc = await client.getDocument(d._id)
  if (!doc) continue
  delete doc._id
  delete doc._rev
  delete doc._createdAt
  delete doc._updatedAt
  await client.createOrReplace({_id: publishedId, ...doc})
  await client.delete(d._id)
  published++
  if (published % 20 === 0) console.log(`  published ${published}/${drafts.length}`)
}
console.log(`published ${published}`)

// Prune the Framer "all" tag artifact
const tagged = await client.fetch(`*[_type == "post" && "all" in tags]{_id, tags}`)
console.log(`found ${tagged.length} posts with the "all" tag`)
let pruned = 0
for (const p of tagged) {
  const next = p.tags.filter((t) => t !== 'all')
  await client.patch(p._id).set({tags: next}).commit()
  pruned++
}
console.log(`pruned ${pruned}`)
