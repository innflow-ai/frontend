import type { Metadata } from "next";
import { BaselaneProductPage } from "@/components/baselane-product-page";
export const metadata: Metadata = {
  title: "Connected property records | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-landlord-accounting" },
};
export default function Page() {
  return <BaselaneProductPage kind="accounting" />;
}
