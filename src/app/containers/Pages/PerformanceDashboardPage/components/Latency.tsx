import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../icons/info.svg';
import LoadingIndicator from '../../../../components/Loading';
import { MetricKeyValue, TestIdToName } from './PacketLoss';
import { Data } from './Table';
import Heatmap from './Heatmap';
import { HeatMapData } from '../SharedTypes';

interface LatencyProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
}

export const Latency: React.FC<LatencyProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [latencyData, setLatencyData] = useState<MetricKeyValue>({});
  const [heatMapLatency, setHeatMapLatency] = useState<HeatMapData[]>([]);

  const apiClient = createApiClient();

  const testIdToName: TestIdToName = {};
  selectedRows.forEach(row => (testIdToName[row.id] = row.name));

  useEffect(() => {
    const getLatencyMetrics = async () => {
      const latencyChartData: MetricKeyValue = {};
      const promises = selectedRows.map(row => apiClient.getLatencyMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => (latencyChartData[item.testId] = item.metrics.keyedmap.length > 0 ? item.metrics.keyedmap[0].ts : []));
        setLatencyData(latencyChartData);
      });
    };

    const getHeatMapLatency = async () => {
      const promises = selectedRows.map(row => apiClient.getHeatmapLatency(row.sourceNetwork, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        const heatMapLatency: HeatMapData[] = values.map(item => {
          return {
            testId: item.testId,
            metrics: item.avgMetric.resourceMetric,
          };
        });
        setHeatMapLatency(heatMapLatency);
      });
    };

    getLatencyMetrics();
    getHeatMapLatency();

    return () => {
      setLatencyData({});
      setHeatMapLatency([]);
    };
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
      <hr className={classes.hrLine} />
      <div className={classes.flexContainer}>
        <div>
          <Typography className={classes.itemTitle}>
            Median latency
            <span className={classes.sortIcon}>
              <img src={InfoIcon} alt="ínfo" />
            </span>
          </Typography>
          <Typography className={classes.subTitleText}>Shows aggregated latency between branches and applications.</Typography>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {selectedRows.length > 0 ? (
          heatMapLatency.length === selectedRows.length ? (
            <Heatmap data={heatMapLatency} selectedRows={testIdToName} dataSuffix="ms" />
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
