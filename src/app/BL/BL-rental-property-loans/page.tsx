import type { Metadata } from "next";
import { BaselaneLoans } from "@/components/baselane-loans";
export const metadata: Metadata = {
  title: "Financing preparation | innflow",
  description:
    "Connect project records, document requests, and lender follow-ups in one innflow workflow.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-rental-property-loans" },
};
export default function Page() {
  return <BaselaneLoans />;
}
