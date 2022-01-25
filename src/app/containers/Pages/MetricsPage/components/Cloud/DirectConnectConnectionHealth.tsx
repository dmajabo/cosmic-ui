import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';

interface DirectConnectConnectionHealthProps {
  readonly timeRange: LookbackSelectOption;
}

const DIRECT_CONNECT_CONNECTION_HEALTH_METRIC_NAMES = ['ConnectionState'];

export const DirectConnectConnectionHealth: React.FC<DirectConnectConnectionHealthProps> = ({ timeRange }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
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

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Direct Connect Connection Health</div>
    </div>
  );
};
