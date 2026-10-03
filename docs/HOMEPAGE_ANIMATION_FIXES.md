# Homepage animation fixes

Created: 2026-10-03

Updated: 2026-10-03

Status: Revisions for 05, 11, 13, 15, and 16 are implemented, exported, and installed locally for visual review. 06 was subsequently reassigned to the assistant and rebuilt with a fixed gray header and one downward-expanding body. 17 remains checked off at the user's request. Earlier 01–03 work is recorded below, with the supplied 03 runtime taking precedence over its historical revisions.

Animation numbers and titles follow the current [homepage storyboard manifest](../src/app/preview/scroll-showcase/homepage-storyboards.json). See [Homepage Rive animations](HOMEPAGE_RIVE_ANIMATIONS.md) for source links. Checked items record implementation or explicit user-directed scope exclusions. Verification for the current five-scene revision is recorded in the handoff below.

## AI agent

### 01. Pick up conversations with context

**Direction: Redo / fix the opening reveal.**

- [x] Adjust the premature shadow/reveal around the Joseph Myers conversation at the start. The second message now stays hidden until 1.93 seconds and fades in over 0.17 seconds, already near full size.
- [x] Keep the second message and its baked-in shadow under the same reveal transform and opacity. Checked the frame immediately before the reveal and the visible message afterward.

First pass: replaced the small, prolonged entrance with a restrained 94% to 100% scale reveal. The 24-second loop is retained. Final visual acceptance is pending user review.

### 02. Let AI manage your contacts

**Direction: Looks good overall; explore a livelier animation.**

- [x] Make the scene feel more alive with a progressive build. The source contains a contacts table, so its five rows now enter in sequence and their details resolve progressively. The filter interaction is retained.

First pass: added staggered row fades and short vertical movement, staggered the detail reveals, and added a matching row exit for the loop return. The 7.6-second loop is retained. Final visual acceptance is pending user review.

Review wording included “redo” after this suggestion; the extent of the rework is unclear. Preserve the positive assessment of the current design when developing the motion changes.

### 03. Put AI to work your way

**Direction: Keep the overall design; slow the sequence, soften the motion, and update all node icons.**

The detailed review supersedes the earlier general rework note: the animation is pretty good overall, but movement feels stiff.

- [x] Slow down the overall animation from 15 seconds to 27.6 seconds.
- [x] Add readable pauses after key steps for an audience unfamiliar with workflows. Retimed all 5,942 keys consistently and added three longer holds.
- [x] Soften the movement while retaining the composition and sequence. Updated the easing curves to ease in and out, and matched the sampled handle transforms to those curves.
- [x] Replace the non-agent node icons with the local Mage UI stroke assets: Play, Filter 2, and User. This uses Mage UI as the interpretation of the dictated “Mate UI.”
- [x] Give those stroke node icons colored backgrounds with white strokes.
- [x] Follow-up: change the imported glyphs' black interior fills to white.
- [x] Follow-up: vertically center the Start node icon with the Start text.
- [x] Follow-up: replace the “Trigger” label with an orange Mage UI filled Zap icon.
- [x] Build every add-node menu after its stub is clicked. Show icon-and-label skeleton placeholders while the glass container expands, then reveal all menu labels together before selection. This supersedes the earlier immediate-label direction.
- [x] Reuse the actual connected node as the context-menu container. The small blank glass shell expands into the menu, settles directly into the finished node size after selection, and then loads its contents without a second resize. Applied to Set condition, Assign to user, and Assign to agent.
- [x] Use the same native glass backing and rounded panel as the other nodes, retaining the existing input ports and connections throughout. The Start connector follows the moving card edge.
- [x] Stabilize the If and Else field widths through loading and completion; remove the narrow Else collapse and the second If width expansion.
- [x] Resize native panel and field geometry while keeping uniform scale, so corners retain their shape. Normalize the condition, user, and agent panels and their glass backings.
- [x] Shorten all add-node stubs from 71 to 52 units. Buttons have a blue fill and white plus at rest; the illustrated cursor hover changes the fill to white and the plus to blue, enlarging both together from 80% to 110%. Retarget the cursor to the shorter handles.
- [x] Make the first context menu 480 units wide, about 10% narrower than the finished 533-unit Set condition node. Keep a roughly 109-unit gap below Start, build the menu open, and expand it once while revealing the node label and fields.
- [x] Remove the first context menu label's vertical squeeze on click; keep text at its normal proportions.
- [x] Place the skeleton state on the Select next step menu options immediately after the stub click, as clarified. Remove the later post-selection node skeletons.
- [x] Give every option in all three menus its own Mage UI stroke icon: Zap, User, Book Text, Reload, and Filter 2. Assign to agent uses the supplied Transparent eye cutouts SVG. Include matching icon placeholders in the skeleton.
- [x] Keep Laura Kim and the selected agent hidden until their picker selections complete; remove the premature selected-content flash.
- [x] Put Alex Morgan first and Laura Kim second. Show neutral hover feedback on Alex, move it to Laura, and briefly turn Laura's row light blue on click before selecting her.
- [x] Apply matching neutral hover and light-blue click feedback to all three context menus and the agent picker. Extend the user-picker interval by 0.6 seconds for readability.
- [x] Use the new [Innflow agent character SVG](/Users/ak/Downloads/innflow_agent_idle_blue.svg) for the Innflow agent node, preserving its artwork and colors. An implementation copy is retained in the revision artifacts.
- [x] Review component staging and improve step-by-step readability through longer holds and softer transitions, keeping the layout intact.
- [x] Check the updated poses, a complete playback loop, and matching opening/closing frames in the website's WebGL2 renderer.

**Dub styling pass:** The later restyle supersedes the glass appearance described above. Nodes, menus, and fields now use white surfaces, #E5E5E5 borders, tighter corners, charcoal text, and #00AEFF interaction accents, based on the Dropbox Dub kit and Paper agent-picker reference. The connected-shell construction, skeletons, timing, icons, and interactions are preserved. Before-restyle `.riv` and `.rev` backups and copies of all four design reference files are retained in `outputs/homepage-animation-fixes-2026-10-03/03/dub-restyle/`.

**Side-by-side and downward-branch version:** Set condition retains 75% scale beside a smaller Start. If and Else handles move to the bottom edge, connecting downward to Assign to user and Assign to agent. The growing menus stay centered under their input ports. The agent dropdown follows [the Paper picker](https://app.paper.design/file/01M41BF5A3NJASJTE85A7634TS/p-1-0/8Y-0), with seven named characters, hover and blue press feedback, and Outreach Owen appearing after selection. Every Select next step menu uses the supplied outline agent SVG. The prior #00AEFF accent is restored in the animation, all four Dropbox Dub files, their working copies, and Paper’s Dub accent token. Before/after exports and review images are retained in `outputs/homepage-animation-fixes-2026-10-03/03/bottom-layout/`.

**Selection-field refinement:** Both the user and agent fields now expand into their choices in 200 ms and close in 200 ms. The native field geometry grows downward without stretching the option text. The field label and downward chevron remain at the top until selection; chevrons remain after selection. The agent demonstration hovers Outreach Owen, then selects Research Riley with blue press feedback. Thread created now has a Slack SVG on the left and a downward chevron on the right. Before/after exports and review captures are in `outputs/homepage-animation-fixes-2026-10-03/03/snappy-pickers/`.

First pass is ready for user review. The runtime timeline name still contains “15s” to preserve the existing integration contract; its actual duration and manifest duration are now 27.6 seconds.

### 05. Respond with the full picture

**Direction: Keep the original Dominic Mills component and develop it in place.**

- [x] Keep the original email, recipient, and request visible while its native panel and backing expand downward.
- [x] Reveal a draft response, calendar icon, divider, and Ready for review state inside that same component.
- [x] Suppress the separate second message and its shadow throughout the timeline.

This supersedes the earlier request to embellish a second message. The loop remains 11.5 seconds; the expanded state and return were checked in WebGL2 playback.

### 06. Learn what keeps coming up

**Direction: One focused component, with a gray header and a body that extends downward.**

The user reassigned 06 to the assistant after it would not load. The source opened successfully and its original export played in WebGL2; the exact earlier failure was not reproduced. An empty first artboard was present and could show a blank scene in a default-artboard viewer. The empty starter was removed from the editable source, but Rive still emits an empty default artboard in this runtime export. The homepage therefore explicitly selects the named scene and state machine. The original is preserved in the before backup.

- [x] Create and browser-check a standalone HTML motion preview before Rive composition.
- [x] Rebuild as one component with a persistent gray header, fixed position and width, and a white body that extends downward without scaling text.
- [x] Retain the original Cedar issue and related reports from Flowbit, Ollo, and Codemesh; reveal them with consistent spacing, smaller corner radii, and a linked-conversation review action.
- [x] Preserve the existing gradient and runtime names. The actual loop is now 12 seconds; the legacy animation name still contains “8s.”
- [x] Save editable/runtime exports and install the revised runtime and readable fallback image locally.

HTML preview, before/final exports, and rendered endpoint captures are in `outputs/homepage-animation-fixes-2026-10-03/remaining/06/`. The opening/closing editor poses match byte-for-byte. See the verification file for final runtime playback and test evidence.

## Assistant

### 11. Spend less time finding answers

**Direction: Small icon correction.**

- [x] Replace the top-right icon in the “Ask Sidekick” interface with a native X / close icon. Checked in both the opening and expanded panel. The 6-second sequence is retained.

### 13. Delegate tasks. Keep the final say.

**Direction: Redo.**

- [x] Rebuild around one persistent task card: request, staggered task preparation, draft review, and approval.
- [x] Use skeleton placeholders, native expanding geometry, readable holds, and an illustrated cursor for review and approval.
- [x] Apply the current Calendly-inspired navy, white, cool-gray, and blue controls while retaining the original gradient.

The new loop is 14 seconds. Its legacy timeline name still contains “8.2s” to preserve the integration contract.

## Insights

### 15. Know what to improve next

**Direction: Full redo. The current animation feels raw.**

- [x] Rebuild the centered-card source as one persistent insight component, retaining the original Slack API thread-management issue.
- [x] Resolve the heading skeleton, expand the card to show the summary and two evidence rows, then reveal the three-linked-conversations review action.
- [x] Apply the current Calendly-inspired component styling and preserve the original mint gradient.

The new loop is 12 seconds. The legacy timeline name still contains “10s”; the manifest records the actual duration. Source: [innflow-15-centered-cards](https://editor.rive.app/file/innflow-15-centered-cards/2628054).

### 16. Catch up instantly

**Direction: Icon update.**

- [x] Replace Stars A, Chevron Down, Chip, and Search with Mage UI stroke SVGs from the supplied local library, retaining their parent transforms and timing. Checked the expanded state and complete 6-second loop.

### 17. Start each day with a clear picture

**Direction: Improve the opening and return transitions.**

- [x] Smooth out the transition at the start.
- [x] Animate the return to the first state by scaling the entire component down, with panning as appropriate to the intended movement, so the loop returns smoothly.

Checked off at the user's request on 2026-10-03 and excluded from this revision pass. This is a user-directed completion status, not new assistant playback or export verification.

## Fine for now

| Number | Animation | Review note |
| --- | --- | --- |
| 04 | Connect your agents to your tools | “Next one's fine” immediately after 03; mapped by sequence. |
| 12 | Get requests to the right team | Looks fine. |
| 14 | Schedule your assistant | Fine. |
| 18 | Turn insights into action | Good for now. |

## Unnamed approvals and unreviewed items

After 06, the review says “next one ... okay” twice before naming 11. These likely refer to 07 and 08 if the walkthrough followed the manifest order, but the titles were not spoken. Keep these approvals provisional.

| Number | Animation | Review status |
| --- | --- | --- |
| 07 | Get work done across your tools | Likely okay by sequence; title not explicitly identified. |
| 08 | A little help with everyday work | Likely okay by sequence; title not explicitly identified. |
| 09 | Focus on the requests that matter | No identifiable feedback captured. |
| 10 | Turn requests into completed tasks | No identifiable feedback captured. |

## Shared changes

### Current storyboard and design foundation

The user selected Innflow storyboarding plus the supplied Calendly design markdown as the current foundation. One recognizable component should expand through the story, with native geometry, reserved text slots, meaningful interaction, and a planned loop return. Preserve Innflow gradients, portraits, fonts, and agent artwork. Dub styling notes for older 03 revisions below are historical, not the default for new scenes.

The generic Rive skill routes Innflow work to the updated domain skill and its `references/storyboard-calendly-direction.md`. Both skill packages passed structural validation.

### Innflow agent icon reference

Use the new [innflow_agent_idle_blue.svg](/Users/ak/Downloads/innflow_agent_idle_blue.svg) as the current Innflow agent icon reference when updating these animations. The user supplied this asset from the new character SVG set. Its use is explicitly recorded for animation 03 above.

Source file availability and import into animation 03 verified on 2026-10-03.

## First-pass handoff: 01–03

- Revised runtime files are installed at `public/brand/homepage/01.riv` through `03.riv`.
- Updated editable `.rev` files and runtime `.riv` files are also in `outputs/riv-animations/Rive animations/Numbered current exports`.
- Before/after exports, source SVGs, review frames, and loop comparison results are retained in [the revision folder](../outputs/homepage-animation-fixes-2026-10-03/).
- All three completed a playback loop, and their opening/closing frame comparisons matched exactly in captured WebGL2 output. The focused homepage animation suite passed: 8 tests.
- These are local changes, ready for visual review. No deployment is implied.

03 now uses all seven canonical character SVGs from `Dropbox/innflow Agents Icons/Colored SVGs`, including the selected Research Riley icon. The agent picker grows to 320 × 344 units from approximately 266 × 284, with the native field and menu sharing an origin and bounds. The connected agent node shifts left and up while open to keep the complete menu inside the artboard. The fixed header, downward chevron, option hover/click feedback, 200 ms field transitions, and 27.6-second loop are preserved. Backups, exact source SVGs, editable/runtime exports, and review captures are retained in `outputs/homepage-animation-fixes-2026-10-03/03/agent-svg-fit/`.

03’s If and Else handles now fade in with the initial Set condition content at frames 209–228, already facing down from the bottom edge. Their positions follow the condition’s scale and movement through the reorder at frames 426–463. Later handle clicks, connected menus, agent SVGs, and the 27.6-second loop are preserved. Before/after exports and review frames are retained in `outputs/homepage-animation-fixes-2026-10-03/03/early-bottom-handles/`.

03’s agent picker now matches the native selection field’s approximately 232-unit width and expands only downward, like Laura Kim’s picker. Seven readable 40-unit option rows fit a 332-unit menu height without moving the agent node. The illustrated cursor hovers Outreach Owen, then Follow-up Fred in the second row, gives Fred light-blue click feedback, and reveals his canonical yellow SVG and name after the menu closes. Follow-up Fred supersedes Research Riley as the demonstrated selection. Fixed input labels, downward chevrons, 200 ms transitions, early bottom condition handles, and the 27.6-second loop are preserved. Exports and review frames are in `outputs/homepage-animation-fixes-2026-10-03/03/fred-narrow-picker/`.

03’s Laura Kim field now keeps its chevron at its settled position after selection. The stale movement at frames 878–905 was removed; the chevron resets only during the closing fade. Review captures and exports are in `outputs/homepage-animation-fixes-2026-10-03/03/laura-chevron/`.

03’s connector routes, pending edges, and menu bridges now render behind all node components. The Start output moves around the card edge immediately before the layout reorder, then tracks the actual right-edge midpoint throughout shrinking and the final hold. Its route follows both ports; the closing reset remains smooth. Exports and captures are in `outputs/homepage-animation-fixes-2026-10-03/03/edge-layering/`.

03’s first layout reorder now follows the illustrated click on the large Set condition node’s bottom If stub. Hover runs at frames 408–419, press and layout start share frame 426, the layout settles at frame 463, and the Select next step shell reveals at frames 470–480. The cursor tracks the pressed handle through the rearrangement before moving into the menu. This is the authored demonstration sequence, not a new runtime input listener. Evidence and exports are in `outputs/homepage-animation-fixes-2026-10-03/03/layout-on-handle-click/`.

The user-supplied `/Users/ak/Documents/03_-_put_ai_to_work_your_way.riv` is now the installed 03 runtime. It replaces the later working revisions. In the AI agents section, display order is now 03, 02, 01, 04, 05, 06: Put AI to work your way is first, and Pick up conversations with context is third. Asset numbers remain stable.

## Remaining-scene handoff: 05, 11, 13, 15, 16

- Revised `.riv` files and matching WebP fallback artwork are installed in `public/brand/homepage`. Both manifests record current durations, export sizes, and SHA-256 checksums.
- Editable `.rev` and runtime `.riv` copies are in the numbered export collection and `/Users/ak/Library/CloudStorage/Dropbox/finished_rive_homepage/2026-10-03-remaining-revisions/`. Existing Dropbox originals are retained.
- Before/after files, readable-state captures, endpoint captures, implementation scripts, and verification metadata are in [the revision folder](../outputs/homepage-animation-fixes-2026-10-03/remaining/).
- All five revised exports loaded and completed loops in the website's WebGL2 runtime. Readable intermediate states were visually checked.
- For all five, editor renders of the authored opening and closing poses matched byte-for-byte. These comparisons sampled native keyed properties at the settled endpoints; they are distinct from the separately observed runtime playback checks.
- The focused baseline-feature and storyboard-artwork suites passed: 2 files, 10 tests. Delivered runtime/source copies were checked against the final exports.
- These revisions are ready for user visual review. They have not been committed or deployed.

### 06 approved Figma storyboard redesign

The user approved the new HTML component as the exact reference and asked to make it the Rive skill's default for this component family. It uses the current Figma Rive-test page: recurring issue master `1620:24948`, Admin management panel `1585:3834`, and Automatic triage `1620:36337`. This supersedes the earlier inset-row 06 design.

The single panel now has Geist 400/600 typography, a neutral gray “Recurring issues” header, a prominent finding, the source's 11-customer summary, a flat two-column evidence table with the original Cedar/Flowbit/Ollo logos, Codemesh text, thin separators, a glass rim, and a blue text link. Position and width remain fixed; the panel extends downward. The 12-second motion follows the approved HTML preview. Native glass uses layered highlights rather than identical CSS blur effects.

Editable/runtime exports, provenance, local font/logo assets, preview, and captures are in `outputs/homepage-animation-fixes-2026-10-03/remaining/06/figma-redesign/`. Current homepage files, numbered collection, and Dropbox delivery are refreshed. The skill bundles a portable copy of the approved HTML and assets; Figma/approved-preview fidelity now takes priority over generic Calendly styling or added overshoot.
