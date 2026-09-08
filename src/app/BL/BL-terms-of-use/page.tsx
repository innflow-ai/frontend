import type { Metadata } from "next";
import { BaselaneLegalPolicy } from "@/components/baselane-legal";
export const metadata: Metadata = {
  title: "Terms of Service | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-terms-of-use" },
};
export default function Page() {
  return <BaselaneLegalPolicy type="terms" />;
}
