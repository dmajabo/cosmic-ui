import React, { useContext } from 'react';
import { LineChart } from 'app/containers/Pages/TopologyPage/TopologyMetrics/LineChart';
import LoadingIndicator from 'app/components/Loading';
import { GetMetricsResponse, MetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { MetricsKeyTypes, IMetrickQueryParam } from 'lib/api/ApiModels/Metrics/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ErrorMessage } from '../Basic/ErrorMessage/ErrorMessage';
import { AbsLoaderWrapper } from '../Loading/styles';
import { ChartContainerStyles, ChartTitle, ChartActionBlock, ChartActionLabel, Chart } from './styles';
import { EmptyText } from '../Basic/NoDataStyles/NoDataStyles';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';

interface Props {
  title: string;
  styles?: Object;
  chartType: 'Line';
  id: string;
  queryKey: MetricsKeyTypes;
  queryTimeParam: IMetrickQueryParam;
  dataValueSuffix?: string;
}

const ChartContainer: React.FC<Props> = (props: Props) => {
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<GetMetricsResponse>();
  const [data, setData] = React.useState<MetricsData[] | null>([]);

  React.useEffect(() => {
    getDataAsync(props.id, props.queryKey, props.queryTimeParam);
  }, [props.id, props.queryTimeParam]);

  React.useEffect(() => {
    if (response !== null && response.metrics && response.metrics.keyedmap) {
      let _data = [];
      response.metrics.keyedmap.forEach(it => {
        if (it.key === props.queryKey) {
          _data = _data.concat(it.ts);
        }
      });
      if (!_data.length) {
        setData(null);
      } else {
        setData(_data);
      }
    }
  }, [response]);

  const getDataAsync = async (id: string, key: MetricsKeyTypes, params?: IMetrickQueryParam) => {
    if (!id || !key) {
      return;
    }
    const _param: IMetrickQueryParam = { metricname: key };
    if (params) {
      _param.startTime = params.startTime;
      _param.endTime = params.endTime;
    }
    await onGet(TelemetryApi.getMetricsById(props.id), userContext.accessToken!, _param);
  };

  return (
    <>
      <ChartContainerStyles style={props.styles}>
        <ChartTitle>{props.title}</ChartTitle>
        {data && data.length > 0 && !error && (
          <>
            <ChartActionBlock>
              <ChartActionLabel margin="0 4px 0 0">Open in</ChartActionLabel>
              <ChartActionLabel color="var(--_highlightColor)">Metrics Explorer</ChartActionLabel>
            </ChartActionBlock>
            <Chart>{data && props.chartType === 'Line' && <LineChart dataValueSuffix={props.dataValueSuffix} inputData={data} chartWidth="348" chartHeight="280" />}</Chart>
          </>
        )}
        {data === null && !error && !loading && <EmptyText>No Data</EmptyText>}
        {error && !loading && <ErrorMessage>{error.message}</ErrorMessage>}
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </ChartContainerStyles>
    </>
  );
};

export default React.memo(ChartContainer);
