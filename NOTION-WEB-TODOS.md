# Innflow Web — Notion to-dos

Snapshot: 2026-09-06 (America/New_York).

Source: [Notion — [TO DO] Tasks](https://app.notion.com/p/4aa085c70dd648479d9d5346b752e8a3).

Scope: all named tasks with Area = `Innflow Web`, Status other than `Complete`, and `Done?` unchecked. This is a snapshot of Notion task records, not a fresh audit of the website or implementation. Descriptions and actions are preserved from Notion, including historical references.

Total: **23 open tasks** (21 To Do; 2 Backlog).

## P0 — 8 tasks

### Demo: Replace provisional email contact path with approved scheduling flow

- [ ] [Demo: Replace provisional email contact path with approved scheduling flow](https://app.notion.com/3c50ac1bd32e81e9a161d38aeb4d8660)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Growth & Lifecycle
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

The demo page publicly describes its contact path as provisional and sends prospects to support email.

**Resolution actions**

Connect the approved calendar, CRM form, or lead-routing flow; add confirmation and failure states; remove internal approval language; verify attribution and conversion tracking.

### Homepage: Complete mega-menu icon mapping and interaction polish

- [ ] [Homepage: Complete mega-menu icon mapping and interaction polish](https://app.notion.com/3c50ac1bd32e81968b67d6ca706fe40f)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Complete the approved icon-to-menu-item mapping and polish every mega-menu state.

**Resolution actions**

Map each retained menu item to a confirmed SVG; resolve uncertain and duplicate variants; normalize icon scale/alignment; verify hover, open, close, submenu, and back behavior on desktop, tablet, and phone.

### Homepage: Complete responsive and interaction QA

- [ ] [Homepage: Complete responsive and interaction QA](https://app.notion.com/3c50ac1bd32e81ccb22ac630e594d68a)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Test the full homepage and navigation at representative desktop, tablet, and phone sizes.

**Resolution actions**

Verify responsive reflow, touch targets, focus states, menu transitions, submenu/back controls, hover behavior, active states, and overflow at desktop, tablet, and phone breakpoints.

### Homepage: Refine layout and visual hierarchy across sections

- [ ] [Homepage: Refine layout and visual hierarchy across sections](https://app.notion.com/3c50ac1bd32e81049a21c666c0771d76)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Polish homepage structure, spacing, alignment, and hierarchy at all supported breakpoints.

**Resolution actions**

Review section order; normalize containers, grids, gaps, and vertical rhythm; correct awkward text wrapping, excessive whitespace, clipping, and breakpoint-specific layout issues.

### Homepage: Separate signup and demo CTA destinations

- [ ] [Homepage: Separate signup and demo CTA destinations](https://app.notion.com/3c50ac1bd32e8182a0bae663b03d6c1a)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Growth & Lifecycle
- **Work type:** Bug / Incident
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Signup and demo calls to action currently resolve through the same generic app destination, blurring two different user intents.

**Resolution actions**

Set the signup CTA to the approved account-creation route and demo CTAs to the approved scheduling or lead-capture route; verify tracking labels and every header, hero, pricing, and footer CTA.

### Homepage: Verify or replace unsupported trust claims and testimonials

- [ ] [Homepage: Verify or replace unsupported trust claims and testimonials](https://app.notion.com/3c50ac1bd32e8167b18df0f7cb64bfcb)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Content & Brand
- **Work type:** Content
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

The homepage contains named testimonials, a 4.6/5 rating, and a 2,400+ teams claim that require source approval before launch.

**Resolution actions**

Obtain approved customer sources and permission for every name, quote, portrait, logo, rating, and customer-count claim; otherwise replace with approved evidence or remove the section.

### Website: Gate third-party scripts behind consent

- [ ] [Website: Gate third-party scripts behind consent](https://app.notion.com/3c50ac1bd32e818695e1fce1c3ae6316)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Integrations & Automation
- **Work type:** Bug / Incident
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

The live bundle audit detects the Termly resource-blocker script before consent despite a zero-script-before-consent budget.

**Resolution actions**

Review consent-manager bootstrap requirements; ensure nonessential analytics and marketing scripts do not initialize before consent; verify with network inspection and the live bundle audit.

### Website: Reduce initial JavaScript bundle below performance ceiling

- [ ] [Website: Reduce initial JavaScript bundle below performance ceiling](https://app.notion.com/3c50ac1bd32e81d7b231db03d2f1d31d)
- **Status:** To Do
- **Priority:** P0
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

The live homepage ships about 242 KB of initial JavaScript gzip, above the repository's 180 KB exception ceiling.

**Resolution actions**

Profile production chunks; reduce client-component boundaries and animation/icon payloads; lazy-load noncritical behavior; rerun the live bundle audit until JavaScript is at or below 180 KB gzip.

## P1 — 6 tasks

### Blog: Add pagination and clean up off-topic legacy posts

- [ ] [Blog: Add pagination and clean up off-topic legacy posts](https://app.notion.com/3c50ac1bd32e8192afb1f43378b0bb4c)
- **Status:** To Do
- **Priority:** P1
- **Area:** Innflow Web
- **Category:** Content & Brand
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

The blog index renders the complete archive in one very long page and the sitemap includes legacy topics outside the property-operations positioning.

**Resolution actions**

Add pagination or load-more; limit the initial query; define topical inclusion rules; redirect, archive, or update off-topic posts while preserving valid SEO equity.

### Homepage: Standardize typography and component styling

- [ ] [Homepage: Standardize typography and component styling](https://app.notion.com/3c50ac1bd32e81358785e532e8ebc60b)
- **Status:** To Do
- **Priority:** P1
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Bring headings, body copy, buttons, cards, borders, radii, and repeated components into one consistent system.

**Resolution actions**

Audit repeated styles and components; normalize typography, button states, card treatments, borders, and radii; replace any outdated Innflow logo asset with the canonical bold Dropbox logo.

### Mega menu: Replace generic destinations with specific routes or anchors

- [ ] [Mega menu: Replace generic destinations with specific routes or anchors](https://app.notion.com/3c50ac1bd32e8126a3fac3e0d3c6e8ba)
- **Status:** To Do
- **Priority:** P1
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Multiple distinct mega-menu items currently share broad destinations, reducing information scent and making labels feel non-actionable.

**Resolution actions**

Give each item the most specific approved page or section anchor available; add missing destination pages only when approved; verify desktop and mobile routes and active-state behavior.

### Update privacy disclosures for Slack data, AI providers, and subprocessors

- [ ] [Update privacy disclosures for Slack data, AI providers, and subprocessors](https://app.notion.com/3d20ac1bd32e81228976ff05bd087be0)
- **Status:** To Do
- **Priority:** P1
- **Area:** Innflow Web
- **Category:** AI & Platform
- **Work type:** Content
- **Reference:** [Source link](https://app.slack.com/app-settings/T09SE67M4AC/A0BV4DTM222/submission/security)

**Description**

Align the published privacy notice with actual Slack and AI data processing before Marketplace submission.

### Website: Rewrite internal validation copy for customers

- [ ] [Website: Rewrite internal validation copy for customers](https://app.notion.com/3c50ac1bd32e81beae3affbcaead9e0b)
- **Status:** To Do
- **Priority:** P1
- **Area:** Innflow Web
- **Category:** Content & Brand
- **Work type:** Content
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Several live pages expose internal phrases such as provisional, await approval, this homepage positions, and requires separate product validation.

**Resolution actions**

Keep product boundaries accurate while rewriting copy in customer-facing language; remove implementation notes and internal decision context from marketing pages and FAQs.

### Website: Run final launch-quality, accessibility, and performance pass

- [ ] [Website: Run final launch-quality, accessibility, and performance pass](https://app.notion.com/3c50ac1bd32e81d19f61e80ad2eccac9)
- **Status:** To Do
- **Priority:** P1
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-08-23
- **Reference:** [Source link](https://innflow.ai)

**Description**

Complete a site-wide readiness pass after visual polishing.

**Resolution actions**

Review image sharpness and weight, contrast, semantic headings, accessible labels, keyboard focus, motion behavior, console or lint issues, metadata, link health, and the correct Framer branch/publication state.

## P2 — 8 tasks

### Add 50% off limited-time offer popup on website landing

- [ ] [Add 50% off limited-time offer popup on website landing](https://app.notion.com/3d20ac1bd32e81dab43acc84f3e7d4aa)
- **Status:** To Do
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** Growth & Lifecycle
- **Work type:** Feature

**Description**

Show an Innflow-branded 50% off special promotion when visitors land on the webpage, inspired by the supplied Fish Audio popup.

**Resolution actions**

1. Define promotion start/end dates, eligible plans, discount duration, and redemption destination.
2. Design a branded modal using the supplied reference: “Limited-time offer”, prominent “50% off”, and “Claim 50% Off” CTA.
3. Show on landing; add accessible dismissal, keyboard support, mobile layout, and dismissal frequency control.
4. Connect the CTA to the valid promotion and disable the popup after expiry.
5. Verify landing trigger, discount redemption, dismissal, expiry, and desktop/mobile display.

### Design inspo: check Refero OFF+BRAND style + similar sites

- [ ] [Design inspo: check Refero OFF+BRAND style + similar sites](https://app.notion.com/3d20ac1bd32e8135abeac54de845c97a)
- **Status:** To Do
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Research / Planning
- **Reference:** [Source link](https://styles.refero.design/style/6b667ffc-5158-4000-9252-3a107d5161ee)

**Description**

Review Refero OFF+BRAND board and similar agency sites (Active Theory, Resn, Locomotive, Bureau Cool, Pentagram, etc.) for Innflow Web design inspiration.

**Notes**

Separate design-inspo pass from implementation work.

### Design website email signup popup from welcome-panel pattern

- [ ] [Design website email signup popup from welcome-panel pattern](https://app.notion.com/3c40ac1bd32e817ba3a1e50075e697bb)
- **Status:** To Do
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** Growth & Lifecycle
- **Work type:** Feature

**Description**

Adapt the supplied welcome-panel layout into a branded email-marketing signup popup for the public Innflow website, with an approved offer, respectful trigger, consent, frequency cap, attribution, and analytics.

**Resolution actions**

Approve offer and copy; define trigger, exclusions, and frequency cap; connect the approved email platform; implement responsive and accessible states; verify consent, attribution, and conversion events.

### Explore in-page login and sign-up modal for the website

- [ ] [Explore in-page login and sign-up modal for the website](https://app.notion.com/3d20ac1bd32e8178ab92c670bd182e0f)
- **Status:** Backlog
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Research / Planning
- **Reference:** [Source link](https://fish.audio/)

**Description**

Explore opening a branded authentication popup from website CTAs instead of immediately sending visitors to the login page, inspired by the supplied Fish Audio screenshot.

**Resolution actions**

1. Review current login/sign-up CTAs and identify where an in-page modal fits.
2. Design a branded modal with a benefit-led headline, short benefits list, supported sign-in options, and close action.
3. Evaluate authentication integration, provider redirects, and return to the intended destination.
4. Prototype desktop/mobile states and verify keyboard focus, dismissal, loading, and errors before deciding whether to implement.

### optimize website videos with Howdy go style

- [ ] [optimize website videos with Howdy go style](https://app.notion.com/3710ac1bd32e817097c5c8d8c54d97b4)
- **Status:** Backlog
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** Content & Brand
- **Work type:** Content
- **Reference:** [Source link](https://app.clickup.com/t/86ba7pper)

**Resolution actions**

Audit current videos and capture the approved HowdyGo interaction/motion reference; define reusable responsive embed/playback treatment; optimize formats/posters/loading, then test performance, accessibility, mobile, and reduced motion.

### Publish a vulnerability disclosure policy and security contact

- [ ] [Publish a vulnerability disclosure policy and security contact](https://app.notion.com/3d20ac1bd32e8175b842ea64d99d410f)
- **Status:** To Do
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** AI & Platform
- **Work type:** Setup / Configuration
- **Reference:** [Source link](https://app.slack.com/app-settings/T09SE67M4AC/A0BV4DTM222/submission/security)

**Description**

Create a working vulnerability reporting process for Innflow and its Slack app.

### Review international data transfers and the obsolete Privacy Shield field

- [ ] [Review international data transfers and the obsolete Privacy Shield field](https://app.notion.com/3d20ac1bd32e81a4b2ddc89be94c48cc)
- **Status:** To Do
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** AI & Platform
- **Work type:** Research / Planning
- **Reference:** [Source link](https://app.slack.com/app-settings/T09SE67M4AC/A0BV4DTM222/submission/security)

**Description**

Determine applicable transfer disclosures; do not create a Privacy Shield claim merely to fill Slack’s optional URL field.

### Review new product pages + FAQs (AI Agents / Paper → Framer)

- [ ] [Review new product pages + FAQs (AI Agents / Paper → Framer)](https://app.notion.com/3c20ac1bd32e81a9b23ad68d7d52185c)
- **Status:** To Do
- **Priority:** P2
- **Area:** Innflow Web
- **Category:** Content & Brand
- **Work type:** Content
- **Reference:** [Source link](https://app.clickup.com/t/86baytq9x)

**Description**

Review newly created marketing pages and FAQ sections for accuracy, completeness, tone, and innflow branding (no leftover Beam copy). Surfaces: Paper AI Agents desktop/mobile; Framer /products/ai-agents; related Platform, Skills, Agent OS FAQs.

Source: https://app.clickup.com/t/86baytq9x

**Resolution actions**

Create a page/FAQ inventory and review checklist for facts, tone, links, responsive states, and leftover Beam copy; record fixes by surface; re-review desktop/mobile previews and obtain content approval.

## P3 — 1 tasks

### Replicate Innflow website layout and design using Plain as the reference

- [ ] [Replicate Innflow website layout and design using Plain as the reference](https://app.notion.com/3ce0ac1bd32e81a3bbbec98990638abd)
- **Status:** To Do
- **Priority:** P3
- **Area:** Innflow Web
- **Category:** Product & UX
- **Work type:** Improvement
- **Notion date:** 2026-09-04 18:47:00Z
- **Reference:** [Source link](https://www.plain.com)

**Description**

Restyle innflow.ai to follow the layout, typography, and overall visual system of Plain (plain.com), not just the Ari product page.

**Resolution actions**

Audit innflow.ai against plain.com structure, type, spacing, and CTAs; map sections 1:1; implement the new layout on the marketing site; QA desktop and mobile.


