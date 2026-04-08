# McPhee Big Band

Website for the McPhee Big Band, a professional jazz orchestra based in Los Angeles and Long Beach, California.

This is the digital home for everything the band does: upcoming shows, the monthly residency at Roscoe's Jazz Lounge, private event bookings, press materials, member roster, and general inquiries. Built to be fast, clean, and easy to maintain.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS 4**
- **GSAP** for scroll-triggered animations
- **Lucide React** for icons
- **Inter** via `next/font/google`

## Getting started

You'll need Node.js 20+ and npm 10+.

```bash
npm install
npm run dev
```

That's it. Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Project structure

The site uses Next.js App Router with route-based pages and a shared component library.

**Pages:** Homepage, About, Shows, Events, Members, Press, Contact, Videos, Repertoire, Live

**Components:** Hero, Navbar, Footer, InquiryForm, Members grid, PressKit, Residency card, PrivateEvents, BandStory, MilesBio, and a handful of supporting pieces (ScrollToTop, DatePicker, VideoModal, etc.)

**API routes:** YouTube integration and live show data under `app/api/`

## Environment

Copy `.env.local.example` to `.env.local` and fill in your values. The example file is committed to the repo so the shape of the config is always documented.

## License

All rights reserved. This is the official website for the McPhee Big Band.
