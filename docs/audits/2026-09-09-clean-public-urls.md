# Clean public URLs and homepage promotion

The redesigned homepage now renders at `/`, retaining the authenticated-user redirect. The redesigned pricing page now renders at `/pricing`. Other preview pages moved to top-level paths without the old prefix. Privacy and terms use the existing canonical legal pages.

Navigation, footer, in-page links, data links, canonical metadata, and sitemap entries use the clean destinations. Promoted pages no longer carry preview noindex metadata. The homepage uses `#workflows` and `#knowledge` section links. Portfolio navigation now links to the multi-property page because the promoted homepage has no portfolios section.

Legacy addresses are retained only as redirect sources in `next.config.ts`. Source component names and asset filenames were not renamed; the requested scope is public page URLs. No deployment performed.

Validation: production build, all 117 tests, focused Biome checks, and git diff whitespace checks passed. HTTP checks verified 40 permanent redirects with query preservation and 37 destination pages returning 200, with no legacy page hrefs or canonicals. The homepage has one main element and the redesigned heading. Browser automation timed out; verification used rendered HTML.

| Previous path | Canonical destination |
| --- | --- |
| `/BL/BL-about` | `/about` |
| `/BL/BL-advisor-partner-program` | `/advisor-partner-program` |
| `/BL/BL-careers` | `/careers` |
| `/BL/BL-connections` | `/connections` |
| `/BL/BL-demo` | `/demo` |
| `/BL/BL-free-rental-forms-and-templates-for-landlords` | `/free-rental-forms-and-templates-for-landlords` |
| `/BL/BL-help-center` | `/help-center` |
| `/BL/BL-home` | `/` |
| `/BL/BL-how-much-should-i-charge-for-rent` | `/how-much-should-i-charge-for-rent` |
| `/BL/BL-in-the-news` | `/in-the-news` |
| `/BL/BL-landlord-accounting` | `/landlord-accounting` |
| `/BL/BL-landlord-banking` | `/landlord-banking` |
| `/BL/BL-landlord-banking-apy` | `/landlord-banking-apy` |
| `/BL/BL-landlord-insurance` | `/landlord-insurance` |
| `/BL/BL-landlord-referral` | `/landlord-referral` |
| `/BL/BL-lease-agreement` | `/lease-agreement` |
| `/BL/BL-legal-agreements` | `/legal-agreements` |
| `/BL/BL-long-term-rentals` | `/long-term-rentals` |
| `/BL/BL-mid-term-rentals` | `/mid-term-rentals` |
| `/BL/BL-multi-property-investors` | `/multi-property-investors` |
| `/BL/BL-our-customers` | `/our-customers` |
| `/BL/BL-partner-with-us` | `/partner-with-us` |
| `/BL/BL-pricing` | `/pricing` |
| `/BL/BL-privacy-policy` | `/legal/privacy-policy` |
| `/BL/BL-product-updates` | `/product-updates` |
| `/BL/BL-real-estate-investing` | `/real-estate-investing` |
| `/BL/BL-rent-collection` | `/rent-collection` |
| `/BL/BL-rent-collection-2` | `/rent-collection-2` |
| `/BL/BL-rental-property-loans` | `/rental-property-loans` |
| `/BL/BL-renters` | `/renters` |
| `/BL/BL-resources` | `/resources` |
| `/BL/BL-security` | `/security` |
| `/BL/BL-security-deposit-account` | `/security-deposit-account` |
| `/BL/BL-short-term-rentals` | `/short-term-rentals` |
| `/BL/BL-tax-preparation` | `/tax-preparation` |
| `/BL/BL-tenant-screening-service` | `/tenant-screening-service` |
| `/BL/BL-terms-of-use` | `/legal/terms-of-service` |
| `/BL/BL-webinars` | `/webinars` |
| `/BL` | `/` |
| `/homepage-baselane` | `/` |
