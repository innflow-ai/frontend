import { BaselineClosing } from "@/app/preview/scroll-showcase/baseline-lower-sections";
import { BaselanePricing } from "@/components/baselane-pricing";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Innflow Pricing | Free, Pro, Business & Enterprise Plans",
  description:
    "Compare Innflow Free, Pro, Business, and Enterprise plans and find the right workflow automation capacity for your team.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <ShowcaseTheme>
      <BaselanePricing />
      <BaselineClosing />
    </ShowcaseTheme>
  );
}
