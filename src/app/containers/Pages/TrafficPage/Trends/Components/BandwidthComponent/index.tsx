import React from 'react';
import { ITesseractGetBytesBetweenSegmentsResponse } from 'lib/api/ApiModels/Sessions/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import ChordDependencyChart from "../../../../../../components/Charts/ChordDependencyChart";
import {processData} from "../../../../../../components/Charts/ChordDependencyChart/chordDependencyHelper";
import {ChartContainer, ChartHeader, ChartLabel} from '../../styles';

interface Props {}

const BandwidthComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<ITesseractGetBytesBetweenSegmentsResponse>();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    onTryToLoadData(TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_WEEK);
  }, []);

  React.useEffect(() => {
    //console.log(response)
    if (response && response.bytesBetweenSegments && response.bytesBetweenSegments.length) {
      const _data = processData(response);
      console.log(_data)
      setData(_data);
    }
     // else {
     //  const _testData = getMockData();
     //  const _data = processData(_testData);
     //  //console.log(_data);
     //  setData(_data);
     // }
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
    <ChartContainer margin="20px 0 0">
      <ChartHeader>
        <ChartLabel className="textOverflowEllips">Bandwidth (Transit)</ChartLabel>
      </ChartHeader>
      {!error && data && data?.length ? (
        <ChordDependencyChart data={data} />
      ) : (
        <ErrorMessage color="var(--_primaryTextColor)" margin="auto" fontSize={20}>
          No data
        </ErrorMessage>
      )}
      {loading && <LoadingIndicator margin="auto" />}
      {error && <ErrorMessage>{error.message || 'Something went wrong'}</ErrorMessage>}
    </ChartContainer>
  );
};
export default React.memo(BandwidthComponent);
