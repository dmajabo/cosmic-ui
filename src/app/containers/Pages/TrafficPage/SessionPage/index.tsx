import React, { useContext, useState } from 'react';
import { ActionPart, ActionRowStyles, ContentWrapper, PageContentWrapper, TableWrapper } from '../../Shared/styles';
import { useGet, useGetChainData } from 'lib/api/http/useAxiosHook';
import { IAllSessionsRes, INetworkSession, INetworkSessionSummary, INetworkVendorSessionSummary, ITesseractListStitchedSessionsResponse } from 'lib/api/ApiModels/Sessions/apiModel';
import Table from './Table';
// import Dropdown from 'app/components/Inputs/Dropdown';
import { SessionsTabTypes } from 'lib/hooks/Sessions/model';
import SessionsSwitch from './SessionsSwitch';
// import { ISelectedListItem } from 'lib/models/general';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import ElasticFilter from 'app/components/Inputs/ElasticFilter';
import { FilterOpperatorsList, SessionElasticFieldItems } from './models';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import StitchedTable from './StitchedTable';
import { convertStringToNumber } from 'lib/helpers/general';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import IconButton from 'app/components/Buttons/IconButton';
import { refreshIcon } from 'app/components/SVGIcons/refresh';
import {
  convertPeriodToUserFriendlyString,
  ElasticFilterSuffics,
  IElasticField,
  IElasticFilterModel,
  sessionsParamBuilder,
  SESSIONS_TIME_RANGE_QUERY_TYPES,
  stitchSessionsParamBuilder,
} from 'lib/api/ApiModels/paramBuilders';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import MatSelect from 'app/components/Inputs/MatSelect';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { IPolicysvcListSegmentPsResponse } from 'lib/api/ApiModels/Policy/Segment';

interface IProps {}

interface StitchedResponseWithSegments {
  sessionSummary: ITesseractListStitchedSessionsResponse;
  segments: IPolicysvcListSegmentPsResponse;
}

const SessionPage: React.FC<IProps> = (props: IProps) => {
  const { sessions } = useSessionsDataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IAllSessionsRes>();
  const { response: aggregRes, loading: loadingAggreg, error: errorAggreg, onGetChainData } = useGetChainData<StitchedResponseWithSegments>();
  const [segments, setSegments] = useState<IPolicysvcListSegmentPsResponse>();
  const [aggregatedData, setAggregatedData] = React.useState<ITesseractListStitchedSessionsResponse>(null);
  const [sessionsData, setSessionsData] = React.useState<INetworkSession[]>([]);

  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [aggregCount, setAggregTotalCount] = React.useState<number>(0);

  React.useEffect(() => {
    onTryToLoadData(sessions.sessionsPageSize, sessions.sessionsCurrentPage, sessions.sessionsPeriod, sessions.sessionsStitch, sessions.sessionsFilter);
  }, [sessions.sessionsPageSize, sessions.sessionsCurrentPage, sessions.sessionsStitch, sessions.sessionsPeriod, sessions.sessionsFilter]);

  React.useEffect(() => {
    if (response && response.sessions) {
      const _total = convertStringToNumber(response.count);
      setSessionsData(response.sessions);
      setTotalCount(_total);
      setAggregatedData(null);
      setAggregTotalCount(0);
      return;
    }
    setSessionsData([]);
    setAggregatedData(null);
    setTotalCount(0);
    setAggregTotalCount(0);
  }, [response]);

  React.useEffect(() => {
    if (aggregRes) {
      setSessionsData([]);
      setTotalCount(0);
      const sessionSummary: INetworkSessionSummary[] = aggregRes.sessionSummary.sessionSummary.map(summary => {
        const vendorSessionSummary: INetworkVendorSessionSummary[] = summary.vendorSessionSummary.map(vendorSession => {
          const maybeSourceSegmentColor = aggregRes.segments.segments.find(segment => segment.id === vendorSession.sourceSegmentId)?.color || '';
          const maybeDestiSegmentColor = aggregRes.segments.segments.find(segment => segment.id === vendorSession.destSegmentId)?.color || '';
          vendorSession.sourceSegmentColor = maybeSourceSegmentColor;
          vendorSession.destinationSegmentColor = maybeDestiSegmentColor;
          return vendorSession;
        });
        return { vendorSessionSummary, sessionId: summary.sessionId };
      });
      setAggregatedData({ sessionSummary, nextPageKey: aggregRes.sessionSummary.nextPageKey, totalCount: aggregRes.sessionSummary.totalCount });
      setAggregTotalCount(aggregRes.sessionSummary.totalCount);
      setSegments(aggregRes.segments);
      return;
    }
    setSessionsData([]);
    setAggregatedData(null);
    setTotalCount(0);
    setAggregTotalCount(0);
  }, [aggregRes]);

  const onRefresh = () => {
    if (sessions.sessionsStitch) {
      const _param = stitchSessionsParamBuilder({
        size: sessions.sessionsPageSize,
        time_range: sessions.sessionsPeriod,
        filters: sessions.sessionsFilter,
        filterSuffics: ElasticFilterSuffics.KEYWORD,
        nextPageKey: null,
      });
      loadAggregatedData(_param);
      return;
    }
    const _param = sessionsParamBuilder({
      size: sessions.sessionsPageSize,
      currentPage: sessions.sessionsCurrentPage,
      time_range: sessions.sessionsPeriod,
      stitchOnly: sessions.sessionsStitch,
      filters: sessions.sessionsFilter,
      filterSuffics: ElasticFilterSuffics.KEYWORD,
    });
    loadSessionsData(_param);
  };

  const onTryToLoadData = (pageSize: number, page: number, time: SESSIONS_TIME_RANGE_QUERY_TYPES, stitch: boolean, filterValue: (IElasticFilterModel | string)[]) => {
    if (stitch) {
      const _param = stitchSessionsParamBuilder({
        size: pageSize,
        time_range: time,
        filters: filterValue,
        filterSuffics: ElasticFilterSuffics.KEYWORD,
        nextPageKey: null,
      });
      loadAggregatedData(_param);
      return;
    }
    const _param = sessionsParamBuilder({
      size: pageSize,
      currentPage: page,
      time_range: time,
      stitchOnly: stitch,
      filters: filterValue,
      filterSuffics: ElasticFilterSuffics.KEYWORD,
    });
    loadSessionsData(_param);
  };

  const loadAggregatedData = _param => {
    onGetChainData([TesseractApi.getStitchedSessions(), PolicyApi.getSegments()], ['sessionSummary', 'segments'], userContext.accessToken!, _param);
  };

  const loadSessionsData = async _param => {
    await onGet(TesseractApi.getAllSessions(), userContext.accessToken!, _param);
  };

  const onChangePageSize = (_size: number, page?: number) => {
    sessions.onChangePageSize(_size, page);
  };

  const onChangeCurrentPage = (_page: number) => {
    sessions.onChangeCurrentPage(_page);
  };

  const onChangePeriod = (_value: SESSIONS_TIME_RANGE_QUERY_TYPES) => {
    sessions.onChangeSelectedPeriod(_value, SessionsTabTypes.Sessions);
  };

  const onSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sessions.onChangeSwitch(e.target.checked, SessionsTabTypes.Sessions);
  };

  const onClearFilteredItem = (index: number) => {
    const _items: (IElasticFilterModel | string)[] = sessions.sessionsFilter && sessions.sessionsFilter.length ? sessions.sessionsFilter.slice() : [];
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

  const onAddFilter = (_item: IElasticFilterModel) => {
    const _items: (IElasticFilterModel | string)[] = sessions.sessionsFilter && sessions.sessionsFilter.length ? sessions.sessionsFilter.slice() : [];
    if (_items.length >= 1) {
      _items.push(FilterOpperatorsList[0].value);
    }
    _items.push(_item);
    sessions.onChangeFilter(_items);
  };

  const onUpdateFilter = (_item: IElasticFilterModel, index: number) => {
    const _items: (IElasticFilterModel | string)[] = sessions.sessionsFilter && sessions.sessionsFilter.length ? sessions.sessionsFilter.slice() : [];
    _items.splice(index, 1, _item);
    sessions.onChangeFilter(_items);
  };

  const onChangeOperator = (_item: string, index: number) => {
    const _items: (IElasticFilterModel | string)[] = sessions.sessionsFilter && sessions.sessionsFilter.length ? sessions.sessionsFilter.slice() : [];
    _items.splice(index, 1, _item);
    sessions.onChangeFilter(_items);
  };

  const onLoadDataEnd = (res: ITesseractListStitchedSessionsResponse | IAllSessionsRes) => {
    if (sessions.sessionsStitch) {
      const _res = res as ITesseractListStitchedSessionsResponse;
      setAggregTotalCount(_res.totalCount);
      setAggregatedData(_res);
      return;
    }
    const _res = res as IAllSessionsRes;
    const _total = convertStringToNumber(_res.count);
    setTotalCount(_total);
    setSessionsData(_res.sessions);
  };

  const onGetPossibleValues = (res: IAllSessionsRes, filteredField: IElasticField, stitch?: boolean): string[] => {
    if (!res) return [];
    if (stitch) {
      if (!res.buckets || !res.buckets.length) return [];
      const _arr = new Set();
      res.buckets.forEach(it => {
        if (!it.sessions || !it.sessions.length) return;
        it.sessions.forEach(s => {
          _arr.add(`${s[filteredField.resField]}`);
        });
      });
      return Array.from(_arr) as string[];
    }
    if (!res.sessions || !res.sessions.length) return [];
    const _arr = new Set();
    res.sessions.forEach(it => {
      _arr.add(`${it[filteredField.resField]}`);
    });
    return Array.from(_arr) as string[];
  };

  return (
    <>
      <ActionRowStyles margin="0 0 30px 0">
        <ActionPart margin="0 auto 0 0">
          <SessionsSwitch checked={sessions.sessionsStitch} onChange={onSwitchChange} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto" justifyContent="flex-end">
          <MatSelect
            id="logsTimePeriod"
            label="Show"
            labelStyles={{ margin: 'auto 10px auto 0' }}
            value={sessions.sessionsPeriod}
            options={[SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_DAY, SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_WEEK]}
            onChange={onChangePeriod}
            renderValue={(v: SESSIONS_TIME_RANGE_QUERY_TYPES) => convertPeriodToUserFriendlyString(v)}
            renderOption={(v: SESSIONS_TIME_RANGE_QUERY_TYPES) => convertPeriodToUserFriendlyString(v)}
            styles={{ height: '50px', minHeight: '50px', width: 'auto', display: 'inline-flex', alignItems: 'center' }}
            selectStyles={{ height: '50px', width: 'auto', minWidth: '240px', border: '1px solid transparent' }}
          />
          <IconButton styles={{ margin: '0 0 0 20px', flexShrink: 0, border: '1px solid transparent' }} icon={refreshIcon} title="Reload" onClick={onRefresh} />
        </ActionPart>
      </ActionRowStyles>
      <PageContentWrapper style={{ flexGrow: 1 }}>
        <ElasticFilter
          placeholder="Search Filter"
          applayedFilterItems={sessions.sessionsFilter}
          fields={SessionElasticFieldItems}
          onRemoveFilteredItem={onClearFilteredItem}
          onUpdateFilter={onUpdateFilter}
          onAddFilter={onAddFilter}
          onClearAllFilter={onClearFilter}
          onChangeOperator={onChangeOperator}
          url={!sessions.sessionsStitch ? TesseractApi.getAllSessions() : TesseractApi.getStitchedSessions()}
          timePeriod={sessions.sessionsPeriod}
          stitch={sessions.sessionsStitch}
          onLoadDataEnd={onLoadDataEnd}
          onMapRes={onGetPossibleValues}
          onRefresh={onRefresh}
          paramBuilder={!sessions.sessionsStitch ? sessionsParamBuilder : stitchSessionsParamBuilder}
        />
        <ContentWrapper style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {!sessions.sessionsStitch && (
            <TableWrapper style={{ minHeight: 'unset', height: '100%', flexGrow: 1 }}>
              <Table
                currentPage={sessions.sessionsCurrentPage}
                onChangeCurrentPage={onChangeCurrentPage}
                logCount={totalCount}
                error={error && error.message ? error.message : null}
                data={sessionsData}
                pageSize={sessions.sessionsPageSize}
                onChangePageSize={onChangePageSize}
              />

              {loading && (
                <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px" zIndex={1}>
                  <LoadingIndicator margin="auto" />
                </AbsLoaderWrapper>
              )}
            </TableWrapper>
          )}
          {sessions.sessionsStitch && (
            <StitchedTable
              currentPage={sessions.sessionsCurrentPage}
              onChangeCurrentPage={onChangeCurrentPage}
              loading={loadingAggreg}
              error={errorAggreg && errorAggreg.message ? errorAggreg.message : null}
              data={aggregatedData && aggregatedData.sessionSummary ? aggregatedData.sessionSummary : []}
              logCount={aggregCount}
              pageSize={sessions.sessionsPageSize}
              onChangePageSize={onChangePageSize}
            />
          )}
        </ContentWrapper>
      </PageContentWrapper>
    </>
  );
};

export default React.memo(SessionPage);
