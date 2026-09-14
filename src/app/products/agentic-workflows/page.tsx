import { FigmaFeaturePage } from "@/components/figma-feature-page";
import { getFeaturePageDesign } from "@/content/feature-pages";
import { createPageMetadata } from "@/lib/metadata";

const page = getFeaturePageDesign("workflows");
export const metadata = createPageMetadata({
  title: `${page.name} | Innflow`,
  description: page.description,
  path: page.path,
});

export default function Page() {
  return <FigmaFeaturePage page={page} />;
}
