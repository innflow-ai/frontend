import type { Metadata } from "next";
import { BaselaneCompany } from "@/components/baselane-company";
export const metadata: Metadata = {
  title: "Careers at innflow",
  alternates: { canonical: "/careers" },
};
export default function Page() {
  return <BaselaneCompany careers />;
}
