import { notFound } from "next/navigation";
import { HotelFeaturePage } from "@/components/hotel-pms/hotel-pages";
import { findHotelModule, hotelHref, hotelModules } from "@/content/hotel-pms";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return hotelModules.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const module = findHotelModule((await params).slug);
  if (!module) notFound();
  return createPageMetadata({
    title: `${module.name} | Innflow Hotels`,
    description: module.description,
    path: hotelHref(module.slug),
    imageAlt: `Innflow ${module.name.toLowerCase()}`,
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const module = findHotelModule((await params).slug);
  if (!module) notFound();
  return <HotelFeaturePage module={module} />;
}
