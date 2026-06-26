# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FIT.AI — frontend for a fitness/training app. Product language is **Brazilian Portuguese (pt-BR)**; write UI copy, toasts, and validation messages in pt-BR. The app is in early scaffolding stage: `tasks/*.md` describe the screens to be built (login, home, workout day, onboarding chat, etc.) and reference the target architecture before the code for it exists.

## Commands

Uses **pnpm**. Do not run `pnpm run dev` to verify changes.

- `pnpm build` — production build (use this to verify a change compiles, not `dev`)
- `pnpm lint` — Biome check (lint + import organization)
- `pnpm format` — Biome format, writes in place
- `npx orval` — regenerate the API client (functions, types, TanStack Query hooks) from the OpenAPI spec

There is no test runner configured.

## Conventions (authoritative: `.claude/rules/`)

The `.claude/rules/` directory is the source of truth for how to write code here. Read the relevant file before substantial work — the highlights:

- **`general.md`** — stack overview; always use Context7 MCP for library/framework docs.
- **`api.md`** — data fetching with Orval + TanStack Query (see below).
- **`react.md`** — components, forms, styling, auth, images.
- **`typescript.md`** — kebab-case files/folders, no code comments, `dayjs` for all dates, SOLID/DRY.

## Architecture

- **Next.js 16 App Router**, React 19, TypeScript. The **React Compiler** is enabled (`babel-plugin-react-compiler`) — do not add manual `useMemo`/`useCallback` for purposes the compiler already handles.
- **Path alias**: `@/*` → `src/*`.
- **Source layout**: route code in `src/app/`; route-local helpers/components live under `_`-prefixed folders (e.g. `src/app/_lib/`, `src/app/_components/`). Shared UI primitives in `src/components/ui/`. The `cn()` util is in `src/lib/utils.ts`.

### Data fetching (Orval + TanStack Query)

Orval generates the API layer; the generated directories are not committed/present until you run `npx orval`. If a needed function/hook is missing after running it, **stop and tell the user**.

- **Server Components (preferred)**: fetch with the functions from `@/app/_lib/api/fetch-generated` and pass the result as `initialData` into the client hook.
- **Client Components**: use the generated TanStack Query hooks from `@/lib/api/rc-generated`. Always call the async mutation variant and handle `onSuccess`/`onError`; invalidate queries with the generated query-key helpers. Never make a whole page a Client Component just to fetch — keep fetching on the server where possible.

### Auth (BetterAuth)

- Client is `authClient` in `src/app/_lib/auth-client.ts` (`better-auth/react`), pointed at `NEXT_PUBLIC_API_URL`.
- **No middleware for auth.** Check the session in the page itself with `authClient.useSession()`. Protected pages redirect to `/auth` when unauthenticated; `/auth` redirects to `/` when already authenticated.
- When calling `authClient`, never wrap in try/catch — destructure `{ error }` from the result and handle it.

## Styling & UI

- **Tailwind CSS v4** with CSS-based config — there is no `tailwind.config`. The theme (CSS variables, `@theme inline`) lives in `src/app/globals.css`.
- **shadcn/ui** (style: `radix-vega`, base color `neutral`). Prefer existing/installed shadcn components; check Context7 before building a new one. Use the `Button` component, never a raw `<button>`. One component per file.
- **Never use hard-coded Tailwind colors** (`text-white`, `bg-black`, `bg-[#...]`, etc.). Use theme tokens from `globals.css` (`bg-primary`, `text-foreground`, `border-border`, plus app-specific tokens like `online`, `streak`, `streak-foreground`). Add a new CSS variable following the existing pattern only if the token genuinely doesn't exist.
- Forms: React Hook Form + Zod via the `@/components/ui/form` component.
- Images: always use `next/image`.

> Note: `src/app/page.tsx` is still the create-next-app boilerplate and violates the styling rules above — treat it as a placeholder to be replaced, not as a pattern to follow.
