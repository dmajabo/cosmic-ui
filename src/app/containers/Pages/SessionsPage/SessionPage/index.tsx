import React, { useContext } from 'react';
import { ActionPart, ActionRowStyles, ContentWrapper, TableWrapper } from '../../Shared/styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IAllSessionsRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionsApi } from 'lib/api/ApiModels/Sessions/endpoints';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import Table from './Table';
import Dropdown from 'app/components/Inputs/Dropdown';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_SELECT_VALUES } from 'lib/hooks/Sessions/model';
import SessionsSwitch from '../Components/SessionsSwitch';
import { ISelectedListItem, ISelectionGridCellValue } from 'lib/models/general';
import { sessionsParamBuilder } from 'lib/api/ApiModels/Sessions/paramBuilder';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import ElasticFilter from 'app/components/Inputs/ElasticFilter';
import { FilterOpperatorsList, ISessionsGridField, SessionGridColumnItems } from './models';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';

interface IProps {}

const SessionPage: React.FC<IProps> = (props: IProps) => {
  const { sessions } = useSessionsDataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IAllSessionsRes>();
  React.useEffect(() => {
    return () => {
      sessions.onClearContext();
    };
  }, []);

  React.useEffect(() => {
    onTryToLoadData(sessions.sessionsPageSize, sessions.sessionsCurrentPage, sessions.sessionsPeriod, sessions.sessionsStitch, sessions.sessionsFilter);
  }, [sessions.sessionsPageSize, sessions.sessionsCurrentPage, sessions.sessionsStitch, sessions.sessionsPeriod, sessions.sessionsFilter]);

  React.useEffect(() => {
    if (response) {
      sessions.onSetSessionsData(response.sessions, response.count);
    } else {
      sessions.onSetSessionsData(null, null);
    }
  }, [response]);

  const onTryToLoadData = async (
    pageSize: number,
    page: number,
    time: SessionsSelectValuesTypes,
    stitch: boolean,
    filterValue: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[],
  ) => {
    const _param = sessionsParamBuilder(pageSize, page, time, stitch, filterValue);
    await onGet(SessionsApi.getAllSessions(), userContext.accessToken!, _param);
  };

  const onChangePageSize = (_size: number, page?: number) => {
    sessions.onChangePageSize(_size, page);
  };

  const onChangeCurrentPage = (_page: number) => {
    sessions.onChangeCurrentPage(_page);
  };

  const onChangePeriod = (_value: ISelectedListItem<SessionsSelectValuesTypes>) => {
    sessions.onChangeSelectedPeriod(_value, SessionsTabTypes.Sessions);
  };

  const onSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sessions.onChangeSwitch(e.target.checked, SessionsTabTypes.Sessions);
  };

  const onClearFilteredItem = (index: number) => {
    const _items: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[] = sessions.sessionsFilter.slice();
    let stIndex = index;
    let count = 1;
    if (_items.length > 1) {
      if (_items[index + 1] && typeof _items[index + 1] === 'string') {
        count = 2;
      } else if (_items[index - 1] && typeof _items[index - 1] === 'string') {
        stIndex = index - 1;
        count = 2;
      }
    }
    _items.splice(stIndex, count);
    sessions.onChangeFilter(_items);
  };

  const onClearFilter = () => {
    sessions.onChangeFilter([]);
  };

  const onAddFilter = (_item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>, index: number | null) => {
    const _items: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[] = sessions.sessionsFilter.slice();
    if (index !== null) {
      _items.splice(index, 1, _item);
    } else {
      if (_items.length >= 1) {
        _items.push(FilterOpperatorsList[0].value);
      }
      _items.push(_item);
    }
    sessions.onChangeFilter(_items);
  };

  const onChangeOperator = (_item: string, index: number) => {
    const _items: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[] = sessions.sessionsFilter.slice();
    _items.splice(index, 1, _item);
    sessions.onChangeFilter(_items);
  };

  return (
    <>
      <ActionRowStyles>
        <ActionPart margin="0 auto 0 0">
          <SessionsSwitch checked={sessions.sessionsStitch} onChange={onSwitchChange} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
          <Dropdown label="Show" selectedValue={sessions.sessionsPeriod} values={SESSIONS_SELECT_VALUES} onSelectValue={onChangePeriod} />
        </ActionPart>
      </ActionRowStyles>
      <ElasticFilter
        onChangeOperator={onChangeOperator}
        onClearFilteredItem={onClearFilteredItem}
        placeholder="Search Filter"
        selectionFilterItems={sessions.sessionsFilter}
        fields={SessionGridColumnItems}
        onAddFilter={onAddFilter}
        onClearFilter={onClearFilter}
      />
      <ContentWrapper>
        <TableWrapper>
          <Table
            currentPage={sessions.sessionsCurrentPage}
            onChangeCurrentPage={onChangeCurrentPage}
            logCount={sessions.sessionsCount}
            isError={error}
            data={sessions.sessionsData}
            pageSize={sessions.sessionsPageSize}
            onChangePageSize={onChangePageSize}
          />
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
