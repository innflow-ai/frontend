import type { Metadata } from "next";
import { BaselaneRenters } from "@/components/baselane-renters";
export const metadata: Metadata = {
  title: "Connected resident experiences | innflow",
  alternates: { canonical: "/renters" },
};
export default function Page() {
  return <BaselaneRenters />;
}
