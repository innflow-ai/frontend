import type { Metadata } from "next";
import { BaselaneLibrary } from "@/components/baselane-library";
export const metadata: Metadata = {
  title: "Masterclasses | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-webinars" },
};
export default function Page() {
  return <BaselaneLibrary kind="webinars" />;
}
