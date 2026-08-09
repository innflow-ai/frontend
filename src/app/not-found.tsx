import { MarketingPage } from "@/components/page-primitives";

export default function NotFound() {
  return (
    <MarketingPage>
      <section className="not-found-section">
        <div className="shell">
          <span className="section-label">404</span>
          <h1>This route is not part of the focused first release.</h1>
          <p>
            Return to the property-operations overview or choose an implemented
            product route.
          </p>
          <div className="cta-row">
            <a className="button button-primary" href="/">
              Return home
            </a>
            <a className="button button-secondary" href="/property-management">
              Property management
            </a>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
