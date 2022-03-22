import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { GetTelemetryMetricsResponse, TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { MultiLineChart } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/NodePanels/WedgePanel/MetricsTab/MultiLineChart';
import { getChartXAxisLabel, isMetricsEmpty } from '../Utils';
import { TabName } from '../..';

interface DirectConnectVirtualHealthProps {
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
}

const DIRECT_CONNECT_VIRTUAL_HEALTH_METRIC_NAMES = ['VirtualInterfaceBpsIngress', 'VirtualInterfaceBpsEgress'];

export const DirectConnectVirtualHealth: React.FC<DirectConnectVirtualHealthProps> = ({ timeRange, selectedTabName }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<GetTelemetryMetricsResponse>();

  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[]>([]);

  useEffect(() => {
    if (selectedTabName === TabName.Cloud) {
      const params: TransitMetricsParams = {
        type: 'DirectConnect',
        metricNames: DIRECT_CONNECT_VIRTUAL_HEALTH_METRIC_NAMES,
        startTime: timeRange.value,
        endTime: '-0m',
        cloudExtId: '',
      };
      onGet(TelemetryApi.getAllMetrics(), userContext.accessToken!, params);
    }
  }, [timeRange, selectedTabName]);

  useEffect(() => {
    if (response) {
      const metricsData: MultiLineMetricsData[] = response.metrics.map(item => ({
        name: item.key,
        metrics: item.ts,
      }));
      setMetricsData(metricsData);
    }
  }, [response]);

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Direct Connect Virtual Health</div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {loading ? (
          <LoadingIndicator margin="auto" />
        ) : error ? (
          <ErrorMessage>{error.message}</ErrorMessage>
        ) : isMetricsEmpty(metricsData) ? (
          <EmptyText>No Data</EmptyText>
        ) : (
          <Chart>
            <MultiLineChart dataValueSuffix="bytes" inputData={metricsData} yAxisText="bytes" xAxisText={getChartXAxisLabel(metricsData)} />
          </Chart>
        )}
      </ChartContainerStyles>
    </div>
  );
};
