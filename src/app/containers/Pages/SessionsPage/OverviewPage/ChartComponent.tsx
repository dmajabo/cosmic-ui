import React, { useContext } from 'react';
import { ChartWrapper } from '../../Shared/styles';
import SankeyChart from 'app/components/Charts/SankeyChart';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionsApi } from 'lib/api/ApiModels/Sessions/endpoints';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { SessionsSelectValuesTypes, SESSIONS_SELECT_VALUES } from 'lib/hooks/Sessions/model';
interface IProps {}

const ChartComponent: React.FC<IProps> = (props: IProps) => {
  const userContext = useContext<UserContextState>(UserContext);
  const { sessions } = useSessionsDataContext();
  const { response, loading, error, onGet } = useGet<ISankeyRes>();
  const [data, setData] = React.useState<ISankeyRes>(null);
  React.useEffect(() => {
    if (sessions.sessionsOverviewPeriod) {
      onTryToLoadData(sessions.sessionsOverviewPeriod);
    }
  }, [sessions.sessionsOverviewPeriod]);

  React.useEffect(() => {
    if (response && response.sankey) {
      setData({ ...response });
    }
  }, [response]);

  const onTryToLoadData = async (timePeriod: SessionsSelectValuesTypes) => {
    const _item = SESSIONS_SELECT_VALUES.find(it => it.id === timePeriod || it.value === timePeriod);
    await onGet(SessionsApi.getSankeyData(_item.data || '-7d'), userContext.idToken!);
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
