# Innflow marketing frontend

Standalone Next.js App Router frontend for Innflow's property-management homepage vertical slice.

This repository is operationally separate from the authenticated product app. It does not import product code, use Prisma, require workflow-runtime variables, deploy infrastructure, alter DNS, or change the current Framer site.

## Phase status

- Phase A: discovery and content-truth documents complete.
- Phase B: semantic design tokens and shared homepage primitives complete.
- Phase C: responsive homepage vertical slice complete.
- Phase D: not started. Supporting routes, full legacy URL inventory, redirects, preview deployment, cutover, and rollback execution remain approval-gated.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

The production output is served locally with:

```bash
npm run start
```

## Configuration

All cross-origin destinations are centralized in `src/config/site.ts` and may be overridden with:

- `NEXT_PUBLIC_MARKETING_ORIGIN`
- `NEXT_PUBLIC_APP_ORIGIN`
- `NEXT_PUBLIC_SIGNUP_URL`
- `NEXT_PUBLIC_DEMO_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

The provisional demo URL defaults to a pre-addressed email to `support@innflow.ai`. Replace it only after a scheduling or contact destination is approved.

## Deployment instructions (approval-gated)

No deployment was performed. When explicitly authorized:

1. Create a preview deployment from this repository with the environment values above.
2. Run the quality gate and browser review against the preview origin.
3. Complete the legal-content, link, metadata, consent, analytics, and redirect audits.
4. Approve `docs/REDIRECT_MATRIX.md` and `docs/MIGRATION_PLAN.md`.
5. Keep Framer live while preview review and rollback rehearsal are completed.
6. Schedule DNS cutover separately; do not remove Framer until monitoring confirms the new origin and rollback window are healthy.

## Source provenance

Approved logo and product media were copied into `public/` from read-only sources listed in `docs/DISCOVERY.md`. Third-party reference screenshots remain untouched in `output/playwright/` and are not shipped as site assets.
