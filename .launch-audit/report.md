# Innflow launch-readiness baseline

Audited locally on August 22, 2026 against the running homepage on port 3001 and a production build served temporarily on port 3101.

## Verdict

The site is technically healthy enough for continued launch preparation, but it is not ready for a public cutover yet. Routing, metadata, responsive layout, and the production build all work. The highest-risk gaps are unverified social-proof claims, a provisional demo/contact journey, an over-budget production JavaScript payload, and missing response security headers.

## Flow evidence

1. **Desktop homepage — healthy visual foundation**
   - Evidence: `01-home-desktop-top.png` and `01-home-desktop.png`
   - The hero is clear, the primary and secondary calls to action are visible, and the page establishes a coherent visual hierarchy.
   - Risk: the `2,400+ property teams` statement and avatar proof are not supported by the repository's claim-verification matrix.

2. **Mobile homepage — healthy responsive layout**
   - Evidence: `02-home-mobile-top.png` and `03-home-mobile-full.png`
   - The hero, feature cards, property cards, FAQ, CTA, and footer reflow without observed horizontal overflow.
   - Accessibility limit: screenshots do not prove contrast, zoom resilience, screen-reader output, or full keyboard behavior.

3. **Mobile navigation — functional**
   - Evidence: `04-mobile-menu.png`
   - The menu opens, exposes the expected routes, uses an expanded state, and provides a close control.

4. **Demo conversion path — launch blocker**
   - Evidence: `05-demo-mobile.png`
   - The route works, attribution parameters are retained, and the page is responsive.
   - The page explicitly calls the contact path provisional, says ownership awaits approval, and falls back to email. This is internal release language presented to prospects.

5. **Desktop product navigation — needs interaction regression testing**
   - Evidence: `06-desktop-product-menu.png`
   - The Product trigger receives focus, but a click did not leave the panel visibly open in the captured state. Hover and keyboard behavior need a dedicated pass before launch.

## Verified checks

- Lint passes.
- Type checking passes.
- 10 of 10 automated tests pass.
- Next.js 16.3.0 production build completes successfully.
- All 17 required public endpoints pass status, title, description, canonical, H1, internal-link, and Preview-label checks against both the development and production servers.
- No browser console warnings or errors were observed in the reviewed homepage flow.
- No third-party script loads before consent in the production bundle check.
- Production CSS is within budget at 16,683 bytes gzip.

## Launch blockers and risks

1. **Critical — unsupported public proof.** The homepage publishes `2,400+ property teams`, customer-logo-style marks, and four named testimonials with outcome claims. The repository's own claim matrix says customer counts, logos, and testimonials must be removed until authorized.
2. **High — incomplete conversion destination.** Every primary CTA resolves to a demo page whose final action is a provisional `mailto:` link. Scheduling/CRM ownership, destination monitoring, and receiving-system attribution remain unverified.
3. **High — production JavaScript exceeds the documented exception ceiling.** The measured homepage payload is 241,420 bytes gzip versus a 184,320-byte ceiling.
4. **Medium — release copy leaks internal status.** Interior footers include `Standalone preview · not deployed`; the demo and pricing language repeatedly refers to approvals and provisional status.
5. **Medium — response hardening is absent at the application layer.** The local production response did not include a Content Security Policy, frame protection, or related security headers. Hosting-layer policy may still provide these, but no deployment configuration is present here to verify it.
6. **Medium — build warnings.** `@sanity/image-url` uses a deprecated default export, and static generation emits a Node localStorage experimental warning.
7. **Medium — cutover remains unverified.** No deployment target, preview URL, DNS state, domain ownership, redirect cutover, analytics consent integration, cross-domain attribution receiver, or monitored support destination was verified in this run.

## Evidence limits

This baseline does not claim WCAG compliance. Manual keyboard coverage, VoiceOver, 200% zoom, real-device testing, legal approval, proof authorization, CRM delivery, field Core Web Vitals, and production DNS/hosting behavior remain open.

## Vercel and domain state

Checked live on August 22, 2026:

- `innflow.ai` uses Vercel nameservers: `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- The public site is still served by Framer. The apex resolves to `31.43.161.6` and `31.43.160.6`; `www.innflow.ai` points to `sites.framer.app` and redirects to the apex.
- This means the domain does not need to be transferred away from Vercel for launch. The eventual cutover is a DNS/project-alias change inside Vercel after a preview deployment is verified.
- The local repository has no `.vercel` project link, and Vercel CLI 59.1.4 is currently logged out.
- GitHub exposes no Vercel deployments or check runs for `innflow-ai/frontend` on the current `main` commit, so Git integration could not be confirmed from the repository side.
- No DNS record, project link, deployment, alias, or production state was changed during this audit.
