import type { Metadata } from "next";
import { BaselaneCustomers } from "@/components/baselane-customers";
export const metadata: Metadata = {
  title: "Investor stories | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-our-customers" },
};
export default function Page() {
  return <BaselaneCustomers />;
}
