import { isArray, startCase } from 'lodash';
import React from 'react';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { PolicyLogDetails } from './PolicyLogDetailsDialog';

interface ConfigDataProps {
  readonly oldData: PolicyLogDetails;
}

const ARRAY_DETAILS = ['routes', 'rules', 'vNetworks', 'clientVpnEndpoints'];

export const OldConfigData: React.FC<ConfigDataProps> = ({ oldData }) => {
  const classes = TroubleshootingStyles();

  const getConfigProperty = (title: string, oldDataItem: string) => (
    <div key={title} className={classes.defaultPropertyItem}>
      <span>{`${title}:`}</span>
      <span className={classes.propertyValue}>{oldDataItem}</span>
    </div>
  );

  return (
    <div className={classes.gridItemContent}>
      {Object.keys(oldData)
        .filter(key => !isArray(oldData[key]))
        .map(key => getConfigProperty(startCase(key), oldData[key]))}
    </div>
  );
};
