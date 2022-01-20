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
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';

interface DeviceHealthProps {
  readonly devices: string[];
  readonly timeRange: LookbackSelectOption;
}

const isMetricsEmpty = (metrics: MultiLineMetricsData[]) => {
  const reducedMetrics: MetricsData[] = metrics.reduce((acc, nextValue) => acc.concat(nextValue.metrics), []);
  return isEmpty(reducedMetrics) ? true : false;
};

export const DeviceHealth: React.FC<DeviceHealthProps> = ({ devices, timeRange }) => {
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
          <LoadingIndicator margin="auto" />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : isMetricsEmpty(metricsData) ? (
          <EmptyText>No Data</EmptyText>
        ) : (
          <ChartContainerStyles style={{ maxWidth: '100%', maxHeight: 420 }}>
            <Chart>
              <MultiLineChart inputData={metricsData} yAxisText="score" xAxisText={timeRange.label} />
            </Chart>
          </ChartContainerStyles>
        )}
      </div>
    </div>
  );
};
