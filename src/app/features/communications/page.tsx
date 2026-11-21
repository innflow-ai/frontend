import { FeatureStoryPage } from "@/components/feature-story-page";
import { channelsPage } from "@/content/channels-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: channelsPage.title,
  description: channelsPage.description,
  path: channelsPage.path,
});

export default function Page() {
  return <FeatureStoryPage sections={channelsPage.sections} />;
}
