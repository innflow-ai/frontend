export const BLOG_PAGE_SIZE = 9;

export type BlogSearchParams = Partial<
  Record<"q" | "category" | "industry" | "page", string | string[]>
>;

/** Match URLSearchParams.get: the first value wins for repeated keys. */
export function blogFilterValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export type BlogListingFilters = {
  q?: string;
  category?: string;
  industry?: string;
  page?: number;
};

export function parseBlogPage(value: string | string[] | undefined) {
  const raw = blogFilterValue(value);
  const page = /^\d+$/.test(raw) ? Number(raw) : 1;
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function blogListingHref({
  q = "",
  category = "",
  industry = "",
  page = 1,
}: BlogListingFilters) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (industry) params.set("industry", industry);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize = BLOG_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    page: current,
    totalPages,
    items: items.slice(start, start + pageSize),
    hasPrev: current > 1,
    hasNext: current < totalPages,
  };
}
