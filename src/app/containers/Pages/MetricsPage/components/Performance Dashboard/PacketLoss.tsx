import React, { useContext, useEffect, useRef, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import LoadingIndicator from 'app/components/Loading';
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
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { Data, NetworkAlertChainResponse, NetworkAlertLogParams } from 'lib/api/http/SharedTypes';
import { getCorrectedTimeString } from '../Utils';

interface PacketLossProps {
  readonly selectedNetworksMetricsData: SelectedNetworkMetricsData[];
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
const PACKET_LOSS_LOWERBOUND = 'packetloss_lowerbound';
const PACKET_LOSS_UPPERBOUND = 'packetloss_upperbound';
const PACKET_LOSS_THRESHOLD = 'packetloss_threshold';

const FIELD_ARRAY = [PACKET_LOSS, PACKET_LOSS_ANOMALY, PACKET_LOSS_LOWERBOUND, PACKET_LOSS_UPPERBOUND, PACKET_LOSS_THRESHOLD];

export const PACKET_LOSS_HEATMAP_LEGEND: LegendData[] = [
  {
    low: 0,
    high: 20,
    color: '#52984E',
  },
  {
    low: 21,
    high: 50,
    color: '#FED0AB',
  },
  {
    low: 51,
    high: 75,
    color: '#FFC568',
  },
  {
    low: 75,
    high: Infinity,
    color: '#DC4545',
  },
];

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedNetworksMetricsData, timeRange }) => {
  const classes = PerformanceDashboardStyles();
  const [packetLossData, setPacketLossData] = useState<MetricKeyValue>({});
  const [escalationPacketLossData, setEscalationPacketLossData] = useState<MetricKeyValue>({});
  const [anomalyCount, setAnomalyCount] = useState<number>(0);
  const { response, onGetChainData } = useGetChainData<NetworkAlertChainResponse>();

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  const history = useHistory();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (history && history && history.location.state) {
      const state = history.location.state as LocationState;
      if (state.anomalyType === ModelalertType.ANOMALY_PACKETLOSS) {
        scrollRef.current.scrollIntoView();
      }
    }
  }, []);

  useEffect(() => {
    const getPacketLossMetrics = async () => {
      const packetLossChartData: MetricKeyValue = {};
      let totalAnomalyCount = 0;

      const promises = selectedNetworksMetricsData.reduce((acc, row) => {
        const networkApiList = FIELD_ARRAY.map(field => (row.deviceString ? apiClient.getPacketLossMetrics(row.deviceString, row.destination, timeRange, `${row.label}_${field}`, field) : null));
        return acc.concat(networkApiList);
      }, []);

      Promise.all(promises).then(values => {
        if (!isEmpty(values)) {
          selectedNetworksMetricsData.forEach(network => {
            FIELD_ARRAY.forEach(field => {
              const responseItem = values.find(item => item.testId === `${network.label}_${field}`);
              if (field === PACKET_LOSS) {
                packetLossChartData[network.label] = responseItem.metrics.keyedmap.find(item => item.key === PACKET_LOSS)?.ts || [];
              } else if (field === PACKET_LOSS_ANOMALY) {
                const anomalyArray = responseItem.metrics.keyedmap.find(item => item.key === PACKET_LOSS_ANOMALY)?.ts || [];
                totalAnomalyCount = totalAnomalyCount + anomalyArray.length;
                packetLossChartData[`${network.label}_anomaly`] = anomalyArray;
              } else if (field === PACKET_LOSS_LOWERBOUND) {
                packetLossChartData[`${network.label}_lowerbound`] = responseItem.metrics.keyedmap.find(item => item.key === PACKET_LOSS_LOWERBOUND)?.ts || [];
              } else if (field === PACKET_LOSS_UPPERBOUND) {
                packetLossChartData[`${network.label}_upperbound`] = responseItem.metrics.keyedmap.find(item => item.key === PACKET_LOSS_UPPERBOUND)?.ts || [];
              } else {
                packetLossChartData[`${network.label}_threshold`] = responseItem.metrics.keyedmap.find(item => item.key === PACKET_LOSS_THRESHOLD)?.ts || [];
              }
            });
          });
        }
        setPacketLossData(packetLossChartData);
        setAnomalyCount(totalAnomalyCount);
      });
    };

    if (!isEmpty(selectedNetworksMetricsData)) {
      const params: NetworkAlertLogParams = {
        alert_type: ModelalertType.ANOMALY_PACKETLOSS,
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

    getPacketLossMetrics();

    return () => {
      setPacketLossData({});
    };
  }, [selectedNetworksMetricsData, timeRange]);

  useEffect(() => {
    const escalationPacketLossData: MetricKeyValue = {};
    selectedNetworksMetricsData.forEach(network => {
      const networkMetrics: Data[] = response[network.value].alerts.map(alert => ({ time: getCorrectedTimeString(alert.timestamp), value: alert.value.toString() || null }));
      escalationPacketLossData[`${network.label}_escalation`] = networkMetrics;
    });
    setEscalationPacketLossData(escalationPacketLossData);
  }, [response]);

  return (
    <>
      <div ref={scrollRef} className={classes.metricComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Packet Loss summary</div>
        <div className={classes.pillContainer}>
          <span className={classes.pillText}>{anomalyCount}</span>
        </div>
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {!isEmpty(selectedNetworksMetricsData) ? (
          // packetLossData contains 6 keys for each row. One for the data, one for anomaly, one for upperbound,one for lowerbound, one for threshold and one for escalation
          Object.keys({ ...packetLossData, ...escalationPacketLossData }).length / 6 === selectedNetworksMetricsData.length ? (
            checkforNoData({ ...packetLossData, ...escalationPacketLossData }) ? (
              <EmptyText>No Data</EmptyText>
            ) : (
              <Chart>
                <MetricsLineChart dataValueSuffix="%" selectedNetworksMetricsData={selectedNetworksMetricsData} inputData={{ ...packetLossData, ...escalationPacketLossData }} />
              </Chart>
            )
          ) : (
            <LoadingIndicator margin="auto" />
          )
        ) : (
          <EmptyText>To see the data select SLA Tests</EmptyText>
        )}
      </ChartContainerStyles>
    </>
  );
};
