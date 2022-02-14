import { ITab } from 'lib/models/tabs';

export enum SettingsTabTypes {
  Admins = 'admins',
  Loggings = 'loggings',
  Inventory = 'inventory',
}

interface ISettingsTabs {
  admins: ITab<SettingsTabTypes>;
  loggings: ITab<SettingsTabTypes>;
  inventory: ITab<SettingsTabTypes>;
}

export const SETTINGS_TABS: ISettingsTabs = {
  admins: { id: SettingsTabTypes.Admins, label: 'Admins', index: 0 },
  loggings: { id: SettingsTabTypes.Loggings, label: 'Audit Logs', index: 0 },
  inventory: { id: SettingsTabTypes.Inventory, label: 'Inventory', index: 1 },
};
