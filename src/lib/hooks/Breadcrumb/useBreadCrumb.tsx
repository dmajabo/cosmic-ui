import React from 'react';
import { AutomationBreadCrumbItemsType, EdgesBreadCrumbItemsType } from './models';

export interface BreadCrumbContextType {
  automationsBreadCrumbItems: AutomationBreadCrumbItemsType[];
  networksBreadCrumbItems: string[];
  edgesBreadCrumbItems: EdgesBreadCrumbItemsType[];
  onGoToAutomation: (_to: string) => void;
  onGoToEdges: (_to: string) => void;
}
export function useBreadCrumbContext(): BreadCrumbContextType {
  const [automationsBreadCrumbItems, setAutomationBreadCrumbItems] = React.useState<AutomationBreadCrumbItemsType[]>([]);
  const [edgesBreadCrumbItems, setEdgesBreadCrumbItems] = React.useState<EdgesBreadCrumbItemsType[]>([]);
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

  const onGoToEdges = (_to: EdgesBreadCrumbItemsType) => {
    if (_to === EdgesBreadCrumbItemsType.EDGES) {
      setEdgesBreadCrumbItems([]);
      return;
    }
    if (!automationsBreadCrumbItems.length) {
      setEdgesBreadCrumbItems([_to]);
      return;
    }
    if (_to === edgesBreadCrumbItems[edgesBreadCrumbItems.length - 1]) return;
    setEdgesBreadCrumbItems([...edgesBreadCrumbItems, _to]);
  };

  return {
    automationsBreadCrumbItems,
    edgesBreadCrumbItems,
    networksBreadCrumbItems,
    onGoToAutomation,
    onGoToEdges,
  };
}
