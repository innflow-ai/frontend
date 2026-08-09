# Performance and bundle budget

## Targets

| Metric | Budget |
| --- | --- |
| LCP p75 | `< 2.5s` |
| CLS p75 | `< 0.1` |
| INP p75 | `< 200ms` |
| Initial JavaScript | `< 120 kB` compressed for homepage route |
| Temporary App Router exception ceiling | `< 180 kB` compressed for homepage route |
| Total shipped homepage media | `< 1.5 MB` compressed before user interaction |
| Third-party JavaScript | `0 kB` before consent |

## Implementation choices

- Static server-rendered pages with no React client components. Native disclosure navigation and one inline runtime provide attribution, consent-gated event dispatch, Escape handling, and lightweight LCP/CLS observation.
- No animation, carousel, video, CMS, form, icon, or UI framework dependency.
- Local optimized images use `next/image` with reserved intrinsic dimensions and responsive `sizes`.
- Below-the-fold images retain default lazy loading; only the header logo is prioritized.
- No large autoplay media, remote image host, or third-party analytics script.
- Two font families are subset through `next/font` with `display: swap`.

## Verification record

- Production build: passed on August 9, 2026; 22 routes/assets were generated as static or SSG output.
- Route audit: 17 required endpoints passed status, metadata, canonical, H1, internal-link, and Preview-label checks.
- Homepage assets: 178,559 bytes JavaScript gzip and 10,130 bytes CSS gzip; zero third-party scripts before consent.
- JavaScript exception: the 120 kB target is missed by 55,679 bytes after removing all React client components. The remaining payload is the Next.js App Router runtime. The enforced temporary ceiling is 180 kB; removal path is to reassess the framework/output architecture before production cutover.
- Lighthouse local lab result: Performance 96, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 2.8 s, CLS 0, TBT 10 ms, and 284 KiB total transfer. The local LCP run is 0.3 s above the field target; field p75 measurement and preview-host optimization remain release gates.
- Responsive browser review: local production rendering checked at 360, 768, 1024, 1440, and 1920 pixels with no observed horizontal overflow.
- Field p75 LCP, CLS, and INP remain unavailable until an approved preview or production origin receives representative traffic.

Any budget exception must name the asset, route, measured cost, buyer value, and removal plan.
