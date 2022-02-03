import React from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from '../../styles';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { useGet } from 'lib/api/http/useAxiosHook';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import DonutChart, { PieDataItem } from 'app/components/Charts/DonutChart';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import { ITesseractGetTotalSessionsPerSegmentResponse } from 'lib/api/ApiModels/Sessions/apiModel';
interface Props {}

export const DroppedFlowsComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const { response, loading, error, onGet } = useGet<ITesseractGetTotalSessionsPerSegmentResponse>();
  const [data, setData] = React.useState<PieDataItem[]>([]);

  React.useEffect(() => {
    onTryLoadSegments(traffic.trendsPeriod);
  }, [traffic.trendsPeriod]);
  React.useEffect(() => {
    if (response && response.segments) {
      const _data: PieDataItem[] = response.segments.length ? response.segments.map(it => ({ name: it.segmentId, value: it.count })) : [];
      // for (let i = 0; i < 5; i++) {
      //   _data.push({ name: `Site _${i}`, value: Math.floor(Math.random() * 200) });
      // }
      setData(_data);
    }
  }, [response]);

  const onTryLoadSegments = async (timePeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => {
    await onGet(TesseractApi.getSessionsPerSegment(timePeriod || TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_HOUR), userContext.accessToken!);
  };
  return (
    <ChartContainer margin="0 0 20px 0">
      <ChartHeader>
        <ChartLabel className="textOverflowEllips">Dropped Flows</ChartLabel>
      </ChartHeader>

      <ChartWrapper>
        {!error && data && data.length ? <DonutChart data={data} /> : null}
        {!error && !data.length ? (
          <ErrorMessage color="var(--_primaryTextColor)" margin="auto" fontSize={20}>
            No data
          </ErrorMessage>
        ) : null}
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
