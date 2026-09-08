import type { Metadata } from "next";
import { BaselaneNews } from "@/components/baselane-news";
export const metadata: Metadata = {
  title: "Industry coverage | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-in-the-news" },
};
export default function Page() {
  return <BaselaneNews />;
}
