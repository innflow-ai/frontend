# Design QA

- Source visual truth: Aeline donor site at `/Users/ak/aeline-web` (`http://localhost:3000/`); the homepage implements the "skyline" transplant documented in DESIGN.md
- Source pixels: live donor pages (desktop + mobile)
- Implementation URL: `http://localhost:3001/`
- Implementation screenshot: not captured; browser automation permission is pending
- Intended desktop viewport: `1440 x 1100`, device scale factor `1`
- Intended mobile viewport: `390 x 844`, device scale factor `1`
- State: homepage default state; portfolio mega menu and mobile menu also require interaction checks
- Density normalization: pending browser capture; the source is a compressed full-page concept and will be compared by matching page width and focused regions

## Full-view comparison evidence

Blocked until a browser-rendered full-page implementation screenshot is captured and placed with the source visual in one comparison view.

## Focused-region comparison evidence

Blocked until browser captures exist for the desktop hero, feature bands, portfolio gallery, integrations, final CTA, footer, and mobile layout.

## Findings

- [P1] Browser-rendered visual fidelity has not been verified.
  - Location: homepage, desktop and mobile.
  - Evidence: the selected visual target is available and the production build passes, but no browser-rendered implementation screenshot has been authorized or captured.
  - Impact: typography, spacing, image crops, responsive behavior, and interactive states cannot be passed from code and HTTP evidence alone.
  - Fix: capture the desktop and mobile page plus menu states, compare against the source, and resolve all visible P0/P1/P2 differences.

## Comparison history

- Initial pass: implementation completed; browser comparison blocked pending permission to use Playwright CLI.

## Implementation checklist

- Capture desktop and mobile implementation screenshots.
- Exercise the portfolio mega menu, mobile menu, FAQ disclosures, and primary CTA paths.
- Check the browser console for runtime errors.
- Compare source and implementation together at matching states.
- Fix P0/P1/P2 differences and repeat the comparison.

## Follow-up polish

- Evaluate whether the full six-card portfolio row should remain at wide desktop or use a 3-by-2 editorial composition after visual comparison.

final result: implementation checks passed; browser visual review pending
