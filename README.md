# Marina Cap Monastir Platform

Professional hotel and marina management platform built with TanStack Start, React, TypeScript, and Tailwind CSS.

## Features

- Public reservation website for Marina Cap Monastir.
- Room search by check-in, check-out, adults, children, and room type.
- Professional availability calculation using overlapping active reservations.
- Room detail pages with gallery, amenities, capacity, price breakdown, and booking CTA.
- Guest booking flow with reservation confirmation.
- No card numbers or CVC are collected or stored. Payments are tracked only by status and amount.
- Booking.com-style admin dashboard with KPIs, alerts, quick actions, charts, and recent reservations.
- Public strategic section covering centralisation, automation, user experience, revenue optimization, and modern management.
- Centralized reservation center for direct, phone, walk-in, Booking.com, Airbnb, and Expedia sources.
- Room, price, unit, capacity, amenities, and status management.
- Availability calendar by room type and date.
- Payments page with paid, remaining, deposit, refund, method, source, and date tracking.
- Printable HTML invoice preview with paid and remaining amounts.
- Channel manager prototype for Booking.com, Airbnb, and Expedia.
- Automation utilities for arrivals, departures, unpaid reservations, overbooking risk, invoices, and hotel alerts.
- Statistics page for revenue, occupancy, ADR, RevPAR, source performance, room performance, and dynamic pricing placeholders.
- Port Captain page for marina operations snapshots, berth-zone occupancy, boat stays, service queue, and port-facing alerts.
- Direction page for executive hotel revenue, port revenue, total revenue, occupancy, pending payments, pending invoices, source mix, team summary placeholders, and export placeholders.
- Supabase Auth admin login with active `admin_profiles` checks, role-based route access, and mock fallback only when Supabase is not configured.
- PWA manifest, mobile admin navigation, notification placeholders, and Supabase realtime reservation subscription scaffold.

## Local Assets

The app uses local assets only:

- `src/assets/marina-logo.png`
- `src/assets/hero-marina.jpg`
- `src/assets/rooms/`

See `src/assets/README.md` for TODOs about replacing placeholders with official Marina Cap Monastir assets.

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Important Routes

- `/` public homepage
- `/search` room search
- `/room/$id` room detail
- `/property/$id` legacy room detail compatibility route
- `/book/$id` booking page
- `/confirmation` reservation confirmation
- `/contact` reception contact page
- `/admin/login` mock admin login
- `/admin` dashboard
- `/admin/rooms`
- `/admin/reservations`
- `/admin/calendar`
- `/admin/payments`
- `/admin/invoices`
- `/admin/settings`
- `/admin/channels`
- `/admin/statistics`
- `/admin/port-captain`
- `/admin/direction`

## Architecture

Supabase is the primary data source when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured. Local mock data remains as a fallback when Supabase is unavailable or a query fails.

- `src/data/hotel.ts` central mock domain data and helper functions.
- `src/lib/supabase/` typed Supabase client, database types, mappers, and hydration helpers.
- `src/lib/types/` shared domain types.
- `src/lib/data/` mock store exports.
- `src/lib/services/` service boundaries for rooms, reservations, payments, invoices, settings, and statistics.
- `src/lib/automation/` operational automation utilities.
- `src/lib/channels/` mock channel adapters.
- `src/lib/auth/` Supabase Auth admin helpers.
- `src/lib/notifications/` notification placeholders for reservation, payment, check-in/out, channel sync, and port movement events.
- `src/lib/realtime/` Supabase realtime reservation subscription scaffold.

## Future Backend TODOs

- Add MFA, audit logs, password recovery, and operational server functions.
- Move reservation creation, payments, invoices, and sync operations to server functions.
- Expand realtime updates for reception, calendar, housekeeping, payments, invoices, channels, and port movements.

## Channel Sync TODOs

Real channel sync requires official API credentials, partner access, OAuth/API keys, webhooks, rate limits, retry logic, monitoring, and reconciliation:

- Booking.com Connectivity API
- Airbnb official/partner API
- Expedia Rapid / Partner Central API

The current adapters are mock-only and perform no external API calls.

## PWA Note

The app includes `public/manifest.webmanifest`, icon placeholders, responsive public pages, mobile admin navigation, and touch-friendly admin controls. It can later be wrapped with Capacitor for Android and iOS:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Marina Cap Monastir" "tn.marinacapmonastir.app"
npx cap add android
npx cap add ios
```

No native Android/iOS project has been generated in this repository yet. Add Capacitor only when mobile packaging, app signing, push notifications, and store delivery are ready.
