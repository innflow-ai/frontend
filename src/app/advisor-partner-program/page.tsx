import type { Metadata } from "next";
import { BaselaneAdvisors } from "@/components/baselane-advisors";
export const metadata: Metadata = {
  title: "Advisor partnerships | innflow",
  alternates: { canonical: "/advisor-partner-program" },
};
export default function Page() {
  return <BaselaneAdvisors />;
}
