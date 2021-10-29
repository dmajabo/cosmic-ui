import { ACCESS_SECTIONS_PERMISION_VALUE } from 'lib/api/ApiModels/Settings/apiModels';

export interface ISettingsGridField {
  resField: string;
  label: string;
}
export interface ISettingsGridColumns {
  [key: string]: ISettingsGridField;
}

export const SettingsGridColumns: ISettingsGridColumns = {
  name: {
    resField: 'name',
    label: 'Name',
  },
  type: {
    resField: 'type',
    label: 'Type',
  },
  profile: {
    resField: 'profile',
    label: 'Profile',
  },
  apiAccess: {
    resField: 'apiAccess',
    label: 'JSON Api Access',
  },
  adoms: {
    resField: 'adoms',
    label: 'Adoms',
  },
  ipvHost: {
    resField: 'ipvHost',
    label: 'Trusted IPV4Host',
  },
};

export const SettingsGridColumnItems: ISettingsGridField[] = [
  SettingsGridColumns.name,
  SettingsGridColumns.type,
  SettingsGridColumns.profile,
  SettingsGridColumns.apiAccess,
  SettingsGridColumns.adoms,
  SettingsGridColumns.ipvHost,
];

export enum AdminFormDataFields {
  Name = 'name',
  Description = 'description',
  Profile = 'profile',
  ApiAccess = 'apiAccess',
}

export enum AdminFormProfileDataFields {
  Name = 'name',
  Description = 'description',
  Permision = 'permission',
}

export enum PROFILE_VALUES_TYPE {
  SUPER = 'Super_User',
  DEMO = 'Demo_User',
}

export enum ACCESS_VALUES_TYPE {
  READ_WRITE = 'Read_Write',
  READ = 'Read',
  WRITE = 'Write',
}
export const PROFILE_VALUES: string[] = [PROFILE_VALUES_TYPE.SUPER, PROFILE_VALUES_TYPE.DEMO];
export const ACCESS_VALUES: string[] = [ACCESS_VALUES_TYPE.READ_WRITE, ACCESS_VALUES_TYPE.READ, ACCESS_VALUES_TYPE.WRITE];

export enum ACCESS_SECTIONS {
  DASHBOARD = 'dashboard',
  TOPOLOGY = 'topology',
  NETWORK = 'network',
  PERFORMANCE_DASHBOARD = 'performance_dashboard',
  SESSIONS = 'sessions',
  AUTOMATION = 'automation',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings',
}

export interface IACCESS_SECTIONS_PERMISION {
  id: ACCESS_SECTIONS;
  section: ACCESS_SECTIONS;
  label: string;
  value: ACCESS_SECTIONS_PERMISION_VALUE;
}
export const DEFAULT_ACCESS_PERMISION: IACCESS_SECTIONS_PERMISION[] = [
  {
    id: ACCESS_SECTIONS.DASHBOARD,
    section: ACCESS_SECTIONS.DASHBOARD,
    label: 'Dashboard',
    value: null,
  },
  {
    id: ACCESS_SECTIONS.TOPOLOGY,
    section: ACCESS_SECTIONS.TOPOLOGY,
    label: 'Topology',
    value: null,
  },
  {
    id: ACCESS_SECTIONS.NETWORK,
    section: ACCESS_SECTIONS.NETWORK,
    label: 'Network',
    value: null,
  },
  {
    id: ACCESS_SECTIONS.PERFORMANCE_DASHBOARD,
    section: ACCESS_SECTIONS.PERFORMANCE_DASHBOARD,
    label: 'Performance Dashboard',
    value: null,
  },
  {
    id: ACCESS_SECTIONS.SESSIONS,
    section: ACCESS_SECTIONS.SESSIONS,
    label: 'Sessions',
    value: null,
  },
  {
    id: ACCESS_SECTIONS.AUTOMATION,
    section: ACCESS_SECTIONS.AUTOMATION,
    label: 'Automation',
    value: null,
  },
  {
    id: ACCESS_SECTIONS.ANALYTICS,
    section: ACCESS_SECTIONS.ANALYTICS,
    label: 'Analytics',
    value: null,
  },
  {
    id: ACCESS_SECTIONS.SETTINGS,
    section: ACCESS_SECTIONS.SETTINGS,
    label: 'Settings',
    value: null,
  },
];
