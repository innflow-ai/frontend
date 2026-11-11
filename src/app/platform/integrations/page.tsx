import { FeatureStoryPage } from "@/components/feature-story-page";
import { connectorsPage } from "@/content/connectors-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: connectorsPage.title,
  description: connectorsPage.description,
  path: connectorsPage.path,
});

export default function Page() {
  return <FeatureStoryPage sections={connectorsPage.sections} />;
}
