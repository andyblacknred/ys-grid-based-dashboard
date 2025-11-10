import { createContext, type ReactNode, useContext, useState } from 'react';
import { getWidgetData } from '../helpers';
import type { DashboardContextValue, Widget, WidgetType } from '../types/dashboard.ts';
import { normalizeCells } from '../helpers/dashboard.ts';
import { INITIAL_CELLS, ROW_SIZE } from '../constants/dashboard.ts';

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [cells, setCells] = useState<Array<Widget | null>>(Array(INITIAL_CELLS).fill(null));

  const addWidget = (type: WidgetType) => {
    setCells((prev) => {
      const next = [...prev];
      let emptyIndex = next.findIndex((cell) => cell === null);

      if (emptyIndex === -1) {
        next.push(...Array(ROW_SIZE).fill(null));
        emptyIndex = next.findIndex((cell) => cell === null);
      }

      next[emptyIndex] = getWidgetData(type);

      return normalizeCells(next);
    });
  };

  const deleteWidget = (id: string) => {
    setCells((prev) => {
      const next = prev.map((cell) => (cell?.id === id ? null : cell));
      return normalizeCells(next);
    });
  };

  const moveWidget = (fromIndex: number, toIndex: number) => {
    setCells((prev) => {
      // do not move into occupied cell
      if (prev[toIndex] !== null) return prev;

      const next = [...prev];
      next[toIndex] = next[fromIndex];
      next[fromIndex] = null;

      return normalizeCells(next);
    });
  };

  return (
    <DashboardContext.Provider value={{ cells, addWidget, deleteWidget, moveWidget }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return ctx;
};
