import { MetricsData, MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { MultiLineChart } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/NodePanels/WedgePanel/MetricsTab/MultiLineChart';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { IMetrickQueryParam } from 'lib/api/ApiModels/Metrics/apiModel';
import { getChartXAxisLabel, isMetricsEmpty } from '../Utils';
import { TabName } from '../..';
import { NetworkObject } from '.';

interface NetworkUsageHealthProps {
  readonly networks: NetworkObject[];
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
}

export const NetworkUsageHealth: React.FC<NetworkUsageHealthProps> = ({ networks, timeRange, selectedTabName }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData();
  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[]>([]);

  useEffect(() => {
    if (networks.length > 0 && selectedTabName === TabName.Sites) {
      const timeParams: IMetrickQueryParam = {
        startTime: timeRange.value,
        endTime: '-0d',
      };
      onGetChainData(
        networks.map(network => TelemetryApi.getNetworkUsage(network.id)),
        networks.map(item => item.id),
        userContext.accessToken!,
        timeParams,
      );
    }
  }, [networks, timeRange, selectedTabName]);

  useEffect(() => {
    if (response) {
      const metricsData: MultiLineMetricsData[] = [];
      networks.forEach(network => {
        response[network.id].metrics.keyedmap
          .filter(item => item.key !== 'bytesRecvd')
          .forEach(item => {
            metricsData.push({ name: `${network.name} ${item.key}`, metrics: item.ts });
          });
      });
      setMetricsData(metricsData);
    }
  }, [response]);

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Network Usage Health</div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {loading ? (
          <LoadingIndicator margin="auto" />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
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
