import React from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from '../../styles';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { useGet } from 'lib/api/http/useAxiosHook';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import DonutChart, { PieDataItem } from 'app/components/Charts/DonutChart';
import { ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { convertTimePeriodToQueryDays, TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { IObject } from 'lib/models/general';
interface Props {}

export const DroppedFlowsComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const { response, loading, error, onGet } = useGet<ISankeyRes>();
  const [data, setData] = React.useState<PieDataItem[]>([]);

  React.useEffect(() => {
    onTryLoadSegments(traffic.trendsPeriod);
  }, [traffic.trendsPeriod]);
  React.useEffect(() => {
    if (response && response.sankey) {
      const _data: PieDataItem[] = [];
      const _SourcesNodesObj: IObject<PieDataItem> = {};
      const _TargetNodesObj: IObject<PieDataItem> = {};
      response.sankey.links.forEach(link => {
        if (!_SourcesNodesObj[link.source]) {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          const node = response.sankey.nodes.find(it => it.node === link.source);
          _SourcesNodesObj[link.source] = { name: node.name, value: Number(link.value), color: `#${randomColor}` };
        } else {
          const _newV = _SourcesNodesObj[link.source].value + Number(link.value);
          _SourcesNodesObj[link.source].value = _newV;
        }
        if (!_TargetNodesObj[link.target]) {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          const node = response.sankey.nodes.find(it => it.node === link.target);
          _TargetNodesObj[link.target] = { name: node.name, value: Number(link.value), color: `#${randomColor}` };
        } else {
          const _newV = _TargetNodesObj[link.target].value + Number(link.value);
          _TargetNodesObj[link.target].value = _newV;
        }
      });
      for (let key in _SourcesNodesObj) {
        _data.push(_SourcesNodesObj[key]);
      }
      for (let key in _TargetNodesObj) {
        _data.push(_TargetNodesObj[key]);
      }
      setData(_data);
    }
  }, [response]);

  const onTryLoadSegments = async (timePeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => {
    const _time: string = convertTimePeriodToQueryDays(timePeriod);
    await onGet(TelemetryApi.getSankeyData(_time || '-7d'), userContext.accessToken!);
  };
  return (
    <ChartContainer margin="0 0 20px 0">
      <ChartHeader>
        <ChartLabel className="textOverflow">Dropped Flows</ChartLabel>
      </ChartHeader>

      <ChartWrapper>
        {!error && data && <DonutChart data={data} />}
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {error && <ErrorMessage>{error.message || 'Something went wrong'}</ErrorMessage>}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default React.memo(DroppedFlowsComponent);
