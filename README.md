# Grid-based Dashboard

A small React + TypeScript app that renders a 3-column grid where you can add, move (drag & drop), and delete fixed-size widgets.

Demo: https://andyblacknred.github.io/ys-grid-based-dashboard/

## Features

- Fixed 3-column grid, unlimited vertical height
- Each cell can hold exactly one widget
- All widgets are 1x1
- Controls to add:
    - “Add Line Chart”
    - “Add Bar Chart”
    - “Add Text Block”
- New widgets are placed in the first available empty cell (left → right, top → bottom)
- Widgets can be deleted (delete button appears on hover)
- Widgets can be dragged to empty cells
- Dropping into an occupied cell is not allowed (visual feedback)
- There is always one empty row at the bottom so you can keep adding widgets
- Chart widgets show mock data (line + bar)

## Tech Stack

- React + TypeScript
- Vite
- React Context for state
- @dnd-kit/core for drag & drop
- Recharts for charts
- Pure CSS (no Tailwind, no CSS-in-JS)

## Getting Started

1. Install dependencies:

```
   npm install
```

2. Run in development mode:

```
   npm run dev
```

## Project Structure

```text
src/
  components/
    widgets/
      BarChartWidget.tsx
      LineChartWidget.tsx
      TextWidget.tsx
    Controls.tsx
    Grid.tsx
    Widget.tsx
  constants/
    charts.ts
    dashboard.ts
  context/
    DashboardContext.tsx
  helpers/
    dashboard.ts
    index.ts
  types/
    dashboard.ts
  App.tsx
  main.tsx
```

## How It Works

1. The dashboard stores cells in a flat array (for a 3-column layout).
2. When a new widget is added, the app finds the first empty cell and places the widget there.
3. Drag and drop is allowed only into empty cells. Dropping onto an occupied cell is blocked and shows visual feedback.
4. After each change the dashboard ensures there is always exactly one empty row at the bottom so you can keep adding widgets.

## Notes

- Chart data is mocked.
- Widgets are fixed-size on purpose to keep the logic simple.
- This project was made as a test-task style app, focusing on clear grid logic and state management.