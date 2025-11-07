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

type LineChartWidgetProps = {
  title?: string;
  text?: string;
  data: LineChartData;
};

const FALLBACK_COLORS = ['#3f51b5', '#ff9800', '#4caf50', '#e91e63', '#9c27b0'];

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ title = 'Line chart', text, data }) => {
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
        <ResponsiveContainer width="100%" height={225}>
          <LineChart
            data={mergedData}
            margin={{ top: 4, right: 0, left: -20, bottom: 28 }} // adding space for the legend
          >
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" height={24} />
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
