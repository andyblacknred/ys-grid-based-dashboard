import React from 'react';
import { type Widget as WidgetType, useDashboard } from '../context/DashboardContext';
import LineChartWidget from "./widgets/LineChartWidget.tsx";
import BarChartWidget from "./widgets/BarChartWidget.tsx";
import TextWidget from "./widgets/TextWidget.tsx";

type Props = {
    index: number;
    widget: WidgetType | null;
};

const Widget: React.FC<Props> = ({ index, widget }) => {
    const { deleteWidget } = useDashboard();

    return (
        <div className={`grid-cell ${widget ? 'has-widget' : 'empty'}`} data-cell-index={index}>
            {widget ? (
                <div className="widget-content">
                    <button className="delete-button" onClick={() => deleteWidget(widget.id)}>
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
