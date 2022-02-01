import React from 'react';
import { ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { useGet } from 'lib/api/http/useAxiosHook';
import { convertTimePeriodToQueryDays, TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import SankeyChart from 'app/components/Charts/SankeyChart';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from '../../styles';
interface Props {}

const BandwidthComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const { response, loading, error, onGet } = useGet<ISankeyRes>();
  const [data, setData] = React.useState<ISankeyRes>(null);

  React.useEffect(() => {
    if (traffic.trendsPeriod) {
      onTryToLoadData(traffic.trendsPeriod);
    }
  }, [traffic.trendsPeriod]);

  React.useEffect(() => {
    if (response) {
      // const _d: ISankeyRes = {
      //   sankey: {
      //     time: '',
      //     nodes: [
      //       { node: 0, name: 'NETWORK_2', type: 'SANKEY_NETWORK' },
      //       { node: 1, name: 'DESTINATION_2', type: 'SANKEY_DESTINATION' },
      //       { node: 2, name: 'NETWORK_5', type: 'SANKEY_NETWORK' },
      //       { node: 3, name: 'DESTINATION_5', type: 'SANKEY_DESTINATION' },
      //       { node: 4, name: 'NETWORK_6', type: 'SANKEY_NETWORK' },
      //       { node: 5, name: 'DESTINATION_6', type: 'SANKEY_DESTINATION' },
      //       { node: 6, name: 'NETWORK_7', type: 'SANKEY_NETWORK' },
      //       { node: 7, name: 'DESTINATION_7', type: 'SANKEY_DESTINATION' },
      //       { node: 8, name: 'NETWORK_1', type: 'SANKEY_NETWORK' },
      //       { node: 9, name: 'DESTINATION_1', type: 'SANKEY_DESTINATION' },
      //       { node: 10, name: 'NETWORK_3', type: 'SANKEY_NETWORK' },
      //       { node: 11, name: 'DESTINATION_3', type: 'SANKEY_DESTINATION' },
      //       { node: 12, name: 'NETWORK_4', type: 'SANKEY_NETWORK' },
      //       { node: 13, name: 'DESTINATION_4', type: 'SANKEY_DESTINATION' },
      //       { node: 14, name: 'NETWORK_8', type: 'SANKEY_NETWORK' },
      //       { node: 15, name: 'DESTINATION_8', type: 'SANKEY_DESTINATION' },
      //       { node: 16, name: 'NETWORK_9', type: 'SANKEY_NETWORK' },
      //       { node: 17, name: 'DESTINATION_9', type: 'SANKEY_DESTINATION' },
      //       { node: 18, name: 'NETWORK_0', type: 'SANKEY_NETWORK' },
      //       { node: 19, name: 'DESTINATION_0', type: 'SANKEY_DESTINATION' },
      //     ],
      //     links: [
      //       { source: 0, target: 1, value: 34 },
      //       { source: 2, target: 3, value: 34 },
      //       { source: 4, target: 5, value: 34 },
      //       { source: 6, target: 7, value: 34 },
      //       { source: 8, target: 9, value: 34 },
      //       { source: 10, target: 11, value: 34 },
      //       { source: 12, target: 13, value: 34 },
      //       { source: 14, target: 15, value: 34 },
      //       { source: 16, target: 17, value: 34 },
      //       { source: 18, target: 19, value: 34 },
      //     ],
      //   },
      //   netcount: 10,
      //   tgwcount: 0,
      //   appcount: 1,
      // };
      setData({ ...response });
    }
  }, [response]);

  const onTryToLoadData = async (timePeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => {
    const _time: string = convertTimePeriodToQueryDays(timePeriod);
    await onGet(TelemetryApi.getSankeyData(_time || '-7d'), userContext.accessToken!);
  };
  return (
    <ChartContainer margin="0 0 20px 0">
      <ChartHeader>
        <ChartLabel className="textOverflowEllips">Bandwidth (Transit)</ChartLabel>
      </ChartHeader>

      <ChartWrapper>
        {!error && data && data.sankey && <SankeyChart data={data.sankey} onLinkClick={(netName: string, destName: string) => {}} />}
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
export default React.memo(BandwidthComponent);
