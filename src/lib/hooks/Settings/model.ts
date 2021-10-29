import { ITab } from 'lib/models/tabs';

export enum SettingsTabTypes {
  Admins = 'admins',
  Logging = 'logging',
  Inventory = 'inventory',
}

export const SETTINGS_TABS: ITab<SettingsTabTypes>[] = [
  { id: SettingsTabTypes.Admins, label: 'Admins', index: 0 },
  { id: SettingsTabTypes.Logging, label: 'Logging', index: 1 },
  { id: SettingsTabTypes.Inventory, label: 'Inventory', index: 2 },
];
