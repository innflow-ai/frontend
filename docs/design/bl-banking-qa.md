# BL route and banking design review

- Local homepage: `/BL/BL-home`; banking-inspired page: `/BL/BL-landlord-banking`.
- `/BL` and `/homepage-baselane` redirect to `/BL/BL-home` (HTTP 307 verified). Homepage route returns 200.
- Reference: https://www.baselane.com/landlord-banking, inspected in Chrome. Assets supplied in `/Users/ak/Downloads/Banking Accounts For Real Estate Investors _ Baselane`.
- Shared typography, translucent navigation and footer with the alternate homepage. Existing root homepage is not replaced.
- Innflow adaptation: custom illustrative property/workflow panels and original operations copy. Source hero includes banking UI and is labeled as a design reference. No Innflow banking, yield, insurance, or testimonial claims added.
- Desktop hero and product panels visually inspected; mobile 390px hero, panel layout, menu/submenu and Escape behavior inspected. FAQ expands. No horizontal overflow at 390px or 320px; no failed loaded images.
- Improved text contrast with image overlays. Native details/summary FAQ and reduced-motion support retained.
- TypeScript passes; focused Biome checks pass. Full suite: 101 passed, one existing editorial-header test timed out under the full run; isolated rerun passed the timed-out test but found three blog-header assertion failures while those files were being edited separately. No changes to those files made for this task.
- Preview remains local; no commit, push or deployment performed.
