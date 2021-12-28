export enum EVENT_LISTENERS {
  MOUSE_DOWN = 'mousedown',
  MOUSE_UP = 'mouseup',
  MOUSE_MOVE = 'mousemove',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
}
export enum TooltipPlacement {
  TOP_START = 'top-start',
  TOP = 'top',
  TOP_END = 'top-end',
  LEFT_START = 'left-start',
  LEFT = 'left',
  LEFT_END = 'left-end',
  RIGHT_START = 'right-start',
  RIGHT = 'right',
  RIGHT_END = 'right-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM = 'bottom',
  BOTTOM_END = 'bottom-end',
}

export enum DATA_READY_STATE {
  EMPTY = 'empty',
  ERROR = 'error',
  LOADING = 'loading',
  SUCCESS = 'success',
}
export const STANDART_DISPLAY_RESOLUTION = {
  width: 1830,
  height: 800,
};

export const STANDART_DISPLAY_RESOLUTION_V2 = {
  width: 1830,
  height: 706,
};

export interface IBaseEntity<T> {
  id: T;
}

export interface ICoord {
  x: number;
  y: number;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface ISpace {
  spaceX: number;
  spaceY: number;
}

export interface IIconSize {
  iconWidth: number;
  iconHeight: number;
  iconOffsetX: number;
  iconOffsetY: number;
}

export interface ITransform {
  k: number;
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IMinSize {
  minWidth: number;
  minHeight: number;
  minOffsetX: number;
  minOffsetY: number;
}

export enum CollapseExpandState {
  COLLAPSE = 'collapse',
  EXPAND = 'expand',
}
export interface ICollapsed {
  collapsed: boolean;
}

export interface IVisible {
  visible: boolean;
}

export const ZoomRange = {
  max: 100,
  min: 0.01,
};

export interface IRotateCoord {
  x: number;
  y: number;
  angle: number;
}

export interface ISelectedListItem<T> {
  id: string | number | null;
  value: T;
  label: string;
  icon?: any;
  data?: any;
}

export interface IPopupDisplay extends ICoord {
  show: boolean;
}

export interface IModal<T> {
  show: boolean;
  dataItem?: T;
  isEditMode?: boolean;
}

export enum TimeRangeFieldTypes {
  START = 'startTime',
  END = 'endTime',
}

export enum ITimeTypes {
  DAY = 'd',
  WEEK = 'w',
  MONTH = 'm',
  YEAR = 'y',
}

export const TIME_PERIOD: ISelectedListItem<ITimeTypes>[] = [
  { id: 'day', value: ITimeTypes.DAY, label: 'Day' },
  { id: 'week', value: ITimeTypes.WEEK, label: 'Week' },
  { id: 'month', value: ITimeTypes.MONTH, label: 'Month' },
  // { id: 'year', value: ITimeTypes.YEAR, label: 'Year' },
];

export enum IPanelBarLayoutTypes {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface IObject<T> {
  [key: string]: T;
}

export interface ISelectionGridCellValue<F, V> {
  field: F;
  value: V;
}

export interface IFieldValuePair<V> {
  field: string;
  value: V;
}

export interface IFilterOption<T> {
  type: T;
  selected: boolean;
  label: string;
  hide?: boolean;
}
