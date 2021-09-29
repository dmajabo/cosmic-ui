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

const heatMapData: HeatMapData[] = [
  {
    testId: 'Test 1',
    metrics: [
      {
        deviceName: 'Device 1',
        value: 10,
      },
      {
        deviceName: 'Device 2',
        value: 9,
      },
    ],
  },
  {
    testId: 'Test 2',
    metrics: [
      {
        deviceName: 'Device 3',
        value: 15,
      },
    ],
  },
];

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [packetLossData, setPacketLossData] = useState<MetricKeyValue>({});

  const apiClient = createApiClient();
  useEffect(() => {
    const getPacketLossMetrics = async () => {
      const packetLossChartData: MetricKeyValue = {};
      const promises = selectedRows.map(row => apiClient.getPacketLossMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          if (item.metrics.keyedmap.length > 0) {
            packetLossChartData[item.testId] = item.metrics.keyedmap[0].ts;
          } else {
            packetLossChartData[item.testId] = [];
          }
        });
        setPacketLossData(packetLossChartData);
      });
    };
    getPacketLossMetrics();

    return () => setPacketLossData({});
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
          Object.keys(packetLossData).length === selectedRows.length ? (
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
      <hr style={{ backgroundColor: '#CBD2DC' }} />
      <div className={classes.flexContainer}>
        <div className={classes.lineChartContainer}>
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
          <Heatmap data={heatMapData} selectedRows={selectedRows} dataSuffix="%" />
        ) : (
          <div className={classes.noChartContainer}>
            <Typography className={classes.noChartText}>To see the data select SLA Tests on top</Typography>
          </div>
        )}
      </div>
    </div>
  );
};
