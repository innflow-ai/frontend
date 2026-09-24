# Adding testimonials to Innflow

Use this guide whenever creating, importing, updating, or selecting testimonial records. The same instructions apply to people working in Studio and agents writing through the API. Studio field descriptions provide the short version.

## What a record represents

One Testimonial record holds one person's attributed story and its card presentation. Reuse that record across pages by reference; do not duplicate it just to place it elsewhere. Search by name and internal label before creating a new record. A genuinely different quote from the same person can have its own record with a distinct internal label.

Use the person's supplied name, role, photographs, and actual feedback about Innflow. Do not invent endorsements, property counts, or results, or copy people and quotes from the visual reference. Leave unknown optional fields empty. Keep the source of the quote and any numerical claim available in the team's source material; the internal label is only a search label.

## Field guide

Length targets below are editorial recommendations, not enforced character limits. Preview the actual card, especially on mobile.

| Studio field | API key | Required? | How to populate it |
| --- | --- | --- | --- |
| Internal label | `title` | No | A searchable label such as `Name — recurring workflows`. Internal only; this is **not** the person's job title or a public headline. |
| Name | `name` | Yes | The person's public display name, using their preferred spelling. Do not add their role or property count here. |
| Title / role | `role` | No | Their supplied professional role, optionally followed by their company. Aim for one short line, such as `Property owner`. Appears beside the avatar in the expanded card. |
| Number of properties | `propertyCount` | No | A confirmed whole number of properties owned. Enter `35`, not `35 properties`. Do not substitute units, doors, or properties managed for properties owned. Leave unknown counts empty; `0` means a confirmed zero. The card supplies the singular/plural label. |
| Portrait photo → image | `portrait` | Yes | A clear photo of the person, ideally a vertical 3:4 composition, at least 720 × 960 px. Use the original sharp photo; the website supplies the gradient and blur. Avoid text baked into the image. Set the crop and hotspot around the face and check the mobile crop. |
| Portrait photo → Alternative text | `portrait.alt` | Yes | A brief factual description, such as `Portrait of [name]`. Do not paste the quote or promotional copy here. |
| Profile avatar | `avatar` | No | A square headshot of the same person, preferably at least 192 × 192 px. Set its hotspot on the face. If omitted, the website makes a square crop of the portrait using its hotspot. No separate blurred image is needed. |
| Card front | `frontStyle` | Defaults to Short quote | Choose `quote` for the short excerpt, or `statistic` for a prominent numerical result. The expanded card still shows the full quote in either case. |
| Statistic → Value | `statistic.value` | When Statistic is selected | A concise, substantiated value, ideally 2–8 characters, including a unit where needed. Format examples only: `8 hrs` or `100+`. Never use an example as a real customer result. |
| Statistic → Description | `statistic.label` | When Statistic is selected | About 2–5 words explaining exactly what the value measures, including its timeframe when relevant. The value and description must make sense together without exaggerating the source. |
| Short quote | `firstQuote` | Yes, even for a statistic card | A complete, faithful excerpt from the customer's feedback. Aim for 8–16 words, roughly 50–100 characters. Preserve meaning and context; do not turn paraphrased marketing copy into an attributed quote. Omit surrounding quotation marks—the component adds its own quotation styling. |
| Full quote | `secondQuote` | No, recommended | The fuller customer statement shown on hover or tap. Aim for 35–65 words; longer copy scrolls inside the expanded card. Preserve the original meaning. Omit surrounding quotation marks. If empty, the short quote is shown here instead. |

The historical keys `firstQuote` and `secondQuote` are intentional: they now mean **Short quote** and **Full quote**. Do not create new `shortQuote` or `fullQuote` CMS fields when importing content.

## Select testimonials for a page

Creating a testimonial does not automatically put it on a page.

1. Complete and publish the Testimonial record when its content is ready.
2. For the Homepage, Rent collection, Landlord banking, Landlord accounting, or Tax preparation, open **Page testimonials**. Edit the existing selection for that page, or create one if none exists. There should be only one selection document per page. The Homepage selection uses `/` and also supplies the scroll-showcase preview.
3. Set **Page**, optionally customize **Section heading**, and add references in **Testimonials**. Drag the references into the desired display order. Four cards are a useful starting point, but the collection supports up to twelve; four is not a requirement.
4. For a route under `/products/`, use that **Product page → Testimonials** field instead. Do not create a Page testimonials document for it.
5. Publish the changed selection or Product page when ready. Both the testimonial and its containing selection must be published to appear on the website.

An empty selection hides the section. Blank headings in Page testimonials fall back to “In their own words.” Product pages currently use that default heading. Publishing changes to a shared testimonial updates it wherever it is referenced; to change only where it appears, edit the page selection.

On Rent collection, this section replaces “See the work in a new light.” and its former process cards. It is not an additional duplicate section.

## Before finishing an entry

- Confirm the name, photo, role, quote, and any numerical claim all belong to the same person and match the source.
- Preview the front: the face is visible, the short excerpt fits, and a statistic reads clearly with its description.
- Hover on desktop and tap **Read story** on mobile: confirm the avatar, profile information, and full quote are legible. Check that the full story can also be opened with the keyboard.
- Verify the selected page, card order, and published state. Draft content does not render on the website. If nothing appears, check publication and selection first; a missing name, portrait asset, or short quote also prevents a card from rendering.

For agent-assisted entry, filling or reviewing records does not by itself authorize publication. Follow the user's requested draft/publish scope and report the actual state.

## Local draft preview

For local layout review, set `SANITY_TESTIMONIAL_PREVIEW=true` in `.env.local` and run the development server with a Sanity token that can read drafts. The testimonial section then uses draft selections. This flag is ignored in production builds. Remove it or set it to `false` to check the published view.
