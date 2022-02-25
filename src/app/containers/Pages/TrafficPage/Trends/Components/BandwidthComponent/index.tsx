import React from 'react';
import { createTestData_SANKEY, ISankeyRes, ITesseractGetBytesBetweenSegmentsResponse } from 'lib/api/ApiModels/Sessions/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import SankeyChart from 'app/components/Charts/SankeyChart';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import * as helper from './helper';

interface Props {}

const BandwidthComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<ITesseractGetBytesBetweenSegmentsResponse>();
  const [data, setData] = React.useState<ISankeyRes>(null);

  React.useEffect(() => {
    onTryToLoadData(TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_DAY);
  }, []);

  React.useEffect(() => {
    if (response && response.bytesBetweenSegments && response.bytesBetweenSegments.length) {
      const _data: ISankeyRes = helper.createSankeyData(response.bytesBetweenSegments);
      setData(_data);
    } else {
      const _testData = createTestData_SANKEY();
      const _data: ISankeyRes = helper.createSankeyData(_testData.bytesBetweenSegments);
      //console.log(_data);
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
    <>
      {!error && data && data.sankey && data.sankey.links && data.sankey.links.length ? (
        <SankeyChart data={data.sankey} onLinkClick={(netName: string, destName: string) => {}} />
      ) : (
        <ErrorMessage color="var(--_primaryTextColor)" margin="auto" fontSize={20}>
          No data
        </ErrorMessage>
      )}
      {loading && <LoadingIndicator margin="auto" />}
      {error && <ErrorMessage>{error.message || 'Something went wrong'}</ErrorMessage>}
    </>
  );
};
export default React.memo(BandwidthComponent);
