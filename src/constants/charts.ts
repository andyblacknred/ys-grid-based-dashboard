import type { WidgetDataMap } from '../types/dashboard.ts';

export const DEFAULT_CHART_HEIGHT = 225;
export const BASE_CHART_MARGINS = {
  top: 4,
  right: 0,
  left: -20,
  bottom: 0,
};

export const LINE_CHART_LEGEND_HEIGHT = 15;
export const LINE_CHART_MARGINS = {
  ...BASE_CHART_MARGINS,
  bottom: LINE_CHART_LEGEND_HEIGHT + 4, // extra space for legend
};

export const GRID_STROKE = '#eee';
export const GRID_DASH = '3 3';
export const FALLBACK_COLORS = ['#3f51b5', '#ff9800', '#4caf50', '#e91e63', '#9c27b0'];
export const WIDGET_TEMPLATES: WidgetDataMap = {
  bar: {
    points: [
      { name: 'Neutral', value: 53000, color: '#3f51b5' },
      { name: 'Negative', value: 10000, color: '#e91e63' },
      { name: 'Positive', value: 7000, color: '#4caf50' },
    ],
  },
  line: {
    series: [
      {
        name: 'Line 1',
        color: '#3f51b5',
        points: [
          { name: '7 Jul', value: 5000 },
          { name: '9 Jul', value: 3500 },
          { name: '11 Jul', value: 4200 },
          { name: '15 Jul', value: 13000 },
          { name: '20 Jul', value: 200 },
        ],
      },
      {
        name: 'Line 2',
        color: '#b53f3f',
        points: [
          { name: '7 Jul', value: 6000 },
          { name: '9 Jul', value: 4500 },
          { name: '11 Jul', value: 6200 },
          { name: '15 Jul', value: 3000 },
          { name: '20 Jul', value: 1200 },
        ],
      },
    ],
  },
} as const;
