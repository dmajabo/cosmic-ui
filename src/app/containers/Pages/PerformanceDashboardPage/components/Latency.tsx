import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';

interface SelectedRow {
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly averageQoe: JSX.Element;
}

interface LatencyProps {
  readonly selectedRows: SelectedRow[];
}

interface DataMetrics {
  readonly time: string;
  readonly value: string;
}
interface LatencyMetrics {
  readonly deviceId: string;
  readonly metric: DataMetrics[];
}

export const Latency: React.FC<LatencyProps> = ({ selectedRows }) => {
  const classes = PerformanceDashboardStyles();

  const [latencyMetrics, setLatencyMetrics] = useState<LatencyMetrics[]>([]);

  const apiClient = createApiClient();
  useEffect(() => {
    if (selectedRows.length > 0) {
      selectedRows.map(row => {
        const getLatencyMetrics = async () => {
          const responseData = await apiClient.getLatencyMetrics(row.sourceDevice, row.destination);
          const deviceLatencyMetrics: LatencyMetrics = {
            deviceId: responseData.metrics.resourceId,
            metric: responseData.metrics.keyedmap[0].ts,
          };
          const tempMetricsArray = latencyMetrics.concat(deviceLatencyMetrics);
          setLatencyMetrics(tempMetricsArray);
        };
        getLatencyMetrics();
      });
    }
  }, [selectedRows]);

  return (
    <div>
      <Typography className={classes.itemTitle}>Latency</Typography>
      <Typography className={classes.subTitleText}>Shows aggregated packet loss between sources.</Typography>
      <div>
        <MetricsLineChart dataValueSuffix="ms" inputData={latencyMetrics} />
      </div>
    </div>
  );
};
