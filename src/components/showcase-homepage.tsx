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
import { SectionHeading } from "@/components/section-heading";
import { coverImageUrl, formatPostDate, getLatestBlogPosts, humanizeCategory } from "@/lib/sanity";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { getPageTestimonials } from "@/lib/testimonials";
import { TrustedByMarquee } from "./trusted-by-marquee";
import typography from "./homepage-typography.module.css";

export async function ShowcaseHomepage({
  previewFallback = false,
}: {
  previewFallback?: boolean;
}) {
  const [stories, posts] = await Promise.all([
    SHOW_TESTIMONIAL ? getPageTestimonials("/") : null,
    getLatestBlogPosts(),
  ]);
  return (
    <main id="main-content" className={`${styles.page} ${typography.headings}`}>
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
        <HomepageCollaboration />
        {posts.length > 0 && (
          <div className={styles.recentPosts}>
            <SectionHeading title="Recent blog posts" align="start" />
            <BlogCarousel posts={posts.map((post) => ({
              slug: post.slug,
              title: post.title,
              category: humanizeCategory(post.category),
              date: formatPostDate(post.publishedAt),
              excerpt: post.excerpt,
              readTime: post.readTime,
              coverImageAlt: post.coverImage?.alt || post.title,
              coverImageUrl: post.coverImage ? coverImageUrl(post.coverImage, 800, 450) : null,
            }))} />
          </div>
        )}
      </ShowcaseTheme>
    </main>
  );
}
