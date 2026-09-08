import type { Metadata } from "next";
import { BaselaneSecurity } from "@/components/baselane-security";
export const metadata: Metadata = {
  title: "Security and governance | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-security" },
};
export default function Page() {
  return <BaselaneSecurity />;
}
