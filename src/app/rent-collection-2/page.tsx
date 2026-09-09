import type { Metadata } from "next";
import { BaselaneProductPage } from "@/components/baselane-product-page";
export const metadata: Metadata = {
  title: "Recurring rental workflows | innflow",
  alternates: { canonical: "/rent-collection-2" },
};
export default function Page() {
  return <BaselaneProductPage kind="rent-collection" />;
}
