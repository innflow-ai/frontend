# Quinn assistant UI polish

[Updated editable Paper design](https://app.paper.design/file/01M3Z51G24KKH1HN6M1028PHG2/p-1-0/3E-0)

Updated the selected conversation and task activity artboard in place. Existing character boards were not changed.

- Added an assistant header and a task-activity heading with the actual 10-run count.
- Improved task-card spacing, status badges, button treatment, and plain-language error messages.
- Preserved full task prompt text in its editable layer while showing a three-line preview.
- Increased conversation body text from 11px to 14px with 24px line height; separated headings, author names, and metadata.
- Improved tool activity grouping, fixed trailing status widths, avatar size, and response-action alignment.
- Aligned suggestion buttons to the message text and removed their excess shadow.
- Replaced the fixed 81,958px canvas height with content sizing, resulting in about 32,154px of actual conversation content before the final small spacing adjustments.

Reviewed task cards, header, tool activity, a long response, and suggestion rows using Paper screenshots. This updates the Paper design only; application behavior and production code were not changed.

`before.json` and `before-jsx.json` preserve the original inspected styles and content. PNGs show representative updated sections.
