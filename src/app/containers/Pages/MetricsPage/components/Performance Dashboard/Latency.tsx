import React, { useContext, useEffect, useRef, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import LoadingIndicator from 'app/components/Loading';
import { MetricKeyValue } from './PacketLoss';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { useHistory } from 'react-router-dom';
import { LocationState } from '../..';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { checkforNoData } from './filterFunctions';
import { SelectedNetworkMetricsData, LegendData } from './PerformanceDashboard';
import { GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { NetworkAlertChainResponse, NetworkAlertLogParams, Data } from 'lib/api/http/SharedTypes';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { getCorrectedTimeString } from '../Utils';

interface LatencyProps {
  readonly selectedNetworksMetricsData: SelectedNetworkMetricsData[];
  readonly timeRange: string;
}

const LATENCY = 'latency';
const LATENCY_ANOMALY = 'latency_anomaly';
const LATENCY_LOWERBOUND = 'latency_lowerbound';
const LATENCY_UPPERBOUND = 'latency_upperbound';
const LATENCY_THRESHOLD = 'latency_threshold';

const FIELD_ARRAY = [LATENCY, LATENCY_ANOMALY, LATENCY_LOWERBOUND, LATENCY_UPPERBOUND, LATENCY_THRESHOLD];

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

  const { response, onGetChainData } = useGetChainData<NetworkAlertChainResponse>();
  const [latencyData, setLatencyData] = useState<MetricKeyValue>({});
  const [escalationLatencyData, setEscalationLatencyData] = useState<MetricKeyValue>({});
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

      const promises = selectedNetworksMetricsData.reduce((acc, row) => {
        const networkApiList = row.deviceString ? FIELD_ARRAY.map(field => apiClient.getLatencyMetrics(row.deviceString, row.destination, timeRange, `${row.label}_${field}`, field)) : [];
        return acc.concat(networkApiList);
      }, []);

      Promise.all(promises).then(values => {
        if (!isEmpty(values)) {
          selectedNetworksMetricsData.forEach(network => {
            FIELD_ARRAY.forEach(field => {
              const responseItem = values.find(item => item?.testId === `${network.label}_${field}`);
              if (responseItem) {
                if (field === LATENCY) {
                  latencyChartData[network.label] = responseItem.metrics.keyedmap.find(item => item.key === LATENCY)?.ts || [];
                } else if (field === LATENCY_ANOMALY) {
                  const anomalyArray = responseItem.metrics.keyedmap.find(item => item.key === LATENCY_ANOMALY)?.ts || [];
                  totalAnomalyCount = totalAnomalyCount + anomalyArray.length;
                  latencyChartData[`${network.label}_anomaly`] = anomalyArray;
                } else if (field === LATENCY_LOWERBOUND) {
                  latencyChartData[`${network.label}_lowerbound`] = responseItem.metrics.keyedmap.find(item => item.key === LATENCY_LOWERBOUND)?.ts || [];
                } else if (field === LATENCY_UPPERBOUND) {
                  latencyChartData[`${network.label}_upperbound`] = responseItem.metrics.keyedmap.find(item => item.key === LATENCY_UPPERBOUND)?.ts || [];
                } else {
                  latencyChartData[`${network.label}_threshold`] = responseItem.metrics.keyedmap.find(item => item.key === LATENCY_THRESHOLD)?.ts || [];
                }
              }
            });
          });
        }
        setLatencyData(latencyChartData);
        setAnomalyCount(totalAnomalyCount);
      });
    };

    if (!isEmpty(selectedNetworksMetricsData)) {
      const params: NetworkAlertLogParams = {
        alert_type: ModelalertType.ANOMALY_LATENCY,
        time_range: timeRange === '-1d' ? GENERAL_TIME_RANGE_QUERY_TYPES.LAST_DAY : GENERAL_TIME_RANGE_QUERY_TYPES.LAST_WEEK,
        alert_state: 'ACTIVE',
      };
      onGetChainData(
        selectedNetworksMetricsData.map(network => AlertApi.getAlertLogsByNetwork(network.value)),
        selectedNetworksMetricsData.map(network => network.value),
        userContext.accessToken!,
        params,
      );
    }

    getLatencyMetrics();

    return () => {
      setLatencyData({});
    };
  }, [selectedNetworksMetricsData, timeRange]);

  useEffect(() => {
    const escalationLatencyData: MetricKeyValue = {};
    selectedNetworksMetricsData.forEach(network => {
      const networkMetrics: Data[] = response[network.value].alerts.map(alert => ({ time: getCorrectedTimeString(alert.timestamp), value: alert.value.toString() || null }));
      escalationLatencyData[`${network.label}_escalation`] = networkMetrics;
    });
    setEscalationLatencyData(escalationLatencyData);
  }, [response]);

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
          // latencyData contains 6 keys for each row. One for the data, one for anomaly, one for upperbound, one for lowerbound, one for threshold and one for Escalation
          Object.keys({ ...latencyData, ...escalationLatencyData }).length / 6 === selectedNetworksMetricsData.length ? (
            checkforNoData({ ...latencyData, ...escalationLatencyData }) ? (
              <EmptyText>No Data</EmptyText>
            ) : (
              <Chart>
                <MetricsLineChart dataValueSuffix="ms" selectedNetworksMetricsData={selectedNetworksMetricsData} inputData={{ ...latencyData, ...escalationLatencyData }} />
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
