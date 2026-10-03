# Homepage animation fixes

Created: 2026-10-03

Updated: 2026-10-03

Status: Review notes captured. All requested fixes below are pending.

Animation numbers and titles follow the current [homepage storyboard manifest](../src/app/preview/scroll-showcase/homepage-storyboards.json). See [Homepage Rive animations](HOMEPAGE_RIVE_ANIMATIONS.md) for source links. These are review notes, not implementation or playback verification results.

## AI agent

### 01. Pick up conversations with context

**Direction: Redo / fix the opening reveal.**

- [ ] Fix the premature shadow around the Joseph Myers conversation at the start. The top shadow of the second message appears before the message itself.
- [ ] Make the second message and its shadow appear together, with no shadow visible ahead of the message.

### 02. Let AI manage your contacts

**Direction: Looks good overall; explore a livelier animation.**

- [ ] Make the scene feel more alive. Suggested direction: animate the chart building itself.

Review wording included “redo” after this suggestion; the extent of the rework is unclear. Preserve the positive assessment of the current design when developing the motion changes.

### 03. Put AI to work your way

**Direction: Needs fixing / rework.**

- [ ] Rework this animation. The review clearly flags it as needing a fix but does not specify individual defects or a replacement direction.

### 05. Respond with the full picture

**Direction: Add detail and polish.**

- [ ] Give the second message that appears more detail and visual interest. The review asks for more “spice”; the specific treatment is still to be defined.

### 06. Learn what keeps coming up

**Direction: Full redo. The current animation feels raw.**

- [ ] Redo the animation.
- [ ] Correct the spacing of the appearing elements.
- [ ] Reduce excessive corner rounding on the appearing elements.

## Assistant

### 11. Spend less time finding answers

**Direction: Small icon correction.**

- [ ] Replace the top-right icon in the “Ask Sidekick” interface with an X / close icon.

### 13. Delegate tasks. Keep the final say.

**Direction: Redo.**

- [ ] Redo this animation. No specific replacement direction was given in the review.

## Insights

### 15. Know what to improve next

**Direction: Full redo. The current animation feels raw.**

- [ ] Redo this animation. No specific replacement direction was given in the review.

### 16. Catch up instantly

**Direction: Icon update.**

- [ ] Change the icons to the requested stroke icon style. The dictated name was “made UI stroke icons”; confirm the exact icon library name before choosing replacements.

### 17. Start each day with a clear picture

**Direction: Improve the opening and return transitions.**

- [ ] Smooth out the transition at the start.
- [ ] Animate the return to the first state by scaling the entire component down, with panning as appropriate to the intended movement, so the loop returns smoothly.

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

No changes were explicitly requested across all animations in this review.
