# Grid-based Dashboard

A small React + TypeScript app that renders a 3-column grid where you can add, move (drag & drop), and delete fixed-size widgets.

Demo: https://andyblacknred.github.io/ys-grid-based-dashboard/

## Features

- ✅ Fixed 3-column grid, unlimited vertical height
- ✅ Each cell can hold exactly **one** widget
- ✅ All widgets are 1x1
- ✅ Controls to add:
    - “Add Line Chart”
    - “Add Bar Chart”
    - “Add Text Block”
- ✅ New widgets are placed in the **first available** empty cell (left → right, top → bottom)
- ✅ Widgets can be **deleted** (delete button appears on hover)
- ✅ Widgets can be **dragged** to empty cells
- ✅ Dropping into an occupied cell is not allowed (visual feedback)
- ✅ There is always **one empty row at the bottom** so you can keep adding widgets
- ✅ Chart widgets show mock data (line + bar)

## Tech Stack

- **React + TypeScript**
- **React Context + `useState`** for state management (no Redux, no external state libs)
- **@dnd-kit/core** for drag & drop
- **Recharts** for charts
- **Vite** for build/dev
- **Pure CSS** (no Tailwind, no CSS-in-JS)

## Project Structure (todo)

```text
src/
  main.tsx
  App.tsx
