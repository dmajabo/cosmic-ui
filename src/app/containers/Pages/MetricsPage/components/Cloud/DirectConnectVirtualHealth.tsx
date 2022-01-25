import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import React from 'react';
import { MetricsStyles } from '../../MetricsStyles';

interface DirectConnectVirtualHealthProps {
  readonly timeRange: LookbackSelectOption;
}

export const DirectConnectVirtualHealth: React.FC<DirectConnectVirtualHealthProps> = ({ timeRange }) => {
  const classes = MetricsStyles();

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Direct Connect Virtual Health</div>
    </div>
  );
};
