# Analytics and attribution specification

## Phase C implementation

- CTA destinations preserve `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `msclkid`, and an explicitly supplied `landing_page`.
- CTA clicks emit `marketing_cta_clicked` with a stable label and destination.
- Core Web Vitals observers emit `marketing_vital_observed` for LCP and CLS where supported.
- Events always dispatch locally as `innflow:analytics` custom events for testing and adapter wiring.
- PostHog capture occurs only if an approved loader is present and local consent is exactly `analytics`.
- This repository does not install duplicate analytics or inject stale Framer snippets.

## Event contract

| Event | Trigger | Required properties |
| --- | --- | --- |
| `marketing_cta_clicked` | Primary, secondary external, login, or footer conversion click | `label`, `destination` |
| `marketing_navigation_clicked` | Reserved for future route navigation instrumentation | `label`, `destination` |
| `marketing_vital_observed` | Supported browser performance observer | `name`, `value`, `path` |

## Handoff requirements before release

1. Approve one consent manager and storage contract.
2. Load PostHog only after analytics consent; keep inputs and sensitive product media masked/blocked.
3. Persist original landing page, referrer, and attribution values across the marketing-to-app origin transition.
4. Merge anonymous and authenticated identities in the app after verified signup.
5. Define one canonical verified-account event for ad conversion; keep activation, workflow deployment, checkout, and purchase separate.
6. Verify cross-domain session behavior and prevent duplicate GA/PostHog installations.
7. Document retention and cookie behavior in approved legal content.

No claim is made that cross-domain identity merge or paid-ad conversion is complete in Phase C.
