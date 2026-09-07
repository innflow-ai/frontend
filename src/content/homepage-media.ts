export const homepageViews = [
  "Workflows",
  "Assistant",
  "Knowledge",
  "Approvals",
] as const;
export type HomepageView = (typeof homepageViews)[number];

export type HomepageRecording = {
  src?: string;
  poster?: string;
  captions?: string;
  label: string;
};

// Add public video paths (for example /product/workflows.mp4) here when ready.
// Empty sources intentionally render blank glass, without placeholder UI.
export const homepageMedia: {
  hero: Record<HomepageView, HomepageRecording>;
  features: Record<HomepageView, HomepageRecording>;
  closing: HomepageRecording;
} = {
  hero: {
    Workflows: { label: "Innflow workflows" },
    Assistant: { label: "Innflow assistant" },
    Knowledge: { label: "Innflow knowledge" },
    Approvals: { label: "Innflow approvals" },
  },
  features: {
    Workflows: { label: "Innflow workflows in action" },
    Assistant: { label: "Innflow assistant in action" },
    Knowledge: { label: "Innflow knowledge in action" },
    Approvals: { label: "Innflow approvals in action" },
  },
  closing: { label: "Innflow product overview" },
};
