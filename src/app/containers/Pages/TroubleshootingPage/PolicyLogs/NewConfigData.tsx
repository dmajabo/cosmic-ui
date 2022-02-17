import SimpleTable from 'app/components/Basic/Table/SimpleTable';
import { IRouteResDataItem, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { INetworkRule, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import React from 'react';
import { SecurityGroupTableGridColumns } from '../../PolicyPage/Page/Inventory/Panels/models';
import RouteTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/RoutesTab/RouteTable';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { ConnectionResourceTable } from './ConnectionResourceTable';
import DevicePolicyTable from './DevicePolicyTable';
import { RESOURCE_TYPE, TABLE_HEIGHT } from './OldConfigData';
import { ConnectionResource, PolicyLogDetailProperty, PolicyLogDetails, PolicyLogRoute, Rule } from './PolicyLogDetailsDialog';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';
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
      oldData.length === newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => oldResource.extId === resource.extId);
        return isEqual(resource, selectedOldResource);
      });

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getRouteTableClassName = (oldData: PolicyLogRoute[], newData: PolicyLogRoute[]) => {
    const areArraysEqual =
      oldData.length === newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => oldResource.extId === resource.extId);
        return isEqual(resource, selectedOldResource);
      });

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getCIDRUniqueKey = (resource: INetworkRule) => `${resource.cidrs && resource.cidrs.length ? resource.cidrs[0].name : null}_${resource.fromPort}-${resource.toPort}`;

  const getRulesTableClassName = (oldData: INetworkRule[], newData: INetworkRule[]) => {
    const areArraysEqual =
      oldData.length === newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => getCIDRUniqueKey(oldResource) === getCIDRUniqueKey(resource));
        return isEqual(resource, selectedOldResource);
      });

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getDeviceRulesTableClassName = (oldData: INetworkRule[], newData: INetworkRule[]) => {
    const areArraysEqual =
      oldData.length === newData.length &&
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
      ...rule,
    }));

  const getRuleTables = (oldRules: Rule[], newRules: Rule[]) => {
    if (vendorType === VendorTypes.AWS) {
      const oldVmRules: INetworkRule[] = oldRules.map(rule => ({
        id: '',
        fromPort: rule.fromPort,
        toPort: rule.toPort,
        ipProtocol: rule.ipProtocol,
        ruleType: rule.ruleType,
        cidrs: rule.cidrs,
        ...rule,
      }));
      const newVmRules: INetworkRule[] = newRules.map(rule => ({
        id: '',
        fromPort: rule.fromPort,
        toPort: rule.toPort,
        ipProtocol: rule.ipProtocol,
        ruleType: rule.ruleType,
        cidrs: rule.cidrs,
        ...rule,
      }));
      const inboundRules = newVmRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Inbound);
      const outboundRules = newVmRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Outbound);
      return (
        <div className={getRulesTableClassName(oldVmRules, newVmRules)}>
          <div className={classes.tablePropertyTitle}>Rules</div>
          <SimpleTable
            id="inbound"
            tableTitle={PolicyTableKeyEnum.Inbound}
            data={inboundRules}
            columns={[
              { ...SecurityGroupTableGridColumns.extId, body: d => d.extId },
              { ...SecurityGroupTableGridColumns.protocol, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
              { ...SecurityGroupTableGridColumns.source, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
              { ...SecurityGroupTableGridColumns.portRange, body: (d: INetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort, 'all') },
            ]}
            scrollHeight="100%"
            styles={{ margin: '0 0 20px 0', maxHeight: '17vh' }}
            tableStyles={{ maxHeight: '100%', height: 'auto' }}
            tableClass="tableSX autoHeight"
          />
          <SimpleTable
            id="outbound"
            tableTitle={PolicyTableKeyEnum.Outbound}
            data={outboundRules}
            columns={[
              { ...SecurityGroupTableGridColumns.extId },
              { ...SecurityGroupTableGridColumns.protocol, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
              { ...SecurityGroupTableGridColumns.destination, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
              { ...SecurityGroupTableGridColumns.portRange, body: (d: INetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort, 'all') },
            ]}
            scrollHeight="100%"
            styles={{ maxHeight: '17vh' }}
            tableStyles={{ maxHeight: '100%', height: 'auto' }}
            tableClass="tableSX autoHeight"
          />
        </div>
      );
    } else {
      const oldDeviceRules: INetworkRule[] = getDeviceRules(oldRules);
      const newDeviceRules: INetworkRule[] = getDeviceRules(newRules);
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
