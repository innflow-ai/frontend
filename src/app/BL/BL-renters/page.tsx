import type { Metadata } from "next";
import { BaselaneRenters } from "@/components/baselane-renters";
export const metadata: Metadata = {
  title: "Connected resident experiences | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-renters" },
};
export default function Page() {
  return <BaselaneRenters />;
}
