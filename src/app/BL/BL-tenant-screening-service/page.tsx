import type { Metadata } from "next";
import { BaselaneScreening } from "@/components/baselane-screening";
export const metadata: Metadata = {
  title: "Screening workflows | innflow",
  description:
    "Coordinate document requests, review tasks, and team handoffs around your chosen screening provider with innflow.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-tenant-screening-service" },
};
export default function Page() {
  return <BaselaneScreening />;
}
