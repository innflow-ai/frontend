import { AuthenticatedHomeRedirect } from "@/components/authenticated-home-redirect";
import { HotelHomepage } from "@/components/hotel-pms/hotel-pages";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Hotel PMS & Connected Operations | Innflow",
  description:
    "Explore a connected hotel workspace for reservations, guest experience, housekeeping, accounting, procurement, and portfolio performance.",
  path: "/",
  imageAlt: "Innflow hotel operations platform",
});

export default function HomePage() {
  return (
    <>
      <AuthenticatedHomeRedirect
        appOrigin={siteConfig.appOrigin}
        marketingOrigin={siteConfig.marketingOrigin}
      />
      <HotelHomepage />
    </>
  );
}
