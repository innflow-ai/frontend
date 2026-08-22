import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image
            src="/brand/innflow_white_logo_set_bold.svg"
            alt="Innflow"
            width={135}
            height={28}
          />
          <p>Operational workflows with visible human control.</p>
        </div>
        <div>
          <strong>Product</strong>
          <a href="/features/workflows">Workflows</a>
          <a href="/features/assistant">Assistant</a>
          <a href="/features/communications">Communications · Preview</a>
          <a href="/features/website">Website · Preview</a>
        </div>
        <div>
          <strong>Property management</strong>
          <a href="/property-management">Overview</a>
          <a href="/integrations">Integrations</a>
          <a href="/pricing">Buying motion</a>
          <a href={siteConfig.demoUrl}>Book a demo</a>
        </div>
        <div>
          <strong>Legal and contact</strong>
          <a href="/legal/privacy-policy">Privacy</a>
          <a href="/legal/terms-of-service">Terms</a>
          <a href="/legal/cookie-policy">Cookies</a>
          <a href="/legal/acceptable-use-policy">Acceptable use</a>
          <a href="/legal/eula">EULA</a>
          <a href="/legal/dsar">Privacy request</a>
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          <TrackedLink
            destination={`${siteConfig.appOrigin}/login`}
            eventLabel="footer_login"
          >
            Log in
          </TrackedLink>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Innflow. All rights reserved.</span>
        <span>Property operations, connected.</span>
      </div>
    </footer>
  );
}
