import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { MetricsData, MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { createApiClient } from 'lib/api/http/apiClient';
import { TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { MultiLineChart } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/NodePanels/WedgePanel/MetricsTab/MultiLineChart';
import { DateTime } from 'luxon';
import { isEmpty } from 'lodash';

interface TransitProps {
  readonly timeRange: LookbackSelectOption;
}

const TRANSIT_METRICNAMES = ['BytesIn', 'BytesOut'];

const TRANSIT_METRIC_TYPES = ['NetworkLink', 'VpnLink', 'WedgePeeringConnection'];

const INPUT_TIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss ZZZ z';
const CHART_TIME_FORMAT = 'MMM dd';

const isMetricsEmpty = (metrics: MultiLineMetricsData[]) => {
  const reducedMetrics: MetricsData[] = metrics.reduce((acc, nextValue) => acc.concat(nextValue.metrics), []);
  return isEmpty(reducedMetrics) ? true : false;
};

export const Transit: React.FC<TransitProps> = ({ timeRange }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const promises = TRANSIT_METRIC_TYPES.map(type => {
      const params: TransitMetricsParams = {
        startTime: timeRange.value,
        endTime: '-0m',
        type: type,
        metricNames: TRANSIT_METRICNAMES,
      };
      return apiClient.getTelemetryMetrics(type, params);
    });
    setIsLoading(true);
    Promise.all(promises)
      .then(responses => {
        const transitMetricsData: MultiLineMetricsData[] = responses.reduce((acc, nextValue) => {
          if (nextValue.metrics.length > 0) {
            const typeMetricsData: MultiLineMetricsData[] = nextValue.metrics.map(item => ({
              name: `${nextValue.type}_${item.resourceId}_${item.key}`,
              metrics: item.ts,
            }));
            return acc.concat(typeMetricsData);
          } else {
            return acc.concat([]);
          }
        }, []);
        setMetricsData(transitMetricsData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [timeRange]);

  const getChartXAxisLabel = () => {
    const startDate = metricsData.map(item => item.metrics[0]);
    const endDate = metricsData.map(item => item.metrics[item.metrics.length - 1]);
    if (startDate && endDate) {
      const formattedStartDate = startDate.map(item => (item ? DateTime.fromFormat(item.time, INPUT_TIME_FORMAT).toUTC().toMillis() : Infinity));
      const formattedEndDate = endDate.map(item => (item ? DateTime.fromFormat(item.time, INPUT_TIME_FORMAT).toUTC().toMillis() : 0));
      return `${DateTime.fromMillis(Math.min(...formattedStartDate)).toFormat(CHART_TIME_FORMAT)} to ${DateTime.fromMillis(Math.max(...formattedEndDate)).toFormat(
        CHART_TIME_FORMAT,
      )} (1 day interval)`;
    }
    return '';
  };

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitle}>Transit</div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {isLoading ? (
          <LoadingIndicator margin="auto" />
        ) : isError ? (
          <ErrorMessage>Something went wrong.Please try again</ErrorMessage>
        ) : isMetricsEmpty(metricsData) ? (
          <EmptyText>No Data</EmptyText>
        ) : (
          <Chart>
            <MultiLineChart dataValueSuffix="bytes" inputData={metricsData} yAxisText="bytes" xAxisText={getChartXAxisLabel()} />
          </Chart>
        )}
      </ChartContainerStyles>
    </div>
  );
};
