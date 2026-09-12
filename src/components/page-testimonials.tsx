import { getPageTestimonials } from "@/lib/testimonials";
import { TestimonialCards } from "./testimonial-cards";

export async function PageTestimonials({ pagePath }: { pagePath: string }) {
  const selection = await getPageTestimonials(pagePath);
  return <TestimonialCards {...selection} />;
}
