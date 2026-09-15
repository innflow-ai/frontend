import { getPageTestimonials } from "@/lib/testimonials";
import { TestimonialCards } from "./testimonial-cards";

export async function PageTestimonials({ pagePath }: { pagePath: string }) {
  const selection = await getPageTestimonials(pagePath);
  return <TestimonialCards {...selection} />;
}

/** Shared feature-page selection, maintained in Rent Collection's CMS placement. */
export async function FeatureTestimonials() {
  const selection = await getPageTestimonials("/rent-collection");
  return (
    <TestimonialCards
      heading={selection.heading}
      testimonials={selection.testimonials.slice(0, 4)}
    />
  );
}
