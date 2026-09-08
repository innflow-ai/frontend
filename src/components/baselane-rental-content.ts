export const rentalContent = {
  "short-term": {
    title: "A clearer day behind every stay.",
    description:
      "Connected workflows and property knowledge for short-term rental teams, with the context to keep every guest handoff moving.",
    intro: "Make more room for great guest experiences.",
    introText:
      "Bring the operational details together so your team can focus on the people staying in your properties.",
    panoramaTitle: "Every listing has a story. Keep its details together.",
    panoramaText:
      "Give each property a shared home for requests, procedures, and team decisions. Coordinate the work between stays with a clear owner for the next step.",
    toolsTitle: "Built around the rhythm of every stay.",
    cards: [
      {
        image: "workflows",
        label: "Turnover workflows",
        title: "Give every turnover a clear plan.",
        description:
          "Connect recurring preparation tasks to the right property, supporting instructions, and team members.",
        preview: "Turnover coordination",
        rows: [
          "Guest departure recorded",
          "Preparation tasks assigned",
          "Property review requested",
        ],
      },
      {
        image: "properties",
        label: "Listing context",
        title: "Keep the details of every listing close.",
        description:
          "Organize property records and incoming requests so your team can find the context behind each stay.",
        preview: "Listing workspace",
        rows: [
          "Guest arrival instructions",
          "Open property requests",
          "Team handoff notes",
        ],
      },
      {
        image: "knowledge",
        label: "Team approvals",
        title: "Delegate work with clear review points.",
        description:
          "Keep your team involved where decisions need a second look, with the relevant context beside each request.",
        preview: "Review queue",
        rows: [
          "Vendor visit request",
          "Property details attached",
          "Awaiting team approval",
        ],
      },
    ],
    resourceTitle: "Explore the work behind a better stay.",
    resourceText:
      "See how Innflow connects workflows and knowledge for your short-term rental team.",
    storyTitle: "From preparation to the next arrival.",
    stories: [
      "Coordinate every turnover.",
      "Give every arrival a clear plan.",
      "Keep property answers close.",
      "Make team handoffs easier.",
    ],
  },
  "long-term": {
    title: "Clarity across every rental property.",
    description:
      "Connected workflows and knowledge that give long-term rental teams a clear view of their properties and the work ahead.",
    intro: "Make long-term rental operations the easy part.",
    introText:
      "Keep everyday requests, records, and handoffs connected, with less time spent chasing the details.",
    panoramaTitle: "Every property. One connected operation.",
    panoramaText:
      "Bring resident requests, property information, and team decisions into one place. Keep a clear view of what needs attention throughout the lease.",
    toolsTitle: "Tools for the full rental lifecycle.",
    cards: [
      {
        image: "properties",
        label: "Property workspaces",
        title: "Keep every property organized.",
        description:
          "Bring property records, procedures, and open requests together so your team can find the information behind each decision.",
        preview: "Property overview",
        rows: [
          "Oak Street · Resident requests",
          "Riverside · Maintenance review",
          "Maple Avenue · Move-in tasks",
        ],
      },
      {
        image: "workflows",
        label: "Resident workflows",
        title: "Give recurring requests a reliable path.",
        description:
          "Coordinate repeatable resident processes with clear ownership, supporting context, and human review at the right moments.",
        preview: "Resident request",
        rows: [
          "Request received",
          "Assigned to property team",
          "Approval requested",
        ],
      },
      {
        image: "knowledge",
        label: "Connected documents",
        title: "Keep the records close to the work.",
        description:
          "Organize procedures and supporting documents beside the properties they belong to, ready for your team's everyday questions.",
        preview: "Property knowledge",
        rows: [
          "Resident handbook",
          "Maintenance procedures",
          "Move-out checklist",
        ],
      },
    ],
    resourceTitle: "See a connected rental operation in action.",
    resourceText:
      "Explore how Innflow brings the work behind long-term rentals into one flow.",
    storyTitle: "Built around the life of a lease.",
    stories: [
      "Move-ins with a clear plan.",
      "Resident requests in context.",
      "Knowledge your team can find.",
      "Handoffs with clear ownership.",
    ],
  },
  "mid-term": {
    title: "A clearer view of every stay.",
    description:
      "Bring the moving parts of mid-term rentals together, from preparing a property to coordinating the next resident handoff.",
    intro: "Take the scattered work off your plate.",
    introText:
      "Keep the details behind each stay connected, so your team can focus on the next step with confidence.",
    panoramaTitle: "A shared view between every arrival and departure.",
    panoramaText:
      "Connect property information, resident requests, and turnover tasks in one workspace. Give your team the context to keep each stay moving.",
    toolsTitle: "Built around the rhythm of mid-term rentals.",
    cards: [
      {
        image: "workflows",
        label: "Connected operations",
        title: "Organize the work as it arrives.",
        description:
          "Keep requests attached to the right property and supporting information, with a clear owner for every next step.",
        preview: "Stay coordination",
        rows: [
          "Arrival details received",
          "Property context attached",
          "Team review requested",
        ],
      },
      {
        image: "properties",
        label: "Resident coordination",
        title: "Make the everyday handoffs simpler.",
        description:
          "Give recurring resident requests a consistent path from the first message through assignment and review.",
        preview: "Resident request",
        rows: [
          "New request",
          "Assigned to property team",
          "Ready for approval",
        ],
      },
      {
        image: "knowledge",
        label: "Portfolio context",
        title: "See the details behind each property.",
        description:
          "Bring procedures, property records, and team knowledge together so questions can be answered with the right context.",
        preview: "Property library",
        rows: [
          "Arrival instructions",
          "Property handbook",
          "Turnover checklist",
        ],
      },
    ],
    resourceTitle: "Make each stay easier to coordinate.",
    resourceText:
      "See how connected workflows and knowledge support your mid-term rental team.",
    storyTitle: "From the next arrival to the next opportunity.",
    stories: [
      "Prepare for every arrival.",
      "Keep residents in the loop.",
      "Find the right property context.",
      "Coordinate the next turnover.",
    ],
  },
} as const;
export type RentalAudience = keyof typeof rentalContent;
