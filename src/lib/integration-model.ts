export const integrationStatuses = {
  available: {
    label: "Available",
    description:
      "Available to connect. Talk with us about account access and setup for your team.",
    cta: "Discuss setup",
  },
  "in-development": {
    label: "In development",
    description:
      "We’re building this connection. It is not available to connect yet.",
    cta: "Discuss this integration",
  },
  planned: {
    label: "Planned",
    description:
      "This integration is on our roadmap and is not available yet. Tell us how your team would use it.",
    cta: "Request this integration",
  },
} as const;
export type IntegrationStatus = keyof typeof integrationStatuses;
export type Integration = {
  _id: string;
  _updatedAt: string;
  name: string;
  slug: string;
  shortDescription: string;
  logoUrl: string | null;
  category: { title: string; slug: string } | null;
  status: IntegrationStatus;
  statusNote: string | null;
  overview: string | null;
  websiteUrl: string | null;
  useCases: { _key: string; title: string; description: string }[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
};
export function integrationStatus(status: string) {
  return (
    integrationStatuses[status as IntegrationStatus] ??
    integrationStatuses.planned
  );
}
export function filterIntegrations(
  items: Integration[],
  search: string,
  category: string,
  status: string,
) {
  const term = search.trim().toLowerCase();
  return items.filter(
    (item) =>
      (!category || item.category?.slug === category) &&
      (!status || item.status === status) &&
      `${item.name} ${item.shortDescription} ${item.category?.title ?? ""}`
        .toLowerCase()
        .includes(term),
  );
}
