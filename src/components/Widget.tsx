import React from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { type Widget as WidgetType, useDashboard } from '../context/DashboardContext';
import LineChartWidget from './widgets/LineChartWidget';
import BarChartWidget from './widgets/BarChartWidget';
import TextWidget from './widgets/TextWidget';

type WidgetProps = {
    index: number;
    widget: WidgetType | null;
};

const Widget: React.FC<WidgetProps> = ({ index, widget }) => {
    const { deleteWidget } = useDashboard();

    // every grid cell is a drop target
    const { setNodeRef: setDroppableRef, isOver } = useDroppable({
        id: index.toString(),
    });

    // only non-empty cells are draggable
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
            }`}
        >
            {widget ? (
                <div
                    ref={setDraggableRef}
                    className="widget-content"
                    style={style}
                    {...listeners}
                    {...attributes}
                >
                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteWidget(widget.id)}
                    >
                        ×
                    </button>

                    {widget.type === 'line' && <LineChartWidget />}
                    {widget.type === 'bar' && <BarChartWidget />}
                    {widget.type === 'text' && <TextWidget />}
                </div>
            ) : (
                <span className="empty-label">Empty</span>
            )}
        </div>
    );
};

export default Widget;
