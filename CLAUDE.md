# CLAUDE.md — Expense Tracker AI

## Project Overview

**Expense Tracker** is a client-side personal finance tracking app built with Next.js 16 and TypeScript. Users can add, edit, delete, and filter expenses, view analytics dashboards with category breakdowns and monthly trends, and export their data as CSV. All data is persisted in the browser via `localStorage` — there is no backend or database.

**Repository:** `iassisdias/expense-tracker-ai` on GitHub

---

## Tech Stack

| Layer         | Technology                              |
|---------------|-----------------------------------------|
| Framework     | Next.js 16.1.6 (App Router)             |
| Language      | TypeScript 5 (strict mode)              |
| UI            | React 19, Tailwind CSS 4                |
| Styling Util  | `tailwind-merge` for conditional classes |
| Linting       | ESLint 9 with `eslint-config-next`      |
| Package Mgr   | npm                                     |
| Data Storage  | Browser `localStorage`                  |

**Notable:** There is no backend, no database, no authentication, and no AI integration yet. The app is entirely client-side.

---

## Project Structure

```
expense-tracker-ai/
├── CLAUDE.md                 # AI assistant guide (this file)
├── README.md                 # Default create-next-app readme
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript config (strict mode, @/* path alias)
├── next.config.ts            # Next.js config (empty/defaults)
├── eslint.config.mjs         # ESLint flat config with next core-web-vitals + TS
├── postcss.config.mjs        # PostCSS with @tailwindcss/postcss plugin
├── .gitignore                # Ignores node_modules/
├── public/                   # Static SVGs (file, globe, next, vercel, window)
└── src/
    ├── app/                  # Next.js App Router pages
    │   ├── layout.tsx        # Root layout: Inter font, Navigation, ExpenseProvider
    │   ├── page.tsx          # Dashboard: summary cards, charts, recent expenses
    │   ├── globals.css       # Tailwind import + custom scrollbar/focus/animation styles
    │   ├── add/page.tsx      # Add expense form page
    │   └── expenses/page.tsx # Full expense list with filters and edit modal
    ├── components/           # React components
    │   ├── ExpenseProvider.tsx   # React Context wrapping useExpenses + analytics
    │   ├── ExpenseForm.tsx       # Add/edit expense form with validation
    │   ├── ExpenseList.tsx       # Filterable expense list with search/category/date
    │   ├── ExportButton.tsx      # CSV export trigger button
    │   ├── Navigation.tsx        # Top navbar with desktop + mobile layouts
    │   ├── SummaryCards.tsx      # 4 analytics cards (total, monthly, average, top category)
    │   ├── CategoryChart.tsx     # Horizontal bar chart by category
    │   ├── MonthlyTrendChart.tsx # Vertical bar chart for last 6 months
    │   └── ui/                   # Reusable primitives
    │       ├── Button.tsx        # Variants: primary/secondary/danger/ghost; sizes; loading
    │       ├── Card.tsx          # Card, CardHeader, CardTitle, CardContent
    │       ├── Input.tsx         # Input with label, error, helper text
    │       ├── Modal.tsx         # Overlay modal with backdrop close
    │       ├── Select.tsx        # Select dropdown with label and error
    │       └── Skeleton.tsx      # Loading skeletons for dashboard and list
    ├── hooks/
    │   ├── useExpenses.ts       # CRUD operations on expense array (add/update/delete/filter)
    │   └── useLocalStorage.ts   # Generic localStorage hook with SSR-safe hydration
    ├── types/
    │   └── index.ts             # All TypeScript types, constants, category colors/icons
    └── utils/
        ├── analytics.ts         # calculateAnalytics: totals, category summaries, monthly trend
        ├── export.ts            # exportToCSV (browser download) + summary text generator
        └── format.ts            # Currency/date formatting, ID generation, date helpers
```

---

## Pages and Routes

| Route       | File                        | Description                                                       |
|-------------|-----------------------------|-------------------------------------------------------------------|
| `/`         | `src/app/page.tsx`          | Dashboard: summary cards, category chart, monthly trend, recent expenses |
| `/add`      | `src/app/add/page.tsx`      | Form to add a new expense with success feedback                   |
| `/expenses` | `src/app/expenses/page.tsx` | Full expense list with filters, inline edit (modal), delete with confirmation |

---

## Data Architecture

### Storage

All expenses are stored in `localStorage` under the key `expense-tracker-expenses`. There is no server-side persistence.

### Core Types (defined in `src/types/index.ts`)

- **`Expense`** — `{ id, amount, category, description, date, createdAt, updatedAt }`
- **`Category`** — Union: `'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other'`
- **`ExpenseFormData`** — Form input: `{ amount: string, category, description, date }`
- **`ExpenseFilters`** — `{ search, category, startDate, endDate }`
- **`Analytics`** — Computed: totals, averages, category summaries, monthly trend

### Constants (in `src/types/index.ts`)

- `CATEGORIES` — Array of all category values
- `CATEGORY_COLORS` — Hex color per category (green, blue, purple, orange, red, gray)
- `CATEGORY_ICONS` — Emoji per category

### State Management

- **`ExpenseProvider`** (React Context) wraps the entire app in `layout.tsx`
- **`useExpenses`** hook provides CRUD operations via `useLocalStorage`
- **`useLocalStorage`** handles SSR-safe hydration with an `isLoaded` flag to avoid hydration mismatches
- Analytics are derived via `useMemo` in the provider from the raw expenses array

---

## Development Workflows

### Setup

```bash
npm install
npm run dev        # Starts at http://localhost:3000
```

### Available Scripts

| Command          | Purpose                         |
|------------------|---------------------------------|
| `npm run dev`    | Start Next.js dev server        |
| `npm run build`  | Production build                |
| `npm start`      | Start production server         |
| `npm run lint`   | Run ESLint                      |

**Note:** There is no test runner, no Prettier, and no database tooling configured yet.

### Git Workflow

- **Commit messages:** Conventional commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- **Branch naming:** `feature/<description>`, `fix/<description>`, `chore/<description>`

---

## Code Conventions

### TypeScript

- Strict mode enabled (`"strict": true` in tsconfig.json)
- Path alias `@/*` maps to `./src/*`
- `interface` preferred over `type` for object shapes
- All components use `'use client'` directive (entire app is client-rendered)

### Component Patterns

- **UI primitives** (`src/components/ui/`) use `forwardRef` and extend native HTML element props
- **Styling** uses Tailwind CSS utility classes merged with `twMerge()` for conditional overrides
- **Props interfaces** are defined inline in each component file, above the component
- **Loading states** use dedicated Skeleton components (`DashboardSkeleton`, `ExpenseListSkeleton`)
- **Design system colors:** indigo-600 primary, gray tones for text/borders, rounded-xl cards with `border border-gray-200`

### Naming Conventions

| Element          | Convention       | Example                   |
|------------------|------------------|---------------------------|
| Component files  | PascalCase       | `ExpenseForm.tsx`         |
| Utility files    | camelCase        | `analytics.ts`            |
| Hook files       | camelCase        | `useExpenses.ts`          |
| Components       | PascalCase       | `SummaryCards`            |
| Functions        | camelCase        | `calculateAnalytics()`    |
| Types/Interfaces | PascalCase       | `ExpenseFormData`         |
| Constants        | UPPER_SNAKE_CASE | `CATEGORY_COLORS`         |

### Error Handling

- Form validation in `ExpenseForm` with per-field error messages
- `localStorage` reads/writes wrapped in try/catch with `console.error`
- Delete operations require two-click confirmation (timeout-based)

---

## Key Implementation Details

### CSV Export (`src/utils/export.ts`)

- Creates a Blob with CSV content and triggers browser download via a temporary `<a>` element
- Escapes double quotes in descriptions
- Filename format: `expenses-YYYY-MM-DD.csv`
- Also provides `generateExpenseSummaryText()` for plain-text summaries

### Analytics Engine (`src/utils/analytics.ts`)

- Computes total/monthly/average spending from the expense array
- Groups expenses by category with percentages
- Calculates a 6-month rolling trend for the bar chart
- Identifies the top spending category

### Formatting (`src/utils/format.ts`)

- Currency: `Intl.NumberFormat` with USD
- Dates: `Intl.DateTimeFormat` with `en-US`
- IDs: `Date.now()` + random base-36 string

---

## What Does NOT Exist Yet

- Backend / API routes
- Database (no Prisma, no PostgreSQL)
- Authentication (no NextAuth)
- AI integration (no OpenAI)
- Testing framework (no Jest, no React Testing Library)
- Prettier / formatting config
- CI/CD pipeline
- Docker / docker-compose
- `.env` or `.env.example` files

---

## Instructions for AI Assistants

1. **Read before writing** — Always read existing files before making changes
2. **Follow existing patterns** — This codebase uses `'use client'` everywhere, `twMerge` for styling, `forwardRef` for UI primitives, and React Context for state
3. **Keep it client-side** — All state lives in localStorage; don't introduce server-side state without explicit request
4. **Match the styling** — Use Tailwind utility classes with the existing color palette (indigo-600 primary, gray tones, rounded-xl cards with `border border-gray-200`)
5. **Types go in `src/types/index.ts`** — All shared types and constants are centralized there
6. **Utils are pure functions** — Keep `src/utils/` free of React imports; only `src/hooks/` and `src/components/` use React
7. **No `any`** — Use `unknown` and narrow types instead
8. **Update this file** — When adding new patterns, pages, or architectural decisions, update this CLAUDE.md
9. **Commit conventionally** — Use `feat:`, `fix:`, `chore:`, `docs:`, `refactor:` prefixes
10. **Check what exists first** — Verify actual files before assuming something is or isn't present
