import type {
  Widget,
  WidgetDataMap,
  WidgetType
} from '../types/dashboard.ts';

export const getRandomId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  // fallback
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const WIDGET_TEMPLATES: WidgetDataMap = {
  text: undefined,
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
        name: 'Mentions2',
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
        name: 'Mentions1',
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

/**
 * Returns fully formed widget with id, title, text and data.
 */
export function getWidgetData (type: WidgetType): Widget {
  if (type === 'line') {
    return {
      id: getRandomId(),
      type: 'line',
      title: 'Untitled line widget',
      text: 'Last 30 days · Topic: “Mock”',
      data: WIDGET_TEMPLATES.line,
    };
  }

  if (type === 'bar') {
    return {
      id: getRandomId(),
      type: 'bar',
      title: 'Untitled bar widget',
      text: 'Last 30 days · Topic: “Mock”',
      data: WIDGET_TEMPLATES.bar,
    };
  }

  // type === 'text'
  return {
    id: getRandomId(),
    type: 'text',
    title: 'Untitled text widget',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  };
}
