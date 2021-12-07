import React, { useContext } from 'react';
import { ActionPart, ActionRowStyles, ContentWrapper, PageContentWrapper, TableWrapper } from '../../Shared/styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IAllSessionsRes, ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionsApi } from 'lib/api/ApiModels/Sessions/endpoints';
import Table from './Table';
import Dropdown from 'app/components/Inputs/Dropdown';
import { PAGING_DEFAULT_PAGE_SIZE, SessionsSelectValuesTypes, SESSIONS_SELECT_VALUES } from 'lib/hooks/Sessions/model';
import SessionsSwitch from './SessionsSwitch';
import { ISelectedListItem, ISelectionGridCellValue } from 'lib/models/general';
import { sessionsParamBuilder } from 'lib/api/ApiModels/Sessions/paramBuilder';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import ElasticFilter from 'app/components/Inputs/ElasticFilter';
import { FilterOpperatorsList, ISessionsGridField, SessionGridColumnItems } from './models';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import AggregateTable from './AggregateTable';
import { convertStringToNumber } from 'lib/helpers/general';

interface IProps {}

const SessionPage: React.FC<IProps> = (props: IProps) => {
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IAllSessionsRes>();
  const { response: aggregRes, loading: loadingAggreg, onGet: onGetAggregatedData } = useGet<IAllSessionsRes>();
  const [data, setData] = React.useState<ISession[]>([]);
  const [aggregatedData, setAggregatedData] = React.useState<any[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [aggregCount, setAggregTotalCount] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [period, setPeriod] = React.useState<SessionsSelectValuesTypes>(SESSIONS_SELECT_VALUES[0].value);
  const [stitch, setStitch] = React.useState<boolean>(false);
  const [filterValue, setSessionsFilterValue] = React.useState<(ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[]>([]);
  React.useEffect(() => {
    onTryToLoadData(pageSize, currentPage, period, stitch, filterValue);
  }, [pageSize, currentPage, period, stitch, filterValue]);

  React.useEffect(() => {
    if (response && response.sessions) {
      const startIndex = (currentPage - 1) * pageSize;
      const _items = response.sessions && response.sessions.length ? response.sessions.map((it, i) => ({ ...it, rowIndex: i + startIndex })) : [];
      const _total = convertStringToNumber(response.count);
      setData(_items);
      setTotalCount(_total);
      setAggregatedData([]);
      setAggregTotalCount(0);
      return;
    }
    setData([]);
    setAggregatedData([]);
    setTotalCount(0);
    setAggregTotalCount(0);
  }, [response]);

  React.useEffect(() => {
    if (aggregRes && aggregRes.sessions) {
      const startIndex = (currentPage - 1) * pageSize;
      const _items = aggregRes.sessions && aggregRes.sessions.length ? aggregRes.sessions.map((it, i) => ({ ...it, rowIndex: i + startIndex })) : [];
      const _total = convertStringToNumber(aggregRes.count);
      setData([]);
      setTotalCount(0);
      setAggregatedData(_items);
      setAggregTotalCount(_total);
      return;
    }
    setData([]);
    setTotalCount(0);
    setAggregatedData([]);
    setAggregTotalCount(0);
  }, [aggregRes]);

  const onTryToLoadData = (
    pageSize: number,
    page: number,
    time: SessionsSelectValuesTypes,
    stitch: boolean,
    filterValue: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[],
  ) => {
    const _param = sessionsParamBuilder(pageSize, page, time, stitch, filterValue);
    if (stitch) {
      loadAggregatedData(_param);
      return;
    }
    loadSessionsData(_param);
  };

  const loadAggregatedData = async _param => {
    await onGetAggregatedData(SessionsApi.getAggregatedSessions(), userContext.accessToken!, _param);
  };

  const loadSessionsData = async _param => {
    await onGet(SessionsApi.getAllSessions(), userContext.accessToken!, _param);
  };

  const onChangePageSize = (_size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(_size);
      return;
    }
    setPageSize(_size);
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
  };

  const onChangePeriod = (_item: ISelectedListItem<SessionsSelectValuesTypes>) => {
    setPeriod(_item.value);
  };

  const onSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setPageSize(PAGING_DEFAULT_PAGE_SIZE);
    setStitch(e.target.checked);
  };

  const onClearFilteredItem = (index: number) => {
    const _items: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[] = filterValue && filterValue.length ? filterValue.slice() : [];
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
    setSessionsFilterValue(_items);
  };

  const onClearFilter = () => {
    setSessionsFilterValue([]);
  };

  const onAddFilter = (_item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>, index: number | null) => {
    const _items: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[] = filterValue && filterValue.length ? filterValue.slice() : [];
    if (index !== null) {
      _items.splice(index, 1, _item);
    } else {
      if (_items.length >= 1) {
        _items.push(FilterOpperatorsList[0].value);
      }
      _items.push(_item);
    }
    setSessionsFilterValue(_items);
  };

  const onChangeOperator = (_item: string, index: number) => {
    const _items: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[] = filterValue && filterValue.length ? filterValue.slice() : [];
    _items.splice(index, 1, _item);
    setSessionsFilterValue(_items);
  };

  return (
    <PageContentWrapper style={{ width: '92vw', height: '78vh', overflow: 'auto', borderRadius: '6px' }}>
      <ActionRowStyles margin="0 0 40px 0">
        <ActionPart margin="0 auto 0 0">
          <SessionsSwitch checked={stitch} onChange={onSwitchChange} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
          <Dropdown
            wrapStyles={{ height: '50px', border: '1px solid var(--_primaryButtonBorder)', borderRadius: '6px' }}
            label="Show"
            selectedValue={period}
            values={SESSIONS_SELECT_VALUES}
            onSelectValue={onChangePeriod}
          />
        </ActionPart>
      </ActionRowStyles>
      <ElasticFilter
        onChangeOperator={onChangeOperator}
        onClearFilteredItem={onClearFilteredItem}
        placeholder="Search Filter"
        selectionFilterItems={filterValue}
        fields={SessionGridColumnItems}
        onAddFilter={onAddFilter}
        onClearFilter={onClearFilter}
      />
      <ContentWrapper style={{ flexGrow: 1 }}>
        <TableWrapper style={{ minHeight: 'unset', height: '100%' }}>
          {!stitch && (
            <Table currentPage={currentPage} onChangeCurrentPage={onChangeCurrentPage} logCount={totalCount} isError={error} data={data} pageSize={pageSize} onChangePageSize={onChangePageSize} />
          )}
          {stitch && (
            <AggregateTable
              currentPage={currentPage}
              onChangeCurrentPage={onChangeCurrentPage}
              isError={error}
              data={aggregatedData}
              logCount={aggregCount}
              pageSize={pageSize}
              onChangePageSize={onChangePageSize}
            />
          )}
          {(loading || loadingAggreg) && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          )}
        </TableWrapper>
      </ContentWrapper>
    </PageContentWrapper>
  );
};

export default React.memo(SessionPage);
