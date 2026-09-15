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
  FlowArrow,
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
  Signature,
  Sparkle,
  Storefront,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { platformPages } from "@/content/platform";
import styles from "./mega-menu.module.css";

export type MegaMenuLink = {
  href: string;
  icon: Icon;
  iconSrc?: string;
  hideIcon?: boolean;
  browseAll?: boolean;
  title: string;
  body: string;
  badge?: string;
};

export type MegaMenuColumn = {
  heading: string;
  links: MegaMenuLink[];
};

export type LatestBlogPostNavItem = {
  actionLabel?: string;
  title: string;
  href: string;
  categoryLabel: string;
  publishedLabel: string;
  imageUrl: string | null;
  imageAlt: string;
};

const featureDestinations: Record<string, string> = {
  Residential: "/residential",
  Multifamily: "/multifamily",
  Commercial: "/commercial",
  "Community Associations": "/community-associations",
  Conventional: "/multifamily",
  "Student Housing": "/student-housing",
  "Centralized Operations": "/operations",
  "Owner Portal": "/owners",
  Owners: "/owners",
  Listings: "/listing-and-advertising",
  Advertising: "/listing-and-advertising",
  "Application & eSign": "/rental-applications",
  CRM: "/crm",
  "Move-In": "/leasing",
  Renewals: "/leasing",
  Delinquency: "/rapid-rent",
};

function withApprovedMenuIcons(links: MegaMenuLink[]): MegaMenuLink[] {
  return links.map((link) => ({
    ...link,
    href: featureDestinations[link.title] ?? link.href,
    iconSrc:
      link.iconSrc ??
      `/brand/navigation/mega-menu-items/${link.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}.svg`,
  }));
}

const platformLinks: MegaMenuLink[] = [
  {
    href: "/platform",
    icon: CirclesThreePlus,
    title: "Platform",
    body: "The connected foundation for modern property operations.",
  },
  {
    href: "/integrations",
    icon: PlugsConnected,
    title: "Integrations",
    body: "Explore integrations and planned connections for your team's tools.",
  },
  {
    href: "/products/agentic-workflows",
    icon: FlowArrow,
    title: "Agentic Workflows",
    body: "Recurring work made visible, governed, and repeatable.",
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
    href: "/products/agent-studio",
    icon: Wrench,
    title: "Agent Studio",
    body: "Build, test, and refine agents in one visual workspace.",
  },
  {
    href: "/skills",
    icon: PuzzlePiece,
    title: "Agent Skills",
    body: "Start with reusable skills for the work your team repeats.",
  },
];

const capabilityLinks: MegaMenuLink[] = [
  {
    href: "/files-and-documents",
    icon: Archive,
    title: "Files & Documents",
    body: "Keep property files close to the work.",
    iconSrc: "/brand/navigation/bl-stroke/09-file-records.svg",
  },
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
];

const resourcesLinks: MegaMenuLink[] = [
  {
    href: "https://docs.innflow.ai",
    icon: ListBullets,
    iconSrc: "/brand/navigation/bl-stroke/09-file-records.svg",
    title: "Docs",
    body: "Guides and documentation for building with Innflow.",
  },
  {
    href: "/blog",
    icon: Newspaper,
    title: "Blog",
    body: "Ideas for sharper, calmer operations.",
  },
  {
    href: "/partner-with-us",
    icon: Handshake,
    iconSrc: "/brand/navigation/mega-menu-items/become-an-affiliate.svg",
    title: "Partnerships",
    body: "Partner with Innflow and help more property teams modernize operations.",
  },
  {
    href: "/our-customers",
    icon: Quotes,
    title: "Customer Stories",
    body: "Explore real-world success stories from Innflow customers.",
  },
  {
    href: "/resources",
    icon: Archive,
    iconSrc: "/brand/navigation/mega-menu-items/asset-library.svg",
    title: "Resource Library",
    body: "Explore reports, guides, testimonials, podcasts, and more.",
  },
];

export const resourcesColumns: MegaMenuColumn[] = [
  {
    heading: "Resources",
    links: withApprovedMenuIcons(resourcesLinks),
  },
];

const corePortfolioColumns: MegaMenuColumn[] = [
  {
    heading: "Portfolios",
    links: withApprovedMenuIcons([
      {
        href: "/multi-property-investors",
        icon: Buildings,
        title: "Multifamily",
        body: "Large and mid-sized communities.",
      },
      {
        href: "/multi-property-investors",
        icon: Storefront,
        title: "Commercial",
        body: "Office, retail & industrial.",
      },
      {
        href: "/multi-property-investors",
        icon: UsersThree,
        title: "Community Associations",
        body: "HOAs, condos & townhomes.",
      },
    ]),
  },
];

export const allProductColumns: MegaMenuColumn[] = [
  {
    heading: "Platform and agents",
    links: withApprovedMenuIcons(platformLinks),
  },
  {
    heading: "Build and customize",
    links: withApprovedMenuIcons([...buildWithAgentsLinks, ...capabilityLinks]),
  },
  {
    heading: "Automation and intelligence",
    links: withApprovedMenuIcons(
      platformPages.slice(0, 4).map((page) => ({
        href: `/platform/${page.slug}`,
        icon: FlowArrow,
        title: page.title,
        body: page.description,
      })),
    ),
  },
  {
    heading: "Connections and governance",
    links: withApprovedMenuIcons([
      ...platformPages
        .filter((page) =>
          ["deployment-options", "security-and-compliance"].includes(page.slug),
        )
        .map((page) => ({
          href: `/platform/${page.slug}`,
          icon: PlugsConnected,
          title: page.title,
          body: page.description,
        })),
    ]),
  },
];

const coreSolutionsColumns: MegaMenuColumn[] = [
  {
    heading: "Operations",
    links: withApprovedMenuIcons([
      {
        href: "/property-management",
        icon: CirclesFour,
        title: "Centralized Operations",
        body: "Modern, AI-powered operations across leasing, admin, and maintenance.",
      },
      {
        href: "/rent-collection",
        icon: CreditCard,
        iconSrc: "/brand/navigation/bl-stroke/23-credit-card.svg",
        title: "Rent Collection",
        body: "Keep recurring rental workflows and resident context connected.",
      },
      {
        href: "/property-management",
        icon: CreditCard,
        iconSrc: "/brand/navigation/bl-stroke/delinquency-alarm.svg",
        title: "Delinquency",
        body: "Reduce late payments and boost cash flow.",
      },
      {
        href: "/property-management",
        icon: DoorOpen,
        title: "Owner Portal",
        body: "Keep owners connected to property information and team updates.",
      },
    ]),
  },
  {
    heading: "Leasing",
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
        body: "Coordinate rental applications and document signing.",
      },
      {
        href: "/products/databases",
        icon: AddressBook,
        title: "CRM",
        body: "Capture, nurture, & convert prospects.",
      },
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
    ]),
  },
  {
    heading: "By team",
    links: withApprovedMenuIcons([
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
      {
        href: "/property-management",
        icon: UsersThree,
        iconSrc: "/brand/navigation/bl-stroke/leasing-teams.svg",
        title: "Leasing Teams",
        body: "Coordinate prospect follow-up, applications, and resident handoffs.",
      },
    ]),
  },
];

function featureLink(
  title: string,
  href: string,
  body: string,
  iconFile: string,
): MegaMenuLink {
  return {
    title,
    href,
    body,
    icon: CirclesFour,
    iconSrc: `/brand/navigation/bl-stroke/${iconFile}.svg`,
  };
}

export const allSolutionsColumns: MegaMenuColumn[] = [
  ...coreSolutionsColumns.map((column) => ({
    ...column,
    links: [
      ...column.links,
      ...(column.heading === "Operations"
        ? [
            featureLink(
              "Inspections",
              "/inspections",
              "Connect condition reports and follow-up work.",
              "10-checklist-note",
            ),
            featureLink(
              "Work Orders",
              "/work-orders",
              "Keep maintenance requests and handoffs moving.",
              "19-wrench",
            ),
            featureLink(
              "Communication Tools",
              "/communication-tools",
              "Keep conversations close to property context.",
              "02-inbox",
            ),
            featureLink(
              "Mobile Apps",
              "/mobile-apps",
              "Stay connected to property work on the go.",
              "01-laptop",
            ),
            featureLink(
              "Tenant Management",
              "/tenant-management",
              "Connect tenant records, requests, and files.",
              "13-contact-book",
            ),
          ]
        : column.heading === "Leasing"
          ? [
              featureLink(
                "Leasing Overview",
                "/leasing",
                "Follow the journey from inquiry to lease.",
                "18-key",
              ),
              featureLink(
                "Showings",
                "/showings",
                "Keep scheduled visits and follow-up connected.",
                "22-calendar-check",
              ),
              featureLink(
                "Tenant Screening",
                "/tenant-screening-service",
                "Bring supporting information into the review.",
                "32-user-check",
              ),
            ]
          : [
              featureLink(
                "Resident Portal",
                "/residents",
                "A clear place for everyday resident tasks.",
                "20-user-square",
              ),
            ]),
    ],
  })),
  {
    heading: "Finance",
    links: [
      featureLink(
        "Accounting",
        "/landlord-accounting",
        "Keep property finances in focus.",
        "09-file-records",
      ),
      featureLink(
        "Bookkeeping",
        "/bookkeeping",
        "Organize records and review steps.",
        "30-book-text",
      ),
      featureLink(
        "Bank Sync",
        "/bank-sync",
        "Connect account activity and context.",
        "35-link",
      ),
      featureLink(
        "Reports",
        "/reports",
        "Turn property records into a clearer picture.",
        "16-dashboard-3",
      ),
      featureLink(
        "QuickBooks",
        "/quickbooks-online-integration",
        "Explore connected bookkeeping workflows.",
        "06-settings",
      ),
      featureLink(
        "Rapid Rent",
        "/rapid-rent",
        "Keep rent payment workflows connected.",
        "23-credit-card",
      ),
    ],
  },
];

export function directorySectionId(heading: string) {
  return heading.toLowerCase().replaceAll(" ", "-");
}

function featuredColumns(
  columns: MegaMenuColumn[],
  selections: Record<string, string[]>,
): MegaMenuColumn[] {
  return columns.map((column) => ({
    ...column,
    links: [
      ...(selections[column.heading]
        ? column.links.filter((link) =>
            selections[column.heading].includes(link.title),
          )
        : column.links.slice(0, 4)),
    ],
  }));
}

export const menuBrowseLinks: Partial<
  Record<string, { href: string; title: string }>
> = {
  Product: { href: "/products", title: "Browse all products" },
  Solutions: { href: "/solutions", title: "Browse all solutions" },
};

export const productColumns = featuredColumns(allProductColumns, {
  "Platform and agents": ["Platform", "Integrations", "AI Agents"],
  "Build and customize": ["Agent Studio", "Agent Skills"],
  "Automation and intelligence": [
    "Agentic Automation",
    "Analytics and Observability",
  ],
  "Connections and governance": [
    "Deployment Options",
    "Security and Compliance",
  ],
});

export const solutionsColumns = featuredColumns(allSolutionsColumns, {
  Operations: ["Centralized Operations", "Rent Collection", "Work Orders"],
  Leasing: ["Advertising", "Application & eSign", "CRM"],
  "By team": ["Owner Operators and Fee Managers", "Leasing Teams"],
  Finance: ["Accounting", "Reports"],
});

export const portfolioColumns: MegaMenuColumn[] = corePortfolioColumns.map(
  (column) => ({
    ...column,
    links: [
      ...column.links,
      featureLink(
        "Single Family",
        "/single-family",
        "Keep work connected across individual homes.",
        "24-home",
      ),
      {
        href: "/connections#property-types",
        icon: ArrowRight,
        title: "Browse all property types",
        hideIcon: true,
        browseAll: true,
        body: "Browse every portfolio type in our page directory.",
      },
    ],
  }),
);

type MegaMenuProps = {
  compact?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
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

const MEGA_MENU_LATEST_POST_COUNT = 2;
const MEGA_MENU_COVER_WIDTH = 720;
const MEGA_MENU_COVER_HEIGHT = 512;

function LatestPostsAside({
  posts,
  onSelect,
}: {
  posts: LatestBlogPostNavItem[];
  onSelect: () => void;
}) {
  const visiblePosts = posts.slice(0, MEGA_MENU_LATEST_POST_COUNT);

  return (
    <aside className={`${styles.aside} ${styles.latestAside}`}>
      <span className={styles.heading}>Latest</span>
      <div className={styles.latestPostList}>
        {visiblePosts.map((post) => (
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
                  width={MEGA_MENU_COVER_WIDTH}
                  height={MEGA_MENU_COVER_HEIGHT}
                  quality={100}
                  sizes="(max-width: 1100px) 42vw, 360px"
                />
              ) : (
                <Newspaper size={28} weight="fill" aria-hidden="true" />
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
  compact = false,
  expanded,
  onExpandedChange,
  label,
  columns,
  showAside = true,
  latestBlogPosts,
  promotionalBanner,
}: MegaMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = expanded ?? internalOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onExpandedChange?.(value);
    },
    [onExpandedChange],
  );
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
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
      if (event.key === "Escape" && open) {
        if (rootRef.current?.contains(document.activeElement)) {
          triggerRef.current?.focus();
        }
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!compact || !open) return;
    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  });

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
      className={`${styles.wrap} ${compact ? styles.compact : ""}`}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={(event) =>
          event.detail === 0 && open ? closeMenu() : openMenu()
        }
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
                    ? columns.length === 1
                      ? ` ${styles.gridSingleWithAside}`
                      : ""
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
                        data-browse-all={link.browseAll || undefined}
                        onClick={closeMenu}
                      >
                        {!link.hideIcon && (
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
                        )}
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
              {menuBrowseLinks[label] && (
                <a
                  className={styles.browseAll}
                  data-browse-all
                  href={menuBrowseLinks[label].href}
                  onClick={closeMenu}
                >
                  <span>{menuBrowseLinks[label].title}</span>
                </a>
              )}
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
