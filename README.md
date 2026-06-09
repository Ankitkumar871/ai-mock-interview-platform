# AI Mock Interview Platform

A fourth-year engineering project prototype for AI-assisted mock interviews.

## Current Features

- Demo login/profile mode
- Resume upload panel
- Role-based interview question flow
- Candidate answer capture
- Instant rule-based feedback and scoring
- Local dashboard metrics
- Interview history saved in browser storage
- Admin analytics preview
- Downloadable text report
- Supabase-ready auth/database/storage structure

## Getting Started

```bash
npm install
npm.cmd run dev
```

Then open `http://localhost:3000`.

## Supabase Setup

1. Create a free Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Run the SQL in `docs/supabase-schema.sql` inside Supabase SQL Editor.
5. Restart the dev server.

Until Supabase keys are added, the app runs in local-first demo mode.

## Cost-Free Build Plan

This project is intentionally local-first so it can be demonstrated without paid services.

### Current Free Mode

- Frontend: Next.js
- Storage: browser `localStorage`
- AI simulation: rule-based scoring
- Resume handling: local filename capture
- Reports: generated in the browser

### Free-Tier Upgrade Options

- Authentication: Supabase Auth or Firebase Authentication free tier
- Database: Supabase Postgres free tier or Firebase Firestore free tier
- File storage: Supabase Storage free tier
- AI: Gemini free tier, OpenRouter free models, or local Ollama models
- Hosting: Vercel free tier or Netlify free tier

The recommended next step is Supabase for auth, database, and storage because it is simple for a student project and has a generous free tier.
