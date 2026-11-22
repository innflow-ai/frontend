import { FeatureStoryPage } from "@/components/feature-story-page";
import { appSignup } from "@/content/feature-story";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Turn a campaign brief into a LinkedIn draft, review the exact copy, and schedule your flow to share the approved post.";

export const metadata = createPageMetadata({
  title: "Social media scheduling for LinkedIn | Innflow",
  description,
  path: "/solutions/social-media-scheduling",
});

export default function Page() {
  return (
    <FeatureStoryPage
      sections={[
        {
          id: "overview",
          type: "hero",
          eyebrow: "Social media scheduling",
          title: "Have Friday’s LinkedIn post ready on Thursday.",
          subtitle: description,
          primary: { label: "Build a flow", href: appSignup },
          secondary: { label: "Explore flows", href: "/features/workflows" },
          lines: [
            {
              role: "Campaign owner",
              text: "Draft a post inviting customers to Friday’s product walkthrough. Use the registration link from the brief.",
            },
            {
              role: "Draft for review",
              text: "See how our team builds a weekly report, from the first request to the final chart. Join us Friday for a live walkthrough and Q&A.",
            },
          ],
        },
        {
          id: "publishing-workflow",
          type: "steps",
          title: "From the campaign brief to the company feed.",
          steps: [
            {
              title: "Prepare the post",
              body: "Give the agent your source material, intended audience and destination link. Have the campaign owner check the draft and keep the approved text with the link it refers to.",
            },
            {
              title: "Choose the publishing window",
              body: "Configure the Scheduler trigger with the publishing time and time zone. For a recurring run, have the flow look up the approved post due in that window and stop if nothing is ready.",
            },
            {
              title: "Share from the right account",
              body: "Connect LinkedIn, choose Share Post and map the approved copy into Post Text. Check whether you’re posting as a person or a company, confirm visibility and attach the article link. Record the result before processing that post again.",
            },
          ],
        },
      ]}
    />
  );
}
