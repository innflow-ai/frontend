import type { Metadata } from "next";
import { BaselaneBanking } from "@/components/baselane-banking";
export const metadata: Metadata = {
  title: "Property operations | innflow",
  description:
    "Connect recurring property work, knowledge, and human approvals in one innflow workspace.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-landlord-banking" },
};
export default function Page() {
  return <BaselaneBanking />;
}
