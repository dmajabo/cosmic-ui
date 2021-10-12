import { ITab } from 'lib/models/tabs';

export enum AutomationTabTypes {
  Automations = 'automations',
  Triggers = 'triggers',
}

export const AUTOMATIONS_TABS: ITab<AutomationTabTypes>[] = [
  { id: AutomationTabTypes.Automations, label: 'Automations', index: 0 },
  { id: AutomationTabTypes.Triggers, label: 'Triggers', index: 1 },
];
