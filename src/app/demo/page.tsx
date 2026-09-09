import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function DemoPage() {
  redirect(siteConfig.demoUrl);
}
