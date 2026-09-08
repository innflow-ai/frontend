import type { Metadata } from "next";
import { BaselaneProductPage } from "@/components/baselane-product-page";
export const metadata: Metadata = {
  title: "Property document preparation | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-tax-preparation" },
};
export default function Page() {
  return <BaselaneProductPage kind="tax-preparation" />;
}
