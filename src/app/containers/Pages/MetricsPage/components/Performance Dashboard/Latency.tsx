import React, { useContext, useEffect, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../../icons/performance dashboard/info';
import LoadingIndicator from 'app/components/Loading';
import { MetricKeyValue, TestIdToName } from './PacketLoss';
import { Data } from './Table';
import Heatmap, { LegendData } from './Heatmap';
import { HeatMapData, Vnet } from 'lib/api/http/SharedTypes';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { GridLabel } from 'app/containers/Pages/TrafficPage/SessionPage/Table/styles';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';

interface LatencyProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
  readonly networks: Vnet[];
}

const LATENCY = 'latency';
const LATENCY_ANOMALY = 'latency_anomaly';
const LATENCY_LOWERBOUND = 'latency_lowerbound';
const LATENCY_UPPERBOUND = 'latency_upperbound';
const LATENCY_THRESHOLD = 'latency_threshold';

export const LATENCY_HEATMAP_LEGEND: LegendData[] = [
  {
    low: 0.01,
    high: 30,
    color: '#52984E',
  },
  {
    low: 30.01,
    high: 50,
    color: '#FED0AB',
  },
  {
    low: 50.01,
    high: 80,
    color: '#FFC568',
  },
  {
    low: 80.01,
    high: 120,
    color: '#F69442',
  },
  {
    low: 120.01,
    high: Infinity,
    color: '#DC4545',
  },
];

export const Latency: React.FC<LatencyProps> = ({ selectedRows, timeRange, networks }) => {
  const classes = PerformanceDashboardStyles();

  const [latencyData, setLatencyData] = useState<MetricKeyValue>({});
  const [anomalyCount, setAnomalyCount] = useState<number>(0);
  const [heatMapLatency, setHeatMapLatency] = useState<HeatMapData[]>([]);

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  const testIdToName: TestIdToName = selectedRows.reduce((accu, nextValue) => {
    accu[nextValue.id] = nextValue.name;
    return accu;
  }, {});

  useEffect(() => {
    const getLatencyMetrics = async () => {
      const latencyChartData: MetricKeyValue = {};
      let totalAnomalyCount = 0;
      const promises = selectedRows.map(row => apiClient.getLatencyMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          const anomalyArray = item.metrics.keyedmap.find(item => item.key === LATENCY_ANOMALY)?.ts || [];
          totalAnomalyCount = totalAnomalyCount + anomalyArray.length;
          latencyChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === LATENCY)?.ts || [];
          latencyChartData[`${item.testId}_anomaly`] = anomalyArray;
          latencyChartData[`${item.testId}_upperbound`] = item.metrics.keyedmap.find(item => item.key === LATENCY_UPPERBOUND)?.ts || [];
          latencyChartData[`${item.testId}_lowerbound`] = item.metrics.keyedmap.find(item => item.key === LATENCY_LOWERBOUND)?.ts || [];
          latencyChartData[`${item.testId}_threshold`] = item.metrics.keyedmap.find(item => item.key === LATENCY_THRESHOLD)?.ts || [];
        });
        setLatencyData(latencyChartData);
        setAnomalyCount(totalAnomalyCount);
      });
    };

    const getHeatMapLatency = async () => {
      const promises = selectedRows.map(row => {
        const rowNetworkId = networks.find(network => network.name === row.sourceNetwork)?.extId || '';
        return apiClient.getHeatmapLatency(rowNetworkId, row.destination, timeRange, row.id);
      });
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
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Latency summary</div>
        <div className={classes.pillContainer}>
          <span className={classes.pillText}>{anomalyCount}</span>
        </div>
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {!isEmpty(selectedRows) ? (
          // latencyData contains 5 keys for each row. One for the data, one for anomaly, one for upperbound, one for lowerbound and one for threshold
          Object.keys(latencyData).length / 5 === selectedRows.length ? (
            <Chart>
              <MetricsLineChart dataValueSuffix="ms" selectedRows={selectedRows} inputData={latencyData} />
            </Chart>
          ) : (
            <LoadingIndicator margin="auto" />
          )
        ) : (
          <EmptyText> To see the data select SLA Tests</EmptyText>
        )}
      </ChartContainerStyles>
    </div>
  );
};
