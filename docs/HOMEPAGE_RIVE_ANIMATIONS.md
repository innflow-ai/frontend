# Homepage Rive animations

The homepage feature accordions use the current 18-story sequence: AI agent 01–06, Workflows 07–10, Assistant 11–14, and Insights 15–18. Existing section anchors are preserved.

`src/app/preview/scroll-showcase/homepage-storyboards.json` is the integration contract. Every animated entry names an exact artboard and state machine. Do not rely on the first artboard: exports 05, 06, and 08 also contain an empty default artboard. Preserve the exported runtime names, including the spelling in file 18.

Runtime exports live in `public/brand/homepage`. The current download collection is in `outputs/riv-animations/Rive animations/Numbered current exports`. The manifest records source links, sizes, and SHA-256 checksums.

## Current delivery

All 18 numbered Rive files are installed. File 02 was rebuilt as an editable Rive scene from the verified contacts storyboard and its original Figma motion tracks. It preserves all five portraits, the native Solar gradient, the contacts reveal, filter menu, cursor feedback, and return transition.

| Number | Section | Story | Delivery | Rive source |
|---|---|---|---|---|
| 01 | AI agent | Pick up conversations with context | Rive | https://editor.rive.app/file/innflow-pick-up-conversations-with-context/2624697 |
| 02 | AI agent | Let AI manage your contacts | Rive | https://editor.rive.app/file/02/2626799 |
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

All 18 selections were checked on the local homepage. The original 17 Rive files loaded and entered playback without Rive errors. Desktop and mobile layout, selection placement, viewport overflow, and reduced-motion behavior were checked. TypeScript and 20 focused tests passed. The subsequent file 02 handoff is verified separately below.

02 uses a 7.6-second loop with 352 native keyframes. Its runtime export contains the correct artboard and state machine, and its rendered opening and closing frames match exactly. The filter menu and final selection were checked in the website's WebGL2 renderer. The empty starter artboard was removed before export. Editable `.rev` and runtime `.riv` copies are retained in the task's `work/02-contacts` directory.

11 retains its corrected opening icons and closing transition. 12 uses the optimized 208-object, 198 KB export and matching opening/ending frames. 09 now preserves its original 687 keyframes and appends 93 return keys, extending the loop to 7.2 seconds; rendered opening and closing frames match exactly.

These are local integration checks. No deployment is implied.

## Review fixes on October 3, 2026

First-pass revisions for 01–03 are installed locally:

- 01 keeps the second message hidden until it is nearly full size, then reveals the card and its shadow together in a short fade. The loop remains 24 seconds.
- 02 builds the contacts table row by row, staggers the contact detail reveals, and preserves the filter interaction. The loop remains 7.6 seconds.
- 03 runs for 27.6 seconds with additional pauses and softer easing. Start, condition, and user nodes use white Mage UI stroke icons on colored backgrounds; the agent node uses the supplied blue Innflow character SVG. The timeline's existing name containing “15s” is preserved for compatibility.

The subsequent 03 icon refinement changes the glyph interiors to white, centers the Start icon with its label, and replaces the “Trigger” text with an orange Mage UI filled Zap. The context-menu revision extends the loop to 27.6 seconds. Each existing connected node now starts as a small blank glass shell, expands to contain the context menu, and resolves into the selected node. Menus use the native glass backing and rounded geometry, reveal all labels together after the menu skeleton, and retain the real node connections.

Editable backups and revised exports are retained in `outputs/homepage-animation-fixes-2026-10-03`, and the numbered export collection has been refreshed. All three rendered opening/closing frame pairs match exactly; 8 focused homepage animation tests pass. See [the fixes checklist](HOMEPAGE_ANIMATION_FIXES.md) for review status. These changes have not been deployed.

The input-stability pass removes the collapsed Else field and repeated If expansion. Selected menus resolve directly to finished node dimensions before content loads. Native field and panel geometry resizes with uniform scale to preserve corner shape. Add-node stubs are 52 units long instead of 71, with transparent resting buttons and a white, enlarged hover state in the authored cursor sequence.

The first context menu is 480 units wide before expanding to the approximately 533-unit Set condition node. It follows the Start output with a roughly 109-unit gap. The connected glass shell builds open with its text, then expands while the condition label and fields appear.

The dropdown refinement removes premature selected-name flashes, puts Alex Morgan above Laura Kim, and animates hover from Alex to Laura followed by a light-blue click state. All three context menus and the agent picker share the same feedback. The loop is now 27.6 seconds.

The context-menu loading refinement keeps the selected text at normal proportions. Immediately after each stub click, icon-and-label skeleton placeholders build with the Select next step menu, then resolve into its options. The post-selection node skeletons were removed following clarification. All three menus use Mage UI stroke icons for action, user, knowledge base, loop, and condition; Assign to agent uses the supplied Transparent eye cutouts SVG. The connected glass shell and 27.6-second duration are preserved.

The three add-node handles now use blue backgrounds and white plus glyphs at rest. On illustrated cursor hover, each button and its plus enlarge together, with white fill and a blue plus. The shorter stems and click timing are preserved.

## Dub component restyle

03 now uses the Dub design kit from Dropbox and the Paper Dub agent-picker reference. Flat white surfaces with ash borders replace the broad glass surrounds; panel corners are tighter, labels are charcoal, and blue feedback uses #00AEFF. The original gradient artwork, 27.6-second sequence, connected node construction, menu skeletons, icons, user selection, and hover/click behavior remain. This styling pass supersedes the earlier glass appearance. The original source/runtime exports and all four Dub reference files are preserved in `outputs/homepage-animation-fixes-2026-10-03/03/dub-restyle/`.

## 03 layout and agent picker version

Set condition now remains at 75% scale beside a smaller Start, with bottom outputs and downward connections to the user and agent nodes. The agent picker follows Paper node `8Y-0`, includes seven named character options, and selects Outreach Owen. All next-step menus use the supplied outline agent icon. The original #00AEFF accent is restored in the animation and Dub design references. Version backups and exported `.riv` / `.rev` files are in `outputs/homepage-animation-fixes-2026-10-03/03/bottom-layout/`.

## 03 selection-field refinement

Both assignment fields expand into their menus in 200 ms and collapse in 200 ms, preserving text proportions. Input labels and downward chevrons stay at the top while the menu is open. The demonstrated agent selection is now Research Riley. Thread created includes a Slack SVG and a right-side chevron. Source/runtime exports and review captures are retained in `outputs/homepage-animation-fixes-2026-10-03/03/snappy-pickers/`.

03 now uses all seven canonical character SVGs from `Dropbox/innflow Agents Icons/Colored SVGs`, including the selected Research Riley icon. The agent picker grows to 320 × 344 units from approximately 266 × 284, with the native field and menu sharing an origin and bounds. The connected agent node shifts left and up while open to keep the complete menu inside the artboard. The fixed header, downward chevron, option hover/click feedback, 200 ms field transitions, and 27.6-second loop are preserved. Backups, exact source SVGs, editable/runtime exports, and review captures are retained in `outputs/homepage-animation-fixes-2026-10-03/03/agent-svg-fit/`.

03’s If and Else handles now fade in with the initial Set condition content at frames 209–228, already facing down from the bottom edge. Their positions follow the condition’s scale and movement through the reorder at frames 426–463. Later handle clicks, connected menus, agent SVGs, and the 27.6-second loop are preserved. Before/after exports and review frames are retained in `outputs/homepage-animation-fixes-2026-10-03/03/early-bottom-handles/`.

03’s agent picker now matches the native selection field’s approximately 232-unit width and expands only downward, like Laura Kim’s picker. Seven readable 40-unit option rows fit a 332-unit menu height without moving the agent node. The illustrated cursor hovers Outreach Owen, then Follow-up Fred in the second row, gives Fred light-blue click feedback, and reveals his canonical yellow SVG and name after the menu closes. Follow-up Fred supersedes Research Riley as the demonstrated selection. Fixed input labels, downward chevrons, 200 ms transitions, early bottom condition handles, and the 27.6-second loop are preserved. Exports and review frames are in `outputs/homepage-animation-fixes-2026-10-03/03/fred-narrow-picker/`.

03’s Laura Kim field now keeps its chevron at its settled position after selection. The stale movement at frames 878–905 was removed; the chevron resets only during the closing fade. Review captures and exports are in `outputs/homepage-animation-fixes-2026-10-03/03/laura-chevron/`.

03’s connector routes, pending edges, and menu bridges now render behind all node components. The Start output moves around the card edge immediately before the layout reorder, then tracks the actual right-edge midpoint throughout shrinking and the final hold. Its route follows both ports; the closing reset remains smooth. Exports and captures are in `outputs/homepage-animation-fixes-2026-10-03/03/edge-layering/`.

03’s first layout reorder now follows the illustrated click on the large Set condition node’s bottom If stub. Hover runs at frames 408–419, press and layout start share frame 426, the layout settles at frame 463, and the Select next step shell reveals at frames 470–480. The cursor tracks the pressed handle through the rearrangement before moving into the menu. This is the authored demonstration sequence, not a new runtime input listener. Evidence and exports are in `outputs/homepage-animation-fixes-2026-10-03/03/layout-on-handle-click/`.

The user-supplied `/Users/ak/Documents/03_-_put_ai_to_work_your_way.riv` is now the installed 03 runtime. It replaces the later working revisions. In the AI agents section, display order is now 03, 02, 01, 04, 05, 06: Put AI to work your way is first, and Pick up conversations with context is third. Asset numbers remain stable.
