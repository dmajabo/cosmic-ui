import { isArray, startCase } from 'lodash';
import React from 'react';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { PolicyLogDetails } from './PolicyLogDetailsDialog';

interface ConfigDataProps {
  readonly oldData: PolicyLogDetails;
  readonly newData: PolicyLogDetails;
}

const ARRAY_DETAILS = ['routes', 'rules', 'vNetworks', 'clientVpnEndpoints'];

export const NewConfigData: React.FC<ConfigDataProps> = ({ oldData, newData }) => {
  const classes = TroubleshootingStyles();

  const getClassName = (oldData: string, newData: string) => (oldData !== newData ? classes.changedPropertyItem : classes.defaultPropertyItem);

  const getConfigProperty = (title: string, oldDataItem: string, newDataItem: string) => (
    <div key={title} className={getClassName(oldDataItem, newDataItem)}>
      <span>{`${title}:`}</span>
      <span className={classes.propertyValue}>{newDataItem}</span>
    </div>
  );

  return (
    <div className={classes.gridItemContent}>
      {Object.keys(newData)
        .filter(key => !isArray(newData[key]))
        .map(key => getConfigProperty(startCase(key), oldData[key], newData[key]))}
    </div>
  );
};
