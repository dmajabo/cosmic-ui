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
import _ from 'lodash';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { usePost } from 'lib/api/http/useAxiosHook';
import { IPreferenceRes, ISessionsLogStitchPreference, IUserPreference, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
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
      tab: 'Top Row',
      id: 'aggregatedTopTable',
      index: 0,
      items: [
        { ...SessionGridColumns.collapseColumn, hide: false },
        { ...SessionGridColumns.sessionId, hide: false },
        { ...SessionGridColumns.sourceIp, hide: false },
        { ...SessionGridColumns.sourcePort, hide: false },
        { ...SessionGridColumns.sourceSegmentId, hide: false },
        { ...SessionGridColumns.destIp, hide: false },
        { ...SessionGridColumns.destPort, hide: false },
        { ...SessionGridColumns.destSegmentId, hide: false },
        { ...SessionGridColumns.vendorsColumn, hide: false },
      ],
    },
    {
      tab: 'Nested Table',
      id: 'aggregatedNestedTable',
      index: 1,
      items: [
        {
          ...SessionGridColumns.timestamp,
          valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
        },
        { ...SessionGridColumns.startTime },
        { ...SessionGridColumns.endTime },
        { ...SessionGridColumns.flowId },
        { ...SessionGridColumns.flowDirection },
        { ...SessionGridColumns.sourceIp },
        { ...SessionGridColumns.sourcePort },
        { ...SessionGridColumns.sourceOrgid },
        { ...SessionGridColumns.sourceVnetworkExtid },
        { ...SessionGridColumns.sourceVnetworkName },
        { ...SessionGridColumns.sourceSubnetExtid },
        { ...SessionGridColumns.sourceVmExtid },
        { ...SessionGridColumns.sourceVmName },
        { ...SessionGridColumns.sourceRegion },
        { ...SessionGridColumns.sourceControllerName },
        { ...SessionGridColumns.sourceControllerId },
        { ...SessionGridColumns.sourceSegmentId },
        { ...SessionGridColumns.destIp },
        { ...SessionGridColumns.destPort },
        { ...SessionGridColumns.destOrgid },
        { ...SessionGridColumns.destVnetworkExtid },
        { ...SessionGridColumns.destVnetworkName },
        { ...SessionGridColumns.destSubnetExtid },
        { ...SessionGridColumns.destVmExtid },
        { ...SessionGridColumns.destVmName },
        { ...SessionGridColumns.destRegion },
        { ...SessionGridColumns.destControllerName },
        { ...SessionGridColumns.destControllerId },
        { ...SessionGridColumns.destSegmentId },
        { ...SessionGridColumns.natSourceIp },
        { ...SessionGridColumns.natSourcePort },
        { ...SessionGridColumns.natDestIp },
        { ...SessionGridColumns.natDestPort },
        { ...SessionGridColumns.bytes },
        { ...SessionGridColumns.packets },
        { ...SessionGridColumns.action },
        { ...SessionGridColumns.deviceName },
        { ...SessionGridColumns.deviceExtId },
        {
          ...SessionGridColumns.deviceVendor,
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
        { ...SessionGridColumns.deviceNetworkExtid },
        { ...SessionGridColumns.deviceControllerId },
        { ...SessionGridColumns.deviceControllerName },
        { ...SessionGridColumns.tcpFlags },
        { ...SessionGridColumns.trafficType },
        { ...SessionGridColumns.vnetworkExtId },
        { ...SessionGridColumns.vnetworkName },
        { ...SessionGridColumns.subnetExtId },
        { ...SessionGridColumns.subnetName },
        { ...SessionGridColumns.vmExtId },
        { ...SessionGridColumns.vmName },
        { ...SessionGridColumns.region },
        { ...SessionGridColumns.azId },
        { ...SessionGridColumns.protocol },
        { ...SessionGridColumns.policyAction },
      ],
    },
  ]);
  const columnChangedref = React.useRef(false);
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
          _tabs[_tIndex].items.sort((a, b) => it.items.findIndex(it => it.id === a.id) - it.items.findIndex(it => it.id === b.id));
        }
      });
      aggregatedColumnTabsRef.current = _tabs;
      setColumnTabs(_tabs);
    }
    return () => {
      if (columnChangedref.current) {
        const _с: ISessionsLogStitchPreference[] = aggregatedColumnTabsRef.current.map((it, index) => ({
          tab: it.tab,
          id: it.id,
          items: it.items.map(item => ({ id: item.id, field: item.field, hide: item.hide })),
        }));
        onTrySavePreferences(_с);
      }
    };
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

  const onChangeColumn = (tab: ITabsColumnFilterData, item: IColumn) => {
    const _items: ITabsColumnFilterData[] = _.cloneDeep(aggregatedColumnTabsRef.current);
    const _tabIndex = _items.findIndex(it => it.id === tab.id);
    const _i = _items[_tabIndex].items.findIndex(it => it.field === item.field);
    const _hide = !item.hide;
    _items[_tabIndex].items.splice(_i, 1, { ...item, hide: _hide });
    const _с: ISessionsLogStitchPreference[] = _items.map((it, index) => ({
      tab: it.tab,
      id: it.id,
      items: it.items.map(item => ({ id: item.id, field: item.field, hide: item.hide })),
    }));
    columnChangedref.current = true;
    aggregatedColumnTabsRef.current = _items;
    setColumnTabs(_items);
    sessions.onUpdateLogSitchPreference(_с);
  };
  const onChangeOrder = (tab: ITabsColumnFilterData) => {
    const _items: ITabsColumnFilterData[] = _.cloneDeep(aggregatedColumnTabsRef.current);
    const _tabIndex = _items.findIndex(it => it.id === tab.id);
    _items.splice(_tabIndex, 1, tab);
    const _с: ISessionsLogStitchPreference[] = _items.map((it, index) => ({
      tab: it.tab,
      id: it.id,
      items: it.items.map(item => ({ id: item.id, field: item.field, hide: item.hide })),
    }));
    columnChangedref.current = true;
    aggregatedColumnTabsRef.current = _items;
    setColumnTabs(_items);
    sessions.onUpdateLogSitchPreference(_с);
  };

  const onChangeCurrentPage = (_page: number) => {
    props.onChangeCurrentPage(_page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };

  const onTrySavePreferences = async (data: ISessionsLogStitchPreference[]) => {
    const _obj: IUserPreference = {
      userId: userContext.user.sub,
      prefKey: USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_TRUE,
      prefData: getToBase64(data),
    };
    debugger;
    await onPost(PolicyApi.postSavePreference(), { preference: _obj }, userContext.accessToken!);
  };

  return (
    <>
      <TableHeader count={props.logCount} columns={aggregatedColumnTabsRef.current} onItemClick={onChangeColumn} onChangeOrder={onChangeOrder} />
      <TableContainer minHeight="290px">
        <Table aria-label="collapsible table" className="largeTable">
          <TableHead>
            <TableRow>
              {aggregatedColumnTabsRef.current[0].items.map((it, index) => {
                if (it.hide) return null;
                if (it.field === 'id') {
                  return <TableCell key={`thRow${it.field}${index}`} style={{ width: '20px' }} />;
                }
                return <TableCell key={`thRow${it.field}${index}`}>{it.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!props.error && data && data.length ? (
              data.map((row, index) => (
                <AggregateRow key={`rowIndex${row.session.id}${index}`} row={row} columns={aggregatedColumnTabsRef.current[0].items} nestedColumns={aggregatedColumnTabs[1].items} />
              ))
            ) : (
              <TableRow>
                <TableCell className="errorCell" colSpan={aggregatedColumnTabsRef.current[0].items.length}>
                  <ErrorMessage color="var(--_primaryTextColor)" margin="48px auto">
                    No data
                  </ErrorMessage>
                </TableCell>
              </TableRow>
            )}
            {props.error && (
              <TableRow>
                <TableCell className="errorCell" colSpan={aggregatedColumnTabsRef.current[0].items.length}>
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
