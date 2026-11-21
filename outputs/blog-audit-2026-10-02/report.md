# Innflow Notion blog audit
Snapshot: 2 October 2026, local date. Source: [Blog Pipeline](https://app.notion.com/p/3b90ac1bd32e80b5afbdf647511969a9).

## Coverage and limits
All 1,122 records were retrieved through the unfiltered Blog-Kanban view, with pagination completed and 1,122 unique URLs. All properties and the 926 nonempty draft_blog fields received automated screening. Selected article text and heading structures received editorial review; page bodies were fetched for all 11 integration tutorials, the JEV tutorial, and one newly collected source idea. This is not a claim that every article received a line-by-line fact check. Notion statuses are not proof of current website publication. Search Console, traffic, conversions, deployed HTML, Sanity content and artwork pixels were not audited.

SQL hit its workspace usage limit. The documented unmetered view mode completed the inventory successfully. No Notion record, CMS entry, publishing status or website code was changed.

## Inventory
| Status | Records |
|---|---:|
| Archived | 710 |
| Draft | 166 |
| Pending | 128 |
| Posted / CMS Live | 78 |
| Queued | 22 |
| Not started | 15 |
| In-Prog | 3 |
| Total | 1,122 |

There are 412 non-archived records, including 78 marked live and 334 others. Keep the archived library separate from the current production backlog.

## Highest-value changes
1. **Refresh the positioning of broad articles already marked live.** All 78 live records have property/multifamily audience metadata. Some are intentionally property-specific and should stay that way. Broad comparison articles such as [Zapier vs n8n](https://app.notion.com/p/3d50ac1bd32e8129a9fbec71a5bc5c58) repeatedly pivot to leasing, PMS tools and Fair Housing. General comparisons should answer the broad buyer question first, with property examples as an optional vertical section. Across the active inventory, 51 AI or uncategorized records have property audience metadata.
2. **Finish the 11 integration tutorials.** All 11 have page-body editorial briefs and empty draft_blog fields. Ten have desktop and story attachments; Google Forms has neither in those fields. Artwork presence does not verify its quality. These are useful, concrete topics: turn each brief into one tested workflow with prerequisites, real setup screenshots, sample input, observed output, failure handling and a reusable checklist.
3. **Replace planning descriptions.** 155 active records match templated/planning descriptions, including 66 of the 78 marked live. Examples include “Angle for an innflow post...” and generic “operator playbook” summaries. Use a specific reader-facing promise and align it with the metadata embedded in the article and the actual CMS field. This is a Notion inconsistency, not proof that those descriptions appear on the live site.
4. **Consolidate repetitive source collection before drafting.** 153 active rows use one of four broad keyword values. Eleven use repeated headline templates about model rankings or everyday business operations. There are no exact duplicate nonempty slugs or titles among active records, but that does not rule out overlapping intent. Treat leaderboard pages as research sources for a maintained model-selection guide unless a new article has a genuinely different question.
5. **Verify product claims and refresh comparisons.** 95 active draft fields mention AES-256, zero data retention or private deployment; eight are marked live. These are review candidates, not findings that all claims are false. The n8n/Dify draft, for example, groups transit and at-rest encryption under AES-256 and promises retention/deployment behavior without evidence in the surrounding paragraph. Replace blanket claims with documented, scoped statements. Competitor capabilities and pricing also need dated primary sources before revision.
6. **Clean up production metadata.** Active records include 30 titles containing ellipses, 26 without slugs and 35 without an author in either author field. There are 216 without desktop attachments and 244 without story attachments. Story art is needed only for planned story distribution. Empty draft fields in 184 active rows may indicate briefs or page-body content rather than lost articles.

## Specific editorial improvements
| Article or group | Recommended change |
|---|---|
| Slack daily digest | Suggested title: “Build a Daily Slack Digest with Innflow.” Show input threads and a source-linked digest; test duplicate and empty updates. |
| Google Sheets tutorial | Demonstrate stable row IDs, validation, retries and duplicate protection with a small sample sheet. |
| Gmail tutorial | Show classification and a reviewable reply draft; document the actual permission and approval steps. |
| Google Forms tutorial | Verify the supported intake path, create artwork, and demonstrate routing plus incomplete responses. |
| GitHub PR briefs | Show a real sample diff, summary and review questions; distinguish generated suggestions from verified test results. |
| JEV tutorial | Preserve its unusually specific brief: enabled-workspace prerequisite, actual AI Decision configuration and separate review outcomes. Capture a hosted run before making the walkthrough publishable. |
| “What Is an AI Agent?” | Keep the clear ops example; soften categorical claims that chatbots cannot retain context or that an agent must be a workflow step. Add a compact comparison table and a worked example. |
| “Make vs an AI Agent Builder” | Compare current verified capabilities and one shared example. Avoid presenting scenario tools and agent builders as mutually exclusive categories. |
| Model rankings/news | Identify exact model, version, publication date, benchmark source and practical task. Avoid creating multiple generic posts that answer the same question. |
| Property guides | Keep the vertical focus where intentional. Add jurisdiction/date and primary sources for legal claims, and deliver any promised downloadable checklist or dataset. |

## Recommended order
First reconcile live descriptions and broad positioning, prioritizing pages with actual search traffic once analytics are available. In parallel editorial planning, finish the integration series starting with Slack, Gmail and Sheets. Then triage generic benchmark/source ideas into distinct briefs or research inputs. Leave archived material alone unless traffic, backlinks or a specific editorial need justify revisiting it.

Use the accompanying CSV to filter by status, priority and finding. Its row-level actions are screening recommendations, not automatic instructions to publish, delete or merge records.

## Editorial standard
Prefer original demonstrations, documented evidence, concise answers and useful internal links. Do not pad every post to 2,000–3,000 words or force a keyword frequency. Google recommends helpful, reliable, people-first content; unique article summaries also give search systems better descriptive material. See [Google's content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [snippet guidance](https://developers.google.com/search/docs/appearance/snippet).

Local skill used: /Users/ak/.codex/skills/blog-format/SKILL.md. Its Sanity destination and HTML conventions are relevant; length and repetition targets were treated as editorial guidance rather than ranking requirements.

