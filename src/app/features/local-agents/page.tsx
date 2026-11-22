import { FeatureStoryPage } from "@/components/feature-story-page";
import { appSignup } from "@/content/feature-story";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Hand a task from an Innflow channel to Codex or Claude Code on your Mac, then bring the findings back to your team for review.";

export const metadata = createPageMetadata({
  title: "Local agents for team workflows | Innflow",
  description,
  path: "/features/local-agents",
});

export default function LocalAgentsPage() {
  return (
    <FeatureStoryPage
      sections={[
        {
          type: "hero",
          id: "local-agents",
          eyebrow: "Local agents",
          title: "Take a question from the channel",
          emphasis: "to the code.",
          subtitle: description,
          primary: { label: "Open Innflow", href: appSignup },
          secondary: {
            label: "Explore channels",
            href: "/features/communications",
          },
          lines: [
            {
              role: "Designer",
              text: "The compact header clips the workspace name. Can you check the layout in the local project?",
            },
            {
              role: "Developer",
              text: "Codex, check the header at phone width and show us a proposed change for review.",
            },
            {
              role: "Local agent",
              text: "The title and controls share a fixed-width row. Here’s the proposed layout and a before-and-after check.",
            },
          ],
        },
        {
          type: "steps",
          id: "handoff",
          title: "Give the agent a task you can verify.",
          steps: [
            {
              title: "Name the project and the symptom",
              body: "Mention your local agent in the channel. Include the project, what you observed and the result you expected.",
            },
            {
              title: "Define the scope",
              body: "Say whether you want an explanation, a proposed edit or a test run. Include a sample input or screen size so the agent can repeat the check.",
            },
            {
              title: "Review the evidence together",
              body: "Ask for the affected files and a short account of what changed. A teammate can compare the result with the original request before accepting it.",
            },
          ],
        },
      ]}
    />
  );
}
