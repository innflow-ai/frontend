# Homepage Rive animations

The homepage feature accordions use the current 18-story sequence: AI agent 01–06, Workflows 07–10, Assistant 11–14, and Insights 15–18. Existing section anchors are preserved.

`src/app/preview/scroll-showcase/homepage-storyboards.json` is the integration contract. Every animated entry names an exact artboard and state machine. Do not rely on the first artboard: exports 05, 06, and 08 also contain an empty default artboard. Preserve the exported runtime names, including the spelling in file 18.

Runtime exports live in `public/brand/homepage`. The current download collection is in `outputs/riv-animations/Rive animations/Numbered current exports`. The manifest records source links, sizes, and SHA-256 checksums.

## Current delivery

17 numbered Rive files are installed. File 02 has not been located in the Rive library or existing exports. Its homepage slot currently uses a still illustration composed from the contacts storyboard source. It is not a verified Rive animation. Replace that entry with an approved export when available.

| Number | Section | Story | Delivery | Rive source |
|---|---|---|---|---|
| 01 | AI agent | Pick up conversations with context | Rive | https://editor.rive.app/file/innflow-pick-up-conversations-with-context/2624697 |
| 02 | AI agent | Let AI manage your contacts | Still illustration only | Missing |
| 03 | AI agent | Put AI to work your way | Rive | https://editor.rive.app/file/03---put-ai-to-work-your-way/2626295 |
| 04 | AI agent | Connect your agents to your tools | Rive | https://editor.rive.app/file/04-innflow-unified-inbox-breathing-hub/2622411 |
| 05 | AI agent | Respond with the full picture | Rive | https://editor.rive.app/file/05/2626550 |
| 06 | AI agent | Learn what keeps coming up | Rive | https://editor.rive.app/file/06/2626554 |
| 07 | Workflows | Get work done across your tools | Rive | https://editor.rive.app/file/innflow-agent-seamless-loop/2621830 |
| 08 | Workflows | A little help with everyday work | Rive | https://editor.rive.app/file/08/2626558 |
| 09 | Workflows | Focus on the requests that matter | Rive | https://editor.rive.app/file/09/2626764 |
| 10 | Workflows | Turn requests into completed tasks | Rive | https://editor.rive.app/file/10/2626564 |
| 11 | Assistant | Spend less time finding answers | Rive | https://editor.rive.app/file/11/2626580 |
| 12 | Assistant | Get requests to the right team | Rive | https://editor.rive.app/file/12/2626588 |
| 13 | Assistant | Delegate tasks. Keep the final say. | Rive | https://editor.rive.app/file/13/2626589 |
| 14 | Assistant | Schedule your assistant | Rive | https://editor.rive.app/file/14/2626592 |
| 15 | Insights | Know what to improve next | Rive | https://editor.rive.app/file/15/2626593 |
| 16 | Insights | Catch up instantly | Rive | https://editor.rive.app/file/16/2626595 |
| 17 | Insights | Start each day with a clear picture | Rive | https://editor.rive.app/file/17/2626603 |
| 18 | Insights | Turn insights into action | Rive | https://editor.rive.app/file/18/2626601 |

## Runtime behavior

- React WebGL2 4.36.0 uses WebGL2 runtime 2.44.0. Matching WASM binaries are self-hosted in `public/brand/agents`; update both if the package changes.
- Files have embedded assets. CDN asset loading is disabled.
- Artwork fits the full 771 × 830 artboard without cropping, with the existing rounded container treatment.
- A selected animation loads only when its visual enters the viewport. Switching items unmounts the previous runtime. Offscreen and background-tab animations pause.
- Reduced motion avoids loading the runtime and shows readable WebP still artwork. Loading failures keep that same fallback visible.
- Canvas content is decorative. Headings, descriptions, accordion states, keyboard navigation, and mobile selection remain in the DOM.

## Validation on October 2, 2026

All 18 selections were checked on the local homepage. All 17 Rive files loaded and entered playback without Rive errors. Desktop and mobile layout, selection placement, viewport overflow, and reduced-motion behavior were checked. TypeScript and 20 focused tests passed.

11 retains its corrected opening icons and closing transition. 12 uses the optimized 208-object, 198 KB export and matching opening/ending frames. 09 now preserves its original 687 keyframes and appends 93 return keys, extending the loop to 7.2 seconds; rendered opening and closing frames match exactly.

These are local integration checks. No deployment is implied.
