# Thela Express — Delivery Partner App

React + Vite + Tailwind, mobile-first. Runs on port 3002.

## Setup
```bash
cd delivery-partner
npm install
cp .env.example .env
npm run dev
```
Open on your phone browser (or Chrome device-toolbar mobile view) for the real feel —
this is built mobile-first with a bottom nav bar like a native app.

## Features
- **Login/Signup** — Firebase auth, signup collects name + vehicle type
- **Online/Offline toggle** (top bar) — controls whether backend assigns you orders
- **Live order alerts** — new orders arrive instantly via Socket.io (`new_order` event),
  card pulses briefly so it's noticeable
- **Accept / Reject** — reject auto-reassigns to the next available partner (backend handles it)
- **Status flow** — Accepted → Picked Up → Delivered, one button per stage
- **Live GPS tracking** — while an order is active (accepted/picked_up), browser
  geolocation pings the backend every update, which forwards it to the customer's
  tracking screen
- **History** — completed deliveries + a sample earnings estimate
- **Profile** — name, phone, vehicle, current status

## Notes
- Geolocation requires HTTPS in production (localhost is fine for dev) and the user
  must grant browser location permission.
- Earnings shown in History are a placeholder 10% commission calculation — replace
  with your real commission logic once decided.
