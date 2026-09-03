import Image from "next/image";
import {
  type BlogPostSummary,
  coverImageUrl,
  formatPostDate,
  humanizeCategory,
} from "@/lib/sanity";
import styles from "./article.module.css";

export function BlogRelatedPosts({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.related} aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading">Related posts</h2>
      <div className={styles.relatedTrack}>
        {posts.map((post) => {
          const coverUrl = post.coverImage
            ? coverImageUrl(post.coverImage, 720, 405)
            : null;
          const date = formatPostDate(post.publishedAt);
          return (
            <a
              key={post.slug}
              className={styles.relatedCard}
              href={`/blog/${post.slug}`}
            >
              {coverUrl ? (
                <div className={styles.relatedMedia}>
                  <Image
                    src={coverUrl}
                    alt={post.coverImage?.alt ?? post.title}
                    width={720}
                    height={405}
                    sizes="(max-width: 720px) 80vw, 280px"
                  />
                </div>
              ) : null}
              <span className={styles.relatedMeta}>
                {humanizeCategory(post.category)}
                {date ? ` · ${date}` : ""}
              </span>
              <strong>{post.title}</strong>
            </a>
          );
        })}
      </div>
    </section>
  );
}
