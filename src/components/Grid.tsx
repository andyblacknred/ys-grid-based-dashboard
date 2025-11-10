import React from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useDashboard } from '../context/DashboardContext';
import Widget from './Widget';

const Grid: React.FC = () => {
  const { cells, moveWidget } = useDashboard();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromIndex = Number(active.id);
    const toIndex = Number(over.id);

    if (Number.isNaN(fromIndex) || Number.isNaN(toIndex)) return;
    if (fromIndex === toIndex) return;

    // context enforces "drop into empty only"
    moveWidget(fromIndex, toIndex);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="dashboard-grid">
        {cells.map((cell, index) => (
          <Widget key={cell?.id ?? index} index={index} widget={cell} />
        ))}
      </div>
    </DndContext>
  );
};

export default Grid;
