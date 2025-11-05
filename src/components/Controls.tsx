import React from 'react';
import { useDashboard } from "../context/DashboardContext.tsx";

const Controls: React.FC = () => {
    const { addWidget } = useDashboard();

    return (
        <div className="controls">
            <button onClick={() => addWidget('line')}>Add Line Chart</button>
            <button onClick={() => addWidget('bar')}>Add Bar Chart</button>
            <button onClick={() => addWidget('text')}>Add Text Block</button>
        </div>
    );
};

export default Controls;
