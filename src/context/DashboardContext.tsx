import { createContext, useContext, useState, type ReactNode } from 'react';

type WidgetType = 'line' | 'bar' | 'text';

export type Widget = {
    id: string;
    type: WidgetType;
};

type DashboardContextValue = {
    cells: Array<Widget | null>;
    addWidget: (type: WidgetType) => void;
    deleteWidget: (id: string) => void;
    moveWidget: (fromIndex: number, toIndex: number) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    // start with 3x3 = 9 cells
    const [cells, setCells] = useState<Array<Widget | null>>(Array(9).fill(null));

    const addWidget = (type: WidgetType) => {
        setCells((prev) => {
            const next = [...prev];
            // find the first empty cell
            let emptyIndex = next.findIndex((cell) => cell === null);

            // if there is none — append one more row (3 cells)
            if (emptyIndex === -1) {
                next.push(null, null, null);
                emptyIndex = next.findIndex((c) => c === null);
            }

            next[emptyIndex] = {
                id: crypto.randomUUID(),
                type,
            };

            return next;
        });
    };

    const deleteWidget = (id: string) => {
        setCells((prev) => prev.map((cell) => (cell && cell.id === id ? null : cell)));
    };

    const moveWidget = (fromIndex: number, toIndex: number) => {
        setCells((prev) => {
            // prevent dropping into an occupied cell
            if (prev[toIndex] !== null) return prev;

            const next = [...prev];
            next[toIndex] = next[fromIndex];
            next[fromIndex] = null;
            return next;
        });
    };

    return (
        <DashboardContext.Provider
            value={{ cells, addWidget, deleteWidget, moveWidget }}
        >
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
