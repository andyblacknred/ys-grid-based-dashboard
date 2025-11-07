export type WidgetType = 'line' | 'bar' | 'text';

export type Widget = {
  id: string;
  type: WidgetType;
};

export type DashboardContextValue = {
  cells: Array<Widget | null>;
  addWidget: (type: WidgetType) => void;
  deleteWidget: (id: string) => void;
  moveWidget: (fromIndex: number, toIndex: number) => void;
};
