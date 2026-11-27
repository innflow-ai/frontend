import { FeatureStoryPage } from "@/components/feature-story-page";
import { workflowsPage } from "@/content/workflows-page";

export function WorkflowsProductPage() {
  return <FeatureStoryPage product="flows" sections={workflowsPage.sections} />;
}
