import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { GridLabel } from 'app/containers/Pages/TrafficPage/SessionPage/Table/styles';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { useHistory } from 'react-router-dom';
import { LocationState } from '../..';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';

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

export const PacketLoss: React.FC<PacketLossProps> = ({ selectedRows, timeRange, networks }) => {
  const classes = PerformanceDashboardStyles();
  const [packetLossData, setPacketLossData] = useState<MetricKeyValue>({});
  const [anomalyCount, setAnomalyCount] = useState<number>(0);
  const [heatMapPacketLoss, setHeatMapPacketLoss] = useState<HeatMapData[]>([]);

  const testIdToName: TestIdToName = selectedRows.reduce((accu, nextValue) => {
    accu[nextValue.id] = nextValue.name;
    return accu;
  }, {});

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
      const promises = selectedRows.map(row => apiClient.getPacketLossMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          const anomalyArray = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_ANOMALY)?.ts || [];
          totalAnomalyCount = totalAnomalyCount + anomalyArray.length;
          packetLossChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS)?.ts || [];
          packetLossChartData[`${item.testId}_anomaly`] = anomalyArray;
          packetLossChartData[`${item.testId}_upperbound`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_UPPERBOUND)?.ts || [];
          packetLossChartData[`${item.testId}_lowerbound`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_LOWERBOUND)?.ts || [];
          packetLossChartData[`${item.testId}_threshold`] = item.metrics.keyedmap.find(item => item.key === PACKET_LOSS_THRESHOLD)?.ts || [];
        });
        setPacketLossData(packetLossChartData);
        setAnomalyCount(totalAnomalyCount);
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
    <div ref={scrollRef} className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Packet Loss summary</div>
        <div className={classes.pillContainer}>
          <span className={classes.pillText}>{anomalyCount}</span>
        </div>
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {!isEmpty(selectedRows) ? (
          // packetLossData contains 5 keys for each row. One for the data, one for anomaly, one for upperbound,one for lowerbound and one for threshold
          Object.keys(packetLossData).length / 5 === selectedRows.length ? (
            <Chart>
              <MetricsLineChart dataValueSuffix="%" selectedRows={selectedRows} inputData={packetLossData} />
            </Chart>
          ) : (
            <LoadingIndicator margin="auto" />
          )
        ) : (
          <EmptyText>To see the data select SLA Tests</EmptyText>
        )}
      </ChartContainerStyles>
    </div>
  );
};
