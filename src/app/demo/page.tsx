import { redirect } from "next/navigation";
import { BaselaneDemo } from "@/components/baselane-demo";
import { siteConfig } from "@/config/site";
import { getMarketingExperience } from "@/lib/marketing-experience-server";

export default async function DemoPage() {
  if ((await getMarketingExperience()).variant === "new")
    return <BaselaneDemo />;
  redirect(siteConfig.demoUrl);
}
