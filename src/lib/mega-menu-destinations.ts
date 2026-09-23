const CATCH_ALLS = new Set([
  "/property-management",
  "/products/agent-os",
  "/products",
  "/solutions",
  "/resources",
]);

export const MEGA_MENU_FEATURE_HREFS: Record<string, string> = {
  Residential: "/residential",
  Multifamily: "/multifamily",
  Commercial: "/commercial",
  "Community Associations": "/community-associations",
  Conventional: "/multifamily",
  "Student Housing": "/student-housing",
  "Centralized Operations": "/operations",
  "Owner Portal": "/owners",
  Owners: "/owners",
  Listings: "/listing-and-advertising",
  Advertising: "/listing-and-advertising",
  "Application & eSign": "/rental-applications",
  CRM: "/crm",
  "Move-In": "/leasing",
  Renewals: "/leasing",
  Delinquency: "/rapid-rent",
  "Leasing Teams": "/leasing",
  "Owner Operators and Fee Managers": "/operations",
};

export function megaMenuHref(title: string, fallback: string) {
  return MEGA_MENU_FEATURE_HREFS[title] ?? fallback;
}

export function isMegaMenuCatchAll(href: string) {
  return CATCH_ALLS.has(href);
}
