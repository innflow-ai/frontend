import type { Metadata } from "next";
import { BaselaneInsurance } from "@/components/baselane-insurance";
export const metadata: Metadata = {
  title: "Property review preparation | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-landlord-insurance" },
};
export default function Page() {
  return <BaselaneInsurance />;
}
