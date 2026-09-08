import type { Metadata } from "next";
import { BaselaneLoans } from "@/components/baselane-loans";
export const metadata: Metadata = {
  title: "Property financing resources | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-rental-property-loans" },
};
export default function Page() {
  return <BaselaneLoans />;
}
