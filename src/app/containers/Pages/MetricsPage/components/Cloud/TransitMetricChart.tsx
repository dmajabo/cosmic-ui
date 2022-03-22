import React, { useContext, useEffect, useState } from 'react';
import { createApiClient } from 'lib/api/http/apiClient';
import LoadingIndicator from 'app/components/Loading';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { Chart, ChartContainerStyles } from 'app/components/ChartContainer/styles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { checkforNoData } from '../Performance Dashboard/filterFunctions';
import { PerformanceDashboardStyles } from '../Performance Dashboard/PerformanceDashboardStyles';
import { MetricKeyValue } from '../Performance Dashboard/PacketLoss';
import { TransitMetricsLineChart } from './TransitMetricsLineChart';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { TransitSelectOption } from './Transit';
import { TransitMetricsParams } from 'lib/api/http/SharedTypes';

interface TransitMetricChartProps {
  readonly selectedTGW: TransitSelectOption[];
  readonly timeRange: string;
  readonly metricNames: string[];
  readonly chartDataSuffix: string;
  readonly chartTitle: string;
}

export const TransitMetricChart: React.FC<TransitMetricChartProps> = ({ selectedTGW, timeRange, metricNames, chartDataSuffix, chartTitle }) => {
  const classes = PerformanceDashboardStyles();
  const [transitMetricsData, setTransitMetricsData] = useState<MetricKeyValue>({});
  const [anomalyCount, setAnomalyCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  useEffect(() => {
    // const promises = TRANSIT_METRIC_TYPES.map(type => {
    //   const params: TransitMetricsParams = {
    //     startTime: timeRange,
    //     endTime: '-0m',
    //     type: type,
    //     metricNames: TRANSIT_METRICNAMES,
    //   };
    //   return apiClient.getTelemetryMetrics(type, params);
    // });
    // setIsLoading(true);
    // Promise.all(promises)
    //   .then(responses => {
    //     const transitMetricsData: MultiLineMetricsData[] = responses.reduce((acc, nextValue) => {
    //       if (nextValue.metrics.length > 0) {
    //         const typeMetricsData: MultiLineMetricsData[] = nextValue.metrics.map(item => ({
    //           name: `${nextValue.type}_${item.resourceId}_${item.key}`,
    //           metrics: item.ts,
    //         }));
    //         return acc.concat(typeMetricsData);
    //       } else {
    //         return acc.concat([]);
    //       }
    //     }, []);
    //     setTransitMetricsData(transitMetricsData);
    //     setIsLoading(false);
    //   })
    //   .catch(() => {
    //     setIsError(true);
    //     setIsLoading(false);
    //   });
    const promises = selectedTGW.map(item => {
      const params: TransitMetricsParams = {
        startTime: timeRange,
        endTime: '-0m',
        type: item.type,
        metricNames: metricNames,
        cloudExtId: item.value,
      };
      return apiClient.getTelemetryMetrics(item.label, params);
    });
    Promise.all(promises).then(responses => {
      const newTransitMetricsData: MetricKeyValue = {};
      responses.forEach(response => {
        if (response.metrics.length) {
          response.metrics.forEach(item => {
            transitMetricsData[`${response.name}_${item.key}`] = item.ts;
            if (item.key.includes('_anomaly')) {
              setAnomalyCount(anomalyCount + item.ts.length);
            }
          });
        }
      });
      setTransitMetricsData(newTransitMetricsData);
    });
  }, [timeRange]);

  return (
    <>
      <div className={classes.metricComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>{chartTitle}</div>
        <div className={classes.pillContainer}>
          <span className={classes.pillText}>{anomalyCount}</span>
        </div>
      </div>
      <ChartContainerStyles style={{ maxWidth: '100%', minHeight: 420, maxHeight: 420 }}>
        {isEmpty(selectedTGW) ? (
          <EmptyText>To see the data select TGW</EmptyText>
        ) : isLoading ? (
          <LoadingIndicator margin="auto" />
        ) : isError ? (
          <ErrorMessage>Something went wrong.Please Try again</ErrorMessage>
        ) : checkforNoData(transitMetricsData) ? (
          <EmptyText>No Data</EmptyText>
        ) : (
          <Chart>
            <TransitMetricsLineChart dataValueSuffix={chartDataSuffix} selectedTGW={selectedTGW} inputData={transitMetricsData} />
          </Chart>
        )}
      </ChartContainerStyles>
    </>
  );
};
