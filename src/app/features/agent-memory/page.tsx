import { FeatureStoryPage } from "@/components/feature-story-page";
import { agentMemoryPage } from "@/content/agent-memory-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: agentMemoryPage.title,
  description: agentMemoryPage.description,
  path: agentMemoryPage.path,
});

export default function Page() {
  return <FeatureStoryPage sections={agentMemoryPage.sections} />;
}
