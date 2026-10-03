import { MarketingPage } from "@/components/page-primitives";

export default function NotFound() {
  return (
    <MarketingPage>
      <section className="not-found-section">
        <div className="shell">
          <span className="section-label">404</span>
          <h1>We couldn’t find that page.</h1>
          <p>
            The address may have changed, or the page may no longer be
            available. Explore our products or return home to find your next
            step.
          </p>
          <div className="cta-row">
            <a className="button button-primary" href="/">
              Return home
            </a>
            <a className="button button-secondary" href="/products">
              Explore products
            </a>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
