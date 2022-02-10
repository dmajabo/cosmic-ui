import { ITab } from 'lib/models/tabs';

export enum SettingsTabTypes {
  Admins = 'admins',
  Loggings = 'loggings',
  Inventory = 'inventory',
}

export const SETTINGS_TABS: ITab<SettingsTabTypes>[] = [
  // { id: SettingsTabTypes.Admins, label: 'Admins', index: 0 },
  { id: SettingsTabTypes.Loggings, label: 'Audit Logs', index: 0 },
  // { id: SettingsTabTypes.Inventory, label: 'Inventory', index: 1 },
];
