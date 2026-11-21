# Channels animation drafts

Local preview only: `/preview/scroll-showcase#channels`.

Six independent React + Motion foreground demos replace the six static Channels illustrations. The host supplies the static background separately; the reusable demos themselves have transparent backgrounds.

| Menu item | Component | Proposed sequence |
| --- | --- | --- |
| All your channels, connected | `ConnectedChannelsDemo` | Channel tiles appear, connect to a shared thread, messages arrive, connected status appears. |
| An assistant for your team | `TeamAssistantDemo` | Request appears, typing indication plays, assistant response resolves. |
| AI agents, working together | `AgentsHeroDemo` | Agent tiles enter, connection pulse travels, Innflow agent is emphasized. |
| Workflows that take action | `OrchestrateActionsDemo` | Decision appears, paths reveal, human and agent assignments resolve. |
| Insights from every interaction | `InsightsDemo` | Customer issues enter, related issues highlight, summary appears. |
| Flexible, API-first building blocks | `ApiBuildingBlocksDemo` | Connected tool icons appear around the agent, agent card resolves. |

## Playback and performance

- Each sequence lasts approximately six seconds, then holds its final state. Timing is a draft proposal, not a measured replica of the reference recordings.
- Shared playback runs only while selected, at least 25% in view, and the browser document is visible. Pause/resume preserves progress; Replay starts again.
- Reduced motion displays the completed static state and hides playback controls.
- Demo modules load when first selected near the viewport. Visited demos stay mounted but paused when deselected. No perpetual off-screen loops or per-frame React state updates.
- The host reserves space for controls and uses a taller mobile container. Workflow cards stack at narrow container widths.

## Source and scope

- Figma CMS Template file `JkJnW5Q1AIVAqgoV2AqAyb`: Agents board `439:10266`, agent hero `439:10270`, orchestration `439:10285`, assistant `439:10309`, building blocks `439:10324`, Insights `439:10457`.
- Connected Channels is an original composition from the existing six-channel menu brief. Other foreground compositions reuse the editable Figma structures and supplied icon/avatar assets.
- Host background is the supplied Channels Availability background-only PNG, copied to `public/preview/homepage/agent-demos/channels-background.png`.
- People, brands, conversations, and customer data are illustrative reference content. Review these and verify capability claims before publishing.
- No public homepage, Figma, CSV, or deployment changes are part of this batch.

## Verification

Focused tests cover all six menu mappings, existing Channels scrolling/keyboard behavior, playback pause/resume/replay, document visibility, off-screen playback, reduced motion, and cleanup. Browser checks cover the six narrow-screen states and desktop playback controls.
