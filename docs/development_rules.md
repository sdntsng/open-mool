# Open Mool - Development Rules

## Core Philosophy
- **Barebones & Efficient:** Start with what is necessary. Avoid over-engineering.
- **Mobile-First:** The primary interface for data collection is mobile.
- **Offline-First:** Assume connectivity is intermittent in the field.

## Code Standards

### formatting & Linting
- **Prettier:** Use standard Prettier config for consistent formatting.
- **ESLint:** Strict linting rules to catch errors early.
- **TypeScript:** Strict mode enabled. No `any` unless absolutely necessary and documented.

### Component Structure (React/Next.js)
- **Functional Components:** Use React functional components with hooks.
- **Tailwind CSS:** Use Tailwind for styling. Maintain a design system config.
- **Shadcn UI:** (Recommended) Use for consistent, accessible UI components.

## Version Control (Git)

### Branching Strategy
- `main`: Production-ready code.
- `dev` or `feature/*`: Active development branches.
- PRs are required for merging into `main`.

### Commit Messages
- Format: `type(scope): description`
- Examples: 
  - `feat(uploader): allow offline caching`
  - `fix(auth): resolve google login redirect`
  - `chore(repo): update dependencies`
- **Incremental Commits:** Commit small, logical changes. Do not batch unrelated changes.

## Monorepo Structure (Turborepo)
- `apps/web`: The main Next.js application.
- `packages/ui`: Shared UI components and design system.
- `packages/config`: Shared configuration (ESLint, TS, etc.).
- `packages/utils`: Shared utility functions (date formatting, validation, etc.).

## Workflow
1. **Plan:** Review `task.md` and `implementation_plan.md`.
2. **Implement:** Write code in small, testable chunks.
3. **Verify:** Run local tests and build.
4. **Commit:** Push changes with descriptive messages.
