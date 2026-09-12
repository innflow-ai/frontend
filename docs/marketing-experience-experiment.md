# Marketing experience v1

Status: implemented locally; production routing remains off. No production deployment or real registration was performed by this task.

- [PostHog draft experiment 463449](https://us.posthog.com/project/342660/experiments/463449)
- [Monitoring dashboard 2088271](https://us.posthog.com/project/342660/dashboard/2088271)
- [PostHog custom exposure integration](https://posthog.com/docs/experiments/running-experiments-without-feature-flags)

## Behavior

The website assigns `control` (original) or `new` on the first non-prefetch marketing request. A signed, HttpOnly, host-only `innflow-experience` cookie keeps the assignment for 90 days without an analytics identity. Unknown/expired cookies are replaced; a missing signing secret fails to the original site without measurement. Bots and `innflow-experiment-exclude=1` visitors get control and no experiment exposure.

`src/lib/marketing-experience.ts` owns the public route manifest. Home, pricing, and demo have variant-specific behavior. Control demo redirects to Cal.com; new demo renders the existing demo component. The original header/footer surround control; the current header/CTA/footer surround new. Other content is shared, including pages available only under `/BL/`. Equivalent `/BL/` URLs redirect to public URLs while preserving search and hash. Legal aliases always use the canonical shared policy documents. New portfolio links use the shared property-management page because the new homepage has no portfolios anchor.

All experiment documents are dynamic and marked private/no-store. Full-document navigation keeps page and shell consistent and applies mode changes on the next navigation. Mode `off` retains the pre-experiment site; it is different from forcing the fully original experience with `control`.

## Consent and account attribution

Assignment does not call PostHog. After Termly grants analytics consent, the website mirrors the choice in `innflow-analytics-consent` for `.innflow.ai`. A same-origin POST creates a signed HttpOnly `innflow-experiment-attribution` cookie shared with the app, containing the anonymous PostHog ID, variant, and exposure timestamp. It expires after seven days. These are first-party cookies; the experience cookie's consent classification must be represented correctly in the site's consent configuration before production enrollment.

Exposure is emitted only after the handoff succeeds and the page is rendered. Failed handoffs are observable as `marketing_experience_handoff_failed`; they do not silently enter the experiment denominator. No IDs are added to signup URLs or sent to Cal.com. Revocation clears attribution and suppresses pending exposure. The app rejects missing, invalid, revoked, QA, disabled, and older-than-seven-day attribution.

The app account-creation hook queues `marketing/signup.completed` independently of CRM delivery. Its Inngest worker emits `$identify` linking the anonymous ID, then `signup_completed` under the new account ID. Stable UUIDs and original account-creation timestamps make worker retries deduplicable. Login never invokes this hook. Existing `user_registered` and `auth_completed` events are not used as the primary conversion.

Queue submission failure is logged and does not fail signup; if the initial submission fails before Inngest accepts it, that conversion can be missing. Monitor `[marketing-signup] enqueue failed` and stop interpreting results if losses are material. No database migration was introduced.

## Configuration and launch

Website:

```dotenv
MARKETING_EXPERIENCE_MODE=off
MARKETING_EXPERIENCE_SECRET=<server-only random secret, at least 32 characters>
```

App (branch `feat/marketing-experience-attribution`; deployment notes in its `MARKETING_EXPERIENCE.md`):

```dotenv
MARKETING_EXPERIENCE_MEASUREMENT_ENABLED=false
MARKETING_EXPERIENCE_SECRET=<same server-only secret>
```

Both deployments must use the same intended PostHog project (342660) and correct host. Never expose the HMAC secret through `NEXT_PUBLIC_`. Review both repository diffs separately; the website already had unrelated staged work. The app checkout's installed packages are stale (Inngest 3.54.2 vs declared 4.19.0), so restore its lockfile-consistent dependencies before its full CI checks. Do not run its `build` script casually: it also deploys database migrations.

1. Deploy both changes with website mode off and app measurement disabled. Register the new Inngest function with the existing app integration.
2. In development or a Vercel preview, use `?experience=control` and `?experience=new`; these persist QA assignment across navigation and never enter experiment results. Preview queries are ignored in production.
3. Validate Google and email/OTP registration in a staging environment that supports the shared domain cookie. Assert one completion per new account, matching exposure/variant, and no completion for existing-account login. Test denied/revoked consent and queue retry. Do not use the production auth service for automated registration tests.
4. Confirm the consent setup, production PostHog project match, app worker availability, and both site versions. Add `innflow-experiment-exclude=1` on staff browsers (domain `.innflow.ai`, path `/`) before production checks.
5. Establish a trustworthy baseline. If historical completion attribution is insufficient, use a separately excluded calibration experiment/version for seven days. Do not prepopulate the live experiment with a control-only baseline.
6. Calculate the sample target with `node scripts/marketing-experience-sample-size.mjs <baseline-rate> <eligible-consenting-visitors-per-day>`. Record the target and launch date in the experiment description.
7. Enable app measurement, launch the PostHog experiment, then set website mode to `experiment`. Local routing controls allocation; a PostHog flag toggle alone does not change the website.

## Measurement and stopping

Primary metric is unique exposed people completing `signup_completed` within seven days. Saved PostHog settings use frequentist statistics, alpha 0.05, no sequential testing, and a seven-day conversion window. Secondary metrics are auth-page visits and onboarding completion. The dashboard shows daily exposed visitors, signup counts, attribution failures, visitors with errors, signup CTA clicks, and p75 landing-page LCP by variant. Daily counts are monitoring signals, not the final conversion-rate comparison. Use PostHog's experiment readout for the decision.

Use at least 14 days, the calculated sample target (20% relative MDE, 80% power), and at most 42 enrollment days. Stop enrollment and wait seven days for outcomes to mature. A sample shortfall or uncertain result is inconclusive. Exclude people seen in both variants. Keep designs stable; material changes need a new version. Results only describe consenting, successfully attributed visitors; consent/attribution selection can bias the comparison.

Emergency rollback: set website mode `control`, pause the PostHog experiment, and disable app measurement if ingestion itself is faulty. Saved `new` cookies cannot override forced control. Keep the app worker running during an ordinary seven-day maturation period. Publishing a winner is a separate deliberate action, never automatic.

## Verification

Website focused tests cover signing, expiry, tampering, route aliases, QA/production isolation, bots/staff/prefetch, forced rollback, consent withdrawal, failed handoffs, and exposure deduplication. App tests cover signed attribution, seven-day expiry, consent rejection, stable event IDs, identity linking, and queue failures. Browser checks cover both homepages at 1440px/390px, pricing, shared blog pages, main-region counts, and persistent assignment. Local preview has production PostHog disabled.


Verification on September 11, 2026: all 137 website tests passed, with subsequent focused reruns after final changes; website TypeScript passed. An isolated production webpack build passed after scoping a pre-existing advisors-page CSS selector to `.page`. Both mobile navigation menus opened and closed; clicking Pricing retained the assigned new experience. Final browser navigation reported no page errors. Existing Termly script-order and image-sizing warnings remain; validate the consent configuration before launch. Screenshots are saved under `output/playwright/marketing-experience/`.

The app's 17 focused tests cover attribution, consent, automatic-event withdrawal, independent flag evaluation, identity, and Google OAuth entry. Focused TypeScript against the declared Inngest SDK passed. Full app typecheck is not clean due to existing dependency/generated-type mismatches; no production signup or end-to-end worker delivery was exercised.
