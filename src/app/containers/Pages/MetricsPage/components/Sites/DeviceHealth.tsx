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
import { DeviceToNetworkMap } from '.';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from 'app/components/Buttons/IconButton';

interface DeviceHealthProps {
  readonly devices: string[];
  readonly timeRange: LookbackSelectOption;
  readonly deviceToNetworkMap: DeviceToNetworkMap;
  readonly selectedTabName: TabName;
  readonly baseMetricName: string;
  readonly expandedItem: string;
  readonly onExpandedItemChange: (value: string) => void;
}

export const DeviceHealth: React.FC<DeviceHealthProps> = ({ devices, timeRange, selectedTabName, deviceToNetworkMap, baseMetricName, expandedItem, onExpandedItemChange }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData();
  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[]>([]);

  const handleExpansionItemChange = (value: string) => () => onExpandedItemChange(value);

  useEffect(() => {
    if (devices.length > 0 && selectedTabName === TabName.Sites && expandedItem === baseMetricName) {
      const timeParams: IMetrickQueryParam = {
        startTime: timeRange.value,
        endTime: '-0m',
      };
      onGetChainData(
        devices.map(device => TelemetryApi.getDeviceLoad(device)),
        devices,
        userContext.accessToken!,
        timeParams,
      );
    }
  }, [devices, timeRange, selectedTabName, expandedItem]);

  useEffect(() => {
    if (response) {
      const metricsData: MultiLineMetricsData[] = devices.map(device => {
        const tsData: MetricsData[] = response[device].metrics.keyedmap.reduce((acc, nextValue) => acc.concat(nextValue.ts), []);
        return { name: device, metrics: tsData, additionalTooltipItemValue: deviceToNetworkMap[device] };
      });
      setMetricsData(metricsData);
    }
  }, [response]);

  return (
    <>
      <div className={classes.pageComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>Device Health</div>
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
            <MultiLineChart inputData={metricsData} yAxisText="score" xAxisText={getChartXAxisLabel(metricsData)} showAdditionalTooltipItem />
          </Chart>
        )}
      </ChartContainerStyles>
    </>
  );
};
