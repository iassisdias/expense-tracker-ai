# CLAUDE.md — Expense Tracker AI

## Project Overview

**Expense Tracker AI** is an AI-powered expense tracking application. The repository is owned by `iassisdias` and hosted on GitHub.

> This is a greenfield project. This document defines the foundational conventions, architecture guidelines, and development workflows that AI assistants and contributors should follow.

---

## Repository Status

This project is in its **initial setup phase**. There is no existing code yet. All contributions should follow the conventions outlined below as the codebase is built out.

---

## Recommended Tech Stack

The following stack is recommended based on the project name and common patterns for AI-powered expense trackers. Adjust as the project evolves.

| Layer            | Technology                     |
|------------------|--------------------------------|
| Language         | TypeScript                     |
| Runtime          | Node.js                        |
| Frontend         | React (or Next.js)             |
| Backend/API      | Express or Next.js API routes  |
| Database         | PostgreSQL (via Prisma ORM)    |
| AI Integration   | OpenAI API / LangChain         |
| Authentication   | NextAuth.js or JWT             |
| Testing          | Jest + React Testing Library   |
| Linting          | ESLint + Prettier              |
| Package Manager  | npm or pnpm                    |

---

## Project Structure (Target)

```
expense-tracker-ai/
├── CLAUDE.md              # This file — AI assistant guide
├── README.md              # User-facing documentation
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .env.example           # Environment variable template
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/               # Next.js app directory (if using Next.js)
│   ├── components/        # Reusable UI components
│   ├── lib/               # Shared utilities and helpers
│   ├── services/          # Business logic and AI integrations
│   ├── api/               # API route handlers
│   ├── types/             # TypeScript type definitions
│   └── __tests__/         # Test files
├── public/                # Static assets
└── docker-compose.yml     # Local development services
```

---

## Development Workflows

### Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Set up the database
npx prisma migrate dev

# Start the development server
npm run dev
```

### Common Commands

| Command              | Purpose                          |
|----------------------|----------------------------------|
| `npm run dev`        | Start development server         |
| `npm run build`      | Production build                 |
| `npm run start`      | Start production server          |
| `npm test`           | Run test suite                   |
| `npm run lint`       | Run ESLint                       |
| `npm run format`     | Run Prettier                     |
| `npx prisma studio`  | Open database GUI               |
| `npx prisma migrate dev` | Run database migrations     |

### Git Workflow

- **Branch naming**: `feature/<description>`, `fix/<description>`, `chore/<description>`
- **Commit messages**: Use conventional commits — `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- **Pull requests**: Include a summary of changes, testing done, and any relevant screenshots

---

## Code Conventions

### TypeScript

- Use strict mode (`"strict": true` in tsconfig)
- Prefer `interface` over `type` for object shapes
- Use explicit return types on exported functions
- Avoid `any` — use `unknown` and narrow types instead
- Use `const` by default; `let` only when reassignment is needed

### Naming

| Element       | Convention        | Example                     |
|---------------|-------------------|-----------------------------|
| Files         | kebab-case        | `expense-service.ts`        |
| Components    | PascalCase        | `ExpenseCard.tsx`           |
| Functions     | camelCase         | `calculateTotal()`          |
| Constants     | UPPER_SNAKE_CASE  | `MAX_RETRY_COUNT`           |
| Types/Interfaces | PascalCase     | `ExpenseCategory`           |
| Database tables | snake_case      | `expense_categories`        |

### Error Handling

- Use structured error types, not raw strings
- Catch errors at service boundaries
- Log errors with context (user ID, operation, input summary)
- Return user-friendly messages to the frontend; keep details in logs

### Testing

- Place tests next to source files or in `__tests__/` directories
- Name test files `*.test.ts` or `*.spec.ts`
- Test behavior, not implementation details
- Aim for coverage on business logic and API endpoints
- Use descriptive test names: `it("should categorize grocery expenses correctly")`

---

## AI Integration Guidelines

Since this is an AI-powered expense tracker, follow these conventions for AI features:

- **Prompt management**: Store prompts in dedicated files under `src/services/ai/prompts/`, not inline in code
- **API key security**: Never hardcode API keys; always use environment variables
- **Rate limiting**: Implement rate limiting on AI-powered endpoints
- **Fallbacks**: AI features should degrade gracefully — if the AI service is unavailable, core expense tracking must still work
- **Cost awareness**: Log token usage; set budget limits where possible
- **Caching**: Cache AI responses where appropriate (e.g., category suggestions for identical descriptions)

---

## Environment Variables

Expected `.env` variables (create `.env.example` as template):

```
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

| Concept       | Description                                                  |
|---------------|--------------------------------------------------------------|
| Expense       | A financial transaction with amount, date, category, description |
| Category      | Classification of an expense (food, transport, utilities, etc.) |
| Budget        | A spending limit for a category or time period               |
| AI Categorization | Automatic classification of expenses using AI            |
| Receipt Parsing | Extracting expense data from uploaded receipt images       |
| Insights      | AI-generated spending analysis and recommendations           |

---

## Instructions for AI Assistants

1. **Read before writing**: Always read existing files before proposing changes
2. **Follow existing patterns**: Match the style and conventions already present in the codebase
3. **Keep changes minimal**: Only modify what's needed for the task at hand
4. **Don't over-engineer**: Avoid adding unnecessary abstractions, features, or configuration
5. **Security first**: Never expose secrets, validate user input, use parameterized queries
6. **Test your changes**: Run `npm test` and `npm run lint` before considering work complete
7. **Update this file**: If you establish new patterns or conventions, update CLAUDE.md accordingly
8. **Commit conventionally**: Use conventional commit messages with appropriate prefixes
