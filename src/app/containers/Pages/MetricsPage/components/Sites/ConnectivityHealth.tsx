import React, { useContext, useEffect, useState } from 'react';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { MetricsStyles } from '../../MetricsStyles';
import isEmpty from 'lodash/isEmpty';
import { LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { ConnectivityHealthParams, GetTelemetryMetricsResponse } from 'lib/api/http/SharedTypes';
import { getConnectivityMetrics, getHealthTableData } from '../Utils';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { HealthTableData } from '../Cloud/DirectConnectConnectionHealth';
import { TabName } from '../..';
import { ChartContainer, ChartHeader, ChartLabel } from 'app/containers/Pages/TrafficPage/Trends/styles';
import { settingIcon } from 'app/components/SVGIcons/settingIcon';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { HealthTable } from '../HealthTable';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from 'app/components/Buttons/IconButton';

interface ConnectivityHealthProps {
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
  readonly onOpenPanel: () => void;
  readonly baseMetricName: string;
  readonly expandedItem: string;
  readonly onExpandedItemChange: (value: string) => void;
}

interface MetricsObject {
  readonly [timestamp: string]: number;
}

export interface ConnectivityMetricsData {
  readonly name: string;
  readonly metrics: MetricsObject;
}

export const ConnectivityHealth: React.FC<ConnectivityHealthProps> = ({ timeRange, selectedTabName, onOpenPanel, baseMetricName, expandedItem, onExpandedItemChange }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const [healthTableData, setHealthTableData] = useState<HealthTableData[]>([]);
  const { response, loading, error, onGet } = useGet<GetTelemetryMetricsResponse>();

  const handleExpansionItemChange = (value: string) => () => onExpandedItemChange(value);

  useEffect(() => {
    if (selectedTabName === TabName.Sites && expandedItem === baseMetricName) {
      const lastDays = timeRange.value === LookbackValue.oneDay ? '1' : timeRange.value === LookbackValue.oneWeek ? '7' : '30';
      const params: ConnectivityHealthParams = {
        startTime: timeRange.value,
        endTime: '-0m',
        lastDays: lastDays,
      };
      onGet(TelemetryApi.getConnectivityHealth(), userContext.accessToken!, params);
    }
  }, [timeRange, selectedTabName, expandedItem]);

  useEffect(() => {
    if (response && response.metrics && response.metrics.length) {
      const connectivityMetrics: ConnectivityMetricsData[] = getConnectivityMetrics(response);
      const connectivityTableData: HealthTableData[] = getHealthTableData(connectivityMetrics);
      setHealthTableData(connectivityTableData);
    }
  }, [response]);

  return (
    <>
      <ChartHeader style={{ paddingTop: 30 }}>
        <ChartLabel className="textOverflowEllips">Connectivity Health</ChartLabel>
        <SecondaryButton styles={{ margin: '0 0 0 auto', display: expandedItem === baseMetricName ? 'block' : 'none' }} label="Settings" icon={settingIcon} onClick={onOpenPanel} />
        <IconButton
          styles={{ marginLeft: 10, minWidth: 50 }}
          icon={expandedItem === baseMetricName ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          onClick={handleExpansionItemChange(baseMetricName)}
        />
      </ChartHeader>
      <ChartContainer style={{ padding: 0, display: expandedItem === baseMetricName ? 'flex' : 'none' }}>
        {loading ? (
          <LoadingIndicator margin="10% auto" />
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
    </>
  );
};
