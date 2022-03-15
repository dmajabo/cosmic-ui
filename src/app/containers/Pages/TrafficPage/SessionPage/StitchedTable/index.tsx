import React from 'react';
import { INetworkSession, INetworkSessionSummary, INetworkVendorSessionSummary } from 'lib/api/ApiModels/Sessions/apiModel';
import { Column } from 'primereact/column';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { StitchedColumns, StitchedLogGridColumns } from './model';
import * as gridHelper from 'lib/helpers/gridHelper';
import TableHeader from './TableHeader';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import ExpandedTemplate from './ExpandedTemplate';
import { ITabsColumnFilterData } from 'app/components/Basic/ColumnFilter/ColumnFilterWithTabs';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { buildPreferenceKey, IPreferenceRes, ISessionsLogStitchPreference, IUserPreference, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { getToBase64 } from 'lib/api/http/utils';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { usePost } from 'lib/api/http/useAxiosHook';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';
import Paging from 'app/components/Basic/Paging';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GroupHeaderStyles } from './styles';

interface Props {
  data: INetworkSessionSummary[];
  logCount: number;
  loading: boolean;
  error: string;
  pageSize: number;
  currentPage: number;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
}

const StitchedTable: React.FC<Props> = (props: Props) => {
  const { user, accessToken } = React.useContext<UserContextState>(UserContext);
  const { sessions } = useSessionsDataContext();
  const { error, onPost } = usePost<IPreferenceRes, any>();
  const [visibleData, setvisibleData] = React.useState<INetworkVendorSessionSummary[]>([]);
  const [aggregatedColumnTabs, setColumnTabs] = React.useState<ITabsColumnFilterData[]>([
    {
      tab: 'Outside',
      id: 'aggregatedTopTable',
      index: 0,
      items: [
        { ...StitchedColumns.sourceIp },
        { ...StitchedColumns.sourcePort },
        { ...StitchedColumns.sourceSegmentId },
        {
          ...StitchedColumns.sourceSegmentName,
          body: (d: INetworkVendorSessionSummary) => cellTemplates.segmentNameTemplate(d.sourceSegmentName, d.sourceSegmentColor),
        },
        { ...StitchedColumns.destIp },
        { ...StitchedColumns.destPort },
        { ...StitchedColumns.destSegmentName, body: (d: INetworkVendorSessionSummary) => cellTemplates.segmentNameTemplate(d.destSegmentName, d.destinationSegmentColor) },
        { ...StitchedColumns.protocol },
      ],
    },
    {
      tab: 'Inside',
      id: 'aggregatedNestedTable',
      index: 1,
      items: [
        {
          ...StitchedLogGridColumns.timestamp,
          hide: false,
          body: (d: INetworkSession) => cellTemplates.celltimeStampTemplate(d.timestamp),
        },
        { ...StitchedLogGridColumns.sourceIp, hide: false },
        { ...StitchedLogGridColumns.sourcePort, hide: false },
        { ...StitchedLogGridColumns.sourceSegmentName, hide: false },
        { ...StitchedLogGridColumns.sourceSegmentType, hide: false, body: (d: INetworkSession) => cellTemplates.cellClassNameTemplate(d.sourceSegmentType, 'cellToCapitalize') },
        { ...StitchedLogGridColumns.destIp, hide: false },
        { ...StitchedLogGridColumns.destPort, hide: false },
        { ...StitchedLogGridColumns.destSegmentName, hide: false },
        { ...StitchedLogGridColumns.destSegmentType, hide: false, body: (d: INetworkSession) => cellTemplates.cellClassNameTemplate(d.destSegmentType, 'cellToCapitalize') },
        { ...StitchedLogGridColumns.policyAction, hide: false },
        { ...StitchedLogGridColumns.protocol, hide: false },
        { ...StitchedLogGridColumns.flowDirection, hide: false },
        { ...StitchedLogGridColumns.bytes, hide: false },
        { ...StitchedLogGridColumns.packets, hide: false },
        { ...StitchedLogGridColumns.deviceName, hide: false },
        { ...StitchedLogGridColumns.sourceOrgid, hide: true },
        { ...StitchedLogGridColumns.sourceVnetworkExtid, hide: true },
        { ...StitchedLogGridColumns.sourceVnetworkName, hide: true },
        { ...StitchedLogGridColumns.sourceSubnetExtid, hide: true },
        { ...StitchedLogGridColumns.sourceVmExtid, hide: true },
        { ...StitchedLogGridColumns.sourceVmName, hide: true },
        { ...StitchedLogGridColumns.sourceRegion, hide: true },
        { ...StitchedLogGridColumns.sourceControllerName, hide: true },
        { ...StitchedLogGridColumns.sourceControllerId, hide: true },
        { ...StitchedLogGridColumns.sourceSegmentId, hide: true },
        { ...StitchedLogGridColumns.destOrgid, hide: true },
        { ...StitchedLogGridColumns.destVnetworkExtid, hide: true },
        { ...StitchedLogGridColumns.destVnetworkName, hide: true },
        { ...StitchedLogGridColumns.destSubnetExtid, hide: true },
        { ...StitchedLogGridColumns.destVmExtid, hide: true },
        { ...StitchedLogGridColumns.destVmName, hide: true },
        { ...StitchedLogGridColumns.destRegion, hide: true },
        { ...StitchedLogGridColumns.destControllerName, hide: true },
        { ...StitchedLogGridColumns.destControllerId, hide: true },
        { ...StitchedLogGridColumns.destSegmentId, hide: true },
        { ...StitchedLogGridColumns.natSourceIp, hide: true },
        { ...StitchedLogGridColumns.natSourcePort, hide: true },
        { ...StitchedLogGridColumns.tcpFlags, hide: false },
        { ...StitchedLogGridColumns.trafficType, hide: false },
        { ...StitchedLogGridColumns.deviceNetworkExtid, hide: true },
        { ...StitchedLogGridColumns.deviceControllerName, hide: true },
      ],
    },
  ]);
  const [expandedObj, setExpandedObj] = React.useState(null);
  const [expandedRows, setExpandedRows] = React.useState([]);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
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
    if (props.data && props.data.length) {
      let _visibleData = [];
      props.data.forEach((it, index) => {
        if (!it.vendorSessionSummary || !it.vendorSessionSummary.length) return;
        it.vendorSessionSummary.forEach(row => {
          _visibleData.push({ ...row, uuId: `${row.sessionId}${row.deviceVendor}` });
        });
      });
      setvisibleData(_visibleData);
    } else {
      setvisibleData([]);
    }
  }, [props.data]);

  React.useEffect(() => {
    if (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [error]);

  const headerTemplate = (rowData: INetworkSessionSummary) => {
    return (
      <GroupHeaderStyles>
        <span className="label">Sessions ID:</span>
        <span className="value">{rowData.sessionId}</span>
      </GroupHeaderStyles>
    );
  };

  const expandedTemplate = (data: INetworkVendorSessionSummary) => <ExpandedTemplate dataItem={data} columns={aggregatedColumnTabsRef.current[1].items} />;

  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = gridHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };

  const onChangeColumn = (tabIndex: number, item: IGridColumnField, hide: boolean) => {
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

  const onRowToggle = (rowData: INetworkVendorSessionSummary) => {
    if (!expandedObj) {
      const _obj = {};
      _obj[rowData.uuId] = true;
      setExpandedRows([rowData]);
      setExpandedObj(_obj);
      return;
    }
    const _obj = { ...expandedObj };
    let _arr = expandedRows.slice();
    if (!_obj[rowData.uuId]) {
      _obj[rowData.uuId] = true;
      _arr.push(rowData);
      setExpandedRows(_arr);
      setExpandedObj(_obj);
      return;
    }
    delete _obj[rowData.uuId];
    _arr = _arr.filter(it => it.uuId !== rowData.uuId);
    if (!Object.keys(_obj).length) {
      setExpandedRows([]);
      setExpandedObj(null);
      return;
    }
    setExpandedRows(_arr);
    setExpandedObj(_obj);
  };

  const onChangeCurrentPage = (_page: number) => {
    props.onChangeCurrentPage(_page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };

  const onTrySavePreferences = async (data: ISessionsLogStitchPreference[]) => {
    const _obj: IUserPreference = {
      userId: user.sub,
      prefKey: buildPreferenceKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_TRUE, user.sub),
      prefData: getToBase64(data),
    };
    await onPost(PolicyApi.postSavePreference(), { preference: _obj }, accessToken!);
  };

  const expanderBodyTemplate = (rowData: INetworkVendorSessionSummary) => {
    return (
      <IconWrapper
        width="12px"
        height="12px"
        styles={{ verticalAlign: 'middle', transform: expandedObj && expandedObj[rowData.uuId] ? 'rotate(0)' : 'rotate(-90deg)', transition: `transform ${DEFAULT_TRANSITION}` }}
        icon={arrowBottomIcon}
        onClick={() => onRowToggle(rowData)}
      />
    );
  };

  return (
    <>
      <TableHeader count={props.logCount} columns={aggregatedColumnTabsRef.current} onItemClick={onChangeColumn} onChangeOrder={onChangeOrder} />
      <TableWrapper>
        <DataTable
          className="table stitchedTable"
          value={visibleData}
          onSort={onSort}
          sortField={sortObject ? sortObject.field : null}
          sortOrder={sortObject ? sortObject.order : null}
          sortMode="single"
          emptyMessage={!props.error ? 'No data' : ' '}
          responsiveLayout="scroll"
          rowGroupMode="subheader"
          groupRowsBy="sessionId"
          expandedRows={expandedRows}
          rowGroupHeaderTemplate={headerTemplate}
          rowExpansionTemplate={expandedTemplate}
        >
          <Column field="uuId" header="" expander body={expanderBodyTemplate} style={{ width: '40px' }}></Column>
          {aggregatedColumnTabsRef.current[0].items.map(col => {
            if (col.hide) return null;
            return (
              <Column
                key={col.id}
                sortable={col.sortable}
                field={col.field}
                header={col.label}
                style={{ width: col.width || null, minWidth: col.minWidth || null, maxWidth: col.maxWidth || null }}
                body={col.body || null}
              ></Column>
            );
          })}
        </DataTable>
        {props.loading && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}

        {props.error && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
            <ErrorMessage margin="auto" fontSize={20}>
              {props.error || 'Something went wrong'}
            </ErrorMessage>
          </AbsLoaderWrapper>
        )}
      </TableWrapper>
      <Paging count={props.logCount} disabled={!props.data.length} pageSize={props.pageSize} currentPage={props.currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
      <ToastContainer />
    </>
  );
};

export default React.memo(StitchedTable);
