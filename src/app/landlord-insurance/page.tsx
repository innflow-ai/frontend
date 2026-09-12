import type { Metadata } from "next";
import { BaselaneInsurance } from "@/components/baselane-insurance";
export const metadata: Metadata = {
  title: "Property review preparation | innflow",
  alternates: { canonical: "/landlord-insurance" },
};
export default function Page() {
  return <BaselaneInsurance />;
}
