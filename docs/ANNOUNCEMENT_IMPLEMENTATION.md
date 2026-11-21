# Website announcement implementation

The root layout now reads the published Sanity singleton `website-announcement`. The disabled legacy offer configuration is no longer the production source. Missing or invalid CMS data renders no announcement. Offers and model releases are independent; an expired offer leaves its model release visible.

## Editorial setup

Deploy the updated Sanity Studio schema, then open **Website announcement**. Set a campaign ID, optional offer and/or model release. Upload the official model/provider icon and enter a new release ID for each release. Keep the master switch off until real content is ready. The component supplies `NEW` and `- Exclusive on innflow`.

Offer deadlines are absolute timestamps. The IANA display timezone changes the readable deadline, not its instant. The offer title and optional model title link independently to their configured destinations. Dismissals are keyed by campaign and release IDs.

The existing signed webhook endpoint `/api/revalidate/sanity` accepts `websiteAnnouncement`. Add that type to the configured Sanity webhook filter and include `_type` in its projection for create/update/delete events. Use the existing `SANITY_REVALIDATE_SECRET`. The 60-second cache fallback handles subsequent server requests if webhook delivery is delayed. Open tabs use their loaded campaign snapshot, so a CMS edit does not immediately change an already-open page.

## Preview

`/preview/announcement` contains fixture data, with `?mode=model`, `?mode=offer`, and `?mode=expiry` (10 seconds). The preview is marked noindex. Its deadlines reset on refresh intentionally; published campaigns never do.

## Approved design

The approved visual source is [Figma frame 351:24439](https://www.figma.com/design/PYDAg6cwYXTJb6dpWuPLYF/innflow-web?node-id=351-24439). [Button 354:5843](https://www.figma.com/design/PYDAg6cwYXTJb6dpWuPLYF/innflow-web?node-id=354-5843) supplies the shared primary gradient: `#5AAAF8` to `#0C99FF`, with a fine `#0680C2F2` border. This replaces the provisional Paper measurements. Microsoft remains charcoal with inset and drop shadows.

The hero uses Archivo 600 italic and Source Serif 4 400 italic at up to 84px, with Host Grotesk controls/body and Instrument Sans showcase titles. Neutral hero surfaces, 40px hero corners, 24px outer gutters and the existing animated product showcase are retained. The initial desktop stage is capped at the reference 686px height while still expanding on scroll. The functional navigation remains visible, occupying part of the reference's top whitespace; the approved Figma composition has it obscured behind the hero.

The announcement is a compact 40px desktop strip with a pink offer pill, tabular `DD:HH:MM:SS` countdown, and dark model badge. Offer and model names link to their respective CMS destinations independently. Click the countdown to switch to its exact deadline. On small screens badges wrap and actions stack without clipping. The white navigation surface reveals the blue backing through 28px upper corners.

Clock and sparkle assets were exported from the approved frame. Provider imagery remains dynamic CMS content. The header uses the canonical bold Dropbox wordmark, preserving its aspect ratio. No fake model launch or offer is enabled in production.

## Release state

No live campaign has been created or enabled. No Studio or website deployment has been performed. Required before activation: deploy Studio and website, configure the webhook type filter, verify published CMS content, supply real content, then enable in Sanity. Disable the CMS switch to roll back announcement visibility on subsequent page loads.

## Verification

Desktop (1461px), mobile (400px), and narrow mobile (320px) were visually checked in the browser against the approved frame. Browser checks used temporary local fixture data; the root layout was restored to its real Sanity loader afterward. Production campaigns always use absolute CMS deadlines.

Automated checks cover offer expiry, model persistence, schedule handling, dismissal, blocked storage, deadline mode, CMS validation, webhook invalidation, navigation, and the retained scroll behavior. Final results: 61 tests passed across 10 files; website and Sanity Studio typechecks passed; production build passed; focused Biome checks passed. One navigation test was corrected to wait for its lazy-loaded Resources panel.
