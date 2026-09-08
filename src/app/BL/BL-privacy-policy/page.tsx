import type { Metadata } from "next";
import { BaselaneLegalPolicy } from "@/components/baselane-legal";
export const metadata: Metadata = {
  title: "Privacy Policy | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-privacy-policy" },
};
export default function Page() {
  return <BaselaneLegalPolicy type="privacy" />;
}
