import React from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';

export const MetricsExplorer: React.FC = () => {
  const classes = AnalyticsStyles();

  return (
    <div className={classes.metricsExplorerContainer}>
      <div className={classes.leftBox}></div>
      <div className={classes.rightBox}>Right</div>
    </div>
  );
};
