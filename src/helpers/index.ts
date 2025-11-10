import type { Widget, WidgetType } from '../types/dashboard.ts';
import { WIDGET_TEMPLATES } from '../constants/charts.ts';

export const getRandomId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  // fallback
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

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
