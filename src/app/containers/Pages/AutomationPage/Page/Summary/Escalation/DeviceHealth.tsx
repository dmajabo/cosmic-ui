import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import { ChartItem } from 'app/containers/Pages/DashboardPage/components/ManagmentItem/styles';
import { HealthTableData } from 'app/containers/Pages/MetricsPage/components/Cloud/DirectConnectConnectionHealth';
import { HealthTable } from 'app/containers/Pages/MetricsPage/components/HealthTable';
import { ALERT_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, ConnectivityHealthParams } from 'lib/api/http/SharedTypes';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import LoadingIndicator from 'app/components/Loading';
import { ConnectivityMetricsData } from 'app/containers/Pages/MetricsPage/components/Sites/ConnectivityHealth';
import { getConnectivityMetrics, getHealthTableData } from 'app/containers/Pages/MetricsPage/components/Utils';

interface DeviceHealthProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

export const DeviceHealth: React.FC<DeviceHealthProps> = ({ timeRange }) => {
  const userContext = useContext<UserContextState>(UserContext);
  const [healthTableData, setHealthTableData] = useState<HealthTableData[]>([]);
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
      setHealthTableData(connectivityTableData);
    }
  }, [response]);

  return (
    <ChartItem style={{ width: '100%' }}>
      <ChartTitle>Device Health</ChartTitle>
      {loading ? (
        <LoadingIndicator margin="auto" />
      ) : error ? (
        <ErrorMessage className="error">{error.message || 'Something went wrong'}</ErrorMessage>
      ) : isEmpty(healthTableData) ? (
        <ErrorMessage className="empty" color="var(--_primaryTextColor)" fontSize={20} margin="auto">
          No data
        </ErrorMessage>
      ) : (
        <HealthTable tableData={healthTableData} customTableCellMinWidth="50px" />
      )}
    </ChartItem>
  );
};
