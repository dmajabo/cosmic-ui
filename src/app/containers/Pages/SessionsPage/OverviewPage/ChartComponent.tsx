import React from 'react';
import { ChartWrapper } from '../../Shared/styles';
import SankeyChart from 'app/components/Charts/SankeyChart';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionsApi } from 'lib/api/ApiModels/Sessions/endpoints';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
interface IProps {}

const ChartComponent: React.FC<IProps> = (props: IProps) => {
  const { response, loading, error, onGet } = useGet<ISankeyRes>();
  const [data, setData] = React.useState<ISankeyRes>(null);
  React.useEffect(() => {
    onTryToLoadData();
  }, []);

  React.useEffect(() => {
    if (response && response.sankey) {
      setData({ ...response });
    }
  }, [response]);

  const onTryToLoadData = async () => {
    await onGet(SessionsApi.getSankeyData());
  };

  return (
    <>
      <ChartWrapper height="660px" padding="0">
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {error && !loading && <>{error.message}</>}
        {data && data.sankey && <SankeyChart data={data.sankey} />}
      </ChartWrapper>
    </>
  );
};

export default React.memo(ChartComponent);
