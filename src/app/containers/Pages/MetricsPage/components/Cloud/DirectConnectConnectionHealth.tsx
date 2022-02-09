import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { DateTime } from 'luxon';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import { getCorrectedTimeString } from '../Utils';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { HealthTable } from '../HealthTable';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';

interface DirectConnectConnectionHealthProps {
  readonly timeRange: LookbackSelectOption;
}

export interface HealthTableData {
  readonly time: string;
  readonly connection: string;
  readonly value: number;
}

const DIRECT_CONNECT_CONNECTION_HEALTH_METRIC_NAMES = ['ConnectionState'];

const INPUT_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss ZZZ z';

const HEALTH_TABLE_TIME_FORMAT = 'MMM dd';

export const DirectConnectConnectionHealth: React.FC<DirectConnectConnectionHealthProps> = ({ timeRange }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const [healthTableData, setHealthTableData] = useState<HealthTableData[]>([]);
  const { response, loading, error, onGet } = useGet<GetTelemetryMetricsResponse>();

  useEffect(() => {
    const params: TransitMetricsParams = {
      type: 'DirectConnect',
      metricNames: DIRECT_CONNECT_CONNECTION_HEALTH_METRIC_NAMES,
      startTime: timeRange.value,
      endTime: '-0m',
    };
    onGet(TelemetryApi.getAllMetrics(), userContext.accessToken!, params);
  }, [timeRange]);

  useEffect(() => {
    if (response && response.metrics && response.metrics.length) {
      const directConnectMetrics = response.metrics.map(item => {
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
      const directConnectTableData: HealthTableData[] = directConnectMetrics.reduce((acc, nextValue) => {
        const sortedTimeString = sortBy(Object.keys(nextValue.metrics));
        const itemTableData: HealthTableData[] = sortedTimeString.map(timeItem => ({
          time: DateTime.fromMillis(Number(timeItem)).toFormat(HEALTH_TABLE_TIME_FORMAT),
          value: nextValue.metrics[timeItem],
          connection: nextValue.name,
        }));
        return acc.concat(itemTableData);
      }, []);
      setHealthTableData(directConnectTableData);
    }
  }, [response]);

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Direct Connect Connection Health</div>
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
