export type ChartWidgetType = 'line' | 'bar';
export type TextWidgetType = 'text';
export type WidgetType = ChartWidgetType | TextWidgetType;

export interface ChartWidgetPoint {
  name: string;
  value: number;
}

export interface TextWidgetData {
  title: string;
  text: string;
}

export type WidgetData<T extends WidgetType> =
  T extends TextWidgetType ? TextWidgetData : ChartWidgetPoint[];

export interface BaseWidget {
  id: string;
}

export interface ChartWidget extends BaseWidget {
  type: ChartWidgetType;
  data: WidgetData<ChartWidgetType>;
}

export interface TextWidget extends BaseWidget {
  type: TextWidgetType;
  data: WidgetData<TextWidgetType>;
}

export type Widget = ChartWidget | TextWidget;
export interface DashboardContextValue {
  cells: Array<Widget | null>;
  addWidget: (type: WidgetType) => void;
  deleteWidget: (id: string) => void;
  moveWidget: (fromIndex: number, toIndex: number) => void;
}
