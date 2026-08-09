# Migration and cutover plan (not executed)

## Current boundary

- The standalone repository owns future public marketing rendering.
- `app.innflow.ai` remains the authenticated product origin.
- Framer remains live and untouched.
- No deployment, DNS, publishing, content deletion, or Framer removal is authorized.

## Code preparation completed

- Minimum supporting marketing, feature, demo, integration, pricing, and legal routes.
- Page-specific metadata, social image, structured data, sitemap, robots, manifest, and plain-text discovery.
- Session attribution capture and CTA propagation.
- Fresh 383-URL sitemap inventory with an explicit proposed disposition per URL.
- Permanent redirects for direct replacements.
- Local route, responsive, accessibility, bundle, and Lighthouse evidence.

## External approvals and release prerequisites

1. Approve ICP, buyer, demo motion, primary CTA destination, and public product statuses.
2. Approve legal entity and substantive privacy, terms, and cookie content.
3. Add analytics landing-page, backlink, and indexed-URL evidence to the current sitemap inventory.
4. Approve every `hold-legacy` and `retire-410` disposition.
5. Approve consent loading and verify attribution/identity receipt on the app origin.
6. Review the generated social card and page metadata.
7. Repeat the local quality gate on a private preview and complete manual assistive-technology/device checks.

## Preview review

- Use a non-production origin and prevent accidental canonical/index conflicts.
- Test at 360, 768, 1024, 1440, and wide desktop.
- Capture approved screenshot evidence only after deployment authorization.
- Verify no environment or authenticated product dependency is required.
- Confirm preview labels, legal wording, customer proof, integration statuses, and demo destination with owners.

## Cutover sequence

1. Freeze approved content and redirect map.
2. Lower DNS TTL only after explicit authorization.
3. Rehearse redirects and rollback on the preview infrastructure.
4. Deploy the approved build without changing DNS.
5. Run smoke tests and record artifact/version identifiers.
6. Change DNS in a separately authorized window.
7. Monitor errors, traffic, attribution, signups, canonical/index behavior, and redirect coverage.
8. Keep Framer recoverable through the agreed rollback window.

## Rollback

- Restore the previous DNS target.
- Keep Framer project and content intact until rollback expiry.
- Preserve the deployed artifact and incident evidence for diagnosis.
- Do not delete redirects or content during rollback triage.

This document is preparation only; no migration action has occurred.
