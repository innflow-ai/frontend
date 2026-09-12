import type { Metadata } from "next";
import { BaselaneProductPage } from "@/components/baselane-product-page";
export const metadata: Metadata = {
  title: "Connected property records | innflow",
  alternates: { canonical: "/landlord-accounting" },
};
export default function Page() {
  return <BaselaneProductPage kind="accounting" />;
}
