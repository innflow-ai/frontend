# Homepage collaboration section

Source: [Figma, Collaborate / Channels and tools](https://www.figma.com/design/PYDAg6cwYXTJb6dpWuPLYF/innflow-web?node-id=39-3868).

The homepage mounts this section between WorkspaceOverview and BaselineFeatures. Slack, Microsoft Teams, email, and iMessage are separate HTML components, with locally downloaded provider icons, avatars, and the store attachment under public/brand/collaboration.

On supported desktop viewports, CollaborationSection pins one display and native page scrolling changes its contents in order. It uses the same desktop and reduced-motion breakpoint as the AI agent section below. The platform links jump to the corresponding scroll position. Phone and reduced-motion layouts keep the four examples in document order.

Every demo remains mounted when another platform is displayed, so local messages and edits survive forward and backward scrolling. Slack and Teams allow switching between data-analysis and sales-discussion and expanding threads. Inbox rows expand, Reply and Forward open local draft composers, and iMessage accepts local messages. These interactions use component state only: they make no requests and deliver nothing to external services.

The static layout and content remain in the four demo files. Small client components in demo-interactions.tsx supply the native controls. Phone layouts hide app sidebars and reflow conversations. Platform anchors remain usable without JavaScript.

The reference CSS and data-node-id attributes retain the Figma geometry for traceability. Shared message styles replace absolute text placement where wrapping is required. Product mentions use Innflow; provider identities and source artwork are preserved. The components do not depend on Rive, exported screenshots, or temporary Figma asset URLs.
