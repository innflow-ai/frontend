import { AuthenticatedHomeRedirect } from "@/components/authenticated-home-redirect";
import { JsonLd } from "@/components/json-ld";
import { RuneyLanding } from "@/components/runey-landing";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <AuthenticatedHomeRedirect
        appOrigin={siteConfig.appOrigin}
        marketingOrigin={siteConfig.marketingOrigin}
      />
      <RuneyLanding />
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Innflow",
          url: siteConfig.marketingOrigin,
          logo: `${siteConfig.marketingOrigin}/icon.png`,
          email: siteConfig.supportEmail,
        }}
      />
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Innflow",
          url: siteConfig.marketingOrigin,
        }}
      />
    </>
  );
}
