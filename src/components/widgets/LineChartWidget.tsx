import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartWidgetPoint } from '../../types/dashboard';

type LineChartWidgetProps = {
  data: ChartWidgetPoint[];
};

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ data }) => {
  return (
    <div className="widget">
      <p className="widget-title">Line Chart</p>
      <div className="widget-body">
        <ResponsiveContainer width="100%" height={90}>
          <LineChart data={data}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3f51b5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartWidget;
