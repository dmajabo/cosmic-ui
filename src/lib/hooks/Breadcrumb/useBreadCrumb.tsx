import React from 'react';
import { AutomationBreadCrumbItemsType } from './models';

export interface BreadCrumbContextType {
  automationsBreadCrumbItems: AutomationBreadCrumbItemsType[];
  networksBreadCrumbItems: string[];
  onGoToAutomation: (_to: string) => void;
}
export function useBreadCrumbContext(): BreadCrumbContextType {
  const [automationsBreadCrumbItems, setAutomationBreadCrumbItems] = React.useState<AutomationBreadCrumbItemsType[]>([]);
  const [networksBreadCrumbItems] = React.useState<string[]>([]);

  const onGoToAutomation = (_to: AutomationBreadCrumbItemsType) => {
    if (_to === AutomationBreadCrumbItemsType.ALL) {
      setAutomationBreadCrumbItems([]);
      return;
    }
    if (!automationsBreadCrumbItems.length) {
      setAutomationBreadCrumbItems([_to]);
      return;
    }
    if (_to === automationsBreadCrumbItems[automationsBreadCrumbItems.length - 1]) return;
    setAutomationBreadCrumbItems([...automationsBreadCrumbItems, _to]);
  };

  return {
    automationsBreadCrumbItems,
    networksBreadCrumbItems,
    onGoToAutomation,
  };
}
