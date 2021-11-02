import { ACCESS_SECTIONS_PERMISION_VALUE } from 'lib/api/ApiModels/Settings/apiModels';

export interface IAdminsGridField {
  resField: string;
  label: string;
}
export interface IAdminsGridColumns {
  [key: string]: IAdminsGridField;
}

export const AdminsGridColumns: IAdminsGridColumns = {
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

export const SettingsGridColumnItems: IAdminsGridField[] = [
  AdminsGridColumns.name,
  AdminsGridColumns.type,
  AdminsGridColumns.profile,
  AdminsGridColumns.apiAccess,
  AdminsGridColumns.adoms,
  AdminsGridColumns.ipvHost,
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
  DASHBOARD = 'dashboard',
  TOPOLOGY = 'topology',
  NETWORK = 'network',
  PERFORMANCE_DASHBOARD = 'performance_dashboard',
  SESSIONS = 'sessions',
  AUTOMATION = 'automation',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings',
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

export interface IACCESS_SECTIONS_PERMISION {
  id: AdminFormProfileDataFields;
  section: AdminFormProfileDataFields;
  label: string;
  value: ACCESS_SECTIONS_PERMISION_VALUE;
}
export const DEFAULT_ACCESS_PERMISION: IACCESS_SECTIONS_PERMISION[] = [
  {
    id: AdminFormProfileDataFields.DASHBOARD,
    section: AdminFormProfileDataFields.DASHBOARD,
    label: 'Dashboard',
    value: null,
  },
  {
    id: AdminFormProfileDataFields.TOPOLOGY,
    section: AdminFormProfileDataFields.TOPOLOGY,
    label: 'Topology',
    value: null,
  },
  {
    id: AdminFormProfileDataFields.NETWORK,
    section: AdminFormProfileDataFields.NETWORK,
    label: 'Network',
    value: null,
  },
  {
    id: AdminFormProfileDataFields.PERFORMANCE_DASHBOARD,
    section: AdminFormProfileDataFields.PERFORMANCE_DASHBOARD,
    label: 'Performance Dashboard',
    value: null,
  },
  {
    id: AdminFormProfileDataFields.SESSIONS,
    section: AdminFormProfileDataFields.SESSIONS,
    label: 'Sessions',
    value: null,
  },
  {
    id: AdminFormProfileDataFields.AUTOMATION,
    section: AdminFormProfileDataFields.AUTOMATION,
    label: 'Automation',
    value: null,
  },
  {
    id: AdminFormProfileDataFields.ANALYTICS,
    section: AdminFormProfileDataFields.ANALYTICS,
    label: 'Analytics',
    value: null,
  },
  {
    id: AdminFormProfileDataFields.SETTINGS,
    section: AdminFormProfileDataFields.SETTINGS,
    label: 'Settings',
    value: null,
  },
];
