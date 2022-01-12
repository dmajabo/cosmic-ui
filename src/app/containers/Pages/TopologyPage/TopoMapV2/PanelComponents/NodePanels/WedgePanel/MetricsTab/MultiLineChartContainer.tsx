import React, { useContext, useEffect, useState } from 'react';
import { LineChart } from 'app/containers/Pages/TopologyPage/TopologyMetrics/LineChart';
import LoadingIndicator from 'app/components/Loading';
import { GetMetricsResponse, MetricsData, MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { MetricsKeyTypes, IMetrickQueryParam } from 'lib/api/ApiModels/Metrics/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { Chart, ChartActionBlock, ChartActionLabel, ChartContainerStyles, ChartTitle } from 'app/components/ChartContainer/styles';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { createApiClient } from 'lib/api/http/apiClient';
import { MultiLineChart } from './MultiLineChart';

interface MultiLineChartContainerProps {
  readonly title: string;
  readonly styles?: Object;
  readonly chartType: 'Line';
  readonly id: string;
  readonly queryKeys: MetricsKeyTypes[];
  readonly queryTimeParam: IMetrickQueryParam;
  readonly dataValueSuffix?: string;
}

const errorText = 'Something went wrong.Please try again';

const MultiLineChartContainer: React.FC<MultiLineChartContainerProps> = (props: MultiLineChartContainerProps) => {
  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);
  //   const { response, loading, error, onGet } = useGet<GetMetricsResponse>();
  //   const [data, setData] = React.useState<MetricsData[] | null>([]);

  //   React.useEffect(() => {
  //     getDataAsync(props.id, props.queryKey, props.queryTimeParam);
  //   }, [props.id, props.queryTimeParam]);

  //   React.useEffect(() => {
  //     if (response !== null && response.metrics && response.metrics.keyedmap) {
  //       let _data = [];
  //       response.metrics.keyedmap.forEach(it => {
  //         if (it.key === props.queryKey) {
  //           _data = _data.concat(it.ts);
  //         }
  //       });
  //       if (!_data.length) {
  //         setData(null);
  //       } else {
  //         setData(_data);
  //       }
  //     }
  //   }, [response]);

  //   const getDataAsync = async (id: string, key: MetricsKeyTypes, params?: IMetrickQueryParam) => {
  //     if (!id || !key) {
  //       return;
  //     }
  //     const _param: IMetrickQueryParam = { metricname: key };
  //     if (params) {
  //       _param.startTime = params.startTime;
  //       _param.endTime = params.endTime;
  //     }
  //     await onGet(TelemetryApi.getMetricsById(props.id), userContext.accessToken!, _param);
  //   };

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
        setError(errorText);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ChartContainerStyles style={props.styles}>
        <ChartTitle>{props.title}</ChartTitle>
        {metricsData && metricsData.length > 0 && !error && (
          <>
            <ChartActionBlock>
              <ChartActionLabel margin="0 4px 0 0">Open in</ChartActionLabel>
              <ChartActionLabel color="var(--_highlightColor)">Metrics Explorer</ChartActionLabel>
            </ChartActionBlock>
            <Chart>{metricsData && props.chartType === 'Line' && <MultiLineChart dataValueSuffix={props.dataValueSuffix} inputData={metricsData} chartWidth="348" chartHeight="280" />}</Chart>
          </>
        )}
        {metricsData.length == 0 && !error && !isLoading && <EmptyText>No Data</EmptyText>}
        {error && !isLoading && <ErrorMessage>{error}</ErrorMessage>}
        {isLoading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </ChartContainerStyles>
    </>
  );
};

export default React.memo(MultiLineChartContainer);
