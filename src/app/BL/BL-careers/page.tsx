import type { Metadata } from "next";
import { BaselaneCompany } from "@/components/baselane-company";
export const metadata: Metadata = {
  title: "Careers at innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-careers" },
};
export default function Page() {
  return <BaselaneCompany careers />;
}
