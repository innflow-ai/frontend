# Figma feature page implementation

Implemented locally on branch 0.1.44 from CMS Template on 2026-09-14. No commit, deployment, or CMS publication was performed.

The existing Rent Collection route remains the interaction baseline. The Home Page design is implemented at /property-management; the current homepage is preserved. All 33 destinations are linked from the shared desktop/mobile menus, including the Finance group and additional Operations, Leasing and Portfolio entries. Each new page has a distinct assigned MidJourney hero, four sections, three support points, page-specific testimonial lookup, FAQs and the shared footer.

Thirteen card compositions use related exported library components because Figma reached its MCP export limit. Exact source and substitution IDs are recorded in FEATURE_PAGE_ARTWORK_SUBSTITUTIONS.json. Accounting uses the original transparent foreground cutout over separately positioned transaction and profit cards.

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
| Workflows | /products/agentic-workflows | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=155-5413) | Library adaptation |
| Owners | /owners | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=97-1981) | Exported library artwork |
| Rapid Rent | /rapid-rent | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=115-3069) | Library adaptation |
| Home Page | /property-management | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=160-5641) | Exported library artwork |
| Self Storage | /self-storage | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=167-6102) | Exported library artwork |
| Operations | /operations | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=91-1640) | Library adaptation |
| QuickBooks Online Integration | /quickbooks-online-integration | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=118-3281) | Library adaptation |
| Mobile Apps | /mobile-apps | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=74-1003) | Library adaptation |
| Listing & Advertising | /listing-and-advertising | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=45-168) | Library adaptation |
| Accounting | /landlord-accounting | [Design](https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/?node-id=21-41) | Library adaptation |

Validation: all 33 local routes returned HTTP 200 with one H1; all 33 were checked for horizontal overflow at mobile and desktop widths. Desktop stacked panels remain visible and active/progress state works forward and backward. Build, TypeScript, focused tests and changed-file lint passed.

Original hero/section assignments remain in /Users/ak/Downloads/midjourney_session/asset-register.csv. WebP copies live in public/brand/feature-pages. SVG exports retain original vector paths, with ancestor canvas backgrounds removed and embedded raster images optimized for web delivery.
