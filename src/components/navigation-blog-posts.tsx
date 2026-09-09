"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { LatestBlogPostNavItem } from "./mega-menu";

const NavigationBlogPosts = createContext<LatestBlogPostNavItem[]>([]);

export function NavigationBlogPostsProvider({
  posts,
  children,
}: {
  posts: LatestBlogPostNavItem[];
  children: ReactNode;
}) {
  return (
    <NavigationBlogPosts.Provider value={posts}>
      {children}
    </NavigationBlogPosts.Provider>
  );
}

export function useNavigationBlogPosts() {
  return useContext(NavigationBlogPosts);
}
