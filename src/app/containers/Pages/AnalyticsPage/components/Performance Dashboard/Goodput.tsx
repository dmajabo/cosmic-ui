import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../../icons/performance dashboard/info.svg';
import { MetricKeyValue, TestIdToName } from './PacketLoss';
import { Data } from './Table';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { HeatMapData } from 'lib/api/http/SharedTypes';
import Heatmap, { LegendData } from './Heatmap';

interface GoodputProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
}

const GOODPUT = 'goodput';
const GOODPUT_ANOMALY = 'goodput_anomaly';

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

export const Goodput: React.FC<GoodputProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [goodputData, setGoodputData] = useState<MetricKeyValue>({});
  const [heatMapGoodput, setHeatMapGoodput] = useState<HeatMapData[]>([]);

  const userContext = useContext<UserContextState>(UserContext);

  const apiClient = createApiClient(userContext.accessToken!);

  const testIdToName: TestIdToName = selectedRows.reduce((accu, nextValue) => {
    accu[nextValue.id] = nextValue.name;
    return accu;
  }, {});

  useEffect(() => {
    const getGoodputMetrics = async () => {
      const goodputChartData: MetricKeyValue = {};
      const promises = selectedRows.map(row => apiClient.getGoodputMetrics(row.sourceDevice, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        values.forEach(item => {
          goodputChartData[item.testId] = item.metrics.keyedmap.find(item => item.key === GOODPUT)?.ts || [];
          goodputChartData[`${item.testId}_anomaly`] = item.metrics.keyedmap.find(item => item.key === GOODPUT_ANOMALY)?.ts || [];
        });
        setGoodputData(goodputChartData);
      });
    };
    const getHeatMapGoodput = async () => {
      const promises = selectedRows.map(row => apiClient.getHeatmapGoodput(row.sourceNetwork, row.destination, timeRange, row.id));
      Promise.all(promises).then(values => {
        const heatMapGoodput: HeatMapData[] = values.map(item => ({
          testId: item.testId,
          metrics: item.avgMetric.resourceMetric,
        }));
        setHeatMapGoodput(heatMapGoodput);
      });
    };

    getGoodputMetrics();
    getHeatMapGoodput();

    return () => {
      setGoodputData({});
      setHeatMapGoodput([]);
    };
  }, [selectedRows, timeRange]);

  return (
    <div>
      <div className={classes.flexContainer}>
        <div>
          <Typography className={classes.itemTitle}>
            Goodput summary
            <span className={classes.sortIcon}>
              <img src={InfoIcon} alt="ínfo" />
            </span>
          </Typography>
          <Typography className={classes.subTitleText}>Shows aggregated goodput between sources.</Typography>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {!isEmpty(selectedRows) ? (
          // goodputData contains 2 keys for each row. One for the data and one for anomaly
          Object.keys(goodputData).length / 2 === selectedRows.length ? (
            <MetricsLineChart dataValueSuffix="mbps" selectedRows={selectedRows} inputData={goodputData} />
          ) : (
            <div className={classes.noChartContainer}>
              <LoadingIndicator />
            </div>
          )
        ) : (
          <div className={classes.noChartContainer}>
            <Typography className={classes.noChartText}>To see the data select SLA Tests on top</Typography>
          </div>
        )}
      </div>
      <hr className={classes.hrLine} />
      <div className={classes.flexContainer}>
        <div>
          <Typography className={classes.itemTitle}>
            Median Goodput
            <span className={classes.sortIcon}>
              <img src={InfoIcon} alt="ínfo" />
            </span>
          </Typography>
          <Typography className={classes.subTitleText}>Shows aggregated goodput between branches and applications.</Typography>
        </div>
      </div>
      <div className={classes.lineChartContainer}>
        {!isEmpty(selectedRows) ? (
          heatMapGoodput.length === selectedRows.length ? (
            <Heatmap data={heatMapGoodput} selectedRows={testIdToName} legendData={GOODPUT_HEATMAP_LEGEND} dataSuffix="mbps" />
          ) : (
            <div className={classes.noChartContainer}>
              <LoadingIndicator />
            </div>
          )
        ) : (
          <div className={classes.noChartContainer}>
            <Typography className={classes.noChartText}>To see the data select SLA Tests on top</Typography>
          </div>
        )}
      </div>
    </div>
  );
};
