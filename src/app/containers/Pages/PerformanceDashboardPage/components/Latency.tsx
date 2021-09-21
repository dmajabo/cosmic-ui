import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../icons/info.svg';
import Select from 'react-select';

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
  readonly timeRange: string;
}

interface DataMetrics {
  readonly time: string;
  readonly value: string;
}
interface LatencyMetrics {
  readonly deviceId: string;
  readonly metric: DataMetrics[];
}

export const Latency: React.FC<LatencyProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [latencyMetrics, setLatencyMetrics] = useState<LatencyMetrics[]>([]);

  const apiClient = createApiClient();
  useEffect(() => {
    if (selectedRows.length > 0) {
      selectedRows.map(row => {
        const getLatencyMetrics = async () => {
          const responseData = await apiClient.getLatencyMetrics(row.sourceDevice, row.destination, timeRange);
          const deviceLatencyMetrics: LatencyMetrics = {
            deviceId: responseData.metrics.resourceId,
            metric: responseData.metrics.keyedmap[0].ts,
          };
          setLatencyMetrics([deviceLatencyMetrics]);
        };
        getLatencyMetrics();
      });
    } else {
      setLatencyMetrics([]);
    }
  }, [selectedRows, timeRange]);

  return (
    <div>
      <div className={classes.flexContainer}>
        <div>
          <Typography className={classes.itemTitle}>
            Latency summary
            <span className={classes.sortIcon}>
              <img src={InfoIcon} alt="ínfo" />
            </span>
          </Typography>
          <Typography className={classes.subTitleText}>Shows aggregated latency between sources.</Typography>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        <MetricsLineChart dataValueSuffix="ms" inputData={latencyMetrics} />
      </div>
    </div>
  );
};
