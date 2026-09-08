import type { Metadata } from "next";
import { BaselaneProductPage } from "@/components/baselane-product-page";
export const metadata: Metadata = {
  title: "Recurring rental workflows | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-rent-collection" },
};
export default function Page() {
  return <BaselaneProductPage kind="rent-collection" showBand={false} />;
}
