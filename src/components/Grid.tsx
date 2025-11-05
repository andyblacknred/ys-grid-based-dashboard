import React from 'react';
import { useDashboard } from "../context/DashboardContext.tsx";
import Widget from "./Widget.tsx";

const Grid: React.FC = () => {
    const { cells } = useDashboard();

    return (
        <div className="dashboard-grid">
            {cells.map((cell, index) => (
                <Widget key={index} index={index} widget={cell} />
            ))}
        </div>
    );
};

export default Grid;
