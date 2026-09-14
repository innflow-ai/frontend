# Figma feature page implementation

CMS Template routes were implemented on 2026-09-14. Section photographs and the documented artwork substitutions were subsequently reconciled against live Figma in the current worktree. This asset correction does not deploy the site or publish CMS content.

The existing Rent Collection route remains the interaction baseline. The Home Page design is implemented at /property-management; the current homepage is preserved. All 33 destinations are linked from the shared desktop/mobile menus, including the Finance group and additional Operations, Leasing and Portfolio entries. Each new page has a distinct assigned MidJourney hero, four sections, three support points, page-specific testimonial lookup, FAQs and the shared footer.

All 132 section photographs now come from their actual Figma image fills, matched to local originals by SHA-1. The section-to-file mapping, source hashes, output hashes, and mobile focal points are recorded in FEATURE_PAGE_SECTION_IMAGES.json. Sixteen previously existing image URLs were versioned to prevent cached older photos from being served.

All 13 previously substituted card compositions have been replaced with SVG exports of their exact Figma instances, including outlined text and transparent backgrounds. FEATURE_PAGE_ARTWORK_SUBSTITUTIONS.json records their resolved status and original node IDs. Accounting retains the original transparent foreground cutout over separately positioned transaction and profit cards.

Testimonial selectors are wired for every route. Select approved existing records in Sanity Page testimonials (or Product page for /products/agentic-workflows). Empty selections hide the section; no sample people or unverified audience count were added.

| Page | Route | Figma frame | Artwork |
| --- | --- | --- | --- |
| Mobile Home | /mobile-home | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=165-5875) | Exported library artwork |
| Rental Applications | /rental-applications | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=126-3867) | Exported library artwork |
| CRM | /crm | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=84-1296) | Exported library artwork |
| Bookkeeping | /bookkeeping | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=54-331) | Exported library artwork |
| Reports | /reports | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=121-3532) | Exported library artwork |
| Community Associations | /community-associations | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=103-2352) | Exported library artwork |
| Leasing | /leasing | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=88-1491) | Exported library artwork |
| Residential | /residential | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=110-2715) | Exported library artwork |
| Affordable Housing | /affordable-housing | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=94-1826) | Exported library artwork |
| Inspections | /inspections | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=66-813) | Exported library artwork |
| Work Orders | /work-orders | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=150-5236) | Exported library artwork |
| Tenant Screening | /tenant-screening-service | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=129-4164) | Exported library artwork |
| Websites | /features/website | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=143-5020) | Exported library artwork |
| Student Housing | /student-housing | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=169-6357) | Exported library artwork |
| Residents | /residents | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=135-4605) | Exported library artwork |
| Commercial | /commercial | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=100-2198) | Exported library artwork |
| Bank Sync | /bank-sync | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=60-545) | Exported library artwork |
| Single Family | /single-family | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=112-2856) | Exported library artwork |
| Communication Tools | /communication-tools | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=80-1151) | Exported library artwork |
| Tenant Management Software | /tenant-management | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=132-4409) | Exported library artwork |
| Storage | /files-and-documents | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=138-4801) | Exported library artwork |
| Multifamily | /multifamily | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=107-2514) | Exported library artwork |
| Showings | /showings | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=171-6548) | Exported library artwork |
| Workflows | /products/agentic-workflows | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=155-5413) | Exact Figma artwork |
| Owners | /owners | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=97-1981) | Exported library artwork |
| Rapid Rent | /rapid-rent | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=115-3069) | Exact Figma artwork |
| Home Page | /property-management | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=160-5641) | Exported library artwork |
| Self Storage | /self-storage | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=167-6102) | Exported library artwork |
| Operations | /operations | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=91-1640) | Exact Figma artwork |
| QuickBooks Online Integration | /quickbooks-online-integration | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=118-3281) | Exact Figma artwork |
| Mobile Apps | /mobile-apps | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=74-1003) | Exact Figma artwork |
| Listing & Advertising | /listing-and-advertising | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=45-168) | Exact Figma artwork |
| Accounting | /landlord-accounting | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=21-41) | Exact Figma artwork |

Asset correction validation: all 33 local routes passed at 1440px, 768px, and 390px (99 page/viewport checks and 396 section-image checks). Each section loaded its expected photograph and artwork without horizontal overflow; mobile focal points matched their assignments. All 132 source hashes and output hashes passed, and a final live Figma reread found zero photo mismatches. Desktop and mobile section contact sheets were reviewed. Operations anchor navigation selected Supporting Files and returned to Resident Requests with all four stacked panels retained. All 35 focused feature-page tests, TypeScript, changed-component lint, and diff whitespace checks passed. Browser evidence is in output/playwright/section-assets/browser-audit.json and the adjacent contact sheets. Temporary Figma export copies were removed and all original artwork instances were verified in place.

Hero assignments remain in /Users/ak/Downloads/midjourney_session/asset-register.csv. That older register does not describe the latest section-photo fills. The corrected section sources are in midjourney_session_1 and midjourney_session_2, with Accounting originals in midjourney_session/Accounting. WebP copies live in public/brand/feature-pages. See FEATURE_PAGE_SECTION_IMAGES.json for the verified current section mapping. The existing Rent Collection route retains its three distinct section photographs; comparison with the original Figma fills confirmed the same source photos (mean channel differences of 1.23–1.32/255 from WebP compression).
