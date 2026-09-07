<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# LinkShortener Project - Agent Instructions

Coding standards and guidelines for LLM agents working on the LinkShortener project. Detailed guidelines are organized in separate documentation files located in `/docs`.

## Quick Reference

- **Framework**: Next.js 16.3.3 with React 19.2.8
- **Language**: TypeScript 5 (strict mode)
- **Database**: Drizzle ORM + Neon (serverless PostgreSQL)
- **Authentication**: Clerk (with custom UI theming)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Linting**: ESLint 9 with Next.js config

## Core Principles

1. **Type Safety First**: All code must be properly typed. No `any` types without explicit justification.
2. **Strict TypeScript**: Project uses `strict: true` in `tsconfig.json`. Adhere to strict type checking.
3. **Component-Driven**: Build reusable, composable components following shadcn/ui patterns.
4. **Server-Oriented**: Prefer Server Components by default in Next.js; use Client Components only when necessary.
5. **Security**: Follow Clerk authentication patterns; never expose secrets or API keys.
6. **Performance**: Optimize for Lighthouse metrics; use Next.js Image optimization and font loading.

## Documentation Structure

The `/docs` directory contains the project's detailed, authoritative instructions. It is **incredibly important and mandatory** to read the relevant individual instruction file or files within `/docs` **before generating any code whatsoever**. This applies to every coding task, including edits, new files, refactors, fixes, tests, configuration, and documentation changes. Do not generate or modify code until the applicable `/docs/*.md` guidance has been read and followed.

## Common Tasks

### Adding a New Page
1. Create a route file in `app/` following Next.js app router conventions
2. Use Server Components by default
3. Import and use shadcn/ui components from `@/components/ui`
4. Apply Tailwind CSS classes for styling
5. See [docs/NEXTJS.md](docs/NEXTJS.md) for route organization

### Creating a New Component
1. Place reusable components in `components/`
2. Use shadcn/ui as the base for UI components
3. Properly type all props with TypeScript interfaces
4. Export as named exports
5. See [docs/COMPONENTS.md](docs/COMPONENTS.md) for patterns

### UI Components (shadcn/ui)
1. **ALWAYS use shadcn/ui components** — no custom UI components allowed
2. Browse [shadcn/ui library](https://ui.shadcn.com) for available components
3. Install missing components with `npx shadcn-ui@latest add [component-name]`
4. Import from `@/components/ui/`
5. Customize with Tailwind classes and component props only
6. See [docs/SHADCN_UI.md](docs/SHADCN_UI.md) for complete guidelines

### Database Schema Changes
1. Update schema in `db/schema.ts`
2. Generate migration with `drizzle-kit generate:sqlite`
3. Follow naming conventions in [docs/DATABASE.md](docs/DATABASE.md)
4. Document schema changes in migration

### Authentication Implementation
1. **Clerk Only**: All authentication must use Clerk. No other auth methods allowed.
2. Protect routes with middleware in `middleware.ts` (e.g., `/dashboard` requires login)
3. Redirect logged-in users from `/` to `/dashboard`
4. Sign-in and sign-up UIs launch as modals, not full pages
5. Use Clerk hooks (`useUser()`, `useAuth()`, `useSignIn()`, `useSignUp()`, etc.)
6. See [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md) for complete implementation patterns

## Environment & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

Environment variables should be configured in `.env.local` (git-ignored).

## Code Review Checklist

Before submitting code changes:

- [ ] TypeScript compiler shows no errors (`strict` mode)
- [ ] ESLint passes: `npm run lint`
- [ ] All components properly typed
- [ ] No hardcoded values; use environment variables for configuration
- [ ] Server/Client component split is intentional and documented
- [ ] Database queries use Drizzle ORM patterns
- [ ] Authentication logic uses Clerk utilities
- [ ] UI components use shadcn/ui or follow component patterns
- [ ] Tailwind classes are organized and use meaningful color/spacing scales
- [ ] README updated if new features/APIs added

## Getting Help

- Refer to the specific documentation file for your task
- Check existing code patterns in the project
- Review Next.js 16 docs at `node_modules/next/dist/docs/`
- Consult Clerk docs for auth questions
- Check shadcn/ui documentation for component customization

## Key Files

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable React components (UI in `components/ui/`)
- `db/schema.ts` - Drizzle ORM schema definitions
- `lib/utils.ts` - Utility functions and helpers
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `eslint.config.mjs` - Linting rules
- `next.config.ts` - Next.js configuration

---

**Last Updated**: 2026-08-31
