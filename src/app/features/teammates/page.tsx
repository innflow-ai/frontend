import { FeatureStoryPage } from "@/components/feature-story-page";
import { teammatesPage } from "@/content/teammates-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: teammatesPage.title,
  description: teammatesPage.description,
  path: teammatesPage.path,
});

export default function Page() {
  return <FeatureStoryPage sections={teammatesPage.sections} />;
}
