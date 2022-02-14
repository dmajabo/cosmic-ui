import React, { useContext, useEffect, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../../icons/performance dashboard/info';
import LoadingIndicator from 'app/components/Loading';
import { Data } from './Table';
import Heatmap, { LegendData } from './Heatmap';
import { HeatMapData, Vnet } from 'lib/api/http/SharedTypes';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';

interface PacketLossProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
  readonly networks: Vnet[];
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
const PACKET_LOSS_LOWERBOUND = 'packetloss_lowerbound';
const PACKET_LOSS_UPPERBOUND = 'packetloss_upperbound';
const PACKET_LOSS_THRESHOLD = 'packetloss_threshold';

export const PACKET_LOSS_HEATMAP_LEGEND: LegendData[] = [
  {
    low: 0,
    high: 10,
    color: '#52984E',
  },
  {
    low: 11,
    high: 20,
    color: '#FED0AB',
  },
  {
    low: 21,
    high: 40,
    color: '#FFC568',
  },
  {
    low: 41,
    high: 50,
    color: '#F69442',
  },
  {
    low: 50,
    high: Infinity,
    color: '#DC4545',
  },
];

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedRows, timeRange, networks }) => {
  const classes = PerformanceDashboardStyles();

  const [packetLossData, setPacketLossData] = useState<MetricKeyValue>({});
  const [heatMapPacketLoss, setHeatMapPacketLoss] = useState<HeatMapData[]>([]);

  const testIdToName: TestIdToName = selectedRows.reduce((accu, nextValue) => {
    accu[nextValue.id] = nextValue.name;
    return accu;
  }, {});

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  useEffect(() => {
    const getPacketLossMetrics = async () => {
      const packetLossChartData: MetricKeyValue = {};
      const promises = selectedRows.map(row => apiClient.getPacketLossMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          packetLossChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS)?.ts || [];
          packetLossChartData[`${item.testId}_anomaly`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_ANOMALY)?.ts || [];
          packetLossChartData[`${item.testId}_upperbound`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_UPPERBOUND)?.ts || [];
          packetLossChartData[`${item.testId}_lowerbound`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_LOWERBOUND)?.ts || [];
          packetLossChartData[`${item.testId}_threshold`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_THRESHOLD)?.ts || [];
        });
        setPacketLossData(packetLossChartData);
      });
    };

    const getHeatMapPacketLoss = async () => {
      const promises = selectedRows.map(row => {
        const rowNetworkId = networks.find(network => network.name === row.sourceNetwork)?.extId || '';
        return apiClient.getHeatmapPacketLoss(rowNetworkId, row.destination, timeRange, row.id);
      });
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
          <div className={classes.itemTitle}>Packet Loss summary</div>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {!isEmpty(selectedRows) ? (
          // packetLossData contains 5 keys for each row. One for the data, one for anomaly, one for upperbound,one for lowerbound and one for threshold
          Object.keys(packetLossData).length / 5 === selectedRows.length ? (
            <MetricsLineChart dataValueSuffix="%" selectedRows={selectedRows} inputData={packetLossData} />
          ) : (
            <div className={classes.noChartContainer}>
              <LoadingIndicator />
            </div>
          )
        ) : (
          <div className={classes.noChartContainer}>
            <span className={classes.noChartText}>To see the data select SLA Tests on top</span>
          </div>
        )}
      </div>
      <hr className={classes.hrLine} />
      <div className={classes.flexContainer}>
        <div>
          <span className={classes.itemTitle}>Average packet loss</span>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {!isEmpty(selectedRows) ? (
          heatMapPacketLoss.length === selectedRows.length ? (
            <Heatmap data={heatMapPacketLoss} selectedRows={testIdToName} legendData={PACKET_LOSS_HEATMAP_LEGEND} dataSuffix="%" />
          ) : (
            <div className={classes.noChartContainer}>
              <LoadingIndicator />
            </div>
          )
        ) : (
          <div className={classes.noChartContainer}>
            <span className={classes.noChartText}>To see the data select SLA Tests on top</span>
          </div>
        )}
      </div>
    </div>
  );
};
