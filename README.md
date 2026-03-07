# Leagent Platform

AMVE landing page experiments — rapid validation of product opportunities.

## What This Is

Static landing pages for market validation experiments. Each experiment targets a specific pain point discovered by Scout, scored by Metric, and built by Stack.

## Experiments

| Path | Pain Point | Status |
|------|------------|--------|
| `/linkedin-crm-sync` | LinkedIn Sales Nav → CRM sync | Live |
| `/hubspot-sequence-limit` | HubSpot 50-contact limit bypass | Live |
| `/auto-data-entry` | Automate invoice/PDF/lead tracking | Live |
| `/manufacturing-tracker` | ERP-lite for small manufacturers | Live |
| `/healthcare-no-shows` | Appointment no-show reduction | Live |

## Deployment

Hosted on Vercel: https://leagent-platform.vercel.app

Deploy from project root:
```bash
cd ~/leagent-platform
vercel --prod
```

## Stack

- Static HTML + Tailwind CSS (CDN)
- Vercel Analytics
- No build step required

## Adding New Experiments

1. Create folder: `mkdir <experiment-name>`
2. Add `index.html` with landing page
3. Update hub page (`index.html`) to link to new experiment
4. Deploy: `vercel --prod`

## Repository

Part of the AMVE (Automated Market Validation Engine) project.

**Agents:** Emily (coord), Scout (research), Metric (scoring), Brush (design), Stack (build), Pulse (traffic)
