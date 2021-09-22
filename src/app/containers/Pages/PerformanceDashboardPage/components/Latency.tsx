import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../icons/info.svg';
import LoadingIndicator from '../../../../components/Loading';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';

interface LatencyProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
}

export const Latency: React.FC<LatencyProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [latencyData, setLatencyData] = useState<MetricKeyValue>({});

  const apiClient = createApiClient();
  useEffect(() => {
    if (selectedRows.length > 0) {
      const getLatencyMetrics = async () => {
        const latencyChartData: MetricKeyValue = {};
        for (let i = 0; i < selectedRows.length; i++) {
          const responseData = await apiClient.getLatencyMetrics(selectedRows[i].sourceDevice, selectedRows[i].destination, timeRange);
          latencyChartData[selectedRows[i].id] = responseData.metrics.keyedmap[0].ts;
        }
        setLatencyData(latencyChartData);
      };
      getLatencyMetrics();
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
        {selectedRows.length > 0 ? (
          Object.keys(latencyData).length === selectedRows.length ? (
            <MetricsLineChart dataValueSuffix="ms" selectedRows={selectedRows} inputData={latencyData} />
          ) : (
            <div className={classes.noChartContainer}>
              <LoadingIndicator />
            </div>
          )
        ) : (
          <div className={classes.noChartContainer}>
            <Typography className={classes.noChartText}>To see the data select SLA Tests on top</Typography>
          </div>
        )}
      </div>
    </div>
  );
};
