import produce from 'immer';
import { IRouteResDataItem, IVmRule, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { isEqual } from 'lodash';
import React from 'react';
import PolicyTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/PolicyTab/PolicyTable';
import RouteTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/RoutesTab/RouteTable';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { ConnectionResourceTable } from './ConnectionResourceTable';
import { RESOURCE_TYPE } from './OldConfigData';
import { ConnectionResource, PolicyLogDetailProperty, PolicyLogDetails, PolicyLogRoute } from './PolicyLogDetailsDialog';

interface ConfigDataProps {
  readonly oldData: PolicyLogDetails;
  readonly newData: PolicyLogDetails;
  readonly sharedProperties: PolicyLogDetailProperty[];
  readonly connectionProperties: PolicyLogDetailProperty[];
  readonly vendorType: string;
}

export const NewConfigData: React.FC<ConfigDataProps> = ({ oldData, newData, sharedProperties, connectionProperties, vendorType }) => {
  const classes = TroubleshootingStyles();

  const getClassName = (oldData: string, newData: string) => (oldData !== newData ? classes.changedPropertyItem : classes.defaultPropertyItem);

  const getConnectionTableClassName = (oldData: ConnectionResource[], newData: ConnectionResource[]) => {
    const areArraysEqual =
      oldData.length == newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => oldResource.extId === resource.extId);
        return isEqual(resource, selectedOldResource);
      });

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getRouteTableClassName = (oldData: PolicyLogRoute[], newData: PolicyLogRoute[]) => {
    const areArraysEqual =
      oldData.length == newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => oldResource.extId === resource.extId);
        return isEqual(resource, selectedOldResource);
      });

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getCIDRUniqueKey = (resource: IVmRule) => `${resource.cidrs && resource.cidrs.length ? resource.cidrs[0].name : null}_${resource.fromPort}-${resource.toPort}`;

  const getRulesTableClassName = (oldData: IVmRule[], newData: IVmRule[]) => {
    const areArraysEqual =
      oldData.length == newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => getCIDRUniqueKey(oldResource) === getCIDRUniqueKey(resource));
        return isEqual(resource, selectedOldResource);
      });

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getConfigProperty = (title: string, oldDataItem: string, newDataItem: string) =>
    newDataItem && (
      <div key={title} className={getClassName(oldDataItem, newDataItem)}>
        <span>{`${title}:`}</span>
        <span className={classes.propertyValue}>{newDataItem}</span>
      </div>
    );

  const getConnectionProperty = (title: string, oldDataItem: ConnectionResource[], newDataItem: ConnectionResource[]) =>
    newDataItem && (
      <div key={title} className={getConnectionTableClassName(oldDataItem, newDataItem)}>
        <div className={classes.tablePropertyTitle}>{title}</div>
        <ConnectionResourceTable resourceData={newDataItem} />
      </div>
    );

  const getRouteTable = (oldRoutes: PolicyLogRoute[], newRoutes: PolicyLogRoute[]) => {
    const routeTableData: IRouteResDataItem = {
      name: '',
      description: '',
      extId: '',
      id: '',
      routes: newRoutes.map(route => ({ destinationCidr: route.destinationCidr, state: route.state, target: route.target })),
    };
    return (
      <div className={getRouteTableClassName(oldRoutes, newRoutes)}>
        <div className={classes.tablePropertyTitle}>Routes</div>
        <RouteTable data={routeTableData} />
      </div>
    );
  };

  const getRuleTables = (oldRules: IVmRule[], newRules: IVmRule[]) => {
    const inboundRules = newRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Inbound);
    const outboundRules = newRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Outbound);
    return (
      <div className={getRulesTableClassName(oldRules, newRules)}>
        <div className={classes.tablePropertyTitle}>Rules</div>
        <PolicyTable data={inboundRules} showLoader={false} title={'Inbound'} />
        <PolicyTable data={outboundRules} showLoader={false} title={'Outbound'} />
      </div>
    );
  };

  return (
    <div className={classes.gridItemContent}>
      {sharedProperties.map(key => getConfigProperty(key.label, oldData[key.value], newData[key.value]))}
      {connectionProperties.map(key => {
        const newResourceData: ConnectionResource[] = newData[key.value]
          ? produce<ConnectionResource[]>(newData[key.value], draft => {
              draft.forEach(resource => {
                const vendorResourceType = RESOURCE_TYPE[vendorType][key.value] || '';
                resource.resourceType = vendorResourceType;
              });
            })
          : undefined;

        const oldResourceData: ConnectionResource[] = oldData[key.value]
          ? produce<ConnectionResource[]>(oldData[key.value], draft => {
              draft.forEach(resource => {
                const vendorResourceType = RESOURCE_TYPE[vendorType][key.value] || '';
                resource.resourceType = vendorResourceType;
              });
            })
          : undefined;
        return getConnectionProperty(key.label, oldResourceData, newResourceData);
      })}
      {newData.routes && newData.routes.length && getRouteTable(oldData.routes, newData.routes)}
      {newData.rules && newData.rules.length && getRuleTables(oldData.rules, newData.rules)}
    </div>
  );
};
