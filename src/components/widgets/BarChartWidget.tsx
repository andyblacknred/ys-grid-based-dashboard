import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import type { BarChartData } from '../../types/dashboard';

type BarChartWidgetProps = {
  title?: string;
  text?: string;
  data?: BarChartData;
};

const FALLBACK_COLORS = ['#3f51b5', '#ff9800', '#4caf50', '#e91e63', '#9c27b0'];

const DEFAULT_DATA: BarChartData = {
  points: [
    { name: 'Neutral', value: 53000, color: '#3f51b5' },
    { name: 'Negative', value: 10000, color: '#e91e63' },
    { name: 'Positive', value: 7000, color: '#4caf50' },
  ],
};

const BarChartWidget: React.FC<BarChartWidgetProps> = ({
  title = 'Bar chart',
  text,
  data,
}) => {
  const source = data && data.points?.length ? data : DEFAULT_DATA;
  const points = source.points;

  return (
    <div className="widget">
      <p className="widget-title">{title}</p>
      {text ? <p className="widget-subtitle">{text}</p> : null}
      <div className="widget-body">
        <ResponsiveContainer width="100%" height={225}>
          <BarChart
            data={points}
            margin={{ top: 4, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {points.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={entry.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartWidget;
