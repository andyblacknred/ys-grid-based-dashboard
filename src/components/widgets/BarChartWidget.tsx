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
import {
  BASE_CHART_MARGINS,
  DEFAULT_CHART_HEIGHT,
  FALLBACK_COLORS,
  GRID_DASH,
  GRID_STROKE
} from '../../constants/charts.ts';

type Props = {
  title?: string;
  text?: string;
  data: BarChartData;
};

const BAR_RADIUS: [number, number, number, number] = [4, 4, 0, 0];

const BarChartWidget: React.FC<Props> = React.memo(({
  title = 'Bar chart',
  text,
  data,
}) => {
  const { points } = data;

  return (
    <div className="widget">
      <p className="widget-title">{title}</p>
      {text ? <p className="widget-subtitle">{text}</p> : null}
      <div className="widget-body">
        <ResponsiveContainer width="100%" height={DEFAULT_CHART_HEIGHT}>
          <BarChart
            data={points}
            margin={BASE_CHART_MARGINS}
          >
            <CartesianGrid stroke={GRID_STROKE} strokeDasharray={GRID_DASH} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={BAR_RADIUS}>
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
});

export default BarChartWidget;
