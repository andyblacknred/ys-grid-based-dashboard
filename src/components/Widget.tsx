import React from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { useDashboard } from '../context/DashboardContext';
import LineChartWidget from './widgets/LineChartWidget';
import BarChartWidget from './widgets/BarChartWidget';
import TextWidget from './widgets/TextWidget';
import type { Widget as WidgetModel } from '../types/dashboard';

type WidgetProps = {
  index: number;
  widget: WidgetModel | null;
};

const Widget: React.FC<WidgetProps> = ({ index, widget }) => {
  const { deleteWidget } = useDashboard();

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: index.toString(),
  });

  const {
    setNodeRef: setDraggableRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({
    id: index.toString(),
    disabled: !widget,
  });

  const style: React.CSSProperties = {};
  if (transform) {
    style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0)`;
  }
  if (isDragging) {
    style.opacity = 0.6;
  }

  return (
    <div
      ref={setDroppableRef}
      data-cell-index={index}
      className={`grid-cell ${widget ? 'has-widget' : 'empty'} ${
        isOver ? 'drop-target' : ''
      } ${isDragging ? 'drag-source' : ''}`}
    >
      {widget ? (
        <div
          ref={setDraggableRef}
          className={`widget-content ${isDragging ? 'widget-content--dragging' : ''}`}
          style={style}
        >
          <div className="drag-handle" {...listeners} {...attributes}>
            ⋮
          </div>

          <button
            type="button"
            className="delete-button"
            onClick={() => deleteWidget(widget.id)}
          >
            ×
          </button>

          {widget.type === 'line' && <LineChartWidget data={widget.data} title={widget.title} text={widget.text} />}
          {widget.type === 'bar' && <BarChartWidget data={widget.data} title={widget.title} text={widget.text} />}
          {widget.type === 'text' && <TextWidget title={widget.title} text={widget.text} />}
        </div>
      ) : (
        <span className="empty-label">Empty</span>
      )}
    </div>
  );
};

export default Widget;
