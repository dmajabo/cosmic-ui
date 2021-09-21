import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../icons/info.svg';

interface SelectedRow {
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly averageQoe: JSX.Element;
}

interface PacketLossProps {
  readonly selectedRows: SelectedRow[];
  readonly timeRange: string;
}

interface DataMetrics {
  readonly time: string;
  readonly value: string;
}
interface PacketLossMetrics {
  readonly deviceId: string;
  readonly metric: DataMetrics[];
}

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [packetLossMetrics, setPacketLossMetrics] = useState<PacketLossMetrics[]>([]);

  const apiClient = createApiClient();
  useEffect(() => {
    if (selectedRows.length > 0) {
      selectedRows.map(row => {
        const getPacketLossMetrics = async () => {
          const responseData = await apiClient.getPacketLossMetrics(row.sourceDevice, row.destination, timeRange);
          const devicePacketLossMetrics: PacketLossMetrics = {
            deviceId: responseData.metrics.resourceId,
            metric: responseData.metrics.keyedmap[0].ts,
          };
          setPacketLossMetrics([devicePacketLossMetrics]);
        };
        getPacketLossMetrics();
      });
    } else {
      setPacketLossMetrics([]);
    }
  }, [selectedRows, timeRange]);

  console.log(packetLossMetrics);

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
        <MetricsLineChart dataValueSuffix="%" inputData={packetLossMetrics} />
      </div>
    </div>
  );
};
