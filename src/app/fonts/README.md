# Local web fonts

Host Grotesk (400/500/600 normal) and Source Serif 4 (400/500 normal and italic) are the original Google Fonts faces, downloaded from the official Google Fonts CSS API on 2026-11-15. These Latin WOFF2 subsets preserve the existing selected Latin character set. Each family is distributed under the included SIL Open Font License.

They are loaded with `next/font/local` because the installed Next.js Google loader cannot parse extensionless Google Fonts URLs containing query parameters. See https://github.com/vercel/next.js/issues/99114. Keeping the font binaries local removes that build-time dependency for these faces.

Variables remain `--font-hero-ui` and `--font-source-serif-4`; the homepage's heading alias reuses Source Serif 4 rather than loading it twice.
