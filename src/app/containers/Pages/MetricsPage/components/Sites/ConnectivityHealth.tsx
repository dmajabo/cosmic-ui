import React from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import { HealthTable } from '../HealthTable';

export const ConnectivityHealth: React.FC = () => {
  const classes = MetricsStyles();

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Connectivity Health</div>
    </div>
  );
};
