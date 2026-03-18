# Leagent Platform

Bloom’s lightweight experiment funnel layer for AMVE.

## What changed

This repo is no longer just a set of static experiment pages.

It now provides the minimum viable funnel layer Bloom needs for one outbound-to-booking loop:
- reusable experiment landing pages
- variant-aware page rendering
- UTM / source attribution capture
- CTA tracking
- booking-flow start tracking
- booking completion + demo outcome API hooks
- optional HubSpot form handoff before booking redirect
- shared booking link routing without building a bespoke CRM

## Stack

- Next.js 15 (App Router)
- React 19
- Vercel-ready deployment
- Optional webhook sinks for event forwarding
- Optional HubSpot form submission for lead capture

## Live funnel model

Default v1 flow:

`cold email / inbound source -> experiment landing page -> book demo CTA -> shared booking flow -> booking completed -> demo outcome`

## Core routes

- `/` — experiment index
- `/:slug` — experiment page
- `/booked` — booking confirmation placeholder page

## API routes

- `POST /api/events`
  - generic event intake
  - supports `page_view`, `cta_book_demo_click`, `booking_flow_started`, etc.
- `POST /api/booking/start`
  - stores lead context
  - optionally submits to HubSpot form
  - forwards a Google-workflow-ready `bloom_google_workflow` payload to webhook
  - returns booking URL with attribution params attached
- `POST /api/booking/complete`
  - hook for booking-completed / rescheduled / cancelled events
  - emits a row-update contract keyed by `lead_id` first, then `booking_id`
- `POST /api/demo-outcome`
  - hook for `demo_completed` / `demo_no_show`
  - emits a row-update contract keyed by `lead_id` first, then `booking_id`
- `POST /api/bloom/google-workflow`
  - thin worker/webhook intake for the canonical `bloom_google_workflow` payload
  - performs real Google Sheets upsert/update operations via `gws`
- `POST /api/bloom/google-calendar/reconcile`
  - thin pull-based calendar reconciliation route
  - reads Google Calendar events via `gws`, maps booking state changes, and reuses the same Sheets worker
  - useful now without building webhook/subscription infrastructure first

## Environment

Copy `.env.example` to `.env.local` and fill in what you have:

```bash
cp .env.example .env.local
```

Required for a usable booking CTA:
- `NEXT_PUBLIC_DEFAULT_BOOKING_URL` or experiment-specific booking URLs

Current shared booking default:
- `https://calendar.app.google/pkZ5HGKJx7UeEUaP9` (30-minute demo)

Recommended:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `BLOOM_GOOGLE_SHEET_ID`
- `BLOOM_GOOGLE_SHEET_TAB`

Optional:
- `SMALL_SERVICE_BOOKING_URL`
- `HUBSPOT_SEQUENCE_BOOKING_URL`
- `BLOOM_GOOGLE_CALENDAR_ID`
- `BLOOM_EVENT_WEBHOOK_URL`
- `BLOOM_BOOKING_WEBHOOK_URL`
- `HUBSPOT_PORTAL_ID`
- `HUBSPOT_FORM_ID`

## Bloom Google workflow contract

The app is now explicitly shaped for the canonical Bloom Google workflow at `/Users/emilyrowan/.openclaw/shared/reference/bloom-google-workflow-v1.md`.

Configured target:
- Spreadsheet ID: `1rrLWavV9HDM0b9kmaJHO2y97TJ9WUe2jToQGree4QSM`
- Sheet tab: `Sheet1`

The app does **not** become a CRM.
Instead, booking and outcome routes emit a thin integration contract under `bloom_google_workflow`, and the app now includes a minimal worker/webhook path that can apply that contract to Google Sheets via `gws`.

Current contract shape:
- `workflow`: `bloom_google_v1`
- `action`: `upsert_lead_row` or `update_lead_row`
- `event_name`: `booking_flow_started`, `booking_completed`, `booking_rescheduled`, `booking_cancelled`, `demo_completed`, or `demo_no_show`
- `match_keys`: stable row lookup payload with `lead_id` preferred, plus `booking_id`, `email`, `experiment_slug` when available
- `row_patch`: canonical Google Sheet field patch aligned to the Bloom spec
- `sheet`: spreadsheet id, tab, and canonical column list

Calendar reconciliation:
- route: `POST /api/bloom/google-calendar/reconcile`
- default target: `BLOOM_GOOGLE_CALENDAR_ID` or `primary`
- request body supports: `calendar_id`, `time_min`, `time_max`, `max_results`, `dry_run`
- current state mapping:
  - confirmed event with first-time schedule -> `booking_completed` / `status=booked`
  - confirmed event with changed start time vs existing sheet row -> `booking_rescheduled` / `status=rescheduled`
  - cancelled/deleted event returned by Calendar API -> `booking_cancelled` / `status=cancelled`
- matching priority stays practical and thin:
  1. `lead_id` from event `extendedProperties` or description
  2. `booking_id` from event metadata or event id
  3. `email + experiment_slug`

Worker behavior:
- default mode is `BLOOM_GOOGLE_WORKFLOW_MODE=local`
- in `local` mode, booking/outcome routes call the internal Sheets worker directly and return its result under `integrations.worker` / `worker`
- the same contract can also be POSTed to `/api/bloom/google-workflow`
- in `webhook` mode, the app skips local writes and only forwards to `BLOOM_EVENT_WEBHOOK_URL` / `BLOOM_BOOKING_WEBHOOK_URL`

Upsert matching order:
1. `lead_id`
2. `booking_id`
3. `email + experiment_slug`

Primary key rule stays intact:
- generate and carry `lead_id` from page -> booking flow -> downstream updates

## Google Workspace direction

Use Google Workspace CLI as the single forward path for Google integrations.

For Bloom v1, that means:
- Google Calendar / appointment scheduling for booking
- Google Meet attached to booked demos
- Google Sheets as the lightweight source of truth for leads, bookings, and post-demo outcomes

Do not extend legacy `gogcli` usage for new Bloom work.

## Local dev

```bash
cd ~/leagent-platform
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Experiment config

Experiments live in `lib/experiments.js`.

Each experiment can define:
- experiment metadata
- hero copy
- variants
- proof blocks
- form fields
- booking URL

That gives Bloom a reusable page system without turning this repo into a CRM.

## Reporting / integrations

This app intentionally does not own CRM truth.

Current v1 recommendation:
1. shared Google booking link
2. Google Sheets as the lightweight operational record
3. optional webhook sink for additional reporting automation
4. optional HubSpot handoff only if later needed

Local worker smoke test example:

```bash
curl -X POST http://localhost:3000/api/bloom/google-workflow \
  -H 'content-type: application/json' \
  -d '{
    "workflow":"bloom_google_v1",
    "event_name":"booking_flow_started",
    "match_keys":{"lead_id":"demo-lead-123"},
    "row_patch":{
      "lead_id":"demo-lead-123",
      "experiment_id":"exp_demo",
      "experiment_slug":"hubspot-sequence-limit",
      "page_variant":"A",
      "email":"demo@example.com",
      "status":"booking_started",
      "booking_started_at":"2026-03-13T02:30:00.000Z",
      "updated_at":"2026-03-13T02:30:00.000Z",
      "last_event_type":"booking_flow_started",
      "last_event_at":"2026-03-13T02:30:00.000Z"
    },
    "sheet":{
      "spreadsheet_id":"1rrLWavV9HDM0b9kmaJHO2y97TJ9WUe2jToQGree4QSM",
      "sheet_tab":"Sheet1"
    }
  }'
```

The app’s job is to preserve attribution and emit clean funnel events.

## Notes on migration

Legacy static HTML files are still present in the repo for safe reference during migration.
The new Next.js app is the active surface going forward.
