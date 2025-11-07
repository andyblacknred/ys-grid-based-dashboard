import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartWidgetPoint } from '../../types/dashboard';

type BarChartWidgetProps = {
  data: ChartWidgetPoint[];
};

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ data }) => {
  return (
    <div className="widget">
      <p className="widget-title">Bar Chart</p>
      <div className="widget-body">
        <ResponsiveContainer width="100%" height={90}>
          <BarChart data={data}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="value" fill="#ff9800" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartWidget;
