import type { Metadata } from "next";
import { BaselaneLoans } from "@/components/baselane-loans";
export const metadata: Metadata = {
  title: "Financing preparation | innflow",
  description:
    "Connect project records, document requests, and lender follow-ups in one innflow workflow.",
  alternates: { canonical: "/rental-property-loans" },
};
export default function Page() {
  return <BaselaneLoans />;
}
