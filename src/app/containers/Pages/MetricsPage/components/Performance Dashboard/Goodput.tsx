import React, { useContext, useEffect, useRef, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import { MetricKeyValue } from './PacketLoss';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { FinalTableData, Vnet } from 'lib/api/http/SharedTypes';
import { LegendData } from './Heatmap';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { useHistory } from 'react-router-dom';
import { LocationState } from '../..';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';

interface GoodputProps {
  readonly selectedRows: FinalTableData[];
  readonly timeRange: string;
  readonly networks: Vnet[];
}

const GOODPUT = 'goodput';
const GOODPUT_ANOMALY = 'goodput_anomaly';
const GOODPUT_LOWERBOUND = 'goodput_lowerbound';
const GOODPUT_UPPERBOUND = 'goodput_upperbound';
const GOODPUT_THRESHOLD = 'goodput_threshold';

export const GOODPUT_HEATMAP_LEGEND: LegendData[] = [
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

export const Goodput: React.FC<GoodputProps> = ({ selectedRows, timeRange, networks }) => {
  const classes = PerformanceDashboardStyles();

  const [goodputData, setGoodputData] = useState<MetricKeyValue>({});
  const [anomalyCount, setAnomalyCount] = useState<number>(0);

  const userContext = useContext<UserContextState>(UserContext);

  const apiClient = createApiClient(userContext.accessToken!);

  const history = useHistory();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (history && history && history.location.state) {
      const state = history.location.state as LocationState;
      if (state.anomalyType === ModelalertType.ANOMALY_GOODPUT) {
        scrollRef.current.scrollIntoView();
      }
    }
  }, []);

  useEffect(() => {
    const getGoodputMetrics = async () => {
      const goodputChartData: MetricKeyValue = {};
      let totalAnomalyCount = 0;
      const promises = selectedRows.map(row => apiClient.getGoodputMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          const anomalyArray = item.metrics.keyedmap.find(item => item.key === GOODPUT_ANOMALY)?.ts || [];
          totalAnomalyCount = totalAnomalyCount + anomalyArray.length;
          goodputChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === GOODPUT)?.ts || [];
          goodputChartData[`${item.testId}_anomaly`] = [];
          goodputChartData[`${item.testId}_upperbound`] = item.metrics.keyedmap.find(item => item.key === GOODPUT_UPPERBOUND)?.ts || [];
          goodputChartData[`${item.testId}_lowerbound`] = item.metrics.keyedmap.find(item => item.key === GOODPUT_LOWERBOUND)?.ts || [];
          goodputChartData[`${item.testId}_threshold`] = item.metrics.keyedmap.find(item => item.key === GOODPUT_THRESHOLD)?.ts || [];
        });
        setGoodputData(goodputChartData);
        setAnomalyCount(totalAnomalyCount);
      });
    };

    getGoodputMetrics();

    return () => {
      setGoodputData({});
    };
  }, [selectedRows, timeRange]);

  return (
    <div ref={scrollRef} className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Goodput summary</div>
        <div className={classes.pillContainer}>
          <span className={classes.pillText}>{anomalyCount}</span>
        </div>
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {!isEmpty(selectedRows) ? (
          // goodputData contains 5 keys for each row. One for the data, one for anomaly, one for upperbound,one for lowerbound and one for threshold
          Object.keys(goodputData).length / 5 === selectedRows.length ? (
            <Chart>
              <MetricsLineChart dataValueSuffix="mbps" selectedRows={selectedRows} inputData={goodputData} />
            </Chart>
          ) : (
            <LoadingIndicator margin="auto" />
          )
        ) : (
          <div className={classes.noChartContainer}>
            <span className={classes.noChartText}>To see the data select SLA Tests on top</span>
          </div>
        )}
      </ChartContainerStyles>
    </div>
  );
};
