# BL page build workflow

Scope: yellow and blue rows in `baselane_highlighted_inventory 2.numbers`. Green Help Center detail pages are outside this request. `bl-page-progress.json` tracks all 45 selected rows, including 9 third-party destinations; they are not silently counted as completed pages.

For each batch:
1. Inspect source desktop/mobile composition and relevant controls in Chrome.
2. Use supplied Downloads assets; if a needed asset is not yet prepared, copy the same public reference asset locally and record its source.
3. Implement distinct `/BL/BL-*` routes with the shared Innflow wordmark, typography, blue accents and Google-first charcoal CTAs. Keep original Innflow routes intact.
4. Verify rendered desktop/mobile pages, image loading, navigation, and changed-file lint/TypeScript. Repair defects before counting a page.
5. Update progress and QA. Audit exact Git scope and commit only batch files. Do not push or deploy without a request.

The `innflow-bl-build` tmux session is a persistent shell in the checkout. It does not itself run the agent. The existing Next dev process owns port 3000; a second dev server was not left running.

Pending clarification: external App Store/social/Thread Bank destinations are expected to remain outbound destinations, but the user has been asked to confirm. Their inventory entries remain pending.
