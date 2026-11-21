# Pricing and shared typography

The approved pricing reference is [Paper](https://app.paper.design/file/01M4E4NA4JRZRFQ07JRXVPH3CE/p-1-0/644-1), updated November 10, 2026.

- Shared fonts load in `src/app/layout.tsx`: Archivo for UI and heading emphasis, Source Serif 4 for regular display headings, and Geist Mono for code. Semantic `strong` or `b` inside H1–H3 uses Archivo Bold. Existing component-specific type rules remain explicit overrides.
- `src/app/globals.css` exposes `--font-sans`, `--font-display`, `--font-heading-emphasis`, and `--font-mono`. Legacy Host Grotesk and Manrope variables alias Archivo.
- Pricing retains its reference-specific cream surfaces, rounded cards, blue Pro highlight, and Geist supporting text. These colors are not global defaults.
- `src/config/pricing.ts` is the shared display catalog. Prices come from `innflow_staff_pricing_summary 2.csv` (catalog September 18, reviewed November 10, 2026). The public Free plan is labeled Basic. The user subsequently corrected monthly rates to $19.99 for Pro and $197.99 for Business, superseding the CSV monthly values. Annual rates remain $14.99 and $149.99 per month, billed yearly.
- Annual prices are monthly equivalents of upfront annual payments. Savings percentages are rounded comparisons with twelve regular monthly payments. Annual selection shows red strikethrough monthly prices and per-plan discount tags; monthly selection hides them.
- This marketing change does not configure checkout. The supplied pricing summary marks annual checkout metadata and Dodo alignment as pending; verify those before production release. Feature eligibility and rollout qualifications remain in the comparison.
