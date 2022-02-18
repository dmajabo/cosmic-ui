import { INetworkPortForwardingConfig } from 'lib/api/ApiModels/Topology/apiModels';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { ConfigDiffData, OneToManyNatConfig, OneToOneNatConfig } from '.';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { TABLE_HEIGHT } from './OldConfigData';
import { PortForwardingTable } from './PortForwardingTable';
import { OneToManyNATRuleTable } from './OneToManyNATRulesTable';

interface ConfigTemplateProps {
  readonly configTemplateDetails: ConfigDiffData;
}

export const ConfigTemplate: React.FC<ConfigTemplateProps> = ({ configTemplateDetails }) => {
  const classes = TroubleshootingStyles();

  const getPortForwardingConfig = (portForwardingConfig: INetworkPortForwardingConfig) =>
    portForwardingConfig
      ? !isEmpty(portForwardingConfig.portForwardingRules) && (
          <div className={classes.defaultPropertyItem}>
            <div className={classes.tablePropertyTitle}>Port Forwarding Rules</div>
            <PortForwardingTable resourceData={portForwardingConfig.portForwardingRules} styles={TABLE_HEIGHT} />
          </div>
        )
      : null;

  const getOneToOneNatConfig = (oneToOneNatConfig: OneToOneNatConfig) =>
    oneToOneNatConfig ? (
      <div className={classes.defaultPropertyItem}>
        <div className={classes.tablePropertyTitle}>One to One NAT</div>
        {!isEmpty(oneToOneNatConfig.rules) &&
          oneToOneNatConfig.rules.map(rule => (
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

  const getOneToManyNatConfig = (oneToManyNatConfig: OneToManyNatConfig) =>
    oneToManyNatConfig ? (
      <div className={classes.defaultPropertyItem}>
        <div className={classes.tablePropertyTitle}>One to Many NAT</div>
        {!isEmpty(oneToManyNatConfig.rules) &&
          oneToManyNatConfig.rules.map(rule => (
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
      {getPortForwardingConfig(configTemplateDetails.portForwardingConfig)}
      {getOneToOneNatConfig(configTemplateDetails.oneToOneNatConfig)}
      {getOneToManyNatConfig(configTemplateDetails.oneToManyNatConfig)}
    </div>
  );
};
