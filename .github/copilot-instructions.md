# Copilot / Lovable AI — Build Instructions

This file guides all future work in this repository. It is co-authoritative with `docs/SRS.md`, `docs/DB-schema.md`, and `docs/roles-permissions.md`.

## Project Context

Multi-tenant **Legal Practice Management Platform** connecting law offices, lawyers, employees, trainees, and clients (individual + organizational).

- **Frontend:** React 19 + TypeScript on **TanStack Start** (Vite). Tailwind CSS v4 with a design-token layer (`src/styles.css`). shadcn-style Radix primitives already installed.
- **Backend:** **Directus CMS** (PostgreSQL) via REST/GraphQL. Directus is the source of truth for collections, roles, and policies. See `docs/DB-schema.md`.
- **i18n:** 7 languages (`en`, `ar`, `fr`, `hi`, `ru`, `es`, `it`) with **Arabic RTL**. `i18next` + `react-i18next`. Files under `src/locales/{lang}/common.json` (split by namespace as it grows).
- **Theming:** light / dark / auto (matches `users.theme`). CSS variables in `src/styles.css`, toggled via the `.dark` class on `<html>`. No-flash inline boot script in `__root.tsx`.
- **PWA:** installable, offline shell, push notifications (later phase).
- **AI Assistant:** in-app chat via server-side proxy (Lovable AI Gateway). Never expose provider keys client-side. Scoped to caller's Directus permissions.

## General Conventions

- TypeScript everywhere. No implicit `any`. Mirror Directus collection shapes as explicit interfaces in `src/types/directus/*`.
- Functional React components with hooks. One component per file.
- Data fetching via **TanStack Query**; route loaders may prime the cache using the canonical `ensureQueryData` + `useSuspenseQuery` pattern.
- UI state (theme, language, auth session) in React context; do not add a second state library.
- Do not extend the app with a second UI kit — extend the existing tokens/primitives.

## Internationalization

- Never hardcode user-facing strings in JSX. Always `const { t } = useTranslation(); t('namespace.key')`.
- Every new key MUST be added to all 7 locale files under `src/locales/{lang}/`, even if placeholder for non-English.
- Use **logical CSS properties** (`ms-`, `me-`, `ps-`, `pe-`, `start-*`, `end-*`, `text-start`, `text-end`) — never `ml-`/`mr-`/`left-`/`right-` for layout that must mirror in RTL.
- `<html dir>` is set from the active language (`ar` → `rtl`, everything else → `ltr`).
- Formatting via `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat`. No manual date/number concatenation.

## Theming

- All colors, radii, spacing come from the CSS variables in `src/styles.css`. Never hardcode hex or arbitrary px values that bypass tokens.
- Every new screen/component must be visually verified in **both** light and dark mode before it's "done".
- User theme preference: read from Directus `users.theme` once authenticated; fall back to `localStorage` → system.

## Roles & Permissions

Roles in Directus are **flat** — each role is bound to one policy. Do not encode a parent/child tree in the frontend; check role slugs directly.

Roles: `administrator`, `manager`, `organization_office_law`, `lawyer`, `trainee`, `employee`, `organization_client`, `organization_client_team`, `client`, `reader`, `default`.

- Frontend route guards + conditional UI are **UX only**. Real authorization is enforced by Directus policies.
- Multi-tenancy: every data query is scoped by `organization_id`. Flag any query that isn't.
- Trainee and Lawyer share screens but differ in write permissions — enforced by Directus, not frontend logic.

## AI Assistant

- All LLM calls go through a **server function** (`createServerFn` in `src/lib/*.functions.ts`) using Lovable AI Gateway. Never bundle a provider key client-side.
- Any assistant action that would write to Directus requires an explicit user confirm step.
- Assistant queries data only through the authenticated user's Directus session — no privileged escalation.

## PWA

- Manifest, icons, service worker configured via `vite-plugin-pwa` (see the PWA skill guidance). Register only in production, never in Lovable preview.
- Every new top-level route should be reviewed for cache strategy.

## Directus Client

- Client is `src/lib/directus/client.ts`. Reads `VITE_DIRECTUS_URL` for public URL. Server-only operations read `DIRECTUS_ADMIN_TOKEN` inside server-function handlers (never at module scope).
- Types in `src/types/directus/*.ts` mirror the schema. Update them when the schema changes.

## What NOT to do

- Don't hardcode English strings.
- Don't use `ml-`/`mr-`/`left-`/`right-` for layout — use logical properties.
- Don't hardcode a role hierarchy — check role slug + let Directus enforce.
- Don't call Directus admin token or LLM keys from the browser.
- Don't add a second state manager or UI kit.
- Don't commit `.env` — see `docs/env.example`.
