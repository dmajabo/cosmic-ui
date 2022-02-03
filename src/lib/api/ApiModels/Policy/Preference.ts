export enum USER_PREFERENCE_KEYS {
  FLOWS_OVERRVIEW_SETTINGS_RANGES = 'FLOWS_OVERRVIEW_SETTINGS_RANGES',
  SESSIONS_LOG_COLUMNS_STITCH_FALSE = 'SESSIONS_LOG_COLUMNS_STITCH_FALSE',
  SESSIONS_LOG_COLUMNS_STITCH_TRUE = 'SESSIONS_LOG_COLUMNS_STITCH_TRUE',
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

export interface ISessionsLogPreference {
  field: string;
  index?: number;
  hide: boolean;
  id: string;
}

export interface ISessionsLogStitchPreference {
  tab: string;
  id: string;
  items: ISessionsLogPreference[];
}

interface IUserUiPreferenceUserKey {
  userId: string;
  prefKey: string;
}
export interface IPolicysvcListUiPreferenceRequest {
  userKeys: IUserUiPreferenceUserKey[];
}

export interface IPolicysvcListUiPreferenceResponse {
  preferences: IUserPreference[];
}

export const buildPreferenceKey = (key: string, userId: string): string => `${key}_${userId}`;
