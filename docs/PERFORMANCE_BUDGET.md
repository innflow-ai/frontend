# Performance and bundle budget

## Targets

| Metric | Budget |
| --- | --- |
| LCP p75 | `< 2.5s` |
| CLS p75 | `< 0.1` |
| INP p75 | `< 200ms` |
| Initial JavaScript | `< 120 kB` compressed for homepage route |
| Total shipped homepage media | `< 1.5 MB` compressed before user interaction |
| Third-party JavaScript | `0 kB` before consent |

## Implementation choices

- Static server-rendered homepage; client code is limited to mobile navigation, tracked external links, and lightweight performance observers.
- No animation, carousel, video, CMS, form, icon, or UI framework dependency.
- Local optimized images use `next/image` with reserved intrinsic dimensions and responsive `sizes`.
- Below-the-fold images retain default lazy loading; only the header logo is prioritized.
- No large autoplay media, remote image host, or third-party analytics script.
- Two font families are subset through `next/font` with `display: swap`.

## Verification record

Fill after final validation:

- Production build: pending.
- Route output/static status: pending.
- First-load JS/build output: pending.
- Browser console and responsive clipping: pending.
- Lighthouse/Web Vitals field measurement: requires an approved preview; not available locally as field data.

Any budget exception must name the asset, route, measured cost, buyer value, and removal plan.
