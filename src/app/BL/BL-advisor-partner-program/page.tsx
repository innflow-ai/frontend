import type { Metadata } from "next";
import { BaselaneAdvisors } from "@/components/baselane-advisors";
export const metadata: Metadata = {
  title: "Advisor partnerships | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-advisor-partner-program" },
};
export default function Page() {
  return <BaselaneAdvisors />;
}
