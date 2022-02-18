import { INetworkPortForwardingConfig, INetworkPortForwardingRule } from 'lib/api/ApiModels/Topology/apiModels';
import { startCase } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import React from 'react';
import { ConfigDiffData, OneToManyNatConfig, OneToManyNatRule, OneToOneNatConfig, OneToOneNatRule } from '.';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { TABLE_HEIGHT } from './OldConfigData';
import { OneToManyNATRuleTable } from './OneToManyNATRulesTable';
import { PortForwardingTable } from './PortForwardingTable';

interface NetworkDetailsProps {
  readonly networkDetails: ConfigDiffData;
  readonly configTemplateDetails: ConfigDiffData;
}

export const NetworkDetails: React.FC<NetworkDetailsProps> = ({ networkDetails, configTemplateDetails }) => {
  const classes = TroubleshootingStyles();

  const getPortForwardingTableClassName = (oldData: INetworkPortForwardingRule[], newData: INetworkPortForwardingRule[]) => {
    const areArraysEqual =
      oldData.length === newData.length &&
      newData.every(resource => {
        const selectedOldResource = oldData.find(oldResource => oldResource.id === resource.id);
        return isEqual(resource, selectedOldResource);
      });

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getOneToOneNATClassName = (oldData: OneToOneNatRule[], newData: OneToOneNatRule[]) => {
    const areArraysEqual =
      !isEmpty(oldData) && !isEmpty(newData)
        ? oldData.length === newData.length &&
          newData.every(resource => {
            const selectedOldResource = oldData.find(oldResource => oldResource.id === resource.id);
            return isEqual(resource, selectedOldResource);
          })
        : false;

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getOneToManyNATClassName = (oldData: OneToManyNatRule[], newData: OneToManyNatRule[]) => {
    const areArraysEqual =
      !isEmpty(oldData) && !isEmpty(newData)
        ? oldData.length === newData.length &&
          newData.every(resource => {
            const selectedOldResource = oldData.find(oldResource => oldResource.id === resource.id);
            return isEqual(resource, selectedOldResource);
          })
        : false;

    return areArraysEqual ? classes.defaultPropertyItem : classes.changedPropertyItem;
  };

  const getPortForwardingConfig = (templatePortForwardingConfig: INetworkPortForwardingConfig, networkPortForwardingConfig: INetworkPortForwardingConfig) =>
    networkPortForwardingConfig
      ? !isEmpty(networkPortForwardingConfig.portForwardingRules) && (
          <div className={getPortForwardingTableClassName(templatePortForwardingConfig.portForwardingRules, networkPortForwardingConfig.portForwardingRules)}>
            <div className={classes.tablePropertyTitle}>Port Forwarding Rules</div>
            <PortForwardingTable resourceData={networkPortForwardingConfig.portForwardingRules} styles={TABLE_HEIGHT} />
          </div>
        )
      : null;

  const getOneToOneNatConfig = (templateOneToOneNatConfig: OneToOneNatConfig, networkOneToOneNatConfig: OneToOneNatConfig) =>
    networkOneToOneNatConfig ? (
      <div className={getOneToOneNATClassName(templateOneToOneNatConfig?.rules || [], networkOneToOneNatConfig.rules)}>
        <div className={classes.tablePropertyTitle}>One to One NAT</div>
        {!isEmpty(networkOneToOneNatConfig.rules || []) &&
          networkOneToOneNatConfig.rules.map(rule => (
            <div key={rule.id}>
              <div className={classes.defaultPropertyItem}>
                <span>Name: </span>
                <span className={classes.propertyValue}>{rule.name}</span>
              </div>
              <div className={classes.defaultPropertyItem}>
                <span>Public IP: </span>
                <span className={classes.propertyValue}>{rule.publicIp}</span>
              </div>
              <div className={classes.defaultPropertyItem}>
                <span>LAN IP: </span>
                <span className={classes.propertyValue}>{rule.lanIp}</span>
              </div>
              <div className={classes.defaultPropertyItem}>
                <span>Uplink: </span>
                <span className={classes.propertyValue}>{startCase(rule.uplink)}</span>
              </div>
            </div>
          ))}
      </div>
    ) : null;

  const getOneToManyNatConfig = (templateOneToManyNatConfig: OneToManyNatConfig, networkOneToManyNATConfig: OneToManyNatConfig) =>
    networkOneToManyNATConfig ? (
      <div className={getOneToManyNATClassName(templateOneToManyNatConfig?.rules || [], networkOneToManyNATConfig.rules)}>
        <div className={classes.tablePropertyTitle}>One to Many NAT</div>
        {!isEmpty(networkOneToManyNATConfig.rules) &&
          networkOneToManyNATConfig.rules.map(rule => (
            <div key={rule.id}>
              <div className={classes.defaultPropertyItem}>
                <span>Public IP: </span>
                <span className={classes.propertyValue}>{rule.publicIp}</span>
              </div>
              <div className={classes.defaultPropertyItem}>
                <span>Uplink: </span>
                <span className={classes.propertyValue}>{startCase(rule.uplink)}</span>
              </div>
              <OneToManyNATRuleTable resourceData={rule.portRules} styles={TABLE_HEIGHT} />
            </div>
          ))}
      </div>
    ) : null;

  return (
    <div className={classes.gridItemContent}>
      {getPortForwardingConfig(configTemplateDetails.portForwardingConfig, networkDetails.portForwardingConfig)}
      {getOneToOneNatConfig(configTemplateDetails.oneToOneNatConfig, networkDetails.oneToOneNatConfig)}
      {getOneToManyNatConfig(configTemplateDetails.oneToManyNatConfig, networkDetails.oneToManyNatConfig)}
    </div>
  );
};
