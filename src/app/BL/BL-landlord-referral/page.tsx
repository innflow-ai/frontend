import type { Metadata } from "next";
import { BaselanePartners } from "@/components/baselane-partners";
export const metadata: Metadata = {
  title: "Share Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-landlord-referral" },
};
export default function Page() {
  return <BaselanePartners referral />;
}
