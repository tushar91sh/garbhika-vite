# Garbhika — Full-Stack Website

The React frontend is now connected to a real Express + MongoDB API in `server/`. The PDF-approved SEO title and meta description are applied to all 17 specified routes, with canonical/Open Graph tags and FAQPage JSON-LD on `/faqs/`.

A complete, content-rich, multi-page marketing site with a functional frontend shell, built from the original 5-page Garbhika prototype (Home, Our Support, Journey, Community, Experts). This expands that prototype into a real, navigable React application matching your usual stack: **Vite + React + Redux Toolkit + React Router + Tailwind + react-toastify + Framer Motion**.

Every page now has **5-8+ distinct sections** (stats bars, testimonials, FAQs, comparison tables, philosophy/values grids, upcoming events, team cards, newsletter capture, etc.) instead of the original 1-2 blocks per page, and every section, card, and grid animates in on scroll with staggered reveals and hover motion (respecting `prefers-reduced-motion` automatically via `MotionConfig`).

## What's included

**14 pages**, all cross-linked through a working navbar/footer (the original prototype's nav links were all dead `href="#"`):

- `/` — Home
- `/how-it-works` — new: 4-step onboarding explainer + FAQ accordion
- `/our-support` — from "Our Support.html"
- `/journey` — from "Journey.html", extended with a 4th "Third Trimester" phase
- `/community` — from "community.html", now with a working join form
- `/experts` — from "Experts.html", includes the Founder section (`/experts#founder`)
- `/resources` — new: filterable/searchable articles grid
- `/pricing` — new: 3-tier membership plans (referenced but never built in the original "premium members" copy)
- `/contact` — new: validated inquiry form
- `/login`, `/signup` — persistent JWT authentication forms
- `/privacy-policy`, `/terms-of-service` — new: real legal page content (footer links previously went nowhere)
- `*` — custom 404 page

## What each page now includes

- **Home** — hero, animated stats bar, three pillars, how-it-works preview, expert preview grid, testimonial, resources preview, final CTA (8 sections).
- **How It Works** — 4-step walkthrough, stats bar, "without vs. with Garbhika" comparison, FAQ accordion, CTA.
- **Our Support** — coach spotlight, yoga/psychology cards, nutrition/lactation/obstetric cards, stats bar, "why mothers choose us" philosophy grid, testimonials, FAQ.
- **Journey** — phase timeline (now 4 phases including the Third Trimester), stats bar, per-phase testimonials, Fourth Trimester cards, free companion-kit checklist CTA, closing quote.
- **Community** — hero + join form, stats bar, voices wall, upcoming group sessions calendar, community guidelines/trust section, testimonial, FAQ.
- **Experts** — stats bar, certifications strip, full expert grid, philosophy/values grid, family testimonials, founder spotlight.
- **Resources** — featured article, filterable/searchable grid, newsletter capture.
- **Pricing** — 3-tier plans, full feature comparison table, testimonial, guarantee strip, FAQ.
- **Contact** — form + info cards, team contact cards, mini FAQ.
- Plus Login, Signup, Privacy Policy, Terms of Service, and a 404 page.

The **navbar** now includes a hover/click mega-menu under "Our Support" showing all six specialties, a scroll-shrink effect, and a search shortcut. The **footer** is a 5-column layout (brand + social, Explore, Resources, Company, Legal) with a working newsletter signup form.

## Full-stack functionality

- **Redux Toolkit API flows** (`src/features/*`) now call the Express backend and persist data in MongoDB.
- **Expert booking modal** — click "Book a Session" on any expert (Our Support or Experts page) to open a validated booking form with toast confirmation.
- **Contact/inquiry form** — client-side validated, dispatches to `inquirySlice`.
- **JWT login/signup** — accounts use hashed passwords and persistent MongoDB records.
- **Skeleton loaders** (not spinners, per your usual convention) on the Experts and Community pages while their mock data "loads."
- **Community join form** with email validation and toast feedback.
- **Resources page** with live category filter + search, all client-side.

## Content fixes from the original prototype

The original HTML files disagreed with each other on who did what:
- `Our Support.html` credited "Ananya Mehta" with prenatal yoga, while `Experts.html` listed her as a nutritionist and gave yoga to Priya Malhotra.
- This build uses `Experts.html`'s roster as the source of truth (`src/data/experts.js`) — Priya Malhotra is now consistently the yoga specialist, Ananya Mehta the nutritionist, across every page that references them.

## Getting started

```bash
npm install
npm run dev       # starts a local dev server (default: http://localhost:5173)
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  app/store.js              Redux store
  features/                 Redux slices (auth, experts, booking, inquiry, community)
  components/
    layout/                 Navbar, Footer, Layout
    common/                 Button, Modal, SkeletonLoader, SectionHeading
    cards/                  ExpertCard, TestimonialCard, VoiceBubble
    forms/                  FormField, BookingModal
  data/                     Mock content (experts, journey phases, pricing, resources, FAQs)
  pages/                    One file per route
  utils/validators.js       Shared form validation
```

## Design system

All Tailwind design tokens (colors, fonts, spacing, radii) were extracted directly from the original prototype's inline `tailwind.config` and moved into `tailwind.config.js`, so visual style is identical to the source files — just now assembled into one consistent, navigable app instead of five disconnected HTML files.

## Optional next steps

1. Add an admin dashboard UI for the protected admin API.
2. Add i18n scaffolding once copy is finalized.
3. Configure SMTP credentials for enquiry and booking notifications.
