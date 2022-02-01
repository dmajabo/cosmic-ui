import React from 'react';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { PolicyLogDetailProperty, PolicyLogDetails } from './PolicyLogDetailsDialog';

interface ConfigDataProps {
  readonly oldData: PolicyLogDetails;
  readonly sharedProperties: PolicyLogDetailProperty[];
  readonly policyLogType: string;
}

export const OldConfigData: React.FC<ConfigDataProps> = ({ oldData, sharedProperties, policyLogType }) => {
  const classes = TroubleshootingStyles();

  const getConfigProperty = (title: string, oldDataItem: string) =>
    oldDataItem && (
      <div key={title} className={classes.defaultPropertyItem}>
        <span>{`${title}:`}</span>
        <span className={classes.propertyValue}>{oldDataItem}</span>
      </div>
    );

  return <div className={classes.gridItemContent}>{sharedProperties.map(key => getConfigProperty(key.label, oldData[key.value]))}</div>;
};
