import React, { useContext, useEffect, useState } from 'react';
import LoadingIndicator from 'app/components/Loading';
import { MetricsData, MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { MetricsKeyTypes, IMetrickQueryParam } from 'lib/api/ApiModels/Metrics/apiModel';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { Chart, ChartActionBlock, ChartActionLabel, ChartContainerStyles, ChartTitle } from 'app/components/ChartContainer/styles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { createApiClient } from 'lib/api/http/apiClient';
import { MultiLineChart } from './MultiLineChart';
import isEmpty from 'lodash/isEmpty';

interface MultiLineChartContainerProps {
  readonly title: string;
  readonly styles?: Object;
  readonly chartType: 'Line';
  readonly id: string;
  readonly queryKeys: MetricsKeyTypes[];
  readonly queryTimeParam: IMetrickQueryParam;
  readonly dataValueSuffix?: string;
}

const ERROR_TEXT = 'Something went wrong.Please try again';

const isMetricsEmpty = (metrics: MultiLineMetricsData[]) => {
  const reducedMetrics: MetricsData[] = metrics.reduce((acc, nextValue) => acc.concat(nextValue.metrics), []);
  return isEmpty(reducedMetrics) ? true : false;
};

const MultiLineChartContainer: React.FC<MultiLineChartContainerProps> = (props: MultiLineChartContainerProps) => {
  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);
  const [metricsData, setMetricsData] = useState<MultiLineMetricsData[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMetrics(props.id, props.queryKeys, props.queryTimeParam);
  }, [props.id, props.queryTimeParam]);

  const getMetrics = async (id: string, keys: MetricsKeyTypes[], params?: IMetrickQueryParam) => {
    if (!id || !keys) {
      return;
    }
    const promises = keys.map(key => {
      const _param: IMetrickQueryParam = { metricname: key };
      if (params) {
        _param.startTime = params.startTime;
        _param.endTime = params.endTime;
      }
      return apiClient.getMetricsResponse(id, _param);
    });
    setIsLoading(true);
    Promise.all(promises)
      .then(responses => {
        const metricsData: MultiLineMetricsData[] = responses.map(response => {
          if (response) {
            const tsData: MetricsData[] = response.metrics.keyedmap.reduce((acc, nextValue) => acc.concat(nextValue.ts), []);
            return { name: response.name, metrics: tsData };
          } else {
            return { name: '', metrics: [] };
          }
        });
        setIsLoading(false);
        setMetricsData(metricsData);
      })
      .catch(() => {
        setError(ERROR_TEXT);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ChartContainerStyles style={props.styles}>
        <ChartTitle>{props.title}</ChartTitle>
        {isLoading ? (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : isMetricsEmpty(metricsData) ? (
          <EmptyText>No Data</EmptyText>
        ) : (
          <>
            <ChartActionBlock>
              <ChartActionLabel margin="0 4px 0 0">Open in</ChartActionLabel>
              <ChartActionLabel color="var(--_highlightColor)">Metrics Explorer</ChartActionLabel>
            </ChartActionBlock>
            <Chart>{metricsData && props.chartType === 'Line' && <MultiLineChart dataValueSuffix={props.dataValueSuffix} inputData={metricsData} chartWidth="348" chartHeight="280" />}</Chart>
          </>
        )}
      </ChartContainerStyles>
    </>
  );
};

export default React.memo(MultiLineChartContainer);
