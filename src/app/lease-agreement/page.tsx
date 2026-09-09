import type { Metadata } from "next";
import { BaselaneLease } from "@/components/baselane-lease";
export const metadata: Metadata = {
  title: "Lease document workflows | innflow",
  alternates: { canonical: "/lease-agreement" },
};
export default function Page() {
  return <BaselaneLease />;
}
