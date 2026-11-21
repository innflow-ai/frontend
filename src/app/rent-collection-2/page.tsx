import { BaselaneProductPage } from "@/components/baselane-product-page";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Recurring Rental Workflows | Innflow",
  description:
    "Connect the recurring work around rent, with organized context, clearer follow-ups, and coordinated steps for your property team.",
  path: "/rent-collection-2",
});
export default function Page() {
  return <BaselaneProductPage kind="rent-collection" />;
}
