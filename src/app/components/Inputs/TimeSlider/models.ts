export interface ITrack {
  id: string;
  value: number;
  percent: number;
}

export interface ITick {
  id: string;
  value: number;
  percent: number;
}

export interface IHedle {
  id: string;
  value: number;
  percent: number;
}

export interface ITimeConfig {
  min: any;
  max: any;
  step?: any;
  domain?: number[];
  selected?: number;
}

export interface ITimeValue {
  value: number;
  label: string | React.ReactNode;
  highlight: boolean;
}
