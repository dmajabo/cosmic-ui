import React from 'react';
import { ActionPart, ActionRowStyles, ContentWrapper, TableWrapper } from '../../Shared/styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IAllSessionsRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionsApi } from 'lib/api/ApiModels/Sessions/endpoints';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import Table from './Table';
import Dropdown from 'app/components/Inputs/Dropdown';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_SELECT_VALUES } from 'lib/hooks/Sessions/model';
import SessionsSwitch from '../Components/SessionsSwitch';
import { ISelectedListItem } from 'lib/models/general';
import { sessionsParamBuilder } from 'lib/api/ApiModels/Sessions/paramBuilder';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';

interface IProps {}

const SessionPage: React.FC<IProps> = (props: IProps) => {
  const { sessions } = useSessionsDataContext();
  const { response, loading, error, onGet } = useGet<IAllSessionsRes>();

  React.useEffect(() => {
    onTryToLoadData();
  }, [sessions.sessionsTabPeriod, sessions.sessionsTabSwitch, sessions.sessionsPageSize]);

  React.useEffect(() => {
    if (response && response.sessions.length) {
      sessions.onSetSessionsData(response.sessions, response.count);
    } else {
      sessions.onSetSessionsData(null, null);
    }
  }, [response]);

  const onTryToLoadData = async () => {
    const _param = sessionsParamBuilder(sessions.sessionsTabPeriod, sessions.sessionsPageSize, sessions.sessionsTabSwitch);
    await onGet(SessionsApi.getAllSessions(), _param);
  };

  const onChangePageSize = (_size: number) => {
    sessions.onChangePageSize(_size);
  };

  const onChangePeriod = (_value: ISelectedListItem<SessionsSelectValuesTypes>) => {
    sessions.onChangeSelectedPeriod(_value, SessionsTabTypes.Sessions);
  };

  const onSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sessions.onChangeSwitch(e.target.checked, SessionsTabTypes.Sessions);
  };

  return (
    <>
      <ActionRowStyles>
        <ActionPart margin="0 auto 0 0">
          <SessionsSwitch checked={sessions.sessionsTabSwitch} onChange={onSwitchChange} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
          <Dropdown label="Show" selectedValue={sessions.sessionsTabPeriod} values={SESSIONS_SELECT_VALUES} onSelectValue={onChangePeriod} />
        </ActionPart>
      </ActionRowStyles>
      <ContentWrapper>
        <TableWrapper>
          <Table logCount={sessions.sessionsCount} isError={error} data={sessions.sessionsData} pageSize={sessions.sessionsPageSize} onChangePageSize={onChangePageSize} />
          {loading && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          )}
        </TableWrapper>
      </ContentWrapper>
    </>
  );
};

export default React.memo(SessionPage);
