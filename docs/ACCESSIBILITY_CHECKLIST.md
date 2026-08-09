# Accessibility checklist

## Implemented

- [x] Semantic header, navigation, main, sections, articles, lists, and footer.
- [x] One page H1 and ordered heading hierarchy.
- [x] Skip link to main content.
- [x] Visible `:focus-visible` treatment using approved brand blue.
- [x] Mobile menu button exposes expanded state and controlled region.
- [x] Escape closes the mobile navigation.
- [x] FAQ uses native keyboard-accessible disclosure elements.
- [x] Decorative integration marks use empty alt text; product evidence has descriptive alt text.
- [x] Preview status is visible text, not color-only.
- [x] Dark surfaces use high-contrast text and restrained muted colors.
- [x] Layouts reflow at tablet and phone widths without intentional horizontal scrolling.
- [x] `prefers-reduced-motion` is respected.
- [x] No autoplay media or pointer-only interaction.

## Validate in browser before release

- [ ] Keyboard order and focus visibility at 360, 768, 1024, 1440, and wide desktop.
- [ ] VoiceOver landmarks, menu labels, image alternatives, FAQ state, and CTA purpose.
- [ ] Automated WCAG scan with no critical or serious findings.
- [ ] Contrast measurement of every text/status combination in final production rendering.
- [ ] 200% zoom and browser text-size increase.
- [ ] Touch targets and no clipped content on real iOS/Android browsers.
- [ ] Any future dialog, video controls, consent manager, and forms.

WCAG 2.2 AA is the target; Phase C code review alone is not represented as a full conformance audit.
