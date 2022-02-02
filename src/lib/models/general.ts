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

export const PAGING_DEFAULT_PAGE_SIZE: number = 50;

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
  max: 10,
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

export interface IFieldValuePair<V> {
  field: string;
  value: V;
}

export interface IFilterOption<T> {
  type: T;
  selected: boolean;
  label: string;
  index?: number;
  hide?: boolean;
}

export interface IStepperStep {
  label: string;
  completedFieldName: string;
  index: number;
}

export const DEFAULT_SEGMENTS_COLORS_SCHEMA: string[][] = [
  ['#EF9A9A', '#EF5350', '#F44336', '#D32F2F', '#C62828', '#B71C1C'],
  ['#F48FB1', '#EC407A', '#E91E63', '#C2185B', '#AD1457', '#880E4F'],
  ['#CE93D8', '#AB47BC', '#9C27B0', '#7B1FA2', '#6A1B9A', '#4A148C'],
  ['#B39DDB', '#7E57C2', '#673AB7', '#512DA8', '#283593', '#1A237E'],
  ['#9FA8DA', '#5C6BC0', '#3F51B5', '#303F9F', '#283593', '#1A237E'],
  ['#81D4FA', '#29B6F6', '#03A9F4', '#0288D1', '#0277BD', '#01579B'],
  ['#80DEEA', '#26C6DA', '#00BCD4', '#0097A7', '#00838F', '#006064'],
  ['#80CBC4', '#26A69A', '#009688', '#00796B', '#00695C', '#004D40'],
  ['#C5E1A5', '#9CCC65', '#8BC34A', '#689F38', '#558B2F', '#33691E'],
  ['#FFE4B7', '#FFCE7E', '#F9BA55', '#F0AF45', '#E39F31', '#D58B13'],
  ['#FFD8B8', '#FFC697', '#FFA961', '#F69442', '#E87E26', '#DB6C10'],
];
