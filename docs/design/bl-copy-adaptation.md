# BL copy adaptation for innflow

All 37 BL pages reviewed. Public copy now describes innflow property operations, workflows, connected knowledge, and human review. Existing routes and the main homepage are retained.

## Content decisions

- Removed Baselane service promotions and destinations from page copy and shared navigation/footer.
- Replaced borrowed customer testimonials, advisor reward tiers, and screening prices with workflow examples, coordination steps, and a preparation checklist.
- Replaced competitor resource collections with innflow workflow resources and self-guided topics; no recorded webinar availability is implied.
- Document resources now download editable preparation worksheets rather than linking to competitor lead forms.
- Independent industry reading remains labeled as independent publisher content; legal pages retain innflow policy destinations.
- Kept existing Google CTA changes made alongside this work. No commit, push, or deployment performed for this copy task.

## Page review

| Route | Page focus |
| --- | --- |
| `/BL/BL-about` | Property operations, connected by innflow. |
| `/BL/BL-advisor-partner-program` | Bring clarity to every client conversation. |
| `/BL/BL-careers` | Build what comes next for property operations. |
| `/BL/BL-demo` | See howinnflow works. |
| `/BL/BL-free-rental-forms-and-templates-for-landlords` | Prepare your paperwork. Keep the context. |
| `/BL/BL-help-center` | How can we help? |
| `/BL/BL-home` | Operations that give you your day back. |
| `/BL/BL-how-much-should-i-charge-for-rent` | How do your comparable rents stack up? |
| `/BL/BL-in-the-news` | Industry coverage and perspectives |
| `/BL/BL-landlord-accounting` | Keep the details behind every decision together. |
| `/BL/BL-landlord-banking` | Built for life withmore than one property. |
| `/BL/BL-landlord-banking-apy` | Keep property reserves connected to the plan. |
| `/BL/BL-landlord-insurance` | A clearer start to your insurance review. |
| `/BL/BL-landlord-referral` | Good work is worth sharing. |
| `/BL/BL-lease-agreement` | Lease paperwork. Connected context. |
| `/BL/BL-legal-agreements` | Legal agreements |
| `/BL/BL-long-term-rentals` | Clarity across every rental property. |
| `/BL/BL-mid-term-rentals` | A clearer view of every stay. |
| `/BL/BL-multi-property-investors` | Property clarity thatgrows with your portfolio. |
| `/BL/BL-our-customers` | Your people. Your properties. One connected flow. |
| `/BL/BL-partner-with-us` | Partner and build something useful. |
| `/BL/BL-pricing` | Clearer work.Room to grow. |
| `/BL/BL-privacy-policy` | Privacy Policy |
| `/BL/BL-product-updates` | Product updates |
| `/BL/BL-real-estate-investing` | All investor resources |
| `/BL/BL-rent-collection` | Keep rental work moving, every month. |
| `/BL/BL-rent-collection-2` | Keep rental work moving, every month. |
| `/BL/BL-rental-property-loans` | Get your next property project ready. |
| `/BL/BL-renters` | More clarity.Less back and forth. |
| `/BL/BL-resources` | Resources for connected property work |
| `/BL/BL-security` | Build trust into the way work gets done. |
| `/BL/BL-security-deposit-account` | Bring clarity to deposit-related work. |
| `/BL/BL-short-term-rentals` | A clearer day behind every stay. |
| `/BL/BL-tax-preparation` | Bring a little order to tax season. |
| `/BL/BL-tenant-screening-service` | Screening workflows.Keep the next step clear. |
| `/BL/BL-terms-of-use` | Terms of Service |
| `/BL/BL-webinars` | Learn how innflow works |

## Verification

- Rendered HTTP audit: all 37 routes return 200, contain one H1 and noindex, and have no competitor names in visible copy or image descriptions, no competitor service links, and no missing referenced local images.
- Browser checks: all 37 routes at 1440px and 390px, with no page JavaScript errors or document overflow.
- Interactive checks: screening checklist updates to 2 / 3; preparation worksheet downloads and contains the expected editable fields.
- Resource card contrast corrected for production CSS ordering.
- Type checking, scoped Biome checks, production build, and existing test suite checked. See local artifacts in `output/playwright/bl-copy/`.
