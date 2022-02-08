import React, { useContext, useEffect, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../../icons/performance dashboard/info';
import LoadingIndicator from 'app/components/Loading';
import { MetricKeyValue, TestIdToName } from './PacketLoss';
import { Data } from './Table';
import Heatmap, { LegendData } from './Heatmap';
import { HeatMapData } from 'lib/api/http/SharedTypes';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';

interface LatencyProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
}

const LATENCY = 'latency';
const LATENCY_ANOMALY = 'latency_anomaly';
const LATENCY_LOWERBOUND = 'latency_lowerbound';
const LATENCY_UPPERBOUND = 'latency_upperbound';

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

export const Latency: React.FC<LatencyProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [latencyData, setLatencyData] = useState<MetricKeyValue>({});
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
      const promises = selectedRows.map(row => apiClient.getLatencyMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          latencyChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === LATENCY)?.ts || [];
          latencyChartData[`${item.testId}_anomaly`] = item.metrics.keyedmap.find(item => item.key === LATENCY_ANOMALY)?.ts || [];
          latencyChartData[`${item.testId}_upperbound`] = item.metrics.keyedmap.find(item => item.key === LATENCY_UPPERBOUND)?.ts || [];
          latencyChartData[`${item.testId}_lowerbound`] = item.metrics.keyedmap.find(item => item.key === LATENCY_LOWERBOUND)?.ts || [];
        });
        setLatencyData(latencyChartData);
      });
    };

    const getHeatMapLatency = async () => {
      const promises = selectedRows.map(row => apiClient.getHeatmapLatency(row.sourceNetwork, row.destination, timeRange, row.id));
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
    <div>
      <div className={classes.flexContainer}>
        <div>
          <div className={classes.itemTitle}>
            Latency summary
            <span className={classes.sortIcon}>
              <InfoIcon />
            </span>
          </div>
          <div className={classes.subTitleText}>Shows aggregated latency between sources.</div>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {!isEmpty(selectedRows) ? (
          // latencyData contains 4 keys for each row. One for the data, one for anomaly, one for upperbound and one for lowerbound
          Object.keys(latencyData).length / 4 === selectedRows.length ? (
            <MetricsLineChart dataValueSuffix="ms" selectedRows={selectedRows} inputData={latencyData} />
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
          <div className={classes.itemTitle}>
            Median latency
            <span className={classes.sortIcon}>
              <InfoIcon />
            </span>
          </div>
          <div className={classes.subTitleText}>Shows aggregated latency between branches and applications.</div>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {!isEmpty(selectedRows) ? (
          heatMapLatency.length === selectedRows.length ? (
            <Heatmap data={heatMapLatency} selectedRows={testIdToName} legendData={LATENCY_HEATMAP_LEGEND} dataSuffix="ms" />
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
