import { Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { createApiClient } from '../apiClient';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import { MetricsLineChart } from './MetricsLineChart';
import InfoIcon from '../icons/info.svg';
import LoadingIndicator from '../../../../components/Loading';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';
import { isEmpty } from 'lodash';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';

interface GoodputProps {
  readonly selectedRows: Data[];
  readonly timeRange: string;
}

const GOODPUT = 'goodput';
const GOODPUT_ANOMALY = 'goodput_anomaly';

export const Goodput: React.FC<GoodputProps> = ({ selectedRows, timeRange }) => {
  const classes = PerformanceDashboardStyles();

  const [goodputData, setGoodputData] = useState<MetricKeyValue>({});

  const userContext = useContext<UserContextState>(UserContext);

  const apiClient = createApiClient(userContext.idToken!);

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
    getGoodputMetrics();

    return () => setGoodputData({});
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
            <MetricsLineChart dataValueSuffix="ms" selectedRows={selectedRows} inputData={goodputData} />
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
