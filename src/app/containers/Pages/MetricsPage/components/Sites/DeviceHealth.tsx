import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { MetricsData, MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import isEmpty from 'lodash/isEmpty';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { MultiLineChart } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/NodePanels/WedgePanel/MetricsTab/MultiLineChart';

interface DeviceHealthProps {
  readonly devices: string[];
}

const isMetricsEmpty = (metrics: MultiLineMetricsData[]) => {
  const reducedMetrics: MetricsData[] = metrics.reduce((acc, nextValue) => acc.concat(nextValue.metrics), []);
  return isEmpty(reducedMetrics) ? true : false;
};

export const DeviceHealth: React.FC<DeviceHealthProps> = ({ devices }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData();
  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[]>([]);

  useEffect(() => {
    if (devices.length > 0) {
      onGetChainData(
        devices.map(device => TelemetryApi.getDeviceLoad(device)),
        devices,
        userContext.accessToken!,
      );
    }
  }, [devices]);

  useEffect(() => {
    if (response) {
      const metricsData: MultiLineMetricsData[] = devices.map(device => {
        const tsData: MetricsData[] = response[device].metrics.keyedmap.reduce((acc, nextValue) => acc.concat(nextValue.ts), []);
        return { name: device, metrics: tsData };
      });
      setMetricsData(metricsData);
    }
  }, [response]);

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Device Health</div>
      <div>
        {loading ? (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : isMetricsEmpty(metricsData) ? (
          <EmptyText>No Data</EmptyText>
        ) : (
          <MultiLineChart dataValueSuffix="score" inputData={metricsData} />
        )}
      </div>
    </div>
  );
};
