import type { Metadata } from "next";
import { BaselaneScreening } from "@/components/baselane-screening";
export const metadata: Metadata = {
  title: "Tenant screening resources | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-tenant-screening-service" },
};
export default function Page() {
  return <BaselaneScreening />;
}
