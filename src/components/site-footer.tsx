import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image
            src="/brand/innflow-white-full.svg"
            alt="Innflow"
            width={116}
            height={28}
          />
          <p>Operational workflows with visible human control.</p>
          <small>Phase C preview · not deployed</small>
        </div>
        <div>
          <strong>Platform</strong>
          <a href="#platform">Overview</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#integrations">Integrations</a>
        </div>
        <div>
          <strong>Property management</strong>
          <a href="#walkthrough">Walkthrough</a>
          <a href="#fit">Who it fits</a>
          <a href="#faq">Questions</a>
        </div>
        <div>
          <strong>Contact</strong>
          <TrackedLink
            destination={siteConfig.demoUrl}
            eventLabel="footer_demo"
          >
            Book a demo
          </TrackedLink>
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
        <span>
          © {new Date().getFullYear()} Innflow. Legal entity wording pending
          approval.
        </span>
        <span>
          Privacy, terms, and cookies remain on the current approved surface
          until migrated.
        </span>
      </div>
    </footer>
  );
}
