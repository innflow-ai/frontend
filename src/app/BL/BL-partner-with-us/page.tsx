import type { Metadata } from "next";
import { BaselanePartners } from "@/components/baselane-partners";
export const metadata: Metadata = {
  title: "Partner with innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-partner-with-us" },
};
export default function Page() {
  return <BaselanePartners />;
}
