import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { LookbackSelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { createApiClient } from 'lib/api/http/apiClient';
import { TransitMetricsParams } from 'lib/api/http/SharedTypes';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { MultiLineChart } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/NodePanels/WedgePanel/MetricsTab/MultiLineChart';
import { getChartXAxisLabel, isMetricsEmpty } from '../Utils';
import { TabName } from '../..';

interface TransitProps {
  readonly timeRange: LookbackSelectOption;
  readonly selectedTabName: TabName;
}

const TRANSIT_METRICNAMES = ['BytesIn', 'BytesOut'];

const TRANSIT_METRIC_TYPES = ['NetworkLink', 'VpnLink', 'WedgePeeringConnection'];

export const Transit: React.FC<TransitProps> = ({ timeRange, selectedTabName }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTabName === TabName.Cloud) {
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
    }
  }, [timeRange, selectedTabName]);

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
            <MultiLineChart dataValueSuffix="bytes" inputData={metricsData} yAxisText="bytes" xAxisText={getChartXAxisLabel(metricsData)} />
          </Chart>
        )}
      </ChartContainerStyles>
    </div>
  );
};
