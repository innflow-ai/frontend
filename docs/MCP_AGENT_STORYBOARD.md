# MCP agent storyboard preview

Source: https://www.figma.com/design/JkJnW5Q1AIVAqgoV2AqAyb/-CMS_Template-?node-id=1171-5857

Component: `src/components/mcp-agent-orbit/mcp-agent-orbit.tsx`.
Preview: `/component-lab/mcp-agent-orbit`. Includes replay, pause/resume, and a static reduced-motion comparison. No-index route. Placement on a public page is still to be selected.

Native React and the existing Motion dependency drive the supplied artwork. No Remotion or Rive runtime is required. Scene dimensions remain 771 x 830 and scale proportionally to the container. Original SVG masks and gradients are packaged in `public/brand/mcp-agent-orbit`. The lower tile uses the canonical white Dropbox Innflow wordmark instead of the abbreviated mark in the Figma reference.

The blue/mint gradient, casing, slot borders, and lower tile remain stationary. The orbit rotates around (386,1192). The selected agent enlarges uniformly behind the hub, then comes forward for the settled hold. The cover clips its fixed text and fasteners instead of stretching them.

Proposed pose times at 60 fps: 0, 48, 60, 75, 84, 156, 174, 183, 198, 228, 264. The orbit holds from dock to return. Focus size is 112 -> 189.89 -> 165 -> 112. Cover heights are 76 -> 0 -> 71 -> 102 -> 140 -> 80, clipped to the 130-pixel slot.

Playback starts when at least 15% of the component is visible. It pauses off-screen, in hidden tabs, or through the `paused` prop, preserving elapsed time. Reduced motion shows frame 75 immediately. The `poseFrame` prop allows a deterministic still for review. One pass stops at frame 264 after 4.4 seconds. The supplied final and initial poses are not a matching loop seam, so automatic looping is deliberately left disabled.

Validation: scoped Biome checks, TypeScript, and playback tests covering hidden-tab pause/resume, off-screen pause/resume, final-pose stopping, and reduced motion. The frontend preview was visually inspected in Chrome against the Figma reference. This is a local draft, not a deployment.
