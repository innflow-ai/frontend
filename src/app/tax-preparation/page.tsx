import { BaselaneProductPage } from "@/components/baselane-product-page";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Property Document Preparation | Innflow",
  description:
    "Organize property records, document requests, and review steps before tax preparation. Keep your team's supporting context connected and easy to find.",
  path: "/tax-preparation",
});
export default function Page() {
  return <BaselaneProductPage kind="tax-preparation" />;
}
