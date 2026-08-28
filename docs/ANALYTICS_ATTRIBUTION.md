# Analytics and attribution specification

## Implemented contract

- CTA destinations preserve `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`, the original `landing_page`, and the original referrer for the browser session.
- CTA clicks emit `marketing_cta_clicked` with a stable label and destination.
- Lightweight observers emit `marketing_vital_observed` for LCP and CLS where supported.
- Events always dispatch locally as `innflow:analytics` custom events for testing and adapter wiring.
- PostHog loads only after Termly reports analytics consent. That consent is mirrored to `innflow-cookie-consent` so the existing event adapter and runtime share one gate.
- PostHog captures pageviews, web vitals, browser exceptions, rage clicks/autocapture, privacy-masked session replays, and the custom marketing event contract below.
- This repository does not install duplicate analytics or inject stale Framer snippets.

## Event contract

| Event | Trigger | Required properties |
| --- | --- | --- |
| `marketing_cta_clicked` | Primary, secondary external, login, or footer conversion click | `label`, `destination` |
| `marketing_navigation_clicked` | Reserved for future route navigation instrumentation | `label`, `destination` |
| `marketing_vital_observed` | Supported browser performance observer | `metric`, `value`, `path` |

## Handoff requirements before release

The linked Vercel project has `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` configured for Production, Preview, and Development. A new deployment is still required before this integration is live.

1. Confirm that the app-origin receiver retains the query-string attribution passed by marketing CTAs.
2. Merge anonymous and authenticated identities in the app after verified signup.
3. Define one canonical verified-account event for ad conversion; keep activation, workflow deployment, checkout, and purchase separate.
4. Verify cross-domain session behavior and prevent duplicate GA/PostHog installations.
5. Document retention and cookie behavior in approved legal content.

Original session attribution and CTA propagation are implemented on the marketing origin. No claim is made that cross-domain identity merge or paid-ad conversion is complete.
