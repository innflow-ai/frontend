import type { ReactNode } from "react";
import { BlogArticleShell } from "@/components/blog/article-shell";

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return <BlogArticleShell>{children}</BlogArticleShell>;
}
