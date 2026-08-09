import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

export function EditorialFooter() {
  return (
    <footer className="editorial-footer" id="resources">
      <div className="editorial-shell editorial-footer-grid">
        <div className="editorial-footer-brand">
          <Image
            src="/brand/innflow-white-full.svg"
            alt="Innflow"
            width={116}
            height={28}
          />
          <p>
            The all-in-one property operations layer for connected workflows,
            visible decisions, and human control.
          </p>
        </div>
        <div>
          <strong>Product</strong>
          <a href="#features">Features</a>
          <a href="/features/workflows">Workflows</a>
          <a href="/features/assistant">Assistant</a>
          <a href="/integrations">Integrations</a>
          <a href="/pricing">Pricing</a>
        </div>
        <div>
          <strong>Solutions</strong>
          <a href="#portfolios">Residential</a>
          <a href="#portfolios">Single-Family</a>
          <a href="#portfolios">Multifamily</a>
          <a href="#portfolios">Commercial</a>
          <a href="#portfolios">Community Associations</a>
          <a href="#portfolios">Affordable Housing</a>
        </div>
        <div>
          <strong>Resources</strong>
          <a href="/property-management">Property management</a>
          <a href="/integrations">Integration guide</a>
          <a href="#faq">FAQs</a>
          <a href={`mailto:${siteConfig.supportEmail}`}>Contact</a>
        </div>
        <div>
          <strong>Company</strong>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/cookies">Cookies</a>
          <TrackedLink
            destination={`${siteConfig.appOrigin}/login`}
            eventLabel="footer_login"
          >
            Login
          </TrackedLink>
        </div>
      </div>
      <div className="editorial-shell editorial-footer-bottom">
        <span>© {new Date().getFullYear()} Innflow. All rights reserved.</span>
        <span>Property operations, connected.</span>
      </div>
    </footer>
  );
}
