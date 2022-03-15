import { ALERT_TIME_RANGE_QUERY_TYPES, GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { BarChart, BarChartData } from './BarChart';
import LoadingIndicator from 'app/components/Loading';
import { ChartContainerStyles, ChartTitle } from 'app/components/ChartContainer/styles';
import isEmpty from 'lodash/isEmpty';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { AlertResponse, AlertType } from '../SummaryComponent';
import { INPUT_TIME_FORMAT } from 'app/containers/Pages/DashboardPage';
import { DateTime } from 'luxon';
import { getCorrectedTimeString } from 'app/containers/Pages/MetricsPage/components/Utils';

interface FailoverProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

const getXAxisText = (barChartData: BarChartData[]) => {
  if (isEmpty(barChartData)) {
    return '';
  }
  return `${barChartData[0].date} to ${barChartData[barChartData.length - 1].date} (1 day interval)`;
};

const BAR_CHART_TIME_FORMAT = 'MMM dd';

export const Failover: React.FC<FailoverProps> = ({ timeRange }) => {
  const userContext = useContext<UserContextState>(UserContext);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const { response, loading, error, onGet } = useGet<AlertResponse>();

  useEffect(() => {
    const params = {
      timeRange: timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? GENERAL_TIME_RANGE_QUERY_TYPES.LAST_DAY : GENERAL_TIME_RANGE_QUERY_TYPES.LAST_WEEK,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    onGet(AlertApi.getCountPerInterval(), userContext.accessToken!, params);
  }, [timeRange]);

  useEffect(() => {
    if (response && response.data && response.data.length) {
      const failoverData = response.data.find(item => item.alertType === AlertType.CELLULAR_FAILOVER)?.details || [];
      const newBarChartData: BarChartData[] = failoverData.map(item => ({
        date: DateTime.fromFormat(getCorrectedTimeString(item.key), INPUT_TIME_FORMAT).toFormat(BAR_CHART_TIME_FORMAT),
        value: item.totalCount,
      }));
      setBarChartData(newBarChartData);
    }
  }, [response]);

  return (
    <>
      {!loading && !error && !isEmpty(barChartData) && (
        <div style={{ height: 400 }}>
          <BarChart inputData={barChartData} xAxisText={getXAxisText(barChartData)} yAxisText="Failovers" chartTitle="Cellular Failover" />
        </div>
      )}
      {loading && (
        <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 400, maxHeight: 400 }}>
          <LoadingIndicator margin="auto" />
        </ChartContainerStyles>
      )}
      {isEmpty(barChartData) && (
        <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 400, maxHeight: 400 }}>
          <ChartTitle>Cellular Failover</ChartTitle>
          <EmptyText>No Data</EmptyText>
        </ChartContainerStyles>
      )}
    </>
  );
};
