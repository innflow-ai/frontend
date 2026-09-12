import type { Metadata } from "next";
import { BaselaneLegalDirectory } from "@/components/baselane-legal";
export const metadata: Metadata = {
  title: "Legal agreements | innflow",
  alternates: { canonical: "/legal-agreements" },
};
export default function Page() {
  return <BaselaneLegalDirectory />;
}
