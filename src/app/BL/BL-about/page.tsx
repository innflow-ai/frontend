import type { Metadata } from "next";
import { BaselaneCompany } from "@/components/baselane-company";
export const metadata: Metadata = {
  title: "About innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-about" },
};
export default function Page() {
  return <BaselaneCompany />;
}
