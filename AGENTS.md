# AGENTS.md — McPhee Big Band

## Project purpose

Public website for the McPhee Big Band, a professional jazz orchestra based in Los Angeles and Long Beach, California. The site supports show discovery, private-event inquiries, press materials, member information, videos, repertoire, and the monthly residency presence.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP animations
- Vercel hosting
- Resend for inquiry email
- YouTube Data API and Mapbox where configured

## Local setup

```bash
npm ci
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Verification commands

Run these before committing or opening a PR:

```bash
npm run lint
npm run build
```

If adding TypeScript-heavy code, also run the compiler through the production build path; this repo does not currently define a separate `typecheck` script.

## Environment and secrets

- Keep real secrets only in `.env.local` locally and Vercel project environment variables remotely.
- Do not commit real API keys, tokens, webhook secrets, Resend keys, Mapbox tokens, or YouTube API keys.
- `.env.local.example` should document variable names and safe placeholders only.

Known environment variables:

```text
NEXT_PUBLIC_SITE_URL
YOUTUBE_API_KEY
NEXT_PUBLIC_MAPBOX_TOKEN
RESEND_API_KEY
```

## Deployment

- Production deploys from the GitHub repo to Vercel.
- Keep `main` deployable.
- Prefer feature branches and PRs for non-trivial changes.
- Verify lint/build locally before merging.

## Coding guidelines

- Keep content and component changes clear and small.
- Preserve accessibility semantics for forms, menus, and interactive controls.
- Avoid animation changes that harm performance or mobile usability.
- Keep public copy polished and client-safe.
- Do not remove analytics, email, YouTube, or Mapbox integrations without explicit approval.

## Files requiring care

- `.env.local.example` — placeholders only; no real secrets.
- `app/api/**` — external integrations and email handling.
- `components/InquiryForm.tsx` — lead-capture UX and validation.
- `components/Navbar.tsx` — sitewide navigation and mobile behavior.
- `next.config.ts` — image/domain and framework config.
