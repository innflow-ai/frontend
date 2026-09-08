import type { Metadata } from "next";
import { BaselaneCustomers } from "@/components/baselane-customers";
export const metadata: Metadata = {
  title: "Who we help | innflow",
  description:
    "Explore innflow workflows for property teams, from maintenance requests to document reviews and portfolio handoffs.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-our-customers" },
};
export default function Page() {
  return <BaselaneCustomers />;
}
