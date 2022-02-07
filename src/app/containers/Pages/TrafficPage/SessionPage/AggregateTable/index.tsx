import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AggregateRow from './AggregateRow';
import { IBuckets } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow } from './models';
import { buildAggregatedData, getVendorObject } from './helper';
import TableHeader from './TableHeader';
import Paging from 'app/components/Basic/Paging';
import { SessionGridColumns } from '../models';
import { TableContainer } from 'app/components/Basic/Table/LargeTableSryles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ITabsColumnFilterData } from 'app/components/Basic/ColumnFilter/ColumnFilterWithTabs';
import { GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { parseFieldAsDate } from 'lib/helpers/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { VendorTdWrapper } from './styles';
import { IColumn } from 'lib/models/grid';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { usePost } from 'lib/api/http/useAxiosHook';
import { buildPreferenceKey, IPreferenceRes, ISessionsLogStitchPreference, IUserPreference, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { getToBase64 } from 'lib/api/http/utils';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  data: IBuckets[];
  logCount: number;
  error: string;
  pageSize: number;
  currentPage: number;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
}

const AggregateTable: React.FC<Props> = (props: Props) => {
  const { sessions } = useSessionsDataContext();
  const userContext = React.useContext<UserContextState>(UserContext);
  const { error, onPost } = usePost<IPreferenceRes, any>();
  const [data, setData] = React.useState<IAggregateRow[]>([]);
  const [aggregatedColumnTabs, setColumnTabs] = React.useState<ITabsColumnFilterData[]>([
    {
      tab: 'Outside',
      id: 'aggregatedTopTable',
      index: 0,
      items: [
        { ...SessionGridColumns.collapseColumn, hide: false },
        { ...SessionGridColumns.sessionId, hide: false },
        { ...SessionGridColumns.sourceIp, hide: false },
        { ...SessionGridColumns.sourcePort, hide: false },
        { ...SessionGridColumns.sourceSegmentName, hide: false },
        { ...SessionGridColumns.destIp, hide: false },
        { ...SessionGridColumns.destPort, hide: false },
        { ...SessionGridColumns.destSegmentName, hide: false },
        { ...SessionGridColumns.protocol, hide: true },
        { ...SessionGridColumns.deviceName, hide: true },
        { ...SessionGridColumns.vendorsColumn, hide: false },
        { ...SessionGridColumns.flowDirection, hide: true },
        { ...SessionGridColumns.sourceControllerName, hide: true },
        { ...SessionGridColumns.sourceControllerId, hide: true },
        { ...SessionGridColumns.natSourceIp, hide: true },
        { ...SessionGridColumns.natSourcePort, hide: true },
        { ...SessionGridColumns.tcpFlags, hide: true },
        { ...SessionGridColumns.trafficType, hide: true },
      ],
    },
    {
      tab: 'Inside',
      id: 'aggregatedNestedTable',
      index: 1,
      items: [
        {
          ...SessionGridColumns.timestamp,
          hide: false,
          valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
        },
        { ...SessionGridColumns.sourceIp, hide: false },
        { ...SessionGridColumns.sourcePort, hide: false },
        { ...SessionGridColumns.sourceSegmentName, hide: false },
        { ...SessionGridColumns.sourceSegmentType, hide: false },
        { ...SessionGridColumns.destIp, hide: false },
        { ...SessionGridColumns.destPort, hide: false },
        { ...SessionGridColumns.destSegmentName, hide: false },
        { ...SessionGridColumns.destSegmentType, hide: false },
        { ...SessionGridColumns.policyAction, hide: false },
        { ...SessionGridColumns.protocol, hide: false },
        { ...SessionGridColumns.flowDirection, hide: false },
        { ...SessionGridColumns.bytes, hide: false },
        { ...SessionGridColumns.packets, hide: false },
        { ...SessionGridColumns.deviceName, hide: false },
        {
          ...SessionGridColumns.deviceVendor,
          hide: false,
          renderCell: (param: GridRenderCellParams) => {
            const _obj = getVendorObject(param.value as AccountVendorTypes);
            return (
              <VendorTdWrapper>
                {_obj.icon && <IconWrapper customIcon={_obj.icon} width="20px" height="20px" styles={{ margin: '0 8px 0 0' }} />}
                <span>{_obj.label}</span>
              </VendorTdWrapper>
            );
          },
        },
        { ...SessionGridColumns.sourceOrgid, hide: true },
        { ...SessionGridColumns.sourceVnetworkExtid, hide: true },
        { ...SessionGridColumns.sourceVnetworkName, hide: true },
        { ...SessionGridColumns.sourceSubnetExtid, hide: true },
        { ...SessionGridColumns.sourceVmExtid, hide: true },
        { ...SessionGridColumns.sourceVmName, hide: true },
        { ...SessionGridColumns.sourceRegion, hide: true },
        { ...SessionGridColumns.sourceControllerName, hide: true },
        { ...SessionGridColumns.sourceControllerId, hide: true },
        { ...SessionGridColumns.sourceSegmentId, hide: true },
        { ...SessionGridColumns.destOrgid, hide: true },
        { ...SessionGridColumns.destVnetworkExtid, hide: true },
        { ...SessionGridColumns.destVnetworkName, hide: true },
        { ...SessionGridColumns.destSubnetExtid, hide: true },
        { ...SessionGridColumns.destVmExtid, hide: true },
        { ...SessionGridColumns.destVmName, hide: true },
        { ...SessionGridColumns.destRegion, hide: true },
        { ...SessionGridColumns.destControllerName, hide: true },
        { ...SessionGridColumns.destControllerId, hide: true },
        { ...SessionGridColumns.destSegmentId, hide: true },
        { ...SessionGridColumns.natSourceIp, hide: true },
        { ...SessionGridColumns.natSourcePort, hide: true },
        { ...SessionGridColumns.tcpFlags, hide: false },
        { ...SessionGridColumns.trafficType, hide: false },
        { ...SessionGridColumns.deviceNetworkExtid, hide: true },
        { ...SessionGridColumns.deviceControllerName, hide: true },
      ],
    },
  ]);
  const aggregatedColumnTabsRef = React.useRef(aggregatedColumnTabs);

  React.useEffect(() => {
    if (sessions.sessionsLogColumnPreferencesStitch_True && sessions.sessionsLogColumnPreferencesStitch_True.length) {
      const _tabs: ITabsColumnFilterData[] = aggregatedColumnTabsRef.current.slice();
      sessions.sessionsLogColumnPreferencesStitch_True.forEach(it => {
        const _tIndex = _tabs.findIndex(t => t.id === it.id);
        if (_tIndex !== -1) {
          _tabs[_tIndex].items.forEach((col, index) => {
            const _cIndex = it.items.findIndex(item => item.id === col.id);
            if (_cIndex !== -1) {
              col.hide = it.items[_cIndex].hide;
            }
          });
          _tabs[_tIndex].items.sort((a, b) => {
            const aindex = it.items.findIndex(it => it.id === a.id);
            const bindex = it.items.findIndex(it => it.id === b.id);
            if (aindex === -1 || bindex === -1) {
              return 0;
            }
            return aindex - bindex;
          });
        }
      });
      aggregatedColumnTabsRef.current = _tabs;
      setColumnTabs(_tabs);
    }
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [error]);

  React.useEffect(() => {
    const _data: IAggregateRow[] = buildAggregatedData(props.data);
    setData(_data);
  }, [props.data]);

  const onChangeColumn = (tabIndex: number, item: IColumn, hide: boolean) => {
    const _items: ITabsColumnFilterData[] = aggregatedColumnTabsRef.current.slice();
    const _arr = _items[tabIndex].items.slice();
    const index = _arr.findIndex(it => it.field === item.field);
    _arr.splice(index, 1, { ..._arr[index], hide: hide });
    _items[tabIndex].items = _arr;
    aggregatedColumnTabsRef.current = _items;
    const _с: ISessionsLogStitchPreference[] = aggregatedColumnTabsRef.current.map((it, index) => ({
      tab: it.tab,
      id: it.id,
      items: it.items.map(item => ({ id: item.id, field: item.field, hide: item.hide })),
    }));
    setColumnTabs(_items);
    sessions.onUpdateLogSitchPreference(_с);
    onTrySavePreferences(_с);
  };
  const onChangeOrder = (tab: ITabsColumnFilterData) => {
    const _items: ITabsColumnFilterData[] = aggregatedColumnTabsRef.current.slice();
    const _tabIndex = _items.findIndex(it => it.id === tab.id);
    _items.splice(_tabIndex, 1, tab);
    aggregatedColumnTabsRef.current = _items;
    const _с: ISessionsLogStitchPreference[] = aggregatedColumnTabsRef.current.map((it, index) => ({
      tab: it.tab,
      id: it.id,
      items: it.items.map(item => ({ id: item.id, field: item.field, hide: item.hide })),
    }));
    setColumnTabs(_items);
    sessions.onUpdateLogSitchPreference(_с);
    onTrySavePreferences(_с);
  };

  const onChangeCurrentPage = (_page: number) => {
    props.onChangeCurrentPage(_page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };

  const onTrySavePreferences = async (data: ISessionsLogStitchPreference[]) => {
    console.log(data);
    const _obj: IUserPreference = {
      userId: userContext.user.sub,
      prefKey: buildPreferenceKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_TRUE, userContext.user.sub),
      prefData: getToBase64(data),
    };
    await onPost(PolicyApi.postSavePreference(), { preference: _obj }, userContext.accessToken!);
  };

  return (
    <>
      <TableHeader count={props.logCount} columns={aggregatedColumnTabs} onItemClick={onChangeColumn} onChangeOrder={onChangeOrder} />
      <TableContainer minHeight="290px">
        <Table aria-label="collapsible table" className="largeTable">
          <TableHead>
            <TableRow>
              {aggregatedColumnTabs[0].items.map((it, index) => {
                if (it.hide) return null;
                if (it.field === 'id') {
                  return <TableCell key={`thRow${it.field}${index}`} style={{ width: '20px' }} />;
                }
                return (
                  <TableCell key={`thRow${it.field}${index}`} style={{ minWidth: `${it.minWidth}px` }}>
                    {it.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!props.error && data && data.length ? (
              data.map((row, index) => <AggregateRow key={`rowIndex${row.session.id}${index}`} row={row} columns={aggregatedColumnTabs[0].items} nestedColumns={aggregatedColumnTabs[1].items} />)
            ) : (
              <TableRow>
                <TableCell className="errorCell" colSpan={aggregatedColumnTabs[0].items.length}>
                  <ErrorMessage color="var(--_primaryTextColor)" margin="48px auto">
                    No data
                  </ErrorMessage>
                </TableCell>
              </TableRow>
            )}
            {props.error && (
              <TableRow>
                <TableCell className="errorCell" colSpan={aggregatedColumnTabs[0].items.length}>
                  <ErrorMessage margin="48px 0">{props.error}</ErrorMessage>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Paging
        count={props.logCount}
        disabled={!data.length || props.logCount === 0}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={onChangeCurrentPage}
        onChangePageSize={onChangePageSize}
        pagingWrapStyles={{ marginTop: 'auto' }}
      />
      <ToastContainer />
    </>
  );
};

export default React.memo(AggregateTable);
