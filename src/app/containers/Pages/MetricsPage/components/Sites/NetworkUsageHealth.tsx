import { MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from 'app/components/Buttons/IconButton';

interface NetworkUsageHealthProps {
  readonly networks: NetworkObject[];
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
  readonly baseMetricName: string;
  readonly expandedItem: string;
  readonly onExpandedItemChange: (value: string) => void;
}

export const NetworkUsageHealth: React.FC<NetworkUsageHealthProps> = ({ networks, timeRange, selectedTabName, baseMetricName, expandedItem, onExpandedItemChange }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData();
  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[]>([]);

  const handleExpansionItemChange = (value: string) => () => onExpandedItemChange(value);

  useEffect(() => {
    if (networks.length > 0 && selectedTabName === TabName.Sites && expandedItem === baseMetricName) {
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
  }, [networks, timeRange, selectedTabName, expandedItem]);

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
    <>
      <div className={classes.pageComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Network Usage Health</div>
        <IconButton icon={expandedItem === baseMetricName ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleExpansionItemChange(baseMetricName)} />
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420, display: expandedItem === baseMetricName ? 'block' : 'none' }}>
        {loading ? (
          <LoadingIndicator margin="10% auto" />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : isMetricsEmpty(metricsData) ? (
          <EmptyText style={{ margin: '13% auto' }}>To see the data select networks on top</EmptyText>
        ) : (
          <Chart>
            <MultiLineChart dataValueSuffix="bytes" inputData={metricsData} yAxisText="bytes" xAxisText={getChartXAxisLabel(metricsData)} />
          </Chart>
        )}
      </ChartContainerStyles>
    </>
  );
};
