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

interface PacketLossProps {
  readonly selectedRows: SelectedRow[];
}

interface DataMetrics {
  readonly time: string;
  readonly value: string;
}
interface PacketLossMetrics {
  readonly deviceId: string;
  readonly metric: DataMetrics[];
}

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedRows }) => {
  const classes = PerformanceDashboardStyles();

  const [packetLossMetrics, setPacketLossMetrics] = useState<PacketLossMetrics[]>([]);

  const apiClient = createApiClient();
  useEffect(() => {
    if (selectedRows.length > 0) {
      selectedRows.map(row => {
        const getPacketLossMetrics = async () => {
          const responseData = await apiClient.getPacketLossMetrics(row.sourceDevice, row.destination);
          const devicePacketLossMetrics: PacketLossMetrics = {
            deviceId: responseData.metrics.resourceId,
            metric: responseData.metrics.keyedmap[0].ts,
          };
          const tempMetricsArray = packetLossMetrics.concat(devicePacketLossMetrics);
          setPacketLossMetrics(tempMetricsArray);
        };
        getPacketLossMetrics();
      });
    }
  }, [selectedRows]);

  return (
    <div>
      <Typography className={classes.itemTitle}>Packet Loss</Typography>
      <Typography className={classes.subTitleText}>Shows aggregated packet loss between sources.</Typography>
      <div>
        <MetricsLineChart dataValueSuffix="%" inputData={packetLossMetrics} />
      </div>
    </div>
  );
};
