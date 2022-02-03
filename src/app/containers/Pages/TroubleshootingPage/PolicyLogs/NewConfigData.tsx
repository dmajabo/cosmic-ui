import { IDeviceRule, IRouteResDataItem, IVmRule, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import React from 'react';
import PolicyTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/PolicyTab/PolicyTable';
import RouteTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/RoutesTab/RouteTable';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { ConnectionResourceTable } from './ConnectionResourceTable';
import DevicePolicyTable from './DevicePolicyTable';
import { RESOURCE_TYPE, TABLE_HEIGHT } from './OldConfigData';
import { ConnectionResource, PolicyLogDetailProperty, PolicyLogDetails, PolicyLogRoute, Rule } from './PolicyLogDetailsDialog';

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

  const getDeviceRulesTableClassName = (oldData: IDeviceRule[], newData: IDeviceRule[]) => {
    const areArraysEqual =
      oldData.length == newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => oldResource.name === resource.name);
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
    !isEmpty(newDataItem) && (
      <div key={title} className={getConnectionTableClassName(oldDataItem, newDataItem)}>
        <div className={classes.tablePropertyTitle}>{title}</div>
        <ConnectionResourceTable resourceData={newDataItem} styles={TABLE_HEIGHT} />
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
        <RouteTable data={routeTableData} styles={TABLE_HEIGHT} />
      </div>
    );
  };

  const getDeviceRules = (rules: Rule[]) =>
    rules.map(rule => ({
      id: '',
      name: rule.name,
      ruleType: rule.ruleType,
      fromPort: rule.fromPort.toString(),
      toPort: rule.toPort.toString(),
      ipProtocol: rule.ipProtocol,
      cidrs: rule.cidrs,
      destCidrs: rule.destCidrs,
      srcCidrs: rule.srcCidrs,
      syslogEnabled: rule.syslogEnabled,
      comment: rule.comment,
      policy: rule.policy,
    }));

  const getRuleTables = (oldRules: Rule[], newRules: Rule[]) => {
    if (vendorType === VendorTypes.AWS) {
      const oldVmRules: IVmRule[] = oldRules.map(rule => ({ id: '', fromPort: rule.fromPort, toPort: rule.toPort, ipProtocol: rule.ipProtocol, ruleType: rule.ruleType, cidrs: rule.cidrs }));
      const newVmRules: IVmRule[] = newRules.map(rule => ({ id: '', fromPort: rule.fromPort, toPort: rule.toPort, ipProtocol: rule.ipProtocol, ruleType: rule.ruleType, cidrs: rule.cidrs }));
      const inboundRules = newVmRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Inbound);
      const outboundRules = newVmRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Outbound);
      return (
        <div className={getRulesTableClassName(oldVmRules, newVmRules)}>
          <div className={classes.tablePropertyTitle}>Rules</div>
          <PolicyTable data={inboundRules} showLoader={false} title={'Inbound'} styles={TABLE_HEIGHT} />
          <PolicyTable data={outboundRules} showLoader={false} title={'Outbound'} styles={TABLE_HEIGHT} />
        </div>
      );
    } else {
      const oldDeviceRules: IDeviceRule[] = getDeviceRules(oldRules);
      const newDeviceRules: IDeviceRule[] = getDeviceRules(newRules);
      return (
        <div className={getDeviceRulesTableClassName(oldDeviceRules, newDeviceRules)}>
          <div className={classes.tablePropertyTitle}>Rules</div>
          <DevicePolicyTable data={newDeviceRules} showLoader={false} styles={TABLE_HEIGHT} />
        </div>
      );
    }
  };

  return (
    <div className={classes.gridItemContent}>
      {sharedProperties.map(key => getConfigProperty(key.label, oldData[key.value], newData[key.value]))}
      {connectionProperties.map(key => {
        const vendorResourceType = RESOURCE_TYPE[vendorType][key.value] || '';
        return getConnectionProperty(vendorResourceType, oldData[key.value], newData[key.value]);
      })}
      {!isEmpty(newData.routes) && getRouteTable(oldData.routes, newData.routes)}
      {!isEmpty(newData.rules) && getRuleTables(oldData.rules, newData.rules)}
    </div>
  );
};
