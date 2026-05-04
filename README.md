# Vindur

A weather dashboard for drone pilots. Vindur fetches real-time and forecasted weather data and evaluates flying conditions based on wind speed, gusts, cloud cover, and precipitation — so you can quickly decide whether it's safe to fly.

## Features

- Current conditions at a glance
- 5-day forecast with daily summaries
- Wind speed and gust charts
- Automatic flying condition assessment with status badges
- Configurable settings panel

## Tech Stack

- React 18 + TypeScript
- Vite
- Material UI (MUI)
- Redux Toolkit
- Chart.js
- Tomorrow.io API

## Getting Started

### Prerequisites

- Node.js 18+
- A [Tomorrow.io](https://tomorrow.io) API key (for production data)

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

Development mode uses fixture data — no API key required. The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Set your Tomorrow.io API key in the environment before building:

```bash
VITE_TOMORROW_API_KEY=your_api_key npm run build
```

### Preview production build

```bash
npm run preview
```
