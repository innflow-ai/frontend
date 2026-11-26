import { BaselineFeatures } from "@/app/preview/scroll-showcase/baseline-features";
import {
  BaselineConnectedInfrastructure,
  BaselineCustomerStories,
} from "@/app/preview/scroll-showcase/baseline-lower-sections";
import styles from "@/app/preview/scroll-showcase/homepage.module.css";
import { ScrollShowcase } from "@/app/preview/scroll-showcase/scroll-showcase";
import { SHOW_TESTIMONIAL } from "@/app/preview/scroll-showcase/testimonial-visibility";
import { WorkspaceOverview } from "@/app/preview/scroll-showcase/workspace-overview";
import { HomepageCollaboration } from "@/components/collaboration";
import { BlogCarousel } from "@/components/blog-carousel";
import { FaqList } from "@/components/page-primitives";
import { getPageFaqs } from "@/lib/faqs";
import { SectionHeading } from "@/components/section-heading";
import { coverImageUrl, formatPostDate, getLatestBlogPosts } from "@/lib/sanity";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { getPageTestimonials } from "@/lib/testimonials";
import { HomepageEntrances } from "./homepage-entrances";
import { TrustedByMarquee } from "./trusted-by-marquee";
import typography from "./homepage-typography.module.css";

const homepageQuestions = [
  {
    question: "What can an Innflow agent do for my team?",
    answer: "An agent can gather information, update records, and prepare a result for review. For example, it can collect project updates and draft your weekly report.",
  },
  {
    question: "When should I use a flow?",
    answer: "Use a flow for work that follows the same steps each time. A new lead could trigger a flow that checks the account, assigns an owner, and prepares a follow-up.",
  },
  {
    question: "Which information can an agent use?",
    answer: "Agents can use the files, tables, and connected apps you give them access to. For example, a sales agent can use meeting notes to draft a follow-up.",
  },
  {
    question: "Can I review work before an agent acts?",
    answer: "Yes. Add an approval step where you want a person to review the work, such as before a draft email goes to a customer.",
  },
];

export async function ShowcaseHomepage({
  previewFallback = false,
}: {
  previewFallback?: boolean;
}) {
  const [stories, posts, faq] = await Promise.all([
    SHOW_TESTIMONIAL ? getPageTestimonials("/") : null,
    getLatestBlogPosts(),
    getPageFaqs("/", homepageQuestions),
  ]);
  return (
    <main id="main-content" className={`${styles.page} ${typography.headings}`}>
      <HomepageEntrances />
      <ScrollShowcase />
      <TrustedByMarquee />
      <ShowcaseTheme>
        <WorkspaceOverview />
        <BaselineConnectedInfrastructure />
        <BaselineFeatures />
        {stories && (
          <BaselineCustomerStories
            testimonials={stories.testimonials}
            heading={stories.heading}
            previewFallback={previewFallback}
          />
        )}
        {faq.items.length > 0 && (
          <section className={styles.homeFaq} aria-labelledby="home-faq-title" data-home-reveal>
            <SectionHeading id="home-faq-title" title={faq.heading || "Frequently asked questions"} />
            <FaqList items={faq.items} />
          </section>
        )}
        <HomepageCollaboration />
        {posts.length > 0 && (
          <div className={styles.recentPosts} data-home-reveal>
            <SectionHeading title="Recent blog posts" align="start" />
            <BlogCarousel posts={posts.map((post) => ({
              slug: post.slug,
              title: post.title,
              publishedAt: post.publishedAt,
              date: formatPostDate(post.publishedAt),
              coverImageAlt: post.coverImage?.alt || post.title,
              coverImageUrl: post.coverImage ? coverImageUrl(post.coverImage, 800, 450) : null,
            }))} />
          </div>
        )}
      </ShowcaseTheme>
    </main>
  );
}
