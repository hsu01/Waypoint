# WayPoint

WayPoint is Team Mango's CSE 440 Spring 2026 final project website and interactive prototype.

This repository intentionally contains both deliverables in one Vite/React project:

- `/landing` is the public-facing project website / landing page.
- `/demo` is the working interactive kiosk prototype for the stretch-goal computer implementation.

The assignment mentions submitting a separate GitHub repo for the computer prototype. We kept the website and coded prototype together so the landing page can directly link to the demo and so reviewers can run one project instead of switching between two codebases.

## Team

Team Mango, Section B

- Keerthana Kompella
- Yasmin Corona Gomez
- Lory Quiroz
- Xuan Nhu Tran
- Hsu Wai Hnin Kyaw

## Project Summary

WayPoint is a campus kiosk concept for helping University of Washington students maintain and strengthen friendships through shared context. Our research found that many student friendships fade after the shared environment disappears, such as a class, club, or event ending. WayPoint supports low-pressure reconnection by showing clubs, nearby peers, campus events, RSVP status, profile information, and lightweight messaging.

## What To Review

### Landing Page

The landing page includes the required final website content:

- Product name and logo
- Problem statement
- Solution statement
- Concept video section
- Project process from research through prototype
- Intermediate artifacts including sketches, storyboard, paper prototype, and digital prototype
- Team member names
- Link to the interactive demo

Main file: `src/app/components/LandingPage.tsx`

### Interactive Demo

The demo is a coded kiosk prototype. It includes:

- UW NetID-style login
- Home dashboard
- Clubs
- Nearby check-in flow
- Nearby club peers shown only after check-in
- Messaging
- Campus events and RSVP/cancel confirmation
- Editable profile hobbies

Main file: `src/app/components/DemoPage.tsx`

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Motion animations
- Lucide icons
- Radix UI/shadcn-style component dependencies

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. Vite usually uses:

```text
http://localhost:5173
```

Useful routes:

```text
http://localhost:5173/
http://localhost:5173/demo
```

## Verification Commands

Run the TypeScript check:

```bash
npm run typecheck
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Vercel Deployment

This is a Vite single-page app. The included `vercel.json` rewrites all routes to `index.html`, so direct visits to `/demo` work after deployment.

Vercel settings:

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

## Repository Notes For Reviewers

- `src/imports/` contains visual assets used by the landing page and demo.
- `vercel.json` is required for client-side routing on Vercel.
- `package-lock.json` is included so dependency installation is reproducible.
- `node_modules/`, `dist/`, and `.vercel/` are intentionally ignored.
- The coded prototype uses realistic static demo data. It is not connected to live UW NetID, HuskyLink, email, or a backend.

## Known Prototype Scope

This demo is intended to communicate the interaction design, not production backend behavior. Login accepts any non-empty UW NetID field, RSVP/profile edits are stored only in local React state for the current session, and messaging is simulated.
