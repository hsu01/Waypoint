# WayPoint

WayPoint is a React and Vite web app for a campus community concept. It includes a landing page and an interactive kiosk-style demo that shows how students can find nearby peers, clubs, events, and messages through shared communities.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Radix UI components
- Motion animations
- Lucide icons

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. Vite usually starts at:

```text
http://localhost:5173
```

The main pages are:

- `/` landing page
- `/demo` interactive WayPoint demo

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Push this project to a GitHub repository.
2. Go to Vercel and create a new project from the repository.
3. Keep the framework preset as `Vite`.
4. Use these defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Deploy.

### Option 2: Vercel CLI

Install the Vercel CLI if needed:

```bash
npm install -g vercel
```

Deploy a preview build:

```bash
vercel
```

Deploy to production:

```bash
vercel --prod
```
