# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HR AI Readiness Scorecard — a Vietnamese-language Next.js web app that runs a 20-question self-assessment across 4 HR dimensions, calculates maturity scores, and displays personalized recommendations. Results are stateless (URL-encoded) unless the user opts in to submit to a Google Sheets backend via Apps Script.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (next/core-web-vitals)
```

There are no tests configured in this project.

## Architecture

### Routing & Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Landing page — hero, stats, 4-dimension cards, CTA |
| `/assessment` | `app/assessment/page.tsx` | 20-question survey with back/forward navigation |
| `/results` | `app/results/page.tsx` | Radar chart + recommendations + optional community share |
| `/dashboard` | `app/dashboard/page.tsx` | Aggregated community stats (radar, bar, pie charts via Recharts) |
| `/api/submit` | `app/api/submit/route.ts` | Server proxy → Google Apps Script (avoids browser CORS) |
| `/api/stats` | `app/api/stats/route.ts` | Server proxy → Google Apps Script (avoids browser CORS) |

### Data Flow

1. User answers questions in `/assessment` — answers tracked in local `useState`
2. On completion, answers are URL-encoded as search params and user is navigated to `/results?fluency=1,2,3,4,5&...`
3. `/results` reads params, calls `lib/scoring.ts` to compute per-dimension averages and overall score
4. Optional: user clicks "Share to Community" → POST to `/api/submit` → proxied to Apps Script via GET params (GET-based pattern avoids Apps Script POST→redirect issue)
5. `/dashboard` fetches `/api/stats` → Apps Script aggregates anonymously

### Key Files

- `types/index.ts` — All TypeScript interfaces (`Dimension`, `Question`, `ScoreResult`, `MaturityLevel`, etc.)
- `data/questions.ts` — 20 questions + dimension metadata (4 dimensions × 5 questions)
- `data/recommendations.ts` — 12 recommendation sets (4 dimensions × 3 tiers: low/mid/high)
- `lib/scoring.ts` — Score calculation, maturity thresholds, percent conversion
- `lib/sheetsApi.ts` — Client-side fetch wrappers for `/api/submit` and `/api/stats`
- `scripts/apps-script.js` — Google Apps Script backend (doGet/doPost handlers for Sheets)

### Scoring Logic

- Each dimension score = average of its 5 answers (scale 1.0–4.0)
- Overall score = average of the 4 dimension scores
- Maturity tiers: **Beginner** (<1.75) | **Developing** (<2.5) | **Proficient** (<3.25) | **Advanced** (≥3.25)
- Recommendation tier per dimension: **low** (<2.0) | **mid** (<3.0) | **high** (≥3.0)

### Environment Variable

```
NEXT_PUBLIC_APPS_SCRIPT_URL   # Google Apps Script web app URL
```

If unset, `/api/submit` and `/api/stats` return 503. The app is fully functional without it — the community share button and dashboard will simply be unavailable.

### UI Conventions

- All user-facing strings are in **Vietnamese**
- Charts: Recharts library (`RadarChart`, `BarChart`, `PieChart`)
- Icons: custom inline SVG (lucide-react is installed but not primary)
- Styling: Tailwind CSS utility classes; custom animations defined in `app/globals.css`
- Font: Inter via Google Fonts
- Color scheme: gradient accents (purple/blue/teal), dark card backgrounds on light page
- `app/dashboard/page.tsx` uses a `<Suspense>` boundary for async stats loading
