# Accessibility checklist

## Implemented

- [x] Semantic header, navigation, main, sections, articles, lists, and footer.
- [x] One page H1 and ordered heading hierarchy.
- [x] Skip link to main content.
- [x] Visible `:focus-visible` treatment using approved brand blue.
- [x] Mobile navigation uses a native disclosure and labeled navigation region.
- [x] Escape closes the mobile navigation.
- [x] FAQ uses native keyboard-accessible disclosure elements.
- [x] Decorative integration marks use empty alt text; product evidence has descriptive alt text.
- [x] Preview status is visible text, not color-only.
- [x] Dark surfaces use high-contrast text and restrained muted colors.
- [x] Layouts reflow at tablet and phone widths without intentional horizontal scrolling.
- [x] `prefers-reduced-motion` is respected.
- [x] No autoplay media or pointer-only interaction.

## Validation record

- [x] Keyboard navigation and Escape handling exercised in the local production build.
- [x] Automated axe 4.12.1 scan: zero violations on the homepage.
- [x] Lighthouse accessibility score: 100.
- [x] Contrast violations found in the first scan were remediated and the scan rerun cleanly.
- [x] Responsive rendering captured at 360, 768, 1024, 1440, and 1920 pixels.

## Manual release checks still required

- [ ] VoiceOver landmarks, menu labels, image alternatives, FAQ state, and CTA purpose.
- [ ] 200% zoom and browser text-size increase.
- [ ] Touch targets and no clipped content on real iOS/Android browsers.
- [ ] Any future dialog, video controls, consent manager, and forms.

WCAG 2.2 AA is the target. Automated results and desktop-browser review are not represented as full conformance or assistive-technology certification.
