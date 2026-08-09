import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

const portfolios = [
  ["Residential", "Apartments, condos & mixed-use"],
  ["Single-Family", "Build-to-rent & single-family"],
  ["Multifamily", "Large and mid-sized communities"],
  ["Commercial", "Office, retail & industrial"],
  ["Community Associations", "HOAs, condos & townhomes"],
  ["Affordable Housing", "Public, LIHTC & subsidized"],
] as const;

const roadmap = [
  ["AI expense assistant", "Planned"],
  ["Revenue intelligence", "Planned"],
  ["Vendor marketplace", "Preview"],
  ["Open API", "Available"],
] as const;

export function EditorialHeader() {
  return (
    <header className="editorial-header">
      <div className="editorial-shell editorial-header-inner">
        <a className="editorial-brand" href="/" aria-label="Innflow home">
          <Image
            src="/brand/innflow-black-full.svg"
            alt="Innflow"
            width={116}
            height={28}
            priority
          />
        </a>

        <nav className="editorial-desktop-nav" aria-label="Primary navigation">
          <a href="#features">Features</a>
          <details className="editorial-portfolio-menu">
            <summary>Portfolios</summary>
            <div className="editorial-mega-panel">
              <div className="mega-portfolios">
                <span className="editorial-kicker">Portfolio types</span>
                <div className="mega-portfolio-grid">
                  {portfolios.map(([title, body]) => (
                    <a href="#portfolios" key={title}>
                      <strong>{title}</strong>
                      <small>{body}</small>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mega-roadmap">
                <span className="editorial-kicker">Innflow roadmap</span>
                {roadmap.map(([title, status]) => (
                  <div key={title}>
                    <span>
                      <strong>{title}</strong>
                      <small>{status}</small>
                    </span>
                  </div>
                ))}
                <a href="#features">See what’s ahead →</a>
              </div>
              <aside className="mega-aside">
                <span>Built for every portfolio.</span>
                <p>One platform. Total visibility.</p>
              </aside>
            </div>
          </details>
          <a href="#why-innflow">Why Innflow</a>
          <a href="#resources">Resources</a>
          <a href="/pricing">Pricing</a>
        </nav>

        <div className="editorial-header-actions">
          <TrackedLink
            destination={`${siteConfig.appOrigin}/login`}
            eventLabel="header_login"
          >
            Login
          </TrackedLink>
          <a href={`mailto:${siteConfig.supportEmail}`}>Contact</a>
          <TrackedLink
            className="editorial-button editorial-button-dark editorial-header-cta"
            destination={siteConfig.demoUrl}
            eventLabel="header_demo"
          >
            Book a demo
          </TrackedLink>
          <details className="editorial-mobile-nav">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation">
              <a href="#features">Features</a>
              <a href="#portfolios">Portfolios</a>
              <a href="#why-innflow">Why Innflow</a>
              <a href="#resources">Resources</a>
              <a href="/pricing">Pricing</a>
              <TrackedLink
                destination={`${siteConfig.appOrigin}/login`}
                eventLabel="mobile_login"
              >
                Login
              </TrackedLink>
              <a href={`mailto:${siteConfig.supportEmail}`}>Contact</a>
              <TrackedLink
                className="editorial-button editorial-button-dark"
                destination={siteConfig.demoUrl}
                eventLabel="mobile_demo"
              >
                Book a demo
              </TrackedLink>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
