import Image from "next/image";
import { GoogleSignInButton } from "@/components/google-sign-in";
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
          <a href="/products/platform">Platform</a>
          <a href="/products/agent-os">Agent OS</a>
          <a href="/products/ai-agents">AI Agents</a>
          <a href="/products/agentic-workflows">Agentic Workflows</a>
          <a href="/products/databases">Databases</a>
        </div>
        <div>
          <strong>Property management</strong>
          <a href="/property-management">Overview</a>
          <a href="/integrations">Integrations</a>
          <a href="/pricing">Buying motion</a>
          <a href={siteConfig.demoUrl}>Book a demo</a>
        </div>
        <div>
          <strong>Comparisons</strong>
          <a href="/blog/innflow-vs-zapier">Innflow vs Zapier</a>
          <a href="/blog/innflow-vs-n8n">Innflow vs n8n</a>
          <a href="/blog/innflow-vs-make">Innflow vs Make</a>
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
          <GoogleSignInButton eventLabel="footer_login" label="Log in" />
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Innflow. All rights reserved.</span>
        <span>Property operations, connected.</span>
      </div>
    </footer>
  );
}
