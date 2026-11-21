# Mage stroke icons

These React components contain the original vector geometry from the supplied
`mage-icons-react` 0.7.0-beta `stroke` directory. Source package: Mage Icons,
Apache-2.0. See LICENSE.txt.

Import named components from `@/components/icons/mage`. The shared props preserve
size, className, style, color, accessible attributes and event handlers. Icons
are decorative by default. Give icon-only controls an accessible label on the
button or link. `weight` remains accepted for existing callsites, but does not
change the supplied stroke artwork. No font or remote asset service is required.

Only used icons are vendored. `public/brand/mage` contains the matching SVG
variants used by CSS masks and existing image slots.

Brand and integration logos, portraits, charts, connector paths, decorative
backgrounds, customer artwork, CMS illustrations, and message reaction emoji
are not interface icons and retain their existing artwork.
