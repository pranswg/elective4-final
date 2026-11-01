import type { CSSProperties, ReactNode } from "react"

export type IconName = "home" | "tag" | "house" | "briefcase" | "tool" | "users" | "message" | "bolt" | "file" | "car" | "search" | "pin" | "heart" | "mail" | "user" | "plus" | "shield" | "chevron" | "arrow" | "close" | "check" | "menu" | "share" | "calendar" | "clock" | "phone"

const iconPaths: Record<IconName, ReactNode> = {
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
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
}

function Icon({
  name,
  size = 22,
  filled = false,
  style,
}: {
  name: IconName
  size?: number
  filled?: boolean
  style?: CSSProperties
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
      style={style}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

export default Icon
