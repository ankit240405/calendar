# Interactive Calendar Component

A polished, responsive wall calendar built with React + Vite + Tailwind CSS.

## Features

- **Wall calendar aesthetic** — spiral binding, hero image panel, serif month typography
- **Month flip animation** — 3D card flip when navigating between months
- **Seasonal images** — different Unsplash photo for each month
- **Day range selector** — click start then end date; clear visual states for start, end, in-between
- **Integrated notes** — attach notes to any date range, with green dot indicators
- **Note export** — download all notes as a `.txt` file
- **Holiday markers** — Indian public holidays 2026 shown in red with tooltips
- **Three themes** — Light, Dark, Warm
- **Keyboard accessible** — Tab to navigate days, Enter/Space to select
- **Fully responsive** — side-by-side on desktop, stacked on mobile

## Project Structure

```
src/
  components/
    CalendarContainer.jsx   # Root orchestrator
    CalendarGrid.jsx        # Day grid with states
    MonthHeader.jsx         # Image panel + flip animation
    NotesSidebar.jsx        # Notes area with save/delete/export
    ThemeToggle.jsx         # Three-dot theme switcher
  hooks/
    useCalendarState.js     # Month navigation + date selection state
    useCalendarNotes.js     # Notes CRUD + localStorage persistence
    useHolidays.js          # Holiday lookup
  data/
    holidays.js             # Indian holidays 2026 + month images + constants
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Design Decisions

- **ISO date keys** for notes (`2026-01-03__2026-01-15`) — unambiguous, cross-month safe
- **Hooks separation** — state, notes, and holidays are each in dedicated hooks for testability
- **No backend** — localStorage for persistence, as specified in the brief
- **DM Serif Display + DM Sans** — editorial font pairing that echoes the physical calendar aesthetic
