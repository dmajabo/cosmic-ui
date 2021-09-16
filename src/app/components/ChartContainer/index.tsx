import React from 'react';
import { LineChart } from 'app/containers/Pages/TopologyPage/TopologyMetrics/LineChart';
import ChartWrapper from './ChartWrapper';
import { useGet } from 'lib/api/http/useGet';
import { GetMetricsResponse, MetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { IMetrickQueryParam, MetricsApi, MetricsKeyTypes } from 'lib/api/ApiModels/Metrics/endpoints';

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
  const [showLoader, setLoader] = React.useState<boolean>(false);
  const [stateGetMetrics, getMetricsAsync] = useGet<GetMetricsResponse>();
  const [data, setData] = React.useState<MetricsData[]>([]);

  React.useEffect(() => {
    setLoader(true);
    getMetrics(props.id, props.queryTimeParam, props.queryKey);
  }, [props.queryTimeParam]);
  React.useEffect(() => {
    if (stateGetMetrics && !stateGetMetrics.isLoading && stateGetMetrics.response && stateGetMetrics.response.item && stateGetMetrics.response.item.metrics) {
      let _data = [];
      stateGetMetrics.response.item.metrics.keyedmap.forEach(it => {
        if (it.key === props.queryKey) {
          _data = _data.concat(it.ts);
        }
      });
      setData(_data);
    }
    if (stateGetMetrics && !stateGetMetrics.isLoading && (stateGetMetrics.isError || !stateGetMetrics.response || !stateGetMetrics.response.item)) {
      console.error(stateGetMetrics);
    }
    if (showLoader && stateGetMetrics && !stateGetMetrics.isLoading) {
      setLoader(false);
    }
  }, [stateGetMetrics]);

  const getMetrics = async (id: string, params: IMetrickQueryParam, key: MetricsKeyTypes) => {
    const _param: IMetrickQueryParam = { metricname: key };
    if (params && params.startTime) {
      _param.startTime = params.startTime;
    }
    if (params && params.endTime) {
      _param.endTime = params.endTime;
    }
    await getMetricsAsync(MetricsApi.getMetricsById(id), _param);
  };

  return (
    <ChartWrapper title={props.title} styles={props.styles} showLoader={showLoader}>
      {props.chartType === 'Line' && <LineChart dataValueSuffix={props.dataValueSuffix} inputData={data} chartWidth="348" chartHeight="280" />}
    </ChartWrapper>
  );
};

export default React.memo(ChartContainer);
