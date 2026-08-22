import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { navigation, siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand-link" href="/" aria-label="Innflow home">
          <Image
            src="/brand/innflow_logo_set_B.svg"
            alt="Innflow"
            width={139}
            height={28}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <TrackedLink
            className="login-link"
            destination={`${siteConfig.appOrigin}/login`}
            eventLabel="header_login"
          >
            Log in
          </TrackedLink>
          <TrackedLink
            className="button button-primary button-small desktop-cta"
            destination={siteConfig.demoUrl}
            eventLabel="header_demo"
          >
            {siteConfig.primaryCta}
          </TrackedLink>
          <details className="mobile-navigation">
            <summary className="menu-button" aria-label="Open navigation">
              <span />
              <span />
            </summary>
            <div id="mobile-menu" className="mobile-menu">
              <nav aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
                <TrackedLink
                  destination={`${siteConfig.appOrigin}/login`}
                  eventLabel="mobile_login"
                >
                  Log in
                </TrackedLink>
                <TrackedLink
                  className="button button-primary"
                  destination={siteConfig.demoUrl}
                  eventLabel="mobile_demo"
                >
                  {siteConfig.primaryCta}
                </TrackedLink>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
