export enum USER_PREFERENCE_KEYS {
  FLOWS_OVERRVIEW_SETTINGS_RANGES = 'FLOWS_OVERRVIEW_SETTINGS_RANGES',
}
export interface IPreferenceRes {
  preference: IUserPreference;
}
export interface IUserPreference {
  userId: string;
  prefKey: string;
  prefData: string;
}

export interface IFlowPreferenceRange {
  name: string;
  color: string;
  from: number;
  to: number;
  id: string;
}
