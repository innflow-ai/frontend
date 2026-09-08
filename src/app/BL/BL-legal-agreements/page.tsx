import type { Metadata } from "next";
import { BaselaneLegalDirectory } from "@/components/baselane-legal";
export const metadata: Metadata = {
  title: "Legal agreements | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-legal-agreements" },
};
export default function Page() {
  return <BaselaneLegalDirectory />;
}
