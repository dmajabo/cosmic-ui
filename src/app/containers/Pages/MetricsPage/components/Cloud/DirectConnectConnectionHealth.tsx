import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import { getConnectivityMetrics, getHealthTableData } from '../Utils';
import isEmpty from 'lodash/isEmpty';
import { HealthTable } from '../HealthTable';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { TabName } from '../..';
import { ConnectivityMetricsData } from '../Sites/ConnectivityHealth';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from 'app/containers/Pages/TrafficPage/Trends/styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { settingIcon } from 'app/components/SVGIcons/settingIcon';

interface DirectConnectConnectionHealthProps {
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
  readonly onOpenPanel: () => void;
}

export interface HealthTableData {
  readonly time: string;
  readonly connection: string;
  readonly value: number;
}

const DIRECT_CONNECT_CONNECTION_HEALTH_METRIC_NAMES = ['ConnectionState'];

export const DirectConnectConnectionHealth: React.FC<DirectConnectConnectionHealthProps> = ({ timeRange, selectedTabName, onOpenPanel }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const [healthTableData, setHealthTableData] = useState<HealthTableData[]>([]);
  const { response, loading, error, onGet } = useGet<GetTelemetryMetricsResponse>();

  useEffect(() => {
    if (selectedTabName === TabName.Cloud) {
      const params: TransitMetricsParams = {
        type: 'DirectConnect',
        metricNames: DIRECT_CONNECT_CONNECTION_HEALTH_METRIC_NAMES,
        startTime: timeRange.value,
        endTime: '-0m',
      };
      onGet(TelemetryApi.getAllMetrics(), userContext.accessToken!, params);
    }
  }, [timeRange, selectedTabName]);

  useEffect(() => {
    if (response && response.metrics && response.metrics.length) {
      const directConnectMetrics: ConnectivityMetricsData[] = getConnectivityMetrics(response);
      const directConnectTableData: HealthTableData[] = getHealthTableData(directConnectMetrics);
      setHealthTableData(directConnectTableData);
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
