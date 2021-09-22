import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../icons/info.svg';
import LoadingIndicator from '../../../../components/Loading';
import { Data } from './Table';

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

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [packetLossData, setPacketLossData] = useState<MetricKeyValue>({});

  const apiClient = createApiClient();
  useEffect(() => {
    if (selectedRows.length > 0) {
      const getPacketLossMetrics = async () => {
        const packetLossChartData: MetricKeyValue = {};
        for (let i = 0; i < selectedRows.length; i++) {
          try {
            const responseData = await apiClient.getPacketLossMetrics(selectedRows[i].sourceDevice, selectedRows[i].destination, timeRange);

            packetLossChartData[selectedRows[i].id] = responseData.metrics.keyedmap[0].ts;
          } catch {}
        }
        setPacketLossData(packetLossChartData);
      };
      getPacketLossMetrics();
    }

    return () => {
      setPacketLossData({});
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
          Object.keys(packetLossData).length === selectedRows.length ? (
            <MetricsLineChart dataValueSuffix="ms" selectedRows={selectedRows} inputData={packetLossData} />
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
