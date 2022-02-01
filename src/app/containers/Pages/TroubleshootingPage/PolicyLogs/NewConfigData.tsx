import React from 'react';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { PolicyLogDetailProperty, PolicyLogDetails } from './PolicyLogDetailsDialog';

interface ConfigDataProps {
  readonly oldData: PolicyLogDetails;
  readonly newData: PolicyLogDetails;
  readonly sharedProperties: PolicyLogDetailProperty[];
  readonly policyLogType: string;
}

export const NewConfigData: React.FC<ConfigDataProps> = ({ oldData, newData, sharedProperties, policyLogType }) => {
  const classes = TroubleshootingStyles();

  const getClassName = (oldData: string, newData: string) => (oldData !== newData ? classes.changedPropertyItem : classes.defaultPropertyItem);

  const getConfigProperty = (title: string, oldDataItem: string, newDataItem: string) =>
    newDataItem && (
      <div key={title} className={getClassName(oldDataItem, newDataItem)}>
        <span>{`${title}:`}</span>
        <span className={classes.propertyValue}>{newDataItem}</span>
      </div>
    );

  return <div className={classes.gridItemContent}>{sharedProperties.map(key => getConfigProperty(key.label, oldData[key.value], newData[key.value]))}</div>;
};
