import { createContext, useContext, useState, type ReactNode } from 'react';
import {getRandomId} from "../helpers";

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

const ROW_SIZE = 3;
const INITIAL_ROWS = 1;
const INITIAL_CELLS = INITIAL_ROWS * ROW_SIZE;

const getEmptyRowsNumber = (cells: Array<Widget | null>): number => {
    let emptyRows = 0;
    let i = cells.length;

    // walk from the end in chunks of ROW_SIZE
    while (i >= ROW_SIZE) {
        const rowStart = i - ROW_SIZE;
        const row = cells.slice(rowStart, i);
        const isEmpty = row.every((cell) => cell === null);
        if (!isEmpty) {
            break;
        }
        emptyRows += 1;
        i -= ROW_SIZE;
    }

    return emptyRows;
};

const normalizeCells = (list: Array<Widget | null>): Array<Widget | null> => {
    let next = [...list];

    const actualEmptyRows = getEmptyRowsNumber(next);
    const expectedEmptyRows = 1;

    // cut extra empty rows, but keep at least INITIAL_CELLS worth of cells
    if (actualEmptyRows > expectedEmptyRows) {
        const rowsToRemove = actualEmptyRows - expectedEmptyRows;
        const cellsToRemove = rowsToRemove * ROW_SIZE;
        // don't remove below INITIAL_CELLS
        const targetLength = Math.max(INITIAL_CELLS, next.length - cellsToRemove);
        next = next.slice(0, targetLength);
    }

    // if we have less than expectedEmptyRows, add them
    if (actualEmptyRows < expectedEmptyRows) {
        const rowsToAdd = expectedEmptyRows - actualEmptyRows;
        next = [...next, ...Array(rowsToAdd * ROW_SIZE).fill(null)];
    }

    return next;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [cells, setCells] = useState<Array<Widget | null>>(Array(INITIAL_CELLS).fill(null));

    const addWidget = (type: WidgetType) => {
        setCells((prev) => {
            const next = [...prev];
            let emptyIndex = next.findIndex((cell) => cell === null);

            // if for some reason there is no empty cell, create a new row
            if (emptyIndex === -1) {
                next.push(...Array(ROW_SIZE).fill(null));
                emptyIndex = next.findIndex((cell) => cell === null);
            }

            next[emptyIndex] = {
                id: getRandomId(),
                type,
            };

            return normalizeCells(next);
        });
    };

    const deleteWidget = (id: string) => {
        setCells((prev) => {
            const next = prev.map((cell) => (cell && cell.id === id ? null : cell));
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
