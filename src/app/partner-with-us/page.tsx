import type { Metadata } from "next";
import { BaselanePartners } from "@/components/baselane-partners";
export const metadata: Metadata = {
  title: "Partner with innflow",
  alternates: { canonical: "/partner-with-us" },
};
export default function Page() {
  return <BaselanePartners />;
}
