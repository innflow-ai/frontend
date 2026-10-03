"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  ContactBook as AddressBook,
  Archive,
  ArrowRight,
  Refresh as ArrowsClockwise,
  Screencast as Browser,
  BuildingB as Buildings,
  ChevronDown as CaretDown,
  Dashboard as CirclesFour,
  DashboardPlus as CirclesThreePlus,
  CreditCard,
  Database,
  Login as DoorOpen,
  Share as FlowArrow,
  Users as Handshake,
  Home as House,
  Home as HouseLine,
  type Icon,
  Checklist as ListBullets,
  MegaphoneA as Megaphone,
  NoteText as Newspaper,
  Link as PlugsConnected,
  Box3d as PuzzlePiece,
  MessageSquare as Quotes,
  EditPen as Signature,
  StarsA as Sparkle,
  Shop as Storefront,
  Users as UsersThree,
  Wrench,
} from "@/components/icons/mage";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { industryHref, industryNavigation } from "@/content/industry-navigation";
import { platformPages } from "@/content/platform";
import { megaMenuHref } from "@/lib/mega-menu-destinations";
import styles from "./mega-menu.module.css";

export {
  MEGA_MENU_FEATURE_HREFS,
  megaMenuHref,
} from "@/lib/mega-menu-destinations";

export type MegaMenuLink = {
  href: string;
  icon: Icon;
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

function withMenuDestinations(links: MegaMenuLink[]): MegaMenuLink[] {
  return links.map((link) => ({
    ...link,
    href: megaMenuHref(link.title, link.href),
  }));
}

const platformLinks: MegaMenuLink[] = [
  {
    href: "/platform",
    icon: CirclesThreePlus,
    title: "Platform",
    body: "The connected foundation for your everyday operations.",
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
    body: "Purpose-built agents that move everyday work forward.",
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
    body: "Keep your files close to the work.",
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

    title: "Resource Library",
    body: "Explore reports, guides, testimonials, podcasts, and more.",
  },
];

export const resourcesColumns: MegaMenuColumn[] = [
  {
    heading: "Resources",
    links: withMenuDestinations(resourcesLinks),
  },
];

const corePortfolioColumns: MegaMenuColumn[] = [
  {
    heading: "Portfolios",
    links: withMenuDestinations([
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
    links: withMenuDestinations(platformLinks),
  },
  {
    heading: "Build and customize",
    links: withMenuDestinations([...buildWithAgentsLinks, ...capabilityLinks]),
  },
  {
    heading: "Automation and intelligence",
    links: withMenuDestinations(
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
    links: withMenuDestinations([
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
    links: withMenuDestinations([
      {
        href: "/operations",
        icon: CirclesFour,
        title: "Centralized Operations",
        body: "Modern, AI-powered operations across leasing, admin, and maintenance.",
      },
      {
        href: "/rent-collection",
        icon: CreditCard,

        title: "Rent Collection",
        body: "Keep recurring rental workflows and resident context connected.",
      },
      {
        href: "/rapid-rent",
        icon: CreditCard,

        title: "Delinquency",
        body: "Reduce late payments and boost cash flow.",
      },
      {
        href: "/owners",
        icon: DoorOpen,
        title: "Owner Portal",
        body: "Keep owners connected to property information and team updates.",
      },
    ]),
  },
  {
    heading: "Leasing",
    links: withMenuDestinations([
      {
        href: "/listing-and-advertising",
        icon: ListBullets,
        title: "Listings",
        body: "Keep property listings accurate and up to date.",
      },
      {
        href: "/listing-and-advertising",
        icon: Megaphone,
        title: "Advertising",
        body: "Reach qualified renters across the right channels.",
      },
      {
        href: "/rental-applications",
        icon: Signature,
        title: "Application & eSign",
        body: "Coordinate rental applications and document signing.",
      },
      {
        href: "/crm",
        icon: AddressBook,
        title: "CRM",
        body: "Capture, nurture, & convert prospects.",
      },
      {
        href: "/leasing",
        icon: HouseLine,
        title: "Move-In",
        body: "Effortless move-ins powered by AI.",
      },
      {
        href: "/leasing",
        icon: ArrowsClockwise,
        title: "Renewals",
        body: "Predict, engage, and renew.",
      },
    ]),
  },
  {
    heading: "By team",
    links: withMenuDestinations([
      {
        href: "/operations",
        icon: UsersThree,
        title: "Owner Operators and Fee Managers",
        body: "AI automation for property management companies.",
      },
      {
        href: "/owners",
        icon: House,
        title: "Owners",
        body: "AI automation for ownership groups.",
      },
      {
        href: "/leasing",
        icon: UsersThree,

        title: "Leasing Teams",
        body: "Coordinate prospect follow-up, applications, and resident handoffs.",
      },
    ]),
  },
];

import {
  CalendarCheck,
  ChecklistNote,
  ContactBook,
  FileRecords,
  Inbox,
  Key,
  Laptop,
  Home as MageHome,
  Link as MageLink,
  NoteText,
  Settings,
  UserCheck,
  UserSquare,
} from "@/components/icons/mage";

const featureIcons: Record<string, Icon> = {
  "10-checklist-note": ChecklistNote,
  "19-wrench": Wrench,
  "02-inbox": Inbox,
  "01-laptop": Laptop,
  "13-contact-book": ContactBook,
  "18-key": Key,
  "22-calendar-check": CalendarCheck,
  "32-user-check": UserCheck,
  "20-user-square": UserSquare,
  "09-file-records": FileRecords,
  "30-book-text": NoteText,
  "35-link": MageLink,
  "06-settings": Settings,
  "23-credit-card": CreditCard,
  "24-home": MageHome,
};
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
    icon: featureIcons[iconFile] ?? CirclesFour,
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
  Solutions: {
    href: "/solutions",
    title: "Browse all industries and solutions",
  },
};

export const productColumns = featuredColumns(allProductColumns, {
  "Platform and agents": ["Platform", "Integrations", "AI Agents"],
  "Build and customize": ["Agent Studio", "Agent Skills"],
  "Automation and intelligence": [
    "Agentic Automation",
    "Self Learning",
    "Evaluations",
    "Analytics and Observability",
  ],
  "Connections and governance": [
    "Deployment Options",
    "Security and Compliance",
  ],
});

export const solutionsColumns: MegaMenuColumn[] = [
  {
    heading: "Financial & professional",
    slugs: [
      "financial-services-banking",
      "finance",
      "banking",
      "insurance",
      "private-equity",
      "professional-services",
    ],
  },
  {
    heading: "People & services",
    slugs: [
      "healthcare",
      "pharmaceutical",
      "public-sector",
      "hospitality-travel",
      "retail-ecommerce",
      "business-process-outsourcing",
    ],
  },
  {
    heading: "Industry & operations",
    slugs: [
      "property-real-estate",
      "property-management",
      "manufacturing",
      "telecommunications",
      "energy-utilities",
      "construction",
      "supply-chain-logistics",
      "technology-software",
    ],
  },
  {
    heading: "Teams & use cases",
    slugs: [
      "hr-recruitment",
      "talent-acquisition",
      "customer-service",
      "debt-collection",
      "cross-industry",
      "custom-ai-solutions",
    ],
  },
].map(({ heading, slugs }) => ({
  heading,
  links: slugs.map((slug) => {
    const page = industryNavigation.find((page) => page.slug === slug);
    if (!page) throw new Error(`Unknown industry: ${slug}`);
    return {
      href: industryHref(page.slug),
      title: page.name,
      body: "",
      icon: Buildings,
    };
  }),
}));

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
        destination={siteConfig.signupUrl}
        eventLabel="mega_menu_signup"
        onClick={onSelect}
      >
        Get started now <ArrowRight size={13} />
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
                            <Icon size={24} />
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
