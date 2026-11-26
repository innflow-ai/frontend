import { BaselanePricing } from "@/components/baselane-pricing";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Pricing preview | Innflow",
  description: "Compare plans for your Innflow workspace.",
  path: "/preview/pricing",
  noIndex: true,
});

export default function PricingPreviewPage() {
  return (
    <ShowcaseTheme>
      <BaselanePricing preview />
    </ShowcaseTheme>
  );
}
