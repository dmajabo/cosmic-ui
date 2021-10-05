import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../icons/info.svg';
import LoadingIndicator from '../../../../components/Loading';
import { Data } from './Table';
import Heatmap from './Heatmap';
import { HeatMapData } from '../SharedTypes';

interface PacketLossProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
}

interface DataMetrics {
  readonly time: string;
  readonly value: string;
}

export interface MetricKeyValue {
  [id: string]: DataMetrics[];
}

export interface TestIdToName {
  [id: string]: string;
}

const PACKET_LOSS = 'packetloss';

const PACKET_LOSS_ANOMALY = 'packetloss_anomaly';

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [packetLossData, setPacketLossData] = useState<MetricKeyValue>({});
  const [heatMapPacketLoss, setHeatMapPacketLoss] = useState<HeatMapData[]>([]);

  const testIdToName: TestIdToName = selectedRows.reduce((accu, nextValue) => {
    accu[nextValue.id] = nextValue.name;
    return accu;
  }, {});

  const apiClient = createApiClient();

  useEffect(() => {
    const getPacketLossMetrics = async () => {
      const packetLossChartData: MetricKeyValue = {};
      const promises = selectedRows.map(row => apiClient.getPacketLossMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          packetLossChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS)?.ts || [];
          packetLossChartData[`${item.testId}_anomaly`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_ANOMALY)?.ts || [];
        });
        setPacketLossData(packetLossChartData);
      });
    };

    const getHeatMapPacketLoss = async () => {
      const promises = selectedRows.map(row => apiClient.getHeatmapPacketLoss(row.sourceNetwork, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        const heatMapPacketLoss: HeatMapData[] = values.map(item => {
          return {
            testId: item.testId,
            metrics: item.avgMetric.resourceMetric,
          };
        });
        setHeatMapPacketLoss(heatMapPacketLoss);
      });
    };

    getPacketLossMetrics();
    getHeatMapPacketLoss();

    return () => {
      setPacketLossData({});
      setHeatMapPacketLoss([]);
    };
  }, [selectedRows, timeRange]);

  return (
    <div>
      <div className={classes.flexContainer}>
        <div>
          <Typography className={classes.itemTitle}>
            Packet Loss summary
            <span className={classes.sortIcon}>
              <img src={InfoIcon} alt="ínfo" />
            </span>
          </Typography>
          <Typography className={classes.subTitleText}>Shows aggregated packet loss between sources.</Typography>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {selectedRows.length > 0 ? (
          // packetLossData contains 2 keys for each row. One for the data and one for anomaly
          Object.keys(packetLossData).length / 2 === selectedRows.length ? (
            <MetricsLineChart dataValueSuffix="%" selectedRows={selectedRows} inputData={packetLossData} />
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
            Average packet loss
            <span className={classes.sortIcon}>
              <img src={InfoIcon} alt="ínfo" />
            </span>
          </Typography>
          <Typography className={classes.subTitleText}>Shows aggregated packet loss between branches and applications.</Typography>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {selectedRows.length > 0 ? (
          heatMapPacketLoss.length === selectedRows.length ? (
            <Heatmap data={heatMapPacketLoss} selectedRows={testIdToName} dataSuffix="%" />
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
