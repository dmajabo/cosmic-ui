import React, { useContext, useEffect, useRef, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import LoadingIndicator from 'app/components/Loading';
import { MetricKeyValue } from './PacketLoss';
import { LegendData } from './Heatmap';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { useHistory } from 'react-router-dom';
import { LocationState } from '../..';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { checkforNoData } from './filterFunctions';
import { SelectedNetworkMetricsData } from './PerformanceDashboard';

interface LatencyProps {
  readonly selectedNetworksMetricsData: SelectedNetworkMetricsData[];
  readonly timeRange: string;
}

const LATENCY = 'latency';
const LATENCY_ANOMALY = 'latency_anomaly';
const LATENCY_LOWERBOUND = 'latency_lowerbound';
const LATENCY_UPPERBOUND = 'latency_upperbound';
const LATENCY_THRESHOLD = 'latency_threshold';

export const LATENCY_HEATMAP_LEGEND: LegendData[] = [
  {
    low: 0.01,
    high: 75,
    color: '#52984E',
  },
  {
    low: 75.01,
    high: 150,
    color: '#FED0AB',
  },
  {
    low: 150.01,
    high: Infinity,
    color: '#DC4545',
  },
];

export const Latency: React.FC<LatencyProps> = ({ selectedNetworksMetricsData, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [latencyData, setLatencyData] = useState<MetricKeyValue>({});
  const [anomalyCount, setAnomalyCount] = useState<number>(0);

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  const history = useHistory();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (history && history && history.location.state) {
      const state = history.location.state as LocationState;
      if (state.anomalyType === ModelalertType.ANOMALY_LATENCY) {
        scrollRef.current.scrollIntoView();
      }
    }
  }, []);

  useEffect(() => {
    const getLatencyMetrics = async () => {
      const latencyChartData: MetricKeyValue = {};
      let totalAnomalyCount = 0;
      const promises = selectedNetworksMetricsData.map(row => apiClient.getLatencyMetrics(row.deviceString, row.destination, timeRange, row.label));
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

    getLatencyMetrics();

    return () => {
      setLatencyData({});
    };
  }, [selectedNetworksMetricsData, timeRange]);

  return (
    <>
      <div ref={scrollRef} className={classes.metricComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Latency summary</div>
        <div className={classes.pillContainer}>
          <span className={classes.pillText}>{anomalyCount}</span>
        </div>
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {!isEmpty(selectedNetworksMetricsData) ? (
          // latencyData contains 5 keys for each row. One for the data, one for anomaly, one for upperbound, one for lowerbound and one for threshold
          Object.keys(latencyData).length / 5 === selectedNetworksMetricsData.length ? (
            checkforNoData(latencyData) ? (
              <EmptyText>No Data</EmptyText>
            ) : (
              <Chart>
                <MetricsLineChart dataValueSuffix="ms" selectedNetworksMetricsData={selectedNetworksMetricsData} inputData={latencyData} />
              </Chart>
            )
          ) : (
            <LoadingIndicator margin="auto" />
          )
        ) : (
          <EmptyText> To see the data select SLA Tests</EmptyText>
        )}
      </ChartContainerStyles>
    </>
  );
};
