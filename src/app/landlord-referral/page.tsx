import type { Metadata } from "next";
import { BaselanePartners } from "@/components/baselane-partners";
export const metadata: Metadata = {
  title: "Share innflow",
  alternates: { canonical: "/landlord-referral" },
};
export default function Page() {
  return <BaselanePartners referral />;
}
