import React, { useContext, useEffect, useState } from 'react';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { MetricsStyles } from '../../MetricsStyles';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { DateTime } from 'luxon';
import { getConnectivityMetrics, getCorrectedTimeString, getHealthTableData } from '../Utils';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { HealthTableData } from '../Cloud/DirectConnectConnectionHealth';
import { TabName } from '../..';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from 'app/containers/Pages/TrafficPage/Trends/styles';
import { settingIcon } from 'app/components/SVGIcons/settingIcon';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { useMetricsDataContext } from 'lib/hooks/Metrics/useMetricsDataContent';
import { HealthTable } from '../HealthTable';

interface ConnectivityHealthProps {
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
  readonly onOpenPanel: () => void;
}

interface MetricsObject {
  readonly [timestamp: string]: number;
}

export interface ConnectivityMetricsData {
  readonly name: string;
  readonly metrics: MetricsObject;
}

const CONNECTIVITY_HEALTH_METRIC_NAMES = ['ConnectivityHealth'];

export const ConnectivityHealth: React.FC<ConnectivityHealthProps> = ({ timeRange, selectedTabName, onOpenPanel }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const [healthTableData, setHealthTableData] = useState<HealthTableData[]>([]);
  const { response, loading, error, onGet } = useGet<GetTelemetryMetricsResponse>();

  useEffect(() => {
    if (selectedTabName === TabName.Sites) {
      const params: TransitMetricsParams = {
        type: 'DeviceConnectionState',
        metricNames: CONNECTIVITY_HEALTH_METRIC_NAMES,
        startTime: timeRange.value,
        endTime: '-0m',
      };
      onGet(TelemetryApi.getAllMetrics(), userContext.accessToken!, params);
    }
  }, [timeRange, selectedTabName]);

  useEffect(() => {
    if (response && response.metrics && response.metrics.length) {
      const connectivityMetrics: ConnectivityMetricsData[] = getConnectivityMetrics(response);
      const connectivityTableData: HealthTableData[] = getHealthTableData(connectivityMetrics);
      setHealthTableData(connectivityTableData);
    }
  }, [response]);

  return (
    <ChartContainer margin="30px 0px 0px 0px">
      <ChartHeader>
        <ChartLabel className="textOverflowEllips">Connectivity Health</ChartLabel>
        <SecondaryButton styles={{ margin: '0 0 0 auto' }} label="Settings" icon={settingIcon} onClick={onOpenPanel} />
      </ChartHeader>
      {loading ? (
        <LoadingIndicator margin="auto" />
      ) : error ? (
        <ErrorMessage className="error">{error.message || 'Something went wrong'}</ErrorMessage>
      ) : isEmpty(healthTableData) ? (
        <ErrorMessage className="empty" color="var(--_primaryTextColor)" fontSize={20} margin="auto">
          No data
        </ErrorMessage>
      ) : (
        <HealthTable tableData={healthTableData} />
      )}
    </ChartContainer>
  );
};
