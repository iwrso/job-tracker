# Full-Stack AI Job Application Tracker

A production-grade, end-to-end TypeScript web application built to track job applications, manage pipeline stages, and generate AI-powered interview prep notes from job descriptions.

## Project Purpose & Context (For AI Assistants & Reviewers)

- **Developer Background:** 7+ years of React/JavaScript experience bridging into full-stack TypeScript, relational databases, REST API design, and AI integration.
- **Learning Mode:** Documentation-first implementation. When assisting in this repo, explain *why* architectural patterns are used (e.g., connection singletons, runtime validation, indexes) rather than blindly generating large blocks of code.
- **End Goal:** A deployed, portfolio-ready full-stack flagship application demonstrating senior-level ownership from PostgreSQL schema design to streaming LLM responses and authentication.

---

## Tech Stack

- **Framework:** Next.js (App Router) + React + TypeScript (`src/` directory)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (hosted on Supabase)
- **ORM:** Prisma ORM **v7** (using `@prisma/adapter-pg` + `pg` driver adapter & `prisma7.config.ts`)
- **Validation:** Zod (runtime schema validation + `z.infer` static types)
- **AI Integration (Planned):** Vercel AI SDK (`ai` + OpenAI/Anthropic streaming)
- **Auth & Deployment (Planned):** Auth.js (NextAuth v5) or Clerk + Vercel

---

## Achievements & Completed Setup

- [x] **Repository & App Scaffolding:** Initialized Next.js + TypeScript + Tailwind CSS + ESLint (`src/` layout) and connected to GitHub (`iwrso/job-tracker`).
- [x] **Cloud PostgreSQL Provisioning:** Set up Supabase PostgreSQL database configured with Session Pooler (`port 5432`) for schema pushes.
- [x] **Relational Schema Design (`prisma/schema.prisma`):**
  - Implemented a **1-to-Many** relationship between `User` and `JobApplication` (`onDelete: Cascade`).
  - Enforced data integrity at the storage layer using `enum ApplicationStatus` (`WISHLIST`, `APPLIED`, `INTERVIEWING`, `OFFER`, `REJECTED`).
  - Added `@db.Text` for large fields (`jobDescription`, `aiPrepNotes`), `cuid()` non-sequential primary keys, and `@@index([userId])` for query performance.
  - Synced schema to Supabase (`npx prisma db push`) and generated Prisma Client types (`npx prisma generate`).

---

## Build Roadmap & Next Steps

### Milestone 1: Database Client Singleton *(Current Step)*

- [x] Sync Prisma v7 schema to Supabase
- [x] **Create `src/lib/prisma.ts`:** Instantiate `PrismaClient` using `Pool` (`pg`) and `PrismaPg` (`@prisma/adapter-pg`), cached on `globalThis` to prevent Next.js dev hot-reloading from exhausting database connections.

### Milestone 2: Typed REST API & Runtime Validation

- [ ] **Install Zod & create `src/types/application.ts`:** Define runtime validation schemas for creating/updating applications and infer TypeScript types via `z.infer`.
- [ ] **Collection Route (`src/app/api/applications/route.ts`):**
  - `GET`: Fetch applications filtered by `?search=` (case-insensitive `company` / `role`) and `?status=`.
  - `POST`: Validate request body with `.safeParse()`, upsert temporary demo user, and create record (`201 Created` / `400 Bad Request` / `500`).
- [ ] **Single-Item Route (`src/app/api/applications/[id]/route.ts`):**
  - `PATCH`: Update application `status` or save `aiPrepNotes`.
  - `DELETE`: Remove an application by `id`.

### Milestone 3: Frontend Dashboard & Custom Hooks

- [ ] **Generic `useDebounce<T>` Hook (`src/hooks/useDebounce.ts`):** Implement a reusable TypeScript debounce hook for search inputs.
- [ ] **Dashboard UI (`src/app/page.tsx`):**
  - Status summary counters computed via `Array.prototype.reduce()`.
  - Debounced search bar + status filter tabs.
  - Interactive UI to add new applications, change pipeline statuses, and delete entries.

### Milestone 4: AI Interview Prep (Streaming)

- [ ] **Install Vercel AI SDK:** Configure LLM provider API keys in `.env`.
- [ ] **Streaming Endpoint (`src/app/api/ai-prep/route.ts`):** Accept a `jobDescription`, stream tailored technical/behavioral interview questions and keyword gaps to the UI, and persist notes to `aiPrepNotes`.

### Milestone 5: Authentication & Production Deployment

- [ ] **Authentication:** Integrate GitHub/Google OAuth (Auth.js v5 or Clerk), replace the temporary demo user, and scope all database queries to the authenticated `userId`.
- [ ] **Production Deployment:** Add `"postinstall": "prisma generate"` to `package.json` for Vercel build caching, configure environment variables, and deploy live.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (.env)
# DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION]:5432/postgres"

# 3. Generate Prisma Client & start dev server
npx prisma generate
npm run dev
```
