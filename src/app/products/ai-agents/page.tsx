import { FeatureStoryPage } from "@/components/feature-story-page";
import { agentsPage } from "@/content/agents-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: agentsPage.title,
  description: agentsPage.description,
  path: agentsPage.path,
});

export default function Page() {
  return <FeatureStoryPage sections={agentsPage.sections} />;
}
