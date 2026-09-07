import { legalLinks } from "@/config/footer-navigation";

export function FooterLegalLinks() {
  return (
    <>
      {legalLinks.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
      {/* biome-ignore lint/a11y/useValidAnchor: Termly requires href="#" for its preferences trigger. */}
      <a href="#" className="termly-display-preferences">
        Consent Preferences
      </a>
      <a href="https://app.termly.io/notify/d253192a-6c11-4338-9883-67b3307aea2f">
        Do Not Sell or Share My Personal Information
      </a>
      <a href="https://app.termly.io/notify/d253192a-6c11-4338-9883-67b3307aea2f">
        Limit the Use of My Sensitive Personal Information
      </a>
    </>
  );
}
