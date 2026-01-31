
---

# 2) Frontend Repo README (`quant-lab-ui` / Angular)

```md
# US IPO Monitor UI (Angular + Material)

A simple, clean Angular UI that connects to the Fastify automation API to:
- View current configuration (recipient + Dubai send time)
- Update configuration
- Trigger the report immediately (Send Now)
- Display the result of the last run (US date + tickers)

Built with Angular **standalone** components and Angular Material for a clean, centered UI.

---

## Features

- Centered Material card layout
- Update:
  - Default recipient email
  - Daily send time (Dubai time)
  - Optional “Send immediately after saving”
- “Send Now” with optional override email
- Displays API result (tickers matched or no matches)

---

## Tech Stack

- Angular (standalone)
- Angular Material
- HttpClient

---

## Prerequisites

- Node.js + npm
- Fastify API running locally (default: `http://localhost:3000`)

---

## Configure API Base URL

The UI expects the backend at:

- `http://localhost:3000`

If your backend runs elsewhere, update `baseUrl` in:

`src/app/services/automation-api.service.ts`

```ts
private baseUrl = 'http://localhost:3000';
