"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { Testimonial } from "@/lib/testimonials";
import type { LatestBlogPostNavItem } from "./mega-menu";

const NavigationBlogPosts = createContext<LatestBlogPostNavItem[]>([]);
const NavigationAppUpdate = createContext<LatestBlogPostNavItem | null>(null);
const NavigationTestimonial = createContext<Testimonial | null>(null);

export function NavigationBlogPostsProvider({
  posts,
  latestUpdate = null,
  testimonial = null,
  children,
}: {
  posts: LatestBlogPostNavItem[];
  latestUpdate?: LatestBlogPostNavItem | null;
  testimonial?: Testimonial | null;
  children: ReactNode;
}) {
  return (
    <NavigationBlogPosts.Provider value={posts}>
      <NavigationAppUpdate.Provider value={latestUpdate}>
        <NavigationTestimonial.Provider value={testimonial}>
          {children}
        </NavigationTestimonial.Provider>
      </NavigationAppUpdate.Provider>
    </NavigationBlogPosts.Provider>
  );
}

export function useNavigationBlogPosts() {
  return useContext(NavigationBlogPosts);
}

export function useNavigationAppUpdate() {
  return useContext(NavigationAppUpdate);
}

export function useNavigationTestimonial() {
  return useContext(NavigationTestimonial);
}
