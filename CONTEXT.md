# Figma Make App - Context Document

## Overview
A modern Craigslist clone built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. This project serves as a final IT elective project featuring a complete marketplace platform with posting, searching, messaging, and community features.

## Tech Stack
- **React 19** with TypeScript 5.7
- **Vite 8** as build tool and dev server
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **React Router** for page navigation
- **Leaflet.js** for map views
- **React Icons** for SVG icons

## Project Structure

```
src/
├── main.tsx          # React entrypoint
├── App.tsx           # Primary component with routing
├── index.css         # Global CSS + Tailwind imports
├── components/       # Reusable UI components
│   ├── Icon.tsx      # Custom icon component with SVG paths
│   └── SiteMap.tsx   # Site map navigation page
├── contexts/         # React context providers
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

public/
├── index.html        # HTML shell with #root div
└── favicon.svg

## Core Components

### App.tsx
The main application component featuring:
- **Navigation** with categories: Home, Events, Site Map, For Sale, Housing, Jobs, Services, Community, Discussion Forums, Gigs, Resumes, Autos
- **State management** using useState for: activeCategory, activeView, dialog states
- **Listing data** management with 36+ sample listings
- **Conversation system** with 4 sample conversations
- **Events calendar page** with date filtering
- **Help center** with searchable articles
- **Logo component** with peace symbol
- **SiteMap** page for browsing categories and locations

### Categories (9 total)
1. For Sale (purple) - Furniture, electronics, clothing
2. Housing (green) - Apartments, rooms, shared
3. Jobs (blue) - Full-time, part-time, WFH
4. Services (yellow) - Repair, cleaning, professional
5. Community (purple) - Events, groups, local news
6. Discussion Forums (teal) - Ask, share, discuss
7. Gigs (pink) - Short term, quick work
8. Resumes (indigo) - Find a job, get noticed
9. Autos (red) - Cars, trucks, RVs, parts

### Cities (7)
Manila, Quezon City, Makati, Pasig, Taguig, Parañaque, San Juan

## Key Features

### Marketplace
- Post and browse classified listings
- Category-based filtering
- Location-aware search
- User conversations/messaging
- Image uploads (up to 6 photos per listing)

### UI/UX
- Fully responsive design (mobile-first)
- Dark/Light mode compatible
- Smooth transitions and animations
- Accessible semantic HTML
- Keyboard navigation support

### Special Pages
- **Homepage**: Hero section with featured content
- **Events Calendar**: Date-based event browsing
- **Help Center**: Searchable documentation
- **Site Map**: Full category and location overview
- **Conversations**: Message threads between users

## Data Model

### Listing Type
```typescript
{
  id: number          // Unique identifier
  category: string    // Category name
  price: string       // Price string (e.g., "₱3,500")
  title: string       // Listing title
  location: string    // City/area
  time: string        // Time ago (e.g., "2 hours ago")
  image: string       // Unsplash image URL
  description: string // Detailed description
  startDate?: string  // For events
  venue?: string      // For events
  images?: string[]   // Additional images
  suffix?: string     // "/ month", "/ day", etc.
}
```

### Conversation Type
```typescript
{
  id: number
  name: string
  initials: string
  listing: string
  price: string
  online?: boolean
  unread?: number
  messages: Array<{ from: "me" | "them"; text: string; time: string }>
}
```

## Development

### Available Scripts
- `npm run dev` - Start Vite dev server (port 8443)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with oxfmt

### Configuration
- **Vite config** (`vite.config.ts`): Port 8443, React plugin, Tailwind plugin
- **Tailwind CSS v4**: Configured in `src/index.css` with global styles
- **TypeScript**: Strict mode, ES2020 target, paths alias `@` → `src/`
- **Node.js**: Version 22 (from `.mise.toml`)

### Styling Approach
- Tailwind CSS v4 utility classes in JSX
- Global CSS in `src/index.css` with custom component styles
- Responsive breakpoints at 760px, 1000px, 1250px
- CSS variables for theming (colors, fonts, radius)

## Deployment
- GitHub Pages deployment configured (`.github/workflows/deploy.yml`)
- Build output: `dist/` directory
- Deploy script: `gh-pages -d dist`

## Recent Additions
- **Events page** with calendar view and event listings
- **Site Map page** for comprehensive category/location browsing
- **Logo component** with peace symbol animation
- **Enhanced navigation** with all category links

## Contributing
1. Create feature branch from `main`
2. Follow existing code patterns and conventions
3. Ensure responsive design works across breakpoints
4. Test dev server locally before committing
5. Run `npm run format` before pushing

## Contact
This project is developed as a final IT elective project. For questions or contributions, please refer to the repository maintainers.