import type { Metadata } from "next";
import { BaselaneSavings } from "@/components/baselane-savings";
export const metadata: Metadata = {
  title: "Property savings resources | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-landlord-banking-apy" },
};
export default function Page() {
  return <BaselaneSavings />;
}
