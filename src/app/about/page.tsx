import type { Metadata } from "next";
import { BaselaneCompany } from "@/components/baselane-company";
export const metadata: Metadata = {
  title: "About innflow",
  alternates: { canonical: "/about" },
};
export default function Page() {
  return <BaselaneCompany />;
}
