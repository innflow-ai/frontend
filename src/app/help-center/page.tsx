import type { Metadata } from "next";
import { BaselaneHelp } from "@/components/baselane-help";
export const metadata: Metadata = {
  title: "innflow help center",
  alternates: { canonical: "/help-center" },
};
export default function Page() {
  return <BaselaneHelp />;
}
