import type { Metadata } from "next";
import { BaselaneBanking } from "@/components/baselane-banking";
export const metadata: Metadata = {
  title: "Property operations | Innflow",
  description: "An alternate Innflow design for connected property operations.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-landlord-banking" },
};
export default function Page() {
  return <BaselaneBanking />;
}
