# the dumb project 🚧

> **“All Good Things Come to Those Who Wait”**
> A high-fidelity, interactive “Under Construction” / “Coming Soon” landing page, built pixel-for-pixel from Figma specs.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/new)

---

## 🌟 Overview

**the dumb project** is a modern, high-performance coming-soon page designed to build anticipation and capture leads before launch. Built on **Next.js 16 (App Router)** and **React 19**, it pairs a playful construction-site aesthetic — a suspended crane rig, caution-tape ribbons, and a swaying logo — with buttery-smooth, hardware-accelerated animation and an interactive email capture flow that writes straight to **Google Sheets**.

---



## ✨ Features

- 🏗️ **Suspended Crane Rig & Logo**
  - Custom vector crane hook and pulley rig, with a logo that drops in and gently pendulums.
  - Pure CSS transforms — no animation libraries, no layout shift.

- 🎗️ **Caution-Tape Ribbons**
  - Atmospheric yellow tape artwork layered behind the card with a slow, continuous float.

- 📬 **Early-Access Notification Form**
  - Inline email submission with live validation, sending, success, and error states.
  - Confetti-style “caution chip” burst on a successful submit.
  - Backed by a server-side API route with per-IP rate limiting.

- 🗄️ **Google Sheets Persistence**
  - Validated emails are forwarded server-side to a Google Apps Script Web App, which appends the row and fires a notification email.
  - The Web App URL stays server-only — never shipped to the browser.

- 🌐 **Figma-Calibrated Social Badges**
  - Circular brand buttons for **Substack**, **Instagram**, and **LinkedIn**, optically tuned to the original specs.
  - Smooth hover elevation and brand-accent transitions.

- 📱 **Fluid & Accessible**
  - Responsive from mobile to widescreen using container queries, `clamp()`, and `cqw`/`cqh` units.
  - Full `prefers-reduced-motion` compliance, visible focus rings, and screen-reader labels.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) theme tokens + hand-written CSS (`app/globals.css`) |
| **Fonts** | `next/font` — Poppins and Source Serif 4 (Tiempos Fine display fallback) |
| **Art & Icons** | Custom SVG brand icons and PNG vector artwork |
| **Persistence** | Google Apps Script Web App → Google Sheets |

---

## 📁 Project Structure

```text
├── app/
│   ├── api/
│   │   └── notify/
│   │       └── route.ts         # POST endpoint: rate limit, validate, persist
│   ├── globals.css              # Tailwind import, theme tokens, all component CSS
│   ├── layout.tsx               # Root layout, font setup, SEO / OpenGraph metadata
│   └── page.tsx                 # Route entry — renders <ComingSoon />
├── components/
│   ├── BrandIcons.tsx           # SVG icons (Substack, Instagram, LinkedIn, Facebook)
│   ├── ComingSoon.tsx           # Page orchestrator: rig + card + tape
│   ├── NotifyAsk.tsx            # Email form, status states, celebration chips
│   ├── SocialLinks.tsx          # Social link list
│   ├── SuspendedBrand.tsx       # Crane hook + suspended logo rig
│   └── TapeField.tsx            # Positioned caution-tape artwork
├── lib/
│   ├── site.ts                  # Copy text, page metadata, social links
│   └── subscribers.ts           # Email validation + Google Sheets persistence
├── public/
│   └── assets/                  # crane-hook, suspended-logo, caution-tape, unfurl
├── next.config.ts               # Next config (Turbopack root)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.18.0` or later (Node 20+ recommended)
- **npm**, **pnpm**, or **yarn**

### Installation

```bash
# 1. Clone
git clone https://github.com/<your-username>/freelance.git
cd freelance

# 2. Install dependencies
npm install

# 3. Configure environment (see below)
#    create .env.local with your Google Apps Script URL

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is taken).

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` in the project root:

```bash
# Google Apps Script Web App endpoint used by lib/subscribers.ts
GOOGLE_SHEETS_WEB_APP_URL="https://script.google.com/macros/s/XXXXXXXX/exec"
```

The Apps Script app should:

1. Accept a URL-encoded `POST` with an `email` field.
2. Append the email (plus its own timestamp) to a Google Sheet.
3. Return the plain-text body `success` on completion.

If the variable is missing or the app does not return `success`, the API responds with `502` and the UI surfaces a retry message.

### Copy & Social Links

All user-facing text, page metadata, and social URLs live in [`lib/site.ts`](lib/site.ts):

```typescript
export const socials: SocialLink[] = [
  { label: "Substack", href: "https://dumbproject.substack.com/", icon: "substack" },
  { label: "Instagram", href: "https://www.instagram.com/the.dumbproject", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dumb-project/", icon: "linkedin" },
];
```

> Social handles are placeholders until the client supplies the real ones.

### Swapping the Persistence Layer

[`lib/subscribers.ts`](lib/subscribers.ts) is the single seam between the API route and your storage. To move to a database or another mailing provider, replace the body of `saveSubscriber`:

```typescript
export async function saveSubscriber(email: string): Promise<void> {
  // e.g. await db.subscribers.create({ data: { email, createdAt: new Date() } });
  // e.g. await resend.contacts.create({ email });
}
```

Nothing else in the app needs to change.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Compile the production bundle |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## 🚢 Deployment

The fastest path is [Vercel](https://vercel.com/new):

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add `GOOGLE_SHEETS_WEB_APP_URL` under **Project → Settings → Environment Variables**.
4. Deploy — Next.js optimizes assets and runs `/api/notify` as a serverless function.

> Before going live, update `metadataBase` and the OpenGraph/Twitter image URLs in [`app/layout.tsx`](app/layout.tsx) to your production domain.

---

## 📄 License

Private & proprietary. All rights reserved.
