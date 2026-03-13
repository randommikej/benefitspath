# BenefitsPath — Next.js Migration & Setup Guide

## What's in this project

- ✅ Full Next.js 14 App Router migration of your existing React/Vite app
- ✅ All original screens preserved (home, eligibility flow, appeal letter, lawyer, privacy)
- ✅ Google AdSense placeholder slots (results page + attorney page)
- ✅ Attorney listing cards with featured/basic tiers
- ✅ `/api/leads` — saves to Supabase + sends email via Resend
- ✅ `/api/attorneys` — CRUD for attorney listings
- ✅ `/admin` — admin page to add paid attorney listings
- ✅ 6 SEO topic pages
- ✅ 51 state pages (all 50 states + D.C.)

---

## Step 1: Replace your repo files

1. **Back up your current repo** (download a zip from GitHub)
2. Delete everything in your repo EXCEPT `.git/`
3. Copy all files from this folder into your repo
4. Push to GitHub — Vercel will auto-deploy

---

## Step 2: Set up Supabase

1. Go to [supabase.com](https://supabase.com) → your project
2. Click **SQL Editor** → **New Query**
3. Copy the entire contents of `supabase-schema.sql` and paste it
4. Click **Run**
5. You should see two tables created: `leads` and `attorneys`

**Get your keys:**
- Go to **Settings → API**
- Copy: `Project URL`, `anon public key`, `service_role key`

---

## Step 3: Set up environment variables

**In Vercel:**
1. Go to your Vercel project → **Settings → Environment Variables**
2. Add each variable from `.env.local.example`:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role |
| `RESEND_API_KEY` | resend.com → API Keys |
| `ADMIN_EMAIL` | Your email for lead notifications |
| `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` | Your existing Google Sheets URL (keep as fallback) |

**For local development:**
```bash
cp .env.local.example .env.local
# Fill in your values
npm install
npm run dev
```

---

## Step 4: Set up Resend (email notifications)

1. Go to [resend.com](https://resend.com) → sign up (free tier: 3,000 emails/month)
2. **API Keys** → Create API Key → copy it
3. **Domains** → Add your domain (benefitspath.org) → verify DNS records
4. Add `RESEND_API_KEY` to Vercel environment variables

You'll get an email notification every time someone requests an attorney consultation.

---

## Step 5: Set up Google AdSense

> ⚠️ You need site approval before ads show. Apply at [google.com/adsense](https://google.com/adsense)

1. Apply with your domain (benefitspath.org)
2. Once approved, get your Publisher ID (looks like `ca-pub-XXXXXXXXXXXXXXXX`)
3. Add `NEXT_PUBLIC_ADSENSE_ID` to Vercel environment variables
4. Until then, the ad slots show a placeholder "Advertisement" box

---

## Step 6: Add paid attorney listings

1. Go to `https://www.benefitspath.org/admin`
2. Enter your admin key (set `ADMIN_SECRET_KEY` in Vercel env vars)
3. Fill out the attorney form and click **Add Attorney Listing**

**Pricing tiers you can offer attorneys:**
- Basic ($99/mo) — listed, no badge
- Premium ($299/mo) — listed with tags for more states
- Featured ($599/mo) — ⭐ Featured badge, shown first

---

## File structure

```
app/
├── layout.js                    ← Root layout with AdSense script
├── page.js                      ← Home (loads BenefitsApp)
├── globals.css                  ← All styles
├── api/
│   ├── leads/route.js           ← POST leads to Supabase + email
│   └── attorneys/route.js       ← GET/POST attorney listings
├── admin/page.js                ← Admin panel
├── how-to-appeal-unemployment-denial/
├── reasons-unemployment-claims-get-denied/
├── unemployment-appeal-letter-example/
├── how-long-unemployment-benefits-take/
├── how-to-apply-for-unemployment/
├── unemployment-benefits-calculator/
└── unemployment-benefits-[state]/ (51 pages)

components/
├── BenefitsApp.js               ← Full migrated app (client component)
└── SeoTemplate.js               ← Reusable SEO page layout

lib/
├── data.js                      ← STATE_DATA, eligibility logic, appeal generator
└── supabase.js                  ← Supabase client

supabase-schema.sql              ← Run this in Supabase SQL Editor
.env.local.example               ← Copy to .env.local and fill in values
```

---

## SEO Pages

**Topic pages:**
- `/how-to-appeal-unemployment-denial`
- `/reasons-unemployment-claims-get-denied`
- `/unemployment-appeal-letter-example`
- `/how-long-unemployment-benefits-take`
- `/how-to-apply-for-unemployment`
- `/unemployment-benefits-calculator`

**State pages (51 total):**
- `/unemployment-benefits-california`
- `/unemployment-benefits-texas`
- ... all 50 states + D.C.

---

## Revenue model summary

| Stream | How it works |
|---|---|
| Google AdSense | Ads on results + attorney pages. Apply at google.com/adsense |
| Attorney listings | Attorneys pay monthly fee to appear. Manage via /admin |
| Lead capture | All leads stored in Supabase. Attorney requests trigger email |
