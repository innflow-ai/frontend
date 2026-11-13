# Website announcement implementation

The root layout now reads the published Sanity singleton `website-announcement`. The disabled legacy offer configuration is no longer the production source. Missing or invalid CMS data renders no announcement. Offers and model releases are independent; an expired offer leaves its model release visible.

## Editorial setup

Deploy the updated Sanity Studio schema, then open **Website announcement**. Set a campaign ID, optional offer and/or model release. Upload the official model/provider icon and enter a new release ID for each release. Keep the master switch off until real content is ready. The component supplies `NEW` and `- Exclusive on innflow`.

Offer deadlines are absolute timestamps. The IANA display timezone changes the readable deadline, not its instant. The offer CTA is used while active; the optional model CTA is used otherwise. Dismissals are keyed by campaign and release IDs.

The existing signed webhook endpoint `/api/revalidate/sanity` accepts `websiteAnnouncement`. Add that type to the configured Sanity webhook filter and include `_type` in its projection for create/update/delete events. Use the existing `SANITY_REVALIDATE_SECRET`. The 60-second cache fallback handles subsequent server requests if webhook delivery is delayed. Open tabs use their loaded campaign snapshot, so a CMS edit does not immediately change an already-open page.

## Preview

`/preview/announcement` contains fixture data, with `?mode=model`, `?mode=offer`, and `?mode=expiry` (10 seconds). The preview is marked noindex. Its deadlines reset on refresh intentionally; published campaigns never do.

## Visual status

Paper nodes `3C-0` and `1JT-0` remain inaccessible. The current blue gradient, hero font pairing, spacing, and corner radius are explicitly provisional implementation values, not extracted Paper measurements. Exact visual acceptance requires inspecting the linked frames. Existing Source Serif 4 and Archivo are used for the provisional mixed headline. No new font family has been guessed or downloaded.

The new primary gradient is shared by existing primary-button consumers. Border and foreground usages were separated from the background token so a gradient cannot become an invalid border/text color. Existing secondary and provider artwork remain intact.

## Release state

No live campaign has been created or enabled. No Studio or website deployment has been performed. Required before activation: deploy Studio and website, configure the webhook type filter, verify desktop/mobile against Paper, supply real content, then enable in Sanity. Disable the CMS switch to roll back announcement visibility on subsequent page loads.

## Verification

- 38 targeted tests passed across announcement rendering, legacy regressions, header, analytics, CMS loading and webhook handling. Tests use `NODE_OPTIONS=--no-experimental-webstorage` with the current Node runtime.
- Website and Studio typechecks passed. Production build passed.
- New files pass Biome checks; repository-wide lint reports 29 existing errors in untouched files.
- Browser screenshot verification and exact Paper comparison have not been completed because browser/Paper access is unavailable.
