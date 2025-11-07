import type { Widget } from '../types/dashboard.ts';

const INITIAL_ROWS = 1;
export const ROW_SIZE = 3;
export const INITIAL_CELLS = INITIAL_ROWS * ROW_SIZE;

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
export const normalizeCells = (list: Array<Widget | null>): Array<Widget | null> => {
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
