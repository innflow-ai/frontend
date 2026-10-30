export type HotelModule = {
  slug: string;
  name: string;
  group: "Guest operations" | "Hotel operations" | "Finance & performance";
  headline: string;
  description: string;
  steps: { title: string; body: string; detail: string[] }[];
  highlights: string[];
  question: string;
  answer: string;
};

// Proposed positioning from docs/hotel-pms/feature-map.csv, not a release manifest.
export const hotelModules: HotelModule[] = [
  {
    slug: "front-desk",
    name: "Reservations & front desk",
    group: "Guest operations",
    headline: "A clearer view of every stay.",
    description:
      "Bring reservations, room availability, group bookings, and arrivals into one front-desk workspace.",
    steps: [
      {
        title: "See the whole house.",
        body: "A shared reservation timeline puts rooms, dates, and availability in context, so the next move is easier to see.",
        detail: [
          "Room and reservation timeline",
          "Availability and occupancy",
          "Room moves and conflict checks",
        ],
      },
      {
        title: "Make every arrival feel prepared.",
        body: "Keep arrival details, room readiness, and guest preferences together before the guest reaches reception.",
        detail: [
          "Arrival and departure lists",
          "Guest notes and preferences",
          "Housekeeping readiness",
        ],
      },
      {
        title: "Give group stays room to work.",
        body: "Organize room blocks and track pickup without losing sight of the rest of your inventory.",
        detail: [
          "Group room blocks",
          "Pickup and release dates",
          "Reservation-level detail",
        ],
      },
      {
        title: "Connect the booking to the business.",
        body: "Carry the reservation context into guest service, billing, and daily reporting.",
        detail: [
          "Rate and package context",
          "Guest profiles",
          "Reservation-linked charges",
        ],
      },
    ],
    highlights: [
      "Drag-and-drop planning",
      "Group booking oversight",
      "Rate and package visibility",
      "Shared guest context",
    ],
    question: "How does the front desk connect to housekeeping?",
    answer:
      "The proposed workflow links room readiness to the arrival list. Reception can see which rooms are ready and which need attention before assigning the next arrival.",
  },
  {
    slug: "guest-experience",
    name: "Guest experience",
    group: "Guest operations",
    headline: "More hospitality. Fewer handoffs.",
    description:
      "Connect the guest journey from direct booking and pre-arrival messages to check-in, service requests, and checkout.",
    steps: [
      {
        title: "Start the stay before arrival.",
        body: "Make room for direct bookings, add-ons, and pre-arrival information in one connected journey.",
        detail: [
          "Direct booking flow",
          "Packages and optional extras",
          "Pre-arrival information",
        ],
      },
      {
        title: "Make check-in feel effortless.",
        body: "Let guests prepare their details ahead of time and give reception a clear view of what is still needed.",
        detail: [
          "Online check-in",
          "Registration and signatures",
          "Checkout preparation",
        ],
      },
      {
        title: "Keep the conversation with the stay.",
        body: "Bring messages and requests alongside the reservation, with AI-assisted drafts reviewed by your team.",
        detail: [
          "Reservation-linked inbox",
          "Guest preferences and history",
          "Draft, review, then send",
        ],
      },
      {
        title: "Turn a request into a clear handoff.",
        body: "Connect a guest request to the team that can resolve it, with ownership and status visible along the way.",
        detail: [
          "Service request assignment",
          "Team handoffs",
          "Follow-up status",
        ],
      },
    ],
    highlights: [
      "Unified guest profiles",
      "Pre-arrival journeys",
      "Relevant stay upgrades",
      "Human-reviewed assistance",
    ],
    question: "Which messaging channels are included?",
    answer:
      "Channel coverage will be confirmed during rollout. The design brings reservation context, guest messages, and team follow-up together; it does not imply every messaging provider is already connected.",
  },
  {
    slug: "housekeeping",
    name: "Housekeeping & maintenance",
    group: "Hotel operations",
    headline: "Every room ready for what’s next.",
    description:
      "Bring room status, cleaning assignments, inspections, and maintenance into the same operating picture.",
    steps: [
      {
        title: "Plan around the day’s arrivals.",
        body: "Turn departures, stayovers, and expected arrivals into a practical room-turn plan.",
        detail: [
          "Departure and stayover planning",
          "Cleaning assignments",
          "Arrival priorities",
        ],
      },
      {
        title: "Keep room status moving.",
        body: "Give housekeeping and reception a shared language for dirty, in-progress, inspected, and ready rooms.",
        detail: [
          "Room status board",
          "Assignment ownership",
          "Inspection handoff",
        ],
      },
      {
        title: "Catch the issue before the next stay.",
        body: "Attach a maintenance request to the room and make the repair visible to the people planning its next booking.",
        detail: [
          "Room-linked work orders",
          "Preventive maintenance",
          "Out-of-service visibility",
        ],
      },
      {
        title: "Learn from each shift.",
        body: "Review workload and turnaround patterns to understand where the team needs support.",
        detail: [
          "Cleaning productivity",
          "Workload by attendant",
          "Open work and exceptions",
        ],
      },
    ],
    highlights: [
      "Room readiness",
      "Service request tracking",
      "Maintenance ownership",
      "Shift-level visibility",
    ],
    question: "Can maintenance sit alongside housekeeping?",
    answer:
      "Yes, that is the proposed operating model: cleaning, inspection, and maintenance share the room context, while each task keeps its own owner and status.",
  },
  {
    slug: "accounting",
    name: "Hotel accounting",
    group: "Finance & performance",
    headline: "Follow the money. Keep the context.",
    description:
      "Connect guest billing, accounts payable, bank reconciliation, and hotel budgets from the property to the portfolio.",
    steps: [
      {
        title: "Give every invoice a clear path.",
        body: "Capture invoices, check extracted details, and route coded expenses to the right reviewer.",
        detail: [
          "Upload and email intake",
          "Invoice extraction and coding",
          "Approval comments and attachments",
        ],
      },
      {
        title: "Reconcile with fewer loose ends.",
        body: "Keep bank activity, matching decisions, statements, and variances close to the close process.",
        detail: [
          "Bank transaction matching",
          "Statement attachments",
          "Property-by-month reconciliation",
        ],
      },
      {
        title: "Keep guest balances understandable.",
        body: "Follow charges, invoices, adjustments, and outstanding amounts with the reservation context intact.",
        detail: [
          "Guest ledger and billing",
          "Receivables and matching",
          "Exceptions and audit history",
        ],
      },
      {
        title: "Build a budget around the hotel.",
        body: "Plan by property and department using occupancy, ADR, revenue assumptions, and prior-period context.",
        detail: [
          "Hotel-specific budget drivers",
          "Department and GL detail",
          "Actuals against budget",
        ],
      },
    ],
    highlights: [
      "Invoice approval trails",
      "Property-level coding",
      "Budget visibility",
      "Guest and supplier accounting",
    ],
    question: "Does this replace our accounting system?",
    answer:
      "That depends on your operating model and the capabilities available at rollout. The first conversation maps your ledger, banking, approvals, and reporting requirements before deciding what to connect or replace.",
  },
  {
    slug: "procurement",
    name: "Procurement & inventory",
    group: "Hotel operations",
    headline: "Everything the hotel needs. A clearer way to buy it.",
    description:
      "Bring suppliers, order guides, price comparisons, approvals, and receiving into one purchasing workflow.",
    steps: [
      {
        title: "Start with the supplies you know.",
        body: "Build reusable order guides around your properties, departments, and preferred suppliers.",
        detail: [
          "Supplier catalogs and accounts",
          "Property-specific order guides",
          "Contract price context",
        ],
      },
      {
        title: "Compare the complete order.",
        body: "Look beyond the unit price. Review alternatives, availability, and shipping thresholds before choosing a supplier.",
        detail: [
          "Supplier alternatives",
          "Stock and backorder visibility",
          "Shipping-aware cart comparison",
        ],
      },
      {
        title: "Put spend in the right hands.",
        body: "Connect a purchase request to its budget, GL coding, and approval path before it becomes an order.",
        detail: [
          "Spend approval routing",
          "Budget and GL context",
          "Purchase order references",
        ],
      },
      {
        title: "Close the loop at delivery.",
        body: "Track ordered and received quantities, including partial deliveries and returns, alongside inventory.",
        detail: [
          "Receiving and partial deliveries",
          "Stock adjustments",
          "Returns and supplier follow-up",
        ],
      },
    ],
    highlights: [
      "Multi-supplier purchasing",
      "Reusable order guides",
      "Approval before purchase",
      "Inventory-linked receiving",
    ],
    question: "Will every supplier be available?",
    answer:
      "Supplier coverage, account connections, and pricing access need to be confirmed for each rollout. The workflow is designed around your existing supplier relationships, not an assumed universal catalog.",
  },
  {
    slug: "labor",
    name: "Labor & scheduling",
    group: "Hotel operations",
    headline: "The right team for the day ahead.",
    description:
      "Bring hotel demand, shift planning, time review, and labor performance into the same conversation.",
    steps: [
      {
        title: "Plan from hotel demand.",
        body: "Use occupancy, departures, stayovers, and revenue expectations to guide staffing needs.",
        detail: [
          "Demand-based labor planning",
          "Department staffing models",
          "Daily and weekly forecasts",
        ],
      },
      {
        title: "Build a schedule that works.",
        body: "Create and copy shifts, review coverage, and spot overtime risk before publishing the schedule.",
        detail: [
          "Shift creation and copying",
          "Coverage and overtime review",
          "Schedule publication",
        ],
      },
      {
        title: "Make time review easier.",
        body: "Bring punch exceptions, manager review, and time-off context into a clear approval queue.",
        detail: [
          "Punch and timesheet review",
          "Manager approvals",
          "Time-off visibility",
        ],
      },
      {
        title: "See where the hours go.",
        body: "Move from a portfolio view into a property, department, role, or employee to understand labor performance.",
        detail: [
          "Actual versus planned labor",
          "Department drilldowns",
          "Housekeeping productivity",
        ],
      },
    ],
    highlights: [
      "Occupancy-led staffing",
      "Overtime awareness",
      "Schedule-to-actual review",
      "Property and portfolio views",
    ],
    question: "Is payroll processing included?",
    answer:
      "Payroll processing is not represented as an available feature in this preview. Time review and payroll handoff requirements will be scoped with the systems your team uses.",
  },
  {
    slug: "revenue",
    name: "Revenue & distribution",
    group: "Finance & performance",
    headline: "Connect the room rate to the bigger picture.",
    description:
      "Explore direct booking, channel distribution, rate planning, and revenue performance in one connected hotel strategy.",
    steps: [
      {
        title: "Make direct booking part of the journey.",
        body: "Bring availability, rates, packages, and optional extras into a clear booking experience.",
        detail: [
          "Direct booking engine",
          "Room and rate availability",
          "Packages and add-ons",
        ],
      },
      {
        title: "Keep channels in context.",
        body: "Plan how room types, rates, restrictions, and reservations flow between the hotel and distribution partners.",
        detail: [
          "Channel mapping",
          "Availability and rate sync",
          "Restriction management",
        ],
      },
      {
        title: "Give pricing decisions better context.",
        body: "Bring demand, market signals, and budget goals into rate review, while keeping overrides with the team.",
        detail: [
          "Demand and market context",
          "Rate recommendations",
          "Human override",
        ],
      },
      {
        title: "Look beyond occupancy.",
        body: "Review occupancy, ADR, RevPAR, and channel contribution together to understand the shape of revenue.",
        detail: [
          "Hotel revenue indicators",
          "Channel performance",
          "Budget and prior-period comparisons",
        ],
      },
    ],
    highlights: [
      "Direct booking journeys",
      "Distribution planning",
      "Rate review",
      "Revenue visibility",
    ],
    question: "Which channel managers and revenue tools connect?",
    answer:
      "The connection plan will depend on your current stack and rollout scope. Competitor research informs the workflow, but does not establish Innflow integrations with those providers.",
  },
  {
    slug: "payments",
    name: "Payments & guest billing",
    group: "Guest operations",
    headline: "A clearer bill. A smoother departure.",
    description:
      "Connect deposits, stay charges, outlet purchases, invoices, and settlement review to the guest journey.",
    steps: [
      {
        title: "Prepare the payment before arrival.",
        body: "Design a consistent approach to deposits, prepayments, and payment requests around booking policies.",
        detail: [
          "Deposit and prepayment flows",
          "Reservation payment context",
          "Outstanding payment visibility",
        ],
      },
      {
        title: "Keep the folio together.",
        body: "Bring room charges and hotel outlet spending into one understandable view of the stay.",
        detail: ["Guest folio", "POS-to-room charging", "Charge routing"],
      },
      {
        title: "Make checkout easier to review.",
        body: "Give the guest and front desk a clear breakdown of charges, adjustments, and remaining balances.",
        detail: [
          "Itemized bills",
          "Adjustments and tax detail",
          "Checkout balance review",
        ],
      },
      {
        title: "Follow through to settlement.",
        body: "Keep payment activity, payouts, reconciliation, and disputed transactions in view after the guest leaves.",
        detail: [
          "Settlement review",
          "Reconciliation context",
          "Dispute evidence",
        ],
      },
    ],
    highlights: [
      "Reservation-linked payments",
      "Outlet charge context",
      "Clear guest folios",
      "Settlement visibility",
    ],
    question: "Are all payment methods supported?",
    answer:
      "Payment methods, currencies, markets, and processing providers will be confirmed during rollout. This preview describes the intended workflow, not payment-provider availability.",
  },
  {
    slug: "portfolio",
    name: "Portfolio intelligence",
    group: "Finance & performance",
    headline: "One property’s detail. Your portfolio’s perspective.",
    description:
      "Connect daily performance, financial reporting, and operational exceptions across your hotels.",
    steps: [
      {
        title: "Start with the daily picture.",
        body: "Bring occupancy, room revenue, labor, and operating performance into a shared morning view.",
        detail: [
          "Daily flash reporting",
          "Revenue and expense context",
          "Occupancy, ADR, and RevPAR",
        ],
      },
      {
        title: "Find the property that needs attention.",
        body: "Compare hotels and periods, then drill into the department behind an exception.",
        detail: [
          "Portfolio and property filters",
          "Budget and prior-year comparisons",
          "Department-level drilldowns",
        ],
      },
      {
        title: "Give each team the right view.",
        body: "Organize reporting and access around responsibilities, from front-desk teams to portfolio finance.",
        detail: [
          "Role-based workspace planning",
          "Property-level access",
          "Shared reporting definitions",
        ],
      },
      {
        title: "Turn a signal into a next step.",
        body: "Connect a report to an owned task, with review points and a record of what happened next.",
        detail: [
          "Exception review",
          "Task ownership",
          "Scheduled reporting and exports",
        ],
      },
    ],
    highlights: [
      "Multi-property visibility",
      "Hotel-specific reporting",
      "Actionable exceptions",
      "Consistent operating context",
    ],
    question: "Can we start with a single property?",
    answer:
      "Yes. The proposed rollout starts with a focused operating workflow and the data it needs. Additional properties and departments can follow once the approach is validated.",
  },
];

export const hotelGroups = [
  "Guest operations",
  "Hotel operations",
  "Finance & performance",
] as const;
export const hotelHref = (slug: string) => `/hotel-pms/${slug}`;
export const findHotelModule = (slug: string) =>
  hotelModules.find((module) => module.slug === slug);
