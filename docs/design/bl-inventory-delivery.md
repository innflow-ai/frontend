# BL inventory delivery audit

The selected Numbers inventory contains 45 yellow/blue rows: 17 yellow and 28 blue. All are mapped below. Green and unhighlighted entries were excluded. The original homepage remains at `/`; the recreated collection uses `/BL/BL-*`.

## Evidence

- Re-read the Numbers document and matched all 45 source URLs, row numbers, and colors exactly against the progress tracker.
- All 37 local routes return HTTP 200; all 52 distinct internal destinations linked by their production HTML return HTTP 200.
- Production HTML contains all 45 inventory destinations in the shared footer and noindex/nofollow on all 37 local pages.
- Production build passes, including TypeScript and generation of 548 site pages. All 111 tests in 23 files pass. Scoped Biome passes.
- All 206 asset records across 19 provenance manifests exist and match recorded hashes. All 187 image sources in BL production HTML resolve to existing local files where applicable.
- Desktop/mobile visual and interaction evidence is recorded per batch in `design-qa.md`. Shared navigation and expandable reference footer were additionally reviewed at desktop and 390px width.
- Seven external destinations respond HTTP 200. LinkedIn returns HTTP 999 to automated requests; the destination exactly matches the inventory and original source footer.

## Adaptation boundaries

These are Innflow design recreations, not a new banking or financial-services backend. Baselane customer stories, product illustrations, downloads, and provider services remain attributed and linked. Banking rates, rewards, screening, loan approval, insurance quoting, and legal-document generation are not represented as operational Innflow services. Pricing uses Innflow plans; legal pages use Innflow agreements.

The rental calculator summarizes visitor-provided comparable rents rather than performing an address lookup. Partner inquiries prepare a local email draft. Customer video clips have no publisher-provided caption tracks. These differences are documented in the tracker and batch QA; they are not claims of exact functional parity with Baselane.

## Inventory map

| Row | Color | Destination | Delivery |
| --- | --- | --- | --- |
| 2 | yellow | /BL/BL-home | implemented |
| 3 | yellow | /BL/BL-rent-collection-2 | implemented |
| 4 | yellow | /BL/BL-long-term-rentals | implemented |
| 5 | yellow | /BL/BL-mid-term-rentals | implemented |
| 6 | yellow | /BL/BL-multi-property-investors | implemented |
| 7 | yellow | /BL/BL-renters | implemented |
| 8 | yellow | /BL/BL-short-term-rentals | implemented |
| 9 | yellow | /BL/BL-help-center | implemented |
| 10 | yellow | /BL/BL-demo | implemented |
| 11 | yellow | /BL/BL-product-updates | implemented |
| 12 | yellow | /BL/BL-resources | implemented |
| 13 | yellow | /BL/BL-webinars | implemented |
| 14 | yellow | /BL/BL-landlord-accounting | implemented |
| 15 | yellow | /BL/BL-landlord-banking | implemented |
| 16 | yellow | /BL/BL-landlord-insurance | implemented |
| 17 | yellow | /BL/BL-pricing | implemented |
| 18 | yellow | /BL/BL-tax-preparation | implemented |
| 19 | blue | https://apps.apple.com/us/app/baselane/id6755168931 | external-linked |
| 20 | blue | https://play.google.com/store/apps/details?id=com.baselane.landlord | external-linked |
| 21 | blue | https://thread.bank/program-banks/ | external-linked |
| 22 | blue | https://thread.bank/sweep-disclosure/ | external-linked |
| 23 | blue | /BL/BL-advisor-partner-program | implemented |
| 24 | blue | /BL/BL-about | implemented |
| 25 | blue | /BL/BL-careers | implemented |
| 26 | blue | /BL/BL-in-the-news | implemented |
| 27 | blue | /BL/BL-landlord-referral | implemented |
| 28 | blue | /BL/BL-legal-agreements | implemented |
| 29 | blue | /BL/BL-partner-with-us | implemented |
| 30 | blue | /BL/BL-security | implemented |
| 31 | blue | /BL/BL-privacy-policy | implemented |
| 32 | blue | /BL/BL-terms-of-use | implemented |
| 33 | blue | /BL/BL-real-estate-investing | implemented |
| 34 | blue | /BL/BL-free-rental-forms-and-templates-for-landlords | implemented |
| 35 | blue | /BL/BL-how-much-should-i-charge-for-rent | implemented |
| 36 | blue | /BL/BL-lease-agreement | implemented |
| 37 | blue | https://www.facebook.com/baselanehq | external-linked |
| 38 | blue | https://www.instagram.com/baselanehq/ | external-linked |
| 39 | blue | https://www.linkedin.com/company/baselane | external-linked |
| 40 | blue | https://www.youtube.com/@baselane | external-linked |
| 41 | blue | /BL/BL-landlord-banking-apy | implemented |
| 42 | blue | /BL/BL-our-customers | implemented |
| 43 | blue | /BL/BL-rent-collection | implemented |
| 44 | blue | /BL/BL-rental-property-loans | implemented |
| 45 | blue | /BL/BL-security-deposit-account | implemented |
| 46 | blue | /BL/BL-tenant-screening-service | implemented |

## Publication

Changes were staged and committed in local batches on branch `0.1.37`. No push, merge, or deployment was performed.
