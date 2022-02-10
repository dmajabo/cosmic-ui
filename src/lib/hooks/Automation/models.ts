import { ITab } from 'lib/models/tabs';

export enum AutomationTabTypes {
  Configuration = 'configuration',
  Connectors = 'connectors',
  Triggers = 'triggers',
}

export const AUTOMATIONS_TABS: ITab<AutomationTabTypes>[] = [
  { id: AutomationTabTypes.Triggers, label: 'Triggers', index: 0 },
  { id: AutomationTabTypes.Configuration, label: 'Configuration', index: 1 },
  { id: AutomationTabTypes.Connectors, label: 'Connectors', index: 2 },
];

export const DEFAULT_EMAIL_CHANNEL_NAME = 'Default Email Recipients';
