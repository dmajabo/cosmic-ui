import { IRouteResDataItem, PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import { INetworkRule, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import isEmpty from 'lodash/isEmpty';
import PolicyTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/PolicyTab/PolicyTable';
import RouteTable from '../../TopologyPage/TopoMapV2/PanelComponents/NodePanels/VpcPanel/VmTabs/RoutesTab/RouteTable';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { ConnectionResourceTable } from './ConnectionResourceTable';
import DevicePolicyTable from './DevicePolicyTable';
import { ConnectionResource, PolicyLogDetailProperty, PolicyLogDetails, PolicyLogRoute, Rule } from './PolicyLogDetailsDialog';

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
  MERAKI: {
    vNetworks: 'Networks',
  },
};

export const TABLE_HEIGHT: React.CSSProperties = { height: '17vh' };

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
    !isEmpty(oldDataItem) && (
      <div key={title} className={classes.defaultPropertyItem}>
        <div className={classes.tablePropertyTitle}>{title}</div>
        <ConnectionResourceTable resourceData={oldDataItem} styles={TABLE_HEIGHT} />
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
        <RouteTable data={routeTableData} styles={TABLE_HEIGHT} />
      </div>
    );
  };

  const getRuleTables = (rules: Rule[]) => {
    if (vendorType === VendorTypes.AWS) {
      const vmRules: INetworkRule[] = rules.map(rule => ({ id: '', fromPort: rule.fromPort, toPort: rule.toPort, ipProtocol: rule.ipProtocol, ruleType: rule.ruleType, cidrs: rule.cidrs, ...rule }));
      const inboundRules = vmRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Inbound);
      const outboundRules = vmRules.filter(rule => rule.ruleType === PolicyTableKeyEnum.Outbound);
      return (
        <div className={classes.defaultPropertyItem}>
          <div className={classes.tablePropertyTitle}>Rules</div>
          <PolicyTable data={inboundRules} showLoader={false} title={'Inbound'} styles={TABLE_HEIGHT} />
          <PolicyTable data={outboundRules} showLoader={false} title={'Outbound'} styles={TABLE_HEIGHT} />
        </div>
      );
    } else {
      const deviceRules: INetworkRule[] = rules.map(rule => ({
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
      return (
        <div className={classes.defaultPropertyItem}>
          <div className={classes.tablePropertyTitle}>Rules</div>
          <DevicePolicyTable data={deviceRules} showLoader={false} styles={TABLE_HEIGHT} />
        </div>
      );
    }
  };

  return (
    <div className={classes.gridItemContent}>
      {sharedProperties.map(key => getConfigProperty(key.label, oldData[key.value]))}
      {connectionProperties.map(key => {
        const vendorResourceType = RESOURCE_TYPE[vendorType][key.value] || '';
        return getConnectionProperty(vendorResourceType, oldData[key.value]);
      })}
      {!isEmpty(oldData.routes) && getRouteTable(oldData.routes)}
      {!isEmpty(oldData.rules) && getRuleTables(oldData.rules)}
    </div>
  );
};
