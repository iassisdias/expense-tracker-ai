# CLAUDE.md — Expense Tracker AI

## Project Overview

**Expense Tracker AI** is an AI-powered expense tracking application owned by `iassisdias` on GitHub. The app will allow users to track expenses, categorize them automatically using AI, parse receipts, set budgets, and receive spending insights.

---

## Current Repository State

This project is in its **pre-code phase** — no application code, dependencies, or configuration files exist yet. The only file is this `CLAUDE.md`.

**What exists:**
- `CLAUDE.md` — this file (AI assistant and contributor guide)

**What needs to be created** (in rough priority order):
1. `package.json` — project manifest with dependencies and scripts
2. `tsconfig.json` — TypeScript strict configuration
3. `.env.example` — environment variable template
4. `.eslintrc.js` / `.prettierrc` — linting and formatting config
5. `prisma/schema.prisma` — database schema
6. `src/` — application source code
7. `README.md` — user-facing documentation

---

## Tech Stack

| Layer            | Technology                     |
|------------------|--------------------------------|
| Language         | TypeScript (strict mode)       |
| Runtime          | Node.js                        |
| Frontend         | Next.js (App Router)           |
| Backend/API      | Next.js API routes             |
| Database         | PostgreSQL via Prisma ORM      |
| AI Integration   | OpenAI API                     |
| Authentication   | NextAuth.js                    |
| Testing          | Jest + React Testing Library   |
| Linting          | ESLint + Prettier              |
| Package Manager  | npm                            |

---

## Target Project Structure

```
expense-tracker-ai/
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.js
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Reusable UI components
│   ├── lib/                # Shared utilities and helpers
│   ├── services/           # Business logic and AI integrations
│   │   └── ai/
│   │       └── prompts/    # AI prompt templates (not inline)
│   ├── types/              # TypeScript type definitions
│   └── __tests__/          # Test files
├── public/                 # Static assets
└── docker-compose.yml      # Local dev services (PostgreSQL)
```

---

## Bootstrapping the Project

When setting up this project from scratch, follow these steps:

```bash
# 1. Initialize the project
npx create-next-app@latest . --typescript --eslint --app --src-dir --import-alias "@/*"

# 2. Install core dependencies
npm install prisma @prisma/client next-auth openai
npm install -D jest @testing-library/react @testing-library/jest-dom prettier

# 3. Initialize Prisma
npx prisma init

# 4. Copy environment variables
cp .env.example .env
# Then fill in DATABASE_URL, OPENAI_API_KEY, AUTH_SECRET, etc.

# 5. Run database migrations (after writing schema)
npx prisma migrate dev --name init

# 6. Start the development server
npm run dev
```

---

## Development Workflows

### Common Commands

| Command                    | Purpose                      |
|----------------------------|------------------------------|
| `npm run dev`              | Start development server     |
| `npm run build`            | Production build             |
| `npm start`               | Start production server      |
| `npm test`                 | Run test suite               |
| `npm run lint`             | Run ESLint                   |
| `npm run format`           | Run Prettier                 |
| `npx prisma studio`       | Open database GUI            |
| `npx prisma migrate dev`  | Run database migrations      |
| `npx prisma generate`     | Regenerate Prisma client     |

### Git Workflow

- **Branch naming**: `feature/<description>`, `fix/<description>`, `chore/<description>`
- **Commit messages**: Conventional commits — `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- **Pull requests**: Include summary of changes, testing done, and relevant screenshots

---

## Code Conventions

### TypeScript

- Strict mode enabled (`"strict": true`)
- Prefer `interface` over `type` for object shapes
- Use explicit return types on all exported functions
- Never use `any` — use `unknown` and narrow types instead
- Use `const` by default; `let` only when reassignment is needed

### Naming

| Element            | Convention       | Example                  |
|--------------------|------------------|--------------------------|
| Files              | kebab-case       | `expense-service.ts`     |
| Components         | PascalCase       | `ExpenseCard.tsx`        |
| Functions          | camelCase        | `calculateTotal()`       |
| Constants          | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`        |
| Types / Interfaces | PascalCase       | `ExpenseCategory`        |
| Database tables    | snake_case       | `expense_categories`     |

### Error Handling

- Use structured error types, not raw strings
- Catch errors at service boundaries
- Log errors with context (user ID, operation, input summary)
- Return user-friendly messages to the frontend; keep details in server logs

### Testing

- Place tests next to source files or in `src/__tests__/`
- Name test files `*.test.ts` or `*.spec.ts`
- Test behavior, not implementation details
- Cover business logic and API endpoints
- Descriptive names: `it("should categorize grocery expenses correctly")`

---

## AI Integration Guidelines

- **Prompt management**: Store prompts in `src/services/ai/prompts/` as separate files — never inline in code
- **API key security**: Always use environment variables; never hardcode keys
- **Rate limiting**: Implement rate limiting on AI-powered endpoints
- **Graceful degradation**: Core expense tracking must work even if the AI service is unavailable
- **Cost awareness**: Log token usage; set budget limits where possible
- **Caching**: Cache AI responses for identical inputs (e.g., category suggestions for the same description)

---

## Environment Variables

Create `.env.example` as a template with these variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/expense_tracker

# Authentication
AUTH_SECRET=<random-secret>
NEXTAUTH_URL=http://localhost:3000

# AI Service
OPENAI_API_KEY=<your-api-key>

# App
NODE_ENV=development
PORT=3000
```

---

## Key Domain Concepts

| Concept            | Description                                                        |
|--------------------|--------------------------------------------------------------------|
| Expense            | A financial transaction with amount, date, category, description   |
| Category           | Classification of an expense (food, transport, utilities, etc.)    |
| Budget             | A spending limit for a category or time period                     |
| AI Categorization  | Automatic classification of expenses using AI                      |
| Receipt Parsing    | Extracting expense data from uploaded receipt images                |
| Insights           | AI-generated spending analysis and recommendations                 |

---

## Instructions for AI Assistants

1. **Read before writing** — Always read existing files before proposing changes
2. **Follow existing patterns** — Match the style and conventions already in the codebase
3. **Keep changes minimal** — Only modify what's needed for the task at hand
4. **Don't over-engineer** — No unnecessary abstractions, features, or configuration
5. **Security first** — Never expose secrets; validate user input; use parameterized queries
6. **Test your changes** — Run `npm test` and `npm run lint` before considering work complete
7. **Update this file** — When you establish new patterns or conventions, update CLAUDE.md
8. **Commit conventionally** — Use conventional commit prefixes (`feat:`, `fix:`, etc.)
9. **Check current state** — This is a new project; verify what actually exists before assuming files are present
10. **No placeholder code** — When building features, write real, functional implementations
