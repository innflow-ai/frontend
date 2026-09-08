import type { Metadata } from "next";
import { BaselaneSavings } from "@/components/baselane-savings";
export const metadata: Metadata = {
  title: "Property reserve planning | innflow",
  description:
    "Keep property reserve plans, supporting records, review steps, and follow-up tasks connected with innflow.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-landlord-banking-apy" },
};
export default function Page() {
  return <BaselaneSavings />;
}
