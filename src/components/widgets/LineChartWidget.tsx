import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { LineChartData } from '../../types/dashboard';

import {
  DEFAULT_CHART_HEIGHT,
  FALLBACK_COLORS,
  GRID_DASH,
  GRID_STROKE, LINE_CHART_LEGEND_HEIGHT,
  LINE_CHART_MARGINS
} from '../../constants/charts.ts';

type Props = {
  title?: string;
  text?: string;
  data: LineChartData;
};

const LineChartWidget: React.FC<Props> = ({ title = 'Line chart', text, data }) => {
  const baseSeries = data.series[0];

  const mergedData = (baseSeries?.points ?? []).map((basePoint) => {
    const row: Record<string, string | number> = { name: basePoint.name };

    data.series.forEach((serie) => {
      const point = serie.points.find((p) => p.name === basePoint.name);
      row[serie.name] = point ? point.value : 0;
    });

    return row;
  });

  return (
    <div className="widget">
      <p className="widget-title">{title}</p>
      {text ? <p className="widget-subtitle">{text}</p> : null}
      <div className="widget-body">
        <ResponsiveContainer width="100%" height={DEFAULT_CHART_HEIGHT}>
          <LineChart
            data={mergedData}
            margin={LINE_CHART_MARGINS}
          >
            <CartesianGrid stroke={GRID_STROKE} strokeDasharray={GRID_DASH} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" height={LINE_CHART_LEGEND_HEIGHT} />
            {data.series.map((serie, index) => (
              <Line
                key={serie.name}
                type="monotone"
                dataKey={serie.name}
                name={serie.name}
                stroke={serie.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartWidget;
