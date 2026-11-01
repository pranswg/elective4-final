import { FormEvent, useMemo, useState } from "react"

type IconName = "home" | "tag" | "house" | "briefcase" | "tool" | "users" | "message" | "bolt" | "file" | "car" | "search" | "pin" | "heart" | "mail" | "user" | "plus" | "shield" | "chevron" | "arrow" | "close" | "check" | "menu" | "share"

type Listing = {
  id: number
  category: string
  price: string
  suffix?: string
  title: string
  location: string
  time: string
  image: string
  images?: string[]
  description: string
}

type Conversation = {
  id: number
  name: string
  initials: string
  listing: string
  price: string
  online?: boolean
  unread?: number
  messages: { from: "me" | "them"; text: string; time: string }[]
}

const iconPaths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9M9 20v-7h6v7" />
    </>
  ),
  tag: (
    <>
      <path d="M20 13 13 20l-9-9V4h7Z" />
      <circle cx="8.5" cy="8.5" r="1" />
    </>
  ),
  house: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V4h8v3M3 12h18M10 10v4h4v-4" />
    </>
  ),
  tool: (
    <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 8.4 7.2 6.1 4.9a4 4 0 0 0 5 5L4 17l3 3 7.1-7.1a4 4 0 0 0 .6-6.6Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2M15 13h1a5 5 0 0 1 5 5v2" />
    </>
  ),
  message: (
    <>
      <path d="M4 5h16v11H9l-5 4Z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </>
  ),
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7Z" />,
  file: (
    <>
      <path d="M6 2h9l4 4v16H6Z" />
      <path d="M14 2v5h5M9 12h6M9 16h6" />
    </>
  ),
  car: (
    <>
      <path d="m5 11 2-5h10l2 5 2 2v6h-3v-2H6v2H3v-6Z" />
      <path d="M5 11h14M7 14h.01M17 14h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  shield: (
    <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5Zm0 6v7m-3.5-3.5h7" />
  ),
  chevron: <path d="m8 10 4 4 4-4" />,
  arrow: <path d="M5 12h13m-4-4 4 4-4 4" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
    </>
  ),
}

function Icon({
  name,
  size = 22,
  filled = false,
}: {
  name: IconName
  size?: number
  filled?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

const nav = [
  ["Home", "home"],
  ["For Sale", "tag"],
  ["Housing", "house"],
  ["Jobs", "briefcase"],
  ["Services", "tool"],
  ["Community", "users"],
  ["Discussion Forums", "message"],
  ["Gigs", "bolt"],
  ["Resumes", "file"],
  ["Autos", "car"],
] as const

const categories = [
  {
    title: "For Sale",
    description: "Furniture, electronics,\nclothing, more",
    icon: "tag",
    tone: "purple",
  },
  {
    title: "Housing",
    description: "Apartments, houses,\nrooms, shared",
    icon: "house",
    tone: "green",
  },
  {
    title: "Jobs",
    description: "Full-time, part-time,\nwork from home",
    icon: "briefcase",
    tone: "blue",
  },
  {
    title: "Services",
    description: "Repair, cleaning,\nprofessional",
    icon: "tool",
    tone: "yellow",
  },
  {
    title: "Community",
    description: "Events, groups,\nlocal news",
    icon: "users",
    tone: "purple",
  },
  {
    title: "Discussion Forums",
    description: "Ask, share, discuss",
    icon: "message",
    tone: "teal",
  },
  {
    title: "Gigs",
    description: "Short term,\nquick work",
    icon: "bolt",
    tone: "pink",
  },
  {
    title: "Resumes",
    description: "Find a job,\nget noticed",
    icon: "file",
    tone: "indigo",
  },
  {
    title: "Autos",
    description: "Cars, trucks, RVs,\nparts & accessories",
    icon: "car",
    tone: "red",
  },
] as const

const helpTopics = [
  {
    title: "Posting",
    icon: "plus",
    description: "Create and manage ads",
    articles: [
      "Create, edit, renew, or delete a post",
      "Posting limits and allowed categories",
      "Supported HTML formatting",
    ],
  },
  {
    title: "Searching",
    icon: "search",
    description: "Find exactly what you need",
    articles: [
      "Search syntax and sorting results",
      "Location filters and saved alerts",
      "RSS feeds for new listings",
    ],
  },
  {
    title: "Account",
    icon: "user",
    description: "Access and update your account",
    articles: [
      "Create and manage an account",
      "Reset your password",
      "Active listings and contact details",
    ],
  },
  {
    title: "Billing",
    icon: "file",
    description: "Fees, payments, and invoices",
    articles: [
      "Paid posting categories",
      "Accepted payment methods",
      "Receipts and invoices",
    ],
  },
  {
    title: "Safety",
    icon: "shield",
    description: "Protect yourself and your community",
    articles: [
      "Recognize scams and phishing",
      "Safe local transactions",
      "Report suspicious activity",
    ],
  },
  {
    title: "Legal",
    icon: "briefcase",
    description: "Policies and official requests",
    articles: [
      "Terms of Use and Privacy Policy",
      "Prohibited items and copyright",
      "Law enforcement inquiries",
    ],
  },
  {
    title: "FAQs",
    icon: "message",
    description: "Answers to common questions",
    articles: [
      "How post flagging works",
      "Email relay and post duration",
      "Troubleshoot common error codes",
    ],
  },
] as const

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=85`
const seedListings: Listing[] = [
  {
    id: 1,
    category: "For Sale",
    price: "₱3,500",
    title: "Sofa (2-seater) – Good condition",
    location: "Makati",
    time: "2 hours ago",
    image: photo("photo-1724582586529-62622e50c0b3"),
    description:
      "Comfortable charcoal fabric sofa from a smoke-free home. Lightly used for two years; pickup near Salcedo Village.",
  },
  {
    id: 2,
    category: "For Sale",
    price: "₱6,500",
    title: "Trek Hybrid Bike – Recently serviced",
    location: "Quezon City",
    time: "5 hours ago",
    image: photo("photo-1559348349-86f1f65817fe"),
    description:
      "Medium aluminum frame, 21-speed drivetrain, new brake pads, and recently tuned gears. Ready for daily commuting.",
  },
  {
    id: 3,
    category: "For Sale",
    price: "₱25,000",
    title: "MacBook Air M1 (2020), 256GB",
    location: "Makati",
    time: "1 day ago",
    image: photo("photo-1536505847234-1b7adfc33cdd"),
    description:
      "Space Gray, 8GB RAM, 256GB SSD, 91% battery health. Includes original charger and box.",
  },
  {
    id: 4,
    category: "For Sale",
    price: "₱4,800",
    title: "Solid wood dining table for four",
    location: "San Juan",
    time: "2 days ago",
    image: photo("photo-1617806118233-18e1de247200"),
    description:
      "Compact acacia dining set with four chairs. Minor surface marks reflected in price.",
  },
  {
    id: 5,
    category: "Housing",
    price: "₱18,000",
    suffix: "/ month",
    title: "1BR Condo Unit – Fully Furnished",
    location: "Pasig",
    time: "1 day ago",
    image: photo("photo-1638454668466-e8dbd5462f20"),
    description:
      "Bright 34 sqm unit with balcony, fiber internet, pool, and gym access. One-year lease preferred.",
  },
  {
    id: 6,
    category: "Housing",
    price: "₱12,500",
    suffix: "/ month",
    title: "Studio near DLSU, utilities included",
    location: "Manila",
    time: "3 hours ago",
    image: photo("photo-1522708323590-d24dbb6b0267"),
    description:
      "Clean furnished studio, five-minute walk to campus. Water and association dues included.",
  },
  {
    id: 7,
    category: "Housing",
    price: "₱32,000",
    suffix: "/ month",
    title: "2BR family condo with parking",
    location: "Taguig",
    time: "Yesterday",
    image: photo("photo-1502672260266-1c1ef2d93688"),
    description:
      "Two-bedroom corner unit in McKinley Hill with one parking slot. Pet-friendly building.",
  },
  {
    id: 8,
    category: "Housing",
    price: "₱7,500",
    suffix: "/ month",
    title: "Private room in quiet shared house",
    location: "Parañaque",
    time: "2 days ago",
    image: photo("photo-1560448204-e02f11c3d0e2"),
    description:
      "Air-conditioned room with shared kitchen and laundry. Ideal for one working professional.",
  },
  {
    id: 9,
    category: "Jobs",
    price: "₱38K–₱48K",
    suffix: "/ month",
    title: "Customer Success Associate",
    location: "Taguig",
    time: "1 hour ago",
    image: photo("photo-1497366754035-f200968a6e72"),
    description:
      "BGC-based SaaS team seeking an excellent communicator. Hybrid schedule, HMO from day one.",
  },
  {
    id: 10,
    category: "Jobs",
    price: "₱55K–₱70K",
    suffix: "/ month",
    title: "Frontend React Developer",
    location: "Makati",
    time: "4 hours ago",
    image: photo("photo-1516321318423-f06f85e504b3"),
    description:
      "Build accessible customer products with React and TypeScript. Three years of experience preferred.",
  },
  {
    id: 11,
    category: "Jobs",
    price: "₱26K–₱30K",
    suffix: "/ month",
    title: "Junior Graphic Designer",
    location: "Quezon City",
    time: "Today",
    image: photo("photo-1561070791-2526d30994b5"),
    description:
      "Create digital campaigns for local lifestyle brands. Send a portfolio with your application.",
  },
  {
    id: 12,
    category: "Jobs",
    price: "₱750",
    suffix: "/ day",
    title: "Weekend café barista",
    location: "San Juan",
    time: "Yesterday",
    image: photo("photo-1495474472287-4d71bcdd2085"),
    description:
      "Saturday and Sunday shift at an independent neighborhood café. Training and staff meals provided.",
  },
  {
    id: 13,
    category: "Services",
    price: "From ₱800",
    title: "Aircon cleaning and maintenance",
    location: "Pasig",
    time: "40 minutes ago",
    image: photo("photo-1621905252507-b35492cc74b4"),
    description:
      "Experienced technicians for split-type and window units. Same-day appointments available.",
  },
  {
    id: 14,
    category: "Services",
    price: "From ₱1,200",
    title: "Condo deep cleaning service",
    location: "Makati",
    time: "3 hours ago",
    image: photo("photo-1581578731548-c64695cc6952"),
    description:
      "Two-person cleaning team with supplies included. Move-in and move-out packages available.",
  },
  {
    id: 15,
    category: "Services",
    price: "₱900",
    suffix: "/ session",
    title: "Math and science tutor, Grades 7–12",
    location: "Quezon City",
    time: "Today",
    image: photo("photo-1509062522246-3755977927d7"),
    description:
      "Licensed teacher offering in-person or online lessons for algebra, physics, and chemistry.",
  },
  {
    id: 16,
    category: "Services",
    price: "Free quote",
    title: "Small business bookkeeping",
    location: "Manila",
    time: "Yesterday",
    image: photo("photo-1554224155-8d04cb21cd6c"),
    description:
      "Monthly bookkeeping, BIR filing support, payroll, and simple management reports for SMEs.",
  },
  {
    id: 17,
    category: "Community",
    price: "Free",
    title: "Saturday morning run club at BGC",
    location: "Taguig",
    time: "2 hours ago",
    image: photo("photo-1552674605-db6ffd4facb5"),
    description:
      "Friendly 5K social run for all paces. Meet at Track 30th at 6:00 AM; coffee after.",
  },
  {
    id: 18,
    category: "Community",
    price: "Free",
    title: "Weekend book swap and coffee",
    location: "Makati",
    time: "Today",
    image: photo("photo-1526243741027-444d633d7365"),
    description:
      "Bring up to five books and meet fellow readers at Legazpi Active Park this Sunday.",
  },
  {
    id: 19,
    category: "Community",
    price: "₱250",
    title: "Beginner pottery meetup",
    location: "Quezon City",
    time: "Yesterday",
    image: photo("photo-1610701596007-11502861dcfa"),
    description:
      "A relaxed introduction to hand-building clay. Materials and firing included; twelve slots only.",
  },
  {
    id: 20,
    category: "Community",
    price: "Volunteers",
    title: "Pasig River cleanup drive",
    location: "Pasig",
    time: "2 days ago",
    image: photo("photo-1596367437430-ba4c9a7456ac"),
    description:
      "Join a local cleanup team on Sunday morning. Gloves, sacks, water, and orientation provided.",
  },
  {
    id: 21,
    category: "Discussion Forums",
    price: "18 replies",
    title: "Best rainy-day commute from QC to BGC?",
    location: "Quezon City",
    time: "25 minutes ago",
    image: photo("photo-1606964333733-36586a696928"),
    description:
      "Share your most reliable MRT, bus, and carpool routes when the weather slows traffic.",
  },
  {
    id: 22,
    category: "Discussion Forums",
    price: "31 replies",
    title: "Favorite affordable eats in Binondo",
    location: "Manila",
    time: "2 hours ago",
    image: photo("photo-1504674900247-0877df9cc836"),
    description:
      "A community thread for family-run restaurants, bakeries, and street food under ₱300.",
  },
  {
    id: 23,
    category: "Discussion Forums",
    price: "12 replies",
    title: "Condo internet provider recommendations",
    location: "Pasig",
    time: "Today",
    image: photo("photo-1451187580459-43490279c0fa"),
    description:
      "Residents compare fiber reliability, installation times, and customer support by neighborhood.",
  },
  {
    id: 24,
    category: "Discussion Forums",
    price: "24 replies",
    title: "Where do you buy native plants?",
    location: "Makati",
    time: "Yesterday",
    image: photo("photo-1416879595882-3373a0480b5b"),
    description:
      "Looking for Metro Manila nurseries with healthy, balcony-friendly Philippine native species.",
  },
  {
    id: 25,
    category: "Gigs",
    price: "₱3,500",
    suffix: "/ event",
    title: "Event photographer needed Saturday",
    location: "Taguig",
    time: "1 hour ago",
    image: photo("photo-1452780212940-6f5c0d14d848"),
    description:
      "Cover a three-hour family celebration in BGC. Edited digital album required within one week.",
  },
  {
    id: 26,
    category: "Gigs",
    price: "₱1,000",
    suffix: "/ shift",
    title: "Two brand ambassadors for mall booth",
    location: "Mandaluyong",
    time: "3 hours ago",
    image: photo("photo-1531058020387-3be344556be6"),
    description:
      "Friendly, energetic staff needed for a six-hour product demo. Lunch and uniform provided.",
  },
  {
    id: 27,
    category: "Gigs",
    price: "₱2,500",
    title: "Assemble flat-pack office furniture",
    location: "Makati",
    time: "Today",
    image: photo("photo-1503602642458-232111445657"),
    description:
      "Assemble six desks and eight chairs in a small office. Bring your own basic tools.",
  },
  {
    id: 28,
    category: "Gigs",
    price: "₱4,000",
    title: "Edit four short social videos",
    location: "Remote / Manila",
    time: "Yesterday",
    image: photo("photo-1536240478700-b869070f9279"),
    description:
      "Turn supplied footage into four captioned vertical videos. Portfolio and two-day turnaround required.",
  },
  {
    id: 29,
    category: "Resumes",
    price: "Available now",
    title: "Administrative assistant – 4 years exp.",
    location: "Manila",
    time: "2 hours ago",
    image: photo("photo-1551836022-d5d88e9218df"),
    description:
      "Detail-oriented administrator skilled in scheduling, purchasing, reports, and Microsoft 365.",
  },
  {
    id: 30,
    category: "Resumes",
    price: "Open to work",
    title: "Licensed civil engineer",
    location: "Quezon City",
    time: "Today",
    image: photo("photo-1503387762-592deb58ef4e"),
    description:
      "Five years in residential construction, estimates, site supervision, and contractor coordination.",
  },
  {
    id: 31,
    category: "Resumes",
    price: "Freelance",
    title: "Social media manager and copywriter",
    location: "Makati",
    time: "Yesterday",
    image: photo("photo-1432888622747-4eb9a8efeb07"),
    description:
      "Lifestyle and food specialist offering content calendars, community management, and reporting.",
  },
  {
    id: 32,
    category: "Resumes",
    price: "Available May",
    title: "Fresh graduate – BS Accountancy",
    location: "Pasig",
    time: "2 days ago",
    image: photo("photo-1454165804606-c3d57bc86b40"),
    description:
      "Dean's lister with internship experience in audit support, reconciliations, and bookkeeping.",
  },
  {
    id: 33,
    category: "Autos",
    price: "₱685,000",
    title: "2020 Toyota Vios 1.3 XLE CVT",
    location: "Quezon City",
    time: "3 hours ago",
    image: photo("photo-1549317661-bd32c8ce0db2"),
    description:
      "First owner, 38,000 km, casa-maintained with complete records. Registration valid through 2026.",
  },
  {
    id: 34,
    category: "Autos",
    price: "₱1,080,000",
    title: "2021 Honda CR-V 2.0 S",
    location: "Makati",
    time: "Today",
    image: photo("photo-1541899481282-d53bffe3c35d"),
    description:
      "Seven-seater family SUV with 29,000 km, clean interior, comprehensive insurance, and two keys.",
  },
  {
    id: 35,
    category: "Autos",
    price: "₱78,000",
    title: "Yamaha NMAX 155 ABS",
    location: "Pasig",
    time: "Yesterday",
    image: photo("photo-1628498304504-dc609382dd12"),
    description:
      "2022 model, 14,500 km, stock engine, new tires, complete papers, and updated registration.",
  },
  {
    id: 36,
    category: "Autos",
    price: "₱14,500",
    title: "Set of 17-inch alloy wheels",
    location: "Taguig",
    time: "2 days ago",
    image: photo("photo-1590362891991-f776e747a588"),
    description:
      "Set of four 5x114.3 alloy wheels in good condition. Tires not included; pickup only.",
  },
]

const cities = [
  "Manila",
  "Quezon City",
  "Makati",
  "Pasig",
  "Taguig",
  "Parañaque",
  "San Juan",
]

const sampleConversations: Conversation[] = [
  {
    id: 1,
    name: "Mara Dela Cruz",
    initials: "MD",
    listing: "Solid wood dining table for four",
    price: "₱4,800",
    online: true,
    unread: 2,
    messages: [
      {
        from: "them",
        text: "Hi! Is the dining table still available?",
        time: "10:16 AM",
      },
      {
        from: "me",
        text: "Yes, it is. It is in San Juan and ready for pickup.",
        time: "10:19 AM",
      },
      {
        from: "them",
        text: "Great. Are there any deep scratches on the tabletop?",
        time: "10:22 AM",
      },
      {
        from: "them",
        text: "Could I see it tomorrow afternoon?",
        time: "10:24 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Carlo Reyes",
    initials: "CR",
    listing: "MacBook Air M1 (2020), 256GB",
    price: "₱25,000",
    messages: [
      {
        from: "them",
        text: "Hello, would you take ₱23,000 if I pick it up this weekend?",
        time: "Yesterday, 4:08 PM",
      },
      {
        from: "me",
        text: "I can do ₱24,000. You can inspect and test everything before paying.",
        time: "Yesterday, 4:21 PM",
      },
      {
        from: "them",
        text: "That works for me. I can meet in BGC on Saturday.",
        time: "Yesterday, 5:02 PM",
      },
    ],
  },
  {
    id: 3,
    name: "Ana Santos",
    initials: "AS",
    listing: "1BR Condo Unit – Fully Furnished",
    price: "₱18,000 / month",
    messages: [
      {
        from: "them",
        text: "Is the Pasig unit available for a July move-in?",
        time: "Monday, 9:35 AM",
      },
      {
        from: "me",
        text: "Yes. The current tenant leaves in late June. A viewing is possible next week.",
        time: "Monday, 10:12 AM",
      },
      {
        from: "them",
        text: "Perfect. I am free Tuesday after 6 PM.",
        time: "Monday, 10:30 AM",
      },
      {
        from: "me",
        text: "Tuesday at 6:30 PM works. I will send the lobby details that morning.",
        time: "Monday, 10:41 AM",
      },
      {
        from: "them",
        text: "Thanks for the quick response.",
        time: "Monday, 10:43 AM",
      },
    ],
  },
  {
    id: 4,
    name: "Paolo Lim",
    initials: "PL",
    listing: "Trek Hybrid Bike – Recently serviced",
    price: "₱6,500",
    unread: 1,
    messages: [
      {
        from: "them",
        text: "What frame size is the Trek? I am 5'8 and looking for a commuter.",
        time: "Sunday, 2:14 PM",
      },
      {
        from: "me",
        text: "It is a medium frame and should fit your height well.",
        time: "Sunday, 2:29 PM",
      },
      {
        from: "them",
        text: "Nice. Can I test ride it near UP Diliman on Wednesday?",
        time: "Sunday, 3:05 PM",
      },
    ],
  },
]

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Craigslist home">
      <span className="peace">
        <span />
      </span>
      <span>craigslist</span>
    </button>
  )
}

function HelpPage({
  onBack,
  onAction,
}: {
  onBack: () => void
  onAction: (message: string) => void
}) {
  const [helpQuery, setHelpQuery] = useState("")
  const normalizedQuery = helpQuery.trim().toLowerCase()
  const filteredTopics = helpTopics.filter(
    (topic) =>
      !normalizedQuery ||
      `${topic.title} ${topic.description} ${topic.articles.join(" ")}`
        .toLowerCase()
        .includes(normalizedQuery),
  )

  return (
    <div className="help-page">
      <button className="back-button" onClick={onBack}>
        <Icon name="arrow" size={16} />
        Back to home
      </button>
      <section className="help-hero">
        <span>Craigslist support</span>
        <h1>How can we help?</h1>
        <p>
          Find guidance for posting, searching, account management, safety, and
          more.
        </p>
        <label className="help-search">
          <Icon name="search" size={20} />
          <input
            value={helpQuery}
            onChange={(event) => setHelpQuery(event.target.value)}
            placeholder="Search help topics"
            aria-label="Search help topics"
          />
          {helpQuery && (
            <button
              onClick={() => setHelpQuery("")}
              aria-label="Clear help search"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </label>
      </section>

      <section className="help-topics">
        <div className="help-section-heading">
          <div>
            <h2>Help topics</h2>
            <p>Browse documentation by subject.</p>
          </div>
          <span>{filteredTopics.length} topics</span>
        </div>
        {filteredTopics.length ? (
          <div className="help-grid">
            {filteredTopics.map((topic) => (
              <article className="help-card" key={topic.title}>
                <div className="help-card-heading">
                  <span>
                    <Icon name={topic.icon} size={22} />
                  </span>
                  <div>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </div>
                </div>
                <ul>
                  {topic.articles.map((article) => (
                    <li key={article}>
                      <button
                        onClick={() => onAction(`${article} opened`)}
                      >
                        {article}
                        <Icon name="arrow" size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="help-empty">
            <Icon name="search" size={28} />
            <h3>No help topics found</h3>
            <p>Try a shorter or more general search.</p>
          </div>
        )}
      </section>

      <section className="help-resources">
        <button onClick={() => onAction("Community help forums opened")}>
          <span>
            <Icon name="users" size={22} />
          </span>
          <div>
            <strong>Community help forums</strong>
            <small>Ask questions and learn from other users.</small>
          </div>
          <Icon name="arrow" size={17} />
        </button>
        <button onClick={() => onAction("All systems are operational")}>
          <span>
            <Icon name="check" size={22} />
          </span>
          <div>
            <strong>System status</strong>
            <small>All Craigslist services are operational.</small>
          </div>
          <i>Operational</i>
        </button>
        <button onClick={() => onAction("Support contact form opened")}>
          <span>
            <Icon name="mail" size={22} />
          </span>
          <div>
            <strong>Contact support</strong>
            <small>Send a request to the Craigslist support team.</small>
          </div>
          <Icon name="arrow" size={17} />
        </button>
      </section>
    </div>
  )
}

function App() {
  const [active, setActive] = useState("Home")
  const [favorites, setFavorites] = useState<number[]>([])
  const [query, setQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Manila")
  const [cityFilter, setCityFilter] = useState<string | null>(null)
  const [showAllCities, setShowAllCities] = useState(false)
  const [menu, setMenu] = useState<"location" | "profile" | null>(null)
  const [dialog, setDialog] =
    useState<"post" | "messages" | "safety" | "details" | null>(null)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [detailImage, setDetailImage] = useState("")
  const [postImages, setPostImages] = useState<string[]>([])
  const [uploadError, setUploadError] = useState("")
  const [toast, setToast] = useState("")
  const [listings, setListings] = useState(seedListings)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [conversations, setConversations] = useState(sampleConversations)
  const [selectedConversation, setSelectedConversation] =
    useState<number | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  const searchSuggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (normalized.length < 2) return []
    return listings
      .filter((listing) =>
        `${listing.title} ${listing.category} ${listing.location} ${listing.price}`
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 5)
  }, [listings, query])

  const visibleListings = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return listings.filter((listing) => {
      const categoryMatch =
        active === "Home" ||
        active === "All" ||
        active === "Favorites" ||
        listing.category === active
      const favoriteMatch =
        active !== "Favorites" || favorites.includes(listing.id)
      const cityMatch = !cityFilter || listing.location.includes(cityFilter)
      const searchMatch =
        !normalized ||
        `${listing.title} ${listing.category} ${listing.location} ${listing.price} ${listing.description}`
          .toLowerCase()
          .includes(normalized)
      return categoryMatch && favoriteMatch && cityMatch && searchMatch
    })
  }, [active, cityFilter, favorites, listings, query])

  const displayedListings =
    active === "Home" && !query && !cityFilter
      ? [1, 2, 5, 3]
          .map((id) => visibleListings.find((listing) => listing.id === id))
          .filter((listing): listing is Listing => Boolean(listing))
      : visibleListings
  const activeCategory = categories.find((category) => category.title === active)
  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }
  const goHome = () => {
    setActive("Home")
    setQuery("")
    setCityFilter(null)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openHelp = () => {
    setActive("Help")
    setQuery("")
    setMenu(null)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const selectCategory = (name: string) => {
    setActive(name)
    setQuery("")
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const toggleFavorite = (id: number) =>
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  const chooseLocation = (city: string) => {
    setSelectedCity(city)
    setCityFilter(city)
    setMenu(null)
    showToast(`Showing listings near ${city}`)
  }
  const openListing = (listing: Listing) => {
    setSelectedListing(listing)
    setDetailImage(listing.image)
    setDialog("details")
  }
  const shareListing = async () => {
    if (!selectedListing) return
    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedListing.title,
          text: `${selectedListing.title} — ${selectedListing.price}`,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        showToast("Listing link copied")
      }
    } catch {
      // Closing the native share sheet requires no follow-up.
    }
  }

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.from(event.target.files || [])
    event.target.value = ""
    if (!chosenFiles.length) return

    const validFiles = chosenFiles.filter(
      (file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024,
    )
    if (validFiles.length !== chosenFiles.length) {
      setUploadError("Use image files smaller than 10 MB.")
    } else {
      setUploadError("")
    }

    const availableSlots = 6 - postImages.length
    if (availableSlots <= 0) {
      setUploadError("You can upload up to 6 photos.")
      return
    }
    if (validFiles.length > availableSlots) {
      setUploadError(
        `Only ${availableSlots} more photo${
          availableSlots === 1 ? "" : "s"
        } can be added.`,
      )
    }

    try {
      const imageUrls = await Promise.all(
        validFiles.slice(0, availableSlots).map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => resolve(String(reader.result))
              reader.onerror = () => reject(reader.error)
              reader.readAsDataURL(file)
            }),
        ),
      )
      setPostImages((current) => [...current, ...imageUrls])
    } catch {
      setUploadError("One or more photos could not be read. Please try again.")
    }
  }

  const submitAd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!postImages.length) {
      setUploadError("Add at least one photo to publish your listing.")
      return
    }
    const data = new FormData(event.currentTarget)
    const category = String(data.get("category"))
    const title = String(data.get("title"))
    const location = String(data.get("location"))
    const newListing: Listing = {
      id: Date.now(),
      category,
      title,
      location,
      price: String(data.get("price")),
      time: "Just now",
      description: String(data.get("description")),
      image: postImages[0],
      images: postImages,
    }
    setListings((current) => [newListing, ...current])
    setActive(category)
    setCityFilter(null)
    setPostImages([])
    setUploadError("")
    setDialog(null)
    showToast("Your listing is now live")
  }

  const openMessages = () => {
    setSelectedConversation(null)
    setDialog("messages")
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = query.trim()
    if (!normalized) return
    setQuery(normalized)
    setActive("Home")
    setSearchOpen(false)
    document
      .querySelector(".listing-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedConversation === null) return
    const form = event.currentTarget
    const data = new FormData(form)
    const text = String(data.get("message")).trim()
    if (!text) return
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                { from: "me", text, time: "Just now" },
              ],
            }
          : conversation,
      ),
    )
    form.reset()
  }

  const currentConversation = conversations.find(
    (conversation) => conversation.id === selectedConversation,
  )

  return (
    <div
      className={`app-shell ${active === "Help" ? "help-shell" : ""}`}
      onClick={() => menu && setMenu(null)}
    >
      <header className="topbar">
        <div className="brand-group">
          <button
            className="hamburger-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
          >
            <Icon name="menu" size={23} />
          </button>
          <Logo
            onClick={() => {
              goHome()
              setSidebarOpen(false)
            }}
          />
        </div>
        <form
          className="header-search"
          role="search"
          onSubmit={submitSearch}
          onFocus={() => setSearchOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setSearchOpen(false)
            }
          }}
        >
          <button
            className="search-submit"
            type="submit"
            aria-label="Search listings"
          >
            <Icon name="search" size={20} />
          </button>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSearchOpen(true)
              if (event.target.value) setActive("Home")
            }}
            placeholder="What are you looking for?"
            aria-label="Search listings"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setActive("Home")
                setSearchOpen(false)
              }}
              aria-label="Clear search"
            >
              <Icon name="close" size={16} />
            </button>
          )}
          {searchOpen && query.trim().length >= 2 && (
            <div className="search-suggestions">
              {searchSuggestions.length ? (
                <>
                  <small>Suggested listings</small>
                  {searchSuggestions.map((listing) => (
                    <button
                      type="button"
                      className="search-suggestion"
                      key={listing.id}
                      onClick={() => {
                        setQuery(listing.title)
                        setSearchOpen(false)
                        openListing(listing)
                      }}
                    >
                      <img src={listing.image} alt="" />
                      <span>
                        <strong>{listing.title}</strong>
                        <small>
                          {listing.category} · {listing.location}
                        </small>
                      </span>
                      <b>{listing.price}</b>
                    </button>
                  ))}
                  <button className="search-all" type="submit">
                    View all results for “{query.trim()}”
                    <Icon name="arrow" size={15} />
                  </button>
                </>
              ) : (
                <div className="search-empty">
                  <Icon name="search" size={22} />
                  <span>
                    <strong>No matching listings</strong>
                    <small>Try a broader keyword or another location.</small>
                  </span>
                </div>
              )}
            </div>
          )}
        </form>
        <div className="menu-wrap">
          <button
            className="location-button"
            onClick={(event) => {
              event.stopPropagation()
              setMenu(menu === "location" ? null : "location")
            }}
            aria-expanded={menu === "location"}
          >
            <Icon name="pin" size={20} filled />
            <span>{selectedCity}, Philippines</span>
            <Icon name="chevron" size={18} />
          </button>
          {menu === "location" && (
            <div
              className="dropdown location-menu"
              onClick={(event) => event.stopPropagation()}
            >
              <strong>Choose your area</strong>
              {[...cities, "Mandaluyong", "Marikina"].map((city) => (
                <button key={city} onClick={() => chooseLocation(city)}>
                  <span>{city}</span>
                  {selectedCity === city && <Icon name="check" size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="header-actions">
          <button
            onClick={() => {
              setActive("Favorites")
              setQuery("")
            }}
          >
            <Icon name="heart" size={22} filled={favorites.length > 0} />
            <span>
              Favorites{favorites.length ? ` (${favorites.length})` : ""}
            </span>
          </button>
          <button onClick={openMessages}>
            <Icon name="mail" size={22} />
            <span>Messages</span>
          </button>
          <div className="menu-wrap profile-wrap">
            <button
              className="profile"
              aria-label="Profile menu"
              onClick={(event) => {
                event.stopPropagation()
                setMenu(menu === "profile" ? null : "profile")
              }}
            >
              <Icon name="user" size={20} />
              <Icon name="chevron" size={16} />
            </button>
            {menu === "profile" && (
              <div
                className="dropdown profile-menu"
                onClick={(event) => event.stopPropagation()}
              >
                <div>
                  <strong>Juan dela Cruz</strong>
                  <small>juan@example.com</small>
                </div>
                <button onClick={() => showToast("Profile settings opened")}>
                  Account settings
                </button>
                <button onClick={() => setDialog("post")}>My listings</button>
                <button onClick={openHelp}>Help center</button>
                <button onClick={() => showToast("You have been signed out")}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <button
          className="drawer-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation menu"
        />
      )}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="drawer-heading">
          <Logo onClick={goHome} />
          <button
            className="drawer-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav>
          {nav.map(([label, icon]) => (
            <button
              key={label}
              className={active === label ? "active" : ""}
              onClick={() =>
                label === "Home" ? goHome() : selectCategory(label)
              }
            >
              <Icon name={icon} size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="drawer-tools">
          <button
            onClick={() => {
              setActive("Favorites")
              setQuery("")
              setSidebarOpen(false)
            }}
          >
            <Icon name="heart" size={20} filled={favorites.length > 0} />
            <span>Favorites</span>
            {!!favorites.length && <b>{favorites.length}</b>}
          </button>
          <button
            onClick={() => {
              setSidebarOpen(false)
              openMessages()
            }}
          >
            <Icon name="mail" size={20} />
            <span>Messages</span>
            <b>
              {conversations.reduce(
                (total, conversation) => total + (conversation.unread || 0),
                0,
              )}
            </b>
          </button>
          <button onClick={openHelp}>
            <Icon name="message" size={20} />
            <span>Help center</span>
          </button>
        </div>
        <div className="cities">
          <p>Popular cities</p>
          {[
            ...cities,
            ...(showAllCities ? ["Mandaluyong", "Marikina", "Las Piñas"] : []),
          ].map((city) => (
            <button
              className={cityFilter === city ? "selected" : ""}
              key={city}
              onClick={() => {
                chooseLocation(city)
                setSidebarOpen(false)
              }}
            >
              {city}
            </button>
          ))}
          <button
            className="more"
            onClick={() => setShowAllCities((value) => !value)}
          >
            {showAllCities ? "Fewer cities" : "More cities"}{" "}
            <Icon name="arrow" size={15} />
          </button>
        </div>
      </aside>

      <main className={activeCategory ? "category-page" : ""}>
        {active === "Help" ? (
          <HelpPage onBack={goHome} onAction={showToast} />
        ) : (
          <>
          {activeCategory ? (
          <section className="category-page-header">
            <button className="back-button" onClick={goHome}>
              <Icon name="arrow" size={16} />
              Back to home
            </button>
            <div>
              <span className={`category-icon ${activeCategory.tone}`}>
                <Icon name={activeCategory.icon} size={28} filled />
              </span>
              <div>
                <p>Browse category</p>
                <h1>{activeCategory.title}</h1>
                <span>
                  {visibleListings.length} listing
                  {visibleListings.length === 1 ? "" : "s"} available
                </span>
              </div>
            </div>
          </section>
        ) : (
          <section className="hero">
            <img
              src="https://images.unsplash.com/photo-1591257773743-ea28737e33d9?auto=format&fit=crop&w=1800&q=90"
              alt="Manila skyline across the bay"
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <h1>Find it. Sell it. Live locally.</h1>
              <p>
                Buy, sell, find a home, get a job, and connect
                <br className="desktop-only" /> with your community in Manila.
              </p>
              <button onClick={() => setDialog("post")}>
                <Icon name="plus" size={23} />
                Post an ad
              </button>
            </div>
          </section>
        )}

        <section className="listing-section">
          <div className="section-heading">
            <div>
              <h2>
                {activeCategory
                  ? "Available listings"
                  : query
                    ? `Results for “${query}”`
                    : active === "Home"
                      ? "Recent listings"
                      : active === "All"
                        ? "All listings"
                        : active}
              </h2>
              {(cityFilter || active !== "Home") && (
                <small>
                  {visibleListings.length} listing
                  {visibleListings.length === 1 ? "" : "s"}
                  {cityFilter ? ` near ${cityFilter}` : ""}
                </small>
              )}
            </div>
            {active === "Home" && !query && !cityFilter && (
              <button
                onClick={() => {
                  setActive("All")
                  document
                    .querySelector(".listing-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View all <Icon name="arrow" size={16} />
              </button>
            )}
          </div>
          {displayedListings.length ? (
            <div className="listing-grid">
              {displayedListings.map((listing) => (
                <article
                  className="listing-card"
                  key={listing.id}
                  onClick={() => openListing(listing)}
                  tabIndex={0}
                  onKeyDown={(event) =>
                    event.key === "Enter" && openListing(listing)
                  }
                >
                  <div className="listing-image">
                    <img src={listing.image} alt={listing.title} />
                    <span className="listing-category">{listing.category}</span>
                    <button
                      className={
                        favorites.includes(listing.id) ? "favorited" : ""
                      }
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleFavorite(listing.id)
                      }}
                      aria-label={`${
                        favorites.includes(listing.id) ? "Remove" : "Add"
                      } ${listing.title} ${
                        favorites.includes(listing.id) ? "from" : "to"
                      } favorites`}
                    >
                      <Icon
                        name="heart"
                        size={17}
                        filled={favorites.includes(listing.id)}
                      />
                    </button>
                  </div>
                  <div className="listing-copy">
                    <div className="price">
                      {listing.price} <span>{listing.suffix}</span>
                    </div>
                    <h3>{listing.title}</h3>
                    <p>
                      <Icon name="pin" size={12} filled />
                      {listing.location}, Metro Manila
                    </p>
                    <time>{listing.time}</time>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>
                <Icon
                  name={active === "Favorites" ? "heart" : "search"}
                  size={30}
                />
              </span>
              <h3>No listings found</h3>
              <p>Try another category, location, or search term.</p>
              <button onClick={goHome}>Browse all listings</button>
            </div>
          )}
        </section>

        {!activeCategory && (
          <section className="category-section">
            <h2>Browse by category</h2>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  className={`category-card ${
                    active === category.title ? "selected-card" : ""
                  }`}
                  key={category.title}
                  onClick={() => selectCategory(category.title)}
                >
                  <span className={`category-icon ${category.tone}`}>
                    <Icon name={category.icon} size={28} filled />
                  </span>
                  <span className="category-copy">
                    <strong>{category.title}</strong>
                    <small>{category.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
          </>
        )}
      </main>

      <aside className="rightbar">
        <div className="map-card">
          <button
            className="map-heading"
            onClick={() => {
              setMenu(null)
              setCityFilter(cityFilter ? null : selectedCity)
              showToast(
                cityFilter
                  ? "Location filter cleared"
                  : `Map filtered to ${selectedCity}`,
              )
            }}
          >
            <Icon name="pin" size={20} filled />
            <strong>{selectedCity}, Philippines</strong>
            <Icon name="chevron" size={16} />
          </button>
          <button
            className="map"
            aria-label={`Show listings in ${selectedCity}`}
            onClick={() => {
              setCityFilter(selectedCity)
              document
                .querySelector(".listing-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <i className="road road-one" />
            <i className="road road-two" />
            <i className="road road-three" />
            <span className="quezon">Quezon City</span>
            <strong>Manila</strong>
            <span className="makati">Makati</span>
          </button>
        </div>
        <div className="safety-card">
          <div>
            <span className="shield">
              <Icon name="shield" size={24} filled />
            </span>
            <h3>Stay safe</h3>
          </div>
          <p>
            Meet in public places, avoid sharing personal information, and trust
            your instincts.
          </p>
          <button onClick={() => setDialog("safety")}>
            Learn more <Icon name="arrow" size={16} />
          </button>
        </div>
      </aside>

      {dialog && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setDialog(null)}
        >
          <section
            className={`modal ${dialog === "details" ? "details-modal" : ""} ${
              dialog === "messages" ? "messages-modal" : ""
            } ${dialog === "post" ? "post-modal" : ""} ${
              currentConversation ? "conversation-modal" : ""
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setDialog(null)}
              aria-label="Close dialog"
            >
              <Icon name="close" size={20} />
            </button>
            {dialog === "post" && (
              <>
                <div className="modal-heading">
                  <span>
                    <Icon name="plus" />
                  </span>
                  <div>
                    <h2 id="modal-title">Post an ad</h2>
                    <p>Reach people across Metro Manila.</p>
                  </div>
                </div>
                <form className="post-form" onSubmit={submitAd}>
                  <div className="upload-field">
                    <div className="upload-label">
                      <strong>Photos</strong>
                      <span>{postImages.length}/6</span>
                    </div>
                    {postImages.length > 0 && (
                      <div className="upload-previews">
                        {postImages.map((image, index) => (
                          <div
                            className="upload-preview"
                            key={`${image.slice(-20)}-${index}`}
                          >
                            <img
                              src={image}
                              alt={`Listing preview ${index + 1}`}
                            />
                            {index === 0 && <span>Cover</span>}
                            <button
                              type="button"
                              onClick={() => {
                                setPostImages((current) =>
                                  current.filter(
                                    (_, imageIndex) => imageIndex !== index,
                                  ),
                                )
                                setUploadError("")
                              }}
                              aria-label={`Remove photo ${index + 1}`}
                            >
                              <Icon name="close" size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {postImages.length < 6 && (
                      <label className="gallery-upload">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={uploadImages}
                        />
                        <span>
                          <Icon name="plus" size={21} />
                        </span>
                        <strong>
                          {postImages.length
                            ? "Add more photos"
                            : "Upload listing photos"}
                        </strong>
                        <small>JPG, PNG or WebP · up to 10 MB each</small>
                      </label>
                    )}
                    {uploadError && (
                      <p className="upload-error">{uploadError}</p>
                    )}
                  </div>
                  <label>
                    Title
                    <input
                      name="title"
                      required
                      placeholder="What are you offering?"
                    />
                  </label>
                  <div>
                    <label>
                      Category
                      <select name="category" required>
                        {categories.map((item) => (
                          <option key={item.title}>{item.title}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Price or rate
                      <input
                        name="price"
                        required
                        placeholder="e.g. ₱5,000 or Free"
                      />
                    </label>
                  </div>
                  <label>
                    Location
                    <select name="location" defaultValue={selectedCity}>
                      {[...cities, "Mandaluyong", "Marikina"].map((city) => (
                        <option key={city}>{city}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Description
                    <textarea
                      name="description"
                      required
                      rows={4}
                      placeholder="Add condition, details, schedule, or requirements"
                    />
                  </label>
                  <button className="primary-button" type="submit">
                    Publish listing
                  </button>
                </form>
              </>
            )}
            {dialog === "messages" && (
              <>
                {currentConversation ? (
                  <div className="conversation">
                    <div className="conversation-heading">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        aria-label="Back to conversations"
                      >
                        <Icon name="arrow" size={19} />
                      </button>
                      <span className="conversation-avatar">
                        {currentConversation.initials}
                        {currentConversation.online && <i />}
                      </span>
                      <div>
                        <h2 id="modal-title">{currentConversation.name}</h2>
                        <p>
                          {currentConversation.online
                            ? "Online now"
                            : "Usually replies within a few hours"}
                        </p>
                      </div>
                    </div>
                    <div className="conversation-listing">
                      <span>Regarding</span>
                      <strong>{currentConversation.listing}</strong>
                      <b>{currentConversation.price}</b>
                    </div>
                    <div className="message-thread">
                      <time>Conversation</time>
                      {currentConversation.messages.map((message, index) => (
                        <div
                          className={`message-bubble ${message.from}`}
                          key={`${message.time}-${index}`}
                        >
                          <p>{message.text}</p>
                          <span>{message.time}</span>
                        </div>
                      ))}
                    </div>
                    <form className="message-composer" onSubmit={sendMessage}>
                      <input
                        name="message"
                        aria-label="Write a message"
                        placeholder="Write a message…"
                        autoComplete="off"
                      />
                      <button type="submit">
                        Send <Icon name="arrow" size={16} />
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    <div className="modal-heading">
                      <span>
                        <Icon name="mail" />
                      </span>
                      <div>
                        <h2 id="modal-title">Messages</h2>
                        <p>Your recent conversations</p>
                      </div>
                    </div>
                    <div className="message-list">
                      {conversations.map((conversation) => {
                        const lastMessage =
                          conversation.messages[
                            conversation.messages.length - 1
                          ]
                        return (
                          <button
                            key={conversation.id}
                            onClick={() => {
                              setSelectedConversation(conversation.id)
                              setConversations((current) =>
                                current.map((item) =>
                                  item.id === conversation.id
                                    ? { ...item, unread: 0 }
                                    : item,
                                ),
                              )
                            }}
                          >
                            <span>
                              {conversation.initials}
                              {conversation.online && <i />}
                            </span>
                            <div>
                              <strong>{conversation.name}</strong>
                              <small>{conversation.listing}</small>
                              <p>{lastMessage.text}</p>
                            </div>
                            <div className="message-meta">
                              <time>{lastMessage.time.split(",")[0]}</time>
                              {!!conversation.unread && (
                                <b>{conversation.unread}</b>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </>
            )}
            {dialog === "safety" && (
              <>
                <div className="modal-heading">
                  <span>
                    <Icon name="shield" />
                  </span>
                  <div>
                    <h2 id="modal-title">Trade safely</h2>
                    <p>A few steps make local exchanges safer.</p>
                  </div>
                </div>
                <ul className="safety-list">
                  <li>
                    <Icon name="check" size={18} />
                    <span>
                      <strong>Meet in a busy public place</strong>Choose a mall,
                      café, or designated exchange area during daylight hours.
                    </span>
                  </li>
                  <li>
                    <Icon name="check" size={18} />
                    <span>
                      <strong>Inspect before you pay</strong>Test electronics
                      and verify documents before completing the exchange.
                    </span>
                  </li>
                  <li>
                    <Icon name="check" size={18} />
                    <span>
                      <strong>Keep personal details private</strong>Use
                      Craigslist messages and never share passwords or
                      verification codes.
                    </span>
                  </li>
                </ul>
                <button
                  className="primary-button"
                  onClick={() => setDialog(null)}
                >
                  Got it
                </button>
              </>
            )}
            {dialog === "details" && selectedListing && (
              <>
                <div className="detail-toolbar">
                  <button
                    className="detail-back"
                    onClick={() => setDialog(null)}
                    aria-label="Back to listings"
                  >
                    <Icon name="arrow" size={21} />
                  </button>
                  <div>
                    <button
                      className={
                        favorites.includes(selectedListing.id)
                          ? "favorited"
                          : ""
                      }
                      onClick={() => toggleFavorite(selectedListing.id)}
                      aria-label={
                        favorites.includes(selectedListing.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <Icon
                        name="heart"
                        size={22}
                        filled={favorites.includes(selectedListing.id)}
                      />
                    </button>
                    <button onClick={shareListing} aria-label="Share listing">
                      <Icon name="share" size={22} />
                    </button>
                  </div>
                </div>
                <div className="detail-gallery">
                  <div className="detail-image-wrap">
                    <img
                      className="detail-image"
                      src={detailImage || selectedListing.image}
                      alt={selectedListing.title}
                    />
                    <span className="detail-photo-count">
                      {Math.max(
                        1,
                        (
                          selectedListing.images || [selectedListing.image]
                        ).findIndex(
                          (image) =>
                            image === (detailImage || selectedListing.image),
                        ) + 1,
                      )}
                      /{selectedListing.images?.length || 1}
                    </span>
                  </div>
                  {(selectedListing.images?.length || 0) > 1 && (
                    <div className="detail-thumbnails">
                      {selectedListing.images?.map((image, index) => (
                        <button
                          className={
                            (detailImage || selectedListing.image) === image
                              ? "active"
                              : ""
                          }
                          key={`${image.slice(-20)}-${index}`}
                          onClick={() => setDetailImage(image)}
                          aria-label={`View photo ${index + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${selectedListing.title} ${index + 1}`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="detail-body">
                  <h2 id="modal-title">{selectedListing.title}</h2>
                  <p className="detail-location">
                    <Icon name="pin" size={15} filled />
                    {selectedListing.location}, Metro Manila ·{" "}
                    {selectedListing.time}
                  </p>
                  <div className="detail-facts">
                    <div>
                      <Icon name="tag" size={20} />
                      <span>
                        <strong>Category</strong>
                        {selectedListing.category}
                      </span>
                    </div>
                    <div>
                      <Icon name="pin" size={20} />
                      <span>
                        <strong>Location</strong>
                        {selectedListing.location}, Metro Manila
                      </span>
                    </div>
                    <div>
                      <Icon name="file" size={20} />
                      <span>
                        <strong>Posted</strong>
                        {selectedListing.time}
                      </span>
                    </div>
                    <div className="detail-about">
                      <Icon name="message" size={20} />
                      <span>
                        <strong>About this listing</strong>
                        {selectedListing.description}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="detail-actions">
                  <div className="detail-price">
                    {selectedListing.price}{" "}
                    <small>{selectedListing.suffix}</small>
                  </div>
                  <div>
                    <button
                      className="primary-button"
                      onClick={() => {
                        openMessages()
                        showToast(`Replying about “${selectedListing.title}”`)
                      }}
                    >
                      <Icon name="mail" size={18} />
                      Chat
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <Icon name="check" size={17} />
          {toast}
        </div>
      )}
    </div>
  )
}

export default App
