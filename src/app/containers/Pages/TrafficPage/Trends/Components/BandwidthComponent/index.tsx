import React from 'react';
import { createTestData_SANKEY, ISankeyRes, ITesseractGetBytesBetweenSegmentsResponse } from 'lib/api/ApiModels/Sessions/apiModel';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import SankeyChart from 'app/components/Charts/SankeyChart';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from '../../styles';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import * as helper from './helper';

interface Props {}

const BandwidthComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const { response, loading, error, onGet } = useGet<ITesseractGetBytesBetweenSegmentsResponse>();
  const [data, setData] = React.useState<ISankeyRes>(null);

  React.useEffect(() => {
    if (traffic.trendsPeriod) {
      onTryToLoadData(traffic.trendsPeriod);
    }
  }, [traffic.trendsPeriod]);

  React.useEffect(() => {
    if (response && response.bytesBetweenSegments && response.bytesBetweenSegments.length) {
      const _data: ISankeyRes = helper.createSankeyData(response.bytesBetweenSegments);
      setData(_data);
    } else {
      const _testData = createTestData_SANKEY();
      const _data: ISankeyRes = helper.createSankeyData(_testData.bytesBetweenSegments);
      console.log(_data);
      setData(_data);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setData(null);
    }
  }, [error]);

  const onTryToLoadData = async (timePeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => {
    await onGet(TesseractApi.getSegmentsBytes(timePeriod), userContext.accessToken!);
  };
  return (
    <ChartContainer margin="0 0 20px 0">
      <ChartHeader>
        <ChartLabel className="textOverflowEllips">Bandwidth (Transit)</ChartLabel>
      </ChartHeader>

      <ChartWrapper>
        {!error && data && data.sankey && data.sankey.links && data.sankey.links.length ? (
          <SankeyChart data={data.sankey} onLinkClick={(netName: string, destName: string) => {}} />
        ) : (
          <ErrorMessage color="var(--_primaryTextColor)" margin="auto" fontSize={20}>
            No data
          </ErrorMessage>
        )}
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%" zIndex={10}>
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {error && <ErrorMessage>{error.message || 'Something went wrong'}</ErrorMessage>}
      </ChartWrapper>
    </ChartContainer>
  );
};
export default React.memo(BandwidthComponent);
