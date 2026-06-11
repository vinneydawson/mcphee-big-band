# Deployment

McPhee Big Band is intended to deploy from GitHub to Vercel.

## Production

- Host: Vercel
- Production branch: `main`
- Public URL: `https://mcphee-big-band.vercel.app`

## Build settings

Use the standard Next.js/Vercel defaults unless the Vercel project overrides them:

```text
Install command: npm ci
Build command: npm run build
Output: Next.js default
Node: 22.x preferred
```

## Required environment variables

Store real values in Vercel project environment variables and local `.env.local`. Do not commit real values.

```text
NEXT_PUBLIC_SITE_URL
YOUTUBE_API_KEY
NEXT_PUBLIC_MAPBOX_TOKEN
RESEND_API_KEY
```

## Pre-deploy verification

```bash
npm ci
npm run lint
npm run build
```

## Operational notes

- Keep `.env.local.example` synchronized with variable names only.
- If inquiry email behavior changes, verify both the contact form UX and the `app/api/` route handling.
- If YouTube or Mapbox behavior changes, verify the page still handles missing/invalid API credentials gracefully.
