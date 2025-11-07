import type { ChartWidgetPoint, TextWidgetData, WidgetData, WidgetType } from '../types/dashboard.ts';

export const getRandomId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  // fallback
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export function getWidgetData<T extends WidgetType> (type: T): WidgetData<T> {
  if (type === 'text') {
    const data: TextWidgetData = {
      title: 'Text Block',
      text: 'Some KPI or description can be here.',
    };
    return data as WidgetData<T>;
  }

  const data: ChartWidgetPoint[] = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 18 },
    { name: 'Wed', value: 10 },
    { name: 'Thu', value: 22 },
    { name: 'Fri', value: 15 },
  ];
  return data as WidgetData<T>;
}
