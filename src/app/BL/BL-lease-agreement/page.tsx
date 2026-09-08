import type { Metadata } from "next";
import { BaselaneLease } from "@/components/baselane-lease";
export const metadata: Metadata = {
  title: "Lease document workflows | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-lease-agreement" },
};
export default function Page() {
  return <BaselaneLease />;
}
