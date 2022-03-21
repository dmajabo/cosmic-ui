import { ALERT_TIME_RANGE_QUERY_TYPES, GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
// import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { BarChart, BarChartData } from './BarChart';
import LoadingIndicator from 'app/components/Loading';
import { ChartContainerStyles, ChartTitle } from 'app/components/ChartContainer/styles';
import isEmpty from 'lodash/isEmpty';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
// import { AlertResponse, AlertType } from '../SummaryComponent';
// import { DateTime } from 'luxon';
import { getConnectivityMetrics, getCorrectedTimeString, getHealthTableData } from 'app/containers/Pages/MetricsPage/components/Utils';
import { HealthTableData } from 'app/containers/Pages/MetricsPage/components/Cloud/DirectConnectConnectionHealth';
import { ConnectivityMetricsData } from 'app/containers/Pages/MetricsPage/components/Sites/ConnectivityHealth';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, ConnectivityHealthParams } from 'lib/api/http/SharedTypes';

interface FailoverProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

const getXAxisText = (barChartData: BarChartData[]) => {
  if (isEmpty(barChartData)) {
    return '';
  }
  return `${barChartData[0].date} to ${barChartData[barChartData.length - 1].date} (1 day interval)`;
};

// const BAR_CHART_TIME_FORMAT = 'MMM dd';

export const Failover: React.FC<FailoverProps> = ({ timeRange }) => {
  const userContext = useContext<UserContextState>(UserContext);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  // const { response, loading, error, onGet } = useGet<AlertResponse>();

  // useEffect(() => {
  //   const params = {
  //     timeRange: timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? GENERAL_TIME_RANGE_QUERY_TYPES.LAST_DAY : GENERAL_TIME_RANGE_QUERY_TYPES.LAST_WEEK,
  //     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   };
  //   onGet(AlertApi.getCountPerInterval(), userContext.accessToken!, params);
  // }, [timeRange]);

  // useEffect(() => {
  //   if (response && response.data && response.data.length) {
  //     const failoverData = response.data.find(item => item.alertType === AlertType.CELLULAR_FAILOVER)?.details || [];
  //     const newBarChartData: BarChartData[] = failoverData.map(item => ({
  //       date: DateTime.fromFormat(getCorrectedTimeString(item.key), INPUT_TIME_FORMAT).toFormat(BAR_CHART_TIME_FORMAT),
  //       value: item.totalCount,
  //     }));
  //     setBarChartData(newBarChartData);
  //   }
  // }, [response]);

  const { response, loading, error, onGet } = useGet<GetTelemetryMetricsResponse>();

  useEffect(() => {
    const startTime = timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? '-1d' : timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK ? '-7d' : '-30d';
    const lastDays = timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? '1' : timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK ? '7' : '30';
    const params: ConnectivityHealthParams = {
      startTime: startTime,
      endTime: '-0m',
      lastDays: lastDays,
    };
    onGet(TelemetryApi.getConnectivityHealth(), userContext.accessToken!, params);
  }, [timeRange]);

  useEffect(() => {
    if (response && response.metrics && response.metrics.length) {
      const connectivityMetrics: ConnectivityMetricsData[] = getConnectivityMetrics(response);
      const connectivityTableData: HealthTableData[] = getHealthTableData(connectivityMetrics);
      const metricsByDate = connectivityTableData.reduce((acc, nextValue) => {
        if (acc[nextValue.time]) {
          acc[nextValue.time] += nextValue.value;
        } else {
          acc[nextValue.time] = nextValue.value;
        }
        return acc;
      }, {});
      const newBarChartData: BarChartData[] = Object.keys(metricsByDate).map(date => ({ date: date, value: metricsByDate[date] }));
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
          <ChartTitle>Device Drops</ChartTitle>
          <EmptyText>No Data</EmptyText>
        </ChartContainerStyles>
      )}
    </>
  );
};
