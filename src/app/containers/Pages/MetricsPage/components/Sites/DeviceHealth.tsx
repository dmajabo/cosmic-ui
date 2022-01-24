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
import { IMetrickQueryParam } from 'lib/api/ApiModels/Metrics/apiModel';
import { DateTime } from 'luxon';

interface DeviceHealthProps {
  readonly devices: string[];
  readonly timeRange: LookbackSelectOption;
}

const INPUT_TIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss ZZZ z';
const CHART_TIME_FORMAT = 'MMM dd';

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
  }, [devices, timeRange]);

  useEffect(() => {
    if (response) {
      const metricsData: MultiLineMetricsData[] = devices.map(device => {
        const tsData: MetricsData[] = response[device].metrics.keyedmap.reduce((acc, nextValue) => acc.concat(nextValue.ts), []);
        return { name: device, metrics: tsData };
      });
      setMetricsData(metricsData);
    }
  }, [response]);

  const getChartXAxisLabel = () => {
    const startDate = metricsData.map(item => item.metrics[0]);
    const endDate = metricsData.map(item => item.metrics[item.metrics.length - 1]);
    if (startDate && endDate) {
      const formattedStartDate = startDate.map(item => DateTime.fromFormat(item.time, INPUT_TIME_FORMAT).toUTC().toMillis());
      const formattedEndDate = endDate.map(item => DateTime.fromFormat(item.time, INPUT_TIME_FORMAT).toUTC().toMillis());
      return `${DateTime.fromMillis(Math.min(...formattedStartDate)).toFormat(CHART_TIME_FORMAT)} to ${DateTime.fromMillis(Math.max(...formattedEndDate)).toFormat(
        CHART_TIME_FORMAT,
      )} (1 day interval)`;
    }
    return '';
  };

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Device Health</div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {loading ? (
          <LoadingIndicator margin="auto" />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : isMetricsEmpty(metricsData) ? (
          <EmptyText>No Data</EmptyText>
        ) : (
          <Chart>
            <MultiLineChart inputData={metricsData} yAxisText="score" xAxisText={getChartXAxisLabel()} />
          </Chart>
        )}
      </ChartContainerStyles>
    </div>
  );
};
