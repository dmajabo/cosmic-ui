import React, { useContext, useEffect, useState } from 'react';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { MetricsStyles } from '../../MetricsStyles';
import { HealthTable } from '../HealthTable';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { DateTime } from 'luxon';
import { getCorrectedTimeString } from '../Utils';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { HealthTableData } from '../Cloud/DirectConnectConnectionHealth';
import { TabName } from '../..';

interface ConnectivityHealthProps {
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
}

const CONNECTIVITY_HEALTH_METRIC_NAMES = ['ConnectivityHealth'];

const INPUT_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss ZZZ z';

const HEALTH_TABLE_TIME_FORMAT = 'MMM dd';

export const ConnectivityHealth: React.FC<ConnectivityHealthProps> = ({ timeRange, selectedTabName }) => {
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
      const connectivityMetrics = response.metrics.map(item => {
        const name = item.tags.name;
        const metrics = item.ts.reduce((acc, nextValue) => {
          const formattedTimeString = DateTime.fromFormat(getCorrectedTimeString(nextValue.time), INPUT_TIME_FORMAT).toUTC().toFormat(HEALTH_TABLE_TIME_FORMAT);
          const milliseconds = DateTime.fromFormat(formattedTimeString, HEALTH_TABLE_TIME_FORMAT).toMillis();
          const value = Number(nextValue.value);
          if (acc[milliseconds]) {
            acc[milliseconds] = acc[milliseconds] + value;
          } else {
            acc[milliseconds] = value;
          }
          return acc;
        }, {});
        return {
          name: name,
          metrics: metrics,
        };
      });
      const connectivityTableData: HealthTableData[] = connectivityMetrics.reduce((acc, nextValue) => {
        const sortedTimeString = sortBy(Object.keys(nextValue.metrics));
        const itemTableData: HealthTableData[] = sortedTimeString.map(timeItem => ({
          time: DateTime.fromMillis(Number(timeItem)).toFormat(HEALTH_TABLE_TIME_FORMAT),
          value: nextValue.metrics[timeItem],
          connection: nextValue.name,
        }));
        return acc.concat(itemTableData);
      }, []);
      setHealthTableData(connectivityTableData);
    }
  }, [response]);

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Connectivity Health</div>
      {loading ? (
        <LoadingIndicator margin="auto" />
      ) : error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : isEmpty(healthTableData) ? (
        <EmptyText>No Data</EmptyText>
      ) : (
        <HealthTable tableData={healthTableData} />
      )}
    </div>
  );
};
