import { FeatureStoryPage } from "@/components/feature-story-page";
import { appSignup } from "@/content/feature-story";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Give your agent a bounded task on a site you authorize. It can look up a record or prepare a form for you to review.";

export const metadata = createPageMetadata({
  title: "Computer for browser tasks | Innflow",
  description,
  path: "/features/computer",
});

export default function Page() {
  return (
    <FeatureStoryPage
      product="computer"
      sections={[
        {
          type: "hero",
          id: "computer",
          eyebrow: "Computer",
          title: "Let your bot handle the clicks.",
          subtitle: description,
          primary: { label: "Get started", href: appSignup },
          secondary: { label: "Explore bot mode", href: "/products/ai-agents" },
          lines: [
            {
              role: "Teammate",
              text: "Open the support queue and find the ticket about the missing invoice.",
            },
            {
              role: "Agent",
              text: "I found the ticket. The requester included an order number, but the invoice date is missing.",
            },
          ],
        },
        {
          type: "steps",
          id: "browser-task",
          title: "Hand off a browser task",
          steps: [
            {
              title: "Define the result",
              body: "Name the site, the record to look for and what you want back. For a form, supply the values the agent should enter.",
            },
            {
              title: "Set the boundary",
              body: "Specify which site the agent may use and where it should pause, such as before submitting a form.",
            },
            {
              title: "Review the result",
              body: "Check the record or prepared fields and decide how to handle missing information.",
            },
          ],
        },
        {
          type: "close",
          id: "local-agents",
          title: "Does the task live in your codebase?",
          subtitle:
            "Give a local agent the project and the checks you want it to run. Your team can review its findings in the channel.",
          links: [
            { label: "Explore local agents", href: "/features/local-agents" },
          ],
        },
      ]}
    />
  );
}
