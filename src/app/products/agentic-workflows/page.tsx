import { CalendlyFeaturePage } from "@/components/calendly-product-adapters";
import { getFeaturePageDesign } from "@/content/feature-pages";
import { createPageMetadata } from "@/lib/metadata";

const page = getFeaturePageDesign("workflows");
export const metadata = createPageMetadata({
  title: `${page.name} | Innflow`,
  description: page.description,
  path: page.path,
});

export default function Page() {
  return <CalendlyFeaturePage page={page} />;
}
