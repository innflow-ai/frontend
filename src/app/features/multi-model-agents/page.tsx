import { FeatureStoryPage } from "@/components/feature-story-page";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Plan an agent handoff across models with a shared brief, a review rubric and an owner for the final decision.";
export const metadata = createPageMetadata({
  title: "Multi-model agent workflows | Innflow",
  description,
  path: "/features/multi-model-agents",
});
export default function Page() {
  return (
    <FeatureStoryPage
      sections={[
        {
          type: "hero",
          id: "multi-model-agents",
          eyebrow: "Multi-model agents",
          title: "Give the draft and the review separate jobs.",
          subtitle: description,
          primary: { label: "Browse model guides", href: "/models" },
          secondary: { label: "Explore flows", href: "/features/workflows" },
          lines: [
            {
              role: "Drafting brief",
              text: "Prepare the customer update using the approved incident timeline. Cite the event behind each claim.",
            },
            {
              role: "Review brief",
              text: "Check the draft against the timeline. Flag unsupported claims and any wording that promises an unconfirmed fix.",
            },
          ],
        },
        {
          type: "steps",
          id: "review",
          title: "Compare outputs on a task you know.",
          steps: [
            {
              title: "Choose a shared input",
              body: "Give each participant the same source files and constraints. Check which models are available in your workspace.",
            },
            {
              title: "Define the handoff",
              body: "Specify which output the reviewer receives, what to check and how to report disagreements.",
            },
            {
              title: "Resolve differences",
              body: "Have the owner inspect the underlying evidence and approve the final version before it goes to the customer.",
            },
          ],
        },
      ]}
    />
  );
}
