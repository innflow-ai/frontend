import type { Metadata } from "next";
import { BaselaneHelp } from "@/components/baselane-help";
export const metadata: Metadata = {
  title: "innflow help center",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-help-center" },
};
export default function Page() {
  return <BaselaneHelp />;
}
