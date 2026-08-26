"use client";

import {
  AddressBook,
  Archive,
  ArrowRight,
  ArrowsClockwise,
  Browser,
  Buildings,
  CaretDown,
  CirclesFour,
  CirclesThreePlus,
  CreditCard,
  Database,
  DoorOpen,
  Files,
  FlowArrow,
  GraduationCap,
  Handshake,
  House,
  HouseLine,
  type Icon,
  ListBullets,
  Megaphone,
  Newspaper,
  PlugsConnected,
  PuzzlePiece,
  Quotes,
  Robot,
  Signature,
  Sparkle,
  Storefront,
  Tag,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./mega-menu.module.css";

export type MegaMenuLink = {
  href: string;
  icon: Icon;
  iconSrc?: string;
  title: string;
  body: string;
  badge?: string;
};

export type MegaMenuColumn = {
  heading: string;
  links: MegaMenuLink[];
};

export type LatestBlogPostNavItem = {
  title: string;
  href: string;
  categoryLabel: string;
  publishedLabel: string;
  imageUrl: string | null;
  imageAlt: string;
};

function withApprovedMenuIcons(links: MegaMenuLink[]): MegaMenuLink[] {
  return links.map((link) => ({
    ...link,
    iconSrc: `/brand/navigation/mega-menu-items/${link.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}.svg`,
  }));
}

const platformLinks: MegaMenuLink[] = [
  {
    href: "/products/platform",
    icon: CirclesThreePlus,
    title: "Platform",
    body: "The connected foundation for modern property operations.",
  },
  {
    href: "/products/agent-os",
    icon: Sparkle,
    title: "Agent OS",
    body: "Govern, coordinate, and scale operational intelligence.",
  },
  {
    href: "/products/ai-agents",
    icon: Sparkle,
    title: "AI Agents",
    body: "Purpose-built agents that move property work forward.",
  },
];

const buildWithAgentsLinks: MegaMenuLink[] = [
  {
    href: "/products/agent-os",
    icon: Robot,
    title: "Copilot",
    body: "Build workflows from a single prompt.",
  },
  {
    href: "/products/agentic-workflows",
    icon: FlowArrow,
    title: "Agentic Workflows",
    body: "Recurring work made visible, governed, and repeatable.",
  },
  {
    href: "/skills",
    icon: PuzzlePiece,
    title: "Agent Skills",
    body: "Connect your tools and systems.",
  },
];

const capabilityLinks: MegaMenuLink[] = [
  {
    href: "/features/website",
    icon: Browser,
    title: "AI Website Builder",
    body: "Build conversion-ready property websites with AI.",
  },
  {
    href: "/products/databases",
    icon: Database,
    title: "Databases",
    body: "Shared operational context your teams and agents can trust.",
  },
  {
    href: "/skills",
    icon: Files,
    title: "Templates",
    body: "Start faster with ready-to-use workflow templates.",
  },
];

const resourcesLinks: MegaMenuLink[] = [
  {
    href: "/integrations",
    icon: PlugsConnected,
    title: "Integrations",
    body: "Connect the tools your team already runs on.",
  },
  {
    href: "/pricing",
    icon: Tag,
    title: "Pricing",
    body: "Straightforward packaging for operations teams.",
  },
  {
    href: "/blog",
    icon: Newspaper,
    title: "Blog",
    body: "Ideas for sharper, calmer operations.",
  },
  {
    href: "/demo",
    icon: Handshake,
    title: "Become an Affiliate",
    body: "Partner with Innflow and help more property teams modernize operations.",
  },
  {
    href: "/blog",
    icon: Quotes,
    title: "Customer Stories",
    body: "Explore real-world success stories from Innflow customers.",
  },
  {
    href: "/blog",
    icon: Archive,
    title: "Asset Library",
    body: "Explore reports, guides, testimonials, podcasts, and more.",
  },
];

export const resourcesColumns: MegaMenuColumn[] = [
  {
    heading: "Resources",
    links: withApprovedMenuIcons(resourcesLinks),
  },
];

export const portfolioColumns: MegaMenuColumn[] = [
  {
    heading: "Portfolios",
    links: withApprovedMenuIcons([
      {
        href: "/#portfolios",
        icon: House,
        title: "Residential",
        body: "Apartments, condos & mixed-use.",
      },
      {
        href: "/#portfolios",
        icon: Buildings,
        title: "Multifamily",
        body: "Large and mid-sized communities.",
      },
      {
        href: "/#portfolios",
        icon: Storefront,
        title: "Commercial",
        body: "Office, retail & industrial.",
      },
      {
        href: "/#portfolios",
        icon: UsersThree,
        title: "Community Associations",
        body: "HOAs, condos & townhomes.",
      },
    ]),
  },
];

export const productColumns: MegaMenuColumn[] = [
  {
    heading: "Platform",
    links: withApprovedMenuIcons(platformLinks),
  },
  {
    heading: "Build With Agents",
    links: withApprovedMenuIcons(buildWithAgentsLinks),
  },
  {
    heading: "Capabilities",
    links: withApprovedMenuIcons(capabilityLinks),
  },
];

export const solutionsColumns: MegaMenuColumn[] = [
  {
    heading: "Leasing AI",
    links: withApprovedMenuIcons([
      {
        href: "/products/agent-os",
        icon: ListBullets,
        title: "Listings",
        body: "Keep property listings accurate and up to date.",
      },
      {
        href: "/products/agent-os",
        icon: Megaphone,
        title: "Advertising",
        body: "Reach qualified renters across the right channels.",
      },
      {
        href: "/products/agent-os",
        icon: Signature,
        title: "Application & eSign",
        body: "Self-guided tours that convert 24/7.",
      },
      {
        href: "/products/databases",
        icon: AddressBook,
        title: "CRM",
        body: "Capture, nurture, & convert prospects.",
      },
    ]),
  },
  {
    heading: "Assets",
    links: withApprovedMenuIcons([
      {
        href: "/property-management",
        icon: Buildings,
        title: "Conventional",
        body: "Low, mid, & high-rise apartment complexes.",
      },
      {
        href: "/property-management",
        icon: GraduationCap,
        title: "Student Housing",
        body: "Off-campus & purpose-built student housing.",
      },
    ]),
  },
  {
    heading: "Solutions",
    links: withApprovedMenuIcons([
      {
        href: "/property-management",
        icon: CirclesFour,
        title: "Centralized Operations",
        body: "Modern, AI-powered operations across leasing, admin, and maintenance.",
      },
      {
        href: "/property-management",
        icon: UsersThree,
        title: "Owner Operators and Fee Managers",
        body: "AI automation for property management companies.",
      },
      {
        href: "/property-management",
        icon: House,
        title: "Owners",
        body: "AI automation for ownership groups.",
      },
    ]),
  },
  {
    heading: "Operations",
    links: withApprovedMenuIcons([
      {
        href: "/property-management",
        icon: HouseLine,
        title: "Move-In",
        body: "Effortless move-ins powered by AI.",
      },
      {
        href: "/property-management",
        icon: ArrowsClockwise,
        title: "Renewals",
        body: "Predict, engage, and renew.",
      },
      {
        href: "/property-management",
        icon: CreditCard,
        title: "Delinquency",
        body: "Reduce late payments and boost cash flow.",
      },
      {
        href: "/property-management",
        icon: Wrench,
        title: "Maintenance & Mobile App",
        body: "Automate repairs and manage mobile work orders from request to resolution.",
      },
      {
        href: "/property-management",
        icon: DoorOpen,
        title: "Owner Portal",
        body: "Find out how well your teams answer calls.",
      },
    ]),
  },
];

type MegaMenuProps = {
  label: string;
  columns: MegaMenuColumn[];
  showAside?: boolean;
  latestBlogPosts?: LatestBlogPostNavItem[];
  promotionalBanner?: {
    alt: string;
    eventLabel: string;
    href: string;
    src: string;
  };
};

function LatestPostsAside({
  posts,
  onSelect,
}: {
  posts: LatestBlogPostNavItem[];
  onSelect: () => void;
}) {
  return (
    <aside className={`${styles.aside} ${styles.latestAside}`}>
      <span className={styles.heading}>Latest</span>
      <div className={styles.latestPostList}>
        {posts.map((post) => (
          <TrackedLink
            key={post.href}
            className={styles.latestPostCard}
            destination={post.href}
            eventLabel="mega_menu_latest_blog_post"
            onClick={onSelect}
          >
            <span className={styles.latestPostMedia}>
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  width={88}
                  height={50}
                  sizes="88px"
                />
              ) : (
                <Newspaper size={18} weight="fill" aria-hidden="true" />
              )}
            </span>
            <span className={styles.latestPostCopy}>
              <small>
                {[post.categoryLabel, post.publishedLabel]
                  .filter(Boolean)
                  .join(" · ")}
              </small>
              <strong>{post.title}</strong>
            </span>
          </TrackedLink>
        ))}
      </div>
      <TrackedLink
        className={styles.latestPostsAll}
        destination="/blog"
        eventLabel="mega_menu_all_blog_posts"
        onClick={onSelect}
      >
        View all posts <ArrowRight size={13} aria-hidden="true" />
      </TrackedLink>
    </aside>
  );
}

function PromotionalAside({ onSelect }: { onSelect: () => void }) {
  return (
    <aside className={styles.aside}>
      <span className={styles.heading}>New</span>
      <p>
        Innflow Assistant turns operational questions into reviewable next steps
        — with human control built in.
      </p>
      <TrackedLink
        destination={siteConfig.demoUrl}
        eventLabel="mega_menu_demo"
        onClick={onSelect}
      >
        Book a demo <ArrowRight size={13} />
      </TrackedLink>
    </aside>
  );
}

export function MegaMenu({
  label,
  columns,
  showAside = true,
  latestBlogPosts,
  promotionalBanner,
}: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Escape closes the panel.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close when focus leaves the trigger + panel.
  const onBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      closeMenu();
    }
  };

  const panelMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.18, ease: "easeOut" as const },
      };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover intent only — keyboard access is provided by the trigger button's onFocus/onClick
    <div
      ref={rootRef}
      className={styles.wrap}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={onBlur}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={openMenu}
        onFocus={openMenu}
      >
        {label}
        <CaretDown
          className={styles.caret}
          size={14}
          weight="bold"
          aria-hidden="true"
        />
      </button>

      {/* Full-viewport-width panel (desktop). Centered via 50%/-50vw so the
          positioning context of either header cannot constrain it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className={styles.panel}
            role="region"
            aria-label={`${label} menu`}
            {...panelMotion}
          >
            <div
              className={`${styles.grid}${
                promotionalBanner
                  ? ` ${styles.gridWithBanner}`
                  : showAside
                    ? ""
                    : ` ${styles.gridWithoutAside}`
              }`}
            >
              {columns.map((column) => (
                <div key={column.heading} className={styles.column}>
                  <span className={styles.heading}>{column.heading}</span>
                  {column.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.title}
                        href={link.href}
                        className={styles.link}
                        onClick={closeMenu}
                      >
                        <span className={styles.icon}>
                          {link.iconSrc ? (
                            <Image
                              className={styles.customIcon}
                              src={link.iconSrc}
                              alt=""
                              width={24}
                              height={24}
                              unoptimized
                            />
                          ) : (
                            <Icon size={16} weight="fill" />
                          )}
                        </span>
                        <span>
                          <strong>
                            {link.title}
                            {"badge" in link && link.badge ? (
                              <span className={styles.badge}>{link.badge}</span>
                            ) : null}
                          </strong>
                          <small>{link.body}</small>
                        </span>
                      </a>
                    );
                  })}
                </div>
              ))}
              {promotionalBanner ? (
                <TrackedLink
                  className={styles.promotionalBanner}
                  destination={promotionalBanner.href}
                  eventLabel={promotionalBanner.eventLabel}
                  onClick={closeMenu}
                >
                  <Image
                    alt={promotionalBanner.alt}
                    className={styles.promotionalBannerImage}
                    height={776}
                    sizes="(max-width: 1100px) calc(100vw - 340px), 900px"
                    src={promotionalBanner.src}
                    width={2430}
                  />
                </TrackedLink>
              ) : showAside ? (
                latestBlogPosts?.length ? (
                  <LatestPostsAside
                    posts={latestBlogPosts}
                    onSelect={closeMenu}
                  />
                ) : (
                  <PromotionalAside onSelect={closeMenu} />
                )
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
