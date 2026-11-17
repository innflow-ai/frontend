import { BotIcon } from "@/components/icons/bot-icon";
import {
  ContactBook as AddressBook,
  Archive,
  ArrowRight,
  Refresh as ArrowsClockwise,
  Screencast as Browser,
  BuildingB as Buildings,
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
import {
  industryHref,
  industryNavigation,
} from "@/content/industry-navigation";
import { platformPages } from "@/content/platform";
import { megaMenuHref } from "@/lib/mega-menu-destinations";

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
    href: "/features/workflows",
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
    icon: BotIcon,
    title: "AI Agents",
    body: "Purpose-built agents that move everyday work forward.",
  },
];

// TODO(julian): confirm before these links appear in the product menu.
// Planned routes, not built yet:
// Agent Memory → /features/agent-memory (/platform/self-learning stays)
// Teammates → /features/teammates (/features/assistant stays)
const SHOW_STRUCTURE_PRODUCT_NAV = false;
const structureProductLinks: MegaMenuLink[] = [
  {
    href: "/features/workflows",
    icon: FlowArrow,
    title: "Workflows",
    body: "A visible path from the first trigger to the review.",
  },
];
if (SHOW_STRUCTURE_PRODUCT_NAV) {
  platformLinks.push(...structureProductLinks);
}

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
      hideIcon: true,
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
