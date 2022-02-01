import produce from 'immer';
import { IRouteResDataItem, IVmRule, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import React from 'react';
import PolicyTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/PolicyTab/PolicyTable';
import RouteTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/RoutesTab/RouteTable';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { ConnectionResourceTable } from './ConnectionResourceTable';
import { ConnectionResource, PolicyLogDetailProperty, PolicyLogDetails, PolicyLogRoute } from './PolicyLogDetailsDialog';

interface ConfigDataProps {
  readonly oldData: PolicyLogDetails;
  readonly sharedProperties: PolicyLogDetailProperty[];
  readonly connectionProperties: PolicyLogDetailProperty[];
  readonly vendorType: string;
}

export const RESOURCE_TYPE = {
  AWS: {
    vNetworks: 'VPC',
    vms: 'Instance',
    nics: 'NIC',
    clientVpnEndpoints: 'clientVpnEndpoint',
    vpnLinks: 'TransitGatewayVpnAttachement',
    networkLinks: 'TransitGatewayVpcAttachement',
    subnets: 'Subnet',
    wedges: 'TransitGateway',
    wedgePeeringConnections: 'TransitGatewayPeeringAttachement',
  },
};

export const OldConfigData: React.FC<ConfigDataProps> = ({ oldData, sharedProperties, connectionProperties, vendorType }) => {
  const classes = TroubleshootingStyles();

  const getConfigProperty = (title: string, oldDataItem: string) =>
    oldDataItem && (
      <div key={title} className={classes.defaultPropertyItem}>
        <span>{`${title}:`}</span>
        <span className={classes.propertyValue}>{oldDataItem}</span>
      </div>
    );

  const getConnectionProperty = (title: string, oldDataItem: ConnectionResource[]) =>
    oldDataItem && (
      <div key={title} className={classes.defaultPropertyItem}>
        <div className={classes.tablePropertyTitle}>{title}</div>
        <ConnectionResourceTable resourceData={oldDataItem} />
      </div>
    );

  const getRouteTable = (routes: PolicyLogRoute[]) => {
    const routeTableData: IRouteResDataItem = {
      name: '',
      description: '',
      extId: '',
      id: '',
      routes: routes.map(route => ({ destinationCidr: route.destinationCidr, state: route.state, target: route.target })),
    };
    return (
      <div className={classes.defaultPropertyItem}>
        <div className={classes.tablePropertyTitle}>Routes</div>
        <RouteTable data={routeTableData} />
      </div>
    );
  };

  const getRuleTables = (rules: IVmRule[]) => {
    const inboundRules = rules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Inbound);
    const outboundRules = rules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Outbound);
    return (
      <div className={classes.defaultPropertyItem}>
        <div className={classes.tablePropertyTitle}>Rules</div>
        <PolicyTable data={inboundRules} showLoader={false} title={'Inbound'} />
        <PolicyTable data={outboundRules} showLoader={false} title={'Outbound'} />
      </div>
    );
  };

  return (
    <div className={classes.gridItemContent}>
      {sharedProperties.map(key => getConfigProperty(key.label, oldData[key.value]))}
      {connectionProperties.map(key => {
        const data: ConnectionResource[] = oldData[key.value]
          ? produce<ConnectionResource[]>(oldData[key.value], draft => {
              draft.forEach(resource => {
                const vendorResourceType = RESOURCE_TYPE[vendorType][key.value] || '';
                resource.resourceType = vendorResourceType;
              });
            })
          : undefined;
        return getConnectionProperty(key.label, data);
      })}
      {oldData.routes && oldData.routes.length && getRouteTable(oldData.routes)}
      {oldData.rules && oldData.rules.length && getRuleTables(oldData.rules)}
    </div>
  );
};
