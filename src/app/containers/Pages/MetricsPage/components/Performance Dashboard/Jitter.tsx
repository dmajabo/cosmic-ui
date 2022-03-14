import React, { useContext, useEffect, useRef, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import { MetricKeyValue } from './PacketLoss';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { LegendData } from './Heatmap';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { useHistory } from 'react-router-dom';
import { LocationState } from '../..';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { checkforNoData } from './filterFunctions';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { SelectedNetworkMetricsData } from './PerformanceDashboard';

interface JitterProps {
  readonly selectedNetworksMetricsData: SelectedNetworkMetricsData[];
  readonly timeRange: string;
}

const JITTER = 'jitter';
const JITTER_ANOMALY = 'jitter_anomaly';
const JITTER_LOWERBOUND = 'jitter_lowerbound';
const JITTER_UPPERBOUND = 'jitter_upperbound';
const JITTER_THRESHOLD = 'jitter_threshold';

export const JITTER_HEATMAP_LEGEND: LegendData[] = [
  {
    low: 100,
    high: Infinity,
    color: '#52984E',
  },
  {
    low: 75,
    high: 99.99,
    color: '#FED0AB',
  },
  {
    low: 25,
    high: 74.99,
    color: '#FFC568',
  },
  {
    low: 10,
    high: 24.99,
    color: '#F69442',
  },
  {
    low: 0,
    high: 9.99,
    color: '#DC4545',
  },
];

export const Jitter: React.FC<JitterProps> = ({ selectedNetworksMetricsData, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [jitterData, setJitterData] = useState<MetricKeyValue>({});
  const [anomalyCount, setAnomalyCount] = useState<number>(0);

  const userContext = useContext<UserContextState>(UserContext);

  const apiClient = createApiClient(userContext.accessToken!);

  const history = useHistory();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (history && history && history.location.state) {
      const state = history.location.state as LocationState;
      if (state.anomalyType === ModelalertType.ANOMALY_JITTER) {
        scrollRef.current.scrollIntoView();
      }
    }
  }, []);

  useEffect(() => {
    const getJitterMetrics = async () => {
      const jitterChartData: MetricKeyValue = {};
      let totalAnomalyCount = 0;
      const promises = selectedNetworksMetricsData.map(row => (row.deviceString ? apiClient.getJitterMetrics(row.deviceString, row.destination, timeRange, row.label) : null));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          const anomalyArray = item.metrics.keyedmap.find(item => item.key === JITTER_ANOMALY)?.ts || [];
          totalAnomalyCount = totalAnomalyCount + anomalyArray.length;
          jitterChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === JITTER)?.ts || [];
          jitterChartData[`${item.testId}_anomaly`] = anomalyArray;
          jitterChartData[`${item.testId}_upperbound`] = item.metrics.keyedmap.find(item => item.key === JITTER_UPPERBOUND)?.ts || [];
          jitterChartData[`${item.testId}_lowerbound`] = item.metrics.keyedmap.find(item => item.key === JITTER_LOWERBOUND)?.ts || [];
          jitterChartData[`${item.testId}_threshold`] = item.metrics.keyedmap.find(item => item.key === JITTER_THRESHOLD)?.ts || [];
        });
        setJitterData(jitterChartData);
        setAnomalyCount(totalAnomalyCount);
      });
    };

    getJitterMetrics();

    return () => {
      setJitterData({});
    };
  }, [selectedNetworksMetricsData, timeRange]);

  return (
    <>
      <div ref={scrollRef} className={classes.metricComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Jitter summary</div>
        <div className={classes.pillContainer}>
          <span className={classes.pillText}>{anomalyCount}</span>
        </div>
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {!isEmpty(selectedNetworksMetricsData) ? (
          // goodputData contains 5 keys for each row. One for the data, one for anomaly, one for upperbound,one for lowerbound and one for threshold
          Object.keys(jitterData).length / 5 === selectedNetworksMetricsData.length ? (
            checkforNoData(jitterData) ? (
              <EmptyText>No Data</EmptyText>
            ) : (
              <Chart>
                <MetricsLineChart dataValueSuffix="ms" selectedNetworksMetricsData={selectedNetworksMetricsData} inputData={jitterData} />
              </Chart>
            )
          ) : (
            <LoadingIndicator margin="auto" />
          )
        ) : (
          <div className={classes.noChartContainer}>
            <span className={classes.noChartText}>To see the data select SLA Tests on top</span>
          </div>
        )}
      </ChartContainerStyles>
    </>
  );
};
