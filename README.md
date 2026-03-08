# Börsanalys.se

A standalone Next.js webapp for [borsanalys.se](https://borsanalys.se) — AI-driven stock analysis for the Swedish market. Built to replace a Squarespace site and two standalone HTML analysis modules with a single, unified platform.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Charts | Chart.js + react-chartjs-2 |
| Runtime | React 19 |
| Auth | Server-side with httpOnly cookies |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for admin login
ADMIN_PASSWORD=your-secure-password-here

# Optional: used to sign the admin session cookie (defaults to a fallback)
SESSION_SECRET=a-random-secret-string

# Optional: Google Analytics measurement ID (GA is disabled if unset)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Important:** `ADMIN_PASSWORD` is a server-only variable — it is never exposed to the browser. Do not prefix it with `NEXT_PUBLIC_`.

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, GA, Header/Footer)
│   ├── page.tsx                  # Homepage (hero, featured analyses, CTA)
│   ├── globals.css               # Tailwind v4 theme tokens
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx              # Server component — auth gate via cookies
│   │   ├── AdminLogin.tsx        # Client component — login form
│   │   └── AdminDashboard.tsx    # Client component — dashboard UI
│   ├── analyser/                 # Analysis pages
│   │   ├── page.tsx              # Analysis listing (grid of all 9)
│   │   ├── [slug]/page.tsx       # Dynamic catch-all for placeholder analyses
│   │   ├── nvidia-fy2026/        # Full NVIDIA analysis (dedicated page)
│   │   │   ├── page.tsx          # Server component + metadata
│   │   │   ├── NvidiaAnalysis.tsx # Client component (474 lines)
│   │   │   └── NvidiaCharts.tsx  # 4 Chart.js visualizations
│   │   └── microsoft-2026/       # Full Microsoft analysis (dedicated page)
│   │       ├── page.tsx          # Server component + metadata
│   │       └── MicrosoftAnalysis.tsx  # Client component (365 lines)
│   ├── api/                      # API routes
│   │   ├── admin/login/route.ts  # POST — validates password, sets cookie
│   │   ├── admin/logout/route.ts # POST — clears cookie
│   │   ├── contact/route.ts      # POST — contact form handler
│   │   └── newsletter/route.ts   # POST — newsletter signup handler
│   ├── verktyg/                  # Financial tools/calculators
│   │   ├── rantakalkylator/      # Compound interest calculator
│   │   └── malsparandekalkylator/# Savings goal calculator
│   ├── om-oss/                   # About page
│   ├── kontakt/                  # Contact form page
│   ├── anvandarvillkor/          # Terms of service
│   ├── sitemap.ts                # Dynamic sitemap generation
│   └── robots.ts                 # Robots.txt configuration
├── components/
│   ├── analysis/                 # 14 reusable analysis components
│   │   ├── AnalysisLayout.tsx    # Full-page layout with sidebar navigation
│   │   ├── SectionHeader.tsx     # Roman numeral section headers
│   │   ├── MetricCard.tsx        # KPI display tiles
│   │   ├── FinancialTable.tsx    # Data tables with color-coded cells
│   │   ├── FinancialChart.tsx    # Chart.js wrapper with canvas lifecycle
│   │   ├── SwotGrid.tsx          # 2×2 SWOT matrix
│   │   ├── ScenarioCards.tsx     # Bull/Base/Bear scenario cards
│   │   ├── VerdictBox.tsx        # Investment decision display
│   │   ├── AlertBox.tsx          # Risk/Signal/Info alert boxes
│   │   ├── RatingBox.tsx         # Star rating with description
│   │   ├── ProgressBar.tsx       # Colored progress indicators
│   │   ├── Timeline.tsx          # Vertical timeline with dates
│   │   ├── Card.tsx              # Generic card wrapper
│   │   └── index.ts              # Barrel export (excluding FinancialChart)
│   ├── layout/
│   │   ├── Header.tsx            # Sticky header with mobile menu
│   │   └── Footer.tsx            # Footer with newsletter form
│   └── ui/
│       └── SliderInput.tsx       # Shared slider input with accessibility
├── lib/
│   ├── analyses.ts               # Analysis data and helper functions
│   ├── seo.ts                    # SEO metadata helper (createMetadata)
│   └── utils.ts                  # formatDate, verdictColor utilities
└── next.config.ts                # Security headers configuration
```

## Pages & Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage with hero, featured analyses, value propositions |
| `/analyser` | Static | Grid listing of all 9 analyses |
| `/analyser/nvidia-fy2026` | Static | Full NVIDIA FY2026 analysis with charts |
| `/analyser/microsoft-2026` | Static | Full Microsoft 2026 analysis |
| `/analyser/[slug]` | SSG | Placeholder pages for 7 other analyses |
| `/verktyg/rantakalkylator` | Static | Compound interest calculator |
| `/verktyg/malsparandekalkylator` | Static | Savings goal calculator |
| `/om-oss` | Static | About page (Carl Fredrik Thor bio) |
| `/kontakt` | Dynamic | Contact form with server-side handling |
| `/anvandarvillkor` | Static | Terms of service |
| `/admin` | Dynamic | Admin dashboard (auth required) |
| `/sitemap.xml` | Static | Auto-generated sitemap |
| `/robots.txt` | Static | Robots configuration |

## How to Create a New Analysis

### Step 1: Add analysis metadata

Add an entry to `src/lib/analyses.ts`:

```ts
{
  slug: "company-2026",
  title: "Company 2026 – Your analysis title",
  date: "2026-06-15",
  author: "Carl Fredrik Thor",
  category: "Långsiktiga analyser",
  excerpt: "Brief description for listing cards.",
  verdict: "KÖP",        // optional: KÖP, SÄLJ, BEHÅLL, AVVAKTA
  target: "$150",          // optional: target price
}
```

This automatically adds the analysis to:
- The analysis listing page (`/analyser`)
- The sitemap (`/sitemap.xml`)
- The homepage featured section (if in top 4 by date)
- The SSG catch-all route (`/analyser/[slug]`) as a placeholder

### Step 2: Create a dedicated analysis page (optional)

For a full analysis with charts and detailed sections, create a dedicated folder:

```
src/app/analyser/company-2026/
├── page.tsx                 # Server component with metadata
└── CompanyAnalysis.tsx      # Client component with full content
```

**page.tsx** — Server component with SEO metadata:

```tsx
import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const CompanyAnalysis = dynamic(() => import("./CompanyAnalysis"));

export const metadata = createMetadata({
  title: "Company 2026 – Analysis title",
  description: "SEO description for search results.",
  path: "/analyser/company-2026",
  type: "article",
  publishedTime: "2026-06-15",
  author: "Carl Fredrik Thor",
});

export default function CompanyPage() {
  return <CompanyAnalysis />;
}
```

**CompanyAnalysis.tsx** — Use the reusable analysis components:

```tsx
"use client";

import {
  AnalysisLayout,
  SectionHeader,
  MetricCard,
  FinancialTable,
  SwotGrid,
  ScenarioCards,
  VerdictBox,
  AlertBox,
  RatingBox,
  Card,
} from "@/components/analysis";
import type { AnalysisSection, Scenario } from "@/components/analysis";

const sections: AnalysisSection[] = [
  { id: "overview", number: "I", title: "Översikt" },
  { id: "moat", number: "II", title: "Strategisk Moat" },
  { id: "financials", number: "III", title: "Finansiell analys" },
  // ... add more sections
];

export default function CompanyAnalysis() {
  return (
    <AnalysisLayout
      companyName="COMPANY"
      subtitle="Aktieanalys · Juni 2026"
      date="15 juni 2026"
      dataSources="Data: FY2024–FY2027e"
      sections={sections}
      accentColor="#1a3c6e"   // Brand color for this analysis
      theme="light"           // "light" or "dark"
    >
      {/* Section I */}
      <div data-section="overview" id="overview" className="pt-14 px-6 sm:px-12">
        <SectionHeader number="I" title="Översikt" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard label="Börsvärde" value="$100B" />
          <MetricCard label="P/E" value="25x" trend="Forward estimate" />
        </div>
        <RatingBox rating={4}>
          <strong>4/5</strong> — Your rating justification here.
        </RatingBox>
      </div>

      {/* More sections... */}
    </AnalysisLayout>
  );
}
```

### Step 3: Add charts (optional)

If the analysis needs Chart.js visualizations, import `FinancialChart` directly (not from the barrel export):

```tsx
import FinancialChart from "@/components/analysis/FinancialChart";

// Define data at module scope to avoid unnecessary re-renders
const revenueData = {
  labels: ["2023", "2024", "2025e"],
  datasets: [{ label: "Revenue", data: [100, 130, 160], backgroundColor: "#2952a3" }],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

// Inside your component JSX:
<FinancialChart title="Revenue Trend" type="bar" data={revenueData} options={chartOptions} />
```

> **Important:** Always define chart `data` and `options` as module-level constants or use `useMemo`. Inline objects cause charts to be destroyed and recreated on every render.

## Analysis Component Reference

### AnalysisLayout
Full-page layout with a sidebar navigation that highlights the active section on scroll via IntersectionObserver.

| Prop | Type | Description |
|------|------|-------------|
| `companyName` | `string` | Company name shown in sidebar header |
| `subtitle` | `string` | Subtitle text (e.g., "Aktieanalys · Mars 2026") |
| `date` | `string` | Analysis date |
| `dataSources` | `string` | Data source attribution |
| `sections` | `AnalysisSection[]` | Navigation sections `{ id, number, title }` |
| `children` | `ReactNode` | Section content — use `data-section="id"` and `id="id"` on each |
| `accentColor` | `string` | CSS hex color (default: `"#1a3c6e"`) |
| `theme` | `"light" \| "dark"` | Background theme (default: `"light"`) |

### SectionHeader
Displays a Roman numeral and title with a bottom border.

| Prop | Type | Description |
|------|------|-------------|
| `number` | `string` | Roman numeral (e.g., `"III"`) |
| `title` | `string` | Section title |
| `accentColor` | `string?` | CSS hex color for the numeral |

### MetricCard
Compact KPI display tile.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Metric name |
| `value` | `string` | Metric value |
| `trend` | `string?` | Trend description shown below value |
| `valueColor` | `string?` | Tailwind text color class |

### FinancialTable
Data table with support for color-coded cells and trend arrows.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string?` | Table title |
| `columns` | `TableColumn[]` | `{ key, header }` |
| `rows` | `TableRow[]` | `{ cells: { [key]: { value, color?, arrow? } } }` |

Colors: `"green"`, `"amber"`, `"red"`. Arrows: `"up"`, `"down"`.

### SwotGrid
2×2 SWOT analysis matrix with colored category labels.

| Prop | Type | Description |
|------|------|-------------|
| `data` | `{ strengths, weaknesses, opportunities, threats: string[] }` | SWOT items |
| `title` | `string?` | Grid title |

### ScenarioCards
Bull/Base/Bear scenario cards with icons, prices, and probabilities.

| Prop | Type | Description |
|------|------|-------------|
| `scenarios` | `Scenario[]` | `{ type, probability, price, change, assumptions, requires }` |

### VerdictBox
Investment decision display with gradient background.

| Prop | Type | Description |
|------|------|-------------|
| `verdict` | `string` | Decision text (e.g., "KÖP") |
| `target` | `string` | Target price text |
| `description` | `string` | Justification paragraph |
| `date` | `string` | Decision date |
| `accentColor` | `string?` | Tailwind text color class |

### AlertBox
Contextual alert boxes for risks, signals, and information.

| Prop | Type | Description |
|------|------|-------------|
| `type` | `"risk" \| "signal" \| "info"` | Alert style (red/green/amber) |
| `icon` | `string?` | Optional emoji icon |
| `children` | `ReactNode` | Alert content |

### RatingBox
Star rating display (1-5) with descriptive text.

| Prop | Type | Description |
|------|------|-------------|
| `rating` | `number` | Number of filled stars |
| `maxRating` | `number?` | Total stars (default: 5) |
| `children` | `ReactNode` | Rating description |

### Other Components

- **Card** — Generic card wrapper with optional `title` prop
- **ProgressBar** — Colored progress bar (`green`/`amber`/`red`) with `label`, `value`, `percentage`
- **Timeline** — Vertical timeline with `items: { date, text }[]`
- **FinancialChart** — Chart.js canvas wrapper with `type`, `data`, `options`, `title`, `height`

## Admin Dashboard

Access at `/admin`. Requires the `ADMIN_PASSWORD` environment variable to be set.

**How it works:**
1. Admin page is a server component that reads the `admin_session` httpOnly cookie
2. If not authenticated, the login form is shown
3. On login, the password is sent to `/api/admin/login` which validates server-side
4. A signed httpOnly cookie is set (HMAC-SHA256 of the password)
5. The page refreshes and the server component verifies the cookie

The password is never exposed to the client-side JavaScript bundle.

## Calculators

### Compound Interest Calculator (`/verktyg/rantakalkylator`)
Interactive calculator with four sliders:
- Start amount (0 – 1,000,000 SEK)
- Monthly savings (0 – 50,000 SEK)
- Annual return (0 – 20%)
- Time horizon (1 – 50 years)

Displays total invested, returns, final capital, and a year-by-year bar chart.

### Savings Goal Calculator (`/verktyg/malsparandekalkylator`)
Calculates required monthly savings to reach a financial goal:
- Target amount (50,000 – 10,000,000 SEK)
- Starting capital (0 – 5,000,000 SEK)
- Expected annual return (0 – 20%)
- Time horizon (1 – 50 years)

Shows required monthly amount, total invested vs returns split, and a distribution bar.

## SEO

SEO is handled through:

- **`createMetadata()`** in `src/lib/seo.ts` — generates per-page metadata with OpenGraph, Twitter cards, canonical URLs, and article structured data
- **`sitemap.ts`** — auto-generates sitemap including all static pages and analysis pages with correct `lastModified` dates
- **`robots.ts`** — allows all crawlers, blocks `/admin/` and `/api/` paths
- **Semantic HTML** — proper heading hierarchy, `<nav>`, `<main>`, `<footer>`, `lang="sv"`

To add metadata to a new page:

```tsx
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Page Title",
  description: "Page description for search results.",
  path: "/page-path",
});
```

## Security

- **Admin auth** — Server-side password validation, httpOnly/secure/sameSite cookies, HMAC-signed session token
- **Security headers** — X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS (configured in `next.config.ts`)
- **Origin validation** — API routes check the `Origin` header against allowed origins
- **Input validation** — Email regex, field length limits, trimming on all form inputs
- **No client-side secrets** — All sensitive values use server-only env vars

## Design System

The color palette is defined in `src/app/globals.css` using Tailwind v4 `@theme inline`:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2952a3` | Buttons, links, hero gradient, accents |
| `primary-light` | `#3b6fc4` | Hover states, gradient endpoints |
| `accent` | `#c4942e` | Gold accent, CTA buttons, announcement bar |
| `success` | `#1a8a4a` | Positive indicators, KÖP verdict |
| `danger` | `#b52d2d` | Risk alerts, SÄLJ verdict |
| `muted` | `#6b7280` | Secondary text, labels |
| `card` | `#ffffff` | Card backgrounds |
| `section-alt` | `#f5f3ee` | Alternating section backgrounds |
| `background` | `#fcfbf8` | Page background (warm off-white) |
| `foreground` | `#1a1a1a` | Primary text |

Serif font (Georgia) is used for headings. Geist Sans/Mono for body text and code.

## Deployment

The app is ready to deploy on any platform that supports Next.js:

- **Vercel** — Zero-config deployment. Connect the GitHub repo and set env vars.
- **Self-hosted** — Run `npm run build && npm start`. Set `ADMIN_PASSWORD` and optionally `SESSION_SECRET` and `NEXT_PUBLIC_GA_ID`.
- **Docker** — Use the official [Next.js Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker).

### Required env vars for production

```env
ADMIN_PASSWORD=<strong password>
SESSION_SECRET=<random string>
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## License

Private project. All rights reserved.
