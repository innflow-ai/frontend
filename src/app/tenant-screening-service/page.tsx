import type { Metadata } from "next";
import { BaselaneScreening } from "@/components/baselane-screening";
export const metadata: Metadata = {
  title: "Screening workflows | innflow",
  description:
    "Coordinate document requests, review tasks, and team handoffs around your chosen screening provider with innflow.",
  alternates: { canonical: "/tenant-screening-service" },
};
export default function Page() {
  return <BaselaneScreening />;
}
