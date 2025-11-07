// widget kinds
export type LineWidgetType = 'line';
export type BarWidgetType = 'bar';
export type TextWidgetType = 'text';
export type ChartWidgetType = LineWidgetType | BarWidgetType;
export type WidgetType = ChartWidgetType | TextWidgetType;

/**
 * Base data point used in charts.
 * Both line and bar rely on "name" (x) and "value" (y).
 */
export interface DataPoint {
  name: string;
  value: number;
}

/**
 * Bar charts may want per-bar colors.
 */
export interface BarPoint extends DataPoint {
  color?: string;
}

/**
 * Data for bar widgets: just a list of points.
 */
export interface BarChartData {
  points: BarPoint[];
}

/**
 * One line (series) in line chart.
 */
export interface LineChartSeries {
  name: string;         // label in legend
  color?: string;       // if missing, we can assign from palette
  points: DataPoint[];  // x/y
}

/**
 * Data for line widgets: can have multiple lines.
 */
export interface LineChartData {
  series: LineChartSeries[];
}

/**
 * Base widget data including optional title and text.
 */
export interface BaseWidget {
  id: string;
  type: WidgetType;
  title?: string;
  text?: string;
}

/**
 * Pure text widget – no extra data.
 */
export interface TextWidget extends BaseWidget {
  type: 'text';
}

/**
 * Bar widget – chart data required.
 */
export interface BarWidget extends BaseWidget {
  type: 'bar';
  data: BarChartData;
}

/**
 * Line widget – chart data required.
 */
export interface LineWidget extends BaseWidget {
  type: 'line';
  data: LineChartData;
}

/**
 * Union of all widgets.
 */
export type Widget = TextWidget | BarWidget | LineWidget;

/**
 * Context shape.
 */
export interface DashboardContextValue {
  cells: Array<Widget | null>;
  addWidget: (type: WidgetType) => void;
  deleteWidget: (id: string) => void;
  moveWidget: (fromIndex: number, toIndex: number) => void;
}

/**
 * Exact mapping: widget type -> data shape
 */
export type WidgetDataMap = {
  text: undefined;
  bar: BarChartData;
  line: LineChartData;
};

/**
 * Helper: given a widget type, get its data shape
 */
export type WidgetDataFor<T extends WidgetType> = WidgetDataMap[T];
