# Portable agent showcase

Copied from the user-supplied Dropbox package:
Innflow Homepage Planning / Agents HTML Component - 2026-10-29.

The JavaScript, provider illustrations, and licensed Inter font are preserved from that package. The CSS adds an optional --agent-heading-font property so the homepage can use Instrument Sans for headings; standalone embeds retain Inter. The homepage embeds the custom element through src/components/homepage-agent-showcase.tsx, immediately before HomepageCollaboration. Preview-only navigation and device-size controls are not included in the homepage.

Edit the agents array in agent-showcase.js to change the six illustrative examples. selectAgent(id) and the agent-change event remain available. Tabs support pointer, touch, Arrow Up/Down, Home, and End; output cards expand with native details/summary controls. No external service is contacted.

The wrapper registers the package font in the document for use inside the shadow root. Component styles remain scoped to the custom element.

The surrounding split layout, Build heading, CTA row, divider, and capability list follow Figma file PYDAg6cwYXTJb6dpWuPLYF, node 39:3260. Its eight original 16px icons are stored in section-icons. The interactive demo retains the supplied package styling and data. Explore agents links to /products/ai-agents; Read docs links to https://docs.innflow.ai.
