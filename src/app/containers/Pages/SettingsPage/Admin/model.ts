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
